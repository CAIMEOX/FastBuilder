const EventEmitter = require('events');
const WebSocket = require('ws');
const crypto = require('crypto');
let MessageTable = new Map();

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
        socket.on('close', onClose.bind(this));
    }

    subscribe (event, callback) {
        let listeners = this.eventListeners.get(event);
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
        let listeners = this.eventListeners.get(event);
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

    setTable(id, message){
        MessageTable.set(id, message);
    }

    clearTable(){
        console.log(MessageTable)
        MessageTable.clear();
    }

    sendCommand (command, callback) {
        let json = {
            header: buildHeader('commandRequest'),
            body: {
                version: 1,
                commandLine: command
            }
        };
        this.responsers.set(json.header.requestId, callback);
        this.socket.send(JSON.stringify(json),(e)=>{
            if(e){
                return;
            }
        });
        return json.header.requestId;
    }
}

module.exports = WSServer;

function onConn(socket, req) {
    let session = new Session(this, socket);
    this.sessions.add(session);
    this.emit('client', session, req);
}

function onMessage(message) {
    let json = JSON.parse(message);
    let header = json.header;
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

        case 'error':
            //console.log('Error:'+json.body.statusMessage);
            //if(MessageTable.size === 0)return;
            if(MessageTable.has(header.requestId)){
                this.sendCommand(MessageTable.get(header.requestId))
            }
            //this.sendCommand(MessageTable.get(header.requestId));
            this.emit('mcerror', new Error(json.body.statusMessage), json);
            break;

        case 'commandResponse':
            MessageTable.delete(header.requestId);
            let callback = this.responsers.get(header.requestId);
            this.responsers.delete(header.requestId);
            if (callback) {
                try {
                    callback(json.body, json);
                } catch(err) {
                    this.emit('error', err);
                }
            }
            break;
    }

}

function onClose() {
    this.server.sessions.delete(this);
}

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

function buildHeader(purpose) {
    return {
        version: 1,
        requestId: UUIDGeneratorNode(),
        messagePurpose: purpose,
        messageType: 'commandRequest'
    };
}
