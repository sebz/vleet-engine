function RSSIGenerator() {}

RSSIGenerator.prototype.generate = function() {
    return -100 + (Math.round(Math.random() * 30));
};

module.exports = RSSIGenerator;
