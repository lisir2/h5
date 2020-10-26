<!-- 组件说明 公用弹出登录组件 -->
<template>
  <div class="PopUpLogin">
    <div class="loginTitle">
      <img src="@/assets/images/loginTitle.png" alt />
    </div>
    <div class="loginMethod">
      <van-tabs v-model="activeName" color="#ffffff00" title-active-color="#F99A31">
        <van-tab title="密码登录" name="0">
          <div class="phoneIcon">
            <van-field placeholder="请输入手机号码" v-model="phoneCode" :left-icon="phone" clearable />
          </div>
          <div class="phoneIcon">
            <van-field
              placeholder="请输入密码"
              v-model="passWordtext"
              :left-icon="mimaicon"
              type="password"
              clearable
            />
            <p>
              <a href="javascript:;" @click="register" class="register">免费注册</a>
              <a href="javascript:;" @click="forgetPassword" class="forgetPassword">忘记密码</a>
            </p>
            <van-button type="primary" round size="large" @click="pwdLogin">登录</van-button>
          </div>
        </van-tab>
        <van-tab title="短信登录" name="1">
          <div class="phoneIcon">
            <van-field placeholder="请输入手机号码" v-model="phoneCode" :left-icon="phone" clearable />
          </div>
          <div class="phoneIcon">
            <van-field
              v-model="verificationCode"
              center
              clearable
              maxlength="6"
              :left-icon="yzmicon"
              placeholder="请输入短信验证码"
            >
              <template #button>
                <van-button
                  size="small"
                  type="primary"
                  v-bind:disabled="sendAuthCode"
                  :style="{background: '#f99a31',border:0,borderRadius:'20px',height:'27px'}"
                  @click="sendAuthCode ? '' : getCode()"
                >{{auth_time}}</van-button>
              </template>
            </van-field>
            <van-button
              type="primary"
              round
              size="large"
              color="#f99a31"
              @click="verificationCodeLogin"
            >登录</van-button>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import api from "@/fetch/api";
