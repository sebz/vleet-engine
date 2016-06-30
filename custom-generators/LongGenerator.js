var chance = require("chance").Chance();

function LongGenerator() {}

LongGenerator.prototype.generate = function(system) {
  var labels = system.labels;

  for (var i = labels.length - 1; i >= 0; i--) {
    var label = labels[i]

    // Japan/Tokyo:
    if(label == "Tokyo")
      return chance.longitude({min: 139.995, max: 140.005});
    
    // China/HongKong
    if(label == "Hong Kong")
      return chance.longitude({min: 114.1845, max: 114.1945});

    // Australia/Sydney:
    if(label == "Sydney")
      return chance.longitude({min: 151.09, max: 151.34});

    // New Zealand/Wellington:
    if(label == "Wellington")
      return chance.longitude({min: 174.779, max: 174.829});

    // Korea/Seoul
    if(label == "Seoul")
      return chance.longitude({min: 126.875, max: 127.125});

    // America/Canada/Toronto
    if(label == "Toronto")
      return chance.longitude({min: -79.5687, max: -79.3187});

    if(label == "Las Vegas")
      return chance.longitude({min: -115.2287, max: -115.1037});

    if(label == "Orlando")
      return chance.longitude({min: -81.4334, max: -81.3084});

    if(label == "San Jose")
      return chance.longitude({min: -121.9482, max: -121.7232});

    // America/Peru/Lima
    if(label == "Lima")
      return chance.longitude({min: -77.27, max: -77.12});

    // EU/Austria/Wien
    if(label == "Wien")
      return chance.longitude({min: 16.355, max: 16.455});
  };

  return chance.longitude({min: 2.2192, max: 2.4692});
};

module.exports = LongGenerator;
