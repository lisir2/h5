<!-- 组件说明 -->
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
                        <input type="text" placeholder="点击选择起保日期" id="time" readonly>
                    </span>
                </li>
            </ul>
        </p>
        <!-- 投保人板块 -->
        <div v-if="holderList.length > 0">
            <div class="holderPolicy">
                <p class="policyTitle">
                    <van-icon :name="titleIcon4" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
                    <span>投保人信息</span>
                </p>
                <ul>
                    <li v-for="item in holderList" :key="item.id">
                        <span class="list_01">{{item.colname}}</span>
                        <span class="list_02">
                            <div v-if="item.colcode === 'holderName'">
                                <input type="text" :name="item.colcode" placeholder="请填写投保人姓名" :ref="item.colcode">
                                <img src="../../../assets/images/person.png" alt="" @click="contacts('tbr')">
                            </div>
                            <div v-else-if="item.colcode === 'holderSex'" :name="item.colcode">
                                <form class="layui-form" action="javascript:void;">
                                    <div class="layui-input-inline holderSex" style="margin-top:0;">
                                        <input type="radio" name="sex" v-for="(radioItem,index) in item.value" :key="radioItem.name" :value="radioItem.value" :title="radioItem.name" :checked="index == 0 ? 'checked' :''" :ref="item.colcode">
                                    </div>
                                </form>
                            </div>
                            <div v-else-if="item.colcode === 'holderCertificateType'">
                                <van-action-sheet
                                v-model="typeShow_holder"
                                :actions="item.value"
                                cancel-text="取消"
                                @select="TypeSelect_holder"
                                title="请选择证件类型"
                                />
                                <input type="text" placeholder="请选择证件类型" @select="TypeSelect_holder" @click="typeShow_holder = true" id="holderCertificateType" :name="item.colcode" readonly :ref="item.colcode">
                                <van-icon name="arrow"/>
                            </div>
                            <div v-else-if="item.colcode === 'holderCertificateNo'">
                                <input type="text" :name="item.colcode" class="holderCertificateNo" placeholder="请填写投保人证件号码" @keyup="getMoreInfoHolder" maxlength="18" :ref="item.colcode">
                            </div>
                            <div v-else-if="item.colcode === 'holderBirth'">
                                <input type="text" placeholder="请选择出生日期" id="holderBirth" :name="item.colcode" readonly :ref="item.colcode">
                            </div>                                              
                            <div v-else-if="item.colcode === 'holderMailbox'">
                                <input type="text" placeholder="请填写邮箱号码" :name="item.colcode" :ref="item.colcode">
                            </div>
                            <div v-else>
                                <input type="text" :name="item.colcode" :placeholder="item.value" maxlength="11" :ref="item.colcode">
                            </div>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- 被保险人信息 -->
        <div class="inserdPolicy">
            <!-- index下标小于1的话,该产品没有被保险人 -->
            <p class="policyTitle" v-if="inserdList.length > 0">
                <van-icon :name="titleIcon5" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
                <span>被保险人信息</span>
            </p>
            <ul>
                <li v-for="(item,index) in inserdList" :key="index">
                    <span class="list_01">{{item.colname}}</span>
                    <span class="list_02">
                        <!-- 被保险人姓名 -->
                        <div v-if="item.colcode === 'insuredName'">
                            <input type="text" :name="item.colcode" placeholder="请填写被保险人姓名" :ref="item.colcode" class="insuredName">
                            <img src="../../../assets/images/person.png" alt="" @click="contacts('bbr')">
                        </div>
                        <!-- 被保险人性别 -->
                        <div v-else-if="item.colcode === 'insuredSex'" >
                            <form class="layui-form" action="javascript:void;">
                                <div class="layui-input-inline insuredSex" :name="item.colcode">
                                    <input type="radio" name="sex" v-for="(radioItem,index) in item.value" :key="radioItem.name" :value="radioItem.value" :title="radioItem.name" :checked="index == 0 ? 'checked' :''" :ref="item.colcode">
                                </div>
                            </form>
                        </div>
                        <!-- 被保险人证件类型 -->
                        <div v-else-if="item.colcode === 'insuredCertificateType'">
                            <van-action-sheet
                              v-model="insuredCertificateType"
                              :actions="item.value"
                              @select="TypeSelect_inserd"
                              cancel-text="取消"
                              title="请选择证件类型"
                            />
                            <input type="text" placeholder="请选择证件类型" @select="TypeSelect_inserd" @click="ChooseType_inserd()" :name="item.colcode" id="insuredCertificateType" readonly :ref="item.colcode">
                            <van-icon name="arrow" />
                        </div>
                        <!-- 被保险人证件号 --> 
                        <div v-else-if="item.colcode === 'insuredCertificateNo'">
                            <input type="text" :name="item.colcode" class="insuredCertificateNo" placeholder="请填写被保险人证件号码" @keyup="getMoreInfoInserd()" maxlength="18" :ref="item.colcode">
                        </div>
                        <!-- 被保险人出生日期 -->
                        <div v-else-if="item.colcode === 'insuredBirth'">
                            <input type="text" placeholder="请选择出生日期" id="insuredBirth" class="insuredBirth" :name="item.colcode" readonly :ref="item.colcode">
                        </div>
                        <!-- 与投保人关系 -->
                        <div v-else-if="item.colcode === 'insuredRelationship'">
                            <van-action-sheet
                            v-model="insuredRelationship"
                            :actions="item.value"
                            @select="holderSelect_Relationship"
                            cancel-text="取消"
                            title="与投保人关系"
                            />
                            <input type="text" placeholder="与投保人关系" @select="holderSelect_Relationship" @click="showSelect_Relationship()" id="insuredRelationship" :name="item.colcode" readonly :ref="item.colcode">
                            <van-icon name="arrow" />
                            <!-- <input type="text" :placeholder="item.value" :name="item.colcode"> -->
                        </div>
                          <div v-else-if="item.colcode === 'insuredPhone'">
                            <input type="text" :placeholder="item.value" :name="item.colcode" :ref="item.colcode" class="insuredPhone" maxlength="11">
                        </div>
                        <!--学校名称-->
                        <div v-else-if="item.colcode === 'schoolName'">
                            <input type="text" :placeholder="item.value" :name="item.colcode" :ref="item.colcode" class="schoolName">
                        </div>

                        <!--班级名称-->
                        <div v-else-if="item.colcode === 'className'">
                            <input type="text" :placeholder="item.value" :name="item.colcode" :ref="item.colcode" class="className">
                        </div>
                        <div v-else>
                            <input type="text" placeholder="" :name="item.colcode" :ref="item.colcode">
                        </div>
                    </span>
                </li>
            </ul>
        </div>
        <!-- 标的信息 -->
        <div class="otherPolicy">
            <p class="policyTitle" v-if="otherList.length > 0">
                <van-icon :name="titleIcon1" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
                <span>其他信息</span>
            </p>
                <ul>
                    <li v-for="item in otherList" :key="item.id">
                        <span class="list_01">{{item.colname}}</span>
                        <span class="list_02">
                            <div v-if="item.colcode === 'transportation'" :name="item.colcode">
                                <input type="text" @click="transportationShow()"  :id="item.colcode" :name="item.colcode" citySelect="citySelect" placeholder="请选择交通方式" value="民航飞机" readonly>
                                <van-icon name="arrow" />
                                <!-- 交通方式 -->
                                <van-action-sheet v-model="transportation" cancel-text="取消" title="交通方式" :actions="item.value" @select="transportationSelect" />
                            </div>
                            <!-- 座位数 -->
                            <div v-else-if="item.colcode === 'SeatNumber'">
                                <input type="tel" :placeholder="item.value" :name="item.colcode" oninput="value=value.replace(/[^\d]/g,'');if((value > 9 || value < 1) && value != '' ){alert('座位数限制1-9');value=''}">
                            </div>
                            <div v-else>
                                <input type="text" :placeholder="item.value" :name="item.colcode">
                            </div>
                        </span>
                    </li>
                </ul>
        </div>

        <div class="beneFiciary">
                <!-- 受益人组件 -->
                <BeneficiaryData :syrArr='syrArr'></BeneficiaryData>
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
        <!-- 常用联系人 -->
        <van-action-sheet title="选择常用联系人" v-model="showContacts" position="bottom" :style="{ height: '100%',borderRadius:'0' }">
            <popupContacts @Contacts="ChildContacts"></popupContacts>
        </van-action-sheet>
    </div>
