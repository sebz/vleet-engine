function LatGenerator() {}

LatGenerator.prototype.generate = function(system) {
    var move = (Math.random() *0.25) - 0.12;
    var labels = system.labels;

  // France/Paris
  // 126.9573
  var latitude = 48.8588 + move;

  for (var i = labels.length - 1; i >= 0; i--) {
    var label = labels[i]

    // Asia/Japan/Tokyo:
    // 35.7755 - 36.2011
    if(label == "Tokyo")
      return (35.7755 + move);
    
    // Asia/China/HongKong
    // 126.9573
    if(label == "Hong Kong")
      return (22.3364 + (Math.random() *0.05) - 0.025);

    // Asia/Australia/Sydney
    // -33.8760
    if(label == "Sydney")
      return (-33.8760 + move);

    // Asia/New Zealand/Wellington:
    // 151.2158
    if(label == "Wellington")
      return ( -41.31 + (Math.random() *0.05));

    // Asia/Korea/Seoul
    // 37.4476
    if(label == "Seoul")
      return (37.4476 + move);

    // America/Canada/Toronto
    // 126.9573
    if(label == "Toronto")
      return (43.85 + move);

    if(label == "Las Vegas")
      return ( 36.1219 + (move * 0.5));

    if(label == "Orlando")
      return ( 28.4805 + (move * 0.5));

    // America/Peru/Lima
    // 126.9573
    if(label == "Lima")
      return (-12.106 + (Math.random() *0.15));

    // EU/Austria/Wien
    // 48.1997
    if(label == "Wien")
      return (48.1997 + (Math.random() *0.1));
  };
  return latitude;
};

module.exports = LatGenerator;
