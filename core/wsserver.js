const EventEmitter = require('events');
const WebSocket = require('ws');
const randomUUID = require('node-uuid');
let positionHistory = [];
let locateHistory = [];
let playerHistory = [];
class WSServer extends WebSocket.Server {
    constructor (port, processor) {
        super({ port: port });
        this.sessions = new Set();
        this.on('connection', onConn);
        if (processor) this.on('client', processor);
    }
}

class Session extends EventEmitter {
    constructor (server, socket) {
        super();
        this.server = server;
        this.socket = socket;
        this.eventListeners = new Map();
        this.responsers = new Map();
        socket.on('message', onMessage.bind(this))
            .on('close', onClose.bind(this));
    }

    subscribe (event, callback) {
        var listeners = this.eventListeners.get(event);
        if (listeners == undefined) {
            listeners = new Set();
            this.eventListeners.set(event, listeners);
            this.socket.send(JSON.stringify({
                header: buildHeader('subscribe'),
                body: {
                    eventName: String(event)
                }
            }));
        }
        listeners.add(callback);
    }

    unsubscribe (event, callback) {
        var listeners = this.eventListeners.get(event);
        if (listeners == undefined) {
            return;
        }
        listeners.delete(callback);
        if (listeners.size == 0) {
            this.eventListeners.delete(event);
            this.socket.send(JSON.stringify({
                header: buildHeader('unsubscribe'),
                body: {
                    eventName: String(event)
                }
            }));
        }
    }

    sendCommand (command, callback) {
        var json = {
            header: buildHeader('commandRequest'),
            body: {
                version: 1,
                commandLine: command
            }
        };
        this.responsers.set(json.header.requestId, callback);
        this.socket.send(JSON.stringify(json));
        return json.header.requestId;
    }

    getHistory(type, key){
      switch (type) {
        case 'position' || 'pos':
          return positionHistory[key];
          break;
        case 'locate':
          return locateHistory[key];
          break;
        case 'player':
          return playerHistory[key];
          break;
        default:return '404 Not Found';
        break;
      }
    }
}

module.exports = WSServer;

function onConn(socket, req) {
    var session = new Session(this, socket);
    this.sessions.add(session);
    this.emit('client', session, req);
}

function onMessage(message) {
    var json = JSON.parse(message);
    var header = json.header;
    var body = json.body;
    switch (header.messagePurpose) {
        case 'event':
            let listeners = this.eventListeners.get(json.body.eventName);
            if (listeners) {
                listeners.forEach(function(e) {
                    try {
                        e(json.body, json);
                    } catch(err) {
                        this.emit('error', err);
                    }
                }, this);
            }
            break;
        case 'commandResponse':
        console.log(json);
            let callback = this.responsers.get(header.requestId);
            this.responsers.delete(header.requestId);
            if(!!body.position){
              positionHistory.push([body.position.x,body.position.y,body.position.z]);
            }
            if(!!body.feature){
              locateHistory.push([body.destination.x,body.destination.y,body.destination.z]);
            }
            if(!!body.players){
              playerHistory.push(toArray(body.players).toString());
              console.log(toArray(body.players))
            }
            if (callback) {
                try {
                    callback(json.body, json);
                } catch(err) {
                    this.emit('error', err);
                }
            }
            break;
        case 'error':
            this.emit('mcerror', new Error(json.body.statusMessage), json);
            break;
    }
}

function onClose() {
    this.server.sessions.delete(this);
}

function buildHeader(purpose) {
    return {
        version: 1,
        requestId: randomUUID.v4(),
        messagePurpose: purpose,
        messageType: 'commandRequest'
    };
}

function toArray(str){
  if(!!str.split(',')){
    return str;
  }
  return arr = str.split(',');
}
