function toArr(any) {
	return any == null ? [] : Array.isArray(any) ? any : [any];
}

function ifHas(argv, input, alias, count){
	if(!!~argv.indexOf(input)){
		return argv[argv.indexOf(input) + 1];
	}else if(!!~argv.indexOf(alias)){
		return argv[argv.indexOf(alias) + 1];
	}else {
		return false;
	}
}

function isCmd(args) {
	if(args == undefined)return;
	cmdList = ['round','circle','ellipse','ellipsoid','cone','torus','sphere','su']
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
		exitRoot:false,
		isSudo:!!~args.indexOf('sudo') || opts.su,
		useBuilder:'setTile'
	};

	out.header = {
			position:!!~args.indexOf('-p') ? [
				parseInt(args[args.indexOf('-p') + 1]),
				parseInt(args[args.indexOf('-p') + 2]),
				parseInt(args[args.indexOf('-p') + 3])
			] : toArr(opts.p),
			block:ifHas(args, '-b', '--block') || opts.b,
			data:ifHas(args, '-d', '--data') || opts.d,
			method:ifHas(args, '-m', '--method') || opts.m
	};

	/*if(!!~args.indexOf('help')){
		if(args[args.indexOf('help') + 1] == undefined || args[args.indexOf('help') - 1 == undefined])return;
		if(isCmd(args[args.indexOf('help') + 1])){
			out.server.help = args[args.indexOf('help') + 1];
		}else if(isCmd(args[args.indexOf('help') - 1])){
			out.server.help = args[args.indexOf('help') - 1];
		}else{
			out.server.help = 'list';
		}
	}
*/
	out.server = {
		close:!!~args.indexOf('closewebsocket')
	}
	out.build = {
		direction:ifHas(args, '-f', '--facing') || 'y',
		shape:ifHas(args, '-s', '--shape') || 'hollow',
		radius:parseInt(ifHas(args, '-r', '--radius')) || 0,
		accuracy:parseInt(ifHas(args, '-a', '--accuracy')) || 50,
		delays:parseInt(ifHas(args, '-t', '--times')) || 10,
		width:parseInt(ifHas(args, '-w', '--width')) || 0,
		length:parseInt(ifHas(args, '-l', '--length')) || 0,
		height:parseInt(ifHas(args, '-h', '--height')) || 1,
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
