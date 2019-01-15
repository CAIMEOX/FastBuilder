const WebSocket = require('ws');
const uuid = require('node-uuid');
const clc = require('cli-color');
const helps = require('./helps');
const generate = require('./Algorithms');
const reader = require('./Reader');
var debug = false;
if (process.argv.splice(2).indexOf("-debug") != -1){
    console.log(clc.green("Debug mod!"));
    var debug = true
};
var localhost = null;
try {
    localhost = require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[1]][0].address;
}catch (e) {
    if (debug)console.log(clc.red("Get localhost error:" + e));
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
    var List = String.match(/\-?[0-9]*/g);//[1-9]
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
    function sendText(text,om,oc) {
        if (om == undefined) var om = "say";
        if (oc == undefined) var oc = "§l§e";
        var ot = om + " " + oc;
        sendCommand(ot + " " + text, ExternalId);
        if(debug)console.log(clc.yellow("SendCommand:" + ot + " " + text));
    }

    sendText("FastBuilder connected!");
    let block = "iron_block";
    let position = [0,0,0];
    let data = 0;
    let buildMod = "replace";
    let target = null;
    let statusMessage = null;
    function setblock(session, tile, data, mode, millis) {
        if (session.length === 0) {
            if(debug)console.log(clc.red("Setblock: Input Error!"));
            sendText("Input Error!","say", "§l§4");
            sendText("Type \'help\` to get help.","say","§l§e");
            return;}
        var times = 0;
        var BuilderID = uuid.v4();
        var interval = setInterval(function() {
                sendCommand("setblock " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + tile + " " + data + " " + mode, BuilderID);
                if (debug)console.log(clc.yellowBright("Setblock:" + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + tile + " " + data + " " + mode));
                times++;
                if (times == session.length)clearInterval(interval);
            },
            millis);
    }
    function fill(session, direction, offset, tile, data, mode, millis) {
        if (session.length === 0) {
            if(debug)console.log(clc.red("Fill: Input Error!"));
            sendText("Input Error!","say", "§l§4");
            sendText("Type \'help\` to get help.","say","§l§e");
            return;}
        var times = 0;
        var BuilderID = uuid.v4();
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
                if (debug)console.log(clc.yellowBright("Fill: " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + (session[times][0] * 1 + dx) + " " + (session[times][1] * 1 + dy) + " " + (session[times][2] * 1 + dz) + " " + tile + " " + data + " " + mode));
                times++;
                if (times == session.length) clearInterval(interval);
            },
            millis);
    }
    function summon(session, entity, millis){
        if (session.length === 0)return;
        var times = 0;
        var BuilderID = uuid.v4();
        var interval = setInterval(function () {
                sendCommand("summon " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + entity, BuilderID);
                if (debug)console.log(clc.yellowBright("Summon: " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + entity));
                times++;
                if (times == session.length)clearInterval(interval);
            },
            millis);
    }
    function start(shape, position, block, data, direction,buildMod, Type, radius, delays, height, otherValue, float) {
        switch (Type) {
            case "round":
                fill(generate.round(direction,radius,position[0]*1,position[1]*1,position[2]*1),direction,height*1,block,data,buildMod,delays);
                break;
            case "circle":
                fill(generate.circle(direction,radius,position[0]*1,position[1]*1,position[2]*1),direction,height*1,block,data,buildMod,delays);
                break;
            case "sphere":
                setblock(generate.sphere(shape,radius,position[0]*1,position[1]*1,position[2]*1),block,data,buildMod,delays);
                break;
            case "torus":
                setblock(generate.torus(otherValue[0],otherValue[1],position[0]*1,position[1]*1,position[2]*1,float),block,data,buildMod,delays);
                break;
            case "ellipse":
                fill(generate.ellipse(otherValue[0],otherValue[1],otherValue[2],position[0]*1,position[1]*1,position[2]*1,float),otherValue[0],height*1,block,data,buildMod,delays);
                break;
            case "ellipsoid":
                setblock(generate.ellipsoid(otherValue[0],otherValue[1],otherValue[2],position[0]*1,position[1]*1,position[2]*1,float),block,data,buildMod,delays);
                break;
            default:break;
        }
    }
    let collectorID = uuid.v4();
    function getInfo(cmd,ctarget) {
        sendCommand(cmd,collectorID);
        target = ctarget;
    }
    function sendHelp(help){
        switch (help) {
            case "help":
                sendText(helps.help,"say","§e");
                break;
            case "let":
                sendText(helps.let,"say","§e");
                break;
            case "round":
                sendText(helps.round,"say","§e");
                break;
            case "circle":
                sendText(helps.circle,"say","§e");
                break;
            case "ligature":
                sendText(helps.ligature,"say","§e");
                break;
            case "ellipse":
                sendText(helps.ellipse,"say","§e");
                break;
            case "ellipsoid":
                sendText(helps.ellipsoid,"say","§e");
                break;
            case "sphere":
                sendText(helps.sphere,"say","§e");
                break;
            default:break;
        }
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
                            position = get_number(statusMessage);
                            console.log(clc.red(position));
                            sendCommand("Position get: " + position);
                            break;
                        case "player":
                            break;
                        default:break;
                    }
                }
            }else if (json.body.eventName == "PlayerMessage") {
                var chat = json.body.properties.Message;
                var read = reader.ReadMessage(chat,position[0],position[1],position[2],block,data,buildMod);
                console.log(read.showhelp);
                if (read.showhelp != undefined){
                    sendHelp(read.showhelp);
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
                    block = read.block;
                    position = read.position;
                    data = read.data;
                    buildMod = read.buildMod;
                }else if(!read.writeDefaultData){
                    start(read.shape, read.position, read.block, read.data, read.direction, read.buildMod, read.buildType, read.radius, read.delays, read.height, read.others, read.float);
                }
                console.log(read);
            }
        }
    });
});