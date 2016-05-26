var _ = require("lodash");
var Bromise = require("bluebird");
var generators = require("../generators");
var moment = require("moment");
var chance = require("chance").Chance();
var stringify = require('csv-stringify');


function DailyUsageEngine(simulator) {
    this.simulation = simulator.simulation;
    this.config = simulator.config;
    this.simulator = simulator;
}

DailyUsageEngine.prototype.generateUsages = function(subscriptions) {
    //var generator = csv.generate("SUBSCRIPTION[IDENTIFIER],TYPE,TIMESTAMP,DURATION,BYTES_SENT,BYTES_RECEIVED,BYTES_TOTAL", {columns: true});
    var columns = {
     subscription: 'SUBSCRIPTION[IDENTIFIER]',
     type: 'TYPE',
     timestamp: 'TIMESTAMP',
     duration: 'DURATION',
     bytesSent: 'BYTES_SENT',
     bytesReceived: 'BYTES_RECEIVED',
     bytesTotal: 'BYTES_TOTAL'
    };
    var stringifier = stringify({ header: true, columns: columns });
    var self = this;

    var data = '';
    stringifier.on('readable', function(){
      while(row = stringifier.read()){
        data += row;
      }
    });
    stringifier.on('error', function(err){
      console.log(err.message);
    });

    _.map(this.subscriptions, function(subscription) {
        
        var iccid = subscription.identifier;
        var timestamp = moment().subtract(1, 'months').format('x');
        var bytesSent = chance.integer({min: 1000, max: 2000});
        var bytesReceived = chance.integer({min: 100, max: 200});
        stringifier.write([iccid, 'DATA', timestamp,'0', bytesSent, bytesReceived, bytesSent + bytesReceived]);
    });
    stringifier.end();

    console.log(data);

    this.simulator.airvantage.importUsage(data).then(function(result) {
                    console.log("Operation '" + result.operation + "' status:");
                    console.log(self);
                    self.simulator.airvantage.queryOperations({
                        uid: result.operation
                    }).then(function(result) {
                                  console.log(result);
                                });
                });

}

DailyUsageEngine.prototype.start = function(subscriptions) {
    var self = this;
    this.subscriptions = subscriptions;
    /*
    SUBSCRIPTION[IDENTIFIER],TYPE,TIMESTAMP,DURATION,BYTES_SENT,BYTES_RECEIVED,BYTES_TOTAL
89152749654464423657,DATA,1455808390000,0,1234,147,1381
89337143149876501411,DATA,1455808390000,0,1102,151,1253
89336131001603789628,DATA,1455808390000,0,1556,146,1702
*/
    this.generateUsages(subscriptions);
};

module.exports = DailyUsageEngine;
