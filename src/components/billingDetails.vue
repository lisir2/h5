<!-- 组件说明 提现明细-->
<template>
  <div class="billingDetails">
    <van-nav-bar
      title="明细"
      left-arrow
      @click-left="onClickLeft"
      right-text="说明"
      @click-right="onClickRight"
    ></van-nav-bar>
    <van-tabs v-model="active" title-active-color="#008CFF" color="#ffffff00"> <!-- @click="changeTabs" -->
      <span
        style="position: absolute;left: 0;right: 0;width: 1px;margin: auto;top: 10px;height: 25px;background: #DDDDDD;"
      ></span>
      <van-tab title="收入明细">
        <div class="screen">
          <li>累计:{{IncomeAccumulated.toFixed(2)}}</li>
          <li @click="Filter">
            筛选
            <img :src="searchIcon" alt />
          </li>
        </div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="bill" v-for="(item,index) in detailEarnings" :key="index">
              <div>
                <p>
                  <!-- Y 为主险 ，N为附加险 -->
                  <span>{{item.insuranceType == 1 ?  item.insuranceName + '(' + item.mainFlag + ")" : item.goodsName}}</span>
                  <span>{{item.commission.toFixed(2)}}</span>
                </p>
              </div>
              <div class="time">
                <p>
                  {{item.insertTime}}
                  <span>{{item.commissionStatus == 0 ? '未结算' : '已结算'}}</span>
                </p>
              </div>
              <div class="billingDetails" v-show="false">
                <p>
                  投保人
                  <span>{{item.tPerson}}</span>
                </p>
                <p>
                  投保时间
                  <span>{{item.insertTime}}</span>
                </p>
                <p>
                  生效时间
                  <span>{{item.startTime}}</span>
                </p>
                <p>
                  投保份数
                  <span>{{item.num}}</span>
                </p>
                <p>
                  保费总额
                  <span>¥ {{item.totalMoney.toFixed(2)}}</span>
                </p>
                <p>
                  状态
                  <span>{{item.commissionStatus == 0 ? '未结算' : '已结算'}}</span>
                </p>
                <p>
                  佣金金额
                  <span>¥ {{item.commission}}</span>
                </p>
                <p>
                  佣金名称
                  <span>{{item.commissionName}}</span>
                </p>
                <p>
                  类型
                  <span>{{item.commissionType}}</span>
                </p>
              </div>
              <div>
                <p @click="CheckDetails($event)">查看明细</p>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="支出明细">
          <div class="screen">
          <li>累计:{{SpendingCumulative.toFixed(2)}}</li>
          <li @click="Filter">
            筛选
            <img :src="searchIcon" alt />
          </li>
        </div>
        <van-pull-refresh v-model="refreshing1" @refresh="onRefresh1">
          <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1">
            <div class="bill" v-for="(item,index) in statementExpenditures" :key="index">
              <div>
                <p>
                  <span>{{item.status == 1 ? '提现处理中' : (item.status == 2 ? '提现成功' : (item.status == 3 ? '提现失败' : (item.status == 4 ? '提现申请发起没有点击确认' : '')))}}</span>
                  <span>{{item.withdrawalAmount.toFixed(2)}}</span>
                </p>
              </div>
              <div class="time">
                <p>
                  {{item.applyTime}}
                  <span
                    style="color:#8f8a8a"
                  >到账金额：{{item.actualReceived.toFixed(2)}}</span>
                </p>
              </div>
              <div class="billingDetails" v-show="false">
                <p>
                  提现金额
                  <span>{{item.withdrawalAmount.toFixed(2)}}</span>
                </p>
                <p>
                  代扣税
                  <span>{{item.totalTax}}<li @click="withholdingDetail(item)" :style="{color:'rgb(0, 140, 255)',display:'inline-block',marginLeft:'10px'}">明细</li></span> 
                </p>
                <p>
                  到账金额
                  <span>{{item.actualReceived.toFixed(2)}}</span>
                </p>
                <p>
                  提现时间
                  <span>{{item.applyTime}}</span>
                </p>
                <p>
                  状态
                  <span>{{item.status == 1 ? '处理中' : (item.status == 2 ? '成功' : (item.status == 3 ? '失败' : (item.status == 4 ? '提现申请发起没有点击确认' : '')))}}</span>
                </p>
                <p>
                  类型
                  <span>提现</span>
                </p>
              </div>
              <div>
                <p @click="CheckDetails($event)">查看明细</p>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'80%'}">
      <div class="search">
        <div class="fliter">
          <p class="title">时间</p>
          <ul>
            <input
              type="text"
              ref="startTime"
              placeholder="请选择开始时间"
              readonly
              @click="TimeShow = true;selectTimeDom = $refs.startTime"
            /> &nbsp—&nbsp
            <input
              type="text"
              placeholder="请选择结束时间"
              ref="endTime"
              readonly
              @click="TimeShow = true;selectTimeDom = $refs.endTime"
            />
          </ul>
        </div>
        <div class="fliter">
          <p class="title">状态</p>
          <ul>
            <li
              @click="statusIndex = j"
              v-for="(items,j) in status[active]"
              :key="j"
              :class="statusIndex == j ? 'button' : ''"
              ref="button"
              :code="items.code"
            >{{items.name}}</li>
          </ul>
        </div>
        <div class="fliter">
          <p class="title">类型</p>
          <ul>
            <li
              @click="TypeIndex = j"
              v-for="(items,j) in Type[active]"
              :key="j"
              :class="TypeIndex == j ? 'button' : ''"
              ref="button"
              :code="items.code"
            >{{items.name}}</li>
          </ul>
        </div>
      </div>
      <div class="clickBtn">
        <button @click="reset">重置</button>
        <button @click="confirm">确定</button>
      </div>
    </van-popup>
    <!-- 日期控件 -->
    <van-popup v-model="TimeShow" position="bottom" :style="{width:'100%'}">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmTime"
        @cancel="TimeShow = false"
      />
    </van-popup>
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
import $ from "jquery";
export default {
  name: "billingDetails",
  components: {},
  data() {
    return {
      searchIcon: require("../assets/images/billingDetails/search.png"),
      show: false, //筛选弹出层显示隐藏
      indexs: "", //筛选框选中 下标
      active: '',
      status: [
        [
          { name: "全部", code: 2 },
          { name: "已结算", code: 1 },
          { name: "未结算", code: 0 }
        ],
        [
          { name: "全部", code: 0 },
          { name: "成功", code: 2 },
          { name: "处理中", code: 1 }
        ]
      ], // 状态
      Type: [
        [
          { name: "全部", code: 0 },
          { name: "提现", code: 2 },
          { name: "退保", code: 1 }
        ],
        [
          { name: "全部", code: 0 },
          { name: "推广", code: 2 }
        ]
      ], // 状态
      statusIndex: 0, //状态选中下标
      TypeIndex: 0, //类型选中下标
      minDate: new Date(1990, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      TimeShow: false, //时间控件展示
      selectTimeDom: "", // 选择时间dom
      IncomeAccumulated: 0, // 收入累计金额
      SpendingCumulative: 0, // 支出累计金额
      detailEarnings: [], //收入明细
      loading: false, // 加载动画
      finished: false,  // 是否加载完成
      refreshing: false, // 下拉刷新
      statementExpenditures: [], //支出明细
      loading1: false,
      finished1: false,
      refreshing1: false,
      TaxShow:false, //税费展示
      vatAmount: 0, //代扣增值税
      accumulatedAdditionalTaxes: 0, //附加税
      totalTaxAndFee: 0, //所得说
    };
  },
  computed: {},
  mounted() {
    // 修改active更改默认选中
    if(this.getQueryString('active')){
      this.active = Number(this.getQueryString('active'));
    }
  },
  methods: {
    onLoad() {
      var that = this;
      this.GetAccountBalance(2, "2000-01-01 00:00:00", that.Utils.timestampToTime(new Date(),false), function(data) {
        that.IncomeAccumulated = data.totalCommission;
        that.detailEarnings = data.policyEntityList;
        that.loading = false;
        that.finished = true;
      });
    },
    onRefresh() {
      this.IncomeAccumulated = 0; // 累计金额
      // 在下拉回调中 this.refreshing 会变成 true 这时清空数据,重新加载列表
      this.detailEarnings = [];
      // 关闭加载状态
      this.refreshing = false;
      // 加载完毕状态改为false
      this.finished = false;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      // 重新加载数据
      this.onLoad();
    },
    onLoad1() {
      var that = this;
      this.GetstatementExpenditures(0, "2000-01-01 00:00:00", that.Utils.timestampToTime(new Date(),false), function(data) {
        that.SpendingCumulative = data.totalWithdrawalAmount;
        that.statementExpenditures = data.prodCashOutList;
        that.loading1 = false;
        that.finished1 = true;
      });
    },
    onRefresh1() {
      this.SpendingCumulative = 0; // 累计金额
      // 在下拉回调中 this.refreshing 会变成 true 这时清空数据,重新加载列表
      this.statementExpenditures = [];
      // 关闭加载状态
      this.refreshing1 = false;
      // 加载完毕状态改为false
      this.finished1 = false;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading1 = true;
      // 重新加载数据
      this.onLoad1();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/DetailedInstructions");
    },
    // 切换导航栏
    changeTabs(name, title) {
      this.statusIndex = 0; //状态选中下标
      this.TypeIndex = 0; //类型选中下标
      console.log(name, title)
      if(name == 0){
          this.onLoad();
      }else if(name == 1){
          this.onLoad1();
      }
    },
    // 收入明细
    GetAccountBalance(state, stateTime, endTime, callBack) {
      // 收入明细
      var that = this;
      var params = this.sign({
        mId: this.getCookie("ZB_JUSER_Mid"), // 用户mId
        commissionName: "代理人佣金", // 佣金名称（代理人佣金;直接推荐奖;管理津贴）
        commissionStatus: state, // 佣金状态(0:未结算 1：已结算；2：查询全部)
        stateTime: stateTime, //开始时间
        endTime: endTime //结束时间
      });
      api.queryIncomeDetails(params).then(res => {
        if (res.code == 20000) {
          callBack(res.data);
        } else {
          that.Toast(res.message);
        }
      });
    },
    // 支出明细
    GetstatementExpenditures(state, stateTime, endTime, callBack) {
      // 支出明细
      var that = this;
      var params = this.sign({
        mId: this.getCookie("ZB_JUSER_Mid"), // 用户mId
        state: state, //提现状态(1处理中 2成功 3失败 4 提现申请发起没有点击确认；0查询全部)
        stateTime: stateTime, //开始时间
        endTime: endTime //结束时间
      });
      api.queryWithdrawalDetails(params).then(res => {
        if (res.code == 20000) {
          callBack(res.data);
        } else {
          that.Toast(res.message);
        }
      });
    },
    // 查看明细
    CheckDetails(event) {
      if ($(event.target).html() == "查看明细") {
        $(event.target).html("收起明细");
        $(event.target)
          .parent()
          .parent()
          .find($(".billingDetails"))
          .show();
      } else {
        $(event.target).html("查看明细");
        $(event.target)
          .parent()
          .parent()
          .find($(".billingDetails"))
          .hide();
      }
    },
    // 筛选
    Filter() {
      this.show = true;
    },
    // 确定
    confirm() {
      var that = this;
      var search = [];
      this.$refs.button.forEach(function(val, index, arr) {
        if (val.className == "button") {
          search.push({ name: $(val).html(), code: $(val).attr("code") });
        }
      });

      if (this.$refs.startTime.value == "") {
        this.Toast("请选择开始时间");
      } else if (this.$refs.endTime.value == "") {
        this.Toast("请选择结束时间");
      } else {
        this.show = false;
        // 收入明细
        if (this.active == 0) {
          this.GetAccountBalance(
            search[0].code,
            this.$refs.startTime.value,
            this.$refs.endTime.value,
            function(data) {
                that.IncomeAccumulated = data.totalCommission;
                that.detailEarnings = data.policyEntityList;
            }
          );
          // 支出明细
        } else if (this.active == 1) {
          this.GetstatementExpenditures(
            search[0].code,
            this.$refs.startTime.value,
            this.$refs.endTime.value,
            function(data) {
                that.SpendingCumulative = data.totalWithdrawalAmount;
                that.statementExpenditures = data.prodCashOutList;
            }
          );
        }
      }
    },
    // 重置
    reset() {
      this.statusIndex = 0; //状态选中下标
      this.TypeIndex = 0; //类型选中下标
      this.$refs.startTime.value = "";
      this.$refs.endTime.value = "";
    },
    // 选择时间回调
    confirmTime(data) {
      this.selectTimeDom.value = this.Utils.timestampToTime(data, false);
      this.TimeShow = false;
    },
    // 支出明细 代扣税费
    withholdingDetail(item){
      this.TaxShow = true; //税费展示
      this.vatAmount = item.vatAmount; //代扣增值税
      this.accumulatedAdditionalTaxes = item.accumulatedAdditionalTaxes; //附加税费
      this.totalTaxAndFee = item.totalTaxAndFee; //所得说
    }
  }
};
</script>

<style lang="scss" scoped>
.billingDetails {
  &>.van-hairline--bottom {
    z-index: 3000 !important;
  }
  .banner {
    display: flex;
    justify-content: space-around;
    & > li:nth-of-type(1) {
      border-right: solid 2px #dddddd;
    }
    li {
      width: 50%;
      line-height: 51px;
      text-align: center;
      margin: 22px 0;
    }
  }
  .screen {
    height: 70px;
    background-color: rgb(239, 239, 239);
    padding: 0 29px;
    line-height: 70px;
    font-size: 26px;
    li:nth-of-type(1) {
      float: left;
    }
    li:nth-of-type(2) {
      float: right;
      img {
        width: 30px;
        margin-left: 5px;
      }
    }
  }
  .bill {
    padding: 30px;
    border-top: solid #f7f7f7 20px;
    & > div:nth-of-type(1) {
      p {
        font-size: 30px;
        span:nth-of-type(1) {
          display: inline-block;
          width: 80%;
        }
        span:nth-of-type(2) {
          float: right;
          color: red;
          font-weight: 550;
        }
      }
    }
    & > div:nth-of-type(2) {
      p {
        font-size: 27px;
        color: rgb(143, 138, 138);
        line-height: 80px;
        span {
          float: right;
          color: black;
        }
      }
    }
    & > div:nth-of-type(4) {
      color: #008cff;
    }
    .billingDetails {
      border-top: solid #eeeeee 2px;
      padding: 20px 0;
      p {
        position: relative;
        color: #8f8a8a;
        line-height: 60px;
        span {
          position: absolute;
          left: 170px;
        }
      }
    }
  }
  .search {
    padding: 110px 23px 23px 23px;
    .title {
      font-size: 30px;
    }
    ul {
      padding: 30px 0;
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      line-height: 60px;
      li {
        width: 155px;
        height: 50px;
        line-height: 50px;
        border: solid 2px #008cff;
        border-radius: 25px;
        padding: 0 25px;
        margin-right: 29px;
        margin-bottom: 20px;
        font-size: 24px;
        text-align: center;
        color: #008cff;
      }
      input {
        width: 40%;
        border-radius: 15px;
        border: solid 2px #eeeeee;
        line-height: 60px;
        padding: 0 10px;
        text-align: center;
      }
    }
  }
  .clickBtn {
    width: 100%;
    position: absolute;
    bottom: 0;
    button {
      height: 100px;
      width: 50%;
      font-size: 36px;
      color: white;
      float: left;
    }
    & > button:nth-of-type(1) {
      background-color: rgb(255, 194, 136);
    }
    & > button:nth-of-type(2) {
      background-color: rgb(255, 155, 61);
    }
  }
}
.button {
  background-color: #008cff;
  color: white !important;
}
</style>