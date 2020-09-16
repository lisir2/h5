<!-- 组件说明 -->
<template>
  <div class="Report">
    <van-nav-bar title="举报投诉" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="tipText">
      <div class>本文来源于网络，不代表保险经纪网立场</div>
      <div class>如内容有不规范或涉及违规，请立即举报/报错</div>
    </div>
    <router-link class="inputItem" :to="{path:'ReportInput',query:{type: encodeURIComponent('内容格式有错误'),id:getQueryString('id'),title:getQueryString('title'),readingQuantity:getQueryString('readingQuantity')}}">
      <div class="left">内容格式有错误</div>
      <div class="right"></div>
    </router-link>
    <router-link class="inputItem" :to="{path:'ReportInput',query:{type: encodeURIComponent('含色情内容'),id:getQueryString('id'),title:getQueryString('title'),readingQuantity:getQueryString('readingQuantity')}}">
      <div class="left">含色情内容</div>
      <div class="right"></div>
    </router-link>
    <router-link class="inputItem" :to="{path:'ReportInput',query:{type: encodeURIComponent('含政治敏感信息'),id:getQueryString('id'),title:getQueryString('title'),readingQuantity:getQueryString('readingQuantity')}}">
      <div class="left">含政治敏感信息</div>
      <div class="right"></div>
    </router-link>
    <router-link class="inputItem" :to="{path:'ReportInput',query:{type: encodeURIComponent('侵权'),id:getQueryString('id'),title:getQueryString('title'),readingQuantity:getQueryString('readingQuantity')}}">
      <div class="left">侵权</div>
      <div class="right"></div>
    </router-link>
    <router-link class="inputItem" :to="{path:'ReportInput',query:{type: encodeURIComponent('其他'),id:getQueryString('id'),title:getQueryString('title'),readingQuantity:getQueryString('readingQuantity')}}">
      <div class="left">其他</div>
      <div class="right"></div>
    </router-link>
  </div>
</template>

<script>
//import x from ''
export default {
  name: "Report",
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
.Report {
  .tipText {
    text-align: center;
    color: #f31818;
    font-size: 24px;
    height: 120px;
    line-height: 36px;
    padding-top: 26px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e8e6e6;
  }

  .inputItem {
    padding: 0rem 30px;
    height: 110px;
    line-height: 110px;
    font-size: 30px;
    border-bottom: 1px solid #e8e6e6;
    color: #302d2d;
    position: relative;
    display: block;
    img {
      width: 100px;
      height: 100px;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .right:after {
      position: absolute;
      right: 40px;
      top: 50%;
      display: inline-block;
      content: "";
      width: 20px;
      height: 20px;
      border: solid #cecece;
      border-width: 1px 1px 0 0;
      -webkit-transform: translate(0, -50%) rotate(45deg);
      transform: translate(0, -50%) rotate(45deg);
    }
  }
}
</style>