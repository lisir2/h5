// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import axios from 'axios'
import MintUI from 'mint-ui'
import store from './store'//引入store
import * as Utils from './util/validate.js' // utils模块 公共方法
import api from '@/fetch/api'
import $ from 'jquery'
import qs from 'qs'
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';
import 'mint-ui/lib/style.css'
// 公共样式
import './assets/style/common.scss';
import 'lib-flexible'
import md5 from "js-md5";
import VConsole from 'vconsole';  // 测试日志打印
if (store.state.VConsole){
  new VConsole();
}
// vant UI 组件
import Vant from 'vant'
import { NavBar } from 'vant';
import { Toast } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Grid, GridItem } from 'vant';
import { Loading } from 'vant';
import { Dialog } from 'vant';
import { Sku } from 'vant';
import { Notify } from 'vant';
import Vuelidate from 'vuelidate'
import { Popup } from 'vant';
import { Area } from 'vant';
import { ActionSheet } from 'vant';
import { Picker } from 'vant';
import { Overlay } from 'vant';
import { RadioGroup} from 'vant';
import { Radio } from 'vant';
import { Stepper } from 'vant';
import { Icon } from 'vant';
import { Skeleton } from 'vant';
import { Field } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { DatetimePicker } from 'vant';
import { Progress } from 'vant';
import { PullRefresh } from "vant";
import { Image } from "vant";
import { List, Search } from "vant";
import { Checkbox, CheckboxGroup } from 'vant';
import { Cell, CellGroup } from "vant";
import { Sticky } from 'vant';
import { Tab, Tabs } from "vant";
import { DropdownMenu, DropdownItem } from "vant";
import { NoticeBar } from 'vant';
import { Tag } from "vant";
import { Rate } from 'vant';
import { SwitchCell } from 'vant';
import { Button } from 'vant';
import clipboard from 'clipboard';
import { NumberKeyboard } from 'vant';
import { IndexBar, IndexAnchor } from 'vant';
import { ImagePreview } from 'vant';

// 头像剪切js
import clipper from '../static/cropperjs/cropper.js'

// 全局注册
Vue.use(ImagePreview);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(NumberKeyboard);
Vue.use(Button);
Vue.use(SwitchCell)
Vue.use(Rate);
Vue.use(Tag);
Vue.use(NoticeBar);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Tab).use(Tabs);
Vue.use(Sticky);
Vue.use(Cell).use(CellGroup);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Search);
Vue.use(Image);
Vue.use(Progress);
Vue.use(clipper);
Vue.use(DatetimePicker);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Collapse).use(CollapseItem);
Vue.use(Icon);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Stepper);
Vue.use(Overlay);
Vue.use(Picker);
Vue.use(ActionSheet);
Vue.use(Vuelidate)
Vue.use(Notify);
Vue.use(Field);
Vue.use(Loading);
NutUI.install(Vue);
Vue.use(Dialog);
Vue.use(Popup);
Vue.use(Area);
Vue.use(Skeleton);
Vue.use(Sku);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Grid).use(GridItem);
Vue.use(MintUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.sign = sign;
Vue.prototype.setCookie = setCookie;
Vue.prototype.getCookie = getCookie;
Vue.prototype.delCookie = delCookie;
Vue.prototype.getQueryString = getQueryString;
Vue.prototype.is_weixn = is_weixn;
Vue.prototype.Toast = Toast;
Vue.prototype.timestampToTime = timestampToTime;
Vue.prototype.qs = qs;
Vue.prototype.accMul = accMul; 
Vue.prototype.blurAdjust = blurAdjust; 
Vue.prototype.Utils = Utils;
Vue.prototype.$dialog = Dialog;
Vue.prototype.clipboard = clipboard;
Vue.prototype.$ImagePreview = ImagePreview;
Vue.prototype.$getSign = getSign; // 进行微信签名、微信分享
Vue.prototype.floatMultiply = floatMultiply;  // js乘法 丢失精度问题


// params:要传的参数 encrypt:要加密的参数（密码） 包含在params对象里面
function sign(params, encrypt) {
  var key = 'hsfrontsys828@1';
  var args = {
    appid: "hsfrontsys",
    timestamp: new Date().getTime(),
    sign: "",
    params: params,
    format: 'json',
    channelUser: '0'
  }
  // encrypt:如果没有这不去加密参数， 如果传了去加密参数
  if (encrypt) {
    args.params[encrypt] = md5(args.params[encrypt]);
  }
  // args.params.userPassword = md5(args.params.userPassword);
  args.params = JSON.stringify(args.params); //转成字符串
  // 拼接生成sign
  var signStr = key + "appid" + args.appid + "channeluser" + args.channelUser + "format" + args.format + "params" + args.params + "timestamp" + args.timestamp + key; // testArgs.params
  // 字符串转成大写
  args.sign = md5(signStr.toLowerCase()).toUpperCase();
  return args;
}

// 设置cookie
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ";expires = " + exdate.toGMTString() + ";path = /;";
}
// 获取cookie
function getCookie(name) {
  var arr;
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : '';
}
// 删除cookie
function delCookie(name,domain,value = '') {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() - 1);
  if (name != null && domain) {
    document.cookie = name + "=" + escape(value) + ";expires = " + exdate.toGMTString() + ";path = /;domain=" + domain;
  } else {
    document.cookie = name + "=" + escape(value) + ";expires = " + exdate.toGMTString() + ";path = /;";
  }
}

