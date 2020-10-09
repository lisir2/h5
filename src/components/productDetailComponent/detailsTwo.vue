<!-- 组件说明 -->
<template>
  <div class="detailsTwo">
    <!-- 计划列表 -->
    <div class="planBox" v-show="listLength">
      <div class="quota">
        <span class="borderA"></span>
        <p class="titleA">保障计划</p>
      </div>
      <div class="quotaList">
        <van-button
          type="info"
          size="small"
          v-for="(item,index) in prodPlanList"
          :key="item.id"
          :name="item.id"
          :class="(activity == index) ? 'planBtn' : 'NoActive'"
          @click="changeQuota(item.id,index)"
        >{{item.planName}}</van-button>
      </div>
    </div>
    <div class="colorBlock" v-show="listLength"></div>
    <!-- 切换计划获取计划对应的规格值 :lazy-render='false' 非常重要 如果加上在没有弹出的时候也可以获取 popup里面的dom元素 否则获取不到无法价格试算-->
    <van-popup
      v-model="specificationShow"
      class="popuoButton"
      closeable
      round
      position="bottom"
      :style="{ height: '80%'}"
      :lazy-render="false"
    >
      <!-- 多多宝特殊规格 -->
      <DDB_Specification
        ref="DDB_Specification"
        v-if="(goodName == '合众多多宝终身重大疾病保险' && planId != '')"
        :planId="planId"
        :prodPlanList_second="prodPlanList_second"
        v-on:Prices="Prices"
      >
        <!-- 代理人分享tabbar -->
        <ProductFixBar
          :IsAgentShare="IsAgentShare"
          :agentUserInfo="agentUserInfo"
          :priceResult="priceResult"
          :preparation="preparation"
          :WhetherTheShelf="WhetherTheShelf"
          :WhetherBuy="WhetherBuy"
          :SetInsuranceConsultantShow="SetInsuranceConsultantShow"
          :SetWxShareShow="SetWxShareShow"
          :showPopup="showPopup"
        ></ProductFixBar>
        <!-- 代理人分享tabbar -->
      </DDB_Specification>
      <!-- 妈咪宝贝特殊规格 -->
      <MaMi_Specification
        ref="MaMi_Specification"
        v-else-if=" (goodName == '复星联合妈咪保贝少儿重大疾病保险' && planId != '')"
        :planId="planId"
        :prodPlanList_second="prodPlanList_second"
        @popupLogin="popupLogin"
        v-on:Prices="Prices"
      >
        <!-- 代理人分享tabbar -->
        <ProductFixBar
          :IsAgentShare="IsAgentShare"
          :agentUserInfo="agentUserInfo"
          :priceResult="priceResult"
          :preparation="preparation"
          :WhetherTheShelf="WhetherTheShelf"
          :WhetherBuy="WhetherBuy"
          :SetInsuranceConsultantShow="SetInsuranceConsultantShow"
          :SetWxShareShow="SetWxShareShow"
          :showPopup="showPopup"
        ></ProductFixBar>
        <!-- 代理人分享tabbar -->
      </MaMi_Specification>
      <!-- 康乐一生特殊规格 -->
      <kLYS_Specification
        ref="kLYS_Specification"
        v-else-if=" (goodName == '复星联合康乐一生重大疾病保险（B款升级款）' && planId != '')"
        :planId="planId"
        :prodPlanList_second="prodPlanList_second"
        @popupLogin="popupLogin"
        v-on:Prices="Prices"
      >
        <!-- 代理人分享tabbar -->
        <ProductFixBar
          :IsAgentShare="IsAgentShare"
          :agentUserInfo="agentUserInfo"
          :priceResult="priceResult"
          :preparation="preparation"
          :WhetherTheShelf="WhetherTheShelf"
          :WhetherBuy="WhetherBuy"
          :SetInsuranceConsultantShow="SetInsuranceConsultantShow"
          :SetWxShareShow="SetWxShareShow"
          :showPopup="showPopup"
        ></ProductFixBar>
        <!-- 代理人分享tabbar -->
      </kLYS_Specification>
      <!-- 普通规格 -->
      <GeneralSpecification
        v-else
        :prodPlanList_second="prodPlanList_second"
        :priceResult="priceResult"
        :activitySpecifications="activitySpecifications"
        ref="GeneralSpecification"
      >
        <!-- 代理人分享tabbar -->
        <ProductFixBar
          :IsAgentShare="IsAgentShare"
          :agentUserInfo="agentUserInfo"
          :priceResult="priceResult"
          :preparation="preparation"
          :WhetherTheShelf="WhetherTheShelf"
          :WhetherBuy="WhetherBuy"
          :SetInsuranceConsultantShow="SetInsuranceConsultantShow"
          :SetWxShareShow="SetWxShareShow"
          :showPopup="showPopup"
        ></ProductFixBar>
        <!-- 代理人分享tabbar -->
      </GeneralSpecification>
    </van-popup>
    <!-- 保障清单 -->
    <div class="quota quotaCenter">
      <span class="borderA"></span>
      <p class="titleA">保障清单</p>
    </div>
    <div class="guarantee">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item
          v-for="item in planEnsureDetailList"
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
      <div class="commission" v-if="currIsAgent && commissionRatio != '' && CommissionSwitch">
        <span>¥ {{priceResult}}</span>
        <button @click="specificationShow = true;">保费试算</button>
        <!-- 直接佣金、限时佣金，配置为0不展示 -->
        <p @click="commission_show = true;">{{commissionRatio}}</p>
      </div>
    </div>
    <div class="colorBlock"></div>
    <!-- 贴心服务 -->
    <div class="quota quotaCenterOfService">
      <span class="borderA"></span>
      <p class="titleA">贴心服务</p>
    </div>
    <div class="heartserve">
      <ul>
        <li v-for="item in prodIntimateServiceList" :key="item.id">
          <van-cell :title="item.serviceTitleName" :to='{path: "/intimateService",query: { goodId: goodId }}' icon="checked" />
        </li>
      </ul>
    </div>
    <div class="colorBlock"></div>
    <!-- 产品介绍/干货科普 -->
    <div class="heartserve_bottom">
      <a v-for="item in questionList" :key="item.id" :href="item.articleUrl">
        <van-cell is-link :value="item.articleName">
          <template slot="title">
            <van-tag :type="item.articleTag == '干货科普' ? 'normal' : 'danger'">{{item.articleTag}}</van-tag>
          </template>
        </van-cell>
      </a>
    </div>
    <div class="colorBlock" v-if="questionList.length>=1"></div>
    <!-- 详情页底部投保区 -->

    <!-- 代理人分享tabbar -->
    <ProductFixBar
      :IsAgentShare="IsAgentShare"
      :agentUserInfo="agentUserInfo"
      :priceResult="priceResult"
      :preparation="preparation"
      :WhetherTheShelf="WhetherTheShelf"
      :WhetherBuy="WhetherBuy"
      :SetInsuranceConsultantShow="SetInsuranceConsultantShow"
      :SetWxShareShow="SetWxShareShow"
      :showPopup="showPopup"
    ></ProductFixBar>
    <!-- 代理人分享tabbar -->

    <div class="popbox_car" style="height: auto; width: 100%;display:none;">
      <div class="mainlist">
        <p>亲爱的用户您好：</p>
        <p>
          1、本保险仅限浙江省内的维修企业为员工进行投保；
          <br />2、本保险仅承担在保险期间内被保险人在工作场所（包括因公外出期间）或上下班途中遭受意外伤害并因该意外伤害导致身故、残疾或烧伤的保险金及医疗费、住院津贴；
          <br />3、已阅读《保险合同》、《产品方案》、《投保须知》、《客户告知书》。
        </p>
        <div>
          <a href="javascript:;" id="product_car_look">我再看看</a>
          <a href="javascript:;" id="product_car_sure">我知道了</a>
        </div>
      </div>
    </div>

    <!-- 微信分享 -->
    <van-popup
      v-model="wxShare_show"
      position="bottom"
      @click="wxShare_show = false;"
      :style="{ width:'100%',height:'100%',background: 'rgba(0,0,0,0)' }"
    >
      <img
        src="@/assets/images/agent/shareShade.png"
        alt="分享"
        style="margin-top:-25px;width:80%;float:right;"
      />
    </van-popup>

    <!-- 保险顾问信息 -->
    <van-popup v-model="InsuranceConsultant_show" :style="{ width:'85%'}">
      <div class="InsuranceAdvisor">
        <van-icon
          name="close"
          size="21px"
          style="position:absolute; z-index:10000;right:10px;top:10px;"
          @click="InsuranceConsultant_show = false;"
        />
        <van-nav-bar :title="goodName" />
        <van-cell-group>
          <van-cell title="姓名" :value="agentUserInfo.agentName" />
          <van-cell title="所属公司" :value="agentUserInfo.affiliatedCompany" />
          <van-cell title="执业编号" :value="agentUserInfo.practiceNo" />
          <van-cell title="联系电话" :value="agentUserInfo.agentPhone" />
          <van-cell title="执业证照" value="查看详情" @click="ProviewImg(agentUserInfo.practice)" />
        </van-cell-group>
      </div>
    </van-popup>
    <!-- 佣金展示内容 -->
    <van-popup v-model="commission_show" closeable :style="{ width: '85%' }" :round="true">
      <van-nav-bar :title="goodName" class="CommissionNavVar" />
      <CommissionPopUp :commissionInfo="commissionInfo"></CommissionPopUp>
    </van-popup>
    <!-- 弹出框登录 -->
    <van-popup v-model="PopUpLogin_show" round :style="{width:'85%',overflowY:'visible'}" closeable>
      <PopUpLogin
        :LoginSuccess="LoginSuccess"
        :forgetPasswordParams="forgetPasswordParams"
        :registerParams="registerParams"
      ></PopUpLogin>
    </van-popup>
  </div>
