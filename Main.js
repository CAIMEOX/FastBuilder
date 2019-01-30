#! /usr/bin/env node

const colorize = require('./core/colorize');
const WSServer = require('./core/wsserver');
const BuildSession = require('./core/session');
const profile = require('./core/profile')

var wss = new WSServer(8080);
console.log(colorize('Server is running at ws://' + require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[1]][0].address + ':8080').blue);
console.log(colorize(profile.logo).blue);

wss.on('client', function(session, request) {
  BuildSession.createAndBind(session);
  console.log(request.connection.remoteAddress, 'connected!');
});




/*
testforblock : return:
{ body:
   { matches: true,
     position: { x: 79, y: 132, z: 8 },
     statusCode: 0,
     statusMessage: 'Successfully found the block at 79,132,8.'
   },
  header:
   { messagePurpose: 'commandResponse',
     requestId: '0f0d1ea0-4c66-457b-8d2a-3ff2e5537ac4',
     version: 1
   }
 }
*/

/*
locate : return:
{ body:
   { destination: { x: 88, y: 64, z: 40 },
     feature: '%feature.village',
     statusCode: 0,
     statusMessage: 'The nearest Village is at block 88, (y?), 40'
   },
  header:
   { messagePurpose: 'commandResponse',
     requestId: 'a1e19e82-89bb-4921-b458-f0602d8ad43b',
     version: 1
   }
 }
*/

/*
listd : return:
{ body:
   { currentPlayerCount: 1,
     details:
      '###* {"command":"listd","result":[{"color":"ff5454ff","name":"CAIMEOX","randomId":5348730548219983442,"uuid":"6b4c6e4a-a226-300e-b585-58952b444288"}]
    }\n *###',
     maxPlayerCount: 5,
     players: 'CAIMEOX',
     statusCode: 0,
     statusMessage:
      'There are 1/5 players online:\nCAIMEOX\n###* {"command":"listd","result":[{"color":"ff5454ff","name":"CAIMEOX","randomId":5348730548219983442,"uuid":"6b4c6e4a-a226-300e-b585-58952b444288"}]}\n *###' },
  header:
   { messagePurpose: 'commandResponse',
     requestId: 'c6da3645-76c3-44c8-81ad-c63a6595ef93',
     version: 1
   }
}

{ body:
   { currentPlayerCount: 4,
     maxPlayerCount: 20,
     players: 'TSky_156, Torrekie, 云峰是蛇精病, CAIMEO',
     statusCode: 0,
     statusMessage: '目前有 4/20 个玩家在线：\nTSky_156, Torrekie, 云峰是蛇精病, CAIMEO'
   },
  header:
   { messagePurpose: 'commandResponse',
     requestId: '1701f93b-2e56-459e-84cf-cfb0164d9cb2',
     version: 1
   }
 }
*/
