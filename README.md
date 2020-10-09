# 项目打包发布修改
1、router.js 文件
这两个本地调试的时候可以注释掉（不注释掉会报错），发布时 history 要放开。
mode:'history', //正式 测试
base:'hsfront',  //正式 测试

2、store -> index.js 文件
因为接口图片返的是相对路径，本地调试时图片展示不出来，所以在这里添加了状态， appid 发布测试时也要修改
baseImagePath: 'https://www.zgbxjj.com',  //所有图片路径
bannerImagePath: 'https://www.zgbxjj.com/hsFileData',  //banner图路径
JumpPath:'https://www.zgbxjj.com',  //弹出pdf文件路径
upLoadImg: 'https://www.zgbxjj.com',  //上传图片路径
appid: 'wxec19abc8795c0014', //测试:wx09f6d091df15b1f8    正式:wxec19abc8795c0014  

# 打包文件
config 文件夹下面的index.js，修改了打包文件名称
1、打包文件名称修改为hsfront对应服务器上的hsfront文件夹


