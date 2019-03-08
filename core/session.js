const Read = require('./argv');
const Algorithms = require('./algorithms');
const helps = require('./profile').helps;
const crypto = require('crypto');
let $on = true;
let $default = {};
let $history = {
  players:[],
  locate:[],
  position:[]
};
const UUIDGeneratorNode = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
    );

class BuildSession {
  static createAndBind (session){
    let r = new BuildSession();
    r.stop = true;
    r.session = session;
    r.init();
    return r;
  }

  init(){
    this.sendText('FastBuilder connected!');
    this.sendText(now() + 'Loading Script...','§e');
    let that = this;
    let $sender = setInterval(()=>{
      if(that.stop){
        that.session.socket.send(JSON.stringify({
          header: {
            version: 1,
            requestId: UUIDGeneratorNode(),
            messagePurpose: 'commandRequest',
            messageType: 'commandRequest'
          },
          body: {
            version: 1,
            commandLine: 'title @s actionbar §bCAIMEO@FastBuilder:Ready!'
          }
        }),(e)=>{
          if(e){
            clearInterval($sender);
          }
        });
      }
    },1000);
    Algorithms.LoadScript(this);
    this.session.subscribe('PlayerMessage', onPlayerMessage.bind(this));
    $default = {
      position:[0,0,0],
      block:'iron_block',
      data:0,
      method:'normal',
      su:false,
      block2:'',
      data2:'',
      entity:'ender_crystal'
    }
  }