</template>

<script>
import api from "@/fetch/api";
import $ from "jquery";
// 多多宝规格
import DDB_Specification from "@/components/Specification/DDB_Specification";
// 康乐一生规格
import kLYS_Specification from "@/components/Specification/kLYS_Specification";
// 妈咪宝贝规格
import MaMi_Specification from "@/components/Specification/MaMi_Specification";
// 普通产品规格
import GeneralSpecification from "@/components/Specification/GeneralSpecification";
// 产品页面fixBar
import ProductFixBar from "@/components/productDetailComponent/ProductFixBar";
// 产品佣金弹出框
import CommissionPopUp from "@/components/productDetailComponent/CommissionPopUp";
// 登录弹出框
import PopUpLogin from "@/components/base/PopUpLogin";
export default {
  name: "detailsTwo",
  components: {
    DDB_Specification,
    GeneralSpecification,
    kLYS_Specification,
    MaMi_Specification,
    ProductFixBar,
    CommissionPopUp,
    PopUpLogin
  },
  data() {
    return {
      activeName: "",
      activity: 0,
      prodPlanList: "",
      prodPlanList_second: "", //规格值
      planEnsureDetailList: "",
      prodIntimateServiceList: "",
      specificationShow: false, // 规格弹出框 
      priceResult: "",  // 价格
      goodId: this.getQueryString("productId"), //产品id
      planId: "",
      brandId: "",  // 品牌id
      catId: "",  // 分类id
      typeId: "",  // 类型id
      listLength: true,
      productPresentation: "",  // 产品介绍
      questionList: "", // 干货科普
      goodInsuranceCompanyAlias: "", //保险公司
      goodName: "", //产品名称
      WhetherTheShelf: "", //产品是否上架 0：上架，1：下架
      WhetherBuy: "", // 产品是否可以购买 0：可以购买，1：不可以购买
      DefaultSpecification: [], //默认规格
      minDate: new Date(1910, 0, 1), //最小日期
      maxDate: new Date(), //最大日期
      currentDate: new Date(), //当前时间
      dateTimeShow: false, //日期控件显示隐藏
      holderAge: this.timestampToTime(new Date(), true), //投保人年龄
      insuredAge: this.timestampToTime(new Date(), true), //被保险人年龄
      dateTimeName: "", //投保人年龄 或 被保险人年龄
      safeDate: "", //保障期限
      activityCode: this.getQueryString("activityCode"),
      invitationCode: this.getQueryString("invitationCode"),
      topActivityCode: this.getQueryString("topActivityCode"),
      shareMid: this.getQueryString("shareMid"), //分享者memberId
      preparation: this.getQueryString("preparation"), //备案中 1:是 0:否
      wxShare_show: false, //微信分享展示状态
      IsAgentShare: false, //该产品详情页面是否代理人分享的
      currIsAgent: false, // 当前用户是否是代理人
      InsuranceConsultant_show: false, //保险顾问信息展示状态
      agentUserInfo: "", //代理人信息
      commission_show: false, //佣金弹出框
      commissionInfo: "", //佣金详情
      commissionRatio: "", // 默认展示的 一级佣金和一级限时佣金（判断是否有配置佣金）
      CommissionSwitch: false, // 佣金开关（是否展示佣金）
      PopUpLogin_show: false, // 登录弹出框
      forgetPasswordParams: {
        // 登录弹出框 忘记密码路由参数
        routerLink: "productdetail",
        routerQuery: {
          productId: this.getQueryString("productId"),
          activityCode: this.getQueryString("activityCode"),
          invitationCode: this.getQueryString("invitationCode"),
          topActivityCode: this.getQueryString("topActivityCode"),
          shareMid: this.getQueryString("shareMid")
        }
      },
      registerParams: {
        // 登录弹出框 免费注册路由参数
        routerLink: "productdetail",
        routerQuery: {
          productId: this.getQueryString("productId"),
          activityCode: this.getQueryString("activityCode"),
          invitationCode: this.getQueryString("invitationCode"),
          topActivityCode: this.getQueryString("topActivityCode"),
          shareMid: this.getQueryString("shareMid")
        }
      },
      DDB_Save_Specification_id:'', // 多多宝保存规格id，投保页面使用
      activitySpecifications:[], // 当前选中的规格
    };
  },
  created() {},
  mounted() {
    var that = this;
    // 0 ：上架   1：下架   2：备案中
    this.WhetherTheShelf = this.$store.state.productDetail.data.prodGoods.goodShelf; //上架状态
    this.WhetherBuy = this.$store.state.productDetail.data.prodGoods.goodIsOnlineBuy; // 是否可以购买，0可以，1不可以
    this.prodPlanList = this.$store.state.productDetail.data.prodPlanList; //计划列表
    this.goodInsuranceCompanyAlias = this.$store.state.productDetail.data.prodGoods.goodInsuranceCompanyAlias;
    this.goodName = this.$store.state.productDetail.data.prodGoods.goodName; //产品名称
    this.commissionInfo = this.$store.state.productDetail.data.prodGoods.goodsCommissionRateDetailList; //佣金信息
    this.commissionRatio = this.$store.state.productDetail.data.prodGoods.commissionRatio; // 默认展示一级佣金和一级限时佣金
    this.brandId = this.$store.state.productDetail.data.prodGoods.brandId // 用于职业分类brandId,catId,typeId
    this.catId = this.$store.state.productDetail.data.prodGoods.catId
    this.typeId = this.$store.state.productDetail.data.prodGoods.typeId

    try {
      // 判断当前用户是否是代理人
      if (
        this.$store.state.productDetail.data.agentInformation.auditStatus == 2
      ) {
        this.currIsAgent = true; // 代理人展示佣金
      }
      // 佣金开关：是否开启佣金展示
      this.CommissionSwitch =
        this.$store.state.productDetail.data.agentInformation.goodsStatus == 1
          ? true
          : false;
    } catch (error) {
      console.log("产品详情接口，代理人信息返回空");
    }

    //健康告知状态 是否有健康告知
    this.$store.commit(
      "healthAssort",
      this.$store.state.productDetail.data.prodGoods.healthAssort
    );
    this.planEnsureDetailList = this.$store.state.productDetail.data.planEnsureDetailList; //计划
    this.prodIntimateServiceList = this.$store.state.productDetail.data.prodIntimateServiceList; //贴心服务
    // 判断产品是否有计划
    if (this.prodPlanList.length <= 1) {
      this.listLength = false;
    } else {
      this.listLength = true;
    }
    // 产品介绍
    var args = this.sign({ productId: this.goodId, tag: "产品介绍" });
    api.getDetailArt(args).then(res => {
      this.productPresentation = res.data;
    });
    // 干货科普
    this.questionList = this.$store.state.productDetail.data.prodArticleList;
    // 获取vuex状态里面的产品详情 (里面的第一个计划的默认规格)
    if (this.prodPlanList[0].planSkuList.length != 0) {
      this.DefaultSpecification = this.prodPlanList[0].planSkuList[0].attrValSymbol.split(
        ","
      ); //第一个计划的默认规格值
    }
    // this.planId = this.prodPlanList[0].id; //默认展示第一个计划 id
    // this.$emit("SecurityLines", this.planId);
    // 默认调第一个计划的规格
    this.changeQuota(this.prodPlanList[0].id, 0);

    // 判断是否是分享出来的
    if (this.getQueryString("shareMid")) {
      // 判断是否是代理人
      // shareMid
      var shareParams = this.sign({
        shareMid: this.getQueryString("shareMid"),
        productId: this.getQueryString("productId")
      });
      api.getDetail(shareParams).then(res => {
        if (res.code == 20000) {
          if (res.data.agentInformation.auditStatus == 2) {
            that.IsAgentShare = true;
            that.agentUserInfo = res.data.agentInformation;
          }
        }
      });
    }
  },
  methods: {
    // 子组件试算价格传父组件
    Prices(Prices) {
      this.priceResult = Prices;
    },
    //切换计划
    changeQuota(id, index) {
      this.$emit("SecurityLines", id);
      this.planId = id;
      this.activity = index;
      // 规格信息 过滤掉不需要展示的
      this.prodPlanList_second = this.prodPlanList[index].planAttrKeyList.filter(element=>element.isDisplay == 0);
      // 规格默认选中第1个，填充0
      this.activitySpecifications = new Array(this.prodPlanList_second.length).fill(0);
      //判断是否有规格
      if (this.prodPlanList[0].planSkuList.length != 0) {
        //默认规格值列表 attrValSymbol: 默认规格id字符串
        this.DefaultSpecification = this.prodPlanList[index].planSkuList[
          index
        ].attrValSymbol.split(",");
      }
      // 规格值里面添加之定义属性 判断是否为默认规格 添加isDefault:true
      for (var i = 0; i < this.DefaultSpecification.length; i++) {
        //默认规格值
        for (var j = 0; j < this.prodPlanList_second.length; j++) {
          //外层规格模块
          for (
            var k = 0;
            k < this.prodPlanList_second[j].planAttrValList.length;
            k++
          ) {
            //内层规格值
            if (
              this.DefaultSpecification[i] ==
              this.prodPlanList_second[j].planAttrValList[k].id
            ) {
              // 修改价格最低的默认规格
              this.activitySpecifications[j] = k;
            }
          }
        }
      }

      //价格试算
      this.$nextTick(function() {
        if (this.goodName == "合众多多宝终身重大疾病保险") {
          this.$refs.DDB_Specification.PricesTrial();
        } else if (this.goodName == "复星联合妈咪保贝少儿重大疾病保险") {
          this.$refs.MaMi_Specification.PricesTrial();
        } else if (
          this.goodName == "复星联合康乐一生重大疾病保险（B款升级款）"
        ) {
          this.$refs.kLYS_Specification.PricesTrial();
        } else {
          this.tap();
        }
      });

      // 获取计划里面的保单清单
      var planEnsureDetailMap = this.$store.state.productDetail.data
        .prodPlanList[index].planEnsureDetailMap;
      for (var key in planEnsureDetailMap) {
        if (key == this.planId) {
          this.planEnsureDetailList = planEnsureDetailMap[key];
        }
      }
    },
    // 选择规格，进行价格试算 i:为外层规格模块（比如 保障期限，购买份数） j:为内层小规格值（比如 被保险人年龄 18,19,20）
    tap(i, j) {
      // 点击规格传入i、j 切换规格，在进行价格试算
      if(i != undefined & j != undefined){
        this.activitySpecifications[i] = j;
        // 强制刷新dom，当修改data状态里面的对象或数组的属性时，不会触发dom渲染
        this.$forceUpdate();
      }
      
      // 获取规格id，进行价格试算
      this.$nextTick(function() {
        var keyStr = "";
        $.each($(".on"), function(index, ele) {
          keyStr += $(ele).attr("name") + ",";
        });
        keyStr = keyStr.substring(0, keyStr.length - 1);
        var args = this.sign({
          productId: this.goodId,
          planId: $(".planBtn").attr("name"),
          value: keyStr
        });
        var that = this;
        // 价格接口
        api.getCalculation(args).then(res => {
          if (res.code == 20000) {
            that.priceResult = res.data;
          } else {
            that.Toast(res.message);
          }
        });
      });
    },
    // 展示规格，如果已经展示直接进入投保页面
    showPopup() {
      var that = this;
      // 自定义产品备案中状态
      if (this.preparation) {
        this.Toast("产品正在备案中");
        // 0 ：上架   1：下架   2：备案中
      } else if (this.WhetherTheShelf == 0 && this.WhetherBuy == 0) {
        // 复星联合妈咪保贝少儿重大疾病保险 和 复星联合康乐一生重大疾病保险（B款升级款）不需要弹出规格 直接调用cps
        if (this.goodName == "复星联合妈咪保贝少儿重大疾病保险") {
          this.$refs.MaMi_Specification.goBuy();
        } else if (
          this.goodName == "复星联合康乐一生重大疾病保险（B款升级款）"
        ) {
          this.$refs.kLYS_Specification.goBuy();
        } else {
          if (this.specificationShow == true) {
            if (this.goodName == "合众多多宝终身重大疾病保险") {
              this.$refs.DDB_Specification.goBuy();
            } else {
              this.goBuy();
            }
          } else {
            this.specificationShow = true;
          }
        }
      } else {
        this.Toast(
          this.$store.state.productDetail.data.prodGoods.goodBuyPrompt
        );
      }
    },
    // 浙江省汽车维修重要告知
    ImportantInform(goodId, planId, priceResult, safeDate, isSocialSecurity) {
      var that = this;
      layer.open({
        type: 1,
        skin: "layui-layer-demo", //样式类名
        closeBtn: 0, //不显示关闭按钮
        anim: 2,
        area: ["90%"],
        title: [
          "重要告知",
          "text-align:center;background-color:#40afff;color:white;padding:0;!important"
        ],
        shadeClose: true, //开启遮罩关闭
        content: $(".popbox_car").html(),
        success: function(layero, index) {
          $(".layui-layer #product_car_look").click(function() {
            layer.close(index);
          });
          $(".layui-layer #product_car_sure").click(function() {
            that.$router.push({
              path: "/insurancePingAnQiXiu",
              query: {
                productId: goodId,
                planId: planId,
                priceResult: priceResult,
                safeDate: safeDate,
                isSocialSecurity: isSocialSecurity
              }
            });
            layer.close(index);
          });
        }
      });
    },
    // 判断健康告知，跳转路由函数 healthInform:是否跳转健康告知,path:健康告知的路由,Router:从健康告知要跳转的路由,goodName:产品名称
    isRouter(healthInform, path, Router, goodName, id) {
      var that = this;
      var keyStr = "";
      $.each($(".on"), function(index, ele) {
        keyStr += $(ele).attr("name") + ",";
      });
      var keyStr = keyStr.substring(0, keyStr.length - 1);
      var args = this.sign({
        productId: this.goodId,
        planId: $(".planBtn").attr("name"),
        value: keyStr
      });
      // 价格试算
      api.getCalculation(args).then(res => {
        this.priceResult = res.data;
      });
      // 获取保障期限
      var safeDate = $('div[name="保障期限"]')
        .find($(".quotaList"))
        .find($(".on span"))
        .html();
      // 有无社保
      var isSocialSecurity = $('div[name="社保情况"]')
        .find($(".quotaList"))
        .find($(".on span"))
        .html();
      // 承保年龄
      var insurdAge = $('div[name="承保年龄"]')
        .find($(".quotaList"))
        .find($(".on span"))
        .html();
      //承保范围
      var InsuranceScope = $('div[name="承保范围"]')
        .find($(".quotaList"))
        .find($(".on span"))
        .html();
      if (goodName == "浙江省汽车维修企业员工团体意外伤害保险") {
        this.ImportantInform(
          that.goodId,
          that.planId,
          that.priceResult,
          safeDate,
          isSocialSecurity
        );
      } else {
        var params = {
          productId: this.goodId,
          planId: this.planId,
          priceResult: this.priceResult,
          safeDate: safeDate,
          brandId: this.brandId, // 品牌编号
          catId: this.catId,  // 分类id
          typeId: this.typeId, // 类型id 
          isSocialSecurity: isSocialSecurity,
          activityCode: this.activityCode,
          invitationCode: this.invitationCode,
          topActivityCode: this.topActivityCode,
          insurdAge: insurdAge,
          InsuranceScope, //承保范围
          shareMid: this.shareMid
        };
        // 如果传id，路由时添加SaveSpecification(多多宝产品页面价格试算规格保存，投保页面展示)参数
        if (id) {
          params.SaveSpecification = id;
        }

        // 进入投保页面之前删除健康告知内容，以防获取到其他产品的健康告知
        this.delCookie("healthAnswer");

        // 是否有健康告知
        if (healthInform) {
          params.Router = Router;
          this.$router.push({
            path: path,
            query: params
          });
        } else {
          console.log(Router,params)
          this.$router.push({
            path: Router,
            query: params
          });
        }
      }
    },
    // 立即投保 id: 产品详情页面选择规格保存数据库(多多宝)，返回id（投保页面进行查询展示）
    goBuy(id) {
      // 多多宝选择规格保存id
      if(id){
        this.DDB_Save_Specification_id = id;
      };
      
      var loginStatus = this.getCookie("ZB_JUSER_Mid");
      //判断登录状态 或 有渠道邀请码的话 ，可直接投保
      if (loginStatus || this.activityCode != "") {
          //是否有健康告知 2:无 0:总体 1:逐一
          var isHealthAssort = this.$store.state.healthAssort == 0 || this.$store.state.healthAssort == 1;
          console.log('健康告知状态：' + isHealthAssort);
          
          if (this.goodInsuranceCompanyAlias == "华安保险") {
            this.isRouter(isHealthAssort, "/healthInform", "/insuranceHuaAn");
          } else if (this.goodInsuranceCompanyAlias == "中国平安") {
            //平安财险
            if (this.goodName == "浙江省汽车维修企业员工团体意外伤害保险") {
              this.isRouter(
                isHealthAssort,
                "/healthInform",
                "/insurancePingAnQiXiu",
                "浙江省汽车维修企业员工团体意外伤害保险"
              );
            } else if (
              this.goodName == "平安驾驶人考试不通过补考费用损失保险"
            ) {
              this.isRouter(isHealthAssort, "/healthInform", "/insurancePingAnKaoShi");
            } else if (this.goodName == "环晟-平安家政服务综合保险") {
              this.isRouter(isHealthAssort, "/healthInform", "/insuranceJiaZheng");
            } else if (this.goodName == "平安驾乘意外伤害保险") {
              this.isRouter(isHealthAssort, "/healthInform", "/insuranceJiaCheng");
            } else {
              this.isRouter(isHealthAssort, "/healthInform", "/insurancePingAn");
            }
          } else if (this.goodInsuranceCompanyAlias == "紫金保险") {
            //紫金保险
            this.isRouter(isHealthAssort, "/healthInform", "/insuranceZiJin");
          } else if (this.goodInsuranceCompanyAlias == "京东安联财险") {
            this.isRouter(isHealthAssort, "/healthInform", "/insuranceAnlian");
          } else if (this.goodInsuranceCompanyAlias == "人保财险") {
            this.isRouter(isHealthAssort, "/healthInform", "/insuranceRenBao");
          } else if (this.goodInsuranceCompanyAlias == "安心保险") {
            this.isRouter(isHealthAssort, "/healthInform", "/insuranceAnXin");
          } else if (this.goodInsuranceCompanyAlias == "利宝保险") {
            this.isRouter(isHealthAssort, "/healthInform", "/insuranceLiBao");
          } else if (this.goodInsuranceCompanyAlias == "众安保险") {
            this.isRouter(isHealthAssort, "/healthInform", "/insuranceZhongAn");
          } else if (this.goodInsuranceCompanyAlias == "天安财险") {
            this.isRouter(isHealthAssort, "/healthInform", "/insuranceTianAn");
          } else if (this.goodInsuranceCompanyAlias == "大家保险") {
            this.isRouter(isHealthAssort, "/healthInform", "/insuranceDaJiaBao");
          } else if (this.goodInsuranceCompanyAlias == "合众人寿") {
            this.isRouter(
              isHealthAssort,
              "/healthInform",
              "/insuranceDDB",
              this.goodName,
              this.DDB_Save_Specification_id
            );
          } else {
            this.isRouter(isHealthAssort, "/healthInform", "/insurancePingAn");
          }
      } else {
        this.PopUpLogin_show = true;
      }
    },
    // 预览图片
    ProviewImg(img) {
      var ProviewImgPath = this.$store.state.baseImagePath + "/hsFileData" + img;
      this.InsuranceConsultant_show = false;

      this.$ImagePreview({
        images: [ProviewImgPath],
        closeable: true,
        getContainer: "body"
      });
    },
    // 展示保险顾问
    SetInsuranceConsultantShow() {
      // this.InsuranceConsultant_show = true;
      this.$router.push({
        path: "InsuranceAdvisor",
        query: { shareMid: this.shareMid }
      });
    },
    // 展示微信分享
    SetWxShareShow() {
      this.wxShare_show = true;
    },
    // 登录成功回调
    LoginSuccess() {
      this.PopUpLogin_show = false;
    },
    // 弹出登录弹出框
    popupLogin(status) {
      this.PopUpLogin_show = status;
    }
  }
};
</script>

