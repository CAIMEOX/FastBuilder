"use strict";
const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const path = require('path');
const notifier = require('node-notifier');
const WebSocket = require('ws');
const uuid = require('node-uuid');
const clc = require('cli-color');
const helps = require('./core/helps');
const generate = require('./core/Algorithms');
const reader = require('./core/Reader');
var debug = process.argv.splice(2).indexOf("-debug") != -1 ? true : false;
var root = false;
debug && console.log(clc.green("Debug mod!"));
var localhost = null;
try {
    localhost = require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[1]][0].address;
}catch (e) {
    debug && console.log("Get localhost error:" + e);
    localhost = "127.0.0.1";
}
console.log(clc.blue("\n" +
    "    ______           __  ____        _ __    __          \n" +
    "   / ____/___ ______/ /_/ __ )__  __(_) /___/ /__  _____ \n" +
    "  / /_  / __ `/ ___/ __/ __  / / / / / / __  / _ \\/ ___/\n" +
    " / __/ / /_/ (__  ) /_/ /_/ / /_/ / / / /_/ /  __/ /     \n" +
    "/_/    \\__,_/____/\\__/_____/\\__,_/_/_/\\__,_/\\___/_/ \n" +
    "                                                         \n"));
console.log(clc.yellowBright("Maintianers: CAIMEO,LNSSPsd,Torrekie"));
var port = 8080;
const Socket = new WebSocket.Server({port: port});
console.log(clc.yellowBright("Server is running at ws://" + localhost + ":" + port));
notifier.notify({
    'title': 'FastBuilder',
    'message': 'Server is running at ws://' + localhost + ":" + port ,
    'icon': path.join(__dirname, 'main.jpg'),
    'protocol':'file:',
    'sound': true,
});

