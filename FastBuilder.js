const Constants = require('./constants');
const WebSocket = require('ws');
const uuid = require('node-uuid');
const generate = require('./Algorithms');
const socket = new WebSocket.Server({
	port: Constants.port
});
console.log("FastBuilder: v" + Constants.VERSION);
console.log("Copyright (C) CAIMEO");
console.log("Server running at ws://127.0.0.1:"+Constants.port);
socket.on('connection', function connection(ws, req) {
console.log("%s connected!", req.connection.remoteAddress);
let x = 0;
let y = 0;
let z = 0;
  function get_number(String) {
		var reg = /\-?[1-9][0-9]*/g;
		return List = String.match(reg);
  }
  function subscribe(event){
  	ws.send(JSON.stringify({
			"body": {
				"eventName": event
			},
			"header": {
				"requestId": uuid.v4(),
				"messagePurpose": "subscribe",
				"version": 1,
				"messageType": "commandRequest"
			}
	}));
}
		subscribe("PlayerMessage");
  function unsubscribe(event){
  	ws.send(JSON.stringify({
			"body": {
				"eventName": event
			},
			"header": {
				"requestId": uuid.v4(),
				"messagePurpose": "unsubscribe",
				"version": 1,
				"messageType": "commandRequest"
			}
	}));
}
  function sendCommand(command, requestId){
  	ws.send(JSON.stringify({
			"body": {
				"origin": {
					"type": "player"
				},
				"commandLine": command,
				"version": 1
			},
			"header": {
				"requestId": requestId,
				"messagePurpose": "commandRequest",
				"version": 1,
				"messageType": "commandRequest"
			}
	}));
}
  let om = "say ";
  let oc = "§l§e";
  let ot = om + oc;
  let ExternalId = uuid.v4();
  function sendText(text){
  	sendCommand(ot + text, ExternalId);
}
  //默认延迟
  let DefaultMillis = 10;
  let block = "iron_block";
  let data = 0;
  let buildMod = "replace";
  function setblock(session, tile, data, mode, Millis){
		if(session.length === 0)return;
    //for(var i = 0; i < session.length; i++){}
    var times = 0;
    var BuilderID = uuid.v4();
    if(Millis == undefined){
    let Millis = DefaultMillis;
    }
    var interval = setInterval(function (){
    	sendCommand("setblock " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + tile + " " + data + " " + mode, BuilderID);
    	console.log("setblock " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + tile + " " + data + " " + mode);
      	times++;
      	if(times == session.length){
        clearInterval(interval);
        }
      }, Millis);
  }
  function fill(session, direction, offset, tile, data, mode, Millis){
		if(session.length === 0)return;
  	var times = 0;
  	var BuilderID = uuid.v4();
  	if(Millis == undefined){
    let Millis = DefaultMillis;
    }
		if(session == []){
			return;
		}
    let dx = 0,dy = 0,dz = 0;
		switch(direction){
				case "x":
					 dx = offset * 1;
				break;
				case "y":
           dy = offset * 1;
				break;
				case "z":
					 dz = offset * 1;
				break;
				default:break;
		}
		// if (dx == undefined){ let dx = 0; }
		// if (dy == undefined){ let dy = 0; }
		// if (dz == undefined){ let dz = 0; }
    var interval = setInterval(function (){
    	sendCommand("fill " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + (session[times][0]*1 + dx) + " " + (session[times][1]*1 + dy) + " " + (session[times][2]*1 + dz)+ " " + tile + " " + data + " " + mode, BuilderID);
      console.log("fill " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + (session[times][0]*1 + dx) + " " + (session[times][1]*1 + dy) + " " + (session[times][2]*1 + dz) + " " + tile + " " + data + " " + mode, BuilderID);
      	times++;
      	if(times == session.length){
        clearInterval(interval);
        }
      }, Millis);
  	}
  let statusMessage = null;
  let collectorID = uuid.v4();
  function ligature(PosArray1, PosArray2){
    var session = new Array();
  	var x1 = PosArray1[0]*1, y1 = PosArray1[1]*1, z1 = PosArray1[2]*1;
    var x2 = PosArray2[0]*1, y2 = PosArray2[1]*1, z2= PosArray2[2]*1;
    var line = Math.max(Math.abs(x1 - x2),Math.abs(y1 - y2),Math.abs(z1 - z2))*1;
    for(var i = 0; i <= line; i++){
    	session.push([Math.round(x1 + i / line * (x2 - x1)), Math.round(y1 + i / line * (y2 - y1)), Math.round(z1 + i / line * (z2 - z1))]);
    }
    return session;
  }
	ws.on("message", function incoming(message) {
      var json = JSON.parse(message);
      if(json.header.requestId == collectorID){
      	statusMessage = json.body.statusMessage;
      	if(statusMessage != null){
      	 switch(target){
      	  case "pos" || "position":
      	   var position = get_number(statusMessage);
           x = position[0]*1;
           y = position[1]*1;
           z = position[2]*1;
      	   sendText("Position get:" + x + "," + y + "," + z );
      	   break;
      	  case "player":
      	   var list = get_player();
      	   break;
      	  default:
      	  break;
      	 }}
      }
      if(json.body.eventName == "PlayerMessage" && json.header.requestId != ExternalId) {
        var chat = json.body.properties.Message;
        var Achat = chat.trim().split(" ");
        console.log(Achat)
        if(Achat[1] == "-help" || Achat[1] == "-h" || Achat[1] == "h" || Achat[1] == "help"){
          switch(Achat[0]){
          case "round":
          	sendText(helps.round);
          	break;
          case "circle":
           sendText(helps.circle);
           break;
          case "ligature":
           sendText(helps.ligature);
           break;
          default:
           sendText("Method not found");
           break;
				 }
			 }else {
        switch(Achat[0]){
					case "get":
					target = Achat[1];
	        	sendCommand("testforblock ~~~ air", collectorID);
						break;
          case "let":
            switch(Achat[1]){
              case "block":
                block = Achat[2];
              break;
              case "data":
                data = Achat[2]*1;
              break;
              case "mod":
                buildMod = Achat[2];
              break;
            }
          break;
          case "ligature":
            setblock(generate.ligature([Achat[1],Achat[2],Achat[3]],[Achat[4],Achat[5],Achat[6]]),block,data,buildMod);
           break;
          case "round":
          //round 方向 半径 高度
            fill(generate.round(Achat[1],Achat[2],x,y,z),Achat[1],Achat[3],block,data,buildMod);
           break;
					case "ellipse":
					//ellipse 方向 x长度 z宽度 高度 精度
						fill(generate.ellipse(Achat[1],Achat[2],Achat[3],x,y,z,Achat[5]),Achat[1],Achat[4],block,data,buildMod);
						break;
          case "circle":
          //circle 方向 半径 高度
            fill(generate.circle(Achat[1],Achat[2],x,y,z),Achat[1],Achat[3],block,data,buildMod);
           break;
          case "sphere":
          //sphere 状态 半径
					  setblock(generate.sphere(Achat[1],Achat[2],x,y,z),block,data,buildMod);
						break;
					case "ellipsoid":
					//ellipsoid x宽度 y宽度 z宽度 精度
						setblock(generate.ellipsoid(Achat[1],Achat[2],Achat[3],x,y,z,Achat[4]),block,data,buildMod);
						break;
					default:break;
        	}
				}
      }
	});
});
