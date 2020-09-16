<!-- 组件说明:支付成功回调页面 -->
<template>
  <div class="content">
    <van-nav-bar title="支付成功"></van-nav-bar>
    <div class="box">
      <div>
        <img :src="iconSuccess" alt="支付成功" />
        <span>支付成功</span>
        <!-- <p>订单号：544654564646</p> -->
        <p>恭喜您成功投保</p>
      </div>
      <div>
        <p>
          恭喜您成功投保，稍后您的手机（尾号8851）将会受到保单信息，电子保单将会发送到邮箱15958298851@139.com中，请注意查收。若您没收到电子保单，
          <span>可以联系客服 400-693-8080</span>或在我的-
          <span>个险保单里</span>查看。
        </p>
      </div>
      <div class="button">
          <router-link to="/mine"><button>查看详情</button></router-link>
      </div>
      <p style="text-align:center;color:#8F8A8A;">{{time}}秒后后自动跳转到我的页面</p>
      <div>
        <div>
          <img :src="ewm" alt />
        </div>
        <div>
          <p>关注微信公众号可随时查看保单提供理赔服务</p>
          <button><a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIzMTE2ODQ4NA==&scene=124#wechat_redirect">关注公众号</a></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ewm from "../../assets/images/paymentSuccess/ewm.png";
import iconSuccess from "../../assets/images/paymentSuccess/icon-success.png";
export default {
  name: "paymentSuccess",
  components: {},
  data() {
    return {
      iconSuccess: iconSuccess,
      ewm: ewm,
      time:5,
      timeInterval:'',
    };
  },
  computed: {},
  mounted(){
    var that = this;
    that.timeInterval = setInterval(() => {
        this.time--;
        if(this.time == 0){
            this.$router.push('/mine');
            clearInterval(that.timeInterval);
        }
    }, 1000);
  },
  // 销毁前清楚计时器
  beforeDestroy(){
    clearInterval(this.timeInterval);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.content {
  .box {
    & > div:nth-of-type(1) {
      margin-top: 50px;
      width: 100%;
      text-align: center;
      img {
        display: inline-block;
        width: 116px;
        height: 116px;
      }
      span {
        text-align: center;
        font-size: 18px;
        color: #0c0c0c;
        font-weight: bold;
        line-height: 1.7rem;
        display: inline-block;
        margin-left: 15px;
        font-size: 32px;
      }
      & > p:nth-of-type(1) {
        color: #333333;
        margin-top: 58px;
        font-size: 26px;
      }
      & > p:nth-of-type(2) {
        color: #333333;
        margin-top: 25px;
        font-size: 30px;
      }
    }
    & > div:nth-of-type(2) {
      p {
        font-size: 14px;
        color: #8f8f8f;
        margin: 60px 51px 53px;
        font-size: 24px;
        line-height: 36px;
        span {
          color: #e81919;
          font-size: 24px;
        }
      }
    }
    & > div:nth-of-type(4) {
      display: flex;
      margin: 20px 51px;
      div {
        width: 50%;
        p{
            line-height: 60px;
            margin: 40px 0;
            color: #333333;
        }
        img{
            width: 327px;
            height: 327px;
            display:inline-block
        }
        button{
            width: 200px;
            height: 60px;
            border: solid 2px #008CFF;
            border-radius: 8px;
            background-color: white;
            color: #008CFF;
            display: block;
            margin: auto;
            a{
                color: #008CFF;
            }
        }
      }
    }
    .button{
        margin: 0 51px;
        button {
            width: 100%;
            margin: 0 50px;
            height: 90px;
            background-color: rgb(255, 155, 69);
            color: white;
            border-radius: 45px;
            display: block;
            margin: 30px auto;
            font-size: 30px;
        }
        a{
          color: white;
        }
    }
    
  }
}
</style>