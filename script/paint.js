const color = require('./colortables');
const get_pixels = require('get-pixels');

function getMin(arr){
  let min = arr[0]
  for(var i = 1; i < arr.length; i++) {
  let cur = arr[i];
  cur < min ? min = cur : null
}
return min;
}

function get_color(r, g, b) {
    List = [];
    for (let a = 0; a < color.length; a++) {
        r1 = r - color[a].color[0];
        g1 = g - color[a].color[1];
        b1 = b - color[a].color[2];
        List.push(Math.sqrt((r1 * r1) + (g1 * g1) + (b1 * b1)));
    }
    return [color[List.indexOf(getMin(List))].name,color[List.indexOf(getMin(List))].data];
}

function Paint(path, x, y, z){
  const BuildList = [];
  get_pixels(path, (err, pixels) => {
    if(err){
      return;
    }

    let arr = pixels.data;
    let All = [];
    let $d = [];

    for (let i = 0 ; i < arr.length; i++){
      $d.push(arr[i]);
      if(i != 0 && (i + 1) % 4 == 0){
        All.push($d);
        $d = [];
      }
    }

    for(let i = 0 ; i < All.length ; i ++){
      BuildList.push(get_color(All[i][0], All[i][1], All[i][2]));
    }

    draw(BuildList, pixels.shape[0], pixels.shape[1], parseInt(x), parseInt(y), parseInt(z));
  });
}

function draw(map, w, h, x, y, z){
  let t = 0;
  let that = this
  let $i = setInterval( () => {
    if(x == w){
      y = y + 1;
      x=0;
    }

    console.log([
      'setblock',
      x = x +1,
      y,
      z,
      map[t][0],
      map[t][1]
    ].join(' '));

    t++;
    if(t == map.length){
      clearInterval($i);
    }
  }, 10);
}
