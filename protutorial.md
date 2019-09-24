# 专业版使用教程

目录：
 - 一、购买前须知
 - 二、基本概念/知识介绍
 - 三、前置条件（重要）
   -   安卓 Android
   -   Windows/Linux/macOS/Unix
   -   iOS 11.0-12.4
   -   iOS 9.x-10.x
 - 四、安装FastBuilder Pro及需要的运行环境
   -   安卓傻瓜式安装
   -   安卓 Android
   -   Windows
   -   macOS
   -   Linux/Unix
   -   iOS 11.0-12.4
 - 五、启动并开始使用FastBuilder Pro
   -   安卓 Android
   -   Windows
   -   macOS
   -   iOS 11.0-12.4
 - 六、特别注意
 - 七、常见错误
 - 八、使用教程

## 一、购买前须知/注意

您需要在购买之前阅读[用户协议](/LICENSE.md)

我们的大量已购用户反馈，FastBuilder Pro及其安卓软件版本在**华为设备**上运行存在问题，因此如果您使用**华为设备且没有其他系统的设备**，请谨慎购买。

iOS/iPad OS用户需注意，在最新版本（1.14.0-更高）的中国版**无法执行**<code>/wsserver</code> <code>/connect</code>命令，导致用户不能正常使用FastBuilder，但国际版及旧版的中国版仍然可以正常使用，请谨慎购买。

## 二、基本概念/知识介绍

FastBuilder与其他类似工具的共同点在于，存在“客户端”与“服务端”概念。玩家运行游戏的手机，或者说玩家正在运行的游戏，就是客户端；FastBuilder就是服务端，远程向游戏发送操作命令来达到速建目的。

因此，服务端可以与客户端不在同一台设备上，只需要它们处于同一网络环境就可以正常使用。

但是由于使用命令行操作，需要用户具备如下基础：

1. 文件操作能力，能够理解路径和文件层级
2. 英语能力，能够认出‘Error’、‘Permission denied’、‘not found’等字眼并明白其含义
3. 能够区分全角符号与半角符号
4. (非必须，但最好会)在命令行界面输入并执行命令的能力

请确保您具备以上能力，避免因后续的各种麻烦而给我们带来不必要的服务时长。

## 三、前置条件（重要）

### 安卓 Android

