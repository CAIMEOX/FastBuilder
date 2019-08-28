# 什么是WebSocket,什么又是连接WebSocket的命令？

Minecraft基岩版与教育版有用于连接WebSocket服务器的命令——/wsserver和/connect
/connect是/wsserver的替代命令,这2个命令都有同样的功能和效果.
一旦通过执行该命令连接到WebSocket服务端,连接将持续到服务器关闭、玩家断开或者玩家完全退出游戏.(在国际版,退出存档仍能保持连接)
当玩家离开一个世界并回到主界面时,连接不会被断开,因此当玩家加入一个服务器时连接也将持续.
通过这个命令,玩家与服务器之间可以建立简单的命令通信.此外,服务器可以选择监听客户端发送的一部分事件,并在接收到这些事件时完成某些动作.例如,可以检测一个玩家是否有破坏方块,并且也可以在检测到“破坏方块”事件后对此作出反应.

在基岩版中,WebSocket服务器可以通过发送命令与客户端通信.如/time query或/list这些可以被玩家轻易执行的命令.
不同的是,MCWS也能执行一些隐藏命令,比如/closewebsocket和/agent,这些命令并不能被玩家直接执行.

WebSocket很有潜力让第三方程序利用它们.
大家不必特地去了解Websocket的工作方式,只需要明白它在Minecraft中的应用.因此,我们为了方便,称呼其为MCWS（Minecraft WebSocket）.

很少人掌握这项技术,甚至很少有人知道/wsserver命令的真正用途.我们最早是从MOJANG的工作人员Matt(Jocopa3)那里得知并获取API的.

觉得挺有意思,于是查了很多相关资料,但是能够检索到的信息寥寥无几,比如下面几个是我们所认为较有参考价值的内容,但即便如此,我们也能看见大众对MCWS的关注和重视几乎很少.

https://www.reddit.com/r/MCPE/comments/5qf4ah/websockets_huge_potential_currently_unusable

https://youtu.be/d15sQRKmXPA

etc.

最后决定用NodeJS完成.

# 全中国甚至全世界第一批WS作品

FastBuilder这个想法诞生之前,我们开发过不少ws试验品；当时还做了一个服务器管理插件(Ctools)和事件监听器(EventsListener),命令执行器(Commander)(就像是现在的function)

后来我渐渐有了FastBuilder这个想法.也就是开发一个和WorldEditor相媲美,并且支持全平台基岩版的速建工具.

# WebSocket与ModPE

为什么不使用ModPE呢?现在也有很多类似WE的js,像MP4创世神和6g3y的快速建造,为什么要再做一个呢?
区别所在:

## ModPE:

- 需要第三方启动器(如BlockLauncher)
- 通常免费但是有广告
- 不同版本需要不同的启动器
- 通常受设备的限制(例如不支持iOS和Windows)
- 无法在服务器或领域使用
- 稳定性差
- 用户群体在减少

## WebSocket:

- 支持任何设备上的基岩版
- 没有任何广告,并且算法开源
- 算法在不断更新
- 可以在服务器(pm/nk等除外)或领域使用
- 0.16+就能连接MCWS了
- 巨大的未被发掘的潜力

# 什么是FastBuilder

前面提到,FastBuilder(FB)算是一个Minecraft基岩版的WorldEditor.它让Minecraft复杂的结构设计变得简单！

- 用更少的时间创建更令人印象深刻且更大的建筑！
- 在几秒钟内快速创建,替换或删除数千个方块
- 生成球体,圆柱体,椭圆,环等复杂几何结构
- 迷失于各种绝妙的功能之中！
  FastBuilder是开源的,我们希望更多人参与到FastBuilder的开发和维护.

# 如何使用FastBuilder?

使用FastBuilder(以下简称FB)第一步首先要理解什么是服务端(Server)和客户端(Client).
FB运行在服务端,通过客户端连接可以与其交互(像监听事件,发送命令等)
FB服务端可以在Android, Windows, Linux, MacOS甚至iOS等平台搭建,客户端是你的Minecraft游戏本身,通过使用/connect <uri>或/wsserver <uri>命令连接到服务器.
服务端和客户端不一定要在同一设备,但请确保服务端拥有公网IP或与客户端处于同一网络环境下.

