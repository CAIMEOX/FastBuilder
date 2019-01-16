# FastBuilder
![](./images/FastBuilder.jpg)
一个为Minecraft Bedrock设计的快速建造程序

## 快速开始

```
$ git clone https://github.com/CAIMEOX/FastBuilder.git
$ cd FastBuilder
$ node Main.js
```

### 依赖项

```
$ npm install ws
$ npm install node-uuid
$ npm iinstall cli-color
```

### 开始使用

基于MinecraftWS的特性，FastBuilder完全采用命令操作（以后可能有图形界面，如果你想帮忙，请私信我）  
FastBuilder的使用并不复杂，请耐心看完操作流程（不然存档暴毙就怪不得我了）

在此之前，先完成‘快速开始’里面的内容.控制台没出错就代表启动成功了：  
接下来，打开MinecraftPE,你几乎不必担心版本问题，FastBuilder支持1.0以上任意版本～  
开启作弊，并打开聊天窗口，输入：  
```
/connect 控制台显示的ip:8080
```

连接成功就可以开始使用FastBuilder命令了（不能加/)  
首先设置生成器坐标(即获取玩家当前位置)：  
```
get pos
```
设置方块（默认为铁块，这个选项比较常用）：  
```
let block <tileName:String>
```

其他变量
```
let data <data:Int>
let entity <entityName:String>
let mod <bulidMod:String>
let pos <x:Int> <y:Int> <z:Int>
```
OK,设置基本完成了，接着就能使用建筑命令了：  
```
//round 方向　半径　高度
round <direction:String> -r <radius:Int> -h <height:Int>
//sphere 状态 半径
sphere -s <method:hollow/solid> -r <radius:Int>
//circle 方向 半径 高度
circle <direction:String> -r <radius:Int> -h <height:Int>
//ligature 坐标1 坐标2
ligature <Position:x y z> <Position2:x y z>
//ellipsoid x宽度 y宽度 z宽度 精度
ellipsoid <width:x> <width:y> <width:z> -f <accuracy:Int>
//ellipse 方向 x长度 z宽度 高度 精度
ellipse <direction:String> <width:x> <width:z> -f <accuracy:Int>
//torus 方向　半径　环半径　精度
torus <direction:String> <radius:Int> <torus-radius:Int> -f <accuracy:Int> 
//cone 方向　半径　高度
cone <direction:String> -r <radius:Int> -h <height:Int> -f <accuracy:Int>
```

## 参数列表

FastBuilder命令允许玩家在结尾追加参数，此参数的使用范围为单条命令．

如果是let更改的变量，这些参数将被写入默认值．
```
-b 方块
-t 延迟(ms)
-m 方块处理方式
-d 数据值
-p 坐标
-f 精度
-r 半径(circle,round,sphere必要参数)
-h 高度(circle,round,ellipse必要参数)
-s 形状(ellipsoid必要参数)
-em 是否生成实体(布尔值)
-e 实体类型
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
* [2019-1-9]添加了椭圆和椭球算法

* [2019-1-12]修复help的bug

* [2019-1-13]添加参数支持

* [2019-1-14]添加了Torus（圆环）算法

* [2019-1-15]添加实体生成算法

* [2019-1-16]输入close或disconnet使客户端与FastBuilder断开连接,加入cone算法
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
## 版权许可证

此项目使用  [GPL](LICENSE.md) LICENSE

## 鸣谢

* Nodejs
* LNSSPsd  -参考了LNSSPsd的[MyAgent](https://github.com/mcpews/MyAgent.git)项目
* Torrekie  -修复bug
* Jocopa3  -API 提供

