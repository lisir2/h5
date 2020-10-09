'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api':{
        target: 'https://test.zgbxjj.com', // 测试 https://www.zgbxjj.com 后台服务器url 
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      },
      '/wabc':{
        target: 'https://www.zgbxjj.com', // 正式 https://www.zgbxjj.com 后台服务器url
        changeOrigin: true,
        pathRewrite:{
          '^/wabc':''
        }
      },
      '/org': {
        target: 'http://192.168.0.15:8000', //林彰淼 后台服务器url
        changeOrigin: true,
        pathRewrite: {
          '^/org': ''
        }
      },
      '/brg': {
        target: 'http://192.168.0.64:8000', //邵帅 后台服务器url 
        changeOrigin: true,
        pathRewrite: {
          '^/brg': ''
        },
      },
      "/easyreplay": {
        // target: “https://easyrepaly.sinosoftfrinfo.com.cn:8443”,
        // 如果是 localhost 等 http 环境访问，请将 target 改为 http://188.131.201.123:9002；
        target: 'https://easyrepaly.sinosoftfrinfo.com.cn:8443',
        changeOrigin: true,
        pathRewrite: {
          "^/easyreplay": "/"
        }
      }
    },

    // Various Dev Server settings
    /**
     * localhost、127.0.0.1和0.0.0.0和本机IP的区别
     * 
      1、localhost localhost其实是域名，一般windows系统默认将localhost指向127.0.0.1，但是localhost并不等于127.0.0.1，localhost指向的IP地址是可以配置的

      2、127.0.0.1
      首先我们要先知道一个概念，凡是以127开头的IP地址，都是回环地址（Loop back address），其所在的回环接口一般被理解为虚拟网卡，并不是真正的路由器接口。

      所谓的回环地址，通俗的讲，就是我们在主机上发送给127开头的IP地址的数据包会被发送的主机自己接收，根本传不出去，外部设备也无法通过回环地址访问到本机。

      小说明：正常的数据包会从IP层进入链路层，然后发送到网络上；而给回环地址发送数据包，数据包会直接被发送主机的IP层获取，后面就没有链路层他们啥事了。

      而127.0.0.1作为{127}集合中的一员，当然也是个回环地址。只不过127.0.0.1经常被默认配置为localhost的IP地址。 一般会通过ping 127.0.0.1来测试某台机器上的网络设备是否工作正常。

      3、0.0.0.0
      首先，0.0.0.0是不能被ping通的。在服务器中，0.0.0.0并不是一个真实的的IP地址，它表示本机中所有的IPV4地址。监听0.0.0.0的端口，就是监听本机中所有IP的端口。
     */
    host: '0.0.0.0', // can be overwritten by process.env.HOST  localhost
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../hsfront/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../hsfront'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
