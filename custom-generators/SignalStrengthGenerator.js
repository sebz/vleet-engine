var chance = require("chance").Chance();

function SignalStrengthGenerator() {}

SignalStrengthGenerator.prototype.generate = function() {
    return chance.integer({
        min: 0,
        max: 5
    });
};

module.exports = SignalStrengthGenerator;
