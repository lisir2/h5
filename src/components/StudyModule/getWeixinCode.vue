<!-- 组件说明 ：获取微信二维码-->
<template>
  <div class="getWeixinCode">
    <van-nav-bar title="获取微信二维码" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="container">
      <div class="title">1、打开微信-进入“我”的界面</div>
      <img src="@/assets/images/StudyModule/weixin001.png" alt width="100%" />
      <div class="title">2、打开微信-个人信息</div>
      <img src="@/assets/images/StudyModule/weixin002.png" alt width="100%" />
      <div class="title">3、点击我的二维码界面中的“……”</div>
      <img src="@/assets/images/StudyModule/weixin003.png" alt width="100%" />
    </div>
  </div>
</template>

<script>
export default {
  name: "getWeixinCode",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.getWeixinCode {
  .title {
    height: 100px;
    line-height: 100px;
    font-size: 28px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    padding: 0 30px;
  }
}
</style>