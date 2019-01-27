function multiDimensionalUnique(arr) {
  var uniques = [];
  var itemsFound = {};
  for (var i = 0,
           l = arr.length; i < l; i++) {
    var stringified = JSON.stringify(arr[i]);
    if (itemsFound[stringified]) {
      continue;
    }
    uniques.push(arr[i]);
    itemsFound[stringified] = true;
  }
  return uniques;
}
module.exports = {
  ligature(PosArraj, PosArray2) {
    var session = new Array();
    var i = PosArraj[0] * 1,
        j = PosArraj[1] * 1,
        k = PosArraj[2] * 1;
    var x2 = PosArray2[0] * 1,
        y2 = PosArray2[1] * 1,
        z2 = PosArray2[2] * 1;
    var line = Math.max(Math.abs(i - x2), Math.abs(j - y2), Math.abs(k - z2)) * 1;
    for (var i = 0; i <= line; i++) {
      session.push([Math.round(i + i / line * (x2 - i)), Math.round(j + i / line * (y2 - j)), Math.round(k + i / line * (z2 - k))]);
    }
    return session;
  },
  round(direction, r, x, y, z) {
    var session = [];
    switch (direction) {
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
      default:
        break;
    }
    return session
  },
  circle(direction, r, x, y, z) {
    var session = [];
    switch (direction) {
      case "x":
        for (var i = -r; i <= r; i++) {
          for (var j = -r; j <= r; j++) {
            if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) {
              session.push([x, y + i, z + j]);
            }
          }
        }
        break;
      case "y":
        for (var i = -r; i <= r; i++) {
          for (var j = -r; j <= r; j++) {
            if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) {
              session.push([x + i, y, z + j]);
            }
          }
        }
        break;
      case "z":
        for (var i = -r; i <= r; i++) {
          for (var j = -r; j <= r; j++) {
            if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) {
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
  sphere(d, r, x, y, z) {
    var session = [];
    switch (d) {
      case "hollow":
        for (var i = -r; i <= r; i++) {
        for (var j = -r; j <= r; j++) {
          for (var k = -r; k <= r; k++) {
            if (i * i + j * j + k * k <= r * r && i * i + j * j + k * k >= (r - 1) * (r - 1)) {
              session.push([x + i, y + j, z + k]);
            }
          }
          }
        }
        break;
      case "solid":
        for (var i = -r; i <= r; i++) {
          for (var j = -r; j <= r; j++) {
            for (var k = -r; k <= r; k++) {
              if (i * i + j * j + k * k <= r * r) {
                session.push([x + i, y + j, z + k]);
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
  ellipse(d, a, b, x, y, z) {
    var session = [];
    switch (d) {
      case "x":
      for (var i  = -a ; i <= a ; i++){
        for (var j = -b ; j <= b ; j++){
          if((i * i)/(a * a) + (j * j)/(b * b) < 1){
            session.push([x,y+i,j+z]);
          }
        }
      }
        break;
        case "y":
        for (var i  = -a ; i <= a ; i++){
          for (var j = -b ; j <= b ; j++){
            if((i * i)/(a * a) + (j * j)/(b * b) < 1){
              session.push([x+i,y,j+z]);
            }
          }
        }
        break;
        case "z":
        for (var i  = -a ; i <= a ; i++){
          for (var j = -b ; j <= b ; j++){
            if((i * i)/(a * a) + (j * j)/(b * b) < 1){
              session.push([x+i,y+z,j]);
            }
          }
        }
        break;
      default:break;
    }
    return session;
  },
  ellipsoid(a, b, c, x, y, z) {
    /*a = a * 2 + 1;
    b = b * 2 + 1;
    c = c * 2 + 1;
    var session = [];
    var accuracy = 1 / f;
    var tminP = Math.PI / -2;
    var tmaxP = Math.PI / 2;
    var tminA = Math.PI * -1;
    var tmaxA = Math.PI;
    for (var i = tminP; i < tmaxP; i = i + accuracy) {
      for (var j = tminA; j < tmaxA; j = j + accuracy) {
        session.push([Math.ceil(x + a * Math.cos(i) * Math.cos(j)), Math.ceil(y + b * Math.cos(i) * Math.sin(j)), Math.ceil(z + c * Math.sin(i))]);
      }
    }
    return multiDimensionalUnique(session);*/
    var session = [];
    for (var i = -a ; i <= a ;i++){
      for (var j = -b ; j <= b ; j++){
        for (var k = -c ; k <= c; k++){
          if((i * i)/(a * a) + (j * j)/(b * b) + (k * k)/(c * c) <= 1){
            session.push([x+i,y+j,z+k]);
          }
        }
      }
    }
    return session;
  },
  torus(d, a, c, x, y, z, f) {
    var session = [];
    a = a * 1;
    c = c * 1;
    var session = [];
    var accuracy = 1 / f;
    var umin = 0;
    var umax = Math.PI * 2;
    var vmin = 0;
    var vmax = Math.PI * 2;
    switch (d) {
      case "x":
        for (var v = vmin; v < vmax; v = v + accuracy) {
          for (var u = umin; u < umax; u = u + accuracy) {
            session.push([Math.round(Math.cos(u) * (a * Math.cos(v) + c)) + x, Math.round(Math.sin(u) * (a * Math.cos(v) + c)) + y, Math.round(a * Math.sin(v)) + z]);
          }
        }
        break;

      case "y":
        for (var v = vmin; v < vmax; v = v + accuracy) {
          for (var u = umin; u < umax; u = u + accuracy) {
            session.push([Math.round(Math.cos(u) * (a * Math.cos(v) + c)) + x, Math.round(a * Math.sin(v)) + y, Math.round(Math.sin(u) * (a * Math.cos(v) + c)) + z]);
          }
        }
        break;
      case "z":
        for (var v = vmin; v < vmax; v = v + accuracy) {
          for (var u = umin; u < umax; u = u + accuracy) {
            session.push([Math.round(a * Math.sin(v)) + x, Math.round(Math.cos(u) * (a * Math.cos(v) + c)) + y, Math.round(Math.sin(u) * (a * Math.cos(v) + c)) + z]);
          }
        }
        break;
      default:break;
    }
    return multiDimensionalUnique(session);
  },
  cone(d, h, r, x, y, z, f){
    var session = [];
    h = parseInt(h);
    r = parseInt(r);
    var max = Math.PI * 2;
    var accuracy = 1 / f;
    switch (d) {
      case "z":
        for (var u = 0 ; u < h; u++) {
          for (var i = 0; i < max; i = i + accuracy) {
            session.push([Math.floor(((h - u)/h )* r * Math.cos(i))+x,Math.floor(((h - u)/h )* r * Math.sin(i))+y,u+z]);
          }
        }
        break;
      case "y":
        for (var u = 0 ; u < h; u++) {
          for (var i = 0; i < max; i = i + accuracy) {
            session.push([Math.floor(((h - u)/h )* r * Math.cos(i))+x,u+y,Math.floor(((h - u)/h )* r * Math.sin(i))+z]);
          }
        }
        break;
      case "x":
        for (var u = 0 ; u < h; u++) {
          for (var i = 0; i < max; i = i + accuracy) {
            session.push([u+x,Math.floor(((h - u)/h )* r * Math.cos(i))+y,Math.floor(((h - u)/h )* r * Math.sin(i))+z]);
          }
        }
        break;
      default:break;
    }

    return multiDimensionalUnique(session);
  },
  conoid(a, b, x, y, z){
    for (var _x = -a ; _x <= a ; _x++){
      for (var _y = -b ; _y <= b ; _y++){
        if(a * (_x * _x) + b * (_y * _y) - z * (_x * _x) - z * (_y * _y) == 0){
          session.push([x+_x,y+_y,z]);
        }
      }
    }
  }
};
