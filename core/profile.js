module.exports  = {
  logo:"    ____                  __          \n" +
      "   / __ \\____ ___________/ /__  __  __\n" +
      "  / /_/ / __ `/ ___/ ___/ / _ \\/ / / /\n" +
      " / ____/ /_/ / /  (__  ) /  __/ /_/ / \n" +
      "/_/    \\__,_/_/  /____/_/\\___/\\__, /  \n" +
      "                             /____/   \n",
  version:3.1,
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
}
