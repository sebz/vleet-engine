var Bromise = require("bluebird");
var _ = require("lodash");

var airvantage;
var simulation;
var applicationUid = "";

function checkApplication() {
    if (hasApplication()) {
        return airvantage.queryApplications({
                name: getApplicationName(),
                labels: [getLabel()]
            })
            .then(function(applications) {
                if (!applications.length) {
                    return createApplication()
                        .then(editCommunication)
                        .then(editData);
                }
                console.log("Application already exists");
                applicationUid = applications[0].uid;
            });
    }

    return Bromise.resolve();
}

/**
 * Check if the fleet needs to be created
 * @return {Promise} true or false
 */
function checkFleet() {
    return airvantage.querySystems({
            labels: [getLabel()]
        })
        .then(function(systems) {
            if (!systems.length) {
                return createFleet();
            }

            console.log("Fleet already exists");
        });
}

function createApplication() {
    var application = {
        "name": getApplicationName(),
        "revision": "1.0",
        "type": computeApplicationType(),
        "labels": [getLabel()]
    };
    console.log("virtual application:", application);
    return airvantage.createApplication(application)
        .then(function(application) {
            applicationUid = application.uid;
            return application;
        });
}

function editCommunication() {
    return airvantage.editApplicationCommunication(applicationUid, [{
        type: "MQTT",
        commIdType: "SERIAL",
        parameters: {
            password: "1234"
        }
    }]);
}

function editData() {
    var applicationDataDescription = [{
        id: computeApplicationType(),
        label: getApplicationName(),
        elementType: "node",
        encoding: "MQTT",
        data: getApplicationData()
    }];
    return airvantage.editApplicationData(applicationUid, applicationDataDescription);
}

function createFleet() {
    var systemsCreation = _.times(getFleetSize(), function(n) {
        return createSystem(n);
    });

    return Bromise.all(systemsCreation).then(function() {
        console.log("All systems were created");
    });
}

function createSystem(n) {
    var system = {
        name: [getNamePrefix(), n].join(""),
        state: "READY",
        labels: [getLabel()]
    };

    // Application => Need GW + Communication setup
    if (hasApplication()) {
        system.gateway = {
            serialNumber: "SN" + (Math.random() * 1000000),
            labels: [getLabel()]
        };
        system.applications = [{
            uid: applicationUid
        }];
        system.communication = {
            mqtt: {
                password: "1234"
            }
        };
    } else {
        // No application => SIM Usage simulation
        system.subscription = {
            identifier: Math.floor(Math.random() * 1000000000),
            operator: "SIERRA_WIRELESS"
        };
    }

    return airvantage.createSystem(system);
}

function getFleetSize() {
    return simulation.fleet.size;
}

function getLabel() {
    return simulation.label;
}

function getNamePrefix() {
    return simulation.fleet.namePrefix;
}

function hasApplication() {
    return simulation.application;
}

function getApplicationName() {
    return simulation.application.name;
}

function getApplicationData() {
    return simulation.application.data;
}

function computeApplicationType() {
    return _.capitalize(getApplicationName().split(" ").join());
}

function cleanResources() {
    console.log("Clean resources with label: ", simulation.label);
    return airvantage.deleteSystems({
            selection: {
                label: simulation.label
            },
            deleteGateways: true,
            deleteSubscriptions: true
        })
        .then(function() {
            console.log("Systems deleted");
            return airvantage.deleteApplications({
                selection: {
                    label: simulation.label
                }
            });
        })
        .then(function(application) {
            console.log("Applications deleted");
        });
}

module.exports = function(airvantageClient, simulationConfig) {
    airvantage = airvantageClient;
    simulation = simulationConfig;

    return {
        clean: function() {
            return cleanResources();
        },
        initialize: function() {
            return checkApplication()
                .then(checkFleet);
        }
    };
};
