<!-- 组件说明:佣金弹出框，产品列表弹出框、产品详情弹出框（短期险佣金展示、长期险佣金展示） -->
<template>
  <div class="CommissionPopUp">
    <!-- 短期险佣金弹出框 -->
    <div v-if="commissionInfo && commissionInfo[0].isLongTermInsurance == 0">
      <div class="popupCommission ShortTerm">
        <p>
          活动时间：
          <span v-if="commissionInfo[0].startTime">{{commissionInfo[0].startTime.split(' ')[0]}}</span> ~
          <span v-if="commissionInfo[0].endTime">{{commissionInfo[0].endTime.split(' ')[0]}}</span>
        </p>
        <table border="0">
          <thead>
            <tr>
              <th>名称</th>
              <th>基础佣金</th>
              <th>限时奖励</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>代理人佣金</th>
              <th id="firstCommissionRate">{{commissionInfo[0].firstCommissionRate}}%</th>
              <th id="firstLimitedReward">{{commissionInfo[0].basicCommission}}%</th>
            </tr>
            <tr>
              <th>直接推荐奖</th>
              <th id="secondCommissionRate">{{commissionInfo[0].secondCommissionRate}}%</th>
              <th id="secondLimitedReward">{{commissionInfo[0].secondBasicCommission}}%</th>
            </tr>
            <tr>
              <th>管理津贴</th>
              <th id="thirdCommissionRate">{{commissionInfo[0].thirdCommissionRate}}%</th>
              <th id="thirdLimitedReward">{{commissionInfo[0].thirdBasicCommission}}%</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 长期险佣金弹出框 -->
    <div v-else>
      <div class="popupCommission longTerm">
        <table style="border: solid 1px #eee !important;">
          <thead>
            <tr>
              <th>名称</th>
              <th>险种</th>
              <th>保障期限</th>
              <th>缴费期限</th>
              <th>第一年</th>
              <th>第二年</th>
              <th>第三年</th>
              <th>第四年</th>
              <th>第五年</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in commissionIdArr" :key="index">
              <th>{{item.content['1'].commissionName}}</th>
              <th>{{item.content['1'].riskName}}</th>
              <th>{{item.content['1'].guaranteePeriod}}</th>
              <th>{{item.content['1'].paymentTerm}}</th>
              <th>{{item.content['1'] ? item.content['1'].commissionBasis + '%' : '/'}} {{(item.content['1'] && item.content['1'].limitedTimeReward != 0) ? "+" + item.content['1'].limitedTimeReward + '%' : ''}}</th>
              <th>{{item.content['2'] ? item.content['2'].commissionBasis + '%' : '/'}} {{(item.content['2'] && item.content['2'].limitedTimeReward != 0) ? "+" + item.content['2'].limitedTimeReward + '%' : ''}}</th>
              <th>{{item.content['3'] ? item.content['3'].commissionBasis + '%' : '/'}} {{(item.content['3'] && item.content['3'].limitedTimeReward != 0) ? "+" + item.content['3'].limitedTimeReward + '%' : ''}}</th>
              <th>{{item.content['4'] ? item.content['4'].commissionBasis + '%' : '/'}} {{(item.content['4'] && item.content['4'].limitedTimeReward != 0) ? "+" + item.content['4'].limitedTimeReward + '%' : ''}}</th>
              <th>{{item.content['5'] ? item.content['5'].commissionBasis + '%' : '/'}} {{(item.content['5'] && item.content['5'].limitedTimeReward != 0) ? "+" + item.content['5'].limitedTimeReward + '%' : ''}}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      commissionList: [], // 解析之后的长期险数据
      commissionIdArr: [] // 长期险每行唯一标识（标识由 佣金名称、险种、保障期限、缴费期限 四个组成）
    };
  },
  props: ["commissionInfo"],
  computed: {},
  methods: {
    // 渲染佣金
    renderCommission(){
      this.commissionIdArr = [];
      this.commissionInfo.forEach(element => {
        // 唯一标识由佣金名称、险种、保障期限、缴费期限 四个组成
        var tempList = [];
        tempList.push(element.commissionName);
        tempList.push(element.guaranteePeriod);
        tempList.push(element.paymentTerm);
        tempList.push(element.riskName);
        if (this.commissionIdArr.length == 0) {
          this.commissionIdArr.push({ id: tempList, content: {} });
        } else {
          var ArrInclude = true;
          // 判断此标识是否已经包含
          this.commissionIdArr.forEach(ele => {
            if (this.Utils.isContained(ele.id, tempList)) {
              ArrInclude = false;
            }
          });
          // 不包含加入idArr数组
          if (ArrInclude) {
            this.commissionIdArr.push({ id: tempList, content: {} });
          }
        }
      });

      // 解析自己需要的数据格式
      this.commissionInfo.forEach(element => {
        // 唯一标识由佣金名称、险种、保障期限、缴费期限 四个组成
        var tempList = [];
        tempList.push(element.commissionName);
        tempList.push(element.guaranteePeriod);
        tempList.push(element.paymentTerm);
        tempList.push(element.riskName);

        // 判断此标识是否已经包含
        this.commissionIdArr.forEach(ele => {
          if (this.Utils.isContained(ele.id, tempList)) {
            ele.content[element.commissionYears] = element;
          }
        });
      });
    }
  },
  watch:{
    commissionInfo(val){
      this.renderCommission();
    }
  },
  mounted() {
    this.renderCommission();
  },
};
</script>

<style lang="scss" scoped>
.CommissionPopUp {
  .popupCommission {
    padding: 30px;
    padding-bottom: 40px;
    p {
      color: #f99a31;
      font-size: 26px;
      margin-top: 0;
      margin-bottom: 20px;
    }
  }
  .longTerm {
    table {
      overflow: scroll;
      display: block;
      thead {
        width: 2030px;
        background-color: #4d648e !important;
        display: block;
        color: white;
      }
      tbody {
        width: 2030px;
        height: 450px;
        display: block;
        overflow: auto;
        tr:nth-child(even) {
          background: #f5fafa;
        }
        tr:nth-child(odd) {
          background: #fff;
        }
      }
      tr {
        display: inline-block;
        padding: 20px 0px;
        font-size: 26px;
        border: 1px solid #cad9ea;
        th {
          width: 214px;
          display: inline-block;
          font-weight: 500;
        }
      }
    }
  }
  .ShortTerm {
    table {
      width: 100%;
      text-align:center;
      thead {
        background-color: #4d648e !important;
        color: white;
      }
      tbody {
        tr:nth-child(even) {
          background: #f5fafa;
        }
        tr:nth-child(odd) {
          background: #fff;
        }
      }
      tr {
        width: 100%;
        display: inline-block;
        padding: 20px 0px;
        font-size: 26px;
        border: 1px solid #cad9ea;
        th {
          width: 30%;
          display: inline-block;
          font-weight: 500;
        }
      }
    }
  }
}
</style>