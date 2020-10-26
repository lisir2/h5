<template>
  <div class="cashOut">
    <van-nav-bar
      title="提现"
      left-arrow
      @click-left="onClickLeft"
      right-text="记录"
      @click-right="onClickRight"
    ></van-nav-bar>
    <div class="blackLine"></div>
    <div class="group">
      <div class="money">
        <img src="@/assets/images/cashOut/money.png" alt />
        <div class="font">余额</div>
        <div class="font">{{balance.toFixed(2)}}</div>
      </div>
      <div class="toline">
        <img src="@/assets/images/cashOut/arrows.png" alt />
      </div>
      <div class="compony" >
        <img src="@/assets/images/cashOut/nongyeBank.jpg" alt />
        <div v-if="wxCashInfo">
          <div class="font">{{wxCashInfo.acountBank}}</div>
          <div
            class="font"
          >（尾号{{wxCashInfo.acountNo.substring(wxCashInfo.acountNo.length-4,wxCashInfo.acountNo.length)}}）</div>
        </div>
      </div>
    </div>
    <div class="blackLine"></div>
    <div class="inputGroup">
      <span class="first">提现金额</span>
      <span>
        <input
          type="number"
          placeholder="请输入提现金额"
          v-model="cashWithdrawalAmount"
        />
      </span>
      <span class="last" @click="cashWithdrawalAmount = String(balance)">全部</span>
    </div>
    <div class="inputGroup">
      <span class="first">代扣税费</span>
      <span>
        <input
          type="text"
          class="inputText"
          placeholder="0.00元"
          v-model="expensesTaxation"
          readonly
        />
      </span>
      <span class="last" @click="TaxShow = true">
        <img src="@/assets/images/cashOut/issue.png" alt />
      </span>
    </div>
    <div class="inputGroup">
      <span class="first">实际到账</span>
      <span>
        <input type="text" class="inputText" placeholder="0.00元" v-model="actualAccount" readonly />
      </span>
      <!-- <span class="last" style="color: #008CFF;">查看案例 ></span> -->
    </div>
    <div class="container">
      <div class="msg">
        <!-- <span>剩余免费提现次数 :</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>1次/月</span> -->
        <span>
          <router-link to="/WithdrawalInstructions">提现说明</router-link>
        </span>
      </div>
      <div class="button" @click="submit()">提交</div>
    </div>
    <!-- 软键盘 -->
    <van-number-keyboard
     v-model="cashWithdrawalAmount"
      :show="show"
      theme="custom"
      :maxlength="8"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
    />
    <!-- 税费 -->
    <van-popup v-model="TaxShow" closeable :style="{width:'80%'}">
      <van-nav-bar
      title="税费明细"
    ></van-nav-bar>
      <van-cell-group>
        <van-cell title="个人所得税" :value="totalTaxAndFee" />
        <van-cell title="增值税" :value="vatAmount" />
        <van-cell title="附加税费" :value="accumulatedAdditionalTaxes" />
      </van-cell-group>
    </van-popup>
  </div>
