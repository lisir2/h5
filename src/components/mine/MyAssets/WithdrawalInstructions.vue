<!-- 组件说明 明细说明-->
<template>
  <div class="WithdrawalInstructions">
    <van-nav-bar title="提现说明" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="textContent">
      <p class="weight">一、提现规则说明</p>
      <p>打款说明:每月20日（含）前提交的提现申请，当月25日进行打款，每月21号之后提交的提现申请，次月25日进行打款，如有节假日顺延。</p>
    </div>
    <div class="textContent">
      <p class="weight">二、提现账户完善</p>
      <p>目前提现只支持银行卡。</p>
      <p>收款人姓名、身份证提交后不可更换，为了保障您的账户安全，如需修改请联系客服400-693-8080。</p>
    </div>
    <div class="textContent">
      <p class="weight">三、提现到账时间</p>
      <p>每月10日之前提交的提现金额，于隔月25日前到账。</p>
    </div>
    <div class="textContent">
      <p class="weight">四、如何代扣税</p>
      <p>根据国家《个人所得税法》的劳务报酬所得规定，我们将对您在保险经纪网平台的收入依法代扣代缴个人所得税，具体细则如下：
所需承担的税金包括增值税及其相关附加（增值税小规模纳税人月销售额不超过3 万元（含3万元）的，免征增值税，超过3万元的按3%的税点缴纳）、个人所得税应纳税额采取累进税率，收入扣除40%的展业成本后为应纳税额。</p>
    </div>
    <div class="textContent">
      <p class="weight">举例一：</p>
      <p>提现1000元，个税计税依据＝1000-1000*40%＝600，未达到800个税起征点，个税为0且增值税月销售额不超过3万元（含3万）的，增值税及相关附加为0，实际支付佣金金额为1000元。</p>
    </div>
    <div class="textContent">
      <p class="weight">举例二：</p>
      <p>提现2500元，个税计税依据为2500-2500*40%＝1500，超过800个税起征点，个税为（1500-800）*20%＝140，增值税月销售额不超过3万元（含3万）的，增值税及相关附加为0，实际支付佣金为扣除个税140元的金额，即2500-140＝2360元。</p>
    </div>
    <div class="textContent">
      <p class="weight">五、完税证明查询方式</p>
      <p>1、网上查询：</p><br>
      <p>1）、登入浙江省地方税务局电子税务局网址：http://www.hz12366.gov.cn/，选择新用户注册，（如已注册的可以直接跳到第5步登录）；</p>
      <p>2）、选择个人用户注册；</p>
      <p>3）、输入姓名和身份证号进行身份验证；</p>
      <p>4）、验证通过后会自动跳转到下一界面；</p>
      <p>5）、开通完成后，回到登入界面，登入电子税务局-个人用户；</p>
      <p>6）、在“办税服务-个人所得税完税证明打印”中查询打印个人所得税完税证明。</p><br>
      <p>2、可带身份证直接去当地国地税大厅的自助机用身份证直接打印，无需注册。</p><br>
      <p>3、电话查询：拨打0571-12366，按提示查询</p>
      <p>以上附查询完税证明流程，有需要的会员请自行登陆查询，如对操作步骤有疑问可咨询保险经纪网客服：400-693-8080。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailedWithdrawalInstructions",
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
.WithdrawalInstructions {
  .title {
    line-height: 100px;
    background: rgba(247, 247, 247, 1);
    padding: 0 30px;
    margin: 30px 0;
  }
  .textContent {
    padding: 0 30px;
    p {
      line-height: 45px;
    }
    .weight {
      font-weight: 700;
      margin: 25px 0;
    }
  }
}
</style>