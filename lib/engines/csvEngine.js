var _ = require("lodash");
var Bromise = require("bluebird");
var converter = require("json-2-csv");
var mqtt = require("mqtt");
var fs = require('fs');

const MQTT_PORT = "1883";

/***
Config:
   "generation": {
        "mode": "csvEngine",
        "csvEngine": {
            "fileRepository": ".",
            "csvOptions": "",
            "timestamp": 1,
            "value": 2
            }
        }
***/

function CSVEngine(simulator) {

    this.config = simulator.simulation.generation.csvEngine;
    this.simulator = simulator;
    this.mqttServer = `tcp://${simulator.configuration.server}`;
    this.dataGenerators = {};
}

CSVEngine.prototype.generateValues = function(dataDescriptor, system) {
    var self = this;
    var result = {};

    const filename = `${this.config.fileRepository}/${system.name}.csv`;
    console.log("    Reading data [" + filename + "]");

    return new Bromise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            }
            converter.csv2json(data, (err, json) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }

                try {
                    // Browse each data
                    console.log("    Generating", json.length, "data");
                    json.forEach(function(object) {
                        var timestamp = object[self.getTimestampConfig(dataDescriptor)] + "000";
                        result[timestamp] = {};
                        result[timestamp][dataDescriptor] = object[self.getDataValueConfig(dataDescriptor)];
                    });
                    resolve(result);
                } catch (e) {
                    console.error("# Data gen error:", e);
                    reject(e);
                }
            }, this.config.csvOptions);
        });
    });
};

CSVEngine.prototype.generateData = function(system) {
    var self = this;
    console.log("Generate data for system:", system.name);
    //var datas = {};
    try {
        /*return _.reduce(self.getGenerationData(), function(datas, dataDescriptor, dataName) {
            console.log("generate value for data:", dataName);

            return self.generateValues(dataName, system).then(function(data) {
                return _.extend(datas, data);
            });
        }, {});*/

        return _.reduce(self.getGenerationData(), (datas, dataDescriptor, dataName) => {
            console.log("generate value for data:", dataName);
            // No need for paranthesis when there's a single param
            // like here -------------------------------------,
            return self.generateValues(dataName, system).then(data => _.extend(datas, data));
            // And no need to wrap with `{ }` and use `return`            ^
            // When there's a single instruction like here  --------------'
        });

    } catch (e) {
        console.log(e);
    }


    //return datas;
    /*var generateAllDatas = new Bromise.reduce(self.getGenerationData(), function(datas, dataDescriptor, dataName) {
        console.log("generate value for data:", dataName);
        return self.generateValues(dataName, system).then(function(data) {
            return _.extend(datas, data);
        });
    }, {});

    generateAllDatas.then(function(datas) {
        console.log(datas);
    });*/
};

CSVEngine.prototype.getGenerationData = function() {
    return this.simulator.simulation.generation.data;
};

CSVEngine.prototype.getDataValueConfig = function(dataId) {
    return this.simulator.simulation.generation.data[dataId].value;
};

CSVEngine.prototype.getTimestampConfig = function(dataId) {
    return this.simulator.simulation.generation.data[dataId].timestamp;
};

CSVEngine.prototype.sendData = function(system) {

    //var self = this;
    try {
        return this.generateData(system).then(data => {
            return new Bromise((resolve, reject) => {

                console.log("    Sending data");
                var mqttId = system.gateway.serialNumber;
                var mqttClient = createMQTTClient(system, this.mqttServer);
                mqttClient.on("error", function(e) {
                    mqttClient.end();
                    console.error("[MQTT]", system.name, "- Error while connecting");
                    console.error(e);
                    reject(e);
                });

                console.log("    ");
                mqttClient.on("connect", function() {
                    console.log("System", mqttId, "connected ");
                    mqttClient.publish(mqttId + "/messages/json", JSON.stringify(data), function() {
                        mqttClient.end();
                        console.log("[MQTT]", system.name, "- values sent:", data);
                        resolve();
                    });
                });
            });
        });
    } catch (e) {
        console.error("# Data gen error:", e);
    }
};

function createMQTTClient(system, mqttServer) {
    var mqttId = system.gateway.serialNumber;
    var options = {
        username: mqttId,
        password: system.communication.mqtt.password
    };
    console.log("create mqtt client:", MQTT_PORT, mqttServer, options);
    return mqtt.connect(mqttServer, options);
}

CSVEngine.prototype.start = function(systems) {
    var self = this;
    this.systems = systems;
    var simulatedData = _.map(this.systems, function(system) {
        console.log("Simulate data for system:", system.name);
        return self.sendData(system);
    });

    return Bromise.all(simulatedData);
};

module.exports = CSVEngine;