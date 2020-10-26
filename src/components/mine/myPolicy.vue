<template>
  <div class="mypolicy">
    <div class="policyList">
      <div class="sameTitle">
        <span class="leftB"></span>
        <p class="titleA">我的保单</p>
      </div>
      <van-grid :column-num="3" style="border:none" icon-size="32">
        <van-grid-item text="个险保单" :icon="policy1" to="personalPolicy" />
        <van-grid-item text="团险保单" :icon="policy2" to="industryPolicy" />
        <van-grid-item text="车险保单" :icon="policy3" to="vehiclePolicy" />
      </van-grid>
    </div>

    <div class="becomeDlr" v-if="userDetails == '' ? true : userDetails.agentInfo.auditStatus != 2">
      <router-link to="/agent">
        <van-Image :src="img" :style="{borderTop:'solid 1px #DDDDDD'}"/>
      </router-link>
    </div>

    <div class="colorBlock"></div>
    <!-- auditStatus == 2 为代理人 -->
    <div class="MyAssets" v-if="userDetails.agentInfo && userDetails.agentInfo.auditStatus == 2">
      <div class="sameTitle">
        <span class="leftB"></span>
        <p class="titleA">我的资产</p>
        <router-link to="/myAssets">去提现>></router-link>
      </div>
      <div class="money">
        <div>
          <p class="sum">{{userDetails.commissionTotal.availablePresent.toFixed(2)}}</p>
          <p>可提现 <span>(元)</span></p>
        </div>
        <div>
          <p class="sum">{{userDetails.commissionTotal.frozenAmount.toFixed(2)}}</p>
          <p>待结算 <span>(元)</span></p>
        </div>
        <div>
          <p class="sum">{{userDetails.commissionTotal.grossIncome.toFixed(2)}}</p>
          <p>累计收入 <span>(元)</span></p>
        </div>
      </div>
      <div class="colorBlock"></div>
    </div>

    <div class="MyServices" v-if="userDetails.agentInfo && userDetails.agentInfo.auditStatus == 2">
      <div class="sameTitle">
          <span class="leftB"></span>
          <p class="titleA">我的服务</p>
      </div>             
      <van-cell title="客户保单" :icon="clientManagement" is-link to="CustomerOrder"/>
      <!-- <van-cell title="客户管理" :icon="guaranteeSlip" is-link/> -->
      <van-cell title="我的团队" :icon="other3" is-link to="AgentTeam"/>
      <van-cell title="邀请好友" :icon="team" is-link to="inviteFriends" />
      <van-cell title="名片设置" :icon="mingpian" is-link to="myCard"/>
    </div>
    <div class="otherList">
      <div class="sameTitle">
        <span class="leftB"></span>
        <p class="titleA">其他</p>
      </div>
      <van-cell title="活动专区" :icon="other1" is-link to="activityZone" />
      <van-cell title="常用联系人" :icon="other2" is-link to="topContacts" />
      <van-cell title="理赔报案" :icon="other3" is-link to="ClaimsService" />
      <van-cell title="客服中心" :icon="other4" is-link to="serviceCenter" />
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import api from "@/fetch/api";
export default {
  name: "mypolicy",
  data() {
    return {
      checked: true,
      img: require("@/assets/images/mine/dlrbanner.png"),
      policy1: require("@/assets/images/mine/policy1.png"),
      policy2: require("@/assets/images/mine/policy2.png"),
      policy3: require("@/assets/images/mine/policy3.png"),
      other1: require("@/assets/images/mine/other1.png"),
      other2: require("@/assets/images/mine/other2.png"),
      other3: require("@/assets/images/mine/other3.png"),
      other4: require("@/assets/images/mine/other4.png"),
      clientManagement: require("@/assets/images/mine/clientManagement.png"),
      guaranteeSlip: require("@/assets/images/mine/guaranteeSlip.png"),
      inviteFriends: require("@/assets/images/mine/inviteFriends.png"),
      SmallShop: require("@/assets/images/mine/SmallShop.png"),
      team: require("@/assets/images/mine/team.png"),
      mingpian: require("@/assets/images/mine/mingpian.png"),
      userDetails:'', //用户信息
    };
  },
  props:['userinfo'],
  watch:{
      userinfo(newData,old){
          this.userDetails = newData;
      }
  },
  mounted() {
      console.log(this.userDetails)
  },
  methods: {}
};
</script>
<style lang="scss">
.van-grid-item__text {
  color: black !important;
}
.van-grid-item__content {
  border: none;
}
.mypolicy {
  .van-cell:not(:last-child)::after {
    border-bottom: none;
  }
  .van-cell {
    border-bottom: 1px solid #eee;
  }
  .policyList {
    .van-icon__image {
      // width: inherit;
      height: inherit;
      .van-image__img {
        width: 55px;
        height: 55px;
      }
    }
  }
  .becomeDlr {
    // border-top:1px solid #eee;
    .van-image {
      display: block;
      padding: 6px 30px 28px 30px;
    }
  }
  .otherList{
    margin-bottom: 80px;
  }
  .otherList,
  .MyServices {
    .van-cell__left-icon {
      .van-icon__image {
        width: 36px;
        height: inherit;
        vertical-align: top;
      }
    }
    .van-cell__title {
      span {
        font-size: 24px;
        color: #302d2d;
        margin-left: 10px;
      }
    }
  }
}
.van-grid-item__content::after {
  border: 0;
}
.colorBlock {
  height: 20px;
  background: #f5f5f5;
}
.MyAssets {
  a {
    color: #008cff;
    float: right;
  }
  .money {
    display: flex;
    justify-content: space-around;
    div {
      padding: 60px 0;
      flex: 1;
      p {
        text-align: center;
        font-size: 28px;
        span {
          font-size: 24px;
          font-weight: 400;
          color: rgba(143, 138, 138, 1);
        }
      }
      .sum {
        font-size: 36px;
        font-weight: bold;
        color: rgba(255, 132, 0, 1);
        line-height: 80px;
      }
    }
  }
}
</style>