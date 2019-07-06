# 专业版使用教程

## 安装教程

当你完成购买流程到FB Pro群后,

1. 从群文件下载FastBuilderPro的zip文件
2. 下载Termux并给予存储权限
3. 打开Termux;
4. 执行 apt update -y && apt upgrade -y 
5. 执行 apt install nodejs -y
6. 执行 node -v 查看node版本号,如果报错则安装失败,重新进行第4, 第5步,如果输出了版本号则进行下一步
7. 执行 mkdir pro
8. 执行 cd pro
9. 找到 FastBuilderPro文件路径(如果你是从QQ下载,那么文件保存在/sdcard/tencent/QQfile_recv/文件夹中)
10. 执行 mv 文件路径 ~/pro
11. 执行 unzip 文件名 
12. 执行 node Thor

安装教程到这里也就结束了,后续启动FB不需要再反复安装,重复第8,第12步即可.

## 使用教程
在查看使用教程之前,我建议先看看FastBuilderFree的[**教程**](./tutorial.md),因为这里的部分操作也会涉及到Free版

### 建筑生成
建筑生成器带有nbt/schematic 生成器.允许用户从nbt和schematic文件中读取建筑到存档

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

