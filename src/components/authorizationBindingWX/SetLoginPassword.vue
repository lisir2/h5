<!-- 组件说明 微信手动授权未绑定账号，进行注册绑定设置密码-->
<template>
  <div class="SetLoginPassword">
    <van-nav-bar title="绑定已有的账号" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="remark">已有账号可进行第三方登录关联，下次可直接使用第三方快速登录</div>

    <div class>
      <div class="phoneIcon">
        <van-field
          placeholder="密码至少6位"
          :right-icon="userPasswordShow ? 'closed-eye' : 'eye-o'"
          @click-right-icon="userPasswordShow = !userPasswordShow"
          :type="userPasswordShow ? 'text' : 'password'"
          v-model="userPassword"
          :left-icon="mimaicon"
          clearable
        />
      </div>
      <div class="phoneIcon">
        <van-field
          placeholder="请再次输入密码"
          v-model="confirmPassword"
          :left-icon="mimaicon"
          :right-icon="confirmPasswordShow ? 'closed-eye' : 'eye-o'"
          @click-right-icon="confirmPasswordShow = !confirmPasswordShow"
          :type="confirmPasswordShow ? 'text' : 'password'"
          clearable
        />
        <van-button type="primary" round size="large" @click="SetLoginPassword">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/fetch/api";
export default {
  name: "SetLoginPassword",
  components: {},
  data() {
    return {
      userPassword: "",
      confirmPassword: "",
      mimaicon: require("@/assets/images/login/mimaicon.png"),
      userPasswordShow: false,
      confirmPasswordShow: false,
      phoneCode: this.getQueryString("phoneCode"),
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
    SetLoginPassword() {
      if (this.userPassword == "") {
        this.Toast("请输入密码");
      } else if (this.confirmPassword == "") {
        this.Toast("请输入确认密码");
      } else {
        var params = this.sign({
          userPhone: this.phoneCode,
          userPassword: this.userPassword,
          confirmPassword: this.confirmPassword,
          openId: this.getCookie("wxopenId")
        });
        //注册账号绑定微信
        api.weChatBindingUnregisteredPhone(params).then(res => {
          if (res.code == 20000) {
            this.Toast.success(res.message);
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
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.SetLoginPassword {
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