function WindGenerator() {
    this.wind = 0;
}

WindGenerator.prototype.generate = function() {
    this.wind += ((Math.random() * 20) - 10); // +/- 10kmh max
    if (this.wind < 0) {
        this.wind = 0;
    }
    if (this.wind > 110) {
        this.wind = 100;
    }
    return this.wind;
};

module.exports = WindGenerator;
