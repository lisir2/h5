<!-- 组件说明 代理人首页-->
<template>
  <div class="AgentFirst">
    <van-swipe indicator-color="white" :autoplay="3000">
      <van-swipe-item>
        <van-image :src="banner1" alt></van-image>
      </van-swipe-item>
      <van-swipe-item>
        <van-image :src="banner2" alt></van-image>
      </van-swipe-item>
    </van-swipe>
    <div class="session">
      <img src="../../assets/images/agent/threeStype.png" alt />
      <div class="register">
        <input type="text" placeholder="请输入手机号" maxlength="11" v-model="phoneCode"/>
        <button @click="register()" class="getMoney">立即注册赚大钱</button>
        <van-checkbox v-model="checked" class="label">
          同意
          <a @click="showFile($event)">《保险经纪网协议》</a>
        </van-checkbox>
      </div>
      <img src="../../assets/images/agent/centerImg.png" />
    </div>
    <!-- 信息弹框html-->
    <van-popup v-model="MessagePopShow" :style="{width:'80%'}" closeable>
      <div class="inspection">
        <div class="title">
          <img src="../../assets/images/agent/icon-successful.png" alt />
          <span style="margin-left: 5px;">{{MessagePopVal.promptMessage}}</span>
        </div>
        <div class="msg">{{MessagePopVal.message}}</div>
        <router-link class="reUplode" :to="MessagePopVal.routerLink">{{MessagePopVal.btnText}}</router-link>
      </div>
    </van-popup>
    <!-- 信息弹框html-->
    <!-- 注册弹出框内容 -->
    <van-popup v-model="verificationCodeShow" :style="{width:'80%'}" closeable>
      <div class="verificationCode">
        <p>
          验证码发送至
          <span>{{phoneCode}}</span>
        </p>
        <input
          type="text"
          placeholder="输入收到的验证码"
          v-model="inputVerification"
          maxlength="6"
          οninput="if(value.length>6)value=value.slice(0,6)"
        />
        <span class="getVerificationCode" @click="getAuthCode">获取验证</span>
        <button @click="verification()">确定</button>
      </div>
    </van-popup>
    <!-- 注册弹出框内容 -->
    <AgentFooter></AgentFooter>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Image } from "vant";
Vue.use(Swipe).use(SwipeItem);
import AgentFooter from "./AgentFooter";
import api from "@/fetch/api";
export default {
  name: "AgentRegister",
  components: {
    AgentFooter
  },
  data() {
    return {
      banner1: require("../../assets/images/agent/agentBanner2.png"),
      banner2: require("../../assets/images/agent/agentBanner.png"),
      timeCode: 60, // 验证码倒计时
      uuid: "", //验证码接口生成随机数
      // 获取邀请码 或 渠道号
      invitationCodeValue:
        this.getQueryString("invitationCode") == null
          ? ""
          : this.getQueryString("invitationCode"),
      // 渠道邀请码
      topActivityCode:
        this.getQueryString("topActivityCode") == null
          ? ""
          : this.getQueryString("topActivityCode"),
      checked: false, //同意协议
      verificationCodeShow: false, //验证码弹框显示
      MessagePopShow: false, // 提示信息弹框显示
      MessagePopVal: {
        //弹出信息框内容
        routerLink: "", //确定跳转路由
        btnText: "", // 确定文章
        message: "", //弹出内容提示
        promptMessage: "" // 弹出信息title
      },
      IsgetVerificationCode: true, //是否可以获取验证码
      phoneCode: '', // 注册手机号码
      inputVerification: "", //验证码
    };
  },
  computed: {},
  mounted() {},
  methods: {
    // 注册代理人
    register() {
      var that = this;
      if (this.Utils.isPhoneNumber(that.phoneCode)) {
        // 手机号码正确
        if (this.checked) {
          var params = that.sign({ phone: that.phoneCode });
          api.checkRegister(params).then(res => {
            if (res.data.errCode == "false" && res.data.phone) {
              //正确，然后弹出验证码的弹窗
              that.verificationCodeShow = true;
            } else {
              //弹框js  link:确定之后跳转地址 text：提示文本 title：弹出框提示文字 imgText:图片旁边的文字提示 btnText:按钮文字
              that.inspection(
                "mine",
                "您的手机号已注册，请更换手机号！",
                "提示",
                "前往保险经纪网看看"
              );
            }
          });
        } else {
          this.Toast("请同意保险经纪网协议");
        }
      } else {
        this.Toast("请输入正确的手机号码");
      }
    },
    // 获取验证
    getAuthCode() {
      if (this.IsgetVerificationCode) {
        var that = this;
        this.timeCode = 60;
        this.IsgetVerificationCode = false;
        $(".getVerificationCode").html("60秒");
        var time = setInterval(() => {
          this.timeCode--;
          if (this.timeCode == 0) {
            clearInterval(time);
            this.IsgetVerificationCode = true;
            $(".getVerificationCode").html("获取验证");
          } else {
            $(".getVerificationCode").html(this.timeCode + "秒");
          }
        }, 1000);


         //获取短息验证码
        var args = this.sign({
          userPhone:  this.phoneCode,
          btype: "3"
        });
        api.getphoneCode(args).then(res => {
          console.log(res);
          if (res.code == "20000") {
            if(res.data.success == false){
              this.$dialog.alert({
                message: res.message,
              });
            }else{
              this.uuid = res.data.uuids;
              this.Toast.success(res.message);
            }
          } else {
            this.Toast.fail(res.message);
          }
        });
      }
    },
    // 校验验证码
    verification() {
      var that = this;
      if (that.inputVerification == "" || that.inputVerification.length != 6) {
        this.Toast("验证码不正确");
      } else {
        var params = this.sign({
            phone: that.phoneCode, //必传 用户手机号码
            captcha: that.inputVerification, //必传 短信验证码
            uuid: that.uuid, // 	必传 传入随机生成uuid
            invitationCode: that.invitationCodeValue, // 邀请码代理人邀请即 邀请码
            topActivityCode: that.topActivityCode, // 渠道邀请码
        });
        api.agentInvitationToRegister(params).then(res=>{
          if(res.code == 20000){
            that.$dialog.alert({
              message: res.data.message,
            }).then(() => {
              that.$router.push('agentRegisterSuccess');
            });;
          }else{
            that.$dialog.alert({
              message: res.message,
            });
          }
        });
      }
    },
    // pdf在线预览
    showFile(event) {
      event.stopPropagation();
      layer.open({
        type: 1,
        title: "信息(点击“+”号放大查看条款)",
        area: ["100%", "100%"], //宽高
        content:
          "<iframe src='./static/pdf/web/viewer.html?file=zgbxjj_zcxy.pdf' style='width:100%;height:100%'></iframe>"
      });
    },
    //弹框js  link:确定之后跳转地址 text：提示文本 title：标题  btnText:按钮文字
    inspection(link, text, title, btnText) {
      this.MessagePopVal.routerLink = link;
      this.MessagePopVal.btnText = btnText;
      this.MessagePopVal.message = text;
      this.MessagePopVal.promptMessage = title;
      this.MessagePopShow = true;
    }
  }
};
</script>

