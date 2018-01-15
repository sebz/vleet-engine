var B2TFEngine = require("./engines/backToTheFuture");
var DailyUsageEngine = require("./engines/dailyUsage");
var CSVEngine = require("./engines/csvEngine");

function Simulator(options) {
    this.airvantage = options.airvantageClient;
    this.simulation = options.simulation;
    this.mode = this.simulation.generation.mode;
    this.configuration = options.configuration;
}

Simulator.prototype.start = function(systems) {
    console.log("start");
    this._initEngine();
    return this.engine.start(systems);
};

Simulator.prototype.stop = function() {
    this.engine.stop();
};

Simulator.prototype._initEngine = function() {
    console.log("init engine for mode:", this.mode);
    switch (this.mode) {
        case "backToTheFuture":
            this.engine = new B2TFEngine(this.simulation, this.configuration);
            break;
        case "dailyUsage":
            this.engine = new DailyUsageEngine(this);
            break;
        case "csvEngine":
            this.engine = new CSVEngine(this);
            break;
        default:
            console.log("No engine found for \"" + this.mode + "\"");
    }
};
module.exports = Simulator;