1. 从[**Termux官网提供的下载渠道**](https://f-droid.org/packages/com.termux/)下载软件Termux，当前版本：[0.75](https://f-droid.org/repo/com.termux_75.apk)
2. **打开设置，给予Termux存储空间权限**

### Windows/Linux/macOS/Unix

1. 电脑需具备正常的网卡，以及连接到与需使用设备相同的局域网

### iOS 11.0-12.4

**重要：设备需unc0ver越狱，未越狱可以使用[爱思助手](https://www.i4.cn)等工具进行越狱，您也可以通过搜索引擎[搜索unc0ver在线安装](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&ch=&tn=baiduerr&bar=&wd=unc0ver%E5%9C%A8%E7%BA%BF%E5%AE%89%E8%A3%85)**
1. 打开Cydia-软件源，单击右上角“编辑”-左上角“添加”
2. 逐一添加如下软件源：
   -   cydia.angelxwind.net
   -   tigisoftware.com/cydia
   -   apt.thebigboss.org/repofiles/cydia （通常自带，如列表中无，则需添加）
   -   apt.bingner.com （通常自带，如列表中无，则需添加）
3. 搜索Apple File Conduit "2"并将来自Bigboss的搜索结果设置队列
4. 搜索Appsync Unified并将来自Karen's Repo的搜索结果设置队列
5. 搜索MTerminal并将来自bingner的搜索结果设置队列
6. 搜索Filza File Manager 64-bit并将来自TIGI Software的搜索结果设置队列
7. 搜索Node并将来自bingner的搜索结果设置队列
8. 搜索nano并将来自bingner的搜索结果设置队列
8. 点击“已安装”，随后点击右上角“队列”
9. 点击右上角“确认”，开始安装
10. 安装完毕后，点击“重新启动 Springboard”，进行注销操作
   -   也有可能显示“回到 Cydia”，如显示，按下即可

### iOS 9.x-10.x

1. 如需安装FastBuilder Pro，请移步免费版安装教程；如需在电脑运行通用版本，请跟随Windows/Linux/macOS/Unix教程

## 四、安装FastBuilder Pro及需要的运行环境

当你完成购买流程到FastBuilder Pro群后,

### 安卓傻瓜式安装

从FastBuilder Pro群文件中下载Thor.zip后并保证安卓安装的前置条件已经满足后，复制如下命令到Termux并执行

`cd ~/ && apt install wget -y && wget https://raw.githubusercontent.com/CAIMEOX/FastBuilder/master/installer/FBInstallAndroid && chmod +x FBInstallAndroid && ./FBInstallAndroid`

执行完成后，执行<code>cd ~/ && ./fbpro</code>来启动FastBuilder Pro，如出现Thor字样则代表启动成功，不需要再查看下方的安卓安装步骤。

如未成功安装，请跟随下方安卓步骤完成安装。

### 安卓 Android

1. 从群文件下载FastBuilder Pro的zip文件（当前版本号：Thor）
3. 打开Termux
4. 执行 <code>apt update -y && apt upgrade -y</code>
   - 如出现“dpkg was interrupted”字样：
     执行 `dpkg --configure -a`，中途出现所有询问选项输入y
5. 执行 <code>apt install nodejs -y</code>
6. 执行 <code>node -v</code> 查看node版本号,如果报错则安装失败,重新进行第4, 第5步,如果输出了版本号则进行下一步
7. 执行 <code>mkdir ~/pro</code>，这一步执行正常的情况下不会返回任何信息，如出现“File exists”字样可以也可以继续执行下一步
8. 执行 <code>cd ~/pro</code>，这一步执行正常的情况下不会返回任何信息，如出现“no such file or directory”字样，请从第6步重新开始
9. 找到 FastBuilderPro文件路径(如果你是从QQ下载,那么文件保存在/sdcard/tencent/QQfile_recv/或/storage/emulated/0/tencent/QQfile_recv/文件夹中)
10. 执行 <code>mv 文件路径 ~/pro</code>（文件路径，例如/storage/emulated/0/tencent/QQfile_recv/Thor.zip），这一步执行正常的情况下不会返回任何信息，如出现“Permission denied”字样，请从设置打开Termux的存储权限后重新执行本步；如出现“no such file or directory”字样，请确保第1步执行正常后重新执行本步
11. 执行 <code>unzip 文件名</code>（文件名如Thor或Thor.zip），如出现“cannot find or open”字样，请重新执行上一步

### Windows

1. 从群文件下载FastBuilder Pro的zip文件，解压到你需要的目录
1. 进入[**Node.js官网**](https://nodejs.org)下载Node.js安装包并安装

### macOS

1. 从群文件下载FastBuilder Pro的zip文件，解压到你需要的目录
2. 进入[**Node.js官网**](https://nodejs.org)下载Node.js安装包并安装

### Linux/Unix

1. 根据系统不同，安装方法不同，此处不再阐述

### iOS 11.0-12.4

1. 从群文件下载FastBuilder Pro的zip文件，选择“用其他应用打开”，使用Filza打开
2. 将文件在Filza中解压（单击压缩包自动解压）
3. 回到主屏幕，打开Terminal
4. 执行`nano fbpro`，此时进入编辑页面
5. 输入`cd ~/Documents/Thor && node Thor`
6. 按住屏幕中间，出现“Ctrl Lock”后单击键盘x
7. 单击键盘y，换行
8. 执行`chmod +x fbpro`

## 五、启动并开始使用FastBuilder Pro
确保前置环境配置好且没有问题后

### 安卓 Android

1. 打开Termux
2. 执行 <code>cd ~/pro && node Thor</code>，此时显示“Thor”大字即为执行成功，如报错请确保前置环境配置正常
3. 按照显示的地址在游戏中输入<code>/connect 地址</code>，如FastBuilder Pro运行在你需要运行游戏的设备，则可以简化为<code>/connect localhost:16384</code>

### Windows

1. 按下<code>win+r</code>，在弹出的窗口输入<code>cmd</code>，进入cmd程序
2. 执行 <code>cd /d 你解压后的路径</code>
3. 执行 <code>node Thor</code>，此时显示“Thor”大字即为执行成功，如报错请确保前置环境配置正常
4. 按照显示的地址在游戏中输入<code>/connect 地址</code>，如FastBuilder Pro运行在你需要运行游戏的设备，则可以简化为<code>/connect localhost:16384</code>

### macOS

1. 按下<code>control+space(空格)</code>，输入“Terminal”或“终端”，按下return
2. 执行 <code>cd 你解压后的路径 && node Thor</code>，此时显示“Thor”大字即为执行成功，如报错请确保前置环境配置正常
3. 按照显示的地址在游戏中输入<code>/connect 地址</code>，如FastBuilder Pro运行在你需要运行游戏的设备，则可以简化为<code>/connect localhost:16384</code>

### iOS 11.0-12.4

1. 打开Terminal
2. 执行 `./fbpro`
3. 按照显示的地址在游戏中输入<code>/connect 地址</code>，如FastBuilder Pro运行在你需要运行游戏的设备，则可以简化为<code>/connect localhost:16384</code>

## 六、特别注意

### 安卓 Android

1. QQ下载文件通常位于/storage/emulated/0/tencent/QQfile_recv/，例如用户下载了文件“1.nbt”，那么该文件位于/storage/emulated/0/tencent/QQfile_recv/1.nbt
2. 手机后台未开启的情况下，FastBuilder无法后台运行

### iOS 11.0-12.4

1. QQ下载文件通常位于/var/mobile/Containers/Data/Application/`{UDID}`/Documents/`{QQ号}`/FileRecv/，例如用户下载了文件“1.nbt”，那么改文件位于/var/mobile/Containers/Data/Application/`{UDID}`/Documents/`{QQ号}`/FileRecv/1.nbt，其中`{UDID}`与`{QQ号}`会发生变化，因此我们不建议您通过该路径进行文件读取；因此，例如用户下载了文件“1.nbt”，需“用其他应用打开”，选择Filza。外部导入到Filza的文件默认路径为/var/mobile/Documents，所以导入后的路径为/var/mobile/Documents/1.nbt
2. iOS后台机制可能不利于FastBuilder后台运行，因此您可以选择在Cydia安装Screen（bingner源）进行窗口管理（需要事先学习过screen操作，或参考下一条）
3. iOS后台机制可能不利于Minecraft后台运行，因此您可以选择在Cydia安装BackgrounderAction for CCSupport（软件源：akusio.github.io）并操作：
   -   安装并重新启动Springboard后，打开设置-控制中心-自定控制
   -   添加Toggle Background Mode
   -   打开游戏，在游戏中展开控制中心，找到图标并单击打开，即可设定后台运行，Terminal及其他软件亦可如此操作

## 七、常见错误

**注：出现崩溃可以直接执行`node Thor`来重新启动**

### 游戏中连接，显示无法连接到服务器？
检查FastBuilder Pro是否正常运行，以及您输入的地址是否正确，如不处于相同设备请检查是否处在相同局域网
  - 查看FastBuilder Pro报错信息，如显示“Invalid Websocket frame”
     -   终端问题，建议从[**Termux官网提供的下载渠道**](https://f-droid.org/packages/com.termux/)下载软件Termux，并重新配置
     -   华为设备问题，华为可能存在不支持/无法运行的情况，建议更换设备

### 游戏中连接，显示连接已关闭？
查看FastBuilder Pro报错信息，如显示“Websocket is not open”，则是底层问题，可尝试执行<code>node Thor</code>重新运行FastBuilder，并在游戏中重新连接直到成功为止

### 游戏中连接成功，但没有任何反应？
这种情况通常发生在FastBuilder运行于Windows时，可以尝试在游戏中输入<code>/connect out</code>后重新连接，或回到FastBuilder按下<code>ctrl(control)+c</code>，输入<code>node Thor</code>重新运行并在游戏重新连接

### 游戏中连接成功，但试图读取较大的文件时显示连接已关闭？
通常情况下原因是内存不足，可以运行<code>node Thor --max-old-space-size=4096</code>来给FastBuilder Pro分配2G内存，单位MB，根据需要调整

### 游戏中连接成功，但读取并搭建文件的过程中显示连接已关闭？
建议参考上一问题，重试，如多次在同一个进度断开连接，则代表您读取的文件存在问题，请更换。

## 八、使用教程
在查看使用教程之前,我们建议先查看FastBuilder Free的[**教程**](./tutorial.md),因为这里的部分操作也会涉及到Free版

您可以连接成功后，在聊天框发送<code>help</code>来获取完整可用命令列表

### 建筑生成
大部分购买FastBuilder Pro的用户需要这些功能，建筑生成器带有nbt/schematic 生成器，允许用户从nbt和schematic文件中读取建筑到存档

1. nbt命令

路径是nbt文件的路径

`nbt -z 文件路径`

2. schematic命令

路径是schematic文件的路径

`schematic -z 文件路径`

### 像素画
像素画功能允许玩家读取图片并绘制到存档中,目前支持png格式.生成的像素画的大小为输入图片大小

命令格式: 

`paint -z 文件路径`

