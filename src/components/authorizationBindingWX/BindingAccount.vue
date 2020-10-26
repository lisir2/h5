<!-- 组件说明:微信手动授权未绑定账号，进行绑定已有的账号 -->
<template>
  <div class="BindingAccount">
    <van-nav-bar title="绑定已有的账号" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="remark">已有账号可进行第三方登录关联，下次可直接使用第三方快速登录</div>

    <div class>
      <div class="phoneIcon">
        <van-field
          placeholder="请输入手机号码"
          v-model="phoneCode"
          type="tel"
          maxlength="11"
          :left-icon="phone"
          clearable
        />
      </div>
      <div class="phoneIcon">
        <van-field
          placeholder="请输入密码"
          v-model="passWordtext"
          :left-icon="mimaicon"
          :right-icon="passwordShow ? 'closed-eye' : 'eye-o'"
          @click-right-icon="passwordShow = !passwordShow"
          :type="passwordShow ? 'text' : 'password'"
          clearable
        />
        <p>
          <a href="javascript:;" @click="forgetPassword" class="forgetPassword">忘记密码</a>
        </p>
        <van-button type="primary" round size="large" @click="AssociateAndLogin">关联账号并登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/fetch/api";
import md5 from "js-md5";
export default {
  name: "BindingAccount",
  components: {},
  data() {
    return {
      phoneCode: "",
      passWordtext: "",
      phone: require("@/assets/images/login/mobile.png"),
      mimaicon: require("@/assets/images/login/mimaicon.png"),
      passwordShow: false,
      productId: this.getQueryString("productId"),
      activityCode: this.getQueryString("activityCode"),
      invitationCode: this.getQueryString("invitationCode"),
      topActivityCode: this.getQueryString("topActivityCode"),
      shareMid: this.getQueryString("shareMid")
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
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
            routerLink: "productdetail",
            routerQuery: JSON.stringify({productId:this.productId})
          }
        });
      }
    },
    // 关联并登陆
    AssociateAndLogin() {
      if (this.phoneCode == "") {
        this.Toast.fail("请输入手机号码");
      } else if (!this.Utils.isPhoneNumber(this.phoneCode)) {
        this.Toast.fail("请输入正确的手机号码");
      } else if(this.passWordtext == ""){
          this.Toast.fail("请输入登陆密码");
      } else {
        var params = this.sign({
          userPhone: this.phoneCode,
          userPassword: md5(this.passWordtext),
          openId: this.getCookie("wxopenId")
        });
        api.weChatBindingPhone(params).then(res => {
            if(res.code == 20000){
                this.Toast.success(res.message);
                this.$router.push({path:'productdetail',query:{ productId: this.productId,activityCode: this.activityCode, invitationCode: this.invitationCode,topActivityCode: this.topActivityCode,shareMid: this.shareMid}});
            }else{
                this.Toast(res.message);
            }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.BindingAccount {
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
}
</style>