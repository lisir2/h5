<!-- 组件说明 重置成功页面 -->
<template>
  <div class="resetSuccess">
    <van-nav-bar title="重置成功" left-arrow @click-left="onClickLeft">
      <!-- <van-icon name="share" slot="right" /> -->
    </van-nav-bar>
    <div class="logoSuccess">
      <img :src="logo" alt />
      <span>密码重置成功</span>
    </div>
    <van-button type="primary" round size="large" @click="loginRegister">去登录</van-button>
    <!-- <p>密码登录</p> -->
    <p class="kefuNumber">如有疑问请致电客服热线：400-693-8080</p>
  </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      logo: require("@/assets/images/login/logosuccess.png")
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    loginRegister() {
      this.$router.push({
        path: "/loginRegister",
        query: {
          routerLink: this.getQueryString('routerLink'),
          routerQuery: this.getQueryString('routerQuery'),
        }
      });
    }
  }
};
</script>

<style lang="scss">
body {
  background: #fff;
}
.resetSuccess {
  text-align: center;
  .logoSuccess {
    margin: 110px 276px;
    text-align: center;
    img {
      width: 116px;
      height: 116px;
      display: block;
      margin: auto;
    }
    span {
      font-size: 32px;
      display: block;
      margin-top: 37px;
      font-weight: 500;
    }
  }
  .van-button--large {
    width: 618px;
    height: 88px;
    line-height: 88px;
    margin: 30px 0;
  }
  .van-button--primary {
    background: #f99a31;
    border: 0;
  }
  .kefuNumber {
    text-align: center;
    width: 100%;
    font-size: 24px;
    color: #8f8a8a;
  }
}
</style>