module.exports  = {
  logo:"\n" +
      "    ______           __  ____        _ __    __          \n" +
      "   / ____/___ ______/ /_/ __ )__  __(_) /___/ /__  _____ \n" +
      "  / /_  / __ `/ ___/ __/ __  / / / / / / __  / _ \\/ ___/\n" +
      " / __/ / /_/ (__  ) /_/ /_/ / /_/ / / / /_/ /  __/ /     \n" +
      "/_/    \\__,_/____/\\__/_____/\\__,_/_/_/\\__,_/\\___/_/ \n" +
      "                                                         \n",
  version:3.0,
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
