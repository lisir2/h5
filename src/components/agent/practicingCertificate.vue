<!-- 组件说明: 代理人执业证 -->
<template>
  <div class="practicingCertificate">
    <van-nav-bar title="从业人员执业证" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="bgcBlock"></div>
    <van-cell-group v-if="userInfo != ''">
      <van-field label="姓名" :value="userInfo.agentInfo.agentName" readonly />
      <van-field label="性别" :value="userInfo.agentInfo.identityCode ? (userInfo.agentInfo.identityCode.substr(userInfo.agentInfo.identityCode.length - 2,1) % 2 == 0 ? '女' : '男') : ''" readonly />
      <van-field label="证件号码" :value="userInfo.agentInfo.identityCode" readonly />
      <van-field label="手机号码" :value="userInfo.account" readonly />
      <van-field label="执业证名称" :value="userInfo.agentInfo.practiceName" readonly />
      <van-field label="执业证编号" :value="userInfo.agentInfo.practiceNo" readonly />
      <van-field label="所属公司" :value="userInfo.agentInfo.affiliatedCompany" readonly />
      <van-field label="执业区域" :value="userInfo.agentInfo.practiceArea" readonly />
      <van-field label="证件有效期" :value="userInfo.agentInfo.indentityEffectTime" readonly />
      <van-field rows="1" autosize label="业务范围" :value="userInfo.agentInfo.businessScope" type="textarea" readonly />
    </van-cell-group>
    <div class="bgcBlock"></div>
    <div class="warmPrompt">
        <p style="margin-bottom:10px;">温馨提示：</p>
        <p>1、证书查询网址：<a href="http://iir.circ.gov.cn/model/zxgg/index/">http://iir.circ.gov.cn/model/zxgg/index/</a></p>
        <p>2、公司投诉电话：<a href="tel:+0571-88290972">0571-88290972</a></p>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  name: "practicingCertificate",
  components: {},
  data() {
    return {
        userInfo:"",
    };
  },
  computed: {},
  mounted(){
      var args = this.sign({userId:this.getCookie('ZB_JUSER_Mid')});
      // this.$axios.post('/arg/openapi/h5/personalCenter/queryPersonalInfo',args).then(res=>{
      api.queryPersonalInfo(args).then(res=>{
        if(res.code == 20000){
          this.userInfo = res.data;
        }
      })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.practicingCertificate {
  .bgcBlock {
    height: 20px;
    background: rgba(247, 247, 247, 1);
  }
  .warmPrompt{
      padding: 40px 30px 0;
      color: #8f8f8f;
      font-size: 25px;
      a{
        color: #8f8f8f;
      }
  }
}
</style>