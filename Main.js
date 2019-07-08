const MeoWS = require('meowslib');
const WSServer = MeoWS.WSServer;
const BuildSession = MeoWS.BuildSession;
const Collector = MeoWS.Collector;
const Commander = MeoWS.Commander;
const Builder = MeoWS.Builder;
const Parser = MeoWS.Parser;
const Lang = MeoWS.Res.Lang;
const log = MeoWS.Logger;

let wss = new WSServer(16384);

console.log('\x1b[33m' + Lang.logo)
wss.on('client', (session, request) => {
//init
	this.CMD = new Commander(session);
	this.C = new Collector(session);
	this.B = new Builder(session, this.C);

	log(request.connection.remoteAddress + Lang.connected);
	session.tellraw(Lang.client_ctd);
	BuildSession.createAndBind(session);
	this.C.getPosition().then((v)=>{
		session.tellraw('Position got: ' + v.join(' '));
	});

	
	session.sendCommandSync('testfor @s').then((v) => {
		session.tellraw(v.victim + Lang.welcome);
		session.write('§ePowered by CAIMEO.');
	});


	session.on('onMessage',(msg)=>{
		let config = new Parser(msg,{},Object.keys(this.B.methods));
		let exec = false;
		for(let c of config.config){
			if(c.exec)exec = true;
		}
		if(!exec)return;
		let result = this.CMD.ParseConfig(config,this.B,this.C.config);
		if(!result.queue){
			return;
		}
		if(result.sync){
			session.sendCommandQueueSync(result.queue,0,true);
		}else{
			session.sendCommandQueue(result.queue,0,true);
		}

	});


});