import md5 from "js-md5";
export default {
  components: {},
  data() {
    return {
      activeName: "0",
      mimaicon: require("@/assets/images/login/mimaicon.png"),
      phone: require("@/assets/images/login/mobile.png"),
      yzmicon: require("@/assets/images/login/yzmicon.png"),
      phoneCode: "", // 手机号码
      passWordtext: "", // 密码
      verificationCode: "", //验证码
      sendAuthCode: false, //是否可以获取验证码
      auth_time: "获取验证码", // 验证码倒计时按钮内容
      uuids: "" //验证码uuid
    };
  },
  computed: {},
  props: {
    // 登录成功回调
    LoginSuccess: {
      type: Function
    },
    // 忘记密码路由 参数
    forgetPasswordParams: {
      type: Object
    },
    // 注册账号参数
    registerParams: {
      type: Object
    }
  },
  // productId: this.goodId,
  // activityCode: this.activityCode,
  // invitationCode: this.invitationCode,
  // topActivityCode: this.topActivityCode,
  // shareMid: this.shareMid
  methods: {
    //   密码登录
    pwdLogin() {
      if (this.phoneCode == "") {
        this.Toast.fail("请输入手机号码");
      } else if (!this.Utils.isPhoneNumber(this.phoneCode)) {
        this.Toast.fail("请输入正确的手机号码");
      } else if (this.passWordtext == "") {
        this.Toast.fail("请输入密码");
      } else {
        var args = this.sign({
          userPhone: this.phoneCode,
          userPassword: md5(this.passWordtext),
          openId: this.getCookie("wxopenId")
        });

        api.getLogin(args).then(res => {
          if (res.code == "20006") {
            this.Toast.fail(res.message);
          } else if (res.code == "20000") {
            this.Toast.success(res.message);
            this.setCookie("openId", res.data.openId, 30);
            // 登录成功回调
            if (this.LoginSuccess) {
              this.LoginSuccess();
            }
          }
        });
      }
    },
    // 获取验证码
    getCode() {
      if (this.phoneCode == "") {
        this.Toast.fail("请输入手机号码");
      } else if (!this.Utils.isPhoneNumber(this.phoneCode)) {
        this.Toast.fail("请输入正确的手机号码");
      } else {
        // 判断是否注册
        var params = this.sign({
          userPhone: this.phoneCode,
          userPassword: "",
          openId: this.getCookie("wxopenId")
        });
        api.getLogin(params).then(res => {
          if (res.code == 20002) {
            this.Toast.fail(res.message);
          } else {
            // 短信倒计时
            this.sendAuthCode = true;
            this.auth_time = 60;
            var auth_timetimer = setInterval(() => {
              this.auth_time--;
              if (this.auth_time <= 0) {
                this.sendAuthCode = false;
                clearInterval(auth_timetimer);
                this.auth_time = "获取验证码";
              }
            }, 1000);

            //获取短信验证码
            var args = this.sign({
              userPhone: this.phoneCode,
              btype: 3
            });
            api.getphoneCode(args).then(res => {
              if (res.code == "20000") {
                this.uuids = res.data.uuids;
                this.Toast.success(res.message);
              } else {
                this.Toast.fail(res.message);
              }
            });
          }
        });
      }
    },
    //   验证码登录
    verificationCodeLogin() {
      if (this.phoneCode == "") {
        this.Toast.fail("请输入手机号码");
      } else if (!this.Utils.isPhoneNumber(this.phoneCode)) {
        this.Toast.fail("请输入正确的手机号码");
      } else if (this.verificationCode == "") {
        this.Toast.fail("请输入验证码");
      } else {
        var args = this.sign({
          userPhone: this.phoneCode, // 手机号码
          messageCode: this.verificationCode, // 短信验证码
          uuid: this.uuids // 识别码
        });
        api.quickLogin(args).then(res => {
          console.log(res);
          if (res.code == "20000") {
            this.Toast.success("登录成功!");
            this.setCookie("openId", res.data.openId, 30);
            // 登录成功回调
            if (this.LoginSuccess) {
              this.LoginSuccess();
            }
          } else {
            this.Toast.fail(res.message);
          }
        });
      }
    },
    // 忘记密码
    forgetPassword() {
      if (this.phoneCode == "") {
        this.Toast.fail("请输入手机号码");
      } else if (!this.Utils.isPhoneNumber(this.phoneCode)) {
        this.Toast.fail("请输入正确的手机号码");
      } else {
        this.$router.push({
          path: "forgetWord",
          query: {
            phone: this.phoneCode,
            routerLink: this.forgetPasswordParams.routerLink,
            routerQuery: JSON.stringify(this.forgetPasswordParams.routerQuery)
          }
        });
      }
    },
    // 免费注册
    register() {
      let that = this;
      // 带路由参数
      if (this.registerParams) {
        this.$router.push({
          path: "loginRegister",
          query: {
            routerLink: that.registerParams.routerLink,
            routerQuery: JSON.stringify(that.registerParams.routerQuery)
          }
        });
      } else {
        this.$router.push({ path: "loginRegister" });
      }
    }
  }
};
</script>

<style lang="scss">
.PopUpLogin {
  padding: 0 20px 30px;
  .loginTitle {
    img {
      height: 80px;
      display: block;
      margin: -24px auto 0;
      width: auto;
    }
  }
  .loginMethod {
    margin-top: 40px;
    .van-tabs {
      position: relative;
      .van-tab:nth-of-type(2):before {
        display: block;
        content: "";
        height: 40px;
        width: 2px;
        background-color: #999999;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
  .van-icon {
    line-height: initial!important;
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0;
  }
  .phoneIcon {
    width: 90%;
    margin: auto;
    margin-top: 20px;
    .van-cell {
      border: 2px solid rgba(221, 221, 221, 1);
      border-radius: 50px;
      padding: 18px 32px;
    }
    .van-icon__image {
      width: 34px;
      height: 34px;
    }
    .register {
      margin-top: 20px;
      color: #008cff;
      float: left;
      font-size: 26px;
    }
    .forgetPassword {
      margin-top: 20px;
      color: #008cff;
      float: right;
      font-size: 26px;
    }
    & > .van-button--primary {
      background: #f99a31;
      border: 0;
      margin-top: 40px;
      height: 85px;
      line-height: 85px;
    }
  }
}
</style>