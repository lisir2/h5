<!-- 组件说明 微信手动授权未绑定账号，进行绑定手机号-->
<template>
  <div class="BindingPhone">
    <van-nav-bar title="绑定手机号" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="remark">为了您的账户安全，请先绑定手机号</div>

    <div class>
      <div class="phoneIcon">
        <van-field
          placeholder="请输入手机号码"
          type="tel"
          v-model="phoneCode"
          maxlength="11"
          :left-icon="phone"
          clearable
        />
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
        <van-checkbox v-model="checked" style="margin: 0.4rem 0.2rem 0">
          我已阅读并同意
          <span
            style="color: rgb(0, 140, 255);"
            @click="$showPDF('../pdfFile/zgbxjj_zcxy.pdf')"
          >《保险经纪网协议》</span>
        </van-checkbox>
        <van-button type="primary" round size="large" @click="BindAndLogin">绑定账号</van-button>
        <router-link
          class="BindExistingAccoun"
          :to="{path:'BindingAccount',query: { productId: this.productId,activityCode: this.activityCode, invitationCode: this.invitationCode,topActivityCode: this.topActivityCode,shareMid: this.shareMid}}"
        >绑定已有的账号</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/fetch/api";
export default {
  name: "BindingPhone",
  components: {},
  data() {
    return {
      checked: false,
      phoneCode: "",
      verificationCode: "", //验证码
      sendAuthCode: false,
      productId: this.getQueryString("productId"),
      auth_time: "获取验证码",
      phone: require("@/assets/images/login/mobile.png"),
      yzmicon: require("@/assets/images/login/yzmicon.png"),
      activityCode: this.getQueryString("activityCode"),
      invitationCode: this.getQueryString("invitationCode"),
      topActivityCode: this.getQueryString("topActivityCode"),
      shareMid: this.getQueryString("shareMid"),
      uuids: "",
      registerState: "", // 3的时候为注册状态；4的时候为未注册状态
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.replace({
        path: "productdetail",
        query: {
          productId: this.productId,
          activityCode: this.activityCode,
          invitationCode: this.invitationCode,
          topActivityCode: this.topActivityCode,
          shareMid: this.shareMid
        }
      });
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
            routerLink: "BindingPhone"
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
            this.registerState = res.data.registerState;
            this.Toast.success(res.message);
          } else {
            this.Toast.fail(res.message);
          }
        });
      }
    },
    // 验证码登录
    checkPhoneCode() {
      if (this.verificationCode == "") {
        this.Toast("请输入验证码");
      } else {
        var args = this.sign({
          userPhone: this.phoneCode, // 手机号码
          messageCode: this.verificationCode, // 短信验证码
          uuid: this.uuids, // 识别码
          openId: this.getCookie("wxopenId")
        });
        api.quickLogin(args).then(res => {
          if (res.code == "20000") {
            this.Toast.success("登录成功!");
            this.setCookie("openId", res.data.openId, 30);
            this.$router.replace({
              path: "productdetail",
              query: {
                productId: this.productId,
                activityCode: this.activityCode,
                invitationCode: this.invitationCode,
                topActivityCode: this.topActivityCode,
                shareMid: this.shareMid
              }
            });
          } else {
            Toast.fail(res.message);
          }
        });
      }
    },
    // 绑定并登陆
    BindAndLogin() {
      if(this.checked == false){
        this.Toast('请同意以下协议');
      } else if (this.registerState == 4) {
        this.$router.push({
          path: "/SetLoginPassword",
          query: {
            phonecode: this.phoneCode,
            productId: this.productId,
            activityCode: this.activityCode,
            invitationCode: this.invitationCode,
            topActivityCode: this.topActivityCode,
            shareMid: this.shareMid
          }
        });
      } else {
        this.checkPhoneCode();
      }
    }
  }
};
</script>

<style lang="scss">
.BindingPhone {
  .remark {
    padding: 30px 20px;
    background: #f7f7f7;
  }
  .van-icon {
    line-height: initial !important;
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
  .BindExistingAccoun {
    text-align: center;
    display: block;
    padding: 20px 0;
  }
}
</style>