// 保单查询判断是否已经实名认证
function policyInquiry(SuccessCallback) {
  var args = sign({ userId: getCookie('ZB_JUSER_Mid') });
  api.queryPersonalInfo(args).then(res => {
    if (res.code == 20000) {
      console.log(res.data.realName, res.data.realCertificationNo);
      if (res.data.realName && res.data.realCertificationNo) {
        // 已实名
        SuccessCallback();
      } else {
        // 未实名
        var index = layer.confirm('应监管要求需要实名认证，完成后即可查询保单信息',
          {
            area: ['75%'],
            btn: ['确定', '取消'] //按钮
          }, function () {
            layer.close(index);
            router.push({ path: 'identityAuthentication', query: { route: 'policyInquiry' } });
          }, function () {
            layer.close(index);
          }
        );
      }
    }
  });
};

//判断当前浏览器是否属于微信
function is_weixn() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}
//把code传给后台,得到openid
function getOpenId(code) {
  $.ajax({
    type: "get",
    url: "/openapi/wechat/auth/getOpenId",
    async: false,
    cache: false,
    data: { code: code },
    dataType: "json",
    success: function (result) {
      console.log(result)
      if (result.code == 20000) {
        setCookie('wxopenId', result.openId);
        setCookie('headImgUrl', result.wxMpUser.headImgUrl);
      }
    }
  });
}

// 投保页面价格试算，处理js丢失精度问题
function accMul(arg1, arg2, arg3) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString(),
    s3 = arg3.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) { }
  try {
    m += s2.split(".")[1].length;
  } catch (e) { }
  try {
    m += s3.split(".")[1].length;
  } catch (e) { }
  return (
    Number(s1.replace(".", "")) *
    Number(s2.replace(".", "")) *
    Number(s3.replace(".", "")) /
    Math.pow(10, m)
  );
};

// js乘法丢失精度问题
function floatMultiply(arg1, arg2) {
  if (arg1 == null || arg2 == null) {
    return null;
  }
  var n1, n2;
  var r1, r2; // 小数位数
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  n1 = Number(arg1.toString().replace(".", ""));
  n2 = Number(arg2.toString().replace(".", ""));
  return n1 * n2 / Math.pow(10, r1 + r2);
}

