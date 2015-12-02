"use strict";

var _ = require("lodash");
var AirVantage = require("airvantage");
var jsonfile = require("jsonfile");
var setup = jsonfile.readFileSync("./setup.json");
var serverConfig = jsonfile.readFileSync("./config/airvantage/" + setup.dataCenter + ".json");
var credentials = _.extend({}, setup.credentials, serverConfig.credentials);

var simulation = jsonfile.readFileSync("./config/simulations/" + setup.simulation + ".json");
var Simulator = require("./lib/simulator");

var airvantage = new AirVantage({
    serverUrl: "https://" + serverConfig.server,
    credentials: credentials,
    companyUid: setup.companyUid,
    debug: true
});

var factory = require("./lib/factory")(airvantage, simulation);
var simulator = new Simulator({
    airvantageClient: airvantage,
    mode: "backToTheFuture",
    simulation: simulation,
    configuration: {
        server: serverConfig.server
    }
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
