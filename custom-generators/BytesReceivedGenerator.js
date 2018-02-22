var chance = require("chance").Chance();

function BytesReceivedGenerator(options) {
	this.min = options.min;
	this.max = options.max;
}

BytesReceivedGenerator.prototype.generate = function() {
	return chance.integer({
		min: this.min,
		max: this.max
	});
	//Math.round((Math.random() * 1000) / 2);
};

module.exports = BytesReceivedGenerator;