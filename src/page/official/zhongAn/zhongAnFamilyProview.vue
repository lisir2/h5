<!-- 组件说明 保单预览-->
<template>
  <div class="policyPreview">
    <van-nav-bar title="预览投保信息" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="mainBox">
      <p class="productName">{{goodName}}</p>
      <!-- 基本信息 -->
      <div class="essentInfo">
        <van-cell title="基本信息" :icon="titleIcon3" />
        <ul v-for="(item,index) in configList" :key="index">
          <li v-if="index == 'startTime'">
            <span class="list_01">起保日期</span>
            <span>{{configList[index]}}</span>
          </li>
          <li v-else-if="index == 'endTime'">
            <span class="list_01">结束日期</span>
            <span>{{configList[index]}}</span>
          </li>
          <li v-else-if="index == 'number'">
            <span class="list_01">投保份数</span>
            <span>{{configList[index]}}份</span>
          </li>
          <li v-else-if="index == 'policyFee'">
            <span class="list_01">合计保费</span>
            <span>{{configList[index]}}元</span>
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
          <van-cell title="被保险人信息" :icon="titleIcon4" />
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
        <!-- <div class="otherInfo" v-if="Object.keys(items.other).length != 0">
          <div class="blank10"></div>
          <van-cell title="其他信息" :icon="titleIcon1" />
          <ul>
            <div v-for="(item1,index) in items" :key="index">
              <div v-if="index == 'other'">
                <li v-for="(item,index) in item1" :key="item">
                  <span class="list_01">{{index}}</span>
                  <span>{{item}}</span>
                </li>
              </div>
            </div>
          </ul>
          <div class="blank10"></div>
        </div>-->
      </div>
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
          <div>
            <router-link
              :to="{name:'productTerms',query: {productName:goodName,planId:planId}}"
            >《产品条款》</router-link>
            <a
              v-for="(item , index) in newClauseList"
              href="javascript:void(0)"
              @click="showFile(link + item.termFilePath)"
              :key="index"
            >《{{item.termName}}》</a>
          </div>
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
          <van-tabbar-item class="gobuy" @click="onPolicyPay">确认提交</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
    <!-- 弹出遮罩层 -->
    <van-popup v-model="loadingShow" :lock-scroll="false" style="background-color: transparent;" :close-on-click-overlay="false">
            <!-- 加载动画 -->
        <van-loading size="24px" vertical color="#1989fa">数据加载中...</van-loading>
    </van-popup>
  </div>
</template>

