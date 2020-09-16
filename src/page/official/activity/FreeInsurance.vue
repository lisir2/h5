<!-- 组件说明 免费赠送保险公共组件-->
<template>
  <div class="FreeInsurance">
    <van-nav-bar :title="productName" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="productDatails">
      <van-Image width="100%" :src="productImg" />
      <p class="productName">{{productName}}</p>
      <p class="desc" v-html="goodDetailsPromotionalCopy"></p>
      <div class="copies">
        <p>
          仅剩
          <span>{{getNumber}}</span>份
        </p>
        <div class="proportion" v-if="proportion">
          <van-progress
            :show-pivot="false"
            :percentage="(remainingNumber/(remainingNumber+getNumber)*100)"
            stroke-width="10"
            class="schedule"
            color="#F8D0AF"
          />
        </div>
        <van-button round type="info" class="FreeReceive" @click="FreeReceive()">免费领取</van-button>
        <div class="userHeadImg">
          <span v-for="(item,index) in userHeadImgList" :key="index">
            <van-image round :src="!item ? img : item" v-if="index <= 4" />
          </span>
          <span>
            <van-image round :src="more" v-if="userHeadImgList.length >= 4" />
          </span>
          <p>
            <span>{{remainingNumber}}</span>人已领取保障
          </p>
        </div>
        <div class="Deadline">
            <span>活动截止：{{DeadlineTime.split(' ')[0]}}</span>
        </div>
      </div>
    </div>
    <div class="colorBlock"></div>
    <!-- 保障清单 -->
    <div
      class="quota quotaCenter"
      v-if="typeof(this.planEnsureDetailMap) == 'object' ? (Object.keys(this.planEnsureDetailMap).length > 0 ? true : false) : false"
    >
      <span class="borderA"></span>
      <p class="titleA">保障清单</p>
    </div>
    <div
      class="guarantee"
      v-if="typeof(this.planEnsureDetailMap) == 'object' ? (Object.keys(this.planEnsureDetailMap).length > 0 ? true : false) : false"
    >
      <van-collapse accordion v-model="activeName">
        <van-collapse-item
          v-for="item in planEnsureDetailMap"
          :key="item.id"
          :title="item.ensureName"
          :value="item.insuranceAmount"
          :name="item.id"
          title-class="leftTitle"
          value-class="rightValue"
        >
          <p v-html="item.ensureContent"></p>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="colorBlock"></div>
    <!-- 产品详情 -->
    <detailGird v-if="response" :CommentsOrInsure="CommentsOrInsure"></detailGird>

    <div class="listContent">
      <div class="colorBlock"></div>
      <van-grid :column-num="4" icon-size="39px">
        <van-grid-item
          text="产品条款"
          icon="orders-o"
          :to="{name:'productTerms',query:{productName:this.productName,planId:this.planId}}"
        />
        <van-grid-item text="客户告知书" icon="notes-o" @click="showFile('khgzs.pdf')" />
        <van-grid-item text="保单样本" icon="newspaper-o" class="policySamples" />
        <van-grid-item
          text="常见问题"
          icon="warning-o"
          :to="{name:'commonProblem',query:{productId:this.productId}}"
        />
      </van-grid>
      <div class="colorBlock"></div>
      <a href="tel:400-693-8080">
        <div class="serverOnline">
          <span class="s1">7x24小时客服热线</span>
          <span class="s2">400-693-8080</span>
          <van-icon name="phone" />
        </div>
      </a>
      <div class="serverOnline1" id="serverOnline1" style="position:relative">
        <ul>
          <li>
            <van-image width="35" height="35" :src="orders" />
            <span>银保监会认证</span>
          </li>
          <li>
            <van-image width="35" height="35" :src="notes" />
            <span>保险公司授权</span>
          </li>
          <li>
            <van-image width="35" height="35" :src="newspaper" />
            <span>专业诚信20年+</span>
          </li>
        </ul>
      </div>
    </div>
    <EndModulWhite></EndModulWhite>

    <div class="ImmediatelyReceive">
      <li class="PdfList">
        <div>
          <van-checkbox v-model="checked">我已阅读并同意</van-checkbox>
          <p>
            <span
              style="color: rgb(0, 140, 255);"
              @click="showFile(link+item.termFilePath)"
              v-for="(item,index) in TermsList"
              :key="index"
            >《{{item.termName}}》{{index == (TermsList.length-1) ? '' : '、'}}</span>
          </p>
        </div>
      </li>
      <div class="acquireTab">
        <!-- //hsib.qiyukf.com/client?k=c5d6706f0d4f32b60dc4ba3aaa148b89&wp=1&robotShuntSwitch=1&robotId=139000 -->
        <router-link href="javascript:void(0)" to="/chat" class="service">
          <img src="../../../assets/images/detail/service.png" alt class="serviceImg" />
        </router-link>
        <div class="describe">
          <p>每人限领1份，多领无效</p>
        </div>
        <div class="gobuy" @click="ImmediatelyReceive()">立即领取</div>
      </div>
    </div>
    <!-- 底部填充层 -->
    <div class="tempBox"></div>
  </div>
