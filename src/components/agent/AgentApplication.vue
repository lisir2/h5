<!-- 组件说明 -->
<template>
  <div class="AgentApplication">
    <van-nav-bar title="代理人申请" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="examinationResult">
      <img :src="success" alt />
      <span style="margin-left:10px;font-weight: 550;font-size: 16px;">提交成功</span>
    </div>
    <p>
      恭喜您，代理人申请信息提交成功。审核人员将在1~3个工作日内完成资料审核。
      <br />
      <span style="color: red;">审核期间，推广产品，您将无法获得佣金。</span>
      <br />审核结果将会以微信形式通知,请注意查收。
      <br />如有疑问您可拨打客服热线400-693-8080，我们将竭诚为您服务。
    </p>
    <button class="submit" @click="$router.push('/agent')">返回</button>
    <div class="QRcode">
      <p>微信公众号：保险经纪网</p>
      <img :src="QRcode" alt />
      <p>扫描关注微信 及时掌握审核结果</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AgentApplication",
  components: {},
  data() {
    return {
      success: require("@/assets/images/agent/success.jpg"),
      QRcode: require("@/assets/images/agent/QRcode.jpg"),
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
.AgentApplication {
  & > p {
    padding: 60px 60px 40px;
    font-weight: 600;
    font-size: 28px;
    color: #8f8f94;
  }
  .grade {
    font-weight: bold;
    color: black;
    font-size: 30px;
  }

  .examinationResult {
    text-align: center;
    padding: 0 20px;
    padding-top: 140px;
  }
  .examinationResult > img {
    width: 100px;
    vertical-align: middle;
  }
  .QRcode {
    text-align: center;
  }
  .QRcode img {
    width: 380px;
  }
  .QRcode p {
    margin-bottom: 0;
    font-size: 30px;
    color: #8f8f94;
  }
  .submit {
    width: 90%;
    display: block;
    margin: auto;
    background-color: #f99a31;
    border: 0;
    color: white;
    margin: 30px auto 40px;
    height: 80px;
    border-radius: 40px;
  }
}
</style>