<!-- 组件说明 -->
<template>
  <div class="GetSuccess">
    <van-nav-bar title="领取成功" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="box">
      <div class="SuccessLog">
        <img :src="iconSuccess" alt="领取成功" />
        <span>领取成功</span>
      </div>
      <div class="describe">
        <p>
          为了确保出单成功，保险经纪网的保险顾问将会与您联系并确认相关信息，具体领取结果及保单信息以短信消息为准，如有任何疑问，也可随时联系客服
          <span>400-693-8080</span>
        </p>
      </div>
      <div class="button">
        <router-link href="javascript:void(0)" to="/chat" class="service">
          <button>
            联系在线客服
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import iconSuccess from "@/assets/images/paymentSuccess/icon-success.png";
export default {
  name: "GetSuccess",
  components: {},
  data() {
    return {
      iconSuccess: iconSuccess
    };
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
.GetSuccess {
  .box {
    .SuccessLog {
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
  }
  .describe {
      p {
        font-size: 27px;
        color: #8f8f8f;
        margin: 60px 51px 53px;
        line-height: 36px;
        span {
          color: #e81919;
          font-size: 24px;
        }
      }
    }
    
  .button {
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
    a {
      color: white;
    }
  }
}
</style>