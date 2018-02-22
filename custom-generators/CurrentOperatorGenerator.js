var chance = require("chance").Chance();

function CurrentOperatorGenerator() {}

CurrentOperatorGenerator.prototype.generate = function() {
	return chance.pick(["ATT", "Vodafone", "Orange"]);
};

module.exports = CurrentOperatorGenerator;