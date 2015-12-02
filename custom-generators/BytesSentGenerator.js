function BytesSentGenerator() {}

BytesSentGenerator.prototype.generate = function() {
    return Math.round(Math.random() * 1000);
};

module.exports = BytesSentGenerator;
