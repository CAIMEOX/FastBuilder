const colorize = require('./core/colorize');
const WSServer = require('./core/wsserver');
const BuildSession = require('./core/session');
const profile = require('./core/profile');
const lolcat = require('lolcatjs');
const os = require('os');

let localhost;
if(os.type == 'Linux'){
  try{
    localhost = os.networkInterfaces()[Object.keys(os.networkInterfaces())[1]][0].address + ':8080';
  }catch (e) {
    localhost = '127.0.0.1:8080';
  }
}else{
  try{
    localhost = os.networkInterfaces()[Object.keys(os.networkInterfaces())[0]][1].address + ':8080';
  }catch (e) {
    localhost = '127.0.0.1:8080';
  }
}

/*
let users = {
  'root':'5d8c6b9accb144cac9f2edb6f998d443'
}
let isInputUsername = true;
let username = '';
function cryptPwd(password) {
  var md5 = crypto.createHash('md5');
  return md5.update(password).digest('hex');
}
process.stdout.write(colorize('Please enter a username: ').yellow);
process.stdin.on('data', (input) => {
  input = input.toString().trim();
  if (!username) {
    if (Object.keys(users).indexOf(input) === -1) {
      process.stdout.write('User not found!');
      process.exit();
    } else {
      process.stdout.write('Please enter password: ');
      username = input;
    }
  } else {
    if (cryptPwd(input) == users[username]) {
      console.log(colorize('Welcome!').yellow);
      username = "";
      let wss = new WSServer(8080);
      console.log(colorize('Server is running at ws://' + localhost).yellow);
      console.log(colorize(profile.logo).yellow);
      wss.on('client', function(session, request) {
        BuildSession.createAndBind(session);
        console.log(request.connection.remoteAddress, 'connected!');
      });
    } else {
      process.stdout.write('Wrong password!');
      process.exit();
    }
  }
});
*/
lolcat.options.colors = true;
lolcat.options.seed = Math.round(Math.random() * 1000);
let wss = new WSServer(8080);
lolcat.fromString('Server is running at ws://' + localhost);
lolcat.fromString('FastBuilder by CAIMEO.');
lolcat.fromString(profile.logo);
wss.on('client', function(session, request) {
  BuildSession.createAndBind(session);
  lolcat.fromString(request.connection.remoteAddress.replace('::ffff:','') + ' connected!');
});


//When I wrote this, only God and I understood what I was doing.
//Now, God only knows.
