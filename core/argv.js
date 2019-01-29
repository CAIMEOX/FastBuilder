function toArr(any) {
	return any == null ? [] : Array.isArray(any) ? any : [any];
}

function ifHas(argv, input, alias){
	if(!!~argv.indexOf(input)){
		return argv[argv.indexOf(input) + 1];
	}else if(!!~argv.indexOf(alias)){
		return argv[argv.indexOf(alias) + 1];
	}else {
		return false;
	}
}

function isCmd(args) {
	if(args == undefined)return false;
	cmdList = ['round','circle','ellipse','ellipsoid','cone','torus','sphere','su','help','let']
	for(let key in cmdList){
		if(!!~args.indexOf(cmdList[key])){
			return true;
		}
	}
	return false;
}

function read(msg, opts){
	args = msg.trim().split(" ") || [];
	opts = opts || {};

	let out = {};

	out.main = {
		isCmd:isCmd(args),
		toRoot:!!~args.indexOf('sudo') && !!~args.indexOf('su'),
		exitRoot:!!~args.indexOf('sudo') && !!~args.indexOf('exit'),
		isSudo:!!~args.indexOf('sudo') || opts.su,
	};

	out.header = {
			position:!!~args.indexOf('-p') ? [
				parseInt(args[args.indexOf('-p') + 1]),
				parseInt(args[args.indexOf('-p') + 2]),
				parseInt(args[args.indexOf('-p') + 3])
			] : toArr(opts.position),
			block:ifHas(args, '-b', '--block') || opts.block,
			data:ifHas(args, '-d', '--data') || opts.data,
			method:ifHas(args, '-m', '--method') || opts.method
	};

	out.collect = {
		get:!!~args.indexOf('get') ? args[args.indexOf('get') + 1] : false,
		locate:!!~args.indexOf('locate') ? args[args.indexOf('locate') + 1] : false,
		writeData:!!~args.indexOf('let') || !!~args.indexOf('let')
	}

	out.server = {
		close:!!~args.indexOf('closewebsocket'),
		screenfetch:!!~args.indexOf('screenfetch'),
		helpMessage:(!!~args.indexOf('help') && args.length == 1),
		listHelp:(!!~args.indexOf('help') && !!~args.indexOf('-l')) || (!!~args.indexOf('help') && !!~args.indexOf('--list')),
		showhelp:args[0] == 'help' ? args[1] :
		(args[1] == 'h') || (args[1] == 'help' || args[1] == '-h' || args[1] == '--help') ?
		args[0] : false
	}

	out.build = {
		direction:ifHas(args, '-f', '--facing') || 'y',
		shape:ifHas(args, '-s', '--shape') || 'hollow',
		radius:parseInt(ifHas(args, '-r', '--radius') || 0),
		accuracy:parseInt(ifHas(args, '-a', '--accuracy') || 50),
		delays:parseInt(ifHas(args, '-t', '--times') || 10),
		width:parseInt(ifHas(args, '-w', '--width') || 0),
		length:parseInt(ifHas(args, '-l', '--length') || 0),
		height:parseInt(ifHas(args, '-h', '--height') || 1),
	};

	return out;
}
// console.log(cis(['w','sudo','-dssrh','-zsssa','--dzx','y','5','6'],{
// 	p:[1,2,3],
// 	b:'iron_block',
// 	d:0,
// 	m:'replace'
// }));
module.exports = read;
