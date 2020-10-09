<!-- 组件说明 保单预览-->
<template>
  <div class="DDBPreview">
    <van-nav-bar title="预览投保信息" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="mainBox">
      <p class="productName">{{goodName}}</p>
      <!-- 基本信息 -->
      <div class="essentInfo" v-if="configList != ''">
        <van-cell title="基本信息" :icon="titleIcon3" />
        <ul>
          <li>
            <span class="list_01">投保份数</span>
            <span>{{configList.orderPolicy.policyNum}}份</span>
          </li>
          <li>
            <span class="list_01">合计保费</span>
            <span>{{(configList.orderPolicy.policyFee/ 100).toFixed(2)}}元</span>
          </li>
          <li>
            <span class="list_01">起保日期</span>
            <span>{{configList.orderPolicy.startTime}}</span>
          </li>
          <li>
            <span class="list_01">结束日期</span>
            <span>{{configList.orderPolicy.endTime}}</span>
          </li>
        </ul>
      </div>
      <div class="blank10"></div>
      <!-- 投保人信息 -->
      <div class="holderInfo" v-if="configList != ''">
        <van-cell title="投保人信息" :icon="titleIcon5" />
        <ul>
          <li>
            <span class="list_01">投保人姓名</span>
            <span>{{configList.orderHolder.holderName}}</span>
          </li>
          <li>
            <span class="list_01">证件类型</span>
            <span>{{configList.orderHolder.holderCertificateType}}</span>
          </li>
          <li>
            <span class="list_01">证件号码</span>
            <span>{{configList.orderHolder.holderCertificateNo}}</span>
          </li>
          <li>
            <span class="list_01">出生日期</span>
            <span>{{configList.orderHolder.holderBirth.split(' ')[0]}}</span>
          </li>
          <li>
            <span class="list_01">性别</span>
            <span>{{configList.orderHolder.holderSex}}</span>
          </li>
          <li>
            <span class="list_01">证件有效期</span>
            <span>{{configList.orderHolder.certType}}</span>
          </li>
          <li v-if="configList.orderHolder.certType == '短期有效'">
            <span class="list_01">证件有效日期</span>
            <span>{{configList.orderHolder.certStartdate.split(' ')[0] + " - " + configList.orderHolder.certValidate.split(' ')[0]}}</span>
          </li>
          <li>
            <span class="list_01">手机号码</span>
            <span>{{configList.orderHolder.holderPhone}}</span>
          </li>
          <li>
            <span class="list_01">电子邮箱</span>
            <span>{{configList.orderHolder.holderMailbox}}</span>
          </li>
          <li>
            <span class="list_01">年收入</span>
            <span>{{JSON.parse(configList.orderHolder.elseJson).annualIncome}}万元</span>
          </li>
          <li>
            <span class="list_01">职业</span>
            <span>{{holderJobCode}}</span>
          </li>
          <li>
            <span class="list_01">省市区</span>
            <span>{{configList.orderHolder.holderAddress}}</span>
          </li>
        </ul>
      </div>
      <!-- 被保险人信息 -->
      <div class="otherInfo" v-if="configList != ''">
        <div class="blank10"></div>
        <van-cell title="被保人信息" :icon="titleIcon4" />
        <ul>
          <li>
            <span class="list_01">与投保人关系</span>
            <span>{{configList.orderInsuredList[0].insuredRelationship}}</span>
          </li>
          <li>
            <span class="list_01">被保险人名称</span>
            <span>{{configList.orderInsuredList[0].insuredName}}</span>
          </li>
          <li>
            <span class="list_01">证件类型</span>
            <span>{{configList.orderInsuredList[0].insuredCertificateType}}</span>
          </li>
          <li>
            <span class="list_01">证件号码</span>
            <span>{{configList.orderInsuredList[0].insuredCertificateNo}}</span>
          </li>
          <li>
            <span class="list_01">出生日期</span>
            <span>{{configList.orderInsuredList[0].insuredBirth}}</span>
          </li>
          <li>
            <span class="list_01">性别</span>
            <span>{{configList.orderInsuredList[0].insuredSex}}</span>
          </li>
          <li>
            <span class="list_01">证件有效期</span>
            <span>{{configList.orderInsuredList[0].certType}}</span>
          </li>
          <li v-if="configList.orderInsuredList[0].certType == '短期有效'">
            <span class="list_01">证件有效日期</span>
            <span>{{configList.orderInsuredList[0].certStartdate.split(' ')[0] + " - " + configList.orderInsuredList[0].certValidate.split(' ')[0]}}</span>
          </li>
          <li>
            <span class="list_01">手机号码</span>
            <span>{{configList.orderInsuredList[0].insuredPhone}}</span>
          </li>
          <li>
            <span class="list_01">职业</span>
            <span>{{insuredJobCode}}</span>
          </li>
        </ul>
      </div>
      <!-- 续费缴费信息 -->
      <div class="otherInfo" v-if="configList != ''">
        <div class="blank10"></div>
        <van-cell title="续费缴费信息" :icon="titleIcon4" />
        <ul>
          <li>
            <span class="list_01">持卡人姓名</span>
            <span>{{configList.orderHolder.holderName}}</span>
          </li>
          <li>
            <span class="list_01">手机号码</span>
            <span>{{configList.orderHolder.signingPhone}}</span>
          </li>
          <li>
            <span class="list_01">银行名称</span>
            <span>{{bankCode[configList.orderHolder.bankCode]}}</span>
          </li>
          <li>
            <span class="list_01">开户所在地</span>
            <span>{{signingBank}}</span>
          </li>
          <li>
            <span class="list_01">银行账号</span>
            <span>{{configList.orderHolder.accountNo}}</span>
          </li>
        </ul>
      </div>
      <!-- 默认受益人信息 -->
      <div class="otherInfo" v-if="configList && configList.orderBeneficiaryList.length == 0">
        <van-cell title="受益人信息" :icon="titleIcon5" />
        <ul>
          <li>
            <span class="list_01">受益人</span>
            <span>法定受益人</span>
          </li>
        </ul>
      </div>
      <!-- 指定受益人信息 -->
      <div class="otherInfo" v-else-if="configList && configList.orderBeneficiaryList.length != 0">
        <div v-for="(item,index) in configList.orderBeneficiaryList" :key="index">
          <div class="blank10"></div>
          <van-cell :title="configList.orderBeneficiaryList.length > 1 ? '受益人信息'+index : '受益人信息'" :icon="titleIcon4" />
          <ul>
            <li>
              <span class="list_01">与被保人关系</span>
              <span>{{item.beneficiaryRelationship}}</span>
            </li>
            <li>
              <span class="list_01">受益人姓名</span>
              <span>{{item.beneficiaryName}}</span>
            </li>
            <li>
              <span class="list_01">受益人证件类型</span>
              <span>{{item.beneficiaryCertificateType}}</span>
            </li>
            <li>
              <span class="list_01">受益人证件号码</span>
              <span>{{item.beneficiaryCertificateNo}}</span>
            </li>
            <li>
              <span class="list_01">证件有效期</span>
              <span>{{item.certType}}</span>
            </li>
            <li v-if="item.certType == '短期有效'">
              <span class="list_01">证件有效日期</span>
              <span>{{item.beneficiaryCertificateStartdate.split(' ')[0] + '-' + item.beneficiaryCertificateValidate.split(' ')[0]}}</span>
            </li>
            <li>
              <span class="list_01">受益人比例</span>
              <span>{{floatMultiply(item.beneficiaryRate,100)}}%</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="blank10"></div>
      <div>
        <li>
          <van-cell title="投保声明" class="InsuranceDeclaration" />
        </li>
        <li class="fileList">
          <p>
            <van-checkbox v-model="checked">本人已经了解并接受以下条款和告知</van-checkbox>
          </p>
          <div>
            <router-link
              :to="{name:'productTerms',query: {productName:goodName,planId:planId}}"
            >《产品条款》</router-link>
            <a
              v-for="(item , index) in newClauseList"
              href="javascript:void(0)"
              @click="ProviewImg(link + item.termFilePath)"
              :key="index"
            >《{{item.termName}}》</a>
          </div>
        </li>
      </div>
      <div style="padding-bottom:50px;"></div>
      <div class="fixBar">
        <van-tabbar id="polifyBar">
          <van-tabbar-item>
            共
            <span>{{configList == '' ? 1 : configList.orderPolicy.policyNum}}</span>份，合计:
            <span
              class="totalPrice"
            >￥{{configList == '' ? '' : (configList.orderPolicy.policyFee/ 100).toFixed(2)}}</span>
          </van-tabbar-item>
          <van-tabbar-item class="gobuy" @click="onPolicyPay()">确认支付</van-tabbar-item>
          <div class="cover"></div>
        </van-tabbar>
      </div>
    </div>
    <!-- 弹出遮罩层 -->
    <van-popup
      v-model="loadingShow"
      :lock-scroll="false"
      style="background-color: transparent;"
      :close-on-click-overlay="false"
    >
      <!-- 加载动画 -->
      <van-loading size="24px" vertical color="#1989fa">数据加载中...</van-loading>
    </van-popup>
    <!-- 图片条款弹出框 -->
    <van-popup v-model="clauseShow" :style="{ width:'100%',height: '100%'}"  closeable close-icon="close">
        <div :style="{ width:'100%',height: '100%',overflow:'scroll'}">
        <van-image :src="clausePath" :style="{ width:'100%'}">
            <template v-slot:loading>
                <van-loading type="spinner" size="20" />
            </template>
        </van-image>
        </div>
    </van-popup>
  </div>
