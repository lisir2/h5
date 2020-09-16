<!-- 组件说明 平安驾乘投保页面,由于平安驾乘分为渠道的和自己平台的，投保字段不一样，一款产品后台只能配置一个，投保配置信息，所以渠道进来的投保信息写死-->
<template>
<div>
    <div v-if="showPage">
        <van-skeleton title :row="20" style="padding-top: 0.5rem;"/>
    </div>
    <div v-else class='policyMain'>
        <p class="productName">{{goodName}}</p>
        <p class="startTime">
            <ul>
                <li>
                    <span class="list_01">起保时间</span>
                    <span class="list_02">
                        <input type="text" placeholder="点击选择起保日期" id="time" :value="lineItem.time" readonly>
                    </span>
                </li>
            </ul>
        </p>
        <!-- 投保人板块 -->
        <div>
            <div class="holderPolicy">
                <p class="policyTitle">
                    <van-icon :name="titleIcon4" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
                    <span>投保人信息</span>
                </p>
                <ul>
                    <li>
                        <span class="list_01">投保人姓名</span>
                        <span class="list_02">
                            <div>
                                <input type="text" name="holderName" :value="lineItem.holderName" :readonly="tripType == 1 ? true : false" :placeholder="lineItem.personnelType == '团体' ? '请输入企业名称' : '请输入投保人姓名'" id="holderName">
                            </div>
                        </span>
                    </li>
                    <li>
                        <span class="list_01">证件类型</span>
                        <span class="list_02">
                            <div>
                                <van-action-sheet
                                v-model="typeShow_holder"
                                :actions="holderCertificateType"
                                cancel-text="取消"
                                @select="TypeSelect_holder"
                                title="请选择证件类型"
                                />
                                <input type="text" placeholder="请选择证件类型" id="holderCertificateType" name="holderCertificateType" readonly :ref="holderCertificateType" :value="lineItem.personnelType == '个人' ? '身份证' : '统一社会信用代码'">
                                <!-- <van-icon name="arrow"/> -->
                            </div>
                        </span>
                    </li>
                    <li>
                        <span class="list_01">证件号码</span>
                        <span class="list_02">
                            <div>
                                <input type="text" name="holderCertificateNo" :value="lineItem.holderCertificateNo" id="holderCertificateNo" placeholder="请填写投保人证件号码" maxlength="18" ref="holderCertificateNo" :readonly="tripType == 1 ? true : false">
                            </div>  
                        </span>
                    </li>
                    <li>
                        <span class="list_01">手机号码</span>
                        <span class="list_02">
                            <div>
                                <input type="text" name="holderPhone"  placeholder="请输入手机号码" :value="lineItem.holderPhone" maxlength="11" readonly id="holderPhone">
                            </div>  
                        </span>
                    </li>
                    <li>
                        <span class="list_01">电子邮箱</span>
                        <span class="list_02">
                            <div>
                                <input type="text" name="holderMailbox" :value="lineItem.holderMailbox"  placeholder="请输入电子邮箱" id="holderMailbox" :readonly="tripType == 1 ? true : false">
                            </div>  
                        </span>
                    </li>
                    <li v-if="lineItem.personnelType == '团体'">
                        <span class="list_01">联系人姓名</span>
                        <span class="list_02">
                            <div>
                                <input type="text" name="linkManName" placeholder="请输入联系人姓名" id="linkManName">
                            </div>  
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- 被保险人和标的信息 -->
        <div class="allInserd">
            <div class="inserdAndOther">
                <!-- 遍历生成被保险人模块 -->
                <div>
                    <div class="inserdPolicy">
                        <!-- index下标小于1的话,该产品没有被保险人 -->
                        <p class="policyTitle">
                            <van-icon :name="titleIcon5" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
                            <span>被保险人信息</span>
                        </p>
                        <div v-if="typeof(vehicleInformation) == 'object'">
                            <ul v-for="(item,index) in vehicleInformation" :key="index">
                              <li style="display: flex!important;">
                                  <span class="list_01">座位数</span>
                                  <span class="list_02">
                                      <div>
                                          <input type="text" placeholder="请输入座位数" ref="virtualInsuredNum" name="virtualInsuredNum" id="virtualInsuredNum" :value="item.virtualInsuredNum" readonly>
                                      </div>
                                  </span>
                              </li>
                              <li>
                                  <span class="list_01">车架号</span>
                                  <span class="list_02">
                                      <div>
                                          <input type="text" placeholder="请输入车架号" ref="vehicleFrameNo" name="vehicleFrameNo" id="vehicleFrameNo" :value="item.vehicleFrameNo" readonly>
                                      </div>
                                  </span>
                              </li>
                              <li>
                                  <span class="list_01">发动机号</span>
                                  <span class="list_02">
                                      <div>
                                          <input type="text" placeholder="请输入发动机号" ref="engineNo" name="engineNo" id="engineNo" :value="item.engineNo" readonly>
                                      </div>
                                  </span>
                              </li>
                              <li>
                                  <span class="list_01">车牌号</span>
                                  <span class="list_02">
                                      <div>
                                          <input type="text" placeholder="请输入车牌号" ref="vehicleLicenceCode" name="vehicleLicenceCode" id="vehicleLicenceCode" :value="item.vehicleLicenceCode" readonly>
                                      </div>
                                  </span>
                              </li>
                          </ul>
                        </div>
                        <div v-else>
                          <ul>
                            <li style="display: flex!important;">
                                <span class="list_01">座位数</span>
                                <span class="list_02">
                                    <div>
                                        <input type="text" placeholder="请输入座位数" ref="virtualInsuredNum" name="virtualInsuredNum" id="virtualInsuredNum" :value="virtualInsuredNum" readonly>
                                    </div>
                                </span>
                            </li>
                          </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="beneFiciary">
                <p class="policyTitle">
                  <van-icon :name="titleIcon2" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
                  <span>受益人信息</span>
                </p>
                <ul>
                    <li>
                        <span class="list_01">受益人类型</span>
                        <span class="list_02">法定受益人</span>
                    </li>
                </ul>
                <p class="policyTitle">
                  <van-icon :name="titleIcon6" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
                  <span>保费</span>
                </p>
                <ul>
                    <li>
                        <span class="list_01">购买份数</span>
                        <span>
                            <van-stepper v-model="totalVal" min="1" :max="productNum" @change="changePrice"/>
                        </span>
                    </li>
                    <li>
                        <span class="list_01">合计保费</span>
                        <span>￥{{totalPrice}}</span>
                    </li>
                </ul>
            </div>
        <div class="fixBar">
            <van-tabbar>
                <van-tabbar-item class="price">￥{{totalPrice}}</van-tabbar-item>
                <van-tabbar-item class="gobuy" @click="onCheckPolicy">立即投保</van-tabbar-item>
            </van-tabbar>
        </div> 
        <!-- 弹出遮罩层 -->
        <van-popup v-model="loadingShow" :lock-scroll="false" style="background-color: transparent;" :close-on-click-overlay="false">
            <!-- 加载动画 -->
            <van-loading size="24px" vertical color="#1989fa">数据加载中...</van-loading>
        </van-popup>
    </div>
