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
            <span  class="list_02">{{baseInfo.startTimeName}} 00:00:00 - {{baseInfo.endTimeName}} 23:59:59</span>
          </li>
          <li>
            <span class="list_01">购买日期</span>
            <span  class="list_02">{{baseInfo.productCode}}</span>
          </li>
          <li>
            <span class="list_01">支付日期</span>
            <span  class="list_02">{{baseInfo.cbjgPath}}</span>
          </li>
          <li>
            <span class="list_01">保单金额</span>
            <span  class="list_02">{{baseInfo.totalFee}}元</span>
          </li>
           <li>
            <span class="list_01">投保份数</span>
            <span  class="list_02">{{baseInfo.policyTotal}}份</span>
          </li>
        </ul>
      </div>
      <!-- 投保人信息  HolerDataInfo-->
      <div class="holderInfo">
        <van-cell title="投保人信息" :icon="titleIcon2" />
        <ul>
          <li>
            <span class="list_01">投保人姓名</span>
            <span  class="list_02">{{HolerDataInfo.name}}</span>
          </li>
          <li>
            <span class="list_01">证件类型</span>
            <span  class="list_02">{{HolerDataInfo.sltstype}}</span>
          </li>
          <li>
            <span class="list_01">证件号码</span>
            <span  class="list_02">{{HolerDataInfo.txtsno}}</span>
          </li>
          <li>
            <span class="list_01">手机号</span>
            <span  class="list_02">{{HolerDataInfo.txtsphone}}</span>
          </li>
          <li>
            <span class="list_01">邮箱</span>
            <span  class="list_02">{{HolerDataInfo.txtsemail}}</span>
          </li>
        </ul>
      </div>
      <!-- 被保险人信息 -->
      <div class="inserdInfo" v-for="(InsurdItem,index0) in insurdDataInfo" :key="index0">
        <van-cell :title="getInsurdText(index0)" :icon="titleIcon3" />
        <ul>
          
          <li>
            <span class="list_01">保单号</span>
            <span  class="list_02">{{InsurdItem.policyNo}}</span>
          </li>
          <li>
            <span class="list_01">为谁投保</span>
            <span  class="list_02">{{InsurdItem.sltrel}}</span>
          </li>
          <li>
            <span class="list_01">姓名</span>
            <span  class="list_02">{{InsurdItem.name}}</span>
          </li>
          <li>
            <span class="list_01">证件类型</span>
            <span  class="list_02">{{InsurdItem.slthtype}}</span>
          </li>
          <li>
            <span class="list_01">证件号码</span>
            <span  class="list_02">{{InsurdItem.txthno}}</span>
          </li>
         
          <li>
            <span class="list_01">价格</span>
            <span  class="list_02">{{InsurdItem.price }}元</span>
          </li>


          <!-- 紫金家庭专用 -->
          <li v-if="InsurdItem.hasHouseholds">
            <span class="list_01">详细地址</span>
            <span  class="list_02">{{InsurdItem.households}}</span>
          </li>

          <li v-if="InsurdItem.isSocialSecurity">
            <span class="list_01">有无社保</span>
            <span  class="list_02">{{InsurdItem.isSocialSecurity}}</span>
          </li>
          <li v-if="InsurdItem.jobDescription">
            <span class="list_01">职业</span>
            <span  class="list_02">{{InsurdItem.jobDescription}}</span>
          </li>
          <li v-if="InsurdItem.vehicleLicenceCode">
            <span class="list_01">车牌号码</span>
            <span  class="list_02">{{InsurdItem.vehicleLicenceCode}}</span>
          </li>
          <li v-if="InsurdItem.brandModel">
            <span class="list_01">厂牌号码</span>
            <span  class="list_02">{{InsurdItem.brandModel}}</span>
          </li>
        </ul>
      </div>
      <div>
        <!-- 其他信息 -->
        <div class="otherInfo"  v-if="otherDataInfo.autoRenewalFlag=='1'">
          <van-cell title="其他信息" :icon="titleIcon4" />
          <ul>
            <li>
              <span class="list_01">是否自动续保</span>
              <span  class="list_02">{{otherDataInfo.autoRenewalFlag=="0" ? '否':'是'}}</span>
            </li>
            <li>
              <span class="list_01">持卡人姓名</span>
              <span  class="list_02">{{otherDataInfo.cardHolderName}}</span>
            </li>
            <li  >
              <span class="list_01">开户银行</span>
              <span  class="list_02">{{otherDataInfo.accountBankName}}</span>
            </li>
            <li >
              <span class="list_01">银行账户</span>
              <span  class="list_02">{{otherDataInfo.accountNo}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 受益人信息 -->
      <div class="otherInfo">
        <van-cell title="受益人信息" :icon="titleIcon5" />
        <ul>
          <li>
            <span class="list_01">受益人</span>
            <span  class="list_02">法定受益人</span>
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
      <div class="goodClauseList">
        <van-cell title="条款和告知" style="position: static;" />
        <div class="clause">
          <!-- <router-link :to="{name:'productTerms',query: {productId:productId,planId:planId}}">《产品条款》</router-link> -->
          <a
            v-for="(item,index) in goodClauseList"
            :key="index+1000"
            href="javascript:void(0)"
            @click="showFile(item.doc_pdf)"
          >《{{item.name}}》</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import api from "../../fetch/api";
export default {
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
        productCode: "",
        cbjgPath: "",
        totalFee: 0,
        policyTotal:''
      },
      HolerDataInfo: {
        name: "",
        sltstype: "",
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
      goodClauseList:[]//产品条款
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
      .post("/zbjj/Phone/queryMemberOrderDetail", {
        key: this.$route.query.orderNo
      })
      .then(res => {
        console.log(res);
        let response = res.data;
        //基本信息
        this_.baseInfo.oNumber = response.policy.oNumber;
        this_.baseInfo.startTimeName = response.policy.startTimeName;
        this_.baseInfo.endTimeName = response.policy.endTimeName;
        this_.baseInfo.productCode = response.policy.productCode;
        this_.baseInfo.cbjgPath = response.policy.cbjgPath;
        this_.baseInfo.totalFee = response.policy.totalFee / 100;
        this_.baseInfo.policyTotal = response.policy.policyTotal;

        //投保人信息
        this_.HolerDataInfo.name = response.policy.bPolicyHolder.txtsname;
        this_.HolerDataInfo.sltstype = response.policy.bPolicyHolder.sltstype;
        this_.HolerDataInfo.txtsno = response.policy.bPolicyHolder.txtsno;
        this_.HolerDataInfo.txtsphone = response.policy.bPolicyHolder.txtsphone;
        this_.HolerDataInfo.txtsemail = response.policy.bPolicyHolder.txtsemail;
        //被保险人信息 bPolicyInsuredList

        response.policy.bPolicyInsuredList.forEach((item, index) => {
          let insurdDataObj = {};
          insurdDataObj.name = item.txthname;
          insurdDataObj.policyNo =response.policy.interfaceCode == "ZhongAnHealthHome" ? item.policyNo : response.policy.extPolicyNo;
          insurdDataObj.sltrel = item.sltrel;
          insurdDataObj.slthtype = item.slthtype;
          insurdDataObj.txthno = item.txthno;
          insurdDataObj.price = response.policy.interfaceCode == "ZhongAnHealthHome" ? item.price  : response.policy.policyFee / 100;
          insurdDataObj.isSocialSecurity = item.isSocialSecurity;
          insurdDataObj.jobDescription = item.jobDescription;
          insurdDataObj.vehicleLicenceCode = item.vehicleLicenceCode;
          insurdDataObj.brandModel = item.brandModel;
          insurdDataObj.hasHouseholds = item.households!=null ? true : false;  //是否有详细地址---->紫金专用
          insurdDataObj.households = item.households;   //紫金家庭专用

          this.insurdDataInfo.push(insurdDataObj);
        });
        //其他信息
        this_.otherDataInfo.autoRenewalFlag = response.policy.autoRenewalFlag;
        this_.otherDataInfo.cardHolderName = response.policy.cardHolderName;
        this_.otherDataInfo.accountBankName = response.policy.accountBankName;
        this_.otherDataInfo.accountNo = response.policy.accountNo;

        //产品条款
        this.goodClauseList = response.clauseList

      });
  },
  methods: {
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
      layer.open({
        type: 1,
        title: "信息(点击“+”号放大查看条款)",
        area: ["100%", "100%"], //宽高
        content:
          "<iframe src='./static/pdf/web/viewer.html?file=" +
          encodeURIComponent(url)  +
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
.goodClauseList .van-cell:not(:last-child)::after{
  display: none;
}
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
          word-wrap:break-word; word-break:break-all;overflow: hidden;
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