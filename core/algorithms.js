class algorithms{
  static $builder (header, build, method) {
    let $b = new $builder;
    this.header = header;
    this.build = build;
    this.method = method;
    let {x,y,z} = header.position;
    let {f,s,r,a,t,w,l,h} = build;
    $b.start();
    return $b;
  }

  start(){
    switch (method) {
      case 'round':
      return {
        map:this.round(f,r,x,y,z),
        function:'setLongTile'
      }
      break;
      case 'cirlce':
      return {
        map:this.circle(),
        function:'setLongTile'
      }
      break;
      case 'sphere':
      return {
        map:this.sphere(s,r,x,y,z),
        function:'setTile'
      }
      break;
      case 'ellipse':
      return {
        map:this.ellipse(f,l,w,x,y,z),
        function:'setLongTile'
      }
      break;
      case 'ellipsoid':
      return {
        map:this.ellipsoid(l,w,h,x,y,z),
        function:'setTile'
      }
      break;
      case 'torus':
      return:{
        map:this.torus(f,w,r,x,y,z,a),
        function:'setTile'
      }
      break;
      case ''
      default:break;
    }
  }

  round(direction, r, x, y, z) {
      let session = [];
      switch (direction) {
        case "x":
          for (let i = -r; i <= r; i++) {
            for (let j = -r; j <= r; j++) {
              if (i * i + j * j < r * r) {
                session.push([x, y + i, z + j]);
              }
            }
          }
          break;
        case "y":
          for (let i = -r; i <= r; i++) {
            for (let j = -r; j <= r; j++) {
              if (i * i + j * j < r * r) {
                session.push([x + i, y, z + j]);
              }
            }
          }
          break;
        case "z":
          for (let i = -r; i <= r; i++) {
            for (let j = -r; j <= r; j++) {
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
    }

  circle(direction, r, x, y, z) {
        let session = [];
        switch (direction) {
          case "x":
            for (let i = -r; i <= r; i++) {
              for (let j = -r; j <= r; j++) {
                if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) {
                  session.push([x, y + i, z + j]);
                }
              }
            }
            break;
          case "y":
            for (let i = -r; i <= r; i++) {
              for (let j = -r; j <= r; j++) {
                if (i * i + j * j < r * r && i * i + j * j >= (r - 1) * (r - 1)) {
                  session.push([x + i, y, z + j]);
                }
              }
            }
            break;
          case "z":
            for (let i = -r; i <= r; i++) {
              for (let j = -r; j <= r; j++) {
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
      }

  sphere(d, r, x, y, z) {
          let session = [];
          switch (d) {
            case "hollow":
              for (let i = -r; i <= r; i++) {
              for (let j = -r; j <= r; j++) {
                for (let k = -r; k <= r; k++) {
                  if (i * i + j * j + k * k <= r * r && i * i + j * j + k * k >= (r - 1) * (r - 1)) {
                    session.push([x + i, y + j, z + k]);
                  }
                }
                }
              }
              break;
            case "solid":
              for (let i = -r; i <= r; i++) {
                for (let j = -r; j <= r; j++) {
                  for (let k = -r; k <= r; k++) {
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
        }

  ellipse(d, a, b, x, y, z) {
            let session = [];
            switch (d) {
              case "x":
              for (let i  = -a ; i <= a ; i++){
                for (let j = -b ; j <= b ; j++){
                  if((i * i)/(a * a) + (j * j)/(b * b) < 1){
                    session.push([x,y+i,j+z]);
                  }
                }
              }
                break;
                case "y":
                for (let i  = -a ; i <= a ; i++){
                  for (let j = -b ; j <= b ; j++){
                    if((i * i)/(a * a) + (j * j)/(b * b) < 1){
                      session.push([x+i,y,j+z]);
                    }
                  }
                }
                break;
                case "z":
                for (let i  = -a ; i <= a ; i++){
                  for (let j = -b ; j <= b ; j++){
                    if((i * i)/(a * a) + (j * j)/(b * b) < 1){
                      session.push([x+i,y+z,j]);
                    }
                  }
                }
                break;
              default:break;
            }
            return session;
          }

  ellipsoid(a, b, c, x, y, z) {
              let session = [];
              for (let i = -a ; i <= a ;i++){
                for (let j = -b ; j <= b ; j++){
                  for (let k = -c ; k <= c; k++){
                    if((i * i)/(a * a) + (j * j)/(b * b) + (k * k)/(c * c) <= 1){
                      session.push([x+i,y+j,z+k]);
                    }
                  }
                }
              }
              return session;
            }

  torus(d, a, c, x, y, z, f) {
                let session = [];
                a = a * 1;
                c = c * 1;
                let session = [];
                let accuracy = 1 / f;
                let umin = 0;
                let umax = Math.PI * 2;
                let vmin = 0;
                let vmax = Math.PI * 2;
                switch (d) {
                  case "x":
                    for (let v = vmin; v < vmax; v = v + accuracy) {
                      for (let u = umin; u < umax; u = u + accuracy) {
                        session.push([Math.round(Math.cos(u) * (a * Math.cos(v) + c)) + x, Math.round(Math.sin(u) * (a * Math.cos(v) + c)) + y, Math.round(a * Math.sin(v)) + z]);
                      }
                    }
                    break;

                  case "y":
                    for (let v = vmin; v < vmax; v = v + accuracy) {
                      for (let u = umin; u < umax; u = u + accuracy) {
                        session.push([Math.round(Math.cos(u) * (a * Math.cos(v) + c)) + x, Math.round(a * Math.sin(v)) + y, Math.round(Math.sin(u) * (a * Math.cos(v) + c)) + z]);
                      }
                    }
                    break;
                  case "z":
                    for (let v = vmin; v < vmax; v = v + accuracy) {
                      for (let u = umin; u < umax; u = u + accuracy) {
                        session.push([Math.round(a * Math.sin(v)) + x, Math.round(Math.cos(u) * (a * Math.cos(v) + c)) + y, Math.round(Math.sin(u) * (a * Math.cos(v) + c)) + z]);
                      }
                    }
                    break;
                  default:break;
                }
                return multiDimensionalUnique(session);
              }
}

function multiDimensionalUnique(arr) {
  let uniques = [];
  let itemsFound = {};
  for (let i = 0,l = arr.length; i < l; i++) {
    let stringified = JSON.stringify(arr[i]);
    if (itemsFound[stringified]) {
      continue;
    }
    uniques.push(arr[i]);
    itemsFound[stringified] = true;
  }
  return uniques;
}

function ligature(PosArraj, PosArray2) {
    let session = new Array();
    let i = PosArraj[0] * 1,
        j = PosArraj[1] * 1,
        k = PosArraj[2] * 1;
    let x2 = PosArray2[0] * 1,
        y2 = PosArray2[1] * 1,
        z2 = PosArray2[2] * 1;
    let line = Math.max(Math.abs(i - x2), Math.abs(j - y2), Math.abs(k - z2)) * 1;
    for (let i = 0; i <= line; i++) {
      session.push([Math.round(i + i / line * (x2 - i)), Math.round(j + i / line * (y2 - j)), Math.round(k + i / line * (z2 - k))]);
    }
    return session;
  }


function

function cone(d, h, r, x, y, z, f){
    let session = [];
    h = parseInt(h);
    r = parseInt(r);
    let max = Math.PI * 2;
    let accuracy = 1 / f;
    switch (d) {
      case "z":
        for (let u = 0 ; u < h; u++) {
          for (let i = 0; i < max; i = i + accuracy) {
            session.push([Math.floor(((h - u)/h )* r * Math.cos(i))+x,Math.floor(((h - u)/h )* r * Math.sin(i))+y,u+z]);
          }
        }
        break;
      case "y":
        for (let u = 0 ; u < h; u++) {
          for (let i = 0; i < max; i = i + accuracy) {
            session.push([Math.floor(((h - u)/h )* r * Math.cos(i))+x,u+y,Math.floor(((h - u)/h )* r * Math.sin(i))+z]);
          }
        }
        break;
      case "x":
        for (let u = 0 ; u < h; u++) {
          for (let i = 0; i < max; i = i + accuracy) {
            session.push([u+x,Math.floor(((h - u)/h )* r * Math.cos(i))+y,Math.floor(((h - u)/h )* r * Math.sin(i))+z]);
          }
        }
        break;
      default:break;
    }

    return multiDimensionalUnique(session);
  }

function conoid(a, b, x, y, z){
    for (let _x = -a ; _x <= a ; _x++){
      for (let _y = -b ; _y <= b ; _y++){
        if(a * (_x * _x) + b * (_y * _y) - z * (_x * _x) - z * (_y * _y) == 0){
          session.push([x+_x,y+_y,z]);
        }
      }
    }
  }
