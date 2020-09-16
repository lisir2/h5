<!-- 组件说明 （保留人人巴士锁定规格代码）-->
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
          :class="LockplanId ? (item.id == LockplanId ? 'planBtn' : 'NoActive') : ((activity == index) ? 'planBtn' : 'NoActive')"
          @click="LockplanId ? Lockplan(item.id) : changeQuota(item.id,index)"
        >{{item.planName}}</van-button>
        <!-- 解析：LockplanId ? (item.id == LockplanId ? 'planBtn' : 'NoActive') : ((activity == index) ? 'planBtn' : 'NoActive')
              LockplanId是否有锁定规格id，有的话判断item.id == LockplanI 判断要渲染的规格值 planBtn(要渲染的规格样式) NoActive(不渲染的规格样式)
         -->
        <!-- 解析：LockplanId ? Lockplan() : changeQuota(item.id,index)
            LockplanId是否有锁定规格id,有的话不能切换计划,没有的话changeQuota(item.id,index) 执行切换计划
        -->
        <span class="showDown" v-if="moreBtn">
          展示
          <van-icon name="arrow-down" />
        </span>
      </div>
    </div>
    <div class="colorBlock" v-show="listLength"></div>
    <!-- 切换计划获取计划对应的规格值 :lazy-render='false' 非常重要 如果加上在没有弹出的时候也可以获取 popup里面的dom元素 否则-->
    <van-popup
      v-model="show"
      class="popuoButton"
      closeable
      round
      position="bottom"
      :style="{ height: '80%' }"
      :lazy-render="false"
    >
      <div v-for="(item,i) in prodPlanList_second" :key="item.id" :name="item.attrName">
        <div v-if="item.isDisplay == 0" class="specification_box">
          <div class="quota">
            <span class="borderA"></span>
            <p class="titleA">{{item.attrName}}</p>
          </div>
          <div class="quotaList">
            <!-- 复兴联合特殊规格 日期规格 -->
            <!-- <div v-if="goodName == '康乐一生B款升级款' && item.attrName == '投保人出生日期'" class="dateTime">
              <button
                type="text"
                :name="item.planAttrValList[0].id"
                @click="dateTimeShow = true;dateTimeName = 'holderAge'"
              >{{holderAge}}</button>
              <van-icon name="notes-o" size="20" />
            </div>-->
            <!-- 复兴联合特殊规格 日期规格 -->
            <!-- part.isDefault:为默认规格;  item.isOperation:是否参加计算 0:不参加计算，1参加计算; --> 
            <van-button
              size="small"
              v-for="(part,j) in item.planAttrValList"
              :key="part.id"
              :name="part.id"
              :class="(activityCode == rrbsActivityCode && orderNo != '' && item.attrName == '保障期限') ? (part.attrValue == safeDate ? 'on' : '') : (part.isDefault ? 'on' : (item.isOperation == 0 ? (j == 0 ? 'on' : '') : ''))"
              @click="(activityCode == rrbsActivityCode && orderNo != '' && item.attrName == '保障期限') ? tap($event,i,j,part.id,true) : tap($event,i,j,part.id,false)"
            >{{part.attrValue}}</van-button>
          </div>
        </div>
      </div>
      <!-- 规格选择弹出层的价格试算区 -->
      <div class="fixBar">
        <van-tabbar>
          <!-- //hsib.qiyukf.com/client?k=c5d6706f0d4f32b60dc4ba3aaa148b89&wp=1&robotShuntSwitch=1&robotId=139000 -->
          <router-link href="javascript:void(0)" style="flex:1" to="/chat">
            <img src="../assets/images/detail/客服.png" alt class="Tochat" />
          </router-link>
          <van-tabbar-item class="price">￥{{priceResult}}</van-tabbar-item>
          <van-tabbar-item class="gobuy" icon @click="goBuy">立即投保</van-tabbar-item>
        </van-tabbar>
      </div>
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
          <van-cell :title="item.serviceTitleName" @click="goService" icon="checked" />
        </li>
      </ul>
    </div>
    <div class="colorBlock"></div>
    <!-- 产品介绍/干货科普 -->
    <div class="heartserve_bottom">
      <a v-for="item in questionList1" :key="item.id" :href="item.articleUrl">
        <van-cell is-link :value="item.articleName">
          <template slot="title">
            <van-tag :type="item.articleTag == '干货科普' ? 'normal' : 'danger'">{{item.articleTag}}</van-tag>
          </template>
        </van-cell>
      </a>
    </div>
    <div class="colorBlock" v-if="questionList1.length>=1"></div>
    <!-- 详情页底部投保区 -->
    <div class="fixBar">
      <van-tabbar id="polifyBar" style="z-index: 999;">
        <!-- //hsib.qiyukf.com/client?k=c5d6706f0d4f32b60dc4ba3aaa148b89&wp=1&robotShuntSwitch=1&robotId=139000 -->
        <router-link href="javascript:void(0)" style="flex:1" to="/chat">
          <img src="../assets/images/detail/客服.png" alt class="Tochat" />
        </router-link>
        <van-tabbar-item class="price">￥{{priceResult}}</van-tabbar-item>
        <van-tabbar-item
          :class="preparation ? 'soldOut' : (WhetherTheShelf == 0 ? 'gobuy' : 'soldOut')"
          @click="showPopup"
        >{{preparation ? '备案中' : (WhetherTheShelf == 0 ? '立即投保' : (WhetherTheShelf == 1 ? '产品已下架' : '备案中'))}}</van-tabbar-item>
        <div class="cover"></div>
      </van-tabbar>
    </div>
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
    <!-- 日期控件 -->
    <van-popup v-model="dateTimeShow" closeable position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="dateTimeShow = false"
        @confirm="timeConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import api from "../fetch/api";
