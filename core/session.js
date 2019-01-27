const readMessage = require('./argv');
const builder = require('./algorithms');
var Bheader = {}
class BuildSession {
  static createAndBind (session){
    var r = new BuildSession();
    r.session = session;
    r.init();
    return r;
  }

  init(){
    this.sendText('FastBuilder connected!');
    this.session.subscribe('PlayerMessage', onPlayerMessage.bind(this));
    header_write(true,{
      p:[0,0,0],
      b:'air',
      d:0,
      m:'replace',
      su:false
    });
  }

  onChatMessage (msg, player, files){
    if(msg == 'screenfetch'){
      this.sendText('screenfetch' +
      '\n§bMinecraftVersion: §a' + files.Build +
      '\n§bUser: §a' + player +
      '\n§bLanguage: §a' + files.locale +
      '\n§bUserGamemode: §a' + files.PlayerGameMode +
      '\n§bBiome: §a' + files.Biome +
      '\n§bOS: §a' + files.Plat);
      }
    if(msg == 'listd'){
      this.session.sendCommand('listd');
      this.sendText(this.session.getHistory('player',0));
    }
    if(msg == 'get'){
      this.session.sendCommand('testforblock ~ ~ ~ air');
      this.sendText(this.session.getHistory('position',0));
    }
    if(msg == 'locate'){
      this.session.sendCommand('locate village');
      this.sendText(this.session.getHistory('locate',0));
    }
    var x = readMessage(msg, header_write());
    console.log('XXXXX:',x);
    this.doit(x);
  }

  sendText (text, opts){
    opts = opts ||'§b';
    this.session.sendCommand(['say',opts,text].join(' '));
    console.log('SendText: ' + text);
  }

  doit(args){
    let main = args.main;
    if(main.toRoot){
      header_write(true,{
        su:true
      });
    }
    if(main.isCmd) this.sendText((header_write().su ? 'root' : player) + '@FastBuilder: # ' + msg);
    let h = args.header;
    let b = args.build;
  }

  setTile(root, list, block, data, mod, delays){
    if(list == 0)return;
    if((list.length * delays) / 1000 >= 120 && !root){
      sendText('Permission denied: Time takes more than 2 minutes.Are you root?');
      return;
    }
    sendText('Please wait patiently!');
    var t = 0;
    var interval = setInterval(function () {
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
    var t = 0;
    var dx = direction == 'x' ? len : 0;
    var dy = direction == 'y' ? len : 0;
    var dz = direction == 'z' ? len : 0;
    var interval = setInterval(function() {
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
    var t = 0;
    var interval = setInterval(function () {
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
    var t = 0;
    var interval = setInterval(function () {
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
    var t = 0;
    var dx = direction == 'x' ? len : 0;
    var dy = direction == 'y' ? len : 0;
    var dz = direction == 'z' ? len : 0;
  }

}

function header_write(r,opts){
  if(r){
    Bheader.p = opts.p;
    Bheader.b = opts.b;
    Bheader.d = opts.d;
    Bheader.m = opts.m;
    Bheader.su = opts.su;
  }
  return Bheader;
}

function onPlayerMessage(body){
  var properties = body.properties;
  console.log(properties);
  if (properties.MessageType != 'chat') return;
  this.onChatMessage(properties.Message, properties.Sender, properties);
}

module.exports = BuildSession;
