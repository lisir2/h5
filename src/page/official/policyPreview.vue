<!-- 组件说明 保单预览-->
<template>
  <div class="policyPreview">
    <van-nav-bar title="预览投保信息" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="mainBox">
      <p class="productName">{{goodName}}</p>
      <!-- 基本信息 -->
      <div class="essentInfo">
        <van-cell title="基本信息" :icon="titleIcon3" />
        <ul>
          <li>
            <span class="list_01">投保份数</span>
            <span>{{configList.number}}份</span>
          </li>
          <li>
            <span class="list_01">合计保费</span>
            <span>{{configList.policyFee}}元</span>
          </li>
          <li>
            <span class="list_01">起保日期</span>
            <span>{{configList.startTime}}</span>
          </li>
          <li>
            <span class="list_01">结束日期</span>
            <span>{{configList.endTime}}</span>
          </li>
        </ul>
      </div>
      <div class="blank10"></div>
      <!-- 投保人信息 -->
      <div class="holderInfo">
        <van-cell title="投保人信息" :icon="titleIcon5" />
        <ul>
          <li v-for="(item,index) in newHolderList" :key="index">
            <span class="list_01">{{index}}</span>
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
      <!-- 被保险人信息 -->
      <div v-for="(items,index) in newInserdList" :key="index">
        <!-- 被保险人信息里面包含其他信息，如果没有被保险人信息和其他信息，则被保险人title不展示，如果被保险人里面只有other，则被保险人title不展示 -->
        <div
          class="otherInfo"
          v-if="Object.keys(items).length == 0 ? false : (Object.keys(items).length == 1 ?  (Object.keys(items)[0] == 'other' ? false : true ) : true)"
        >
          <div class="blank10"></div>
          <van-cell :title="InsuredInformation(index,newInserdList)" :icon="titleIcon4" />
          <ul>
            <div v-for="(item,index) in items" :key="index">
              <li v-if="index != 'other'">
                <span class="list_01" v-if="index != 'other'">{{index}}</span>
                <span v-if="index != 'other'">{{item}}</span>
              </li>
            </div>
          </ul>
        </div>
        <!-- 其他信息 -->
        <div class="otherInfo" v-if="items.other ? Object.keys(items.other).length != 0 : false">
          <div class="blank10"></div>
          <van-cell title="其他信息" :icon="titleIcon1" />
          <ul>
            <div v-for="(item1,index) in items" :key="index">
              <div v-if="index == 'other'">
                <li v-for="(item,index) in item1" :key="index">
                  <span class="list_01">{{item[0]}}</span>
                  <span>{{item[1]}}</span>
                </li>
              </div>
            </div>
          </ul>
          <div class="blank10"></div>
        </div>
      </div>
      <!-- 受益人信息 -->
      <div class="otherInfo" v-if="BeneficiaryData.length == 0 || BeneficiaryData == null">
        <van-cell title="受益人信息" :icon="titleIcon5" />
        <ul>
          <li>
            <span class="list_01">受益人</span>
            <span>法定受益人</span>
          </li>
        </ul>
      </div>
      <!-- 指定受益人组件 -->
      <BeneficiaryPreview
        v-if="BeneficiaryData.length != 0 && BeneficiaryData != null"
        :BeneficiaryData="BeneficiaryData"
        :syrInfoList="syrInfoList"
        :getChineseKey="getChineseKey"
      ></BeneficiaryPreview>
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
              @click="$showPDF(link + item.termFilePath)"
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
            <span>1</span>份，合计:
            <span class="totalPrice">￥{{policyFee}}</span>
          </van-tabbar-item>
          <van-tabbar-item
            v-if="IsInsuredConfirmation"
            class="gobuy"
            @click="InsuredConfirmation()"
          >我确认已知晓</van-tabbar-item>
          <van-tabbar-item
            v-else
            class="gobuy"
            @click="goodName == '平安驾乘意外伤害保险' || '个人综合意外保障' ? paymentPopup() : onPolicyPay()"
          >确认支付</van-tabbar-item>
          <div class="cover"></div>
        </van-tabbar>
      </div>
    </div>
    <!-- 平安驾乘支付弹框 -->
    <!-- <JiaChengPay
      :payShow="payShow"
      :policyFee="policyFee"
      @payShow="changePayShow($event)"
      :goodName="goodName"
    ></JiaChengPay> -->
    <!-- 平台非见费支付弹框 -->
    <paymentPopPay
      :payShow="payShow"
      :orderNo="orderNo"
      :policyFee="policyFee"
      @payShow="changePayShow($event)"
      :goodName="goodName"
    ></paymentPopPay>
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
    <!-- 投保声明条款 -->
    <van-popup
      v-model="DeclarationClauseShow"
      :style="{ width: '85%', boxSizing:'border-box'}"
      closeable
      class="DeclarationClause"
      round
    >
      <p class="title">请认真阅读协议，特别是产品条款和投保须知等内容</p>
      <div>
        <a v-for="(item , index) in AllClause"
          href="javascript:void(0)"
          @click="$showPDF(link + item.termFilePath)"
          :key="index"
        >《{{item.termName}}》</a>
      </div>
      <!-- 同意协议 -->
      <van-button type="info" size="large" color="#f9912e" :style="{marginTop:'20px'}" @click="IsInsuredConfirmation ? inserdConsent() : holderConsent()">我已阅读且同意协议并投保</van-button>
    </van-popup>
    <!-- 微信分享 -->
    <van-popup
      v-model="wxShare_show"
      position="bottom"
      @click="OrderCountdownFun()"
      :style="{ width:'100%',height:'100%',background: 'rgba(0,0,0,0)' }"
    >
      <img
        src="@/assets/images/agent/shareShade.png"
        alt="分享"
        style="margin-top:-25px;width:80%;float:right;"
      />
    </van-popup>
    <!-- 被保人获取验证码，确认 -->
    <van-dialog v-model="verificationCodeShow" title="短信验证" show-cancel-button @cancel="verificationCodeShow=false" @confirm="CheckVerificationCode" :beforeClose="(action, done)=>{done(false);}">
      <div style="padding:20px;">
        <van-field v-model="verificationCode" placeholder="请输入短信验证码" clearable :maxlength="6"/>
        <p>短信验证码已发送至{{this.getQueryString('insuredPhone')}}，如短信验证码已过期，请联系投保人{{holderList.holderName}}重新发起验证。</p>
      </div>
    </van-dialog>
    <!-- 立即分享给好友 -->
    <van-action-sheet v-model="showShare" title="立即分享给好友">
        <div class="SharePopup">
          <div class="copyLink" :data-clipboard-text="copyLink">
            <van-image
              width="50"
              height="50"
              style="display:block;margin:auto;"
              :src="shareIconLink"
            />
            <p style="color:#646566;margin-top:5px;">链接分享</p>
          </div>
        </div>
    </van-action-sheet>
    <!-- 订单倒计时 -->
    <van-dialog v-model="OrderCountdownShow" title="被保险人确认验证" class="OrderCountdown" get-container=".policyPreview" show-cancel-button @confirm="dialogConfirm" confirm-button-text="确定">
      <p style="position: absolute;top: -34px;color: white;text-align: center;width: 100;left: 0;right: 0;">距离订单关闭还剩：{{OrderCountdown}}</p>
      <p style="padding:20px 30px;">务必请被保险人在6小时内完成确认，否则此订单将自动关闭！如果被保险人已完成确认，请点击“确定”按钮，去支付保费。</p>
    </van-dialog>
  </div>
