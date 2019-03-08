# FastBuilder
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
```
apt update && apt upgrade
apt install git nodejs　-y
git clone https://git.coding.net/CAIMEO/FastBuilder.git
cd FastBuilder
npm i
npm start
```
安装成功之后，以后启动FastBuilder只需要使用下面命令即可
```
cd FastBuilder
npm start
```
更新FastBuilder:
```
cd FastBuilder
git pull
npm i
```

### Linux 快速安装
```
$ git clone https://git.coding.net/CAIMEO/FastBuilder.git
$ cd FastBuilder
$ npm install
$ node Main.js
```

### 开始使用

基于MinecraftWebSocket的特性，FastBuilder完全采用命令操作（以后可能有图形界面，如果你想帮忙，请私信我）  
FastBuilder的使用并不复杂，请耐心看完操作流程（不然存档暴毙就怪不得我了）

在此之前，先完成‘快速开始’里面的内容.控制台没出错就代表启动成功了：  
接下来，打开MinecraftPE,你几乎不必担心版本问题，FastBuilder支持1.0以上任意版本～  
开启作弊，并打开聊天窗口，输入(地址就是你运行FastBuilder时输出的)：  
```
/connect 控制台的地址
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

如果是let更改的变量，这些参数将被写入默认值．
```
-b 方块
-f 方向
-t 延迟(ms)
-m 方块处理方式
-d 数据值
-p 坐标
-a 精度
-r 半径(circle,round,sphere必要参数)
-h 高度(circle,round,ellipse必要参数)
-s 形状(sphere,forestgen必要参数)
-y 是否生成实体(布尔值)
-e 实体类
-c 密度
```

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

## 运行测试模式

```
$ node Main.js -debug
```
用于查找bug.

## 开发笔记
- [2019-1-9]添加了椭圆和椭球算法
- [2019-1-12]修复help的bug
- [2019-1-13]添加参数支持
- [2019-1-14]添加了Torus（圆环）算法
- [2019-1-15]添加实体生成算法
- [2019-1-16]输入close或disconnet使客户端与FastBuilder断开连接,加入cone算法
- [2019-1-17]改进ellipse和ellipsoid算法，现在不会有瑕疵了
- [2019-1-18]添加su模式，现在不会因为方块太多而溢出了（也许吧）
- [2019-1-20]使用'close'命令可以关闭连接
- [2019-1-21]作者计划加入GUI,从此毁了FastBuilder:D
- [2019-1-22]使用Electron开发GUI
- [2019-1-23-30]源码重构
- [2019-2-1-2]添加又删除了Script
## 开发相关

* [Nodejs](http://nodejs.org) - 程序语言
* [PEWS-API](https://github.com/jocopa3/PEWS-API.git) - API

## 贡献

任何人都可以加入FastBuilderProject,为FastBuilder贡献算法，具体流程请[点击这里](https://github.com/CAIMEOX/FastBuilder/wiki/contribute)

## 贡献者(Contributors)
### Maintainer
* [**CAIMEO**](https://github.com/CAIMEOX)

一位极不起眼的开发者,可以在QQ联系他（1843884864）

### Other Contributors
* [**Torrekie**](https://github.com/Torrekie)
* [**LNSSPsd**](https://github.com/LNSSPsd)

## 技术交流
### Telegram:
t.me/FastBuilder
### QQ群:
790245783
## 版权许可证

此项目使用  [GPL](LICENSE) LICENSE
* 禁止将此项目商业化，FastBuilder对于所有人都是免费和自由的
* 使用了FastBuilder的建筑作品同样禁止商业化:)
* 你不能使用FastBuilder制作付费地图，建筑作品，诺发布，必须是开源作品
* 建筑团队有偿建筑禁止使用FastBuilder

当然你可以购买商业许可:$20(作者不建议你买这个，我也不知道你该如何付款......)
## 鸣谢

* Nodejs
* LNSSPsd  -参考了LNSSPsd的[MyAgent](https://github.com/mcpews/MyAgent.git)项目
* Torrekie  -修复bug
* Jocopa3  -API 提供