function stop(){
Socket.close();
console.log(clc.red("Websocket Closed."));
process.exit(0);
}
process.stdin.resume();
process.on("SIGINT",function(){
	stop();
});
function createMainWindow() {
    var win = new BrowserWindow({
        width: 657,
        height: 542,
        x:100,
        y:100,
        resizable: false,
        maximizable: false,
        fullscreenable: false
    });
    win.loadURL(url.format ({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.on('closed',function (e) {
        process.exit(0);
    });
    win.on('blur',function (e) {
        win.setTitle('FastBuilder 0.0')
    });
    win.on('focus',function (e) {
        win.setTitle('FastBuilder!')
    })
}

app.on('ready',createMainWindow);
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
Socket.on('connection',function connection( ws, request) {
    notifier.notify({
        'title': 'FastBuilder',
        'message': request.connection.remoteAddress + 'connected!' ,
        'icon': path.join(__dirname, 'main.jpg'),
        'protocol':'file:',
        'sound': true,
    });

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
    function createClientWindow(userID){
        client = new BrowserWindow({
            title:userID,
            width:676,
            height:533,
            x:100,
            y:100,
            resizable:false,
            maximizable:false,
            fullscreenable:false
        });
        client.loadURL(url.format({
            pathname: path.join(__dirname, 'client.html'),
            protocol:'file:',
            slashes: true
        }));
        client.on('focus',function (e) {
            client.setTitle(userID)
        });
        client.on('closed',function (e) {
            sendCommand("closewebsocket",uuid.v4 ());
        });
    }
    createClientWindow(request.connection.remoteAddress);
    win.webContents.send('main-process-messages','connected');
    var ExternalId = uuid.v4();
    //Send text.
    /*
    * @om Output mod
    * @oc Output color
    * @text Output message
    * */
    function sendText(text,om,oc) {
        if (om == undefined) var om = "say";
        if (oc == undefined) var oc = "§e";
        var ot = om + " " + oc;
        sendCommand(ot + "§\"" + text + "§\"", ExternalId);
        debug && console.log("SendCommand:" + ot + " " + text);
    }
    /*
    * @_block default block
    * @_position default position
    * @_data default block data
    * @_buildMod default build mod
    * @_entity default entity
    * */
    let _block = "iron_block";
    let _position = [0,0,0];
    let _data = 0;
    let _buildMod = "replace";
    let _entity = "sheep";
    let target = null;
    let statusMessage = null;
    function setblock(sudo, session, tile, data, mode, millis) {
        if (session.length === 0) {
            debug && console.log("Setblock: Input Error!");
            sendText("Input Error!","say", "§l§4");
            sendText("Please type \'help\` to get help.","say","§l§e");
            return;}
        sendText("Time need: " + session.length * millis / 1000 + "s");
	    if(((session.length*millis/1000) >= 120) && !sudo){
            sendText("Permission denied.You need " + session.length*millis/1000 + "s.Are you root?","say","§4");
            return;
	    }
        sendText("Please wait patiently!");
        var times = 0;
        var BuilderID = uuid.v4();
        var interval = setInterval(function() {
                sendCommand("fill " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + tile + " " + data + " " + mode, BuilderID);
                debug && console.log(clc.yellowBright("Setblock:" + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + tile + " " + data + " " + mode));
                //client.webContents.send('main-process-messages', "Setblock:" + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + tile + " " + data + " " + mode);
                times++;
                if (times == session.length){sendText("Structure has been generated!");clearInterval(interval);}
            },
            millis);
    }
    function fill(sudo, session, direction, offset, tile, data, mode, millis) {
        if (session.length === 0) {
            if(debug)console.log("Fill: Input Error!");
            sendText("Input Error!","say", "§l§4");
            sendText("Please type \'help\` to get help.","say","§l§e");
            return;}
        sendText("Time need: " + session.length * millis / 1000 + "s");
		if(((session.length*millis/1000) >= 120) && !sudo){
            sendText("Permission denied.You need " + session.length*millis/1000 + "s.Are you root?","say","§4");
            return;
	    }
        sendText("Please wait patiently!");
        var times = 0;
        var BuilderID = uuid.v4();
        var dx = direction == "x" ? parseInt(offset) : 0;
        var dy = direction == "y" ? parseInt(offset) : 0;
        var dz = direction == "z" ? parseInt(offset) : 0;
        var interval = setInterval(function() {
                sendCommand("fill " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + (session[times][0] * 1 + dx) + " " + (session[times][1] * 1 + dy) + " " + (session[times][2] * 1 + dz) + " " + tile + " " + data + " " + mode, BuilderID);
                debug && console.log(clc.yellowBright("Fill: " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + (session[times][0] * 1 + dx) + " " + (session[times][1] * 1 + dy) + " " + (session[times][2] * 1 + dz) + " " + tile + " " + data + " " + mode));
                //client.webContents.send('main-process-messages', "Fill: " + session[times][0] + " " + session[times][1] + " " + session[times][2] + " " + (session[times][0] * 1 + dx) + " " + (session[times][1] * 1 + dy) + " " + (session[times][2] * 1 + dz) + " " + tile + " " + data + " " + mode);
                times++;
                if (times == session.length){sendText("Structure has been generated!");clearInterval(interval);}
            },
            millis);
    }
    function summon(sudo, session, entity, direction, height, millis){
        if (session.length === 0) {
            debug && console.log("Fill: Input Error!");
            sendText("Input Error!","say", "§l§4");
            sendText("Please type \'help\` to get help.","say","§l§e");
            return;}
        sendText("Time need: " + session.length * millis / 1000 + "s");
        if(((session.length*millis/1000) >= !sudo) && !sudo){
		    sendText("Permission denied.You need " + session.length*millis/1000 + "s.Are you root?","say","§4");
			return;
	    }
        sendText("Please wait patiently!");
        var dx = direction == "x" ? height : 0;
        var dy = direction == "y" ? height : 0;
        var dz = direction == "z" ? height : 0;
        var new_session = [];
        console.log(direction);
        if(height == 1 || height == 0){new_session = session}
        else if(direction == "x"){for(var i = 0 ; i < session.length ; i++){
            for(var x = 0 ; x < height; x++){
                console.log("Pushing");
                new_session.push([session[i][0]+x,session[i][1],session[i][2]]);
            }
        }}
        else if(direction == "y"){for(var i = 0 ; i < session.length ; i++){
            for(var y = 0 ; y < height; y++){
                console.log("Pushing");
                new_session.push([session[i][0],session[i][1]+y,session[i][2]]);
            }
        }}
        else if(direction == "z"){for(var i = 0 ; i < session.length ; i++){
            for(var z = 0 ; z < height; z++){
                console.log("Pushing");
                new_session.push([session[i][0],session[i][1],session[i][2]+z]);
            }
        }}
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
                //client.webContents.send('main-process-messages', "Summon: " + new_session[times][0] + " " + new_session[times][1] + " " + new_session[times][2] + " " + entity);
                debug && console.log("Summon: " + new_session[times][0] + " " + new_session[times][1] + " " + new_session[times][2] + " " + entity);
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
        var sudo = read.sudo;
        if (read.entityMod) var entity = read.entity;
        switch (read.buildType) {
            case "round":
                if (read.entityMod) {
                    summon(sudo,generate.round(direction, radius, position[0] * 1, position[1] * 1, position[2] * 1), entity, direction, height, delays)
                } else {
                    fill(sudo,generate.round(direction, radius, position[0] * 1, position[1] * 1, position[2] * 1), direction, height, block, data, buildMod, delays);
                }
                break;
            case "circle":
                if (read.entityMod) {
                    summon(sudo,generate.circle(direction, radius, position[0] * 1, position[1] * 1, position[2] * 1), entity, direction, height, delays)
                } else {
                    fill(sudo,generate.circle(direction, radius, position[0] * 1, position[1] * 1, position[2] * 1), direction, height, block, data, buildMod, delays);
                }
                break;
            case "sphere":
                if (read.entityMod) {
                    summon(sudo, generate.sphere(shape, radius, position[0] * 1, position[1] * 1, position[2] * 1), entity, direction, height, delays)
                } else {
                    setblock(sudo,generate.sphere(shape, radius, position[0] * 1, position[1] * 1, position[2] * 1), block, data, buildMod, delays);
                }
                break;
            case "torus":
                if (read.entityMod) {
                    summon(sudo,generate.torus(otherValue[0], otherValue[1], otherValue[2], position[0] * 1, position[1] * 1, position[2] * 1, float), entity, otherValue[0], height, delays)
                } else {
                    setblock(sudo,generate.torus(otherValue[0], otherValue[1], otherValue[2], position[0] * 1, position[1] * 1, position[2] * 1, float), block, data, buildMod, delays);
                }
                break;
            case "ellipse":
                if (read.entityMod) {
                    summon(sudo,generate.ellipse(otherValue[0], otherValue[1], otherValue[2], position[0] * 1, position[1] * 1, position[2] * 1, float), entity, otherValue[0], height, delays)
                } else {
                    fill(sudo,generate.ellipse(otherValue[0], otherValue[1], otherValue[2], position[0] * 1, position[1] * 1, position[2] * 1, float), otherValue[0], height, block, data, buildMod, delays);
                }
                break;
            case "ellipsoid":
                if (read.entityMod) {
                    summon(sudo, generate.ellipsoid(otherValue[0], otherValue[1], otherValue[2], position[0] * 1, position[1] * 1, position[2] * 1, float), entity, direction, height, delays)
                } else {
                    setblock(generate.ellipsoid(otherValue[0], otherValue[1], otherValue[2], position[0] * 1, position[1] * 1, position[2] * 1, float), block, data, buildMod, delays);
                }
                break;
            case "cone":
                if (read.entityMod){
                    summon(sudo,generate.cone(direction, height,radius,position[0]*1,position[1]*1,position[2]*1,float),entity, direction, height, delays);
                }
                setblock(sudo,generate.cone(direction, height,radius,position[0]*1,position[1]*1,position[2]*1,float),block,data,buildMod,delays);
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
        if(reader.listhelps){
            var _helps="";
            for(let i in helps){
                _helps += i + "  "
            };
            _helps += "\nFor more helps, type help -l.";
            sendText(_helps,"say");
        }else if(reader.showhelp){
	        sendText(helps[reader.showhelp],"say");
	    }else if(reader.listhelp){
	        for(let i in helps){sendText(helps[i],"say");}}
    }
    sendText("FastBuilder connected!");
    ws.on('message',function (message) {
        try{
            var json = JSON.parse(message);
        }catch(e){
            console.log(e);
            return;}
        if(json.header.requestId != ExternalId) {
            if (json.header.requestId == collectorID){
                statusMessage = json.body.statusMessage;
                if (statusMessage != null){
                    switch (target) {
                        case "pos" || "position":
                            _position = get_number(statusMessage);
                            sendText("Position get: " + _position);
                            break;
                        case "player":
                            break;
                        default:break;
                    }
                }
            }
            else if (json.body.eventName == "PlayerMessage") {
                var chat = json.body.properties.Message;
                var read = reader.ReadMessage(root, chat,_position[0],_position[1],_position[2],_block,_data,_buildMod, _entity);
                console.log(read);
                if (read.listhelps || read.listhelp || read.showhelp != null){
                    client.webContents.send('main-process-messages', "Showing helps");
                    sendHelp(read);
                    return;
                }
                else if(read.close){
                    client.webContents.send('main-process-messages','User disconnected:(');
                    client.close();
                    sendCommand("closewebsocket",uuid.v4());
                }
                else if(read.get != null){
                    client.webContents.send('main-process-messages', "Getting info!");
                    switch (read.get) {
                        case "pos" || "position":
                            getInfo("testforblock ~ ~ ~ air","pos");
                            break;
                        case "player":
                            getInfo("list","players");
                            break;
                        default:break;
                    }
                }else if(read.root) {
                    sendText("I hope you know what you are doing!\n§lROOT MODE Activated.","say","§4");
                    client.webContents.send('main-process-messages','root@FastBuilder:Root Mod!');
                    root = read.root;
                }else if(read.exitRoot){
                    sendText("Root mod exited.","say");
                    client.webContents.send('main-process-messages','user@FastBuilder:Root mod exit!');
                    root = read.exitRoot;
                }else if(read.writeDefaultData){
                    client.webContents.send('main-process-messages','Writing data now');
                    _block = read.block;
                    _position = read.position;
                    _data = read.data;
                    _buildMod = read.buildMod;
                    _entity = read.entity;
                    sendText("Data wrote!")
                }else {
                    client.webContents.send('main-process-messages', "Start build");
                    start(read);
                }
            }
        }
    });
});
