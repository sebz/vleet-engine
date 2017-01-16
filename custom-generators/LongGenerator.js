"use strict";
var chance = require("chance").Chance();

function LongGenerator() {}

LongGenerator.prototype.generate = function(system) {
    var labels = system.labels;

    for (var i = labels.length - 1; i >= 0; i--) {
        var label = labels[i];
        switch (label) {
            case "Tokyo": // Japan/Tokyo:
                return chance.longitude({
                    min: 139.995,
                    max: 140.005
                });
            case "Hong Kong": // China/HongKong
                return chance.longitude({
                    min: 114.1845,
                    max: 114.1945
                });
            case "Sydney": // Australia/Sydney:
                return chance.longitude({
                    min: 151.09,
                    max: 151.34
                });
            case "Wellington": // New Zealand/Wellington:
                return chance.longitude({
                    min: 174.779,
                    max: 174.829
                });
            case "Seoul": // Korea/Seoul
                return chance.longitude({
                    min: 126.875,
                    max: 127.125
                });
            case "Toronto": // America/Canada/Toronto
                return chance.longitude({
                    min: -79.5687,
                    max: -79.3187
                });
            case "Las Vegas":
                return chance.longitude({
                    min: -115.2287,
                    max: -115.1037
                });
            case "Orlando":
                return chance.longitude({
                    min: -81.4334,
                    max: -81.3084
                });
            case "San Jose":
                return chance.longitude({
                    min: -121.9482,
                    max: -121.7232
                });
            case "Lima": // America/Peru/Lima
                return chance.longitude({
                    min: -77.27,
                    max: -77.12
                });
            case "Wien": // EU/Austria/Wien
                return chance.longitude({
                    min: 16.355,
                    max: 16.455
                });
            default:
                return chance.longitude({
                    min: 2.2192,
                    max: 2.4692
                });
        }
        return chance.longitude({
            min: 2.2192,
            max: 2.4692
        });
    }
};
module.exports = LongGenerator;