</template>
<script>
import api from "@/fetch/api";
export default {
  name: "cashOut",
  data() {
    return {
      balance: 0, //余额
      cashWithdrawalAmount: "", //提现金额
      expensesTaxation: "", //代扣税费
      actualAccount: "", //实际到账
      show: false, //软键盘显示
      wxCashInfo: "", // 用户银行卡信息
      orderNo: "", // 订单号
      TaxShow:false, //税费展示
      vatAmount: 0, //增值税
      accumulatedAdditionalTaxes: 0, //附加税费
      totalTaxAndFee: 0 , //个人所得税
    };
  },
  watch: {
    cashWithdrawalAmount: function(newVal, oldVal) {
      var that = this;
      if (this.cashWithdrawalAmount > this.balance) {
        this.$dialog({ message: '提现金额不能大于余额' });
        this.cashWithdrawalAmount = String(this.balance);
      } else if (newVal == '') {
        this.actualAccount = '';
        this.expensesTaxation = '';
      } else {
        var args = this.sign({
          mId: this.getCookie("ZB_JUSER_Mid"),
          accountMoney: this.cashWithdrawalAmount
        });
        if (this.cashWithdrawalAmount != 0 && this.cashWithdrawalAmount != "") {
          var tempToast = this.Toast.loading({
            message: "加载中",
            duration: 0,
            forbidClick: true,
            loadingType: "spinner"
          });
          api.myAssetsWithdrawalApplication(args).then(res => {
            if (res.code == 20000) {
              this.actualAccount = res.data.actualReceived;
              this.expensesTaxation = res.data.totalTax;
              this.orderNo = res.data.orderNo;
              this.vatAmount= res.data.vatAmount; //代扣增值税
              this.accumulatedAdditionalTaxes= res.data.accumulatedAdditionalTaxes; //附加税费
              this.totalTaxAndFee = res.data.totalTaxAndFee; //个人所得税
              tempToast.clear();
            } else {
              that.Toast(res.message);
            }
          });
        }
      }
    }
  },
  methods: {
    onClickRight() {
      this.$router.push({path:"billingDetails",query:{'active':1}});
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 提交
    submit() {
      var that = this;
      if (this.cashWithdrawalAmount === "") {
        this.Toast("请输入提现金额");
      } else if (this.cashWithdrawalAmount == 0) {
        this.Toast("提现金额不能为0");
      } else if (
        this.expensesTaxation === "" ||
        this.expensesTaxation == undefined
      ) {
        this.Toast("代扣税费不能为空");
      } else if (this.actualAccount === "" || this.actualAccount == undefined) {
        this.Toast("实际到账不能为空");
      } else {
        // 提交
        var args = this.sign({
          mId: this.getCookie("ZB_JUSER_Mid"),
          cashNo: this.orderNo
        });
        api.withdrawalConfirm(args).then(res => {
          if (res.code == 20000) {
            console.log(res);
            that.$router.push({path:"withdrawDepositResule",query:{"cashNo":that.orderNo}});
          }else{
            that.Toast(res.message);
          }
        });
      }
    }
  },
  mounted() {
    var that = this;
    var params = this.sign({ userId: this.getCookie("ZB_JUSER_Mid") });
    api.queryPersonalInfo(params).then(res => {
      if (res.code == 20000) {
        // 未绑定银行卡
        if (
          !res.data.wxCashInfo || 
          !res.data.wxCashInfo.acountBank ||
          !res.data.wxCashInfo.acountNo 
        ) {
          that.$dialog({
            title: "提示",
            message: "申请提现需要绑定银行卡"
          }).then(() => {
            that.$router.push({
              path: "bankInformation",
              query: { route: "cashOut" }
            });
          });
        }
      }
    });

    var args = this.sign({ userId: this.getCookie("ZB_JUSER_Mid") });
    api.queryPersonalInfo(args).then(res => {
      if (res.code == 20000) {
        that.wxCashInfo = res.data.wxCashInfo;
        that.balance = res.data.commissionTotal.availablePresent;
      } else {
        that.Toast(res.message);
      }
    });
  }
};
</script>
<style lang="scss" scoped>
body {
  background: rgba(247, 247, 247, 1) !important;
}
.blackLine {
  width: 100%;
  height: 20px;
  background: rgba(247, 247, 247, 1);
}
.group {
  width: 100%;
  height: 181px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  .font {
    font-size: 26px;
    font-weight: 800;
    color: rgba(12, 12, 12, 1);
    line-height: 30px;
  }
  .money {
    flex: 1;
    margin-top: 27px;
    text-align: center;
    img {
      width: 60px;
      height: 60px;
      margin-bottom: 15px;
    }
  }
  .toline {
    flex: 1;
    img {
      vertical-align: middle;
      width: 100%;
      margin-top: 75px;
    }
  }
  .compony {
    flex: 1;
    margin-top: 27px;
    text-align: center;
    img {
      width: 65px;
      height: 65px;
      margin-bottom: 15px;
    }
  }
}

.inputGroup {
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid rgba(232, 230, 230, 1);
  background: white;
  img {
    width: 31px;
    height: 31px !important;
  }
  span {
    display: inline-block;
  }
  .first {
    display: inline-block;
    margin-left: 31px;
    font-size: 30px;
    font-weight: 400;
    color: rgba(48, 45, 45, 1);
    line-height: 50px;
  }
  :last-child {
    display: inline-block;
    height: 100%;
  }
}
.inputGroup {
  input {
    height: 99%;
    font-size: 28px;
    font-weight: 400;
    color: rgba(48, 45, 45, 1);
    line-height: 50px;
    padding-left: 89px;
  }
  .inputText {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(48, 45, 45, 1);
    line-height: 23px;
  }
  .last {
    float: right;
    margin-right: 35px;
  }
}
.msg {
  height: 90px;
  font-size: 26px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(48, 45, 45, 1);
  line-height: 90px;
  & > :first-child {
    display: inline-block;
    padding-left: 31px;
  }
  & > :last-child {
    float: right;
    margin-right: 34px;
  }
}
.container {
  position: absolute;
  top: 610px;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(247, 247, 247, 1);
}
.button {
  width: 618px;
  height: 88px;
  background: rgba(249, 154, 49, 1);
  border-radius: 44px;
  text-align: center;
  line-height: 88px;

  font-size: 32px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin: 0 auto;
  margin-top: 320px;
}
</style>