</div>
</template>

<script>
//import x from ''
import area from "../../../../static/js/area";
import api from "../../../fetch/api";
import $ from "jquery";
import { isIdCard, isPhoneNumber, isEmail } from "../../../util/validate";
// 弹出常用联系人
import popupContacts from '../../../components/popupContacts' 
export default {
  name: "insurancePingAn",
  components: {
    popupContacts: popupContacts
  },
  data() {
    return {
      titleIcon1: require("../../../assets/images/others/personal1.png"),
      titleIcon2: require("../../../assets/images/others/personal2.png"),
      titleIcon3: require("../../../assets/images/others/personal3.png"),
      titleIcon4: require("../../../assets/images/others/personal4.png"),
      titleIcon5: require("../../../assets/images/others/personal5.png"),
      titleIcon6: require("../../../assets/images/others/personal6.png"),
      shareLinks: this.getQueryString("shareMid"), //分享者mid
      showPage:true,
      loadingShow: false, //加载动画是否显示
      typeShow_holder: false, //投保人证件类型是否显示
      totalPrice: "",
      onePrice: "", //单件产品价格
      totalVal: "1", //产品个数
      productId: "", //产品id
      goodName: "", //产品名称
      inserdNum: 1, //投保人个数
      productNum: 1, //产品上线个数
      holderCertificateType:[{"name":"身份证","value":"身份证"},{"name":"统一社会信用代码","value":"统一社会信用代码"}],
      virtualInsuredNum:'', //座位数
      rrbsActivityCode:'QD202003240001', //人人巴士固定渠道号
      activityCode: this.getQueryString("activityCode"), //渠道码
      orderNo:this.getQueryString("orderNo"),  //订单号
      vehicleInformation:'', //车辆信息
      lineItem:'', //订单详情
      tripType:'', //延期
    };
  },
  created(){
    
  },
  mounted() {
    /**
     * 中科软可回溯
     */
    var infor={};
    infor.start=1; //必传
    initEasyReplay(infor);//初始化


    this.onePrice = this.$route.query.priceResult; // 价格
    this.productId = this.$route.query.productId; // 产品id
    this.planId = this.$route.query.planId; // 计划id
    var laydate = layui.laydate;
    var this_ = this;

    // 根据产品id 获取产品名称
    var args = this.sign({ productId: this.productId,planId:this.planId });
    // 获取单个投保人、被保险人、其他 信息
    api.getSetPolicy(args).then(res => {
      this_.showPage = false;
      this_.$nextTick(()=>{
        // 产品名称
        this_.goodName = res.data.policyParams.goodName;
      })
    });

    // 渲染人人巴士订单信息
    if (this.orderNo != '' && this.activityCode == this.rrbsActivityCode) {
      var args = this.sign({ orderNo: this.orderNo });
      api.renrenData(args).then(res=>{
      // this.$axios.post('/org/openapi/Order/renrenData',args).then(res=>{
        var result = res;
        if(result.success){
          this.lineItem = result;
          this.tripType = result.tripType; //延期状态 1 延期 0不延期
          this.virtualInsuredNum = result.virtualInsuredNum;
          // 判断是否续保
          if(result.tripType == 1){
            // 延期
            this.vehicleInformation = result.list;
          }

          this.$nextTick(function(){
            this.changePrice(); //价格试算
          })
        }else{
          this.Toast(res.message)
        }
      })
    }
  },
  methods: {
    //投保人证件类型选择回调
    TypeSelect_holder(item) {
      this.typeShow_holder = false;
      $('#holderCertificateType').val(item.value);
    },
    changePrice() {
      // 价格 * 人数 * 份数
      this.totalPrice = this.accMul(Number(this.onePrice),Number(this.totalVal),Number(this.virtualInsuredNum));
    },
    //调用核保接口
    onCheckPolicy() {
      var this_ = this;
      // 延期直接跳转预览页面
      if(this.tripType == 1){
        this_.$router.push({
          path: "/industryJiaChengPreview",
          query: {
            orderNo: this_.orderNo,
            goodName:this_.goodName,
          }
        });
      }else{
        var data = {
          planId: this.getQueryString('planId'), 
          goodId: this.getQueryString('productId'), 
          time: $("#time").val(),
          holderName:$('#holderName').val(),
          holderCertificateType:$('#holderCertificateType').val(),
          holderCertificateNo:$('#holderCertificateNo').val(),
          holderPhone:$('#holderPhone').val(),
          holderMailbox:$('#holderMailbox').val(),
          virtualInsuredNum:$('#virtualInsuredNum').val(),
          policyFee: this.totalPrice,
          activityCode:this.getQueryString('activityCode'),  //活动id
          orderNo:this.orderNo,
        };
        if(data.holderName == ''){
            this.Toast('请输入投保人姓名');
        }else if(data.holderCertificateType == ''){
            this.Toast('请选择投保人身份证类型');
        }else if(this.lineItem.personnelType == '团体' && $('#linkManName').val() == ''){
          this.Toast('请输入联系人姓名');
        }else if(data.holderCertificateNo == ''){
            this.Toast('请输入投保人身份证号');
        }else if(
          data.holderCertificateType == "身份证" &&
          isIdCard(data.holderCertificateNo) == false
        ){
          this.Toast('投保人身份证号码不正确');
        }else if(data.holderPhone == ''){
            this.Toast('请输入投保人手机号');
        }else if(data.holderMailbox == ''){
            this.Toast('请输入投保人邮箱');
        }else if(data.virtualInsuredNum == ''){
            this.Toast('请输入座位数');
        }else{
          // 判断个人或团体传不同参数
          if(this.lineItem.personnelType == '团体'){
            data.linkManName = $('#linkManName').val();
          }else if(this.lineItem.personnelType == '个人'){
            data.linkManName = $('#holderName').val();
          }
          // 加载动过
          this_.loadingShow = true;
          // 核保
          var args = this.sign(data);
          // this.$axios.post('/org/openapi/Order/renrenInsureData',args).then(  //林彰淼核保接口
          api.renrenInsureData(args).then(
              response => {
                  let data = response; //上线删除.data
                  this_.loadingShow = false;
                  if (data.success == true) {
                      this_.$router.push({
                        path: "/industryJiaChengPreview",
                        query: {
                          orderNo: this_.orderNo,
                          goodName:this_.goodName,
                        }
                      });
                  } else {
                      this_.loadingShow = false;
                      Toast(data.message);
                  }
              },
              err => {
                  this_.loadingShow = false;
                  Toast(err.message);
              }
              )
              .catch(error => {
                  this_.loadingShow = false;
                  Toast(err.message);
              });
        }
        console.log(data)
      }
    },
  }
};
</script>

