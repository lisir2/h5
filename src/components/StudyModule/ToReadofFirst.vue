<!-- 组件说明 -->
<template>
  <div class="ToReadofFirst">
    <van-nav-bar title="进入公众号继续阅读" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="container">
      <div class="topContainer">
        <div class="bigTitle">进入微信公众号继续阅读</div>
        <div class="title">公众号：保险经纪网</div>
        <img src="../../assets/images/others/bxjjw.png" alt />
      </div>
      <div data-clipboard-text="保险经纪网" class="copy" @click="linkCopy">{{copyBtnText}}</div>
      <img src="../../assets/images/StudyModule/line.png" alt class="lineImg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ToReadofFirst",
  components: {},
  data() {
    return {
        copyBtnText:'一键复制',
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    linkCopy(){
      var that = this;
      var clipboard = new this.clipboard('.copy');
      clipboard.on('success', function (e) {
        that.Toast("复制成功");
        that.copyBtnText = '复制成功，打开微信搜索';
      });
      clipboard.on('error', function (e) {
        that.Toast("复制失败");
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.ToReadofFirst {
  .container {
    padding: 40px 0;
    text-align: center;
    .topContainer {
      text-align: center;
      .bigTitle {
        margin-top: 92px;
        font-size: 36px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 80px;
      }
      .title {
        font-size: 28px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
      }
      img {
        width: 320px;
      }
    }
    .copy,
    .copySuccess {
      width: 600px;
      height: 88px;
      background: rgba(249, 154, 49, 1);
      border-radius: 44px;
      margin: 74px auto 0;
      font-size: 32px;
      color: rgba(255, 255, 255, 1);
      line-height: 88px;
      text-align: center;
    }
    .lineImg {
      width: 600px;
      margin-top: 60px;
    }
  }
}
</style>