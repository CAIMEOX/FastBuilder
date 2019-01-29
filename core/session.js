const readMessage = require('./argv');
const builder = require('./algorithms');
const helps = require('./profile').helps;
const $Builder = require(./algorithms);
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
    $header(true,{
      position:[0,0,0],
      block:'air',
      data:0,
      method:'replace',
      su:false
    });
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

    if(main.toRoot){
      $default.su = true;
    }else if(main.exitRoot){
      $default.su = false;
    }

    if(main.isCmd){
      this.sendText(($header().su ? 'root' : player) + '@FastBuilder: # ' + msg);
      this.showhelp(args.server);
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
      }, 500);
    }

  }

  getValue(type){
    let that = this;
    if(type == 'pos' || type == 'position'){
      this.session.sendCommand(['testforblock','~','~','~','air'].join(' '));
       let $b = setTimeout(() =>{
         $default.position = this.session.getHistory('position','last');
         that.sendText('Position get: ' + $default.position.join(' '));
       }, 500);
    }else if(type == 'player' || type == 'players'){
      this.session.sendCommand('listd');
      let $c = setTimeout(() => {
        that.sendText('Online players: ' + that.session.getHistory('players','last'));
      }, 500);
    }else if(type == 'locate'){
      let $d = this.session.getHistory('locate','last');
      return $d;
    }
  }

  setTile(root, list, block, data, mod, delays){
    if(list == 0)return;
    if((list.length * delays) / 1000 >= 120 && !root){
      sendText('Permission denied: Time takes more than 2 minutes.Are you root?');
      return;
    }
    sendText('Please wait patiently!');
    let t = 0;
    let interval = setInterval(function () {
      this.session.sendCommand([
        'fill',
        list[t][0],list[t][1],list[t][2],
        list[t][0],list[t][1],list[t][2],
        block,
        data,
        mod
      ].join(' '));
      t++;
      if(times == list.length){
        sendText('Structure has been generated!');
        clearInterval(interval);
      }
    }, delays);
  }

  setLongTile(root, list, len, direction, block, data, mod, delays){
    if(list == 0)return;
    if((list.length * delays) / 1000 >= 120 && root){
      sendText('Permission denied: Time takes more than 2 minutes.Are you root?');
      return;
    }
    sendText('Please wait patiently!');
    let t = 0;
    let dx = direction == 'x' ? len : 0;
    let dy = direction == 'y' ? len : 0;
    let dz = direction == 'z' ? len : 0;
    let interval = setInterval(function() {
      this.session.sendCommand([
        'fill',
        list[t][0],list[t][1],list[t][2],
        list[t][0] + dx,list[t][1] + dy,list[t][2] + dz,
        block,
        data,
        mod
      ].join(' '));
      t++;
      if(times == list.length){
        sendText('Structure has been generated!');
        clearInterval(interval);
      }
    }, delays);
  }

  fillTile(root, list, block, data, mod, delays){
    if(list == 0)return;
    if((list.length * delays) / 1000 >= 120 && !root){
      sendText('Permission denied: Time takes more than 2 minutes.Are you root?');
      return;
    }
    sendText('Please wait patiently!');
    let t = 0;
    let interval = setInterval(function () {
      this.session.sendCommand([
        'fill',
        list[t][0], list[t][1], list[t][2],
        list[t][3], list[t][4], list[t][5],
        block,
        data,
        mod
      ].join(' '));
      t++;
      if(times == list.length){
        sendText('Structure has been generated!');
        clearInterval(interval);
      }
    }, delays);
  }

  setEntity(root, list, entity, delays){
    if(list == 0)return;
    if((list.length * delays) / 1000 >= 120 && !root){
      sendText('Permission denied: Time takes more than 2 minutes.Are you root?');
      return;
    }
    sendText('Please wait patiently!');
    let t = 0;
    let interval = setInterval(function () {
      this.session.sendCommand([
        'summon',
        entity,
        list[t].join(' ')
      ].join(' '));
      t++;
      if(times == list.length){
        sendText('Structure has been generated!');
        clearInterval(interval);
      }
    }, delays);
  }

  setLongEntity(root, list, len, direction, entity, delays){
    if(list == 0)return;
    if((list.length * delays) / 1000 >= 120 && root){
      sendText('Permission denied: Time takes more than 2 minutes.Are you root?');
      return;
    }
    sendText('Please wait patiently!');
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
  //console.log(properties);
  if (properties.MessageType != 'chat') return;
  this.onChatMessage(properties.Message, properties.Sender, properties);
}

module.exports = BuildSession;
