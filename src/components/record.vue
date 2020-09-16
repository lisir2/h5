<!-- 组件说明 -->
<template>
    <div class="content">
        <van-nav-bar title="保单管理" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="queryResults">
            <ul>
            <li>
                <span>产品名称</span>
                <span>平安畅游九州意外险</span>
            </li>
            <li>
                <span>保单号</span>
                <span>S12312354756867634</span>
            </li>
            <li>
                <span>投保时间</span>
                <span>2019-07-05 09:30:30</span>
            </li>
            <li>
                <span>起保时间</span>
                <span>2019-07-05</span>
            </li>
            <li>
                <span>失效时间</span>
                <span>2019-07-05</span>
            </li>
            <li>
                <span>投保人</span>
                <span>张杰</span>
            </li>
            <li>
                <span>被保险人</span>
                <span>黄菊</span>
            </li>
            <li>
                <span>证件号</span>
                <span>30563216798465153</span>
            </li>
            </ul>
            <ul>
            <li>
                <span>产品名称</span>
                <span>平安畅游九州意外险</span>
            </li>
            <li>
                <span>保单号</span>
                <span>S12312354756867634</span>
            </li>
            <li>
                <span>投保时间</span>
                <span>2019-07-05 09:30:30</span>
            </li>
            <li>
                <span>起保时间</span>
                <span>2019-07-05</span>
            </li>
            <li>
                <span>失效时间</span>
                <span>2019-07-05</span>
            </li>
            <li>
                <span>投保人</span>
                <span>张杰</span>
            </li>
            <li>
                <span>被保险人</span>
                <span>黄菊</span>
            </li>
            <li>
                <span>证件号</span>
                <span>30563216798465153</span>
            </li>
            </ul>
        </div>
    </div>
  
</template>

<script>
export default {
  name: "record",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
      onClickLeft(){
        this.$router.go(-1);   
      },
  }
};
</script>

<style lang="scss" scoped>
.queryResults {
  ul {
    border-top: 2px solid #ddd;
    li:nth-child(1) {
      background-color: #f7f7f7;
      font-weight: bold;
      span:nth-child(1) {
        font-weight: bold;
        color: #0c0c0c;
      }
      span:nth-child(2) {
        font-weight: bold;
        color: #333333;
        font-size: 28px;
      }
    }
    li {
      height: 83px;
      line-height: 83px;
      span:nth-child(1) {
        margin-left: 30px;
        width: 120px;
        display: inline-block;
      }
      span:nth-child(2) {
        margin-left: 100px;
        display: inline-block;
      }
    }
  }
}
</style>