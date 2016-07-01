"use strict";
var chance = require("chance").Chance();

function LatGenerator() {}

LatGenerator.prototype.generate = function(system) {
  var labels = system.labels;

  for (var i = labels.length - 1; i >= 0; i--) {

    switch (labels[i]) {
      case "Tokyo": // Asia/Japan/Tokyo:
        return chance.latitude({
          min: 35.6505,
          max: 35.9005
        });
      case "Hong Kong": // Asia/China/HongKong
        return chance.latitude({
          min: 22.3364,
          max: 22.3614
        });
      case "Sydney": // Asia/Australia/Sydney
        return chance.latitude({
          min: -34.001,
          max: -33.751
        });
      case "Wellington": // Asia/New Zealand/Wellington:
        return chance.latitude({
          min: -41.36,
          max: -41.31
        });
      case "Seoul": // Asia/Korea/Seoul
        return chance.latitude({
          min: 37.3226,
          max: 37.5726
        });
      case "Toronto": // America/Canada/Toronto
        return chance.latitude({
          min: 43.85,
          max: 43.97
        });
      case "Las Vegas":
        return chance.latitude({
          min: 36.0594,
          max: 36.1844
        });
      case "Orlando":
        return chance.latitude({
          min: 28.418,
          max: 28.548
        });
      case "San Jose":
        return chance.latitude({
          min: 37.2506,
          max: 37.2956
        });
      case "Lima": // America/Peru/Lima
        return chance.latitude({
          min: -12.256,
          max: -12.106
        });
      case "Wien": // EU/Austria/Wien
        return chance.latitude({
          min: 48.1997,
          max: 48.2997
        });
      default:
        return chance.latitude({
          min: 48.7388,
          max: 48.9788
        });
    }
  }
  return chance.latitude({
    min: 48.7388,
    max: 48.9788
  });
};

module.exports = LatGenerator;