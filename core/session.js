const readMessage = require('./argv');
const Algorithms = require('./algorithms');
const helps = require('./profile').helps;
let $default = {};
class BuildSession {
  static createAndBind (session){
    let r = new BuildSession();
    r.session = session;
    r.init();
    return r;
  }

  init(){
    this.sendText('FastBuilder connected!');
    this.session.subscribe('PlayerMessage', onPlayerMessage.bind(this));
    $default = {
      position:[0,0,0],
      block:'iron_block',
      data:0,
      method:'normal',
      su:false,
      $block:'air',
      $data:0,
      entity:'ender_crystal'
    }
  }

  onChatMessage (msg, player, files){
    let x = readMessage(msg, $header());
    if(x.server.close){
      this.sendText('FastBuilder disconnecting...');
      this.session.sendCommand('closewebsocket');
    }else if(x.server.screenfetch){
      this.sendText('screenfetch' +
      '\n§bMinecraftVersion: §a' + files.Build +
      '\n§bUser: §a' + player +
      '\n§bLanguage: §a' + files.locale +
      '\n§bUserGamemode: §a' + files.PlayerGameMode +
      '\n§bBiome: §a' + files.Biome +
      '\n§bOS: §a' + (files.Plat != '' ? files.Plat : files.ClientId));
      }
    this.doit(x, player, msg);
  }

  sendText (text, opts){
    opts = opts ||'§b';
    this.session.sendCommand(['say',opts,'§\"',text,'§\"'].join(' '));
    console.log('SendText: ' + text);
  }

  showhelp(args){
    if(args.helpMessage){
      let $help = '';
      for (let i in helps){
        $help += i + ' ';
      }
      this.sendText($help);
      this.sendText('For more helps , type \'help -l\'.');
      return true;
    }else if(args.listHelp){
      for(let i in helps){
        this.sendText(helps[i]);
      }
      return true;
    }else if(args.showhelp){
        this.sendText(helps[args.showhelp]);
        return true;
    }else{
      return false;
    }
  }

  doit(args, player, msg){
    console.log(args);
    let {main, header, build, collect, server} = args;
    let {block, data, method, $block, $data, entity} = header;
    let delays = build.delays;

    method = method == 'normal' ? 'replace':[method,$block,$data].join(' ');

    if(main.toRoot){
      $default.su = true;
    }
    else if(main.exitRoot){
      $default.su = false;
    }

    if(main.isCmd){

      this.sendText(($default.su ? 'root' : player) + '@FastBuilder: ' + msg);
      this.showhelp(args.server);

      let {map, foo} = Algorithms.Builder(header,build) || {};

      if(!map){
        return;
      }

      else if(map.length === 0){
        this.sendText('Input error.You can type \'' + build.type + ' help\' to get help');
        return;
      }

      else if((map.length * delays) / 1000 >= 120 && !root){
        sendText('Permission denied: Time takes more than 2 minutes.Are you root?');
        return;
      }

      if(build.entityMod){
        this.sendText('Time need: ' + ((map.length * delays * build.height) / 1000) + 's.');
      }
      else{
        this.sendText('Time need: ' + ((map.length * delays) / 1000) + 's.')
      }

        switch (foo) {
          case 'setTile':
            this.setTile(header.su, map, block, data, method, delays);
            break;

          case 'setLongTile':
            this.setLongTile(header.su, map, build.height, build.direction, block, data, method, delays);
            break;

          case 'setEntity':
            this.setEntity(header.su, map, entity, delays);
            break;

          default:
            console.log('Unknown error!!Exiting...');
            processor.exit();
            break;
        }
    }

    if(collect.writeData){
      $header(true, header);
      this.sendText('Data wrote!');
    }

    if(collect.get){
    this.getValue(collect.get);
    }else if(collect.locate){
      this.session.sendCommand(['locate ',collect.locate].join(' '));
      let that = this;
      let $t = setTimeout(() => {
        let $a = that.getValue('locate').join(' ');
        that.session.sendCommand(['tp','@s',$a].join(' '));
      }, 250);
    }


  }

  getValue(type){
    let that = this;
    if(type == 'pos' || type == 'position'){
      this.session.sendCommand(['testforblock','~','~','~','air'].join(' '));
       let $b = setTimeout(() =>{
         $default.position = this.session.getHistory('position','last');
         that.sendText('Position get: ' + $default.position.join(' '));
       }, 250);
    }else if(type == 'player' || type == 'players'){
      this.session.sendCommand('listd');
      let $c = setTimeout(() => {
        that.sendText('Online players: ' + that.session.getHistory('players','last'));
      }, 250);
    }else if(type == 'locate'){
      let $d = this.session.getHistory('locate','last');
      return $d;
    }
  }

  setTile(root, list, block, data, mod, delays){
    this.sendText('Please wait patiently!');
    let t = 0;
    let that = this;
    let interval = setInterval(() => {
      that.session.sendCommand([
        'fill',
        list[t][0],list[t][1],list[t][2],
        list[t][0],list[t][1],list[t][2],
        block,
        data,
        mod
      ].join(' '));
      t++;
      if(t == list.length){
        that.sendText('Structure has been generated!');
        clearInterval(interval);
      }
    }, delays);
  }

  setLongTile(root, list, len, direction, block, data, mod, delays){
    this.sendText('Please wait patiently!');
    let t = 0;
    let dx = direction == 'x' ? len : 0;
    let dy = direction == 'y' ? len : 0;
    let dz = direction == 'z' ? len : 0;
    let that = this;
    let interval = setInterval(function() {
      that.session.sendCommand([
        'fill',
        list[t][0],list[t][1],list[t][2],
        list[t][0] + dx,list[t][1] + dy,list[t][2] + dz,
        block,
        data,
        mod
      ].join(' '));
      t++;
      if(t == list.length){
        that.sendText('Structure has been generated!');
        clearInterval(interval);
      }
    }, delays);
  }

  fillTile(root, list, block, data, mod, delays){
    this.sendText('Please wait patiently!');
    let that = this;
    let t = 0;
    let interval = setInterval(function () {
      that.session.sendCommand([
        'fill',
        list[t][0], list[t][1], list[t][2],
        list[t][3], list[t][4], list[t][5],
        block,
        data,
        mod
      ].join(' '));
      t++;
      if(t == list.length){
        that.sendText('Structure has been generated!');
        clearInterval(interval);
      }
    }, delays);
  }

  setEntity(root, list, entity, delays){
    this.sendText('Please wait patiently!');
    let t = 0;
    let that = this;
    let interval = setInterval(() => {
      that.session.sendCommand([
        'summon',
        entity,
        list[t].join(' ')
      ].join(' '));
      t++;
      if(t == list.length){
        that.sendText('Entity structure has been generated!');
        clearInterval(interval);
      }
    }, delays);
  }

  setLongEntity(root, list, len, direction, entity, delays){
    this.sendText('Please wait patiently!');
    let t = 0;
    let dx = direction == 'x' ? len : 0;
    let dy = direction == 'y' ? len : 0;
    let dz = direction == 'z' ? len : 0;
  }

}

function $header(r,opts){
  if(r){

    $default.position = opts.position;
    $default.block = opts.block;
    $default.data = opts.data;
    $default.method = opts.method;
    $default.su = opts.su;
  }
  console.log($default);
  return $default;
}

function onPlayerMessage(body){
  let properties = body.properties;
  if (properties.MessageType != 'chat') return;
  this.onChatMessage(properties.Message, properties.Sender, properties);
}

module.exports = BuildSession;
