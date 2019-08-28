# 疑难解答

## 一.Android安装和使用问题:

Android安装和使用问题是被提问次数最多的,这是由于安卓用户庞大的基数,以及设备的差异.

### 1.no such file or directory

问题:没有文件或路径

解决方法:检查文件完整性和操作是否成功.

### 2.Unable to fetch some archives, maybe run apt-get update or try with --fix-missing?

问题:软件包未成功安装

解决方法:多试几次,检查网络环境

### 3.Command not found

问题:软件包未安装

解决方法:安装该命令的软件包

### 4.无法连接到ws://xxxxxxxxx服务器

问题:ws服务器未正常运行或地址错误

解决方法:检查FB是否正常运行,客户端设备与运行FB服务器的设备是否在同一网络环境,以及试图连接的地址是否有误.

技巧:如果服务端与客户端在同一设备可以使用127.0.0.1或localhost作为地址.

#### 5.listen EADDRINUSE: address already in use

问题:端口被占用

解决方法:检查是否多开了FB或其他软件占用了端口,或者使用node Main port,在另一个端口(port)启动FB.

### 6.输入命令之后没反应

问题:输入数据过于极端导致线程卡死

解决方法:别手贱

### 7.<--- Last few GCs --->,<--- JS stacktrace --->

问题:堆栈溢出,很可能是上一种情况的后续.

解决方法:更换设备/别手贱,或者更改内存上限(比如改成8GB):

`node --max-old-space-size=8192 Main.js`

### 8.Websocket is not Open: readyState 0 (CONNECTING)
问题:Websocket服务器未准备完成，或者在连接开始时发送信息

解决方法:这是NodeWS模块遗留的问题,不是很好解决.可以尝试重启FB再进行连接,重启之后记得要等一会).遇到这个问题完全靠运气.


## 二.使用问题

### 1.输入命令无反应

问题:输入错误或者参数过于极端

解决方法:检查输入内容是否正确,参数会不会太大

### 2.使用过程中断开连接

问题:FastBuilder Bug或网络连接/后台问题

解决方法:如果FB的服务器和客户端不在同一种设备,很可能就是网络连接问题,请检查网络连接.如果在同一设备,则可能是后台被系统吞了.
如果以上情况都不是,那FB很可能发生了错误,请确认后提交issues.

### 3.Permission denied
问题:没有存储权限

解决方法:在设置里给予Termux存储权限

### 4.没有报错，但也没有建筑
问题:坐标设置有误

解决方法:get -t position

### 5.No such file or directory
问题:没有文件或路径

解决方法:检查路径是否输入正确,输入完整
