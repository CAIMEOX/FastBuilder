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

function Paint(path){
  get_pixels(path, (err, pixels) => {
    if(err){
      console.log(err)
      return ;
    }

    let arr = [];
    let All = [];
    let $d = [];

    for (let i in arr){
      $d.push(arr[i]);
      if(i != 0 && (i + 1) % 4 == 0){
        All.push($d);
        $d = [];
      }
    }
    console.log(All)
    BuildList = [];

    for(let i in All){
      BuildList.push(get_color(All[i][0], All[i][1], All[i][2]));
    }

    console.log(BuildList);
  });
}

Paint('/home/caimeo/图片/logo2.png')
