const en_US = {
  logo:"    ____                  __          \n" +
      "   / __ \\____ ___________/ /__  __  __\n" +
      "  / /_/ / __ `/ ___/ ___/ / _ \\/ / / /\n" +
      " / ____/ /_/ / /  (__  ) /  __/ /_/ / \n" +
      "/_/    \\__,_/_/  /____/_/\\___/\\__, /  \n" +
      "                             /____/   \n",
  version:2.8,
  server:'Server is running at ws://',
  connected:' connected!',
  client_connected:'FastBuilder connected!',
  showAuthor:'Made by CAIMEO',
  load_script:'Loading Script...',
  ready:'Ready!',
  disconnect:'FastBuilder disconnected!',
  stopped:'Stopped',
  help:'\'For more helps , type \\\'help -l\\\'.\'',
  wrote:'Data wrote!',
  inputerror1:'Input error.You can type \'',
  inputerror2:' help\' to get help',
  noroot:'Permission denied: Time takes more than 4 minutes.Are you root?',
  timeneed:'Time need: ',
  wait:'Please wait patiently!',
  posget:'Position get: ',
  online:'Online players: ',
  found:'Feature found: ',
  generated:'Structure has been generated!',
  notfound:'Feature not found!',
  script:' loaded',
  loaded_script:'Script loaded',
  helps:{
    'help':'help <commandName:String>  --Show help of command.\n --list: All command\'s descriptions.',
    'let':'let <variable:String> <value:String>  --Set the value of the variable.',
    'round':'round -f <facing:<x:y:z>> -r <radius:Int> -h <height:Int>  --Create round or cylinder.',
    'circle':'circle -f <facing:<x:y:z>> -r <radius:Int> -h <height:Int>  --Create cirlce or cylinder.',
    'sphere':'sphere -s <shape:<solid:hollow>> -r <radius:Int>  --Create sphere.',
    'ellipse':'ellipse -f <facing:<x:y:z>> -l <length:Int> -w <width:Int>  --Create ellipse.',
    'ellipsoid':'ellipsoid -l <length:Int> -w <width:Int> -h <height:Int>  --Create ellipsoid.',
    'torus':'torus -f <facing:<x:y:z>> -w <width:Int> -r <radius:Int> -a <accuracy:Int>  --Create torus.',
    'cone':'cone -f <facing<x:y:z>> -r <radius:Int> -h <height:Int> -a <accuracy:Int>  --Create cone.',
    'forestgen':'forestgen -r <radius:Int> -c <density:Int> -s <shape:oak/birch/spruce/jungle>  --Create forest.',
    'pumpkins':'pumpkin -r <radius:int>  --Generate pumpkin patches that even contain leaves',
    'paint':'paint -z <path:String>'
  }
};

const zh_CN = {
  logo:"    ____                  __          \n" +
      "   / __ \\____ ___________/ /__  __  __\n" +
      "  / /_/ / __ `/ ___/ ___/ / _ \\/ / / /\n" +
      " / ____/ /_/ / /  (__  ) /  __/ /_/ / \n" +
      "/_/    \\__,_/_/  /____/_/\\___/\\__, /  \n" +
      "                             /____/   \n",
  version:2.8,
  server:'服务器已运行在 ws://',
  connected:' 已连接!',
  client_connected:'FastBuilder 已连接!',
  showAuthor:'作者: CAIMEO',
  load_script:'正在加载脚本(Script)...',
  ready:'已就绪',
  disconnect:'FastBuilder 已断开连接',
  stopped:'已停止',
  help:'输入 \'help -l\' 以获取更多帮助',
  wrote:'数据已写入',
  inputerror1:'输入错误，你可以输入 \'',
  inputerror2:' help\' 来获取帮助',
  noroot:'权限不足:你是否已经root?',
  timeneed:'所需时间: ',
  wait:'请耐心等待!',
  posget:'坐标已获取: ',
  online:'在线玩家: ',
  found:'成功找到结构: ',
  generated:'结构建筑完成!',
  notfound:'找不到该结构',
  script:'加载成功',
  loaded_script:'脚本加载完成',
  helps:{
    'help':'help <命令名称>  --显示帮助.\n --list: 所有命令的帮助',
    'let':'let <变量> <值>  --修改变量值',
    'round':'round -f <方向:<x:y:z>> -r <半径> -h <高度>  --创建圆或圆柱',
    'circle':'circle -f <方向:<x:y:z>> -r <半径:Int> -h <高度:Int>  --创建圆圈或圆柱',
    'sphere':'sphere -s <形状:<solid:hollow>> -r <半径>  --创建球',
    'ellipse':'ellipse -f <方向:<x:y:z>> -l <长度> -w <宽度>  --创建椭圆',
    'ellipsoid':'ellipsoid -l <长度> -w <宽度> -h <高度>  --创建椭球',
    'torus':'torus -f <方向:<x:y:z>> -w <宽度> -r <半径> -a <精度>  --创建圆环',
    'cone':'cone -f <方向<x:y:z>> -r <半径> -h <高度> -a <精度>  --创建圆锥',
    'forestgen':'forestgen -r <半径> -c <密度> -s <形状:oak/birch/spruce/jungle>  --创建森林',
    'pumpkins':'pumpkin -r <半径>  --创建南瓜林带有树叶'
  }
};
module.exports = en_US;