# Linux安装FB

我想会玩Linux的玩家只需要看下面的教程就知道该怎么做了

# Android安装FB

1. 下载终端软件(如Termux),并给予其存储权限.
2. 执行apt update && apt upgrade 如弹出(y/n)确认信息,输入y后回车,如果报错则重新输入.
3. 执行apt install nodejs,如弹出(y/n)确认信息,输入y后回车
4. 执行apt install git,如弹出(y/n)确认信息,输入y后回车  
5. 执行git clone https://github.com/CAIMEOX/FastBuilder.git
6. cd FastBuilder
7. npm i 
8. node Main
9. 后续如需运行只需执行6、8步.
   注意:如果哪一步报错了,必须重新执行,不然后续步骤会一错再错…

# Windows安装FB

1. 前往nodejs.org下载并安装Node.js
2. 前往https://github.com/CAIMEOX/FastBuilder,找到“Clone or Download”下载ZIP文件
3. 将ZIP放到合适的位置并解压
4. 按下Win+r,在弹出的窗口中输入cmd
5. 在cmd窗口中输入命令：cd 你解压后的ZIP文件夹所在路径
6. 输入npm i
7. 输入node Main即可运行
8. 后续如需运行只需执行第4、5、7步

# IOS安装FB

1. 在App Store中下载TestFlight
2. 在浏览器中访问该链接https://testflight.apple.com/join/EtYOUbnX
3. 按照网页提示步骤安装FastBuilder

# MacOS安装FB

1. 前往nodejs.org下载并安装Node.js
2. 前往https://github.com/CAIMEOX/FastBuilder 找到“Clone or Download”下载ZIP文件
3. 将ZIP放到合适的位置并解压
4. 打开Finder-应用程序-实用工具-终端
5. 在终端窗口中输入命令：cd 你解压后的ZIP文件夹所在路径
6. 输入npm i 
7. 输入node Main即可运行
8. 后续如需运行只需执行第4、5、7步

# 使用教程

FB的命令非常类似Shell命令,使用简单,如果你是Linux爱好者,那你将会很快掌握FB的命令.由于MCWS的限制,我们不能做GUI(But who can predict the future?).

FB的命令不同于Minecraft的"斜杠"命令,用户只需要在聊天窗口直接输入命令即可,不需要带斜杠及其他符号,这种通过发送聊天信息来执行的命令被称为ChatCommand(CCmd).

得益于FB强大的命令解析器,FB的命令不像MC命令语法要求那么严格,比如我要造个半径为5,方向朝y轴的圆:
你可以这么写:

`round -r 5 -f y`

当然这么写也可以:

`-r 5 round -f y`

甚至像这样:

`-r 5 Useless words round -y f`

也可以用全称:

`round --radius 5 -facing y`

当然,命令中不能有多个关键字符,这会造成冲突:

`round circle -f y -r 5 `

或者涉及一些关键符号:

`round -r 5 | -f y `

Linux用户应该明白这是什么:)

# 生成器设置

当你连接到FB之后,你必须先告诉生成器知道你想在哪里建筑(建筑生成位置)和建筑材料.FB默认将生成器坐标设定在玩家连接FB时所在的位置,默认方块为空气.

这个命令将玩家当前坐标设置为生成器默认坐标:
`get`

手动设置默认值:

`set -p x y z -b tileName`

set命令不仅仅可以设置坐标默认值,其他的参数也可以设置,像radius和data

如果不设置默认值,就必须在使用几何命令时加上:

`round -r 5 -f y -p 233 128 -10`

(不过大部分默认值系统会自动设置好)

# 几何命令

FB带有很多几何建筑命令,像圆,圈,球,线,椭圆等.
使用也非常简单.

## 圆&圈
圆和圈命令是最简单的命令之一,它们的区别在于是否空心,命令和参数如下:

- -r --radius 圆或圈的半径

- -h --height 圆或圈的高度

- -f --facing 朝向,可选值有x,y,z

  格式:
  round/circle -r 半径 -f 方向 -h 高度

  高度默认值为1,可以不写.更改高度可以实现圆柱.

