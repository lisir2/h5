<!-- 组件说明 -->
<template>
<div>
    <div v-if="showPage">
        <van-skeleton title :row="20" style="padding-top: 0.5rem;"/>
    </div>
    <div v-else class='maintain'>
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
                                <input type="text" :name="item.colcode" placeholder="请输入企业名称" :ref="item.colcode">
                                <!-- <img src="../../../assets/images/person.png" alt="" @click="contacts('tbr')"> -->
                            </div>
                            <div v-else-if="item.colcode === 'holderSex'" :name="item.colcode">
                                <form class="layui-form" action="javascript:void;">
                                    <div class="layui-input-inline holderSex" style="margin-top:0;">
                                        <input type="radio" name="sex" v-for="(radioItem,index) in item.value" :key="radioItem.name" :value="radioItem.value" :title="radioItem.name" :checked="index == 0 ? 'checked' :''" :ref="item.colcode">
                                    </div>
                                </form>
                            </div>
                            <div v-else-if="item.colcode === 'holderCertificateType'">
                                 <input type="text"
                                readonly
                                clickable
                                placeholder="请选择证件类型"
                                @click="showPicker = true"
                                :name="item.colcode"
                                :ref="item.colcode"
                                />
                                <van-icon name="arrow" style="vertical-align: middle;margin-top:-1px;"/>
                                <!-- 投保人证件类型 -->
                                <van-popup v-model="showPicker" position="bottom">
                                    <van-picker
                                        show-toolbar
                                        :columns="item.value"
                                        @cancel="showPicker = false"
                                        @confirm="onConfirm"
                                    />
                                </van-popup>
                            </div>
                            <div v-else-if="item.colcode === 'holderRelationship'">
                                <van-action-sheet
                                v-model="show_insuredRelationship"
                                :actions="item.value"
                                cancel-text="取消"
                                @select="insuredRelationship_callback"
                                title="请选择与被保险人关系"
                                />
                                <input type="text" placeholder="请选择与被保险人关系" @click="show_insuredRelationship=true" :selectVal="insuredRelationship_val" id="holderRelationship" v-model="insuredRelationship_name" :name="item.colcode" readonly :ref="item.colcode">
                                <van-icon name="arrow"/>
                            </div>
                            <div v-else-if="item.colcode === 'companyAttribute'">
                                <input type="text"
                                readonly
                                clickable
                                :value="natureOfUnitName"
                                placeholder="请选择单位性质"
                                @click="showPicker1 = true"
                                :name="item.colcode"
                                :ref="item.colcode"
                                />
                                <van-icon name="arrow" style="vertical-align: middle;margin-top:-1px;"/>
                            </div>
                            <div v-else-if="item.colcode === 'holderBirth'">
                                <input type="text" placeholder="请选择出生日期" id="holderBirth" :name="item.colcode" readonly :ref="item.colcode">
                            </div>                                                                                        
                            <div v-else>
                                <input type="text" :name="item.colcode" :placeholder="item.value" :ref="item.colcode">
                            </div>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- 被保险人 -->
        <MultipleInsured :inserdList='inserdList' :holderList='holderList' :insuredNumMax='insuredNumMax' @setContacts='setContacts'></MultipleInsured> 

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
                            <van-stepper v-model="totalVal" min="1" :max="productNum" @change="changePrice(insuredNum)"/>
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
        <van-popup v-model="areaShow" position="bottom">
            <van-area
                :area-list="areaList"
                @confirm="confirm"
                @cancel="cancel"
                :item-height="35"
            />
        </van-popup>
        <van-popup v-model="showPicker1" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns1"
                @cancel="showPicker1 = false"
                @confirm="onConfirm1"
            />
        </van-popup>
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
//import x from ''
import area from "../../../../static/js/area";
import api from "../../../fetch/api";
import $ from "jquery";
import { isIdCard, isPhoneNumber, isEmail } from "../../../util/validate";
// 弹出常用联系人
import popupContacts from '../../../components/popupContacts' 
import MultipleInsured from "../../../components/base/MultipleInsured";
export default {
  name: "insurancePingAnQiXiu",
  components: {
    popupContacts,
    MultipleInsured
  },
  data() {
    return {
      titleIcon1: require("../../../assets/images/others/personal1.png"),
      titleIcon2: require("../../../assets/images/others/personal2.png"),
      titleIcon3: require("../../../assets/images/others/personal3.png"),
      titleIcon4: require("../../../assets/images/others/personal4.png"),
      titleIcon5: require("../../../assets/images/others/personal5.png"),
      titleIcon6: require("../../../assets/images/others/personal6.png"),
      showPage: true,
      loadingShow: false, //加载动画是否显示
      //三级联动
      areaList: area, //三级联动所有数据
      areaShow: false, //三级联动是否显示
      holderList: "", //投保人配置信息(需要让用户填写的信息)
      inserdConfigList: [], //所有被保险人信息
      inserdList: "", //存放单个被保险人基本配置信息
      insuredCertificateType: false, //被保险人证件类型控件显示隐藏
      houseType: false, //被保险人房屋类型控件显示隐藏
      insuredRelationship: false, //与投保人关系控件显示隐藏
      //投保人区域
      holderBirth: "", //投保人性别
      typeShow_holder: false, //投保人证件类型是否显示
      typeSelectVal_holder: "", //投保人证件类型选择的value值
      typeName_holder: "", //投保人证件类型选择之后的name值
      show_insuredRelationship: false, //投保人与被保险人关系是否显示
      insuredRelationship_val: "", //投保人与被保险人关系选择的value值
      insuredRelationship_name: "", //投保人与被保险人关系选择的name值
      enterpriseIdNumber_show: false, //企业证件号码
      enterpriseIdNumber_val: "", //企业证件号码 选择的value值
      enterpriseIdNumber_name: "", //企业证件号码 选择的name值
      typeActions_holder: "", //投保人证件类型JSON数据   例如:{name:年龄,value:'18'}
      //被保险人区域
      //底部信息 标的信息
      otherList: "",
      totalPrice: "", //价格试算  份数乘以单价
      onePrice: "", //单件产品价格
      totalVal: "1", //产品个数
      currInserSelect: "", //当前选择第几个被保险人（下标）
      productId: "", //产品id
      goodName: "", //产品名称
      productNum: 1, //产品上限个数
      insuredNumMax: 0, //被保险人上限个数
      insuredNum:1, //被保人个数
      key: 1, //每个被保险人渲染 绑定的key值  删除的时候问题
      inserdArr: "",
      minPolicyDate: 1, //最小起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
      maxPolicyDate: 1, //最大起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
      showPicker: false, //投保人企业类型显示隐藏
      natureOfUnitValue: "", //投保人企业证件类型 value
      natureOfUnitName: "", //投保人企业证件类型 name
      showPicker1: false, //投保人单位性质显示隐藏
      // 企业证件类型
      columns: [
        { text: "工商营业执照号", value: "工商营业执照号" },
        { text: "税务登记证", value: "税务登记证" },
        { text: "统一社会信用代码", value: "统一社会信用代码" },
        { text: "其他-政府机关", value: "其他-政府机关" },
        { text: "其他-事业单位", value: "其他-事业单位" },
        { text: "其他-社会团体", value: "其他-社会团体" },
        { text: "其他-工程项目组", value: "其他-工程项目组" },
        { text: "其他-军事机构", value: "其他-军事机构" },
        { text: "其他-外国注册企业", value: "其他-外国注册企业" },
        { text: "其他-其他类型", value: "其他-其他类型" },
        { text: "组织机构代码证", value: "组织机构代码证" }
      ],
      // 企业单位性质
      columns1: [
        { text: "股份", value: "股份" },
        { text: "国有", value: "国有" },
        { text: "集体", value: "集体" },
        { text: "个体", value: "个体" },
        { text: "私营", value: "私营" },
        { text: "中外合资", value: "中外合资" },
        { text: "外商独资", value: "外商独资" },
        { text: "机关事业", value: "机关事业" },
        { text: "社团", value: "社团" },
        { text: "中外合作", value: "中外合作" },
        { text: "其他", value: "其他" }
      ],
      showContacts:false, //常用联系人弹窗是否显示
      person:'', //选择常用联系人的是投保人，还是被保险人
      inserdIndex:'', //选择第几个被保险人常用联系人
    };
  },
  mounted() {
    this.onePrice = this.$route.query.priceResult; // 价格
    this.productId = this.$route.query.productId; // 产品id
    this.planId = this.$route.query.planId; // 计划id
    this.changePrice(); //价格试算
    var laydate = layui.laydate;
    var this_ = this;
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
      this_.showPage = false;
      this_.$nextTick(() => {
        // 产品名称
        this_.goodName = res.data.policyParams.goodName;
        // 最大起保日期
        this_.maxPolicyDate = res.data.policyParams.goodSlowestEffectiveTime;
        // 最小起保日期
        this_.minPolicyDate = res.data.policyParams.goodFastestEffectiveTime;
        // 获取产品详情根据计划id，获取最大产品个数
        this_.productNum = res.data.policyParams.insuredPortion;
        // 渲染起保日期 日历
        layui.use("laydate", function() {
          var laydate = layui.laydate;
          var time = new Date().setDate(
            new Date().getDate() + Number(this_.minPolicyDate)
          );
          // 起保时间
          laydate.render({
            elem: "#time",
            type: "date",
            format: "yyyy-MM-dd",
            min: +Number(this_.minPolicyDate), //起保日期
            max: +Number(this_.maxPolicyDate),
            value: this_.timestampToTime(time, true),
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
            this_.insuredNumMax = ele.value;
          }
        });
        // 取出 投保人信息数据
        this.holderList = holderArr;
        // 取出所有其他 配置信息
        this.otherList = otherArr;
        // 取出 被保险人信息数据
        this.inserdList = inserdArr;

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
              elem: "#insuredBirth0",
              max: new Date().setDate(new Date().getDate()),
              done: value => {
                $("#insuredBirth0").val(value);
              }
            });
            form.render();
          });
        });
      });
    });
  },
  methods: {
    // 子组件调用父组件的常用联系人
    setContacts(data){
      this.person = data.person;
      this.inserdIndex = data.inserdIndex;
      this.showContacts = data.showContacts;
    },
    // 选择常用联系人
    ChildContacts(res){
      this.showContacts = false;
      // 调用公共常用联系人回调
      this.Utils.SelectContacts(res, this.person, this.inserdIndex,'holderCertificateType');
    },
    // 常用联系人
    contacts(person,index){
        // 显示常用联系人弹窗
        this.showContacts = true;
        // 选择的是投保人 还是被保险人
        this.person = person;
        // 选择第几个被保险人的 常用联系人
        this.inserdIndex = index;
    },
    // 企业证件类型回调
    onConfirm(value) {
      this.$refs.holderCertificateType[0].value = value.value;
      this.showPicker = false;
    },
    onConfirm1(value) {
      this.natureOfUnitName = value.text;
      this.natureOfUnitValue = value.value;
      this.showPicker1 = false;
    },
    //投保人区域
    // 投保人证件配置显示隐藏
    insuredRelationship_callback(item) {
      this.show_insuredRelationship = false;
      this.insuredRelationship_name = item.name;
      this.insuredRelationship_val = item.value;
    },
    changePrice(insuredNum) {
      this.insuredNum = insuredNum;
      // 价格 * 人数 * 份数
      this.totalPrice = this.accMul(Number(this.onePrice),Number(this.totalVal),Number(insuredNum));
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
      var this_ = this;

      //==================================================  获取用户填写信息  =================================================

      // 获取投保人填写信息
      var holder_otherList = {}; //投保人 标的信息
      $.each(this.holderList, function(index, ele) {
        if (ele.colcode == "holderSex") {
          holder[ele.colcode] = $(".holderSex")
            .find('input[name="sex"]:checked')
            .val();
        } else if (ele.colcode == "holderCertificateType") {
          holder[ele.colcode] = this_.$refs.holderCertificateType[0].value;
          // 投保人companyAttribute和taxpayerNo 放到标的信息里面，在这里不进行处理
        }
        if (ele.colcode == "companyAttribute") {
          holder_otherList.companyAttribute = this_.natureOfUnitValue;
        } else if (ele.colcode == "taxpayerNo") {
          holder_otherList.taxpayerNo = $('[name="' + ele.colcode + '"]').val();
        } else {
          holder[ele.colcode] = $('[name="' + ele.colcode + '"]').val();
        }
      });
      holder.elseJson = holder_otherList;

      // 获取所有被保险人填写信息
      $.each($(".inserdConfig"), function(index0, ele) {
        // 获取所有被保险人填写信息
        var inserdList = {};
        $.each(this_.inserdList, function(index, ele) {
          if (ele.colcode == "insuredSex") {
            var radioContent = $(".inserdConfig")
              .eq(index0)
              .find($("div[name=" + ele.colcode + "]"))
              .find('input[name="sex"]:checked')
              .val();
            inserdList[ele.colcode] = radioContent;
          } else if (ele.colcode == "insuredCertificateType") {
            inserdList[ele.colcode] = $(".inserdConfig")
              .eq(index0)
              .find($("input[name=insuredCertificateType]"))
              .val();
          } else {
            if (ele.colcode != undefined) {
              inserdList[ele.colcode] = $(".inserdConfig")
                .eq(index0)
                .find($("input[name=" + ele.colcode + "]"))
                .val();
            }
          }
        });

        // 获取所有其他信息 放到other对象中
        var otherList = {};
        $.each(this_.otherList, function(index, ele) {
          otherList[ele.colcode] = $(".inserdConfig")
            .eq(index0)
            .find($("input[name=" + ele.colcode + "]"))
            .val();
        });
        inserdAllList.push(inserdList);
      });
      data.holder = holder;
      data.inserd = inserdAllList;
      console.log(data);

      //==================================================  校验户填写信息  =================================================

      // 投保人信息校验
      var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; //验证姓名正则
      if ($("#time").val() == "") {
        this.Toast("请选择起保时间");
      } else if ($("input[name=holderName]").val() == "") {
        this.Toast("请输入企业名称");
      } 
      // else if ($("input[name=companyAttribute]").val() == "") {
      //   this.Toast("请输入单位性质");
      // } 
      else if ($("input[name=holderCertificateType]").val() == "") {
        this.Toast("请选择企业证件类型");
      } else if ($("input[name=holderCertificateNo]").val() == "") {
        this.Toast("请输入企业证件号码");
      } 
      // else if ($("input[name=taxpayerNo]").val() == "") {
      //   this.Toast("请输入纳税人识别号");
      // } 
      else if ($("input[name=holderAddress]").val() == "") {
        this.Toast("请输入投保人地址");
      }else if (!reg.test($("input[name=linkManName]").val())) {
        this.Toast("经办人姓名不正确");
      }
      // else if (
      //   $("input[name=linkManCertificateNo]").val() == "" ||
      //   isIdCard($("input[name=linkManCertificateNo]").val()) == false
      // ) {
      //   this.Toast("经办人身份证号不正确");
      // } 
      else if (
        $("input[name=holderPhone]").val() == "" ||
        isPhoneNumber($("input[name=holderPhone]").val()) == false
      ) {
        this.Toast("投保人手机号码不正确");
      } else if (
        $("input[name=holderMailbox]").val() == "" ||
        isEmail($("input[name=holderMailbox]").val()) == false
      ) {
        this.Toast("投保人邮箱不正确");
      } else if (this_.insuredRelationship_name == "") {
        this.Toast("请选择与被保险人关系");
      } else {
        // 被保险人信息校验
        var Status = true;
        for (var i = 0; i < data.inserd.length; i++) {
          if (data.inserd[i].insuredName == "") {
            this.Toast("请输入被保险人姓名");
            Status = false;
          } else if (
            data.inserd[i].insuredCertificateNo == "" ||
            isIdCard(data.inserd[i].insuredCertificateNo) == false
          ) {
            this.Toast("被保险人证件号码不正确");
            Status = false;
          } else if (
            data.inserd[i].insuredPhone == "" ||
            isPhoneNumber(data.inserd[i].insuredPhone) == false
          ) {
            this.Toast("被保险人手机号不正确");
            Status = false;
          }
        }

        if (Status == true) {
          var args = this_.sign(data);
          if (this_.insuredNum < 3) {
            this.Toast("至少填写三个被保险人");
          } else {
            // 核保
            this_.loadingShow = true;
            // this.$axios.post('/brg/openapi/Order/appAddpolicy',args)  //林彰淼核保接口
            api
              .getAppAddpolicy(args)
              .then(
                response => {
                  var data = response;
                  console.log(data.code);
                  this_.loadingShow = false;
                  if (data.code == 1) {
                    var Pid = data.data;
                    this_.$router.push({
                      path: "/policyPreview",
                      query: {
                        id: Pid,
                        productId: this_.productId,
                        planId: this_.planId
                      }
                    });
                  } else {
                    this_.loadingShow = false;
                    this.Toast(data.message);
                  }
                },
                err => {
                  this_.loadingShow = false;
                  this.Toast(err.message);
                }
              )
              .catch(error => {
                this_.loadingShow = false;
                this.Toast(err.message);
              });
          }
        }
      }
    },
    // 三級联动
    confirm(val) {
      if (val[2] == undefined) {
        $("input[citySelect=" + "citySelect" + this.currInserSelect + "]").val(
          val[0].name + " " + val[1].name
        );
      } else {
        $("input[citySelect=" + "citySelect" + this.currInserSelect + "]").val(
          val[0].name + " " + val[1].name + " " + val[2].name
        );
      }
      this.areaShow = false;
    },
    cancel() {
      this.areaShow = false;
    },
    AreaShow(index) {
      this.currInserSelect = index;
      this.areaShow = true;
    },
  }
};
</script>

<style lang='scss'>
.van-action-sheet{
  max-height: 100%;
}
.maintain {
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
        &>li {
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