</template>

<script>
import detailGird from "@/components/productDetailComponent/detailGird.vue";
import EndModulWhite from "@/components/endModulWhite.vue";
import api from "@/fetch/api";
import { Toast } from "vant";
export default {
  name: "FreeInsurance",
  components: {
    detailGird,
    EndModulWhite
  },
  data() {
    return {
      activeName: "",
      productImg: "",
      productName: "",
      remainingNumber: 0, //剩余份数
      getNumber: 0, //领取份数
      response: false,
      orders: require("../../../assets/images/home/about2.png"),
      notes: require("../../../assets/images/home/about3.png"),
      newspaper: require("../../../assets/images/home/about1.png"),
      checked: false,
      planEnsureDetailMap: [], //保障清单
      goodDetailsPromotionalCopy:'',
      productId: "", //产品id
      planId: "", //计划id
      isPremiumInsurance: "", //是否赠险
      giveNumber: "", // 赠送数量
      TermsList: "", //条款数组
      link: this.$store.state.JumpPath, //页面跳转路径
      userHeadImgList: [], //用户头像
      brandId: "",
      img: require("@/assets/images/mine/headimg.png"),
      more: require("@/assets/images/more.png"),
      proportion: false,
      CommentsOrInsure: "Insure", //子组件展示评论还是展示免费领取保险
      DeadlineTime:'',//活动截止时间
      startReceiveTime:'', //活动开始时间
    };
  },
  created() {
    let that = this;
    this.productId = this.getQueryString("productId");
    this.planId = this.getQueryString("planId");
    var args = this.sign({ productId: this.productId });
    // 产品详情
    api.getDetail(args).then(res => {
      if (res.code == 20000) {
        that.productImg = that.$store.state.baseImagePath + res.data.prodGoods.goodImg;
        that.brandId = res.data.prodGoods.brandId;
        that.productName = res.data.prodGoods.goodName; //产品名称
        that.goodDetailsPromotionalCopy = res.data.prodGoods.goodDetailsPromotionalCopy;//产品文案
        that.planEnsureDetailMap =
          res.data.prodPlanList[0].planEnsureDetailMap[this.planId]; //计划
        that.isPremiumInsurance = res.data.prodGoods.isPremiumInsurance; //是否赠险
        that.giveNumber = res.data.prodGoods.giveNumber; //赠送数量
        that.DeadlineTime = res.data.prodGoods.endReceiveTime; //活动截止时间
        that.startReceiveTime = res.data.prodGoods.startReceiveTime; //活动截止时间
        // 产品详情数据 提交到vuex里面
        that.$store.commit("setProductDetail", res);


        // 微信分享  具体分享在main.js 全局路由守卫里面
        if(that.is_weixn()){
          // 分享图片打包图片
          var ShareImage = that.$store.state.baseImagePath + res.data.prodGoods.goodImg;
          // 分享描述
          var descript = '海陆空全方位意外保障，一份心意，整年守护';
          // 分享title
          var title = '百万交通意外险，免费领！';
          // 分享链接
          var shareLink = location.href;
          this.$getSign(title, descript, ShareImage, shareLink);
        }

        that.response = true;
        that.skeleton = false;
        this.$nextTick(function() {
          $(".policySamples").click(function() {
            layer.open({
              type: 1,
              title: "信息(点击“+”号放大查看条款)",
              area: ["100%", "100%"], //宽高
              content:
                `<iframe src='./static/pdf/web/viewer.html?file=${window.location.origin}` +
                res.data.prodGoods.goodPolicySample +
                "' style='width:100%;height:100%'></iframe>"
            });
          });
        });
      } else {
        Toast(res.message);
      }
    });

    // 获取条款
    var args1 = this.sign({ planId: this.planId });
    api.getTerms(args1).then(res => {
      if (res.code == 20000) {
        that.TermsList = res.data;
        this.$nextTick(function() {
          var height = $(".PdfList").innerHeight() + 10;
          $(".tempBox").css("height", height + "px");
        });
      } else {
        Toast(res.message);
      }
    });

    // 获取领取保险数量
    var args2 = this.sign({ productId: this.productId });
    api.getReceiveDetails(args2).then(res => {
      if (res.code == 20000) {
        that.getNumber = res.data.surplusReceiveNum;
        that.remainingNumber = res.data.receiveNum;
        that.userHeadImgList = res.data.headUrlList.slice(-5);
        that.proportion = true;
      } else {
        Toast(res.message);
      }
    });
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // pdf本地预览
    showFile(url) {
      event.stopPropagation();
      layer.open({
        type: 1,
        title: "信息(点击“+”号放大查看条款)",
        area: ["100%", "100%"], //宽高
        content:
          "<iframe src='./static/pdf/web/viewer.html?file=" +
          url +
          "' style='width:100%;height:100%'></iframe>"
      });
    },
    // 免费领取
    FreeReceive() {
      $("html,body").animate(
        { scrollTop: this.$el.querySelector("#tabFourth").offsetTop - 54 },
        500
      );
    },
    // 领取保险
    ImmediatelyReceive() {
      var that = this;
      if ($("#insuredRelationship").val() == "") {
        this.$dialog.alert({
          message: "请选择为谁投保"
        });
        this.FreeReceive();
      } else if ($("#name").val() == "") {
        this.$dialog.alert({
          message: "请输入姓名"
        });
        this.FreeReceive();
      } else if (this.Utils.GetAge($("#IdNumber").val()) > 80) {
        this.$dialog.alert({
          message: "年龄不符合投保要求"
        });
        this.FreeReceive();
      } else if (
        $("#IdNumber").val() == "" ||
        this.Utils.isIdCard($("#IdNumber").val()) == false
      ) {
        this.$dialog.alert({
          message: "请输入正确的身份证号"
        });
        this.FreeReceive();
      } else if ($("#phone").val() == "") {
        this.$dialog.alert({
          message: "手机号码不能为空"
        });
        this.FreeReceive();
      } else if (this.Utils.isPhoneNumber($("#phone").val()) == false) {
        this.$dialog.alert({
          message: "请输入正确的手机号码"
        });
        this.FreeReceive();
      } else if ($("#email").val() == "") {
        this.$dialog.alert({
          message: "电子邮箱不能为空"
        });
        this.FreeReceive();
      } else if (this.Utils.isEmail($("#email").val()) == false) {
        this.$dialog.alert({
          message: "请输入正确的邮箱"
        });
        this.FreeReceive();
      } else if (this.checked == false) {
        this.Toast("请同意以下协议");
      } else {
        var args = this.sign({
          productId: this.productId,
          goodName: this.productName,
          planId: this.planId,
          brandId: this.brandId,
          receiveName: $("#name").val(),
          receiveCertificateNo: $("#IdNumber").val(),
          receivePhone: $("#phone").val(),
          receiveEmail: $("#email").val(),
          relationship: $("#insuredRelationship").val(),
          openId: this.getCookie("wxopenId"),
          mId: "",
          headUrl: decodeURIComponent(that.getCookie("headImgUrl")),
          endReceiveTime:this.DeadlineTime,
          startReceiveTime:this.startReceiveTime,
        });
        // 免费领取保险
        api.freeCollection(args).then(res => {
          if (res.code == 20000) {
            that.$router.push({ path: "/GetSuccess" });
          } else {
            that.$dialog.alert({
              message: res.message ? res.message : '错误'
            });
          }
        });
      }
    }
  },
  mounted() {
    var h=$(window).height();
    $(window).resize(function() {
      // 当前窗口加上100（苹果手机底部导航栏）
        if($(window).height()+100<h){
            $('.ImmediatelyReceive').hide();
        }
        if($(window).height()>=h){
            $('.ImmediatelyReceive').show();
        }
    });
  }
};
</script>

