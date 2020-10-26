<!-- 组件说明 个险保单详情-->
<template>
  <div class="personalDetail">
    <van-nav-bar title="详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="mainBox">
      <p class="productName">{{policyDetailView.goodName}}</p>
      <!-- 基本信息 -->
      <div class="essentInfo">
        <van-cell title="基本信息" :icon="titleIcon1" />
        <ul>
          <li>
            <span class="list_01">订单号</span>
            <span class="list_02">{{baseInfo.oNumber}}</span>
          </li>
          <li>
            <span class="list_01">保障期限</span>
            <span class="list_02">{{baseInfo.startTimeName}} - {{baseInfo.endTimeName}}</span>
          </li>
          <li>
            <span class="list_01">购买日期</span>
            <span class="list_02">{{baseInfo.productCode}}</span>
          </li>
          <li>
            <span class="list_01">投保份数</span>
            <span class="list_02">{{baseInfo.policyNum}}</span>
          </li>
          <li>
            <span class="list_01">保单金额</span>
            <span class="list_02">{{baseInfo.totalFee}}元</span>
          </li>
        </ul>
      </div>
      <!-- 投保人信息  HolerDataInfo-->
      <div class="holderInfo">
        <van-cell title="投保人信息" :icon="titleIcon2" />
        <ul>
          <li>
            <span class="list_01">投保人姓名</span>
            <span class="list_02">{{HolerDataInfo.name}}</span>
          </li>

          <li>
            <span class="list_01">证件号码</span>
            <span class="list_02">{{HolerDataInfo.txtsno}}</span>
          </li>
          <li>
            <span class="list_01">手机号</span>
            <span class="list_02">{{HolerDataInfo.txtsphone}}</span>
          </li>
          <li>
            <span class="list_01">邮箱</span>
            <span class="list_02">{{HolerDataInfo.txtsemail}}</span>
          </li>
        </ul>
      </div>
      <!-- 被保险人信息 -->
      <div class="inserdInfo" v-for="(InsurdItem,index0) in insurdDataInfo" :key="index0">
        <van-cell :title="getInsurdText(index0)" :icon="titleIcon3" />
        <ul>
            <li>
            <span class="list_01">保单号</span>
            <span class="list_02">{{InsurdItem.policyNo}}</span>
          </li>
          <li>
            <span class="list_01">姓名</span>
            <span class="list_02">{{InsurdItem.name}}</span>
          </li>
        

          <li>
            <span class="list_01">证件号码</span>
            <span class="list_02">{{InsurdItem.txthno}}</span>
          </li>

          <li>
            <span class="list_01">手机号</span>
            <span class="list_02">{{InsurdItem.txthphone}}</span>
          </li>
          <!-- <li>
            <span class="list_01">状态</span>
            <span class="list_02">{{InsurdItem.insereStatus}}</span>
          </li> -->
        </ul>
      </div>
      <div>
        <!-- 其他信息 -->
        <!-- <div class="otherInfo">
          <van-cell title="其他信息" :icon="titleIcon4" />
          <ul>
            <li>
              <span class="list_01">是否自动续保</span>
              <span>{{otherDataInfo.autoRenewalFlag=="0" ? '否':'是'}}</span>
            </li>
            <li v-if="otherDataInfo.autoRenewalFlag=='1'">
              <span class="list_01">持卡人姓名</span>
              <span>{{otherDataInfo.cardHolderName}}</span>
            </li>
            <li v-if="otherDataInfo.autoRenewalFlag=='1'">
              <span class="list_01">开户银行</span>
              <span>{{otherDataInfo.accountBankName}}</span>
            </li>
            <li v-if="otherDataInfo.autoRenewalFlag=='1'">
              <span class="list_01">银行账户</span>
              <span>{{otherDataInfo.accountNo}}</span>
            </li>
          </ul>
        </div>-->
      </div>
      <!-- 受益人信息 -->
      <div class="otherInfo">
        <van-cell title="受益人信息" :icon="titleIcon5" />
        <ul>
          <li>
            <span class="list_01">受益人</span>
            <span class="list_02">法定受益人</span>
          </li>
        </ul>
      </div>
      <!-- 保障责任 -->
      <!-- <div class="otherInfo">
                <van-cell title="保障责任" :icon="titleIcon6" />
                <ul>
                    <li>
                        <span>意外身故及伤残</span>
                        <span class="right_01">1万元</span>
                    </li>
                    <li>
                        <span>一般医疗保险金</span>
                        <span class="right_01">100万元</span>
                    </li>
                </ul>
      </div>-->
      <div>
        <van-cell title="条款和告知" style="position: static;" />
        <div class="clause">
          <!-- <router-link :to="{name:'productTerms',query: {productId:productId,planId:planId}}">《产品条款》</router-link> -->
          <a
            v-for="(item,index) in goodClauseList"
            :key="index+1000"
            href="javascript:void(0)"
            @click="showPDF(item.docAddress)"
          >《{{item.docOriginalName}}》</a>、
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import api from "../../fetch/api";
export default {
  name: "oldPeopleDetails",
  components: {},
  data() {
    return {
      titleIcon1: require("../../assets/images/others/personal1.png"),
      titleIcon2: require("../../assets/images/others/personal2.png"),
      titleIcon3: require("../../assets/images/others/personal3.png"),
      titleIcon4: require("../../assets/images/others/personal4.png"),
      titleIcon5: require("../../assets/images/others/personal5.png"),
      titleIcon6: require("../../assets/images/others/personal6.png"),
      orderNo: "",
      policyDetailView: "", //保单详情
      clause: "", //条款
      newClauseList: [], //最终使用的条款
      inserdList: "", //被保险人列表
      inserdInfo: "", //修改数据之后的被保险人信息
      link: this.$store.state.JumpPath, //页面跳转路径
      MapRelationShip: [], //中英文映射关系
      BaseData: [], //基础信息
      HolerData: {}, //最后要用的投保人对象，数据格式{'投保人姓名':'苗云页'}
      HolerDataSort: [], //最后要用的投保人对象，数据格式{'投保人姓名':'苗云页'} ,已经排序
      InsurdData: [], //最后要用的被保险人对象
      subjectData: {}, //最后要用的标的对象
      productId: "", //产品id
      planId: "", //计划id
      baseInfo: {
        oNumber: "",
        startTimeName: "",
        endTimeName: "",
        productCode: "", //购买日期
        policyNum: "", //投保份数
        totalFee: 0
      },
      HolerDataInfo: {
        name: "",
        txtsno: "",
        txtsphone: "",
        txtsemail: ""
      },
      insurdDataInfo: [],
      otherDataInfo: {
        autoRenewalFlag: "", //特殊处理
        cardHolderName: "",
        accountBankName: "",
        accountNo: ""
      },
      goodClauseList: [], //产品条款
    };
  },
  computed: {},
  mounted() {
    this.orderNo = this.$route.query.orderNo;
    var userId = this.getCookie("ZB_JUSER_Mid");
    var this_ = this;
    var args = { key: this.$route.query.key };
    var otherArr = [];
    var inserdArr = [];
    //获取保单详情
    this.$axios
      .post("/zbjj/Phone/queryIndustryInsuranceDetail", {
        orderNo: this.$route.query.orderId,
        orderType: "Old"
      })
      .then(res => {
        console.log(res);
        let response = res.data;
        //基本信息
        this_.baseInfo.oNumber = response.myIndustryOrderDetail.oNumber;
        this_.baseInfo.startTimeName =
          response.myIndustryOrderDetail.startTimeName;
        this_.baseInfo.endTimeName = response.myIndustryOrderDetail.endTimeName;
        this_.baseInfo.productCode = response.myIndustryOrderDetail.insereTime;
        this_.baseInfo.policyNum = response.myIndustryOrderDetail.policyTotal;
        this_.baseInfo.totalFee = response.myIndustryOrderDetail.totalFee / 100;

        //投保人信息
        this_.HolerDataInfo.name = response.myIndustryOrderDetail.txtsname;
        this_.HolerDataInfo.txtsno = response.myIndustryOrderDetail.txtsno;
        this_.HolerDataInfo.txtsphone =
          response.myIndustryOrderDetail.txtsphone;
        this_.HolerDataInfo.txtsemail =
          response.myIndustryOrderDetail.txtsemail;
        //被保险人信息 bPolicyInsuredList

        response.myIndustryOrderDetail.oldInserdList.forEach((item, index) => {
          let insurdDataObj = {};
          insurdDataObj.name = item.txthname;
          insurdDataObj.policyNo = item.policyNo;
          insurdDataObj.txthno = item.txthno;
          insurdDataObj.txthphone = item.txthphone;
          insurdDataObj.insereStatus = item.insereStatus;
          this.insurdDataInfo.push(insurdDataObj);
        });
      });
    this.getGoodClauseList();
  },
  methods: {
    getGoodClauseList() {
      let this_ = this;
      this.$axios
        .post("/zbjj/indusbase/listPuchaseFiles", {
          fromProject: "old",
          docTypes: 'mainRisks,addRisks, worker,server'
        })
        .then(res => {
          console.log(res);
          let clasuseList = res.data;
          this_.goodClauseList = clasuseList.data;
        });
    },
    getInsurdText(index) {
      return "被保险人信息" + (index + 1);
    },
    getColNameByArr(colcode) {
      //传入一个英文键，返回一个中文键
      let subjectList = this.MapRelationShip;
      let obj = {}; //数组里面的一个对象
      subjectList.forEach((item, index) => {
        if (item.colcode == colcode) {
          obj.name = item.colname;
          obj.sort = item.sort;
        }
      });
      if (!(JSON.stringify(obj) == "{}")) {
        return obj;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    showPDF(url) {
      let urlStart = url.split('.com')[0];
      let urlEnd = url.split('.com')[1];
      let urlResult = urlStart +'.com/hsFileData' +urlEnd;
      this.$showPDF(urlResult);
    },
    // 保单下载
    DownLoadPolicy(policyNumber, index0) {
      //在data属性中找到下载的地址
      let policyUrl = this.inserdList[index0].policyUrl;
      if (policyNumber) {
        //如果有保单号
        if (policyUrl == "") {
          layer.open({
            area: ["70%"],
            content: "请前往PC下载保单"
          });
        } else {
          layer.open({
            area: ["70%"],
            content:
              '<p>请点击<a href="' +
              policyUrl +
              '" style="color:#008cff;">' +
              policyUrl +
              "<a>前往下载保单</p>"
          });
        }
      }

     
    }
  }
};
</script>

<style lang='scss' scoped>
.personalDetail {
  background: #fff;
  .van-cell__title span{
    font-weight: 700!important;
  }
  .inserdInfo {
    position: relative;
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
      margin-bottom: 20px;
      padding-bottom: 20px;
      .van-icon {
        font-size: 42px;
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
        margin: 0 30px;
        color: #333;
        display: flex;
        .list_01 {
          width: 30%;
          display: inline-block;
        }
         .list_02 {
          width: 70%;
          display: inline-block;
        }
        .right_01 {
          float: right;
        }
        .lookPolicy {
          width: 120px;
          height: 40px;
          display: block;
          background: #008cff;
          line-height: 40px;
          color: #fff;
          font-size: 24px;
          position: absolute;
          right: 30px;
          top: 28px;
        }
      }
    }
  }
}
.clause {
  padding: 0 20px 20px;
  a {
    color: #008cff;
  }
}
</style>