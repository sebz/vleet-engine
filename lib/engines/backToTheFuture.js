var _ = require("lodash");
var Bromise = require("bluebird");
var generators = require("../generators");
var moment = require("moment");
var mqtt = require("mqtt");

var MQTT_PORT = "1883";

B2TFEngine.prototype.sendData = function(system) {
    var self = this;
    return new Bromise(function(resolve, reject) {
        var data = self.generateData(system);

        var mqttId = system.gateway.serialNumber;
        var mqttClient = createMQTTClient(system, self.mqttServer);
        mqttClient.on("error", function(e) {
            mqttClient.end();
            console.error("[MQTT]", system.name, "- Error while connecting");
            console.error(e);
            reject(e);
        });

        mqttClient.on("connect", function() {
            console.log("System", mqttId, "connected ");
            mqttClient.publish(mqttId + "/messages/json", JSON.stringify(data), function() {
                mqttClient.end();
                console.log("[MQTT]", system.name, "- values sent:", data);
                resolve();
            });
        });
    });
};

B2TFEngine.prototype.generateData = function(system) {
    var self = this;
    console.log("Generate data for system:", system.name);
    var data = {};
    _.times(this.getDaysInPast(), function(day) {
        console.log("Day #", day);
        var timestamp = moment().subtract(day, "days").valueOf();
        data[timestamp] = {};

        for (var dataDescriptor in self.getApplicationData()){
            console.log("generate value for data:", dataDescriptor);
            try {
                data[timestamp][dataDescriptor] = self.generateValue(dataDescriptor);
            } catch (e) {
                console.error("# Data gen error:", e);
            }
        };
    });
    return data;
};

B2TFEngine.prototype.generateValue = function(dataDescriptor) {
    var generationConfig = this.getDataGenerationConfig(dataDescriptor);
    var generator = this.dataGenerators[dataDescriptor];
    if (!generator) {
        generator = this.getGenerator(generationConfig);
        this.dataGenerators[dataDescriptor] = generator;
    }

    return generator.generate();
};

B2TFEngine.prototype.getGenerator = function(generatorId) {
    return generators(generatorId);
};

B2TFEngine.prototype.getDataGenerationConfig = function(dataId) {
    return this.simulation.generation.data[dataId];
};

B2TFEngine.prototype.getApplicationData = function() {
    return this.simulation.generation.data;
};

B2TFEngine.prototype.getDaysInPast = function() {
    return this.simulation.generation.backToTheFuture.nbDaysInPast;
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

function B2TFEngine(simulation, config) {
    this.simulation = simulation;
    this.mqttServer = "tcp://" + config.server;
    this.dataGenerators = {};
}

B2TFEngine.prototype.start = function(systems) {
    var self = this;
    this.systems = systems;
    var simulatedData = _.map(this.systems, function(system) {
        console.log("send data for system:", system.name);
        return self.sendData(system);
    });

    return Bromise.all(simulatedData);
};

module.exports = B2TFEngine;
