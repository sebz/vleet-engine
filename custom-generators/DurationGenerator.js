var chance = require("chance").Chance();

function DurationGenerator(options) {
	this.mode = "generic";
	if (options) {
		this.min = options.min;
		this.max = options.max;
		this.mode = "custom";
	}
}

DurationGenerator.prototype.generate = function() {
	if (this.mode == "generic")
		return chance.integer({
			min: 1,
			max: 24 * 60 * 60
		});
	else return chance.integer({
		min: this.min,
		max: this.max
	});
};

module.exports = DurationGenerator;