//获取地址栏的参数
function getQueryString(name) {
  var result = decodeURIComponent(window.location.href).match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
    return "";
  }
  return result[1];
}
// 时间戳转时间格式  blo为true，返回 yy-mm-dd 格式 不传为 yy-mm-dd h-m-s
function timestampToTime(timestamp, blo) {
  if (timestamp) {
    var time = new Date(Number(timestamp));
    var y = time.getFullYear();
    var M = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();
    if (blo) {
      return y + '-' + addZero(M) + '-' + addZero(d)
    } else {
      return y + '-' + addZero(M) + '-' + addZero(d) + ' ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s);
    }
  } else {
    return '';
  }
}
// 月份小于10 前面加上 0（01月）
function addZero(m) {
  return m < 10 ? '0' + m : m;
}
// 解决苹果不回弹页面
function blurAdjust(e) {
  setTimeout(() => {
    if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
      return
    }
    let result = 'pc';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
      result = 'ios'
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
      result = 'android'
    }

    if (result = 'ios') {
      document.activeElement.scrollIntoViewIfNeeded(true);
    }
  }, 100)
}

/**
 * 签名 分享函数
 * @param {*} title  分享标题
 * @param {*} descript  分享描述
 * @param {*} ShareImage  分享路径
 * @param {*} ShareLink  //分享链接
 * @param {*} ShareSuccess  分享成功回调
 */
