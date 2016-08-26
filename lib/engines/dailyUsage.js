var _ = require("lodash");
var generators = require("../generators");
var moment = require("moment");
var stringify = require("csv-stringify");


function DailyUsageEngine(simulator) {
    this.config = simulator.config;
    this.simulator = simulator;
    this.dataGenerators = {};
}

DailyUsageEngine.prototype.generateValue = function(generatorId) {
    var generator = this.dataGenerators[generatorId];
    if (!generator) {
        generator = this.getGenerator({
            generator: generatorId
        });
        this.dataGenerators[generatorId] = generator;
    }

    return generator.generate();
};

DailyUsageEngine.prototype.getGenerator = function(generatorId) {
    return generators(generatorId);
};

/* Generate a file with the following format and import it in AirVantage:
    SUBSCRIPTION[IDENTIFIER],TYPE,TIMESTAMP,DURATION,BYTES_SENT,BYTES_RECEIVED,BYTES_TOTAL
    89152749654464423657,DATA,1455808390000,0,1234,147,1381
    89337143149876501411,DATA,1455808390000,0,1102,151,1253
    89336131001603789628,DATA,1455808390000,0,1556,146,1702
*/
DailyUsageEngine.prototype.generateUsages = function() {
    var columns = {
        subscription: "SUBSCRIPTION[IDENTIFIER]",
        type: "TYPE",
        timestamp: "TIMESTAMP",
        duration: "DURATION",
        bytesSent: "BYTES_SENT",
        bytesReceived: "BYTES_RECEIVED",
        bytesTotal: "BYTES_TOTAL"
    };
    var stringifier = stringify({
        header: true,
        columns: columns
    });
    var self = this;

    var data = "";
    stringifier.on("readable", function() {
        var row;
        while ((row = stringifier.read())) {
            data += row;
        }
    });
    stringifier.on("error", function(err) {
        console.error(err.message);
    });

    _.each(this.subscriptions, function(subscription) {
        var iccid = subscription.identifier;
        var timestamp = moment().subtract(1, "days").format("x");
        var bytesSent = self.generateValue("BytesSentGenerator");
        var bytesReceived = self.generateValue("BytesReceivedGenerator");
        var duration = self.generateValue("DurationGenerator");
        stringifier.write([iccid, "DATA", timestamp, duration, bytesSent, bytesReceived, bytesSent + bytesReceived]);
    });
    stringifier.end();

    console.log(data);

    this.simulator.airvantage.importUsage(data).then(function(result) {
        console.log("Operation '" + result.operation + "' status:");
        self.simulator.airvantage.queryOperations({
            uid: result.operation
        }).then(function(result) {
            console.log(result);
        });
    });

};

DailyUsageEngine.prototype.start = function(systems) {
    this.subscriptions = _.map(systems, function(system)  {
        return system.subscription;
    });
    this.generateUsages();
};

module.exports = DailyUsageEngine;