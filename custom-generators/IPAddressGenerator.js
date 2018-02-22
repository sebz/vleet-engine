var chance = require("chance").Chance();

function ipAddressGenerator() {}

ipAddressGenerator.prototype.generate = function() {
	//100.X.Y.Z
	var x = chance.integer({
		min: 0,
		max: 255
	});
	var y = chance.integer({
		min: 0,
		max: 255
	});
	var z = chance.integer({
		min: 0,
		max: 255
	});
	return "100." + x + "." + y + "." + z;
};

module.exports = ipAddressGenerator;