</template>

<script>
import BeneficiaryPreview from "@/page/official/tianAn/BeneficiaryPreview";
// import JiaChengPay from "@/page/official/pingAn/JiaChengPay";
import paymentPopPay from "@/page/official/paymentPopPay";
import $ from "jquery";
import api from "@/fetch/api";
import {
  required,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
export default {
  name: "policyPreview",
  components: { BeneficiaryPreview, paymentPopPay }, // JiaChengPay
  data() {
    return {
      titleIcon1: require("@/assets/images/others/personal1.png"),
      titleIcon2: require("@/assets/images/others/personal2.png"),
      shareIconLink: require("@/assets/images/detail/share-icon-link.png"),
      titleIcon3: require("@/assets/images/others/personal3.png"),
      titleIcon4: require("@/assets/images/others/personal4.png"),
      titleIcon5: require("@/assets/images/others/personal5.png"),
      titleIcon6: require("@/assets/images/others/personal6.png"),
      weiXinIcon: require("@/assets/images/weiXin.jpg"),
      zhiFuBaoIcon: require("@/assets/images/zhiFuBao.jpg"),
      link: this.$store.state.JumpPath, //pdf打开地址
      orderNo: "", // 订单号
      policyFee: "", // 价格
      holderList: "", //投保人信息
      inserdList: [], //被保险人信息  其他信息包含在被保险人信息里面
      other: "",
      newOtherList: [], //解析出来之后的其他信息
      newHolderList: {}, //解析之后的投保人信息
      newInserdList: [], //解析之后的被保险人信息
      configList: "", // 所有预览信息
      goodName: "", // 产品名称
      checked: false, //是否阅读协议及条款
      clauseList: "", //条款列表-->传递到下一个页面的
      newClauseList: [], //条款列表-->本页面真正的渲染的
      productId: "", //产品id
      planId: "", //计划id
      taxpayerNo: "", //纳税人识别号
      companyAttribute: "", //单位性质
      BeneficiaryData: "", //受益人信息
      goodInsuranceCompanyAlias: "", //保险公司
      payShow: false, //支付方式显示隐藏
      loadingShow: false, //支付动画
      syrInfoList: [], // 配置 受益人列表
      DeclarationClauseShow: false, // 投保声明条款
      AllClause:[], // 产品条款
      wxShare_show: false, // 微信分享
      IsInsuredConfirmation: this.getQueryString('insuredPhone'), // 是否是被保险人确认（投保人分享出来的带insuredPhone参数）
      verificationCodeShow: false, // 验证码校验，确认保单
      verificationCode:'', // 验证码
      copyLink: '', // 非微信浏览器复制链接
      showShare: false, // 非微信浏览器分享弹框
      IsNeedInsuredConfirm: false, // 是否需要被保人确认
      insuredPhone: '', // 被保人手机号（投保人分享时拼接参数）
      isGroupOrder: '', // 是否团单 (1:是；0：否)
      isIncludingDeathLiability: '', //是否含身故责任(1:是；0：否)
      previewTime:'', // 预览页面的时间（倒计时用）
      OrderCountdown: '', // 订单倒计时间
      OrderCountdownShow: false, // 订单倒计时是否展示
      countdownStarts: false, // 倒计时是否开始（投保人分享之后生成倒计时，如果已经生成再次分享直接展示）
      uuid:'', // 验证码id
      confirmStatus: '', // 被保人是否确认（1是，0否）
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
    var args = this.sign({ id: Pid });
    // 获取投保预览信息
    api.appPreviewpolicy(args).then(res => {
      console.log(res)
      this.goodInsuranceCompanyAlias = res.product.goodInsuranceCompanyAlias;
      this.configList = res;
      this.orderNo = res.orderNo;
      this.policyFee = res.policyFee;
      this.holderList = res.holder;
      this.goodName = res.goodName;
      this.inserdList = res.inserd;
      this.BeneficiaryData = res.beneficiary;
      this.isGroupOrder = res.isGroupOrder;
      this.isIncludingDeathLiability = res.isIncludingDeathLiability;
      this.confirmStatus = res.confirmStatus;
      this.previewTime = res.previewTime;

      // 投保人预览时调用
      if(!this.IsInsuredConfirmation){
        // 判断该保单是否需要被保人确认
        var insuredAge = this.inserdList[0].insuredBirth ? this.Utils.getFullAge(this.inserdList[0].insuredBirth.split(' ')[0]) : '';
        // (insuredRelationship:被保人不是本人、子女(子女大于等于18岁、 isGroupOrder=0:不是团单 、isIncludingDeathLiability=1:包含身故责任) -> 需要被保人确认、this.confirmStatus == 0：未确认)
        if(this.inserdList[0].insuredRelationship && this.inserdList[0].insuredRelationship != '本人' && (this.inserdList[0].insuredRelationship == '子女' && insuredAge < 18 ? false : true) && this.isGroupOrder == 0 && this.isIncludingDeathLiability == 1 && this.confirmStatus == 0){
          this.IsNeedInsuredConfirm = true;
          this.insuredPhone = this.inserdList[0].insuredPhone;
          // 判断被保险人类型 调用微信分享（被保险人非本人、子女调用微信分享）
          this.JudgeInsuredIncokeWXShare();
        }
      } else{
        // 被保人预览时调用
        this.$dialog.alert({
          title: '需要被保险人确认',
          message: '根据监管要求，以死亡为给付条件、被保险人与投保人不一致的保险产品时，需要被保险人进行确认后，方可投保！请务必在<span style="color:red;">6</span>小时内完成相关条款及其它内容的确认，否则订单将自动关闭，投保失败。',
          confirmButtonText: '知道了',
        });

        // 分享出去的被保人确认页面，调用重新录制（后期他们会根据订单号，合并视频）
        var infor = {};
        infor.productVersion = res.product.goodVersion; //销售产品版本
        infor.orderSysSource = this.$store.state.orderSysSource; //来源
        infor.productCode = res.product.goodCode;//产品编码，必填
        infor.appId="";//登录名
        infor.openId="";//openid
        infor.nodeName="";//节点
        infor.start=0; //必传
        initEasyReplay(infor);
      }

      // 可回溯 在生成订单加载的时候 执行
      var infor = {};
      infor.productVersion = res.product.goodVersion; //销售产品版本
      infor.orderSysSource = this.$store.state.orderSysSource; //来源
      infor.orderCode = res.orderNo; //此处传递对应的订单号
      _setOrder(infor);
      // 可回溯 在生成订单加载的时候 执行

      //家政特殊处理段落
      if (res.product.goodName == "环晟-平安家政服务综合保险") {
        //处理投保人相关
        let detailAddress = this.holderList["holderAddress"];
        for (let item in this.holderList) {
          if (item == "totalAssets") {
            this.holderList["totalAssets"] =
              JSON.parse(this.holderList["else"]).totalAssets / 10000 + "万元";
          } else if (item == "industryCodeLevel4Text") {
            this.holderList["industryCodeLevel4Text"] = JSON.parse(
              this.holderList["else"]
            ).industryCodeLevel4Text;
          } else if (item == "holderAddress") {
            this.holderList["holderAddress"] = JSON.parse(
              this.holderList["else"]
            ).addRess;
          } else if (item == "detailAddress") {
            this.holderList["detailAddress"] = detailAddress.split(",")[1];
          }
        }
        delete this.holderList.else;
        //处理被保险人相关
        for (let i = 0; i < this.inserdList.length; i++) {
          for (let item in this.inserdList[i]) {
            if (item == "jobType") {
              this.inserdList[i]["jobType"] = JSON.parse(
                this.inserdList[i].other
              ).jobName;
            } else if (item == "jobName") {
              this.inserdList[i]["jobName"] = JSON.parse(
                this.inserdList[i].other
              ).jobName;
            }
          }
          delete this.inserdList[i].other;
        }
      }

      var args1 = this.sign({ productId: this.productId, planId: this.planId });
      // 投保人配置信息
      var holderArr = [];
      // 被保险人配置信息
      var inserdArr = [];
      // 其他配置信息
      var otherArr = [];
      // 获取单个投保人、被保险人、其他 信息
      api.getSetPolicy(args1).then(res => {
        $.each(res.data.prodPolicyInputs, function(index, ele) {
          if (ele.classcode == "tbr_info") {
            holderArr.push(ele);
          } else if (ele.classcode == "bbr_info") {
            inserdArr.push(ele);
          } else if (ele.classcode == "other_info") {
            otherArr.push(ele);
          } else if (ele.classcode == "syr_info") {
            that.syrInfoList.push(ele);
          }
        });

        // 被保险人映射
        this.inserdList.forEach(element => {
          var parseInserdObj = {};
          for (const key in element) {
            // 截取被保险人出生日期
            if (key == "insuredBirth") {
              try {
                element[key] = element[key].split(" ")[0];
              } catch (error) {}
            }

            let chineseKey = this.getChineseKey(key, inserdArr);
            if (chineseKey) {
              // 如果value值为空，不映射
              if (element[key] != "" && element[key] != null) {
                //说明映射出了中文健
                parseInserdObj[chineseKey.name] = element[key];
              }
            } else if (key == "other") {
              // 解析被保险人other，映射中文
              var parseOtherObj = []; //映射中文和排序之后的数组
              var OtherSort = []; //排序之后的Other数组
              var OtherList = []; //映射中文之后的Other数组

              try {
                var otherObj = JSON.parse(element[key]);
              } catch (error) {
                var otherObj = {};
              }
              for (const key in otherObj) {
                // 映射对应中文
                let chineseKey = this.getChineseKey(key, otherArr); //返回映射中文名和排序
                if (chineseKey && key != "cityCode" && key != "provinceCode") {
                  OtherList[chineseKey.sort] = [chineseKey.name, otherObj[key]];
                }
              }
              //其他信息排序
              let OtherSort = Object.keys(OtherList).sort(function(a, b) {
                return b - a;
              });
              OtherSort.forEach(item => {
                parseOtherObj.push(OtherList[item]);
              });
              parseInserdObj.other = parseOtherObj;
            }
          }
          if (Object.keys(parseInserdObj).length > 0) {
            this.newInserdList.push(parseInserdObj);
          }
        });

        // 投保人信息解析   holderArr:[{colcode:"holderName",colname:"姓名"}]
        for (const key in this.holderList) {
          // 截取投保人出生日期
          if (key == "holderBirth") {
            try {
              this.holderList[key] = this.holderList[key].split(" ")[0];
            } catch (error) {}
          }

          let chineseKey = this.getChineseKey(key, holderArr);
          // 如果value值为空，不映射
          if (chineseKey) {
            if (this.holderList[key] != "" && this.holderList[key] != null) {
              //说明映射出了中文健
              this.newHolderList[chineseKey.name] = this.holderList[key];
            }
          }
        }
      });
    });

    var params = this.sign({ planId: this.planId });
    // 获取投保声明条款
    api.getProdPolicyDown(params).then(res => {
      let data = res.data;
      that.clauseList = data;

      data.forEach(element => {
        let obj = {}; //开始组装对象
        if (element.termType == "3") {
          // obj["termName"] = "产品条款";
          // obj["termType"] = 3;
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
      // 获取所有产品条款 + 投保声明条款
      this.getAllClause();
    });
  },
  methods: {
    //根据传入的英文键，返回对应的中文健
    //第一个参数：英文键
    //第二个参数要映射中文的数组：holderArr:[{colcode:"holderName",colname:"姓名"}]
    getChineseKey(key, holderArr) {
      let reslute = {};
      for (let i = 0; i < holderArr.length; i++) {
        if (holderArr[i].colcode == key) {
          reslute.name = holderArr[i].colname;
          reslute.sort = holderArr[i].sort;
        }
      }
      if (Object.keys(reslute).length != 0) {
        return reslute;
      }
    },
    // 微信支付
    oldPeople(res) {
      let that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: res.appid,
          timeStamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
          package: res.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: res.paySign // 支付签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            that.$router.push("/paySuccess");
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            // 支付失败
            that.$router.push("/paymentFailure");
          }
        }
      );
    },
    // 老年人支付 
    wxH5OldOrderPay(args){
      api.wxH5OldOrderPay(args).then(res=>{
        var result = res;
        if(result.code == 20000){
            if(result.data.tradeType == "MWEB"){
              // 其他浏览器支付
              window.location.href = result.data.mweb_url+"&redirect_url="+encodeURIComponent("https://" + location.host + "/hsfront/TianAnPayState?merchantSeq=" + result.data.merchantSeq);
            }
        }else{
            this.Toast(res.message);
            this.loadingShow = false;
        }
      },err => {
        this.loadingShow = false;
        this.Toast(err.message);
      }).catch(error => {
        this.loadingShow = false;
        this.Toast(err.message);
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 获取所有产品条款 + 投保声明条款
    getAllClause(){
      var planId=this.$route.query.planId;
        var args=this.sign({planId:planId});
        api.getTerms(args).then(res => {
          $.each(res.data,(index,ele)=>{
              if(ele.termType=="3"){
                  this.AllClause.push(ele);
              }
          })
          this.AllClause.push(...this.newClauseList);
        })
    },
    // 弹出驾乘支付方式
    paymentPopup() {
      if (this.checked) {
        // 判断被保人是否需要确认
        this.InsuredConfirmationPopup(()=>{
          this.payShow = true;
        })
      } else {
        this.DeclarationClauseShow = true;
      }
    },
    // 公用支付
    onPolicyPay() {
      let that = this;
      if (this.checked == false) {
        this.DeclarationClauseShow = true;
      } else {
        // 判断被保人是否需要确认
        this.InsuredConfirmationPopup(()=>{
          that.loadingShow = true;
          var Pid = this.$route.query.id;
          var args = this.sign({ 
            id: Pid,
            isAgree:1, // 是否同意条款
          });
          // 非微信浏览器
          if(that.goodName == "杭州市老年人团体意外伤害统筹保险" && !that.is_weixn()){
            that.wxH5OldOrderPay(args);
          }else{
            api.gePolicyPay(args).then(response => {
              // 公共支付
                if (response.success) {
                  //老年人和平安驾乘意外伤害保险特殊处理（直接拉起微信支付）
                  if (that.goodInsuranceCompanyAlias == "天安财险") {
                    //天安的产品执行渲染后台返回的页面
                    document.write(response.content);
                    document.close();
                  } else if( that.goodName == "平安驾乘意外伤害保险" || that.goodName == "杭州市老年人团体意外伤害统筹保险") {
                    that.oldPeople(response.content.data);
                  } else if (response.payUrl) {
                    //返路径直接跳
                    location.href = response.payUrl;
                  } else if (response.content) {
                    //返回form表单 添加到body里面
                    $("body").append(response.content);
                  }
                } else {
                  that.loadingShow = false;
                  that.Toast(response.message);
                }
            },
            err => {
              that.loadingShow = false;
              that.Toast(err.message);
            }).catch(error => {
              that.loadingShow = false;
              that.Toast(err.message);
            });
          }
        });
      }
    },
    //子组件改变父组件 平安驾乘支付方式弹出框显示状态
    changePayShow(isBoole) {
      this.payShow = isBoole;
    },
    // 被保人信息+个数(如果只有一个被保人不展示个数)
    InsuredInformation(index, newInserdList) {
      if (newInserdList.length > 1) {
        return "被保险人信息" + (index + 1);
      } else {
        return "被保险人信息";
      }
    },
    // 同意条款弹出框，被保人同意协议
    inserdConsent(){
      this.checked = true;
      this.InsuredConfirmation();
      this.DeclarationClauseShow = false;
    },
    // 条款弹出框，投保人同意协议
    holderConsent(){
      this.DeclarationClauseShow = false;
      this.checked = true;
      this.InsuredConfirmationPopup();
    },
    // 被保人点击确认
    InsuredConfirmation(){
      if(this.checked){
        // 给被保人发送验证码
        var args = this.sign({
          userPhone: this.IsInsuredConfirmation,
          btype: "10",
          id: this.getQueryString('id'),
        });
        api.getphoneCode(args).then(res => {
          if (res.code == "20000") {
            this.uuid = res.data.uuids;
            this.verificationCodeShow = true;
          } else {
            this.Toast.fail(res.message);
          }
        });
      }else{
        this.DeclarationClauseShow = true;
      }
    },
    // 校验被保人确认验证码
    CheckVerificationCode(){
      if(this.verificationCode == ''){
        this.Toast('请输入验证码');
      }else{
        var params = new URLSearchParams(location.search);
        var args = this.sign({
          insuredPhone: this.IsInsuredConfirmation,
          id: this.getQueryString('id'),
          uuid: this.uuid,
          insuredPhoneCode:this.verificationCode,
          insurancePreviewUrl: location.protocol + "//" + location.host + location.pathname + '?id=' + params.get('id') + '&productId=' + params.get('productId') + '&planId=' + params.get('planId'), // 投保地址
        });
        // 被保人确认
        api.insuredConfirmInsuranceInformation(args).then(res=>{
          if(res.code == 20000){
            this.Toast(res.data);
            this.verificationCodeShow = false;
          }else{
            this.Toast(res.message);
          }
        })
      }
    },
    /**
     * 判断是否需要被保险人确认 
     * callback:不需要被保险人确认执行的回调
     */
    InsuredConfirmationPopup(callback){
      // 被保人不是本人 或 子女
      if(this.IsNeedInsuredConfirm){
        // 需要被保险人确认
        this.$dialog.confirm({
          title: '需要被保险人确认',
          message: '根据监管要求，以死亡为给付条件、被保险人与投保人不一致的保险产品时，需要被保险人进行确认后，方可投保！请点击分享，将此页面分享给被保险人确认！',
          confirmButtonText: '立即分享',
        }).then(() => {
          // 微信分享
          if(this.is_weixn()){
            this.wxShare_show = true;
          }else{
            // 非微信分享
            this.showShare = true;
          }
        })
        .catch(() => {
          // on cancel
        });
      }else{
        if(callback){
          callback()
        }
      }
    },
    // 判断被保险人类型 调用微信分享（被保险人非本人、子女调用微信分享）
    JudgeInsuredIncokeWXShare(){
      if(this.is_weixn()){
        // 分享图片
        let ShareImage = location.protocol + "//" + location.host + '/hsfront' + require('@/assets/images/home/logo.png').substring(1);
        // 分享链接
        let shareLink = location.href + '&insuredPhone=' + this.insuredPhone;
        this.$WXShare("请您尽快确认投保信息！6小时内有效！", "根据监管要求，投保人"+ this.holderList.holderName +"为您投保的产品，需要您确认后，方可投保！", ShareImage, shareLink);
      }else{
        // 非微信链接分享
        this.linkCopy();  // 实例化copy链接方法
      }
    },
    // 展示订单倒计时
    OrderCountdownFun(){
      this.wxShare_show = false;
      this.OrderCountdownShow = true;
          if(!this.countdownStarts){
            // 订单倒计时
            var time = setInterval(() => {
              var timeRemaining = this.countDown(this.previewTime.replace(/-/g,"/"));
              if(timeRemaining.hours == 0 && timeRemaining.minutes == 0 && timeRemaining.seconds == 0){
                clearInterval(time);
              }
              this.OrderCountdown = timeRemaining.hours + '小时' + timeRemaining.minutes + '分钟' + timeRemaining.seconds + '秒';
            }, 1000);
          }
          this.countdownStarts = true;
    },
    // 分享链接copy
    linkCopy() {
      var that = this;
      this.copyLink = location.href + '&insuredPhone=' + this.insuredPhone;
      var clipboard = new this.clipboard(".copyLink");
      clipboard.on("success", function(e) {
        that.Toast("链接复制成功");
        that.showShare = false;
        that.OrderCountdownFun();
      });
      clipboard.on("error", function(e) {
        that.Toast("链接复制失败");
        that.showShare = false;
      });
    },
    // 订单倒计时
    countDown(timeDate){
      // 投保时间加上6小时进行倒计时
      var the = new Date(timeDate).setHours(new Date(timeDate).getHours() + 6);
      var date = the - new Date();
      var days = Math.floor(date / 1000 / 60 / 60 / 24); // 从这里开始
      var daysmod = date - days * 24 *60 * 60 * 1000 ;
      var hours = Math.floor(daysmod / 1000 / 60 / 60) ;
      var hoursmod = date - (days * 24 *60 * 60 * 1000) - (hours * 1000 * 60 * 60) ;
      var minutes = Math.floor(hoursmod / 1000 / 60);
      var minutesmod = date - (days * 24 *60 * 60 * 1000) - (hours * 1000 * 60 * 60) - (minutes * 1000 * 60);
      var seconds = Math.floor(minutesmod / 1000); // 到这里结束，是将总毫秒转化成对应天数+小时数+分钟数+秒数的转换方法
      return {
        days,
        hours,
        minutes,
        seconds,
      }
    },
    // 分享成功确认按钮
    dialogConfirm(){
      var Pid = this.$route.query.id;
      var args = this.sign({ id: Pid });
      // 获取投保预览信息
      api.appPreviewpolicy(args).then(res => {
        this.confirmStatus = res.confirmStatus;
        if(this.confirmStatus){
          // 是否需要被保人确认 this.confirmStatus == 1 已经被确认了,修改IsNeedInsuredConfirm状态为 false
          this.IsNeedInsuredConfirm = false;
          this.goodName == '平安驾乘意外伤害保险' || '个人综合意外保障' ? this.paymentPopup() : this.onPolicyPay();
        }
      })
    },
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
  // 投保声明条款弹出框
  .DeclarationClause {
    padding: 30px 50px;
    text-align: center;
    .title {
      margin-top: 50px;
      font-size: 30px;
    }
    div{
      margin-top: 30px;
      padding-top: 30px;
      border-top: solid 1px #eeeeee;
      a{
        line-height: 50px;
        display: block;
        color: #4D648E;
      }
    }
  }
  // 链接分享好友
  .SharePopup {
    padding: 40px 30px;
    overflow: hidden;
    display: flex;
    // justify-content: space-around;
    & > div {
      float: left;
      margin-right: 40px;
    }
  }
  .OrderCountdown{
    overflow: initial;
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