<style lang="scss">
.FreeInsurance {
  background: #fff;
  .tempBox{
    display: none;
  }
  .guarantee {
    .van-cell {
      .van-cell__value {
        color: black !important;
      }
    }
  }
  .leftTitle {
    flex: 2.3;
  }
  .van-grid {
    padding: 40px 0px 49px;
  }
  .productDatails {
    p {
      text-align: center;
    }
    .description {
      font-size: 26px;
      width: 60%;
      margin: auto;
    }
    .productName {
      font-size: 45px;
      font-weight: 800;
      padding: 10px 0;
    }
    .copies {
      .proportion {
        width: 250px;
        height: 20px;
        margin: auto;
        .schedule {
          height: 20px;
          border-radius: 10px;
        }
      }
      & > p {
        margin: 50px 0 26px;
        & > span {
          font-size: 50px;
          font-weight: 600;
          color: #e78500;
        }
      }
      .Deadline{
        text-align: right;
        padding: 30px 30px 20px;
        color: #323233;
        span{
          color: #969799;
          font-size: 26px;
        }
      }
      .userHeadImg {
        padding: 0 30px 0;
        margin: auto;
        text-align: center;
        .van-image {
          vertical-align: middle;
          width: 60px;
          height: 60px;
          border: solid 2px rgb(245, 245, 245);
          box-sizing: border-box;
        }
        span:nth-of-type(1){
          position: relative;
          z-index: 6;
        }
        span:nth-of-type(2){
          position: relative;
          z-index: 5;
        }
        span:nth-of-type(3){
          position: relative;
          z-index: 4;
        }
        span:nth-of-type(4){
          position: relative;
          z-index: 3;
        }
        span:nth-of-type(5){
          position: relative;
          z-index: 2;
        }
        span:nth-of-type(6){
          position: relative;
          z-index: 1;
        }
        span:nth-of-type(n + 2) > .van-image {
          margin-left: -18px;
        }
        p {
          display: inline;
          margin-left: 10px;
          vertical-align: middle;
          span {
            color: #e78500;
          }
        }
      }
    }
  }
  .van-tabbar {
    height: 100px;
  }
  .van-grid-item__content {
    padding: 0px;
  }
  .van-grid-item__content::after {
    border-bottom: none;
  }
  .van-grid-item:nth-of-type(4) .van-grid-item__content::after {
    border-bottom: none;
    border-right: none;
  }
  .van-grid-item__content::after {
    z-index: 1;
    border-width: 0 2px 1px 0;
  }

  .colorBlock {
    height: 20px;
    background: #f5f5f5;
  }
  .titleA {
    font-size: 34px;
    display: inline-block;
    color: #333;
    font-weight: 700;
    vertical-align: middle;
    margin-left: 10px;
  }
  .listContent {
    .van-grid-item__icon {
      font-size: 64px;
    }
    .van-grid-item__text {
      color: #333;
      margin-top: 20px;
      font-size: 26px;
    }
    .van-grid-item {
      color: red;
    }
    .serverOnline {
      height: 90px;
      text-align: center;
      border: 2px solid #040404;
      border-radius: 50px;
      padding: 8px 30px;
      margin: 40px 100px;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .s1 {
        flex: 2;
        font-size: 24px;
      }
      .s2 {
        flex: 4;
        vertical-align: top;
        font-size: 32px;
      }
      .van-icon {
        flex: 1;
        vertical-align: top;
        font-size: 40px;
        color: #8f8f8f;
      }
    }
    .serverOnline1 {
      margin: 0px 100px;
      margin-bottom: 20px;
      .van-image {
        display: inline-block;
        width: 70px;
        height: 70px;
      }
      span {
        font-size: 22px;
        color: #333;
      }
      ul {
        display: flex;
        li {
          flex: 1;
          text-align: center;
          span {
            display: block;
          }
        }
      }
    }
  }
  .ImmediatelyReceive {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: white;
    z-index: 100;
    .acquireTab {
      border-top: solid 1px #CCCCCC;
      display: flex;
      align-items: center;
      height: 100px;
      z-index: 100;
      .service {
        flex: 1.5;
        .serviceImg {
          width: 70px;
          display: block;
          margin: 20px auto 10px;
        }
      }
      .describe {
        flex: 5.2;
        p {
          font-size: 27px;
          color: #333333;
        }
      }
      .gobuy {
        flex: 3.3;
        background: #f9912e;
        line-height: 100px;
        text-align: center;
        color: white;
        font-weight: bold;
        font-size: 36px;
      }
      [class*="van-hairline"]::after {
        border-top: 3px solid #ebedf0;
      }
    }
  }
  .quota {
    padding: 30px 20px;
    .borderA {
      width: 8px;
      height: 34px;
      background: linear-gradient(
        150deg,
        rgba(96, 207, 250, 1),
        rgba(56, 164, 255, 1)
      );
      border-radius: 8px;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .FreeReceive {
    display: block;
    margin: 66px auto 37px;
    width: 450px;
    height: 88px;
    background: #f9912e;
    border: #f9912e;
  }
  .PdfList {
    display: none;
    height: auto;
    padding: 10px 15px;
    line-height: normal;
    border-bottom: 0;
    box-sizing: border-box;
    box-shadow:  3px -1px 6px 0px #CCCCCC;
    span {
      font-size: 26px;
    }
    a {
      color: #16a8d1;
    }
    .van-checkbox {
      display: -webkit-box;
      flex: none;
      -webkit-box-align: start;
      vertical-align: middle;
      // margin-top: -6px;
      margin-left: 10px;
      .van-checkbox__icon {
        font-size: 32px;
        margin-top: 5px;
      }
      .van-checkbox__label {
        margin-left: 15px;
      }
    }
    .van-checkbox__icon .van-icon {
      border: solid 2px black;
    }
  }
  .van-button--large {
    width: 100%;
    height: 50px;
    line-height: 48px;
  }
}
</style>