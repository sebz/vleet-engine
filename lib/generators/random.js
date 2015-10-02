var chance = require("chance").Chance();

function RandomGenerator(options) {
    this.generatorName = options.generator;
    this.generatorOptions = options.options;
}

RandomGenerator.prototype.generate = function() {
    return this[this.generatorName].call(this);
};

RandomGenerator.prototype.randomFloat = function() {
    return chance.floating({
        min: this.generatorOptions.min,
        max: this.generatorOptions.max,
        fixed: this.generatorOptions.fixed
    });
};

module.exports = RandomGenerator;