import $ from "jquery";
export default {
  name: "detailsTwo",
  components: {},
  data() {
    return {
      activeName: "",
      activity: 0,
      prodPlanList: "",
      prodPlanList_second: "", //规格值
      moreBtn: false,
      planEnsureDetailList: "",
      prodIntimateServiceList: "",
      show: false,
      onStr: "",
      priceResult: "",
      goodId: this.getQueryString("productId"), //产品id
      planId: "",
      listLength: true,
      questionList: "",
      questionList1: "", //干货科普
      goodInsuranceCompanyAlias: "", //保险公司
      goodName: "", //产品名称
      WhetherTheShelf: "", //产品是否上架 0：上架，1：下架
      DefaultSpecification: [], //默认规格
      minDate: new Date(1910, 0, 1), //最小日期
      maxDate: new Date(), //最大日期
      currentDate: new Date(), //当前时间
      dateTimeShow: false, //日期控件显示隐藏
      holderAge: this.timestampToTime(new Date(), true), //投保人年龄
      insuredAge: this.timestampToTime(new Date(), true), //被保险人年龄
      dateTimeName: "", //投保人年龄 或 被保险人年龄
      orderNo: this.getQueryString("orderNo"), //人人巴士(平安驾乘进来的单子会带上orderNo)
      safeDate: "", //人人过来的订单租车时间（要锁定的规格值）
      LockSpecification:'保障期限', //锁定规格模块名称（保障期限）
      LockplanId:'', //锁定计划id
      activityCode: this.getQueryString("activityCode"),
      invitationCode: this.getQueryString("invitationCode"),
      topActivityCode: this.getQueryString("topActivityCode"),
      rrbsActivityCode:'QD202003240001', //人人巴士渠道号
      shareMid:this.getQueryString("shareMid"), //分享者memberId
      preparation:this.getQueryString("preparation"), //备案中 1:是 0:否
    };
  },
  created() {
    
  },
  mounted() {
    // 0 ：上架   1：下架   2：备案中
    this.WhetherTheShelf = this.$store.state.productDetail.data.prodGoods.goodShelf; //上架状态
    this.prodPlanList = this.$store.state.productDetail.data.prodPlanList; //计划列表
    this.goodInsuranceCompanyAlias = this.$store.state.productDetail.data.prodGoods.goodInsuranceCompanyAlias;
    this.goodName = this.$store.state.productDetail.data.prodGoods.goodName; //产品名称
    this.$store.commit(
      "healthAssort",
      this.$store.state.productDetail.data.prodGoods.healthAssort
    ); //健康告知状态
    this.planEnsureDetailList = this.$store.state.productDetail.data.planEnsureDetailList; //计划
    this.prodIntimateServiceList = this.$store.state.productDetail.data.prodIntimateServiceList; //贴心服务
    this.$emit("SecurityLines", this.planId);
    // 判断产品是否有计划
    if (this.prodPlanList.length <= 1) {
      this.listLength = false;
    } else {
      this.listLength = true;
    }
    // 产品介绍
    var args = this.sign({ productId: this.goodId, tag: "产品介绍" });
    api.getDetailArt(args).then(res => {
      this.questionList = res.data;
    });
    // 干货科普
    this.questionList1 = this.$store.state.productDetail.data.prodArticleList;
    // 判断是否是人人巴士渠道过来的订单
    if (this.activityCode == this.rrbsActivityCode && this.orderNo != '') {
      // 隐藏返回按钮
      $(".van-nav-bar__left").hide();
      var args = this.sign({ orderNo: this.orderNo });
      api.renrenData(args).then(res=>{
      // this.$axios.post('/org/openapi/Order/renrenData',args).then(res=>{
        var result = res;
        if(result.success){
          this.safeDate = result.safeDate;
          this.LockplanId = result.planId;
          // 渲染锁定计划里面的规格
          if(this.LockplanId){
            this.planId = result.planId;
            this.prodPlanList.map((ele,index)=>{
              if(ele.id == this.LockplanId){
                this.changeQuota(this.planId, index);
              }
            })
          }else{
            // 获取vuex状态里面的产品详情 (里面的第一个计划的默认规格)
            if (this.prodPlanList[0].planSkuList.length !=0) {
              this.DefaultSpecification = this.prodPlanList[0].planSkuList[0].attrValSymbol.split(","); //第一个计划的默认规格值
              this.planId = this.prodPlanList[0].id; //第一个计划id
            }
            // 默认调第一个计划的规格
            this.changeQuota(this.planId, 0);
          }
        }else{
          this.Toast(res.message);
        }
      })
    }else{
      // 获取vuex状态里面的产品详情 (里面的第一个计划的默认规格)
      if (this.prodPlanList[0].planSkuList.length !=0) {
        this.DefaultSpecification = this.prodPlanList[0].planSkuList[0].attrValSymbol.split(","); //第一个计划的默认规格值
        this.planId = this.prodPlanList[0].id; //第一个计划id
      }
      // 默认调第一个计划的规格
      this.changeQuota(this.planId, 0);
    }
  },
  methods: {
    // 时间控件选择回调
    timeConfirm(val) {
      if (this.dateTimeName == "holderAge") {
        this.holderAge = this.timestampToTime(val, true); //投保人年龄
      } else {
        this.insuredAge = this.timestampToTime(val, true); //被保险人年龄
      }
      this.dateTimeShow = false;
    },
    //切换规格
    changeQuota(id, index) {
      this.$emit("SecurityLines", id);
      this.planId = id;
      this.activity = index;
      // 规格信息
      this.prodPlanList_second = this.prodPlanList[index].planAttrKeyList;
      // 人人巴士进来的订单不使用默认规格 this.activityCode == this.rrbsActivityCode（人人巴士订单）
      if(this.activityCode == this.rrbsActivityCode && this.orderNo != ''){
        // 不使用默认规格
      }else{
        //判断是否有规格
        if (this.prodPlanList[0].planSkuList.length != 0) {
          //默认规格值列表 attrValSymbol: 默认规格id字符串
          this.DefaultSpecification = this.prodPlanList[index].planSkuList[index].attrValSymbol.split(",");
        }
        // 规格值里面添加之定义属性 判断是否为默认规格 添加isDefault:true
        for (var i = 0; i < this.DefaultSpecification.length; i++) {
          //默认规格值
          for (var j = 0; j < this.prodPlanList_second.length; j++) {
            //外层规格模块
            for (var k = 0;k < this.prodPlanList_second[j].planAttrValList.length;k++) {
              //内层规格值
              if (this.DefaultSpecification[i] == this.prodPlanList_second[j].planAttrValList[k].id) {
                this.prodPlanList_second[j].planAttrValList[k].isDefault = true;
              }
            }
          }
        }
      }

      //价格试算
      this.$nextTick(function () {
        this.tap(); 
      })
      
      // 获取计划里面的保单清单
      var planEnsureDetailMap = this.$store.state.productDetail.data
        .prodPlanList[index].planEnsureDetailMap;
      for (var key in planEnsureDetailMap) {
        if (key == this.planId) {
          this.planEnsureDetailList = planEnsureDetailMap[key];
        }
      }
    },
    // 选择规格，进行价格试算 i:为外层规格模块（比如 保障期限，购买份数） j:为内层小规格值（比如 被保险人年龄 18,19,20） id:每个规格的id, isRRBS:是否是人人巴士过来的订单
    tap(event, i, j, id, isRRBS) {
      // isRRBS 判断是否有订单号，有的话就是人人巴士进来的订单
      if (event && isRRBS == true) {//点击保障期限
        this.Toast("保障期限不可修改");
        return false;
      } else if (event && isRRBS == false) {//点击其他规格
        // 改变点击的按钮样式   由于添加默认规格值,规格值上绑定class 判断isDefault，渲染按钮样式，所以点击按钮操控dom进行修改样式。
        var specificationBox = $(event.target)
          .parent()
          .find("button");
        // 删除一个规格模块下所有按钮的样式
        specificationBox.removeClass("on");
        // 选中按钮添加样式
        $(event.target).addClass("on");
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
        var api_this = this;
        // 价格接口
        // this.$axios.post('/brg/openapi/h5/product/priceCalculation',args)
        api.getCalculation(args).then(res => {
          if (res.code == 20000) {
            api_this.priceResult = res.data;
          } else {
            api_this.Toast(res.message);
          }
        });
      });
    },
    showPopup() {
      var that = this;
      // 自定义产品备案中状态
      if(this.preparation){
        this.Toast(
          '产品正在备案中'
        );
      // 0 ：上架   1：下架   2：备案中
      }else if (this.WhetherTheShelf == 0) {
        this.show = true;
      } else {
        this.Toast(
          this.$store.state.productDetail.data.prodGoods.goodBuyPrompt
        );
      }
    },
    goService() {
      var goodsId = this.goodId;
      this.$router.push({
        path: "/intimateService",
        query: { goodId: goodsId }
      });
    },
    // 浙江省汽车维修重要告知
    ImportantInform(goodId, planId, priceResult, safeDate, isSocialSecurity) {
      var this_ = this;
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
            this_.$router.push({
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
    // 判断健康告知，跳转路由函数 healthInform:是否跳转健康告知,path:将将要跳转的路由,Router:从健康告知要跳转的路由
    isRouter(healthInform, path, Router, goodName) {
      var this_ = this;
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
          this_.goodId,
          this_.planId,
          this_.priceResult,
          safeDate,
          isSocialSecurity
        );
      } else {
        if (healthInform) {
          this.$router.push({
            path: path,
            query: {
              productId: this.goodId, //产品名称
              planId: this.planId, //计划id
              priceResult: this.priceResult, //试算价格
              safeDate: safeDate, //保障年限
              Router: Router, //将要从健康告知跳转到哪个页面
              isSocialSecurity: isSocialSecurity, //是否有社保
              activityCode: this.activityCode,
              invitationCode: this.invitationCode,
              topActivityCode: this.topActivityCode,
              insurdAge: insurdAge, //保障年龄
              InsuranceScope, //承保范围
              shareMid:this.shareMid,
            }
          });
        } else {
          // 没有健康告知的产品进入 投保页面之前删除Cookie健康告知填写记录
          this.delCookie("healthAnswer");
          if(this.activityCode == this.rrbsActivityCode && this.orderNo != ''){ //人人巴士传订单号
            this.$router.push({
              path: path,
              query: {
                productId: this.goodId,
                planId: this.planId,
                priceResult: this.priceResult,
                safeDate: safeDate,
                isSocialSecurity: isSocialSecurity,
                activityCode: this.activityCode,
                invitationCode: this.invitationCode,
                topActivityCode: this.topActivityCode,
                insurdAge: insurdAge,
                InsuranceScope, //承保范围
                orderNo:this.orderNo, //人人巴士传订单号
                shareMid:this.shareMid,
              }
            });
          }else{
            this.$router.push({
              path: path,
              query: {
                productId: this.goodId,
                planId: this.planId,
                priceResult: this.priceResult,
                safeDate: safeDate,
                isSocialSecurity: isSocialSecurity,
                activityCode: this.activityCode,
                invitationCode: this.invitationCode,
                topActivityCode: this.topActivityCode,
                insurdAge: insurdAge,
                InsuranceScope, //承保范围
                shareMid:this.shareMid,
              }
            });
          }
          
        }
      }
    },
    // 立即投保
    goBuy() {
      var this_ = this;
      var loginStatus = this.getCookie("ZB_JUSER_Mid");
      //判断登录状态 或 有渠道邀请码的话 ，可直接投保
      if (loginStatus || this.activityCode != "") {
        //是否有健康告知 2:无 0:总体 1:逐一
        if (
          this.$store.state.healthAssort == 0 ||
          this.$store.state.healthAssort == 1
        ) {
          if (this.goodInsuranceCompanyAlias == "华安保险") {
            this_.isRouter(true, "/healthInform", "/insuranceHuaAn");
          } else if (this.goodInsuranceCompanyAlias == "中国平安") {
            //平安财险
            if (this.goodName == "浙江省汽车维修企业员工团体意外伤害保险") {
              this_.isRouter(
                true,
                "/healthInform",
                "/insurancePingAnQiXiu",
                "浙江省汽车维修企业员工团体意外伤害保险"
              );
            } else if (
              this.goodName == "平安驾驶人考试不通过补考费用损失保险"
            ) {
              this_.isRouter(true, "/healthInform", "/insurancePingAnKaoShi");
            } else {
              this_.isRouter(true, "/healthInform", "/insurancePingAn");
            }
          } else if (this.goodInsuranceCompanyAlias == "紫金保险") {
            //紫金保险
            this_.isRouter(true, "/healthInform", "/insuranceZiJin");
          } else if (this.goodInsuranceCompanyAlias == "京东安联财险") {
            this_.isRouter(true, "/healthInform", "/insuranceAnlian");
          } else if (this.goodInsuranceCompanyAlias == "人保财险") {
            this_.isRouter(true, "/healthInform", "/insuranceRenBao");
          } else if (this.goodInsuranceCompanyAlias == "安心保险") {
            this_.isRouter(true, "/healthInform", "/insuranceAnXin");
          } else if (this.goodInsuranceCompanyAlias == "利宝保险") {
            this_.isRouter(true, "/healthInform", "/insuranceLiBao");
          } else if (this.goodInsuranceCompanyAlias == "众安保险") {
            this_.isRouter(true, "/healthInform", "/insuranceZhongAn");
          } else {
            this_.isRouter(true, "/healthInform", "/insurancePingAn");
          }
        } else {
          if (this.goodInsuranceCompanyAlias == "华安保险") {
            this_.isRouter(false, "/insuranceHuaAn");
          } else if (this.goodInsuranceCompanyAlias == "中国平安") {
            //平安财险
            if (this.goodName == "浙江省汽车维修企业员工团体意外伤害保险") {
              // 浙江省汽车维修重要告知
              this_.isRouter(
                false,
                "",
                "",
                "浙江省汽车维修企业员工团体意外伤害保险"
              );
            } else if (this.goodName == "环晟-平安家政服务综合保险") {
              this_.isRouter(false, "/insuranceJiaZheng");
            } else if (
              this.goodName == "平安驾驶人考试不通过补考费用损失保险"
            ) {
              this_.isRouter(false, "/insurancePingAnKaoShi");
            } else if (this.goodName == "平安驾乘意外伤害保险") {
              // 这里应该判断人人巴士唯一的渠道号跳转不同模板
              if(this.activityCode == this.rrbsActivityCode && this.orderNo != ''){
                this_.isRouter(false, "/industryJiaCheng");
              }else{
                this_.isRouter(false, "/insuranceJiaCheng");
              }
            } else {
              this_.isRouter(false, "/insurancePingAn");
            }
          } else if (this.goodInsuranceCompanyAlias == "紫金保险") {
            //紫金保险
            this_.isRouter(false, "/insuranceZiJin");
          } else if (this.goodInsuranceCompanyAlias == "京东安联财险") {
            this_.isRouter(false, "/insuranceAnlian");
          } else if (this.goodInsuranceCompanyAlias == "人保财险") {
            this_.isRouter(false, "/insuranceRenBao");
          } else if (this.goodInsuranceCompanyAlias == "安心保险") {
            this_.isRouter(false, "/insuranceAnXin");
          } else if (this.goodInsuranceCompanyAlias == "利宝保险") {
            this_.isRouter(false, "/insuranceLiBao");
          } else if (this.goodInsuranceCompanyAlias == "众安保险") {
            this_.isRouter(false, "/insuranceZhongAn");
          } else if (this.goodInsuranceCompanyAlias == "天安财险") {
            this_.isRouter(false, "/insuranceTianAn");
          } else {
            this_.isRouter(false, "/insurancePingAn");
          }
        }
      } else {
        this.$router.push({
          path: "/loginRegister",
          query: {
            productId: this.goodId,
            activityCode: this.activityCode,
            invitationCode: this.invitationCode,
            topActivityCode: this.topActivityCode,
            shareMid:this.shareMid,
          }
        });
      }
    },
    // 锁定规格提示
    Lockplan(planId){
      if(planId != this.LockplanId){
        this.Toast("规格不可修改");
      }
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
    .van-hairline--top-bottom::after {
      border-width: 3px 0;
      border-bottom: 0px;
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
        padding: 0 25px;
        background-color: white;
        text-align: left;
        color: #666 !important;
      }
      i {
        vertical-align: middle;
        margin-left: -50px;
        margin-top: -5px;
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
      padding: 35px 32px;
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
      width: 140px!important;
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
      width: 140px!important;
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
}
.popuoButton {
  padding-bottom: 100px;
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
// .layui-layer-title {
//   padding: 0 !important;
// }
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
.van-tabbar-item {
  position: relative;
  height: 100%;
}
.fixBar {
  height: auto !important;
  position: relative;
}
.soldOut {
  background-color: #cccccc;
  .van-tabbar-item__text {
    color: #fff;
    font-size: 36px;
  }
}
.popuoButton {
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
.NoActive{
  background-color: white!important;
  color: #1989fa!important;
}
</style>