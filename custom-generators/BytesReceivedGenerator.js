function BytesReceivedGenerator() {}

BytesReceivedGenerator.prototype.generate = function() {
    return Math.round((Math.random() * 1000) / 2);
};

module.exports = BytesReceivedGenerator;
