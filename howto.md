# FastBuilder Helper

## 基本命令
### 取值(get)
```
get pos
```
取玩家的位置为生成器坐标.
```
get player
```
输出在线玩家及编号.
### 设备信息(screenfetch)
`screenfetch`
输出设备信息
### 遗迹寻找(locate)
```
locate village
```
将玩家传送到最近的村庄.
### 圈 & 柱(circle)
先来看一条命令:
```
circle -r 5 -h 0
```
创建一个半径为``5``,高度为1的,铁块组成的圆圈(朝向y轴,默认值),等价于
```
circle -f y -r 5 -h 0 -b iron_block -d 0
```
通过增加高度就可以建造圆柱了(空心的)
```
circle -r 5 -h 6
```
创建一个高度为7的空心圆柱(实际高度比输入多1)

### 圆 & 柱(round)
```
round -f x -r 5 -h 7
round -f x -r 5 -h 7 -b iron_block -d 0
# 这两条命令是等价的!
```
圆的参数和圈的参数基本相同,只是结构不同

### 球(sphere)
```
sphere -r 5 -s hollow
```
创建半径为5的空心球

```
sphere -r 5 -s solid
```
创建半径为5的实心球

### 圆环(torue)
```
torus -f z -w 3 -r 20 -a 40 -b stained_glass -d 2
```
创建一个朝向z轴,宽度为3,半径为20的染色玻璃圆环,并且计算精度为40

### 椭圆(ellipse)
```
ellipse -l 10 -w 20 -h 0
```
创建一个长度为10,宽度为20,高度为1的椭圆.同样的,可以通过增加高度制造椭圆柱.

### 椭球(ellipsoid)
```
ellipsoid -l 10 -w 15 -h 20
```
创建一个长度为10,宽度为15,高度为20的椭球.

### 圆锥(cone)
```
cone -r 5 -h 20 -a 20
```
创建一个高度为20,半径为5的圆锥,且计算精度为20.

### 像素画 (paint)
```
# Linux 示例:
paint -z /home/caimeo/Pictures/Pixiv/0001.png
# Windows 示例:
paint -z C:/users/caimeo/Desktop/test.png
# Android 示例:
paint -z /sdcard/Download/Pixiv/05976.png
```
根据指定路径的图片生成像素画.方向:x+,z+. 支持的图像格式:png,jpg,gif

### NBT建筑生成(NBT)(Pro only)
```
NBT -z /home/caimeo/ship.nbt
```
根据指定路径的NBT生成建筑,

### 执行命令(exec)(Pro only)
```
# 创建agent:
exec agent create
# agent向上移动:
exec agent move up
```
EXEC可以执行隐藏命令,如agent命令.

### 执行NodeJS(eval)(Pro only)
```
eval process.exit()
eval this.sendText('Hello world!')
eval for(let i = 0; i < 10; i++)this.sendText(i + 'Eval');
```
开发者专用,可以调用FastBuilderAPI.

### 管道算法(|)
用`|`传递参数
```
circle -r 20 -h 0 | round -r 3 -h 0
```
先创建一个圆圈,再在圆圈的每一个点生成一个圆.可以无限叠加命令,但是系统计算话费时间会增加.

善于运用的话你会发现这非常方便和高效.

## 参数表(Table)：

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
