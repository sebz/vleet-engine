var chance = require("chance").Chance();

function BytesSentGenerator(options) {
	this.min = options.min;
	this.max = options.max;
}

BytesSentGenerator.prototype.generate = function() {
	return chance.integer({
		min: this.min,
		max: this.max
	});
	// Math.round(Math.random() * 1000);
};

module.exports = BytesSentGenerator;