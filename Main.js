const MeoWS = require('meowslib');
const WSServer = MeoWS.WSServer;
const log = MeoWS.Logger;
const BuildSession = MeoWS.BuildSession;
const Collector = MeoWS.Collector;
const Commander = MeoWS.Commander;
const Builder = MeoWS.Builder;
const Parser = MeoWS.Parser;
const fs = require('fs');
let logo = "\n" +
"    ______           __  ____        _ __    __          \n" +
"   / ____/___ ______/ /_/ __ )__  __(_) /___/ /__  _____ \n" +
"  / /_  / __ `/ ___/ __/ __  / / / / / / __  / _ \\/ ___/\n" +
" / __/ / /_/ (__  ) /_/ /_/ / /_/ / / / /_/ /  __/ /     \n" +
"/_/    \\__,_/____/\\__/_____/\\__,_/_/_/\\__,_/\\___/_/ \n" +
"                                                         \n";
let wss = new WSServer(16384);
log(logo);
wss.on('client', async (session, request) => {
	await new Promise((r)=>{setTimeout(r,1000)});
//init
	session.cmd = new Commander({});
	session.cmd.updateOptions({
		block:'iron_block',
		data:0
	})
	session.clr = new Collector(session);
	session.gen = new Builder(session);
	session.parser = new Parser(Object.keys(session.gen.methods));
	log(request.connection.remoteAddress + ' connected!');
	session.tellraw(session.now() + 'FastBuilder connected!');
	BuildSession.createAndBind(session);
	session.clr.getPosition().then((v)=>{
		session.cmd.updateOptions({position:v});
		session.tellraw(session.now() + 'Position get: ' + v.join(' '));
	});
	session.sendCommandSync('testfor @s').then((v) => {
		session.tellraw(session.now() + v.victim + '. Welcome to FastBuilder! Enjoy it:D');
		session.write('§ePowered by CAIMEO.');
	});

	session.on('onMessage',(msg)=>{
		let result = session.cmd.parseConfigs(session.parser.parsePipe(msg),session.gen.methods);
		if(!result){
			return;
		}
		if (result.err){
			if (result.err === 'No exec') return;
			session.tellraw(result.err);
			return
		}
		session.sendCommandQueue(result, 0, true);
	});


});
