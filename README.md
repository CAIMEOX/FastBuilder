# ParsleyBuilder
![](./images/FastBuilder.png)
一个为Minecraft Bedrock设计的快速建造程序.
FastBuilder是一个NodeJS程序，它让Minecraft复杂的结构设计变得简单！

* 用更少的时间创建更令人印象深刻且更大的建筑！
* 在几秒钟内快速创建，替换或删除数千个方块
* 生成球体，圆柱体，椭圆，环等复杂结构
* 迷失于各种绝妙的结构之中！

FastBuilder是开源的！我们希望更多人参与到FastBuilder的开发和维护．

## 快速开始
### Android(安卓)　快速安装
下载并安装Termux，然后打开Termux，输入下面内容(不按照顺序后果自负):
```shell
apt update -y && apt upgrade -y
apt install git nodejs　-y
git clone https://github.com/CAIMEOX/FastBuilder.git
cd FastBuilder && npm i && cd ..
node ./FastBuilder/Main
```
安装成功之后，以后启动FastBuilder只需要使用下面命令即可
```sh
node ./FastBuilder/Main
```
更新FastBuilder:
```shell
cd FastBuilder && git pull
```

### Linux 快速安装
```shell
git clone https://github.com/CAIMEOX/FastBuilder.git
cd FastBuilder && npm i && cd ..
node ./FastBuilder/Main
```

### 开始使用

基于MinecraftWebSocket的特性，FastBuilder完全采用命令操作（以后可能有图形界面，如果你想帮忙，请私信我）  
FastBuilder的使用并不复杂，请耐心看完操作流程（不然存档暴毙就怪不得我了）

在此之前，先完成‘快速开始’里面的内容.控制台没出错就代表启动成功了：  
接下来，打开MinecraftPE,你几乎不必担心版本问题，FastBuilder支持1.0以上任意版本～  
开启作弊，并打开聊天窗口，输入ip(ip就是你运行FastBuilder时输出的)：  

```
/connect ip:port
example:
/connect ws://192.168.1.111:8080
```

连接成功就可以开始使用FastBuilder命令了（不能加/)  
首先设置生成器坐标(即获取玩家当前位置)：  

```
get pos
```
设置方块（默认为铁块，这个选项比较常用）：  
```
let --block <tileName:String>
```

其他变量
```
let --data <data:Int>
let --entity <entityName:String>
let --mod <bulidMod:String>
let --position <x:Int> <y:Int> <z:Int>
```
OK,设置基本完成了，接着就能使用建筑命令了：  
```
//round 方向　半径　高度
round -f <direction:String> -r <radius:Int> -h <height:Int>
//sphere 状态 半径
sphere -s <method:hollow/solid> -r <radius:Int>
//circle 方向 半径 高度
circle -f <direction:String> -r <radius:Int> -h <height:Int>
//ligature 坐标1 坐标2
ligature <Position:x y z> <Position2:x y z>
//ellipsoid x宽度 y宽度 z宽度
ellipsoid -l <width:x> -w <width:y> -h <width:z>
//ellipse 方向 x长度 z宽度 高度
ellipse -f <direction:String> -w <width:x> -l <width:z>
//torus 方向　半径　环半径　精度
torus -f <direction:String> -w <radius:Int> -r <torus-radius:Int> -a <accuracy:Int>
//cone 方向　半径　高度
cone -f <direction:String> -r <radius:Int> -h <height:Int> -a <accuracy:Int>
//forestgen 形状　半径　密度
forestgen -s <shape:oak/birch/spruce/jungle> -r <radius:Int> -c <density:Int>
```

## 参数列表

FastBuilder命令允许玩家在结尾追加参数，此参数的使用范围为单条命令．

如果是let更改的变量，这些参数将被写入默认值．(不是所有变量都能保存)

|简称 | 全称 | 类型 | 含义 |
| :-- | :-- | :-- | --- |
| -r | --radius | int | 半径|
| -f | --facing | x;y;z | 朝向 |
| -b | --block | string | 方块 |
| -d | --data | int | 数据值 |
| -t | --times | int | 延迟 |
| -p | --position | array:3 | 坐标 |
| -h | --height | int | 高度 |
| -l | --length | int | 长度 |
| -w | --width | int | 宽度 |
| -s | --shape | string | 形状 |
| -j | --JTable | object | 概率表 |
| $x | --x | int | x轴坐标 |
| $y | --y | int | y轴坐标 |
| $z | --z | int | z轴坐标 |
| -y | --entityMod | boolean | 实体生成 |
| -c | --density | int | 密度 |
| -z | --path | string | 路径 |
| -g | --palette | string | 调色版 |
| -e | --entity | string | 实体 |
| -m | --method | string | 方块处理方式 |
| -b2 | --block2 | string | 方块2 |
| -d2 | --data2 | int | 数据值2 |
---------------------


## 为什么不使用ModPE,而是WebsocketServer

### ModPE
* 需要第三方启动器
* 通常免费但是有广告
* 不同版本需要不同的启动器
* 受到设备限制
* 无法在服务器或领域使用

### WebsocketServer
* 支持任何设备
* 没有任何广告
* 算法在不断更新
* 可以在服务器(BDS除外)或领域使用
* 支持 1.2 及以上的版本

## Script
提供了Script API ，允许用户自己添加Script.
详见/script/main.js

## 开发相关

* [Nodejs](http://nodejs.org) - 程序语言
* [PEWS-API](https://github.com/jocopa3/PEWS-API.git) - API

## 贡献

任何人都可以加入FastBuilderProject,为FastBuilder贡献算法，具体流程请[点击这里](https://github.com/CAIMEOX/FastBuilder/wiki/contribute)

## 贡献者(Contributors)
### Maintainer
* [**CAIMEO**](https://github.com/CAIMEOX)
QQ : 1853884864
喜欢这个项目别忘记给我们个Star!

### Other Contributors
* [**Torrekie**](https://github.com/Torrekie)
* [**LNSSPsd**](https://github.com/LNSSPsd)

## 技术交流
### Telegram:
t.me/FastBuilder
### QQ群:
790245783
##  LICENSE
* 仅使用权
* 禁止以任何形式使用FastBuilder获取利润，以FastBuilder创建的作品必须是CC协议
* 禁止修改并传播FastBuilder

当然你可以购买商业许可:
* 600CNY/Lifetime
* 300CNY/6month 
## 鸣谢

* Nodejs
* LNSSPsd  -参考了LNSSPsd的[MyAgent](https://github.com/mcpews/MyAgent.git)项目
* Torrekie  -修复bug
* Jocopa3  -API 提供
