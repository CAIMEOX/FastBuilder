function clear(array){
  var n = []; //一个新的临时数组
  //遍历当前数组
  for(var i = 0; i < array.length; i++){
    //如果当前数组的第i已经保存进了临时数组，那么跳过，
    //否则把当前项push到临时数组里面
    if (n.indexOf(array[i]) == -1) n.push(array[i]);
  }
  return n;
}
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
},
  ellipse(d,a,b,x,y,z,f){
    var accuracy = 1 / f;
    var tmin = -1 * Math.PI;
    var tmax = Math.PI;
    var session = [];
    switch (d) {
      case "x":
      for (var i = tmin; i < tmax; i = i + accuracy) {
        session.push([x,Math.round(y + a * Math.cos(i)),Math.round(z + b * Math.sin(i))]);
      }
      break;
      case "y":
      for (var i = tmin; i < tmax; i = i + accuracy) {
        session.push([Math.round(x + a * Math.cos(i)),y,Math.round(z + b * Math.sin(i))]);
      }
      break;
      case "z":
      for (var i = tmin; i < tmax; i = i + accuracy) {
        session.push([Math.round(x + a * Math.cos(i)),Math.round(y + b * Math.sin(i)),z]);
      }
      break;
      default:
      break;
    }
     return session;
  },
  ellipsoid(a,b,c,x,y,z,f){
    var session = [];
    var accuracy = 1 / f;
    var tminP = Math.PI / -2;
    var tmaxP = Math.PI / 2;
    var tminA = Math.PI * -1;
    var tmaxA = Math.PI ;
      for (var i = tminP ; i < tmaxP ; i = i + accuracy){
        for (var j = tminA ; j < tmaxA ; j = j + accuracy){
          session.push([Math.round(x + a * Math.cos(i) * Math.cos(j)),Math.round(y + b * Math.cos(i) * Math.sin(j)),Math.round(z + c * Math.sin(i))]);
        }
      }
      return session;
  }
}
