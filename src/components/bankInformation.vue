<!-- 组件说明 银行账号信息-->
<template>
  <div class="bankInformation">
    <van-nav-bar title="完善银行账户信息" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="personInfo">
      <p>收款人信息</p>
      <ul v-if="userInfo!=''">
        <li>
          <span>收款人姓名</span>
          <span>{{userInfo.agentInfo.agentName}}</span>
        </li>
        <li>
          <span>身份证号</span>
          <span>{{userInfo.agentInfo.identityCode}}</span>
        </li>
      </ul>
    </div>
    <div class="bankInfo">
      <p>收款人银行账户信息</p>
      <ul>
        <li>
          <span>开户行</span>
          <span @click="immutable ? '' : bankSelectShow = true">
            <input type="text" placeholder="请选择开户行" readonly v-model="bankName.name" />
          </span>
          <van-icon name="arrow" v-if="immutable ? false : true"/>
        </li>
        <li>
          <span>银行卡号</span>
          <span>
            <input type="text" placeholder="请填写银行卡号" :readonly="immutable ? true : false" v-model="acountNo" />
          </span>
        </li>
        <li>
          <span>开户行支行</span>
          <span>
            <input type="text" placeholder="请选择省市区" v-model="acountBranchProvince" @click="immutable ? '' : ProvinceShow = true" readonly/>
          </span>
          <van-icon name="arrow" v-if="immutable ? false : true"/>
        </li>
        <li>
          <span>支行名称</span>
          <span>
            <input type="text" placeholder="请注明支行名称" v-model="acountBranch" :readonly="immutable ? true : false"/>
          </span>
        </li>
      </ul>
    </div>
    <input v-if="!immutable" type="button" value="提交" class="updateBtn" @click="submit()" />
    <p class="otherTitle">免责声明:</p>
    <p class="otherText">为了您能顺利无误的收到提现金额，请如实完整填写相关信息，若您提供的信息有误而造成的一切纠纷损失，与保险经纪网及浙江环晟保险经纪有限公司无关。</p>
    <!-- 银行卡类型弹出框 -->
    <van-action-sheet
      v-model="bankSelectShow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="bankSelectShow = false"
      @select="selectBank"
    />
    <!-- 省市区弹出层 -->
    <van-action-sheet v-model="ProvinceShow" position="bottom" :style="{ height: '100%',maxHeight:'100%!important' }" title="开户行支行地址">
      <CommonProvinces></CommonProvinces>
    </van-action-sheet>
  </div>
</template>

<script>
import api from "../fetch/api";
import CommonProvinces from './base/CommonProvinces'
export default {
  components: {
    CommonProvinces
  },
  data() {
    return {
      bankSelectShow: false, // 开户行弹出框
      ProvinceShow: false, //开户行支行
      actions: [{ name: "中国农业银行", code: "1" }],
      //   选择银行信息
      bankName: {
        name: "",
        code: ""
      },
      userInfo: "", //用户信息
      acountNo: "", // 银行卡号
      acountBranch: "", // 开户行名称
      acountBranchProvince:'', //开户行支行地址
      acountBranchProvinceCode:'', //开户行支行code
      immutable: true, //true 为不能修改，false可以修改
    };
  },
  computed: {},
  mounted() {
    // 是否可以修改
    if(this.getQueryString('immutable')){
      this.immutable = this.getQueryString('immutable');
    } else{
      this.immutable = false;
    }
    var that = this;
    var args = this.sign({ userId: this.getCookie("ZB_JUSER_Mid") });
    api.queryPersonalInfo(args).then(res => {
      if (res.code == 20000) {
        this.userInfo = res.data;
        try {
          this.bankName.name = res.data.wxCashInfo.acountBank; //银行名称
          this.acountNo =  res.data.wxCashInfo.acountNo; // 银行卡号
          this.acountBranch = res.data.wxCashInfo.acountBranch; // 开户行名称
          this.acountBranchProvince = res.data.wxCashInfo.acountProvince + ' ' + res.data.wxCashInfo.acountCity + ' ' + res.data.wxCashInfo.acountArea; //开户行支行地址
          this.acountBranchProvinceCode = res.data.wxCashInfo.acountProvinceCode + ' ' + res.data.wxCashInfo.acountCityCode + ' ' + res.data.wxCashInfo.acountAreaCode; //开户行支行code
        } catch (error) {
          console.log("绑定银行卡信息为空");
        }
        
      } else {
        that.Toast(res.message);
      }
    });
  },
  methods: {
    // 省市区选择回调
    selectProvinces(val,code){
      this.ProvinceShow = false;
      this.acountBranchProvince = val;
      this.acountBranchProvinceCode = code;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    selectBank(data) {
      this.bankName = data;
    },
    // 提交信息
    submit() {
      var that = this;
      if(this.bankName.name == ''){
        this.Toast('请选择开户行');
      } else if(this.acountNo == '' || !this.Utils.BankCodeVerify(this.acountNo)){
        this.Toast('银行卡号不正确');
      } else if(this.acountBranch == ''){
        this.Toast('请选择开户行支行');
      } else if(this.acountBranchProvince == ''){
        this.Toast('请选输入支行名称');
      }else{
        var params = this.sign({
          mId: this.getCookie("ZB_JUSER_Mid"), // 用户mid
          acountBank: this.bankName.name, // 开户行
          acountNo: this.acountNo, //银行卡号
          acountBranch: this.acountBranch, //支行名称
          acountProvince: this.acountBranchProvince.split(' ')[0], //支行省名称
          acountProvinceCode: this.acountBranchProvinceCode.split(' ')[0], //支行省编码
          acountCity: this.acountBranchProvince.split(' ')[1], //支行市名称
          acountCityCode: this.acountBranchProvinceCode.split(' ')[1], // 支行市编码
          acountArea: this.acountBranchProvince.split(' ')[2], // 支行区名称
          acountAreaCode: this.acountBranchProvinceCode.split(' ')[2] //支行区编码
        });
        api.perfectAccountInformation(params).then(res => {
          if (res.code == 20000) {
            if (this.getQueryString("route")) {
              that.$router.push(this.getQueryString("route"));
            } else{
              that.Toast.success(res.message);
            }
          }
        });
      }
    }
  }
};
</script>

<style lang='scss'>
.bankInformation {
  .personInfo,.bankInfo {
    p {
      font-size: 30px;
      color: #333;
      font-weight: 700;
      margin-left: 32px;
      height: 100px;
      line-height: 100px;
    }
    ul {
      li {
        height: 100px;
        line-height: 100px;
        font-size: 28px;
        margin: 0 32px;
        color: #302d2d;
        border-bottom: 1px solid #eee;
        span:nth-child(1) {
          display: inline-block;
          width: 25%;
        }
        span:nth-child(2) {
          display: inline-flex;
          width: 65%;
          input{
            width: 100%;
          }
        }
      }
    }
  }
  .updateBtn {
    width: 618px;
    height: 88px;
    border-radius: 50px;
    text-align: center;
    color: #fff;
    font-size: 32px;
    background: #f99a31;
    margin: 0 auto;
    margin-top: 100px;
    display: block;
  }
  .otherTitle {
    color: #333;
    font-size: 26px;
    margin: 0 32px;
    margin-top: 78px;
    margin-bottom: 12px;
  }
  .otherText {
    color: #8f8a8a;
    font-size: 26px;
    margin: 0 32px;
    line-height: 36px;
  }
}
</style>