  onChatMessage (msg, player, files){
    let x = Read.read(msg, $default);
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
      }else if(x.main.stop){
        this.stop = true;
        this.sendText(now() + 'Stopped');
      }
    this.doit(x, player, msg);
  }

  sendText (text, opts){
    opts = opts ||'§b';
    this.session.sendCommand(['say',opts+'§\"'+text+'§\"'].join(' '));
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
    let {main, header, build, collect, server} = args;
    let {position, block, data, method, block2, data2, entity} = header;
    let delays = main.delays;

    method = method == 'normal' ? 'replace':[method,block2,data2].join(' ');
    if(main.exec){
      this.session.sendCommand(main.exec, (body) => {
        this.sendText('EXEC: ' + body.statusMessage,'§e');
      });
      return;
    }

    if(main.eval_){
      this.sendText(this.tryEval(main.eval_));
    }
    if(main.toRoot){
      $default.su = true;
    }
    else if(main.exitRoot){
      $default.su = false;
    }

    if(collect.writeData){
      $default = header;
      this.sendText(now() + 'Data wrote!');
    }

    if(this.showhelp(server)){
      return;
    }

    if(main.isCmd){

      this.sendText(($default.su ? 'root' : player) + '@FastBuilder: ' + msg);

      let {
        map,foo
      } = Algorithms.builder(header,build,this);

      if(!map){
        return;
      }

      else if(map.length === 0){
        this.sendText(now() + 'Input error.You can type \'' + build[0].type + ' help\' to get help');
        return;
      }

      else if((map.length * delays) / 1000 >= 240 && !root){
        this.sendText(now() + 'Permission denied: Time takes more than 4 minutes.Are you root?');
        return;
      }

      else if(build.entityMod){
        this.sendText(now() + 'Time need: ' + ((map.length * delays * build[0].height) / 1000) + 's.');
      }
      else{
        this.sendText(now() + 'Time need: ' + ((map.length * delays) / 1000) + 's.')
      }

      this.sendText(now() + 'Please wait patiently!');

        switch (foo) {
          case 'setTile':
            this.setTile(header.su, map, block, data, method, delays);
            break;

          case 'setLongTile':
            this.setLongTile(header.su, map, build[0].height, build[0].direction, block, data, method, delays);
            break;

          case 'setEntity':
            this.setEntity(header.su, map, entity, delays);
            break;

          case 'setLongEntity':
            this.setLongEntity(header.su, map, build.height, entity, delays);
            break;

          case 'setblock':
            this.setblock(map, method, delays);
            break;

          default:
		        throw new Error('Unknown function.');
            break;
        }
    }

    if(collect.get){
    this.getValue(collect.get);
    }

    else if(collect.locate){
      this.getValue('locate',collect.locate);
    }
  }

  getValue(type, other){
    if(type == 'pos' || type == 'position'){
      this.session.sendCommand(['testforblock','~','~','~','air'].join(' '),(body) => {
        let pos = [body.position.x,body.position.y,body.position.z];
        $default.position = pos;
        $history.position.push(pos);
        this.sendText('Position get: ' + $default.position.join(' '));
      });
    }

    else if(type == 'player' || type == 'players'){
      this.session.sendCommand('listd',(body) => {
        let $players = body.players;
        $history.players.push($players);
        let $p = '';
        for(let i = 0 ; i < $history.players[$history.players.length - 1].length ; i++){
          $p = [$p,i,'.',$history.players[$history.players.length - 1][i],'; '].join('');
        }

        this.sendText(now() + 'Online players: ' + $p);
      });
    }

    else if(type == 'locate'){
      this.session.sendCommand(['locate',other].join(' '),(body) => {
        if(!body.destination){
          this.sendText('Feature not found!');
          return;
        }
        else{
          let $locate = [body.destination.x,body.destination.y,body.destination.z];
          $history.locate.push($locate);
          this.sendText('Feature found: ' + $locate.join(' '));
          this.session.sendCommand('tp '+ $locate.join(' '));
        }
      });
    }
  }

  setTile(root, list, block, data, mod, delays){
    this.stop = false;
    let t = 0;
    let that = this;
    let done = 0 ,
        time = (new Date()).getTime();
    let interval = setInterval(() => {
      if(that.stop){
        clearInterval(interval);
      }
      that.session.sendCommand([
        'fill',
        list[t][0],list[t][1],list[t][2],
        list[t][0],list[t][1],list[t][2],
        block,
        data,
        mod
      ].join(' '),() =>{
        done++;
        that.session.sendCommand(["title", "@s", "actionbar", "§b§\""
        + done + "/" + list.length, "(" + ((done / list.length).toFixed(2) * 100) + "/100)",
          "", "Speed:", (done / (((new Date()).getTime() - time) / 1000)).toFixed(3) +
          "blocks/s" + "\nTime remaining:",
          ((list.length * (((new Date()).getTime() - time)) / done) - ((new Date()).getTime() - time)) / 1000 + "s§\""
        ].join(" "));
      });
      t++;
      if(t == list.length){
        that.sendText(now() + 'Structure has been generated!');
        that.stop = true;
        clearInterval(interval);
      }
    }, delays);
  }

  async isTile(x, y, z, b, d){
    //It does not work :(
    d = d || 0;
    let matches = await this.session.sendCommandSync(['testforblock',x,y,z,b,d].join(' '));
    return matches.matches;
  }

  setblock(list, mod, delays){
    this.stop = false;
    let t = 0;
    let that = this;
    let done = 0,
        time = (new Date()).getTime();
    let interval = setInterval(() => {
      if(that.stop){
        clearInterval(interval);
      }
      that.session.setTable(that.session.sendCommand([
        'fill',
        list[t][0],list[t][1],list[t][2],
        list[t][0],list[t][1],list[t][2],
        list[t][3],
        list[t][4],
        mod
      ].join(' ')),[
        'fill',
        list[t][0],list[t][1],list[t][2],
        list[t][0],list[t][1],list[t][2],
        list[t][3],
        list[t][4],
        mod
      ].join(' '));
      t++;
      if(t == list.length){
        that.stop = true;
        that.sendText(now() + 'Structure has been generated!');
        //hat.session.clearTable();
        clearInterval(interval);
      }
    }, delays);
  }

  setLongTile(root, list, len, direction, block, data, mod, delays){
    this.stop = false;
    let t = 0;
    let dx = direction == 'x' ? len : 0;
    let dy = direction == 'y' ? len : 0;
    let dz = direction == 'z' ? len : 0;
    let that = this;
    let done = 0,
        time = (new Date()).getTime();
    let interval = setInterval(()=> {
      if(that.stop){
        clearInterval(interval);
      }
      that.session.sendCommand([
        'fill',
        list[t][0],list[t][1],list[t][2],
        list[t][0] + dx,list[t][1] + dy,list[t][2] + dz,
        block,
        data,
        mod
      ].join(' '),() =>{
        done++;
        that.session.sendCommand(["title", "@s", "actionbar", "§b§\""
        + done + "/" + list.length, "(" + ((done / list.length).toFixed(2) * 100) + "/100)",
          "", "Speed:", (done / (((new Date()).getTime() - time) / 1000)).toFixed(3) +
          "blocks/s" + "\nTime remaining:",
          ((list.length * (((new Date()).getTime() - time)) / done) - ((new Date()).getTime() - time)) / 1000 + "s§\""
        ].join(" "));
      });
      t++;
      if(t == list.length){
        that.sendText(now() + 'Structure has been generated!');
        that.stop = true;
        that.clearTable();
        clearInterval(interval);
      }
    }, delays);
  }

  fillTile(root, list, block, data, mod, delays){
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
        that.sendText(now() + 'Structure has been generated!');
        clearInterval(interval);
      }
    }, delays);
  }

  setEntity(root, list, entity, delays){
    this.stop = false;
    let t = 0;
    let that = this;
    let done = 0,
        time = (new Date()).getTime();
    let interval = setInterval(() => {
      if(that.stop){
        clearInterval(interval);
      }
      that.session.sendCommand([
        'summon',
        entity,
        list[t].join(' ')
      ].join(' '),() =>{
        done++;
        that.session.sendCommand(["title", "@s", "actionbar", "§b§\""
        + done + "/" + list.length, "(" + ((done / list.length).toFixed(2) * 100) + "/100)",
          "", "Speed:", (done / (((new Date()).getTime() - time) / 1000)).toFixed(3) +
          "blocks/s" + "\nTime remaining:",
          ((list.length * (((new Date()).getTime() - time)) / done) - ((new Date()).getTime() - time)) / 1000 + "s§\""
        ].join(" "));
      });
      t++;
      if(t == list.length){
        that.sendText(now() + 'Entity structure has been generated!');
        that.stop = true;
        clearInterval(interval);
      }
    }, delays);
  }

  setLongEntity(root, list, len, direction, entity, delays){
    //It does not work.But I don't want to fix it.
    let t = 0;
    let that = this;
    let dx = direction == 'x' ? len : 1;
    let dy = direction == 'y' ? len : 1;
    let dz = direction == 'z' ? len : 1;
    let interval = setInterval(() => {
      that.session.sendCommand([
        'summon',
        entity,
        list[t].join(' ')
      ].join(' '));
      t++;
      if(t == list.length){
        that.sendText(now() + 'Entity structure has been generated!');
        clearInterval(interval);
      }
    }, delays);
  }

  tryEval(code){
    let r;
    try{
      r = eval(code);
    }catch (e) {
      r = e;
    }
    return r;
  }
}

function onPlayerMessage(body){
  let properties = body.properties;
  if (properties.MessageType != 'chat' || !$on) return;
  $on = false;
  let $t = setTimeout(()=> {
    $on = true;
  }, 10);
  this.onChatMessage(properties.Message, properties.Sender, properties);
}

function now(){
  let date = new Date();
  return ['[',date.toTimeString().slice(0, 8),']'].join('');
}
module.exports = BuildSession;
