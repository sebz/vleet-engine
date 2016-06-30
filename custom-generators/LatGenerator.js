var chance = require("chance").Chance();

function LatGenerator() {}

LatGenerator.prototype.generate = function(system) {
  var labels = system.labels;

  for (var i = labels.length - 1; i >= 0; i--) {
    var label = labels[i]

    // Asia/Japan/Tokyo:
    if(label == "Tokyo")
      return chance.latitude({min: 35.6505, max: 35.9005});
    
    // Asia/China/HongKong
    if(label == "Hong Kong")
      return chance.latitude({min: 22.3364, max: 22.3614});

    // Asia/Australia/Sydney
    if(label == "Sydney")
      return chance.latitude({min: -34.001, max: -33.751});

    // Asia/New Zealand/Wellington:
    if(label == "Wellington")
      return chance.latitude({min: -41.36, max: -41.31});

    // Asia/Korea/Seoul
    if(label == "Seoul")
      return chance.latitude({min: 37.3226, max: 37.5726});

    // America/Canada/Toronto
    if(label == "Toronto")
      return chance.latitude({min: 43.85, max: 43.97});

    if(label == "Las Vegas")
      return chance.latitude({min: 36.0594, max: 36.1844});

    if(label == "Orlando")
      return chance.latitude({min: 28.418, max: 28.548});

    if(label == "San Jose")
      return chance.latitude({min: 37.2506, max: 37.2956});

    // America/Peru/Lima
    if(label == "Lima")
      return chance.latitude({min: -12.256, max: -12.106});

    // EU/Austria/Wien
    if(label == "Wien")
      return chance.latitude({min: 48.1997, max: 48.2997});
  };
  return chance.latitude({min: 48.7388, max: 48.9788});
};

module.exports = LatGenerator;