</template>

<script>
import BeneficiaryPreview from "@/page/official/tianAn/BeneficiaryPreview";
import JiaChengPay from "@/page/official/pingAn/JiaChengPay";
import $ from "jquery";
import { Toast } from "vant";
import api from "@/fetch/api";
import {
  required,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
export default {
  name: "DDBPreview",
  components: { BeneficiaryPreview, JiaChengPay },
  data() {
    return {
      titleIcon1: require("@/assets/images/others/personal1.png"),
      titleIcon2: require("@/assets/images/others/personal2.png"),
      titleIcon3: require("@/assets/images/others/personal3.png"),
      titleIcon4: require("@/assets/images/others/personal4.png"),
      titleIcon5: require("@/assets/images/others/personal5.png"),
      titleIcon6: require("@/assets/images/others/personal6.png"),
      weiXinIcon: require("@/assets/images/weiXin.jpg"),
      zhiFuBaoIcon: require("@/assets/images/zhiFuBao.jpg"),
      link: this.$store.state.JumpPath, //pdf打开地址
      configList: "", // 所有预览信息
      goodName: "合众多多宝终身重大疾病保险", // 产品名称
      checked: false, //是否阅读协议及条款
      clauseList: "", //条款列表-->传递到下一个页面的
      newClauseList: [], //条款列表-->本页面真正的渲染的
      productId: "", //产品id
      planId: "", //计划id
      loadingShow: false, //支付动画
      holderJobCode: "", //投保人职业
      insuredJobCode: "", //被保人职业
      signingBank: "", //获取签约银行
      bankCode: this.$store.state.bankCode, // 银行类型
      brandId: "",  // 品牌id
      catId: "",  // 分类id
      typeId: "", // 类型id
      clauseShow: false, // 条款
      clausePath: '', //条款地址
    };
  },
  mounted() {
    // 删除cookie保存的 健康告知填写信息 以防下一个产品传入
    this.delCookie("healthAnswer");
    var that = this;
    // 获取产品id 判读那些字段要展示
    this.productId = this.$route.query.productId;
    this.planId = this.$route.query.planId;
    var Pid = this.$route.query.id;
    var args = this.sign({ orderId: Pid });
    // 获取投保预览信息
    api.duoduoyulan(args).then(res => {
      this.configList = res;
      // 获取产品详情，取brandId，catId，typeId 用来映射中文职业、省市区
      this.getProductDetails(()=>{
        //   获取投保人职业
        this.getProfession(
          JSON.parse(this.configList.orderHolder.elseJson).jobCode,
          "holderJobCode",
          "职业分类库"
        );

        //   获取被保人职业
        this.getProfession(
          this.configList.orderInsuredList[0].workTypeCode,
          "insuredJobCode",
          "职业分类库"
        );

        //   获取签约银行
        this.getProfession(
          this.configList.orderHolder.signingBank,
          "signingBank",
          "省市区库"
        );
      });
      

      // 可回溯 在生成订单加载的时候 执行
      var infor = {};
      infor.productVersion = "testversion"; //销售产品版本
      infor.orderSysSource = "1"; //来源
      infor.orderCode = res.orderNo; //此处传递对应的订单号
      _postParams(infor);
      console.log("可回溯 在生成订单加载的时候 执行传入订单号");
    });

    var params = this.sign({ planId: this.planId });
    // 获取投保声明条款
    api.getProdPolicyDown(params).then(res => {
      let data = res.data;
      that.clauseList = data;

      data.forEach(element => {
        let obj = {}; //开始组装对象
        if (element.termType == "3") {
          return;
        } else {
          obj["termName"] = element.termName;
          obj["termType"] = element.termType;
          obj["termFilePath"] = element.termFilePath;
        }

        //开始判断数组中有无该对象，有的话就不放进去
        let tag = that.newClauseList.find(item => {
          if (item.termType == obj.termType) {
            return true;
          } else {
            return false;
          }
        });

        //判断这个组装的对象到底要不要放到newClauseList里面
        if (!tag) {
          that.newClauseList.push(obj);
        }
      });
    });
  },
  methods: {
    // 获取产品详情，取brandId，catId，typeId 用来映射中文职业、省市区
    getProductDetails(callback){
      var args = this.sign({
        productId: this.getQueryString("productId")
      });
      api.getDetail(args).then(res => {
        if(res.code == 20000){
          this.brandId = res.data.prodGoods.brandId;  // 品牌id
          this.catId = res.data.prodGoods.catId; // 分类id
          this.typeId = res.data.prodGoods.typeId; // 类型id
          callback();
        }
      })
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // pdf在线预览
    ProviewImg(url) {
      this.clauseShow = true; // 条款
      this.clausePath = url; //条款地址
    },
    // 公用支付
    onPolicyPay() {
      let that = this;
      if (this.checked == false) {
        Toast("请同意条款和告知");
      } else {
        this.loadingShow = true;
        var params = this.sign({ orderId: this.$route.query.id });
        api.heZhongChengBao(params).then(res => {
          this.loadingShow = false;
          if (res.code == 1) {
            this.$router.push("paySuccess");
          } else {
            this.Toast(res.message);
          }
        });
      }
    },
    // 通过职业编码获取职业内容
    getProfession(jobCode, type, classLibraries) {
      var params = {
        brandId: this.brandId,
        catId: this.catId,
        typeId: this.typeId,
        templateName: classLibraries,
        code: $.trim(jobCode)
      };
      var Profession = "";
      api.queryByCode(this.sign(params)).then(res => {
        if (res.code == 20000) {
          if (type == "holderJobCode") {
            this.holderJobCode =
              res.data[0].ext1 +
              " " +
              res.data[0].ext3 +
              " " +
              res.data[0].ext5;
          } else if (type == "insuredJobCode") {
            this.insuredJobCode =
              res.data[0].ext1 +
              " " +
              res.data[0].ext3 +
              " " +
              res.data[0].ext5;
          } else if (type == "signingBank") {
            this.signingBank =
              res.data[0].ext2 +
              " " +
              res.data[0].ext4 +
              " " +
              res.data[0].ext6;
          }
        }
      });
    }
  }
};
</script>

<style lang='scss'>
.DDBPreview {
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
    .InsuranceDeclaration {
      margin-bottom: 0 !important;
      .van-cell__title {
        span {
          font-size: 30px !important;
          font-weight: 500 !important;
        }
      }
    }
    .van-cell {
      margin-bottom: 30px;
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
        min-height: 70px;
        margin: 0 30px 10px;
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
  .van-checkbox__icon .van-icon {
    border: solid 1px black;
  }
}
// 支付方式弹出框样式
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
  // 解决iphonex手机底部被黑色线条遮挡问题
  @supports (bottom: env(safe-area-inset-bottom)) {
    #polifyBar {
      bottom: env(safe-area-inset-bottom);
    }
    .cover {
      position: absolute;
      bottom: -1rem; // -env(safe-area-inset-bottom)
      width: 100%;
      height: 2rem;
      background: white;
      z-index: -1;
    }
  }
}
// 支付方式弹出框样式
</style>