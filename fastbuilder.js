const WebSocket = require('ws');
const uuid = require('node-uuid');
const clc = require('cli-color');
const helps = require("./helps");
const Constants = require('./constants');
const generate = require('./Algorithms');
const reader = require('./Reader');
if (process.argv.splice(2).indexOf("-debug") != -1){
	console.log(clc.green("Debug mod!"));
};
var localhost = '';
try {
	var network = require('os').networkInterfaces();
	localhost = network[Object.keys(network)[1]][0].address;
} catch(e) {
	localhost = 'localhost'
}
const Socket = new WebSocket.Server({
	port: Constants.port
});
console.log(clc.blue.bold("\n" +
	"    ______           __  ____        _ __    __         \n" +
	"   / ____/___ ______/ /_/ __ )__  __(_) /___/ /__  _____\n" +
	"  / /_  / __ `/ ___/ __/ __  / / / / / / __  / _ \\/ ___/\n" +
	" / __/ / /_/ (__  ) /_/ /_/ / /_/ / / / /_/ /  __/ /    \n" +
	"/_/    \\__,_/____/\\__/_____/\\__,_/_/_/\\__,_/\\___/_/ \n" +
	"                                                        \n"));
console.log("Maintianers: CAIMEO,LNSSPsd,Torrekie");
console.log("Server running at ws://" + localhost + ":" + Constants.port);
Socket.on('connection',
	function connection(ws, req) {
		console.log("[Info]%s Connected!", req.connection.remoteAddress);
		let x = 0;
		let y = 0;
		let z = 0;
		function get_number(String) {
			var List = String.match(/\-?[0-9]*/g);//[1-9]
			for(var i = 0;i<List.length;i++){
				if(List[i]==''){
					List.splice(i,1);
					i=i-1;
				}
			}
			return List;
		}
		function subscribe(event) {
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
		function unsubscribe(event) {
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
		function sendCommand(command, requestId) {
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
		let ExternalId = uuid.v4();
		function sendText(text,om,oc) {
			if (om == undefined) var om = "say";
			if (oc == undefined) var oc = "§l§e";
			var ot = om + " " + oc;
			sendCommand(ot + " " + text, ExternalId);
		}
		let block = "iron_block";
		let data = 0;
		let buildMod = "replace";
		function setblock(session, tile, data, mode, millis) {
			if (session.length === 0) return;
			var times = 0;
			var BuilderID = uuid.v4();
			var interval = setInterval(function() {
					sendCommand("setblock " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + tile + " " + data + " " + mode, BuilderID);
					if (Constants.log) {
						console.log("setblock " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + tile + " " + data + " " + mode);
					}
					times++;
					if (times == session.length) {
						clearInterval(interval);
					}
				},
				millis);
		}
		function fill(session, direction, offset, tile, data, mode, millis) {
			if (session.length === 0) return;
			var times = 0;
			var BuilderID = uuid.v4();
			if (session.length === 0 ) {
				return;
			}
			let dx = 0,
				dy = 0,
				dz = 0;
			switch (direction) {
				case "x":
					dx = offset * 1;
					break;
				case "y":
					dy = offset * 1;
					break;
				case "z":
					dz = offset * 1;
					break;
				default:
					break;
			}
			var interval = setInterval(function() {
					sendCommand("fill " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + (session[times][0] * 1 + dx) + " " + (session[times][1] * 1 + dy) + " " + (session[times][2] * 1 + dz) + " " + tile + " " + data + " " + mode, BuilderID);
					if (Constants.log) {
						console.log("fill " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + (session[times][0] * 1 + dx) + " " + (session[times][1] * 1 + dy) + " " + (session[times][2] * 1 + dz) + " " + tile + " " + data + " " + mode);
					}
					times++;
					if (times == session.length) {
						clearInterval(interval);
					}
				},
				millis);
		}
		function summon(session, entity, millis){
			if (session.length === 0)return;
			var times = 0;
			var BuilderID = uuid.v4();
			var interval = setInterval(function () {
					sendCommand("summon " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + entity, BuilderID);
					if (Constants.log) {
						console.log("summon " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + entity);
					}
					times++;
					if (times == session.length){
						clearInterval(interval);
					}
			},
				millis);
		}
		function sendHelp(help){
			switch (help) {
				case "round":
					sendText(helps.round);
					break;
				case "circle":
					sendText(helps.circle);
					break;
				case "ligature":
					sendText(helps.ligature);
					break;
				case "ellipse":
					sendText(helps.ellipse);
					break;
				case "ellipsoid":
					sendText(helps.ellipsoid);
					break;
				case "sphere":
					sendText(helps.sphere);
					break;
				default:break;
			}
		}
		let statusMessage = null;
		let collectorID = uuid.v4();
		function start_build(json){

		}
		sendText("FastBuilder connected!");
		ws.on("message",
			function incoming(message) {
				var json = JSON.parse(message);
				if(Constants.log)console.log(json);
				if (json.header.requestId == collectorID) {
					statusMessage = json.body.statusMessage;
					if (statusMessage != null) {
						switch (target) {
							case "pos" || "position":
								var position = get_number(statusMessage);
								x = position[0] * 1;
								y = position[1] * 1;
								z = position[2] * 1;
								sendText("Position get:" + x + "," + y + "," + z);
								break;
							case "player":
								var list = get_player();
								break;
							default:
								break;
						}
					}
				}
				if (json.body.eventName == "PlayerMessage" && json.header.requestId != ExternalId) {
					var chat = json.body.properties.Message;
					var read = reader.ReadMessage(chat);
					console.log(read);
					if(read.showhelp != undefined){
						sendHelp(read.showhelp);
					}
					var Achat = chat.trim().split(" ");
					if (Constants.log) {
						console.log(Achat);
					}
					if (Achat[0] == "help") {
						if (Achat[1] == undefined) {
							var cmdz = "";
							for (let i in helps) {
								cmdz += i + "  "
							}
							sendText("Avalible Commands for help:");
							sendText(cmdz);
							return;
						}
						if (Achat[1] == "-l") {
							sendText("Helps:");
							for (let i in helps) {
								eval("sendText(helps." + i + ")");
							}
							return;
						}
						try {
							eval("if(helps." + Achat[1] + "!=undefined){sendText(helps." + Achat[1] + ");}else{sendText(\"§4Help of command \\\"" + Achat[1] + "\\\" not found.\");}");
						} catch(err) {
							sendText("§4Error when we're trying to get help: " + err);
						}
					} else {
						switch (Achat[0]) {
							case "get":
								target = Achat[1];
								sendCommand("testforblock ~~~ air", collectorID);
								break;
							case "let":
								switch (Achat[1]) {
									case "block":
										block = Achat[2];
										break;
									case "data":
										data = Achat[2] * 1;
										break;
									case "mod":
										buildMod = Achat[2];
										break;
									default:
										sendText("§4Let: Variable \"" + Achat[1] + "\" not found.");
										return;
								}
								sendText("Let: " + Achat[1] + "=" + Achat[2] + "done.");
								break;
							case "ligature":
								if (Achat[6] == undefined) {
									sendText("§4Ligature: Parameters Error.\nhelp ligature for help.");
								}
								setblock(generate.ligature([Achat[1], Achat[2], Achat[3]], [Achat[4], Achat[5], Achat[6]]), block, data, buildMod);
								break;
							case "round":
								//round 方向 半径 高度
								if (Achat[3] == undefined) {
									sendText("§4Round: Parameters Error.\nhelp round for help.");
								}
								fill(generate.round(Achat[1], Achat[2], x, y, z), Achat[1], Achat[3], block, data, buildMod);
								break;
							case "ellipse":
								//ellipse 方向 x长度 z宽度 高度 精度
								if (Achat[5] == undefined) {
									sendText("§4Ellipse: Parameters Error.\nhelp ellipse for help.");
								}
								fill(generate.ellipse(Achat[1], Achat[2], Achat[3], x, y, z, Achat[5]), Achat[1], Achat[4], block, data, buildMod);
								break;
							case "circle":
								//circle 方向 半径 高度
								if (Achat[3] == undefined) {
									sendText("§4Circle: Parameters Error.\nhelp circle for help.");
								}
								fill(generate.circle(Achat[1], Achat[2], x, y, z), Achat[1], Achat[3], block, data, buildMod);
								break;
							case ("dc" || "disconnect" || "bye") : ws.terminate();
							case "sphere":
								//sphere 状态 半径
								if (Achat[2] == undefined) {
									sendText("§4Sphere: Parameters Error.\nhelp sphere for help.");
								}
								setblock(generate.sphere(Achat[1], Achat[2], x, y, z), block, data, buildMod);
								break;
							case "ellipsoid":
								if (Achat[4] == undefined) {
									sendText("§4Ellipsoid: Parameters Error.\nhelp ellipsoid for help.");
								}
								//ellipsoid x宽度 y宽度 z宽度 精度
								setblock(generate.ellipsoid(Achat[1], Achat[2], Achat[3], x, y, z, Achat[4]), block, data, buildMod);
								break;
							default:
								break;
						}
					}
				}
			});
	});