function getSign(title, descript, ShareImage, ShareLink, ShareSuccess) {
  var link = location.href;
  $.ajax({
    type: "get",
    url: "/openapi/wechat/auth/getSign",
    async: false,
    cache: false,
    data: { link: encodeURIComponent(link) },
    dataType: "json",
    success: function (result) {
      if (result.code == 20000) {
        // 微信签名
        wx.config({
          debug: false,
          appId: result.appId,
          timestamp: result.sign.timestamp,
          nonceStr: result.sign.nonceStr,
          signature: result.sign.signature,
          jsApiList: ["checkJsApi", "invokeMiniProgramAPI", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "onVoicePlayEnd", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"]
        });

        // 进行分享
        wx.ready(function () {
          window.wechatShareData = {
            title: title, // 分享标题
            desc: descript, // 分享描述
            link: ShareLink, // 分享链接
            imgUrl: ShareImage, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link 
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {   //分享成功回调事件
              console.log('分享成功');
              console.log(ShareSuccess);
              if (ShareSuccess){
                ShareSuccess();
              }
            },
            cancel: function () {   //分享失败回调事件
              console.log('分享失败');
            }
          }
          wx.updateAppMessageShareData(wechatShareData); // “分享给朋友”及“分享到QQ”按钮的分享内容
          wx.updateTimelineShareData(wechatShareData); // “分享到朋友圈”及“分享到QQ空间”
          wx.onMenuShareTimeline(wechatShareData); // 分享到朋友圈
          wx.onMenuShareAppMessage(wechatShareData); // 分享给朋友
          wx.onMenuShareQQ(wechatShareData); // 分享到QQ
          wx.onMenuShareWeibo(wechatShareData); // 分享到腾讯微博
          wx.onMenuShareQZone(wechatShareData); // 分享到QQ空间
        });
      } else {
        console.log('页面加载失败')
      }
    }, error: function (data) {
      console.log('连接失败')
    }
  });
}

// 静默授权
function SilentAuthorization(){
  // 微信静默授权
  var appid = store.state.appid;
  if (is_weixn()) {
    if (getCookie('wxopenId') == "") {
      // 查看是否有code
      if (!getQueryString("code")) {
        var local = location.href;
        // 授权获取code
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + encodeURIComponent(local) + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
        window.location.href = url;
      } else if (getQueryString("code")) {
        // 获取路径上的code
        var code = getQueryString("code");
        // 获取openid 保存到cookie
        getOpenId(code);
      }
    }
  }
};

// 路由守卫页面 以下页面必须登录才可进入
var guardLogin = [
  'personalPolicy',  //个险保单页面
  'industryPolicy', //团险保单页面
  'vehiclePolicy',  //车险保单页面
  'activityZone',  //活动专区页面
  'topContacts', //活动专区页面
  'Customize',  //常用联系人页面
  'personalData',  //个人资料页面
  'policyInquiry',  //保单管理页面
  'inviteFriends',   //邀请好友页面
  'AgentTeam',  //代理人 我的团队页面
  'clientInsurancePolicy',  //客户个险保单页面
  'clientIndustryPolicy',  //客户团险保单页面
  'clientCarInsurancePolicy',  //客户车险保单页面
  'myAssets',  // 我的资产页面
  'cashOut', //提现页面
  'billingDetails', //提现明细页面
  'myCard', // 名片设置页面
];

// 全局路由守卫
router.beforeEach((to, from, next) => {
  console.log(to.name, from.name);
  
  // 全局路由监听，保存到stare里面
  store.commit("toRouter", to.name);
  store.commit("fromRouter", from.name);
  // 微信端首页 和 我的页面调用手动授权
  if (to.name == 'home' || to.name == 'mine') {
    next();// 必须使用 next ,执行效果依赖 next 方法的调用参数
    if (is_weixn()) {
      // 判读cookie里面是否有 wxopenid 有的话不进行授权
      if (getCookie('wxopenId') == ""){
        // 授权成功之后，页面路径里面会有openid保存到cookie，没有openid则进行授权
        if (!getQueryString("openid")) {
          var url = encodeURIComponent(location.href);
          window.location.href = '/openapi/wechat/auth/authorize?returnUrl=' + url;
        } else {
          setCookie('wxopenId', getQueryString("openid"));
        }
      }
    }
  // 当从产品详情页面跳转到登录页面时，强制改变路由到产品列表页面
  } else if (to.name == 'loginMain' && from.name == 'productdetail'){
    next('classlist');
  } else if (guardLogin.includes(to.name)) { // 特殊页面必须登录（路由时判断是否登录） 
    var loginStatus = getCookie('ZB_JUSER_Mid'); //登录状态
    var activityCode = getQueryString("activityCode"); //渠道码
    var phone = getQueryString("phone"); //手机号
    if (loginStatus) {// 已登录
      if (is_weixn()) {
        // 判断微信授权的openid 和 数据库存的 openid是否相同 (openId：登录的时候后台返回openid进行保存，wxopenId：授权之后的openid保存)
        if (getCookie('openId') == "" || getCookie('openId') == getCookie('wxopenId')) {
          if (to.name == "policyInquiry"){
            // 保单查询单独处理
            policyInquiry(function(){
              next();
            });
          } else{
            next();
          }
        }else{
          Notify('当前账户已存在关联，请联系保险经纪网客服');
        }
      }else{
        if (to.name == "policyInquiry") {
          // 保单查询单独处理
          policyInquiry(function () {
            next();
          });
        } else {
          next();
        }
      }
    // 渠道查询个险保单不需要登录
    } else if (activityCode != '' && phone != '' && to.name == 'personalPolicy'){
      next();
    } else{
      if (to.name == "policyInquiry"){
        next({ path: 'loginRegister', query: { routerLink:'policyInquiry'} });
      } else if (to.name == "myCard") {
        next({ path: 'loginRegister', query: { routerLink: 'myCard' } });
      } else{
        next({ path: 'loginRegister' });
      }
    }
    // 静默授权
    SilentAuthorization();
  } else if (to.name == 'FreeInsurance'){  //活动页面，免费领取保险
    next();// 必须使用 next ,执行效果依赖 next 方法的调用参数
    if (is_weixn()) {
      var returnUrl = location.href;
      var appid = store.state.appid;
      // 手动授权获取用户信息 免费领取保险
      if (!getQueryString("code")) {
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + encodeURIComponent(returnUrl) + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        window.location.href = url;
      } else {
        // 如果cookie里面有headImgUrl，不用授权，(领取保险需要获取用户微信头像，如果已经有了，不用进行授权)
        if (!getCookie('headImgUrl')){
          getOpenId(getQueryString("code"));
        }
      }
    }
  } else{
    next();// 必须使用 next ,执行效果依赖 next 方法的调用参数
    // 如果用户拒绝了授权，或进入到其他路由(除了home、mine、FreeInsurance其他使用静默授权)，判断本地是否有(wxopenid),没有则进行静默授权
    SilentAuthorization();
  }
})

/* eslint-disable no-new */ //实例化vue 挂载 #app
new Vue({
  el: '#app',
  router,
  store,//挂载store到 vue上（实例化store）
  components: { App },
  template: '<App/>'
})



