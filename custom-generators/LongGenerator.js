function LongGenerator() {}

LongGenerator.prototype.generate = function() {
    var move = (Math.random() *0.25) - 0.12;
  
  // France/Paris
  // 126.9573
  var longitude = 2.3442 + move;

  for (var i = labels.length - 1; i >= 0; i--) {
    var label = labels[i]

    // Japan/Tokyo:
    // 140.3627 - 139.8683
    if(label == "Tokyo")
      return (140 + move);
    
    // China/HongKong
    // 126.9573
    if(label == "Hong Kong")
      return (114.1895 + (Math.random() *0.1) - 0.05);

    // Australia/Sydney:
    // 151.2158
    if(label == "Sydney")
      return (151.215 + move);

    // New Zealand/Wellington:
    // 151.2158
    if(label == "Wellington")
      return (174.779 - (Math.random() *0.05));

    // Korea/Seoul
    // 126.9573
    if(label == "Seoul")
      return (127 + move);

    // America/Canada/Toronto
    // 126.9573
    if(label == "Toronto")
      return (-79.4437 + move);

    if(label == "Las Vegas")
      return ( -115.1662 + (move * 0.5));

    if(label == "Orlando")
      return ( -81.3709 + (move * 0.5));

    // America/Peru/Lima
    // 126.9573
    if(label == "Lima")
      return (-77.12 + (Math.random() *0.15));

    // EU/Austria/Wien
    // 16.3550
    if(label == "Wien")
      return (16.355 + (Math.random() *0.1));
  };

  return longitude;
};

module.exports = LongGenerator;
