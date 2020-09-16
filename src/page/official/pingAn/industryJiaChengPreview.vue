<!-- 组件说明 平安驾乘人人巴士过来的保单预览 -->
<template>
  <div class="policyPreview">
    <van-nav-bar title="预览投保信息" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="mainBox">
      <p class="productName">平安驾乘意外伤害保险</p>
      <!-- 基本信息 -->
      <div class="essentInfo">
        <van-cell title="基本信息" :icon="titleIcon3" />
        <ul>
          <li>
            <span class="list_01">起保日期</span>
            <span>{{previewData.startTime}}</span>
          </li>
          <li>
            <span class="list_01">结束日期</span>
            <span>{{previewData.endTime}}</span>
          </li>
          <li>
            <span class="list_01">投保份数</span>
            <span>1份</span>
          </li>
          <li>
            <span class="list_01">合计保费</span>
            <span>{{previewData.policyFee}}元</span>
          </li>
        </ul>
      </div>
      <div class="blank10"></div>
      <!-- 投保人信息 -->
      <div class="holderInfo">
        <van-cell title="投保人信息" :icon="titleIcon5" />
        <ul>
          <li>
            <span class="list_01">投保人姓名</span>
            <span>{{previewData.holderName}}</span>
          </li>
          <li>
            <span class="list_01">证件类型</span>
            <span>{{previewData.holderCertificateType}}</span>
          </li>
          <li>
            <span class="list_01">证件号码</span>
            <span>{{previewData.holderCertificateNo}}</span>
          </li>
          <li>
            <span class="list_01">手机号码</span>
            <span>{{previewData.holderPhone}}</span>
          </li>
          <li>
            <span class="list_01">邮箱</span>
            <span>{{previewData.holderMailbox}}</span>
          </li>
          <li v-if="previewData.linkManName != '' && previewData.linkManName != null">
            <span class="list_01">联系人姓名</span>
            <span>{{previewData.linkManName}}</span>
          </li>
        </ul>
      </div>
      <!-- 被保险人信息 -->
      <div>
        <!-- 被保险人信息里面包含其他信息，如果没有被保险人信息和其他信息，则被保险人title不展示，如果被保险人里面只有other，则被保险人title不展示 -->
        <div class="otherInfo">
          <div class="blank10"></div>
          <van-cell title="被保险人信息" :icon="titleIcon4" />
          <ul v-if="previewData.list">
            <div v-for="(item,index) in previewData.list" :key="index">
              <li>
                <span class="list_01">座位数</span>
                <span>{{item.virtualInsuredNum}}</span>
              </li>
              <li>
                <span class="list_01">车架号</span>
                <span>{{item.vehicleFrameNo}}</span>
              </li>
              <li>
                <span class="list_01">发动机号</span>
                <span>{{item.engineNo}}</span>
              </li>
              <li>
                <span class="list_01">车牌号</span>
                <span>{{item.vehicleLicenceCode}}</span>
              </li>
            </div>
          </ul>
          <ul v-else>
            <div>
              <li>
                <span class="list_01">座位数</span>
                <span>{{previewData.virtualInsuredNum}}</span>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div class="blank10"></div>
      <!-- 受益人信息 -->
      <div class="otherInfo">
        <van-cell title="受益人信息" :icon="titleIcon5" />
        <ul>
          <li>
            <span class="list_01">受益人</span>
            <span>法定受益人</span>
          </li>
        </ul>
      </div>
      <div class="blank10"></div>
      <div>
        <li>
          <van-cell title="投保声明" />
        </li>
        <li class="fileList">
          <p>
            <van-checkbox v-model="checked">本人已经了解并接受以下条款和告知</van-checkbox>
          </p>
        </li>
      </div>
      <div style="padding-bottom:50px;"></div>
      <div class="fixBar">
        <van-tabbar>
          <van-tabbar-item>
            共
            <span>1</span>份，合计:
            <span class="totalPrice">￥{{policyFee}}</span>
          </van-tabbar-item>
          <van-tabbar-item class="gobuy" @click="paymentPopup()">确认支付</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
    <!-- 平安驾乘支付弹框 -->
    <JiaChengPay
      :payShow="payShow"
      :policyFee="policyFee"
      @payShow="changePayShow($event)"
      :isRenRen="true"
      :goodName="goodName"
    ></JiaChengPay>
  </div>
</template>

