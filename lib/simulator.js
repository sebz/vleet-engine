var B2TFEngine = require("./engines/backToTheFuture");


function Simulator(options) {
    this.airvantage = options.airvantageClient;
    this.mode = options.mode;
    this.simulation = options.simulation;
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
    if (this.mode === "backToTheFuture") {
        console.log("init \"backToTheFuture\" engine");
        this.engine = new B2TFEngine(this.simulation, this.configuration);
    }
};

module.exports = Simulator;
