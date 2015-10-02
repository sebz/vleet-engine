var RandomGenerator = require("./random");
var IncrementGenerator = require("./increment");

module.exports = function(generatorConfig) {
    console.log("## generatorConfig:", generatorConfig);
    switch (generatorConfig.generator) {
        case "randomFloat":
            return new RandomGenerator(generatorConfig);

        case "incremental":
            return new IncrementGenerator(generatorConfig.options);

        default:
            new RandomGenerator({
                generator: "randomString"
            });
    }
};
