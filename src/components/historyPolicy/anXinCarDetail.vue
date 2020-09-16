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
            <span class="list_01">车牌号</span>
            <span class="list_02">{{baseInfo.plateNo}}</span>
          </li>
          <li>
            <span class="list_01">订单状态</span>
            <span class="list_02">{{baseInfo.policyStatus}}</span>
          </li>
          <li>
            <span class="list_01">发动机号</span>
            <span class="list_02">{{baseInfo.engineNo}}</span>
          </li>
          <li>
            <span class="list_01">品牌型号</span>
            <span class="list_02">{{baseInfo.brandNo}}</span>
          </li>
          <li>
            <span class="list_01">保障期限</span>
            <span class="list_02">{{baseInfo.guaranteeBeginDate}} - {{baseInfo.guaranteeEndDate}}</span>
          </li>
          <li>
            <span class="list_01">车架号</span>
            <span class="list_02">{{baseInfo.frameNo}}</span>
          </li>
          <li>
            <span class="list_01">支付保费</span>
            <span class="list_02">{{baseInfo.policyFee}}元</span>
          </li>
        </ul>
      </div>
      <!-- 投保人信息  HolerDataInfo-->
      <div class="holderInfo">
        <van-cell title="交通事故强制险" :icon="titleIcon2" />
        <ul>
          <li>
            <span class="list_01">保单号</span>
            <span class="list_02">{{HolerDataInfo.policyNo}}</span>
          </li>

          <li>
            <span class="list_01">机动车交通事故强制责任险</span>
            <span class="list_02">{{HolerDataInfo.forceFee}}</span>
          </li>
          <li>
            <span class="list_01">车船税</span>
            <span class="list_02">{{HolerDataInfo.taxFee}}</span>
          </li>
        </ul>
      </div>
      <!-- 被保险人信息 -->
      <!-- <div class="inserdInfo" v-for="(InsurdItem,index0) in insurdDataInfo" :key="index0">
        <van-cell :title="getInsurdText(index0)" :icon="titleIcon3" />
        <ul>
          <li>
            <span class="list_01">姓名</span>
            <span>{{InsurdItem.name}}</span>
          </li>

          <li>
            <span class="list_01">证件号码</span>
            <span>{{InsurdItem.txthno}}</span>
          </li>

          <li>
            <span class="list_01">手机号</span>
            <span>{{InsurdItem.txthno}}</span>
          </li>
        </ul>
      </div>-->
      <div>
        <!-- 其他信息 -->
        <div class="otherInfo">
          <van-cell title="商业险" :icon="titleIcon4"   :value="otherDataInfo.businessPolicyFee"/>
          <ul>
            <li>
              <span class="list_01">保单号</span>
              <span class="list_02">{{otherDataInfo.businessPolicyNo}}</span>
            </li>
            
            <table class="guarantee-table">
              <thead>
                <tr style="padding:10px 0px">
                  <td width="50%" style="padding:10px 0px;font-weight: bold;">保障项目</td>
                  <td width="20%" style="padding:10px 0px;font-weight: bold;">免赔</td>
                  <td width="30%" style="padding:10px 0px;font-weight: bold;" align="center">保额</td>
                </tr>
              </thead>
              <tbody v-html="otherDataInfo.businessGguaranteeWrap"></tbody>
            </table>
          </ul>
        </div>
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
           <!-- <router-link :to="{name:'productTerms',query: {productId:productId,planId:planId}}">《产品条款》</router-link>  -->
          <a
            v-for="(item,index) in goodClauseList"
            :key="index+1000"
            href="javascript:void(0)"
            @click="showFile(item.docAddress)"
          >《{{item.docOriginalName}}》</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from "vant";
