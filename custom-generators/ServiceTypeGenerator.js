var chance = require("chance").Chance();

function ServiceTypeGenerator() {}

ServiceTypeGenerator.prototype.generate = function() {
    return chance.pick(["GPRS", "EDGE", "UMTS", "HSPA"]);
};

module.exports = ServiceTypeGenerator;
