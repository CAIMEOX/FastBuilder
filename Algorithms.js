module.exports = {
ligature(PosArray1, PosArray2){
    var session = new Array();
  	var x1 = PosArray1[0]*1, y1 = PosArray1[1]*1, z1 = PosArray1[2]*1;
    var x2 = PosArray2[0]*1, y2 = PosArray2[1]*1, z2= PosArray2[2]*1;
    var line = Math.max(Math.abs(x1 - x2),Math.abs(y1 - y2),Math.abs(z1 - z2))*1;
    for(var i = 0; i <= line; i++){
    	session.push([Math.round(x1 + i / line * (x2 - x1)), Math.round(y1 + i / line * (y2 - y1)), Math.round(z1 + i / line * (z2 - z1))]);
    }
    return session;
  },
round(direction, r, x, y, z){
  var session = [];
    switch(direction){
      case "x":
      for (var i = -r; i <= r; i++) {
				for (var j = -r; j <= r; j++) {
					if (i * i + j * j < r * r) {
            session.push([x, y + i, z + j]);
          }
				}
			}
        break;
      case "y":
      for (var i = -r; i <= r; i++) {
				for (var j = -r; j <= r; j++) {
					if (i * i + j * j < r * r) {
            session.push([x + i, y, z + j]);
          }
				}
			}
        break;
      case "z":
      for (var i = -r; i <= r; i++) {
				for (var j = -r; j <= r; j++) {
					if (i * i + j * j < r * r) {
            session.push([x + i, y + j, z]);
          }
				}
			}
        break;
      default:break;
    }
    return session
  },
circle(direction, r, x, y, z){
  var session = [];
  switch(direction){
    case "x":
      for (var i = -r; i <= r; i++) {
        for (var j = -r; j <= r; j++) {
          if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)){
            session.push([x, y + i, z + j]);
          }
        }
      }
    break;
    case "y":
      for (var i = -r; i <= r; i++) {
        for (var j = -r; j <= r; j++) {
          if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)){
            session.push([x + i, y, z + j]);
          }
        }
      }
    break;
    case "z":
      for (var i = -r; i <= r; i++) {
        for (var j = -r; j <= r; j++) {
          if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)){
            session.push([x + i, y + j, z]);
          }
        }
      }
    break;
    default:
    break;
  }
  return session;
  },
sphere(d, r, x, y, z){
  var session = [];
  switch(d){
    case "hollow":
      for (var x1 = -r; x1 <= r; x1++) for (var y1 = -r; y1 <= r; y1++) {
        for (var z1 = -r; z1 <= r; z1++) {
          if (x1 * x1 + y1 * y1 + z1 * z1 <= r * r && x1 * x1 + y1 * y1 + z1 * z1 >= (r - 1) * (r - 1)) {
            session.push([x + x1, y + y1, z + z1]);
          }
        }
      }
    break;
    case "solid":
      for (var x1 = -r; x1 <= r; x1++) {
        for (var y1 = -r; y1 <= r; y1++) {
          for (var z1 = -r; z1 <= r; z1++) {
            if (x1 * x1 + y1 * y1 + z1 * z1 <= r * r) {
              session.push([x + x1, y + y1, z + z1]);
            }
          }
        }
      }
    break;
    default:
    break;
  }
  return session;
}
}