<style lang="scss" scoped>
header img {
  width: 100%;
  display: block;
  height: 100%;
}

.session {
  div {
    img {
      width: 250px;
      display: block;
      margin: auto;
    }
  }
}

/* 信息弹框css */
.inspection {
  .title {
    text-align: center;
    padding: 50px 0px;
    img {
      width: 100px;
    }
    img,
    span {
      padding-left: 0;
      vertical-align: middle;
      display: inline-block;
      float: none;
    }
  }
  .msg {
    width: 80%;
    margin: 0 auto;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: black;
    line-height: 42px;
  }

  .reUplode {
    display: block;
    width: 75%;
    height: 80px;
    margin: 50px auto;
    background: rgba(249, 154, 49, 1);
    border-radius: 40px;
    text-align: center;
    line-height: 80px;
    color: #fff;
    font-size: 32px;
    text-decoration: none;
  }
}
/* 信息弹框css */

.register {
  background-color: white;
  padding: 60px 0;
}

.register > input {
  width: 80%;
  display: block;
  margin: auto;
  height: 88px;
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(221, 221, 221, 1);
  border-radius: 88px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 88px;
  text-indent: 1em;
}

.getMoney {
  width: 80%;
  height: 88px;
  background: rgba(249, 154, 49, 1);
  border-radius: 88px;
  color: #fff;
  border: 2px solid rgba(221, 221, 221, 1);
}

.register > button {
  width: 80%;
  display: block;
  margin: 40px auto 0;
}

.register > .label {
  width: 80%;
  margin: 20px auto 0;
}

.register > .label a {
  text-decoration: none;
  color: #008cff;
  display: inline;
  vertical-align: middle;
}

// 注册弹出框样式
.verificationCode {
  padding: 60px 40px 40px;
}

.verificationCode p {
  color: black;
  margin-bottom: 14px;
}

.verificationCode input {
  width: 65%;
  border-radius: 45px;
  height: 90px;
  border: solid 2px #eeeeee;
  text-indent: 1em;
}

.verificationCode button {
  width: 100%;
  height: 80px;
  border-radius: 40px;
  background-color: #f99a31;
  color: white;
  border: 0;
  margin-top: 20px;
}

.inputVerification {
  margin-top: 15px;
}

.getVerificationCode {
  width: 30%;
  font-size: 26px;
  margin-left: 15px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  background-color: rgb(238, 238, 238);
  color: black;
  border-radius: 45px;
  height: 90px;
  line-height: 90px;
}
// 注册弹出框样式
</style>