<style lang='scss'>
.van-action-sheet{
  max-height: 100%;
}
.policyMain {
  .van-icon__image{
      width: 40px;
      height: 40px;
      vertical-align: middle;
      margin-top: -8px;
      font-size: 18px;
  }
  .productName {
    height: 110px;
    line-height: 110px;
    color: #0c0c0c;
    font-size: 32px;
    font-weight: 600;
    padding: 0 20px;
    background-color: #F7F7F7;
  }
  .policyTitle {
    font-size: 32px;
    font-weight: 500;
    color: #0c0c0c;
    width: 100%;
    height: 88px;
    line-height: 88px;
    padding-left: 1em;
    background-color: #f7f7f7;
    span {
      font-size: 32px;
      font-weight: 500;
      color: #0c0c0c;
      height: 88px;
      line-height: 88px;
    }
  }
    .holderPolicy,
    .inserdPolicy,
    .otherPolicy,
    .beneFiciary,
    .startTime {
      &>ul {
        li {
          border-bottom: 2px solid #dddddd;
          width: 100%;
          height: 100px;
          line-height: 100px;
          display: flex;
          .list_01 {
            display: inline-block;
            height: 100px;
            line-height: 100px;
            width: 27%;
            margin-left: 5%;
            color: #0c0c0c;
            font-size: 28px;
          }
          .list_02 {
            width: 65%;
            display: inline-block;
            height: 100px;
            line-height: 100px;
            &>div{
              img{
                width: 44px;
              }
            }
            .van-action-sheet__close {
              padding: 0 30px;
            }
            .van-radio-group {
              display: flex;
              margin: 30px auto;
              .van-radio {
                margin-right: 30px;
              }
            }
            input[type="text"] {
              width: 87%;
              height: 70px;
            }
          }
          .van-stepper {
            display: contents;
            input {
              line-height: 28px;
            }
          }
        }
      }
    }
  .fixBar {
    .van-tabbar {
      height: 100px;
      line-height: 100px;
    }
    .van-tabbar-item--active {
      color: #666;
    }
    .van-tabbar-item:nth-child(2) {
      flex: 2;
      color: #333;
    }
    .van-tabbar-item:nth-child(3) {
      flex: 3;
      color: #333;
    }
   .price {
      .van-tabbar-item__icon{
        display: none;
      }
      .van-tabbar-item__text {
        font-weight: 600;
        font-size: 36px;
        color: #f9912e;
      }
    }
    .gobuy {
      background: #f9912e;
      .van-tabbar-item__icon{
        display: none;
      }
      .van-tabbar-item__text {
        color: #fff;
        font-size: 36px;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 100px;
        font-weight:bold;
      }
    }
  }
  .van-dialog {
    .van-button {
      border: 0;
      width: 80%;
      margin: 0 auto;
      display: block;
      border-radius: 50px;
      margin-bottom: 20px;
      height: 40px;
      line-height: 40px;
    }
  }
}
.layui-form-radio {
  margin-top: 0 !important;
}
#time {
  width: 87%;
  height: 98px;
}
</style>