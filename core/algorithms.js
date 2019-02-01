class Algorithms {
    static Builder (header, build) {
        let $b = new Algorithms();
        this.header = header;
        this.build = build;
        let [x,y,z] = header.position;

        let {
            type,
            direction,
            shape,
            radius,
            accuracy,
            delays,
            width,
            length,
            height,
            entityMod,
            path
        } = build;

        switch (type) {
          case 'round':
              return {
                  map:this.round(direction, radius, x, y, z),
                  foo: entityMod ? 'setLongEntity':'setLongTile'
              }
              break;
          case 'circle':
              return {
                  map:this.circle(direction, radius, x, y, z),
                  foo: entityMod ? 'setLongEntity':'setLongTile'
              }
              break;
          case 'sphere':
              return {
                  map:this.sphere(shape, radius, x, y, z),
                  foo: entityMod ? 'setEntity':'setTile'
              }
              break;
          case 'ellipse':
              return {
                  map:this.ellipse(direction, length, width, x, y, z),
                  foo: entityMod ? 'setLongEntity':'setLongTile'
              }
              break;
          case 'ellipsoid':
              return {
                  map:this.ellipsoid(length, width, height, x, y, z),
                  foo: entityMod ? 'setEntity':'setTile'
              }
              break;
          case 'torus':
              return {
                  map:this.torus(direction, width, radius, x, y, z, accuracy),
                  foo: entityMod ? 'setEntity':'setTile'
              }
              break;
          case 'cone':
              return {
                  map:this.cone(direction, height, radius, x, y, z, accuracy),
                  foo: entityMod ? 'setEntity':'setTile'
              };
              break;
          case 'paint':
              return {
                  foo:'paint',
                  map:[0,0,0]
              }
              break;
          default:break;
          }
    }

    static round(direction, r, x, y, z) {
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
        return session;
    }

    static circle(direction, r, x, y, z) {
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

    static sphere(d, r, x, y, z) {
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

    static ellipse(d, a, b, x, y, z) {
        let session = [];
        switch (d) {
        case "x":
            for (let i = -a; i <= a; i++) {
                for (let j = -b; j <= b; j++) {
                    if ((i * i) / (a * a) + (j * j) / (b * b) < 1) {
                        session.push([x, y + i, j + z]);
                    }
                }
            }
            break;
        case "y":
            for (let i = -a; i <= a; i++) {
                for (let j = -b; j <= b; j++) {
                    if ((i * i) / (a * a) + (j * j) / (b * b) < 1) {
                        session.push([x + i, y, j + z]);
                    }
                }
            }
            break;
        case "z":
            for (let i = -a; i <= a; i++) {
                for (let j = -b; j <= b; j++) {
                    if ((i * i) / (a * a) + (j * j) / (b * b) < 1) {
                        session.push([x + i, y + z, j]);
                    }
                }
            }
            break;
        default:
            break;
        }
        return session;
    }

    static ellipseh(d, a, b, x, y, z){
      let session = [];

    }

    static ellipsoid(a, b, c, x, y, z) {
        let session = [];
        for (let i = -a; i <= a; i++) {
            for (let j = -b; j <= b; j++) {
                for (let k = -c; k <= c; k++) {
                    if ((i * i) / (a * a) + (j * j) / (b * b) + (k * k) / (c * c) <= 1) {
                        session.push([x + i, y + j, z + k]);
                    }
                }
            }
        }
        return session;
    }

    static torus(d, a, c, x, y, z, f) {
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
        default:
            break;
        }
        return multiDimensionalUnique(session);
    }

    static cone(d, h, r, x, y, z, f) {
        let session = [];
        h = parseInt(h);
        r = parseInt(r);
        let max = Math.PI * 2;
        let accuracy = 1 / f;
        switch (d) {
        case "z":
            for (let u = 0; u < h; u++) {
                for (let i = 0; i < max; i = i + accuracy) {
                    session.push([Math.floor(((h - u) / h) * r * Math.cos(i)) + x, Math.floor(((h - u) / h) * r * Math.sin(i)) + y, u + z]);
                }
            }
            break;
        case "y":
            for (let u = 0; u < h; u++) {
                for (let i = 0; i < max; i = i + accuracy) {
                    session.push([Math.floor(((h - u) / h) * r * Math.cos(i)) + x, u + y, Math.floor(((h - u) / h) * r * Math.sin(i)) + z]);
                }
            }
            break;
        case "x":
            for (let u = 0; u < h; u++) {
                for (let i = 0; i < max; i = i + accuracy) {
                    session.push([u + x, Math.floor(((h - u) / h) * r * Math.cos(i)) + y, Math.floor(((h - u) / h) * r * Math.sin(i)) + z]);
                }
            }
            break;
        default:
            break;
        }

        return multiDimensionalUnique(session);
    }

    static ligature(PosArray1, PosArray2) {
        let session = new Array();
        let[i, j, k] = PosArray1;
        let[x2, y2, z2] = PosArray2;
        let line = Math.max(Math.abs(i - x2), Math.abs(j - y2), Math.abs(k - z2)) * 1;
        for (let i = 0; i <= line; i++) {
            session.push([Math.round(i + i / line * (x2 - i)), Math.round(j + i / line * (y2 - j)), Math.round(k + i / line * (z2 - k))]);
        }
        return session;
    }
}

module.exports = Algorithms;

function multiDimensionalUnique(arr) {
    let uniques = [];
    let itemsFound = {};
    for (let i = 0, l = arr.length; i < l; i++) {
        let stringified = JSON.stringify(arr[i]);
        if (itemsFound[stringified]) {
            continue;
        }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}
