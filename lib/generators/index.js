var RandomGenerator = require("./random");
var IncrementGenerator = require("./increment");

module.exports = function(generatorConfig) {
    console.log("## generatorConfig:", generatorConfig);
    switch (generatorConfig.generator) {
        case "randomFloat":
            return new RandomGenerator(generatorConfig);
        case "randomBoolean":
            return new RandomGenerator(generatorConfig);
        case "incremental":
            return new IncrementGenerator(generatorConfig.options);

        default:
            // Look for a custom generator
            var CustomGenerator = require("../../custom-generators/" + generatorConfig.generator);

            if (CustomGenerator) {
                return new CustomGenerator(generatorConfig);
            }

            return new RandomGenerator({
                generator: "randomString"
            });
    }
};
