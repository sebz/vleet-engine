function LongGenerator() {}

LongGenerator.prototype.generate = function(system) {
  var labels = system.labels;

  for (var i = labels.length - 1; i >= 0; i--) {
    var label = labels[i]

    // Japan/Tokyo:
    if(label == "Tokyo")
      return Chance.longitude({min: 140, max: 140.12});
    
    // China/HongKong
    if(label == "Hong Kong")
      return Chance.longitude({min: 114.1895, max: 114.2395});

    // Australia/Sydney:
    if(label == "Sydney")
      return Chance.longitude({min: 151.215, max: 151.335});

    // New Zealand/Wellington:
    if(label == "Wellington")
      return Chance.longitude({min: 174.779, max: 174.829});

    // Korea/Seoul
    if(label == "Seoul")
      return Chance.longitude({min: 127, max: 127.12});

    // America/Canada/Toronto
    if(label == "Toronto")
      return Chance.longitude({min: -79.5637, max: -79.4437});

    if(label == "Las Vegas")
      return Chance.longitude({min: -115.6662, max: -115.1662});

    if(label == "Orlando")
      return Chance.longitude({min: -81.8709, max: -81.3709});

    // America/Peru/Lima
    if(label == "Lima")
      return Chance.longitude({min: -77.27, max: -77.12});

    // EU/Austria/Wien
    if(label == "Wien")
      return Chance.longitude({min: 16.355, max: 16.455});
  };

  return return Chance.longitude({min: 2.3442, max: 2.4642});
};

module.exports = LongGenerator;