<script>
import api from "@/fetch/api";
import $ from "jquery";
import {
  required,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
export default {
  name: "zhongAnFamilyProview",
  components: {},
  data() {
    return {
      titleIcon1: require("@/assets/images/others/personal1.png"),
      titleIcon2: require("@/assets/images/others/personal2.png"),
      titleIcon3: require("@/assets/images/others/personal3.png"),
      titleIcon4: require("@/assets/images/others/personal4.png"),
      titleIcon5: require("@/assets/images/others/personal5.png"),
      titleIcon6: require("@/assets/images/others/personal6.png"),
      link: this.$store.state.JumpPath, //pdf打开地址
      startTime: "",
      endTime: "",
      policyFee: "",
      number: "",
      holderName: "",
      holderType: "",
      holderNo: "",
      holderBirth: "",
      holderSex: "",
      holderMailBox: "",
      housesAgeLimit: "",
      situation: "",
      holderList: "", //投保人信息
      inserdList: "", //被保险人信息  其他信息包含在被保险人信息里面
      other: "",
      newOtherList: [], //解析出来之后的其他信息
      newHolderList: "", //解析之后的投保人信息
      newInserdList: [], //解析之后的被保险人信息
      address: "",
      configList: "",
      goodName: "",
      checked: false, //是否阅读协议及条款
      clauseList: "", //条款列表-->传递到下一个页面的
      newClauseList: [], //条款列表-->本页面真正的渲染的
      orderNo: "", //产品id
      orderId: "", //计划id
      taxpayerNo: "", //纳税人识别号
      companyAttribute: "", //单位性质
      productId: "", //产品id
      planId: "", //计划id
      loadingShow: false, //加载动画
      inserdNum: "", //被保险人个数
    };
  },
  mounted() {
    // 可回溯 在生成订单加载的时候 执行
    var infor={};
    infor.productVersion="testversion"; //销售产品版本
    infor.orderSysSource="1"; //来源
    infor.orderCode=this.$route.query.id;//此处传递对应的订单号
    _postParams(infor);
    console.log("可回溯 在生成订单加载的时候 执行传入订单号");
    

    var that = this;
    // 获取产品id 判读那些字段要展示
    this.orderNo = this.$route.query.orderNo;
    this.orderId = this.$route.query.orderId;
    var args = this.sign({ id: this.orderId });
    // 获取投保预览信息
    // this.$axios.post("/arg/openapi/Order/appPreviewpolicy", args).then(res => {
    api.zhongAnPreviewpolicy(args).then(res => {
      this.configList = res;
      this.policyFee = res.policyFee;
      this.holderList = res.holder;
      this.inserdList = res.inserd;
      this.goodName = res.goodName;
      this.productId = res.goodId;
      this.planId = res.planId;
      this.inserdNum = res.inserd.length;
      // 少于两个被保险人 跳到众安产品详情页面
      if (this.inserdNum < 2) {
        layer.alert('少于两个被保险人', {
          end: function(){
            that.$router.push({
              path: "productdetail",
              query:{productId:that.productId}
            });
          }
        })
      } else {
        var args1 = this.sign({
          productId: this.productId,
          planId: this.planId
        });
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
            } else {
              otherArr.push(ele);
            }
          });

          // 解析被保险人信息
          var inserdInfo = "";
          // 解析被保险人其他信息
          var otherInfo = "";
          for (var i = 0; i < this.inserdList.length; i++) {
            // 解析被保险人信息
            inserdInfo = this.inserdList[i]; //单个inserd对象
            // 解析被保险人标的信息
            if (this.inserdList[i].other) {
              otherInfo = JSON.parse(this.inserdList[i].other); //被保险人单个other对象 字符串转JSON
            }
            // 根据投保配置页面数据映射key value
            for (var j = 0; j < otherArr.length; j++) {
              for (var key in otherInfo) {
                // 浙江省汽车维修企业员工团体意外伤害保险 删除标的信息 里面的值
                if (key == "cityCode" || key == "provinceCode") {
                  // 投保人省市编号
                  delete otherInfo[key];
                }

                // 标的信息转换
                var newkey = otherArr[j].colcode; //key值
                if (newkey == key) {
                  otherInfo[otherArr[j].colname] = otherInfo[key];
                  delete otherInfo[key];
                }
              }
            }
            delete inserdInfo.other; //删除other

            // 被保险人信息解析
            for (var t = 0; t < inserdArr.length; t++) {
              for (var key in inserdInfo) {
                var newkey = inserdArr[t].colcode; //key值
                if (newkey == key) {
                  if (key == "insuredBirth") {
                    inserdInfo[inserdArr[t].colname] = inserdInfo[key].split(
                      " "
                    )[0];
                  } else {
                    inserdInfo[inserdArr[t].colname] = inserdInfo[key];
                  }
                  delete inserdInfo[key]; //companyAttribute
                }
              }
            }
            inserdInfo.other = otherInfo;
            this.newInserdList.push(inserdInfo);
          }

          // 获取投保人 other信息，映射数据
          for (var key in this.holderList) {
            if (key == "else") {
              var holder_other = JSON.parse(this.holderList[key]);
              // 浙江省汽车维修企业员工团体意外伤害保险 删除标的信息 里面的值
              for (var keys in holder_other) {
                if (keys == "taxpayerNo") {
                  // 纳税识别号 编号转文字
                  that.holderList.taxpayerNo = holder_other[keys];
                } else if (keys == "companyAttribute") {
                  // 企业单位性质 编号转文字
                  that.holderList.companyAttribute = holder_other[keys];
                }
              }
              delete this.holderList[key];
            }
          }

          // 投保人信息解析
          for (var i = 0; i < holderArr.length; i++) {
            for (var key in this.holderList) {
              var newkey = holderArr[i].colcode; //key值
              if (newkey == key) {
                if (key == "holderBirth") {
                  this.holderList[holderArr[i].colname] = this.holderList[
                    key
                  ].split(" ")[0];
                } else {
                  this.holderList[holderArr[i].colname] = this.holderList[key];
                }
                delete this.holderList[key];
              }
            }
          }
          this.newHolderList = this.holderList;
        });

        // 条款
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
        });
      }
    });
  },
  methods: {
    oldPeople(res) {
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
    onClickLeft() {
      // 判断是否有责任除外 有的话历史回退 没有的话跳转到投保页面
      if(this.$route.query.exclusions){
        // 直接回退到投保页面
        this.$router.push({
          path: "productdetail",
          query:{productId:this.productId}
        });
      } else{
        this.$router.go(-1);
      }
    },
    onPolicyPay() {
      let that = this;
      if (this.checked == false) {
        Toast("请同意条款和告知");
      } else if (this.inserdNum < 2) {
        Toast("至少两个被保险人");
      } else {
        this.loadingShow = true;
        // 先核保在支付
        var args1 = this.sign({ id: this.orderId });
        api
          .zhongAnappAddpolicy(args1)
          .then(
            res => {
              if (res.code == 1) {
                // 支付
                var args = this.sign({ id: res.data });
                api.gePolicyPay(args).then(res => {
                  //公共支付
                  let response = res; //上线删除.data
                  if (response.success) {
                    //老年人特殊处理（直接拉起微信支付）
                    if (that.goodName == "杭州市老年人团体意外伤害统筹保险") {
                      that.oldPeople(response.content.data);
                    } else if (response.payUrl) {
                      location.href = response.payUrl;
                    } else if (response.content) {
                      $("body").append(response.content);
                    }
                  } else {
                    alert("请前往微信客户端打开网站进行投保！");
                  }
                });
              } else {
                this.Toast(res.message);
                this.loadingShow = false;
              }
            },
            err => {
              this.loadingShow = false;
              this.Toast(err.message);
            }
          )
          .catch(error => {
            this.loadingShow = false;
            this.Toast(err.message);
          });
      }
    },
    showFile(url) {
      layer.open({
        type: 1,
        title: "信息(点击“+”号放大查看条款)",
        area: ["100%", "100%"], //宽高
        content:
          "<iframe src='./static/pdf/web/viewer.html?file=" +
          url +
          "' style='width:100%;height:100%'></iframe>"
      });
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
</style>