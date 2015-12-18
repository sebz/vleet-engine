function IncrementGenerator(options) {
    this.initialValue = options.start;
    this.lastValue = null;
    this.step = options.step;
}

IncrementGenerator.prototype.generate = function() {
    if (this.lastValue === null) {
        this.lastValue = this.initialValue;
    } else {
        this.lastValue = this.lastValue + this.step;
    }
    return this.lastValue;
};

module.exports = IncrementGenerator;
