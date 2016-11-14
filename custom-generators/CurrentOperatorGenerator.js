var chance = require("chance").Chance();

function CurrentOperatorGenerator() {}

CurrentOperatorGenerator.prototype.generate = function(system) {

    var labels = system.labels;

    for (var i = labels.length - 1; i >= 0; i--) {
        var label = labels[i];

        if (label == "Hong Kong")
            return "China Telecom";
        if (label == "Paris")
            return chance.pick(["Bouygues"]);
        if (label == "San Jose")
            return chance.pick(["ATT"]);
    }
    return chance.pick(["Bouygues", "ATT"]);
};

module.exports = CurrentOperatorGenerator;