<style lang="scss">
.Tochat {
  width: 66px;
  height: 66px;
  margin-left: 29px;
  margin-top: 15px;
  border-right: 1px solid rgba(221, 221, 221, 1);
  padding-right: 38px;
}

.detailsTwo {
  .fixBar {
    height: auto !important;
    position: relative;
    z-index: 100;
    .van-hairline--top-bottom::after {
      border-width: 3px 0;
      border-bottom: 0px;
    }
    .van-tabbar-item--active {
      color: #8f8f8f;
    }
    #polifyBar {
      .price {
        flex: 2;
      }
      .gobuy {
        flex: 3;
      }
      .soldOut {
        flex: 3;
      }
    }

    #sharePolifyBar {
      .share_agentInfo {
        flex: 3.8 !important;
        .van-tabbar-item__text {
          width: 90%;
          display: flex;
          .agentHead {
            img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              border: 1px solid black;
            }
          }
          .agentInfo {
            height: 60px;
            margin-top: 13px;
            margin-left: 6px;
            p {
              color: black;
              overflow: hidden;
              display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
              -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
              -webkit-line-clamp: 1; //规定行数
            }
            p:nth-of-type(1) {
              font-size: 25px;
            }
            p:nth-of-type(2) {
              font-size: 23px;
              margin-top: 5px;
            }
          }
        }
      }
      .share_price {
        flex: 2.5 !important;
        border-right: solid 1px #ccc;
      }
      .share_text {
        flex: 1.7 !important;
        font-size: 16px;
        color: black;
        text-align: center;
      }
      .soldOut {
        flex: 3 !important;
      }
      .gobuy {
        flex: 3 !important;
      }
    }

    .price,
    .share_price {
      color: #333;
      .van-tabbar-item__icon {
        display: none;
      }
      .van-tabbar-item__text {
        font-weight: 700;
        font-size: 36px;
        color: #f9912e;
      }
    }
    .gobuy {
      color: #333;
      background: #f9912e;
      .van-tabbar-item__icon {
        display: none;
      }
      .van-tabbar-item__text {
        color: #fff;
        font-size: 36px;
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-weight: bold;
      }
    }
    .soldOut {
      background-color: #cccccc;
      .van-tabbar-item__text {
        color: #fff;
        font-size: 36px;
      }
    }
  }
  .van-hairline::after {
    border-top: 1px solid #999;
    border-bottom: 0px;
  }
  .quotaCenter {
    // padding-top:50px;
    // padding-bottom: 0px;
    padding: 40px 30px;
    padding-bottom: 20px;
  }
  .quotaCenterOfService {
    padding: 41px 30px 26px;
  }
  .on {
    background: #1989fa;
    color: #ffffff !important;
    border: 1px solid #1989fa;
    border-radius: 6px;
  }
  .guarantee {
    padding: 0px 40px;
    padding-top: 0px;
    // padding-bottom: 10px;
    color: #333;
    .commission {
      padding: 25px 0;
      border-top: solid 1px #ebedf0;
      p {
        color: #f9912e;
        display: inline-block;
        border: solid 2px #fb8300;
        height: 50px;
        line-height: 50px;
        border-radius: 25px;
        padding: 0 28px;
        box-sizing: border-box;
        font-size: 24px;
        vertical-align: bottom;
        margin-left: 10px;
      }
      span {
        color: #f9912e;
        font-size: 40px;
        display: inline-block;
        font-weight: 550;
      }
      button {
        float: right;
        padding: 0 27px;
        background-color: #f9912e;
        color: white;
        height: 50px;
        line-height: 50px;
        border-radius: 25px;
        font-size: 24px;
      }
    }
    .van-collapse-item__content {
      padding: 15px 0px;
    }
    .leftTitle {
      flex: 2.3;
    }
    p {
      // text-indent: 2em;
      font-size: 26px;
      color: #999;
    }
    .btitle {
      font-weight: 700;
      font-size: 28px;
      color: #333;
      height: 88px;
      line-height: 88px;
      display: block;
    }
    ul li:nth-child(1) {
      font-weight: bold;
      border-bottom: 1px dotted #ccc;
      padding: 16px 0;
    }
    .van-cell {
      padding: 20px 0;
      .van-cell__title,
      .van-cell__value {
        font-size: 26px;
        color: #333333;
      }
    }
    .van-hairline--top-bottom::after {
      // border-width: 0px;
      border-bottom: none;
      border-top: none;
    }
  }
  .quotaList {
    padding: 0px 30px 20px;
    .dateTime {
      button {
        width: 250px;
        height: 70px;
        border: solid 2px #ebedf0 !important;
        padding: 0 30px;
        background-color: white;
        text-align: left;
        color: #666 !important;
        background-color: transparent;
      }
      i {
        vertical-align: middle;
        margin-left: -55px;
        margin-top: -5px;
        position: relative;
        z-index: -1;
      }
    }
    .van-button--default {
      color: #666;
    }
    .van-button {
      margin-right: 30px;
      // width: 150px;
      height: 56px;
      margin-bottom: 16px;
      padding: 0 20px;
      .van-button__text {
        font-size: 26px !important;
      }
    }
    .showDown {
      float: right;
      display: inline-block;
      height: 56px;
      line-height: 56px;
      margin-right: 10px;
    }
  }
  .heartserve {
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0px 40px;
      padding-bottom: 36px;
      li {
        width: 220px;
        .van-cell {
          padding: 0;
          .van-cell__title {
            span {
              font-size: 24px;
              color: #8f8f8f;
            }
          }
        }
      }
    }
    .van-icon-checked {
      color: #008cff;
    }
  }
  .heartserve_bottom {
    a {
      display: block;
      border-top: solid 2px #f5f5f5;
    }
    .van-cell {
      padding: 20px 32px;
    }
    .van-cell__title {
      flex: 1;
    }
    .van-cell__value {
      flex: 4;
      line-height: 64px;
      font-size: 28px;
      text-align: left;
      text-indent: 0.5em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333;
    }
    .van-cell__right-icon {
      margin-top: 8px;
    }
    .van-tag--danger {
      width: 140px !important;
      height: 50px;
      text-align: center;
      line-height: 50px;
      background-color: #008cff;
      font-size: 24px;
      border-radius: 0;
      font-weight: 500;
      color: #fdfdfe;
      border-radius: 10px;
      position: relative;
      top: 6px;
      padding: 0 10px;
    }
    .van-tag--normal {
      width: 140px !important;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: #8080ff;
      font-size: 24px;
      border-radius: 0;
      font-weight: 500;
      color: #fdfdfe;
      border-radius: 10px;
      position: relative;
      top: 6px;
      padding: 0 10px;
    }
  }
  .van-nav-bar__title {
    max-width: 80%;
  }
  .InsuranceAdvisor {
    .van-cell__value {
      flex: 2;
    }
  }
}

.mainlist {
  div {
    width: 370px;
    display: block;
    margin: 20px auto 0;
  }
  padding: 30px;
}
#product_car_look,
#product_car_sure {
  display: inline-block;
  background-color: #40afff;
  color: white;
  padding: 8px 12px;
  margin-left: 40px;
  border-radius: 5px;
}
.titleBgc {
  background-color: #40afff;
}

@supports (bottom: env(safe-area-inset-bottom)) {
  #polifyBar {
    bottom: env(safe-area-inset-bottom);
  }
  #sharePolifyBar {
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
.van-tabbar-item {
  position: relative;
  height: 100%;
}
.popuoButton {
  padding-bottom: 100px;
  .quota .borderA {
    display: none;
  }
  .titleA {
    font-weight: 500 !important;
    font-size: 30px !important;
  }
}
#resultPrice {
  font-size: 40px !important;
}
.price {
  line-height: 50px;
}
.price .van-tabbar-item__text {
  font-size: 40px !important;
}
.NoActive {
  background-color: white !important;
  color: #1989fa !important;
}
</style>