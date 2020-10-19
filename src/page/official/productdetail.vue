<!-- 组件说明 -->
<template>
  <div class="productdetail" style="position: relative;">
    <van-nav-bar title="产品详情" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon :name="shareIcon" size="14" />
      </template>
    </van-nav-bar>
    <div v-if="skeleton" style="margin-top: 1rem;'">
      <van-skeleton title avatar :row="13" avatar-shape="square" />
    </div>
    <div v-else>
      <!-- 产品详情图、名称及描述 -->
      <details-one v-if="detailShow"></details-one>
      <details-two v-on:SecurityLines="SecurityLines" v-if="detailShow" ref="detailsTow"></details-two>

      <!-- 产品详情、购买须知、理赔服务、客户评价 -->
      <detail-gird v-if="detailShow"></detail-gird>
      
      <div class="listContent">
        <div class="colorBlock"></div>
        <van-grid :column-num="4" icon-size="39px">
          <van-grid-item
            text="产品条款"
            icon="orders-o"
            :to="{name:'productTerms',query:{productName:this.productName,planId:this.planId}}"
          />
          <van-grid-item text="客户告知书" icon="notes-o" @click="ProviewImg(CustomerNotification)" />
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
      <van-action-sheet v-model="showShare" title="立即分享给好友">
        <div class="SharePopup">
          <!-- <div class="copyLink" :data-clipboard-text="copyLink">
            <van-image
              width="50"
              height="50"
              style="display:block;margin:auto;"
              :src="shareIconLink"
            />
            <p style="color:#646566;margin-top:5px;">链接分享</p>
          </div>-->
          <div @click="GeneratePoster()">
            <van-image width="50" height="50" style="display:block;margin:auto;" :src="poster" />
            <p style="color:#646566;margin-top:5px;">海报分享</p>
          </div>
          <div @click="SetWxShareShow()">
            <van-image width="50" height="50" style="display:block;margin:auto;" :src="wxShare" />
            <p style="color:#646566;margin-top:5px;">微信分享</p>
          </div>
        </div>
      </van-action-sheet>
      <!-- 海报DOM -->
      <div class="poster" ref="imagePoster">
        <img class="backgroundImg" :src="posterPic" alt />
        <img class="QRcode" :src="QRcodeImg" alt />
      </div>
      <!-- 生成海报之后的弹出框 -->
      <van-popup
        v-model="posterShow"
        :lazy-render="false"
        :style="{ width: '80%',background: 'transparent' }"
      >
        <img class="GeneratePoster" :src="posterimgUrl" alt />
        <div class="GeneratePoster_text">长按并保存图片分享到微信群或朋友圈</div>
      </van-popup>
      <!-- 条款弹出框 -->
      <van-popup
        v-model="ClauseShow"
        :style="{ width: '100%',height: '100%' }"
        closeable
      >
        <van-nav-bar title="信息(点击“+”号放大查看条款)" />
        <iframe v-if="ClauseShow" id="pdf" :src='"./static/pdf/web/viewer.html?file=" + pdfFilePath' style='width:100%;height:93%'></iframe>
      </van-popup>
      <!-- 投保流程告知 -->
      <van-dialog v-model="InsuredInformShow" class="InsuredInform" title="即将进入投保流程" confirm-button-color="#F99A31" confirm-button-text="知道了" @confirm="informConfirm">
        <img src="@/assets/images/productDetails/InsuredInform.png" alt />
        <p class="InsuredInform_content">请仔细阅读保险条款及客户告知书 <br>投保人在销售页面的操作将被记录</p>
        <div class="InsuredInform_underwrite">
          <p>本产品由浙江环晟保险经纪有限公司提供经纪服务</p>
          <p>由{{this.$store.state.productDetail.data.prodGoods.insuranceCompanyName}}承保</p>
        </div>
      </van-dialog>
      <!-- 告知书弹出框 -->
      <van-action-sheet v-model="notificationShow" title="重要提示" :style="{height:'85%',paddingBottom:'70px'}">
        <div class="notificationContent">
          <h1 class="notificationTitle">浙江环晟保险经纪有限公司【保险经纪网】</h1>
          <h1 class="notificationTitle">客户告知书</h1>
          <p>尊敬的客户：</p>
          <p style="text-indent:2em;">感谢您委托我司（【保险经纪网】平台）代为办理保险业务，本公司是基于投保人的利益，为投保人与保险人订立保险合同提供中介服务的保险专业中介机构。为了保护您的合法权益，根据《中华人民共和国保险法》、《保险经纪人监管规定》及《互联网保险业务监管暂行办法》的要求，现将有关事项告知如下：</p>
          <p>一、公司基本情况</p>
          <p>（一）机构名称：浙江环晟保险经纪有限公司</p>
          <p>（二）机构住所：浙江省杭州市拱墅区密渡桥路1号浙商时代大厦B座6F</p>
          <p>（三）许可证名称：经营保险经纪业务许可证</p>
          <p>（四）许可证编号：260939000000800</p>
          <p>（五）许可证有限期至：2023年02月19日</p>
          <p>（六）业务范围：</p>
          <p>1、经营区域：全国区域内（港、澳、台除外）；</p>
          <p>2、为投保人拟订投保方案，选择保险人，办理投保手续；</p>
          <p>3、协助被保险人或受益人进行索赔；</p>
          <p>4、再保险经纪业务；</p>
          <p>5、为委托人提供防灾、防损或风险评估、风险管理咨询服务；</p>
          <p>6、第二类增值电信业务中的信息服务业务（仅限互联网信息服务）（增值电信业务经营许可证编号：浙B2-20160256）。</p>
          <p>（七）机构关系：浙江环晟保险经纪有限公司是一家经中国银行保险监督管理委员会或原中国保险监督管理委员会批准设立的全国性保险经纪公司，与任何保险公司或保险中介公司无关联关系。</p>
          <p>（八）法律责任：根据《中华人民共和国保险法》相关规定，保险经纪人在办理保险业务中因过错给被保险人造成损失，依法承担赔偿责任。</p>
          <p>（九）联系电话：400-693-8080</p>
          <p>二、请您仔细阅读保险条款，重点关注保险责任、责任免除、被保险人权利义务、免赔额或免赔率的计算、健康保险产品等待期等内容，并可要求本公司客服人员对上述内容进行详细讲解。</p>
          <p>三、请向本公司客服人员了解《中华人民共和国保险法》等法律法规对于索赔时效、保险人理赔时限、合同中止与失效、未成年人投保限额等的相关规定，以及不履行如实告知义务、故意制造保险事故或夸大事故损失、申报年龄或职业不真实等情形导致的法律后果。</p>
          <p>四、本公司承诺将通过有效的技术手段和管理措施对投保人/被保险人/受益人的个人信息、投保交易信息等非公开信息进行保密，严格限制保密信息的接触人，妥善保管保密信息；并在与保险人的数据交换过程中采用了加密与验证保证交易安全。</p>
          <p>五、本公司已按《保险经纪人监管规定》缴存保证金/投保职业责任保险。</p>
          <p>六、如果您发现本公司客服人员存在误导行为及其他损害您合法权益的行为，请注意保留书面证据或其他证据，可向本公司投诉，投诉电话：0571-88290972</p>
          <p>我声明：浙江环晟保险经纪有限公司的客服人员已经对我投保相关的事项讲解清楚，我也对上述内容明确理解。</p>
        </div>
        <van-button type="primary" round  color="linear-gradient(to right, #F7CD45, #ED7932)" block @click="notificationShow = false" :style="{position:'fixed',bottom:'10px',width: '90%',left: 0,right: 0, margin:'auto'}">我已确认并了解以上内容</van-button>
      </van-action-sheet>
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
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import DetailsOne from "@/components/productDetailComponent/detailsOne.vue";
import DetailsTwo from "@/components/productDetailComponent/detailsTwo.vue";
import DetailGird from "@/components/productDetailComponent/detailGird.vue";
import EndModulWhite from "@/components/endModulWhite.vue";
import api from "@/fetch/api";
import $ from "jquery";
import { Toast } from "vant";
import QRCode from "qrcode";
export default {
  name: "productdetail",
  components: {
    DetailsOne,
    DetailGird,
    DetailsTwo,
    EndModulWhite
  },
  data() {
    return {
      planId: "",
      productId: "",
      showShare: false,
      posterShow: false, //海报显示隐藏
      posterimgUrl: "", // 合成海报之后的图片地址（海报加上用户的邀请二维码）
      posterPic: "", // 海报图片
      QRcodeImg: "", // 分享海报二维码图片
      copyLink: "", //复制链接内容
      share: require("@/assets/images/detail/share.png"),
      shareIconLink: require("@/assets/images/detail/share-icon-link.png"),
      wxShare: require("@/assets/images/detail/wxShare.png"),
      poster: require("@/assets/images/detail/poster.png"),
      orders: require("@/assets/images/home/about2.png"),
      notes: require("@/assets/images/home/about3.png"),
      newspaper: require("@/assets/images/home/about1.png"),
      listContentImages1: require("@/assets/images/detail/产品条款.png"),
      listContentImages2: require("@/assets/images/detail/客户告知书.png"),
      listContentImages3: require("@/assets/images/detail/样本保单.png"),
      listContentImages4: require("@/assets/images/detail/常见问题.png"),
      CustomerNotification: require('@/assets/images/productDetails/CustomerNotification.png'),
      shareIcon: require("@/assets/images/detail/shareIcon.png"),
      detailShow: false,
      skeleton: true,
      formRouter: "", //页面路由历史记录
      productName: "", //产品名称
      ShareLink: "", // 分享链接
      ClauseShow: false, // 条款展示
      pdfFilePath:'', // pdf地址
      InsuredInformShow: false, // 投保流程告知
      clauseShow: false, // 条款
      clausePath: '', //条款地址
      notificationShow:false, //告知书弹框
    };
  },
  created() {
    
  },
  watch: {
    $route(to, form) {
      console.log(to.name, form.name);
    }
  },
  mounted() {
    let that = this;
    this.productId = this.getQueryString("productId");
    var args = this.sign({
      productId: this.productId,
      shareMid: this.getCookie("ZB_JUSER_Mid")
    });
    api.getDetail(args).then(res => {
      // 产品名称
      that.productName = res.data.prodGoods.goodName;
      // 产品详情数据 提交到vuex里面
      that.$store.commit("setProductDetail", res);

      // 配置海报图片
      that.posterPic = res.data.prodGoods.posterPic;

      // 分享链接
      that.ShareLink =
        location.origin +
        location.pathname +
        "?productId=" +
        that.getQueryString("productId") +
        "&shareMid=" +
        that.getCookie("ZB_JUSER_Mid") +
        "&invitationCode=" +
        that.getCookie("ZB_JUSER_Invitation_Code");
      // 微信分享  具体分享在main.js 全局路由守卫里面
      if (that.is_weixn()) {
        // 分享图片打包图片
        var ShareImage =
          that.$store.state.baseImagePath + res.data.prodGoods.goodImg;
        // 分享描述
        var str = res.data.prodGoods.goodListPromotionalCopy;
        var descript = str.replace(/<.*?>|(&nbsp;)/gi, "");
        // 分享title
        var title = res.data.prodGoods.goodName;
        // 调用分享
        this.$WXShare(title, descript, ShareImage, that.ShareLink);
      }

      that.detailShow = true;
      that.skeleton = false;
      // 保单样本
      this.$nextTick(function() {
        $(".policySamples").click(function() {
          that.pdfFilePath = window.location.origin + res.data.prodGoods.goodPolicySample;
          // that.ClauseShow = true;
          that.ProviewImg(that.pdfFilePath);
        });
      });

      // 刷新页面，或者首次进入产品详情页面
      if(!this.$store.state.fromRouter || this.$store.state.fromRouter == 'classlist' || this.$store.state.fromRouter == 'home' || this.$store.state.fromRouter == 'home' || this.$store.state.fromRouter == 'StudyArticle' || this.$store.state.fromRouter == 'personalPolicy' || this.$store.state.fromRouter == 'industryPolicy' || this.$store.state.fromRouter == 'vehiclePolicy' || this.$store.state.fromRouter == 'InsuranceSale'){
        this.InsuredInformShow = true; // 投保流程告知
        console.log('调用可回溯录制初始方法');
        // 调用可回溯初始化方法【中科软】 v4.5
        var infor = {};
        infor.productVersion = res.data.prodGoods.goodVersion; //销售产品版本
        infor.orderSysSource = this.$store.state.orderSysSource; //来源
        infor.productCode = res.data.prodGoods.goodCode;//产品编码，必填
        infor.appId="";//登录名
        infor.openId="";//openid
        infor.nodeName="";//节点
        infor.start=0; //必传
        initEasyReplay(infor);
        // 调用可回溯初始化方法【中科软】 v4.5
      }
    });


    // 实例化copy方法
    // this.linkCopy();
  },
  methods: {
    // 流程告知确认
    informConfirm(){
      this.notificationShow = true;
    },
    // 生成海报
    GeneratePoster() {
      if (!this.posterPic) {
        this.$dialog.alert({
          message: "暂无产品海报信息，正在努力制作中，敬请期待",
          theme: "round-button"
        });
        this.showShare = false;
      } else {
        // this.posterimgUrl == "" 没有生成过海报
        if (this.posterimgUrl == "") {
          this.imgLoad(
            document.getElementsByClassName("backgroundImg")[0],
            () => {
              console.log("海报图片加载完毕");
              // 生成海报二维码
              this.generateQRCode(this.ShareLink);
              this.imgLoad(document.getElementsByClassName("QRcode")[0], () => {
                console.log("海报二维码生成完毕");

                (window.html2canvas || html2canvas)($(".poster")[0], {
                  backgroundColor: null
                }).then(Canvas => {
                  let dataURL = Canvas.toDataURL("image/png");
                  this.posterimgUrl = dataURL;
                  console.log("海报图片生成完毕");

                  this.imgLoad(
                    document.getElementsByClassName("GeneratePoster")[0],
                    () => {
                      if (this.posterimgUrl !== "") {
                        this.showShare = false;
                        this.posterShow = true;
                      }
                    }
                  );
                });
              });
            }
          );
        } else{
          this.showShare = false;
          this.posterShow = true;
        }
      }
    },
    // 分享链接copy
    linkCopy() {
      var that = this;
      this.copyLink =
        location.href +
        "&invitationCode=" +
        this.getCookie("ZB_JUSER_Invitation_Code");
      var clipboard = new this.clipboard(".copyLink");
      clipboard.on("success", function(e) {
        that.Toast("链接复制成功");
        that.showShare = false;
      });
      clipboard.on("error", function(e) {
        that.Toast("链接复制失败");
        that.showShare = false;
      });
    },
    onClickLeft() {
      if (!this.$store.state.fromRouter) {
        this.$router.push("classlist");
      } else {
        this.$router.go(-1);
      }
    },
    // 分享按钮
  onClickRight() {
      if(!this.getCookie("ZB_JUSER_Mid")){
        this.$refs.detailsTow.popupLogin(true);
      }else{
        this.showShare = true;
      }
    },
    showLetter() {
      var args = this.sign({});
      api.getCustomBook(args).then(res => {
        console.log(res.data);
      });
    },
    onAddCartClicked(data) {
      this.$toast("add cart:" + JSON.stringify(data));
    },
    //接收计划ID
    SecurityLines(val) {
      this.planId = val;
    },
    // 判断图片是否加载完成
    imgLoad(img, callback) {
      var timer = setInterval(function() {
        if (img.complete) {
          callback(img);
          clearInterval(timer);
        }
      }, 50);
    },
    // 生成分享海报二维码  生成二维码
    generateQRCode(shareLink) {
      console.log(shareLink);
      var that = this;
      var option = {
        errorCorrectionLevel: "H",
        type: "image/jpeg",
        quality: 0.3,
        margin: 1,
        color: {
          dark: "#000000"
        }
      };
      QRCode.toDataURL(shareLink, option)
        .then(imgData => {
          if (imgData) {
            that.QRcodeImg = imgData;
          }
        })
        .catch(err => {
          console.error("生成二维码失败");
        });
    },
    // 微信分享调用子组件 detailsTow 微信分享
    SetWxShareShow() {
      this.$refs.detailsTow.SetWxShareShow();
      this.showShare = false;
    },
    // 预览图片
    ProviewImg(imgPath) {
      this.clausePath = imgPath;
      this.clauseShow = true;
    },
  }
};
</script>

