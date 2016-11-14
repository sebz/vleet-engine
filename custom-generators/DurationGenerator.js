var chance = require("chance").Chance();

function DurationGenerator() {}

DurationGenerator.prototype.generate = function() {
	return chance.integer({
		min: 1,
		max: 24 * 60 * 60
	});
};

module.exports = DurationGenerator;