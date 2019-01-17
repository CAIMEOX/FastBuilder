const WebSocket = require('ws');
const uuid = require('node-uuid');
const clc = require('cli-color');
const helps = require('./core/helps');
const generate = require('./core/Algorithms');
const reader = require('./core/Reader');
var debug = process.argv.splice(2).indexOf("-debug") != -1 ? true : false;
debug && console.log(clc.green("Debug mod!"));
var localhost = null;
try {
    localhost = require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[1]][0].address;
}catch (e) {
    debug && console.log(clc.red("Get localhost error:" + e));
    localhost = "127.0.0.1";
}
console.log(clc.blue.bold("\n" +
    "    ______           __  ____        _ __    __          \n" +
    "   / ____/___ ______/ /_/ __ )__  __(_) /___/ /__  _____ \n" +
    "  / /_  / __ `/ ___/ __/ __  / / / / / / __  / _ \\/ ___/\n" +
    " / __/ / /_/ (__  ) /_/ /_/ / /_/ / / / /_/ /  __/ /     \n" +
    "/_/    \\__,_/____/\\__/_____/\\__,_/_/_/\\__,_/\\___/_/ \n" +
    "                                                         \n"));
console.log(clc.yellow.bold("Maintianers: CAIMEO"));
console.log(clc.yellow.bold("Other Contributors: LNSSPsd , Torrekie"));
var port = 8080;
const Socket = new WebSocket.Server({
    port: port
});
function get_number(String) {
    var List = String.match(/\-?[0-9]*/g);
    for(var i = 0;i<List.length;i++){
        if(List[i]==''){
            List.splice(i,1);
            i=i-1;
        }
    }
    return List;
}
console.log(clc.yellow.bold("Server is running at ws://" + localhost + ":" + port));
Socket.on('connection',function connection( ws, request) {
    if(debug)console.log(clc.green(request.connection.remoteAddress + clc.green(" connected!")));
    //Subscribe events
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
    //Send commands
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
    var ExternalId = uuid.v4();
    //Send text.
    /*
    * @om Output mod
    * @oc Output color
    * @text Output message
    * */
    function sendText(text,om,oc) {
        if (om == undefined) var om = "say";
        if (oc == undefined) var oc = "§l§e";
        var ot = om + " " + oc;
        sendCommand(ot + "§\"" + text + "§\"", ExternalId);
        debug && console.log(clc.yellow("SendCommand:" + ot + " " + text));
    }
    sendText("FastBuilder connected!");
    let _block = "iron_block";
    let _position = [0,0,0];
    let _data = 0;
    let _buildMod = "replace";
    let _entity = "sheep";
    let target = null;
    let statusMessage = null;
    function setblock(session, tile, data, mode, millis) {
        if (session.length === 0) {
            debug && console.log(clc.red("Setblock: Input Error!"));
            sendText("Input Error!","say", "§l§4");
            sendText("Please type \'help\` to get help.","say","§l§e");
            return;}
        sendText("Time need: " + session.length * millis / 1000 + "s");
        sendText("Please wait patiently!");
        var times = 0;
        var BuilderID = uuid.v4();
        var interval = setInterval(function() {
                sendCommand("fill " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + tile + " " + data + " " + mode, BuilderID);
                debug && console.log(clc.yellowBright("Setblock:" + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + tile + " " + data + " " + mode));
                times++;
                if (times == session.length){sendText("Structure has been generated!");clearInterval(interval);}
            },
            millis);
    }
    function fill(session, direction, offset, tile, data, mode, millis) {
        if (session.length === 0) {
            if(debug)console.log(clc.red("Fill: Input Error!"));
            sendText("Input Error!","say", "§l§4");
            sendText("Please type \'help\` to get help.","say","§l§e");
            return;}
        sendText("Time need: " + session.length * millis / 1000 + "s");
        sendText("Please wait patiently!");
        var times = 0;
        var BuilderID = uuid.v4();
        var dx = direction == "x" ? parseInt(offset) : 0;
        var dy = direction == "y" ? parseInt(offset) : 0;
        var dz = direction == "z" ? parseInt(offset) : 0;
        var interval = setInterval(function() {
                sendCommand("fill " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + (session[times][0] * 1 + dx) + " " + (session[times][1] * 1 + dy) + " " + (session[times][2] * 1 + dz) + " " + tile + " " + data + " " + mode, BuilderID);
                debug && console.log(clc.yellowBright("Fill: " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + (session[times][0] * 1 + dx) + " " + (session[times][1] * 1 + dy) + " " + (session[times][2] * 1 + dz) + " " + tile + " " + data + " " + mode));
                times++;
                if (times == session.length){sendText("Structure has been generated!");clearInterval(interval);}
            },
            millis);
    }
    function summon(session, entity, direction, height, millis){
        if (session.length === 0) {
            debug && console.log(clc.red("Fill: Input Error!"));
            sendText("Input Error!","say", "§l§4");
            sendText("Please type \'help\` to get help.","say","§l§e");
            return;}
        sendText("Time need: " + session.length * millis / 1000 + "s");
        sendText("Please wait patiently!");
        var dx = direction == "x" ? height : 0;
        var dy = direction == "y" ? height : 0;
        var dz = direction == "z" ? height : 0;
        var new_session = [];
        var times = 0;
        var BuilderID = uuid.v4();
        for(var c = 0 ; c < session.length ; c++){
            for(var x = -1 ; x < dx ; x++){
                for (var y = -1 ; y < dy ; y++){
                    for(var z = -1 ; z < dz ; z++){
                        new_session.push([session[c][0]+x,session[c][1]+y,session[c][2]+z]);
                    }
                }
            }
        }
        var interval = setInterval(function () {
                sendCommand("summon "  + entity + " " + new_session[times][0] + " " + new_session[times][1] + " " + new_session[times][2] , BuilderID);
                debug && console.log(clc.yellowBright("Summon: " + new_session[times][0] + " " + new_session[times][1] + " " + new_session[times][2] + " " + entity));
                times++;
                if (times == new_session.length){sendText("Entities structure has been summoned!");clearInterval(interval);}
            },
            millis);
    }
    function start(read) {
        var direction = read.direction;
        var position = read.position;
        var radius = read.radius;
        var shape = read.shape;
        var height = read.height * 1;
        var otherValue = read.others;
        var float = read.float;
        var block = read.block;
        var data = read.data;
        var buildMod = read.buildMod;
        var delays = read.delays;
        if (read.entityMod) var entity = read.entity;
        switch (read.buildType) {
            case "round":
                if (read.entityMod) {
                    summon(generate.round(direction, radius, position[0] * 1, position[1] * 1, position[2] * 1), entity, direction, height, delays)
                } else {
                    fill(generate.round(direction, radius, position[0] * 1, position[1] * 1, position[2] * 1), direction, height, block, data, buildMod, delays);
                }
                break;
            case "circle":
                if (read.entityMod) {
                    summon(generate.circle(direction, radius, position[0] * 1, position[1] * 1, position[2] * 1), entity, direction, height, delays)
                } else {
                    fill(generate.circle(direction, radius, position[0] * 1, position[1] * 1, position[2] * 1), direction, height, block, data, buildMod, delays);
                }
                break;
            case "sphere":
                if (read.entityMod) {
                    summon(generate.sphere(shape, radius, position[0] * 1, position[1] * 1, position[2] * 1), entity, height, delays)
                } else {
                    setblock(generate.sphere(shape, radius, position[0] * 1, position[1] * 1, position[2] * 1), block, data, buildMod, delays);
                }
                break;
            case "torus":
                if (read.entityMod) {
                    summon(generate.torus(otherValue[0], otherValue[1], otherValue[2], position[0] * 1, position[1] * 1, position[2] * 1, float), entity, otherValue[0], height, delays)
                } else {
                    setblock(generate.torus(otherValue[0], otherValue[1], otherValue[2], position[0] * 1, position[1] * 1, position[2] * 1, float), block, data, buildMod, delays);
                }
                break;
            case "ellipse":
                if (read.entityMod) {
                    summon(generate.ellipse(otherValue[0], otherValue[1], otherValue[2], position[0] * 1, position[1] * 1, position[2] * 1, float), entity, otherValue[0], height, delays)
                } else {
                    fill(generate.ellipse(otherValue[0], otherValue[1], otherValue[2], position[0] * 1, position[1] * 1, position[2] * 1, float), otherValue[0], height, block, data, buildMod, delays);
                }
                break;
            case "ellipsoid":
                if (read.entityMod) {
                    summon(generate.ellipsoid(otherValue[0], otherValue[1], otherValue[2], position[0] * 1, position[1] * 1, position[2] * 1, float), entity, height, delays)
                } else {
                    setblock(generate.ellipsoid(otherValue[0], otherValue[1], otherValue[2], position[0] * 1, position[1] * 1, position[2] * 1, float), block, data, buildMod, delays);
                }
                break;
            case "cone":
                if (read.entityMod){
                    summon(generate.cone(direction, height,radius,position[0]*1,position[1]*1,position[2]*1,float),entity, direction, height, delays);
                }
                setblock(generate.cone(direction, height,radius,position[0]*1,position[1]*1,position[2]*1,float),block,data,buildMod,delays);
                break;
            default:
                break;
        }
    }
    let collectorID = uuid.v4();
    function getInfo(cmd,ctarget) {
        sendCommand(cmd,collectorID);
        target = ctarget;
    }
    function sendHelp(reader){
	    if(reader.showhelp!=undefined){
	        sendText(helps[reader.showhelp],"say","");
	    }else if(reader.listhelpe!=undefined){
	        var hps="";
	        for(let i in helps){
	            hps += i + "  "
	        };
	        hps += "\nFor more helps,type help -l.";
	        sendText(hps,"say","");
	    }
	    else if(reader.listhelp!=undefined){
	        for(let i in helps){sendText(helps[i],"say","");}}
    }
    ws.on('message',function incoming(message) {
        var json = JSON.parse(message);
        console.log(json);
        if(json.header.requestId != ExternalId) {
            if (json.header.requestId == collectorID){
                statusMessage = json.body.statusMessage;
                if (statusMessage != null){
                    switch (target) {
                        case "pos" || "position":
                            _position = get_number(statusMessage);
                            console.log(clc.red(_position));
                            sendText("Position get: " + _position);
                            break;
                        case "player":
                            break;
                        default:break;
                    }
                }
            }else if (json.body.eventName == "PlayerMessage") {
                var chat = json.body.properties.Message;
                var read = reader.ReadMessage(chat,_position[0],_position[1],_position[2],_block,_data,_buildMod, _entity);
                console.log(read);
                if (read.listhelpe!=undefined||read.listhelp!=undefined||read.showhelp != undefined){
                    sendHelp(read);
                }else if(read.leave != undefined){
                    sendCommand("closewebsocket",uuid.v4());
                }else if(read.get != undefined){
                    switch (read.get) {
                        case "pos" || "position":
                            getInfo("testforblock ~ ~ ~ air","pos");
                            console.log(clc.red("getting info"));
                            break;
                        case "player":
                            getInfo("list","players");
                            break;
                        default:break;
                    }
                }else if(read.writeDefaultData){
                    _block = read.block;
                    _position = read.position;
                    _data = read.data;
                    _buildMod = read.buildMod;
                    _entity = read.entity;
                }else if(!read.writeDefaultData){
                    start(read);
                }
            }
        }
    });
});