import $ from "jquery";
import api from "../../fetch/api";
export default {
  name: "anXinCarDetail",
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
        plateNo: "",
        policyStatus: "",
        engineNo: "",
        brandNo: "",
        guaranteeBeginDate: "",
        guaranteeEndDate: "",
        frameNo: "",
        policyFee: ""
      },
      HolerDataInfo: {
        //交通事故强制险
        policyNo: "",
        forceFee: "",
        taxFee: ""
      },
      otherDataInfo: {
        //商业险
        businessPolicyNo: "", //保单号
        businessPolicyFee: "", //保费
        businessGguaranteeWrap: "" //表格文本
      },
      goodClauseList: [
        {
          docAddress:"https://www.zgbxjj.com/showImage?imgId=/attachment/insuranceClause/201901111628105279.pdf",
          docOriginalName:'机动车交通事故责任强制保险条款'
        },
        {
          docAddress:"https://www.zgbxjj.com/showImage?imgId=/attachment/insuranceClause/201901111629032175.pdf",
          docOriginalName:'机动车综合商业保险示范条款'
        }
      ] //产品条款
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
      .post("/zbjj/Phone/queryCarInsuranceDetail", {
        orderNo: this.$route.query.orderId,
        orderType: "AX",
        goodId: 359 // 测试环境359
      })
      .then(res => {
        console.log(res);
        let response = res.data;
        //基本信息
        let policyStatus = ""; //订单状态
        switch (response.myCarOrderDetail.order_status) {
          case "4":
            policyStatus = "订单已支付并承保";
            break;
          case "3":
            policyStatus = "订单已支付";
            break;
          case "2":
            policyStatus = "订单未支付";
            break;
          case "1":
            policyStatus = "订单创建";
            break;
        }
        this_.baseInfo.plateNo = response.myCarOrderDetail.c_plate_no;
        this_.baseInfo.policyStatus = policyStatus;
        this_.baseInfo.engineNo = response.myCarOrderDetail.c_eng_no;
        this_.baseInfo.brandNo = response.myCarOrderDetail.c_vehicle_name;
        this_.baseInfo.guaranteeBeginDate =
          response.myCarOrderDetail.tSy_insrnc_bgnTm;
        this_.baseInfo.guaranteeEndDate =
          response.myCarOrderDetail.tSy_insrnc_endTm;
        this_.baseInfo.frameNo = response.myCarOrderDetail.LFMBEC4D2E0251311;
        this_.baseInfo.policyFee = response.myCarOrderDetail.pay_amt /100;

        //交通事故强制险
        this_.HolerDataInfo.policyNo = response.myCarOrderDetail.c_JqPly_No;
        let resCarDetails = JSON.parse(response.myCarOrderDetail.response_msg);
        let resJQ = resCarDetails.CarQuotePriceResponseMain.PackageJQVO;

        if (resJQ && resJQ.CvrgList) {
          this_.HolerDataInfo.forceFee = resJQ.CvrgList.CvrgVO.nPrm;

          this_.HolerDataInfo.taxFee = resJQ.VsTaxVO.nAggTax;
        }

        //商业险
        this_.otherDataInfo.businessPolicyNo =
          response.myCarOrderDetail.c_SyPly_No;

        var resSY = resCarDetails.CarQuotePriceResponseMain.PackageSYVO;
        this_.otherDataInfo.businessPolicyFee ="保费：" + resSY.nPrm + "元";

        let businessCodeArr = resSY.CvrgList.CvrgVO;

        let businessHtml = "";
        $.each(businessCodeArr, function(i, v) {
          v.coverageText = "";
          v.coverageCode = v.cCustCvrgNme;
          if (v.cDductMrk == "369003") {
            v.coverageText = "不计免赔";
          }
          v.coveragePreimum = v.nAmt ? v.nAmt : "****";
          businessHtml += this_.renderBusinessGuarantee(v);
        });
        this_.otherDataInfo.businessGguaranteeWrap = businessHtml;


        // // 产品条款、保单样本
        // var productItemsArr = response.clauseList;
        // var policySample;
        // if (response.goods && response.goods.p23) {
        //   policySample = response.goods.p23;
        // }
        // getCarProductItems(productItemsArr, policySample);
      });
  },
  methods: {
    //  渲染商业险保障项目
    renderBusinessGuarantee(data) {
      var html = "";
      html +=
        "<tr>" +
        "<td style='padding:10px 0px'>" +
        data.coverageCode +
        "</td>" +
        "<td>" +
        data.coverageText +
        "</td>" +
        '<td align="center">' +
        data.coveragePreimum +
        "</td>" +
        "</tr>";
      return html;
    },
    getGoodClauseList() {
      let this_ = this;
      this.$axios
        .post("/zbjj/indusbase/listPuchaseFiles", {
          fromProject: "repaircar",
          docTypes: "mainRisks,addRisks,worker,server"
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
    showFile(url) {
       let urlStart = url.split('.com')[0];
      let urlEnd = url.split('.com')[1];
      let urlResult = urlStart +'.com/hsFileData' +urlEnd
      layer.open({
        type: 1,
        title: "信息(点击“+”号放大查看条款)",
        area: ["100%", "100%"], //宽高
        content:
          "<iframe src='./static/pdf/web/viewer.html?file=" +
         encodeURIComponent(urlResult) +
          "' style='width:100%;height:100%'></iframe>"
      });
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
  .guarantee-table {
    margin: 0px 30px;
    color: #333;
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