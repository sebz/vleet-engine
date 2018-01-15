var chance = require("chance").Chance();

function IPAddressGenerator() {}

IPAddressGenerator.prototype.generate = function() {
	return chance.pick(["197.10.10.1", "205.99.99.10", "2.5.8.10", "165.0.0.1"]);
};

module.exports = IPAddressGenerator;