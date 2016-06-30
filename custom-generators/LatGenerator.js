function LatGenerator() {}

LatGenerator.prototype.generate = function(system) {
  var labels = system.labels;

  for (var i = labels.length - 1; i >= 0; i--) {
    var label = labels[i]

    // Asia/Japan/Tokyo:
    if(label == "Tokyo")
      return Chance.latitude({min: 35.7755, max: 35.8955});
    
    // Asia/China/HongKong
    if(label == "Hong Kong")
      return Chance.latitude({min: 22.3364, max: 22.3614});

    // Asia/Australia/Sydney
    if(label == "Sydney")
      return Chance.latitude({min: -33.9960, max: -33.8760});

    // Asia/New Zealand/Wellington:
    if(label == "Wellington")
      return Chance.latitude({min: -41.36, max: -41.31});

    // Asia/Korea/Seoul
    if(label == "Seoul")
      return Chance.latitude({min: 37.4476, max: 37.5676});

    // America/Canada/Toronto
    if(label == "Toronto")
      return Chance.latitude({min: 43.85, max: 43.97});

    if(label == "Las Vegas")
      return Chance.latitude({min: 36.1219, max: 36.6219});

    if(label == "Orlando")
      return Chance.latitude({min: 28.4805, max: 28.9805});

    // America/Peru/Lima
    if(label == "Lima")
      return Chance.latitude({min: -12.256, max: -12.106});

    // EU/Austria/Wien
    if(label == "Wien")
      return Chance.latitude({min: 48.1997, max: 48.2997});
  };
  return Chance.latitude({min: 48.8588, max: 48.9788});
};

module.exports = LatGenerator;