## 球
(Sphere)球体也是比较常见的几何体.和圆一样,也需要半径,不同的是,球多了-s(shape)参数:

- -s --shape 可选值有soild(实心)/hollow(空心)
  格式:
  sphere -r 半径 -s 形状

## 椭圆
(Ellipse)椭圆有4个参数:

- -h --height 高度,更改可以生成椭圆柱(搞砸了)
- -l --length 长度
- -w --width 宽度
- -f --facing 朝向,可选值有x,y,z
  格式:
  ellipse -l 长度 -w 宽度 -h 高度 -f 方向

## 椭球
(Ellipsoid)椭球有3个参数

- -h --height 高度
- -l --length 长度
- -w --width 宽度
  格式:
  ellipsoid -l 长度 -w 宽度 -h 高度

## 圆环
(Torus)圆环有以下参数

- -r --radius 半径
- -w --width 宽度(环半径)
- -f --facing 朝向,可选值有x,y,z

# 使用不同的生成器

FB有很多不同的生成器,默认为setblock(方块构建器)
使用方法是在命令结尾加上$生成器
比如:

```
round -r 5 -f y clone -bp 10 10 10 -ep 50 60 80 -m filtered -om move -b iron_block
sphere -r 10 -s solid summon -e ender_crystal
```

此外还有:

- clone: 方块复制器
- summon: 实体生成器

## setblock:
   - -b --block 方块
   -   -d --data 特殊值
   -   -m --method 处理方式
## clone:
   - -bp --begin 起始坐标
   - -ep --end 结束坐标
   -   -m --method 处理方式
   -   -m2 --method2 原方块处理方式
   -   -b 如果处理方式为filtered时使用
## summon:
   - -e --entity 实体

# 其他算法

如果只有几何结构算法也太单调了,FB还融入了许多有用的功能

## 1.Pipe(管道算法)

如果你使用过Linux,那么你对pipe应该不陌生.
那么什么是管道算法呢?如果你认为是生成类似管道形状建筑的算法,那你就大错特错了!

pipe可以将标准输出作为标准输入:
举个栗子:
line --begin 0 28 0 --end 0 128 0 | sphere -r 5 -s hollow
(用'|'分开)
即先建造一条线,然后再在这条线的每一个点创建一个球.在这里,line创建的每一个坐标都被作为sphere的生成器坐标,这会生成一根很长很粗的"棍子".
(图片待定)
管道可以无限叠加,但是计算时间也会增长.

## 2.概率表

几乎每种建筑算法都可以使用概率表,它也可以和管道配合,但必须写在最后面.
格式:
-j { block1:data1,weight1 block2:data2,weight2 ... blockn:datan,weightn }
总权重(weight)并不是以100为总和,而是给出权重的总和.
权重(weight)不能为0或小于0.
举个栗子:
round -r 30 -j { tnt:0,1 stone:0,1}
创造一个半径30的圆,TNT和石头均匀分布(各占
一半)
round -r 30 -j { tnt:0,10 stone:0,1}
创建一个半径30的圆,其中10/11为TNT,1/11为石头

## 3.exec命令执行

不直接执行命令用什么exec!
exec可以执行"隐藏命令",在正常情况下,操作员没有的命令.(只能由Websocket执行)
我们在我的世界中文Wiki中,添加了一批可以使用的隐藏命令
比如/agent命令和/closewebsocket
可以用FB代替玩家执行命令,比如创建Agent:
exec agent create
让agent移动:
exec agent move up/down/forward/back/left/right
关于agent的更多命令可查看wiki.


## 4.Paint像素画
生成一副像素画:（该功能由于某些原因不再开放）

## 更多功能等待发掘


# TO DO List
不少功能被提出但是我们还未完成(甚至还未开始)
## print 
打印文字,格式如下:

`print --font <fontType> --text <Text> --size <fontSize>`

## dump
从存档中导出方块为schematic,在结尾追加dump参数

- -z --path 保存路径

例如导出一片长方体区域:

oblong --start 0 0 0 --end 10 10 10 dump -z 

## paintMap
打印适合地图的像素画,用法与paint一致.

## wfc
使用Wave function collapse自动扩张建筑.
