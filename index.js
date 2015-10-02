var AirVantage = require("airvantage");
var jsonfile = require('jsonfile');
var config = jsonfile.readFileSync("./config-na.json");
var simulation = jsonfile.readFileSync("./simulations/" + config.simulation + ".json");
var Simulator = require("./lib/simulator");

var airvantage = new AirVantage({
    serverUrl: "https://" + config.server,
    credentials: config.credentials,
    debug: true
});

var factory = require("./lib/factory")(airvantage, simulation);
var simulator = new Simulator({
    airvantageClient: airvantage,
    mode: "backToTheFuture",
    simulation: simulation,
    configuration: config
});

airvantage.authenticate()
    .then(function() {
        console.log("Authenticated");
        if (simulation.clean) {
            return factory.clean();
        } else {
            return factory.initialize()
                .then(function() {
                    console.log("Start simulation - ", simulation.label);
                    return airvantage.querySystems({
                        labels: [simulation.label]
                    });
                })
                .then(function(systems) {
                    console.log("For ", systems.length, "systems");
                    return simulator.start(systems);
                })
                .then(function() {
                    console.log("Simulation stopped");
                });
        }
    })
    .catch(function(error) {
        console.error("# ERROR:", error.response.body);
    });