<script>
import api from "../../../fetch/api";
import JiaChengPay from "../../../page/official/pingAn/JiaChengPay";
export default {
  name: "industryJiaChengPreview",
  components: { JiaChengPay },
  data() {
    return {
      titleIcon1: require("../../../assets/images/others/personal1.png"),
      titleIcon2: require("../../../assets/images/others/personal2.png"),
      titleIcon3: require("../../../assets/images/others/personal3.png"),
      titleIcon4: require("../../../assets/images/others/personal4.png"),
      titleIcon5: require("../../../assets/images/others/personal5.png"),
      titleIcon6: require("../../../assets/images/others/personal6.png"),
      weiXinIcon: require("../../../assets/images/weiXin.jpg"),
      zhiFuBaoIcon: require("../../../assets/images/zhiFuBao.jpg"),
      orderNo: "", //订单号
      previewData: "", //预览数据
      checked: false, //是否同意协议
      payShow: false, //支付方式显示隐藏
      policyFee: "", //价格
      goodName: this.getQueryString("goodName")
    };
  },
  computed: {},
  mounted() {
    // 可回溯 在生成订单加载的时候 执行
    var infor = {};
    infor.productVersion = "testversion"; //销售产品版本
    infor.orderSysSource = "1"; //来源
    infor.orderCode = this.$route.query.id; //此处传递对应的订单号
    _postParams(infor);
    console.log("可回溯 在生成订单加载的时候 执行传入订单号");

    this.orderNo = this.getQueryString("orderNo");
    var args = this.sign({ orderNo: this.orderNo });
    api.renrenPreviewData(args).then(res => {
      // this.$axios.post('/org/openapi/Order/renrenPreviewData',args).then(res=>{//林彰淼核保接口
      var result = res;
      if (result.success) {
        this.previewData = result;
        this.policyFee = result.policyFee;
      }
    });
  },
  methods: {
    // 返回上一步
    onClickLeft() {
      this.$router.go(-1);
    },
    // 支付方式
    paymentPopup() {
      if (this.checked) {
        this.payShow = true;
      } else {
        this.Toast("请同意条款和告知");
      }
    },
    //子组件改变父组件 平安驾乘支付方式弹出框显示状态
    changePayShow(isBoole) {
      this.payShow = isBoole;
    }
  }
};
</script>

<style lang='scss'>
.policyPreview {
  background: #fff;
  .van-icon__image {
    height: 100%;
  }
  .productName {
    margin: 32px;
    font-size: 32px;
    color: #333;
    font-weight: bold;
  }
  .blank10 {
    height: 20px;
    background: #f7f7f7;
  }
  div {
    .van-cell {
      margin-bottom: 30px;
      .van-icon {
        .van-icon__image {
          width: 38px;
          height: 38px;
        }
      }
      .van-cell__title {
        span {
          font-size: 32px;
          color: #333;
          font-weight: 600;
        }
      }
      .van-cell__left-icon {
        line-height: 44px;
      }
    }
    ul {
      li {
        height: 80px;
        line-height: 40px;
        margin: 0 30px;
        color: #333;
        display: flex;
        justify-content: flex-start;
        .list_01 {
          width: 30% !important;
          display: inline-block;
        }
        & > span:nth-of-type(2) {
          width: 65%;
        }
        .right_01 {
          float: right;
        }
        .lookPolicy {
          width: 120px;
          height: 40px;
          background: #008cff;
          line-height: 40px;
          color: #fff;
          float: right;
          margin-top: 16px;
          font-size: 24px;
        }
      }
    }
  }
  .fixBar {
    .van-tabbar-item__icon {
      display: none;
    }
    .van-tabbar {
      height: 100px;
      line-height: 100px;
    }
    .van-tabbar-item--active {
      color: #666;
    }
    .van-tabbar-item:nth-child(2) {
      flex: 1;
      color: #333;
    }
    .totalPrice {
      font-size: 36px;
      font-weight: 600;
      color: #f9912e;
    }
    .gobuy {
      background: #f9912e;
      .van-tabbar-item__text {
        color: #fff;
        font-size: 36px;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 100px;
        font-weight: bold;
      }
    }
  }
}
.fileList {
  p {
    margin-bottom: 20px;
  }
  height: auto;
  padding: 0 30px;
  line-height: normal;
  border-bottom: 0;

  a {
    color: #16a8d1;
  }
  .van-checkbox {
    // display: inline-block;
    vertical-align: middle;
    // margin-top: -6px;
    margin-left: 10px;
    .van-checkbox__icon {
      font-size: 32px;
    }
    .van-checkbox__label {
      margin-left: 15px;
    }
  }
}
.paySelect {
  .van-icon {
    font-size: 36px !important;
  }
}
.plyIcon {
  width: 60px;
  margin-right: 30px;
}
.paymentProcedure {
  padding: 25px 35px;
  font-size: 28px;
}
.amountPayable {
  line-height: 40px;
  overflow: hidden;
  padding: 25px 35px;
  span:nth-of-type(1) {
    float: left;
    font-size: 28px;
  }
  span:nth-of-type(2) {
    float: right;
    font-size: 28px;
  }
  .van-checkbox__icon .van-icon {
    border: solid 1px black;
  }
}
</style>