</div>
</template>

<script>
import area from "../../../../static/js/area";
import api from "../../../fetch/api";
import $ from "jquery";
import { isIdCard, isPhoneNumber, isEmail } from "../../../util/validate";
// 弹出常用联系人
import popupContacts from "../../../components/popupContacts";
import BeneficiaryData from "../../../components/base/BeneficiaryData";
export default {
  name: "insuranceTianAn",
  components: {
    popupContacts,
    BeneficiaryData
  },
  data() {
    return {
      titleIcon1: require("../../../assets/images/others/personal1.png"),
      titleIcon2: require("../../../assets/images/others/personal2.png"),
      titleIcon3: require("../../../assets/images/others/personal3.png"),
      titleIcon4: require("../../../assets/images/others/personal4.png"),
      titleIcon5: require("../../../assets/images/others/personal5.png"),
      titleIcon6: require("../../../assets/images/others/personal6.png"),
      transportation:false   ,//标的信息、交通方式选择框默认不展示
      BeneficiaryCert:false ,//受益人证件类型
      BeneficiaryInput:false  ,//受益人信息输入框展示、默认不展示、选择指定受益人的时候展示
      BeneficiaryTye:false,//受益人类型弹出框，默认不展示出来
      BeneficiaryData:'', //受益人信息
      showPage: true,
      loadingShow: false, //加载动画是否显示
      holderList: "", //投保人配置信息(需要让用户填写的信息)
      inserdList: "", //存放单个被保险人基本配置信息
      //投保人区域
      holderBirth: "", //投保人性别
      typeShow_holder: false, //投保人证件类型是否显示
      //被保险人区域
      insuredCertificateType:false, //被保险人证件类型显示隐藏
      insuredRelationship:false, //与投保人关系控件显示隐藏
      //底部信息 标的信息
      otherList: "",
      totalPrice: "",
      onePrice: "", //单件产品价格
      totalVal: 1, //产品个数
      productId: "", //产品id
      goodName: "", //产品名称
      inserdNum: 1, //投保人个数
      productNum: 1, //产品上线个数
      insuredNum: 0, //被保险人上线个数
      inserdArr: "",
      minPolicyDate: 1, //最小起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
      maxPolicyDate: 1, //最大起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
      showContacts: false, //常用联系人弹窗是否显示
      person: "", //选择常用联系人的是投保人，还是被保险人
      syrArr:[], //受益人数组
    };
  },
  
  mounted() {
    this.onePrice = this.$route.query.priceResult; // 价格
    this.productId = this.$route.query.productId; // 产品id
    this.planId = this.$route.query.planId; // 计划id
    this.changePrice(); //价格试算
    var laydate = layui.laydate;
    var that = this;
    // 投保人配置信息
    var holderArr = [];
    // 被保险人配置信息
    var inserdArr = [];
    // 其他配置信息
    var otherArr = [];

    // 根据产品id 获取产品名称
    var args = this.sign({ productId: this.productId, planId: this.planId });
    // 获取单个投保人、被保险人、其他 信息
    api.getSetPolicy(args).then(res => {
      that.showPage = false;
      that.$nextTick(() => {
        // 产品名称
        that.goodName = res.data.policyParams.goodName;
        // 最大起保日期
        that.maxPolicyDate = res.data.policyParams.goodSlowestEffectiveTime;
        // 最小起保日期
        that.minPolicyDate = res.data.policyParams.goodFastestEffectiveTime;
        // 获取产品详情根据计划id，获取最大产品个数
        that.productNum = res.data.policyParams.insuredPortion;
        // 渲染起保日期 日历
        layui.use("laydate", function() {
          var laydate = layui.laydate;
          var time = new Date().setDate(
            new Date().getDate() + Number(that.minPolicyDate)
          );
          // 起保时间
          laydate.render({
            elem: "#time",
            type: "date",
            format: "yyyy-MM-dd",
            min: +Number(that.minPolicyDate), //起保日期
            max: +Number(that.maxPolicyDate),
            value: that.timestampToTime(time, true),
            done: value => {
              $("#time").val(value);
            }
          });
        });

        // 投保配置信息
        var prodPolicyInputs = res.data.prodPolicyInputs;
        $.each(prodPolicyInputs, function(index, ele) {
          if (ele.classcode == "tbr_info") {
            try {
              ele.value = eval(ele.value);
            } catch (error) {}
            holderArr.push(ele);
          } else if (ele.classcode == "bbr_info") {
            try {
              ele.value = eval(ele.value);
            } catch (error) {}
            inserdArr.push(ele);
          } else if (ele.classcode == "other_info") {
            try {
              ele.value = eval(ele.value);
            } catch (error) {}
            otherArr.push(ele);
          } else if (ele.classcode == "bbr_num") {
            try {
              ele.value = eval(ele.value);
            } catch (error) {}
            that.insuredNum = ele.value;
          }else if (ele.classcode == "syr_info") {
            try {
              ele.value = eval(ele.value);
            } catch (error) {}
            that.syrArr.push(ele);
          }
        });
        
        // 取出 投保人信息数据
        this.holderList = holderArr;
        // 取出 被保人信息
        this.inserdList = inserdArr;
        // 取出其他 配置信息
        this.otherList = otherArr;

        // 绑定日期选择器
        this.$nextTick(function() {
          layui.use(["laydate", "form"], function() {
            var laydate = layui.laydate;
            var form = layui.form;
            //投保人出生日期
            laydate.render({
              elem: "#holderBirth",
              max: new Date().setDate(new Date().getDate()),
              done: value => {
                $("#holderBirth").val(value);
              }
            });
            // 默认第一个被保险人出生日期
            laydate.render({
              elem: "#insuredBirth",
              max: new Date().setDate(new Date().getDate()),
              done: value => {
                $("#insuredBirth").val(value);
              }
            });
            form.render();
          });
        });

        //天安---驾乘无忧做特殊处理
        if(this.goodName === '驾乘无忧'){
          this.$nextTick(function() {
            $('.inserdPolicy').hide();
          })
        }
      });
    });
  },
  methods: {
    // 选择常用联系人
    ChildContacts(res) {
      this.showContacts = false;
      // 调用公共常用联系人回调
      this.Utils.SelectContacts(res, this.person, 0);
    },
    // 常用联系人
    contacts(person) {
      // 显示常用联系人弹窗
      this.showContacts = true;
      // 选择的是投保人 还是被保险人
      this.person = person;
    },
    // 交通方式选择回调
    transportationSelect(item){
      this.transportation = false
      $('#transportation').val(item.name)
    },
    transportationShow(){
      this.transportation = true;
    },
    BeneficiaryTyeCert_Select(item){
      this.BeneficiaryCert = false;
      $('#BeneficiaryCert').val(item.name)
    },
    BeneficiaryTye_onSelect(item){
      this.BeneficiaryTye = false;
      $('#BeneficiaryTye').val(item.name)
      if(item.name == '指定受益人'){
        this.BeneficiaryInput = true;
        this.$nextTick(function(){
          layui.use('laydate',function(){
            let laydate = layui.laydate;
            laydate.render({
            elem: '#BeneficiaryBirth'
            });
          })
        })
      }else if(item.name == '法定受益人'){
        this.BeneficiaryInput = false;
      }
    },
    //投保人证件类型选择回调
    TypeSelect_holder(item) {
      this.typeShow_holder = false;
      this.$refs.holderCertificateType[0].value = item.value;
      // 判断身份证回调类型为身份证的时候，性别锁死
      this.Utils.CertificateTypeLockSex(item.value,$(".holderSex"),this.getMoreInfoHolder());
    },
    //投保人区域
    //被保险人证件类型选择回调
    TypeSelect_inserd(item) {
      this.insuredCertificateType = !this.insuredCertificateType;
      $("#insuredCertificateType").val(item.name);
      // 被保人身份证锁定性别
      this.Utils.CertificateTypeLockSex(item.value, $(".insuredSex"),this.getMoreInfoInserd());
    },
    //被保险人证件类型 显示隐藏
    ChooseType_inserd() {
      this.insuredCertificateType = !this.insuredCertificateType;
    },
    // 投保人与被保险人关系类型选择 显示隐藏
    showSelect_Relationship() {
      this.insuredRelationship = true;
    },
    //被保险人与投保人关系类型选择回调
    holderSelect_Relationship(item) {
      //获取到投保人信息
      var holder = {}; //投保人信息
      var inserdAllList = []; //被保险人信息
      var that = this;
      // 获取投保人填写信息
      $.each(this.holderList, function(index, ele) {
        if (ele.colcode == "holderSex") {
          holder[ele.colcode] = $(".holderSex")
            .find('input[name="sex"]:checked')
            .val();
        } else if (ele.colcode == "holderCertificateType") {
          holder[ele.colcode] = that.$refs.holderCertificateType[0].value;
        } else {
          holder[ele.colcode] = $('[name="' + ele.colcode + '"]').val();
        }
      });

      if (item.name == "本人") {
        $(`.insuredName`).val(holder.holderName);
        $(`#insuredCertificateType`).val(holder.holderCertificateType);
        $(`.insuredCertificateNo`).val(holder.holderCertificateNo);
        $(`.insuredPhone`).val(holder.holderPhone);
        $(`#insuredBirth`).val(holder.holderBirth);
        if (holder.holderSex == '女') {
            $(".insuredSex")
              .find("input[title=女]")
              .prop('checked','checked')
          } else {
            $(".insuredSex")
              .find("input[title=男]")
              .prop('checked','checked')
          }
        layui.form.render();
        // 被保人身份证锁定性别
        this.Utils.CertificateTypeLockSex($('#insuredCertificateType').val(), $('.insuredSex'));
      }else{
        
      }

      this.insuredRelationship = false;
      $("#insuredRelationship").val(item.name);
    },
    changePrice() {
      // 价格 * 人数 * 份数
      this.totalPrice = this.accMul(
        Number(this.onePrice),
        Number(this.totalVal),
        Number(this.inserdNum)
      );
    },
    //调用核保接口
    onCheckPolicy() {
      var data = {
        time: $("#time").val(),
        memberId: this.getCookie("ZB_JUSER_Mid"),
        openId: this.getCookie("openId"), //o3aOP03W4q9_FG_0lLo60dXxxcrA"
        number: this.totalVal,
        shareLinks: this.getQueryString("shareMid"), //分享者mid
        goodId: this.getQueryString("productId"),
        source: "2",
        planId: this.getQueryString("planId"),
        policyFee: this.totalPrice,
        safeDate: decodeURI(this.getQueryString("safeDate")),
        activityCode: this.getQueryString("activityCode"), //活动id
        invitationCode: this.getQueryString("invitationCode"), //邀请码
        topActivityCode: this.getQueryString("topActivityCode"), //上级邀请码
        healthNotification: this.getCookie("healthAnswer")
          ? JSON.parse(this.getCookie("healthAnswer"))
          : ""
      };
      var holder = {}; //投保人信息
      var inserdAllList = []; //被保险人信息
      var that = this;

      //==================================================  获取用户填写信息  =================================================

      // 获取投保人填写信息
      $.each(this.holderList, function(index, ele) {
        if (ele.colcode == "holderSex") {
          holder[ele.colcode] = $(".holderSex")
            .find('input[name="sex"]:checked')
            .val();
        } else if (ele.colcode == "holderCertificateType") {
          holder[ele.colcode] = that.$refs.holderCertificateType[0].value;
        } else {
          holder[ele.colcode] = $('[name="' + ele.colcode + '"]').val();
        }
      });
      // 获取所有被保险人填写信息
      var inserdList = {};
      $.each(that.inserdList, function(index, ele) {
        if (ele.colcode == "insuredSex") {
          var radioContent = $(".inserdPolicy")
            .find($("div[name=" + ele.colcode + "]"))
            .find('input[name="sex"]:checked')
            .val();
          inserdList[ele.colcode] = radioContent;
        } else if (ele.colcode == "insuredCertificateType") {
          inserdList[ele.colcode] = $(".inserdPolicy")
            .find('input[name="insuredCertificateType"]')
            .val();
        } else {
          if (ele.colcode != undefined) {
            inserdList[ele.colcode] = $(".inserdPolicy")
              .find($("input[name=" + ele.colcode + "]"))
              .val();
          }
        }
      });

      // 获取所有其他信息 放到other对象中
      var otherList = {};
      $.each(that.otherList, function(index, ele) {
        otherList[ele.colcode] = $(".otherPolicy")
          .find($("input[name=" + ele.colcode + "]"))
          .val();
      });
      inserdList.subjectJson = otherList;
      inserdAllList.push(inserdList);

     //获取全部的受益人信息
     let BeneficiaryData = [];   //BeneficiaryInput
      $.each($(".BeneficiaryInput"), function(index, ele) {
        let beneficiary = {};//每一个受益人信息
        beneficiary.beneficiaryName = $('#beneficiaryName'+index).val();
        beneficiary.beneficiaryCertificateType = $('#beneficiaryCertificateType'+index).val();
        beneficiary.beneficiaryCertificateNo = $('#beneficiaryCertificateNo'+index).val();
        beneficiary.beneficiaryBirth = $('#beneficiaryBirth'+index).val();
        beneficiary.beneficiaryRate = $('#beneficiaryRate'+index).val();
        BeneficiaryData.push(beneficiary);
      });

      data.holder = holder;
      data.inserd = inserdAllList;
      data.beneficiary = BeneficiaryData;
      console.log(data);

      //==================================================  校验户填写信息  =================================================

      // 投保人信息校验
        var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; //验证姓名正则
        if ($("#time").val() == "" ) {
          this.Toast("请选择起保时间");
        } else if (!reg.test($("input[name=holderName]").val())) {
          this.Toast("投保人姓名不正确");
        } else if ($("input[name=holderCertificateType]").val() == "") {
          this.Toast("请选择投保人证件类型");
        } else if ($("input[name=holderCertificateNo]").val() == "") {
          this.Toast("请填写投保人证件号码");
        } else if (
          data.holder.holderCertificateType == "身份证" &&
          isIdCard(data.holder.holderCertificateNo) == false
        ) {
          this.Toast("投保人身份证号码不正确");
        } else if (
          data.holder.holderPhone == "" ||
          isPhoneNumber(data.holder.holderPhone) == false
        ) {
          this.Toast("投保人电话不正确");
        } else if (data.holder.holderBirth == "") {
          this.Toast("请选择投保人出生日期");
          // 被保险人信息校验
        } else if (
          data.holder.holderMailbox == "" ||
          isEmail(data.holder.holderMailbox) == false
        ) {
          this.Toast("投保人邮箱不正确");
        }
      else {
        var Status = true;
        var licenseNumber = ""; //车牌号
        for (var i = 0; i < data.inserd.length; i++) {
          if (data.inserd[i].insuredRelationship == "") {
            this.Toast("请选择为谁投保");
            Status = false;
          } else if (data.inserd[i].insuredName == "") {
            this.Toast("请输入被保险人姓名");
            Status = false;
          }else if (data.inserd[i].insuredName == "") {
            this.Toast("请输入被保险人姓名");
            Status = false;
          } else if (data.inserd[i].insuredSex == "") {
            this.Toast("请选择被保险人性别");
            Status = false;
          } else if (data.inserd[i].insuredCertificateType == "") {
            this.Toast("请选择被保险人证件类型");
            Status = false;
          } else if ($("input[name=insuredCertificateNo]").val() == "") {
            Status = false;
            this.Toast("请输入被保险人证件号码");
          }else if ($("input[name=insuredCertificateType]").val() == "身份证" && isIdCard(data.inserd[i].insuredCertificateNo) == false) {
            this.Toast("被保险人证件号码不正确");
            Status = false;
          }else if ($("input[name=insuredCertificateType]").val() == "学生证" && data.inserd[i].insuredCertificateNo.length < 7) {
            this.Toast("学生证不能小于7位");
            Status = false;
          } else if (data.inserd[i].insuredBirth == "") {
            this.Toast("请输入被保险人出生日期");
            Status = false;
          } else if (
            (data.inserd[i].insuredPhone ? isPhoneNumber(data.inserd[i].insuredPhone) : true) == false 
          ) {
            this.Toast("请输入正确的被保险人联系电话");
            Status = false;
          } else if (data.inserd[i].subjectJson.schoolName == "") {
            this.Toast("请输入学校名称");
            Status = false;
          } else if (data.inserd[i].subjectJson.className == "") {
            this.Toast("请输入班级名称");
            Status = false;
          } else if(data.inserd[i].subjectJson.SeatNumber == ""){
            this.Toast("请输入座位数");
            Status = false;
          } else if(data.inserd[i].subjectJson.carFrameNo == ""){
            this.Toast("请输入车架号");
            Status = false;
          }else if($('#BeneficiaryTye').val() === ''){
            this.Toast("请选择受益人类型");
            Status = false;
          } else if (
            data.inserd[i].subjectJson.carNo != "" &&
            data.inserd[i].subjectJson.carNo != undefined
          ) {
            licenseNumber = data.inserd[i].subjectJson.licenseNumber;
          }
        }

        //开始校验受益人信息  BeneficiaryData
        for(let i = 0 ;i<BeneficiaryData.length ;i++){
          if(BeneficiaryData[i].beneficiaryName === ''){
             this.Toast("请输入受益人姓名");
            Status = false;
          }else if(BeneficiaryData[i].beneficiaryCert === ''){
             this.Toast("请选择受益人证件类型");
            Status = false;
          }else if(BeneficiaryData[i].beneficiaryCertificateNo === ''){
             this.Toast("请输入受益人证件号码");
            Status = false;
          }else if( BeneficiaryData[i].beneficiaryCert == "身份证" &&
            isIdCard(BeneficiaryData[i].beneficiaryCertificateNo) == false){
              this.Toast("受益人身份证号码格式有误");
              Status = false;
          }else if(BeneficiaryData[i].beneficiaryBirth === ''){
             this.Toast("请输入受益人出生日期");
            Status = false;
          }else if(BeneficiaryData[i].beneficiaryRote === ''){
             this.Toast("请输入受益人比例");
            Status = false;
          } 
        }

        if (Status == true) {
          var args = that.sign(data);
          that.loadingShow = true;
          // 校验车牌号码
          if (licenseNumber != "") {
            var args1 = that.sign({
              goodId: that.getQueryString("productId"),
              licenseNumber: licenseNumber
            });
            api.Electromobile(args1).then(res => {
              if (res.success == false) {
                this.Toast("该车牌号已投保");
                Status = false;
                that.loadingShow = false;
              } else {
                // 核保
                that.underwriting(args);
              }
            })
          }else{
            // 核保
            that.underwriting(args);
          }
        }
      }
    },
    // 核保接口
    underwriting(args){
      var that = this;
      // 核保
      api.getAppAddpolicy(args)
        .then(
          response => {
            that.loadingShow = false;
            var res = response;
            if (res.code == 1) {
              var Pid = res.data;
              that.$router.push({
                path: "/policyPreview",
                query: {
                  id: Pid,
                  productId: that.productId,
                  planId: that.planId
                }
              });
            } else {
              that.loadingShow = false;
              this.Toast(res.message);
            }
          },
          err => {
            that.loadingShow = false;
            this.Toast(err.message);
          }
        )
        .catch(error => {
          that.loadingShow = false;
          this.Toast(err.message);
        });
    },
    // 投保人 输入身份证号
    getMoreInfoHolder() {
      if ($("#holderCertificateType").val() == "身份证") {
        var idVal = $(".holderCertificateNo").val();
        var tBirth_y = idVal.substring(6, 10);
        var tBirth_m = idVal.substring(10, 12);
        var tBirth_d = idVal.substring(12, 14);
        var tBirth = tBirth_y + "-" + tBirth_m + "-" + tBirth_d;
        $("#holderBirth").val(tBirth);
        // 性别
        if (idVal.length == 18) {
          var sex = idVal.charAt(16);
          if (sex % 2 != 0) {
            $(".holderSex input[value=男]").click();
            layui.form.render();
          } else {
            $(".holderSex input[value=女]").click();
            layui.form.render();
          }
        } else {
          //    alert('身份证非18位证件号码')
        }
      }
    },
    // 被保险人 输入身份证号
    getMoreInfoInserd() {
      if ($("#insuredCertificateType").val() == "身份证") {
        var idVal = $(".insuredCertificateNo").val();
        var tBirth_y = idVal.substring(6, 10);
        var tBirth_m = idVal.substring(10, 12);
        var tBirth_d = idVal.substring(12, 14);
        var tBirth = tBirth_y + "-" + tBirth_m + "-" + tBirth_d;
        $("#insuredBirth").val(tBirth);
        // 性别
        if (idVal.length == 18) {
          var sex = idVal.charAt(16);
          if (sex % 2 == 0) {
            $(".insuredSex")
              .find("input[title=女]")
              .click();
          } else {
            $(".insuredSex")
              .find("input[title=男]")
              .click();
          }
          layui.use("form", function() {
            var form = layui.form;
            form.render();
          });
        } else {
          //    alert('身份证非18位证件号码')
        }
      }
    }
  }
};
</script>

<style lang='scss'>
.van-action-sheet {
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
    padding: 0 30px;
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
      ul {
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
      .van-tabbar-item__icon {
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
      .van-tabbar-item__icon {
        display: none;
      }
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