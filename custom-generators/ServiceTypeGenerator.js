function ServiceTypeGenerator() {}

ServiceTypeGenerator.prototype.generate = function() {
    return Chance.pick(["GPRS", "EDGE", "UMTS", "HSPA"]);
};

module.exports = ServiceTypeGenerator;
