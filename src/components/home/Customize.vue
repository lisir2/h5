<!-- 私人定制 -->
<template>
  <div class="content">
    <van-nav-bar title="私人定制" left-arrow @click-left="onClickLeft" />
    <!--开始定制保险-->
    <div class="startOrder">
      <div style="overflow: hidden;">
        <img src="@/assets/images/Customize/headerImg.png" alt />
        <span>您好，我是小爱，保险经纪网的智能顾问，我可以帮您定制家庭方案，进行疾病核保推荐，还可以管理家庭保单哦，快来试试吧！</span>
      </div>
      <div class="orderBanner" @click="toCustomize"></div>
    </div>
  </div>
</template>

<script>
//import x from ''
import api from "@/fetch/api";
export default {
  name: "Customize",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClickLeft() {
      // window.history.back(-1);
      this.$router.push('/')
    },
    // 定制产品
    toCustomize() {
      var args = this.sign({openId:this.getCookie('openId'),mId:this.getCookie('ZB_JUSER_Mid')});
      if(this.getQueryString('anew')){
        this.$router.push("/CustomizeMessage");
      }else{
        // this.$axios.post('/brg/openapi/h5/personalCenter/getZnCustomerPlan',args).then(res=>{
        // 获取用户回答问题
        api.getZnCustomerPlan(args).then(res=>{
          var response = res;
          if(response.code == 20000){  //已回答问题
            this.$router.push("/PersonalTailor");
          }else if(response.code == 20001 && response.isAnswer == 1){  //用户未答题
            this.$router.push("/CustomizeMessage");
          }else{
            this.Toast(response.message)
          }
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/*定制开始及方案生成*/
.startOrder {
  span {
    display: inline-block;
    float: left;
    width: 550px;
    background: rgb(91, 138, 255);
    margin-left: 10px;
    color: #fff;
    font-size: 28px;
    border-radius: 0 20px 20px 20px;
    margin-top: 40px;
    height: 200px;
    padding: 20px;
  }
  div img {
    width: 90px;
    height: 90px;
    float: left;
    margin: 30px;
    margin-top: 40px;
  }
  .orderBanner {
    margin: 30px;
    background: url("../../assets/images/Customize/order_banner2.png") no-repeat;
    background-size: 100%;
    height: 300px;
    margin-top: 40px;
  }
}
</style>