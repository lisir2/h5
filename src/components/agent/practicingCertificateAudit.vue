<!-- 组件说明: 执业证审核中 -->
<template>
  <div class="practicingCertificateAudit">
    <van-nav-bar title="审核中" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="examinationResult">
      <img :src="success" alt />
      <span style="margin-left:10px;font-weight: 550;font-size: 16px;">认证正在审核中</span>
    </div>

    <p>我们将会在3个工作日内完成审核，请您耐心等待审核结果。本平台承诺对您提供的认证信息进行严格保密。 </p>

    <div class="QRcode">
      <p>关注公众号 <br> 可随时查询审核结果</p>
      <img :src="QRcode" alt />
      <p>扫描关注微信 及时掌握审核结果</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      success: require("@/assets/images/agent/success.jpg"),
      QRcode: require("@/assets/images/agent/QRcode.jpg")
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
.practicingCertificateAudit {
  & > p {
    padding: 100px 60px 40px;
    font-weight: 400;
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
    padding-top: 100px;
  }
  .examinationResult > img {
    width: 100px;
    vertical-align: middle;
  }
  .QRcode {
    text-align: center;
    margin-top: 50px;
  }
  .QRcode img {
    width: 380px;
  }
  .QRcode p {
    margin-bottom: 0;
    font-size: 28px;
    color: #333333;
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