<style lang="scss">
.productdetail {
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
  .van-grid {
    padding: 40px 0px 49px;
  }
  padding-bottom: 80px;
  background: #fff;
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
    .van-icon {
      color: #f92e2e;
    }
    .serverOnline {
      text-align: center;
      border: 2px solid #040404;
      border-radius: 50px;
      padding: 8px 30px;
      margin: 40px 100px;
      color: #333;
      .s1 {
        width: 120px;
        display: inline-block;
        font-size: 24px;
      }
      .s2 {
        vertical-align: top;
        margin-top: 12px;
        display: inline-block;
        margin-left: 15px;
        font-size: 32px;
      }
      .van-icon {
        vertical-align: top;
        margin-top: 16px;
        float: right;
        font-size: 40px;
        margin-right: 40px;
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
  .SharePopup {
    padding: 40px 30px;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    & > div {
      float: left;
      margin-right: 40px;
    }
  }
  .poster {
    width: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    .QRcode {
      position: absolute;
      bottom: 85px;
      right: 67px;
      width: 120px;
    }
  }
  .GeneratePoster_text {
    line-height: 70px;
    padding: 0 20px;
    text-align: center;
    border: white 3px dashed;
    color: white;
    font-size: 26px;
    margin-top: 10px;
  }

  // 投保流程弹窗
  .InsuredInform{
    text-align: center;
    .title{
      margin-top: 50px;
    }
    .InsuredInform_content{
      margin-bottom: 48px;
      font-size: 28px;
      color: #333333;
    }
    .InsuredInform_underwrite{
      margin:0 44px;
      border-top: solid 1px #DDDDDD;
      padding: 22px 0 26px 0;
      p{
        font-size: 24px;
        color: #666666;
      }
    }
    img{
      width: 20%;
      margin: 62px 0 50px;
    }
  }
  .notificationContent{
    line-height: 45px;
    margin-top: 20px;
    padding: 0 40px;
    color: rgb(102,102,102);
  }
  .notificationTitle{
    color: black;
    font-weight: 500;
    text-align: center;
    font-size: 32px;
  }
}
</style>