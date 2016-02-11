function SignalStrengthGenerator() {}

SignalStrengthGenerator.prototype.generate = function() {
    return Chance.integer({min: 0, max: 5});
};

module.exports = SignalStrengthGenerator;
