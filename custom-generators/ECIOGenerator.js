function ECIOGenerator() {}

ECIOGenerator.prototype.generate = function() {
    return -15 + Math.round(Math.random() * 10); // -5 -> - 15
};

module.exports = ECIOGenerator;
