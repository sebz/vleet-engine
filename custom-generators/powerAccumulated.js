function PowerAccumulatedGenerator(options) {
    this.engine = options.engine;
    this.powerAccumulated = 0;
}

PowerAccumulatedGenerator.prototype.generate = function() {
    if (state == 0) // starting
        power += powerMean;
    else if (state == 1) {
        var value = powerMean + (Math.random() * 0.2) - 0.1;
        if (value < 0) value = 0;
        power += value;
    } else if (state == 2)
        power += powerMean;
    return power;
};

module.exports = PowerAccumulatedGenerator;
