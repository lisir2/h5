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
                                <input type="text" :name="item.colcode" placeholder="请填写投保企业名称" :ref="item.colcode">
                                <!-- <img src="../../../assets/images/person.png" alt="" @click="contacts('tbr')"> -->
                            </div>
                            <div v-else-if="item.colcode === 'holderSex'" :name="item.colcode" >
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
                                <input type="text" placeholder="请选择证件类型" @select="TypeSelect_holder" @click="ChooseType_holder" id="holderCertificateType" :name="item.colcode" readonly :ref="item.colcode">
                                <van-icon name="arrow"/>
                            </div>
                            <!-- 投保人行业类型 -->
                            <div v-else-if="item.colcode === 'industryCodeLevel4Text'">
                                <van-action-sheet
                                v-model="industryType_isShow"
                                :actions="item.value"
                                cancel-text="取消"
                                @select="holder_industryType_select"
                                title="请选择行业类型"
                                />
                                <input type="text" placeholder="请选择行业类型"  @click="holder_industryType" :selectVal="holder_induType_val" id="holderCertificateType" v-model="holder_induType_name" :name="item.colcode" readonly>
                                <van-icon name="arrow" :ref="item.colcode"/>
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
                            <div v-else-if="item.colcode === 'totalAssets'" id="totalAssets">
                                <input type="text" placeholder="请输入总资产" :name="item.colcode" :ref="item.colcode">
                                <span id="totleMoney">万元</span>
                            </div>
                            <div v-else-if="item.colcode === 'holderAddress'" class="selectAddress">
                              <input type="text" :placeholder="item.value" @click="showProviceCity = true" :name="item.colcode" readonly :ref="item.colcode">
                            </div>
                            <div v-else style="height:95%">
                                <input type="text" :name="item.colcode" :placeholder="item.value" style="height:98%" :ref="item.colcode">
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
        <!-- 弹出遮罩层 -->
        <van-popup v-model="loadingShow" :lock-scroll="false" style="background-color: transparent;" :close-on-click-overlay="false">
            <!-- 加载动画 -->
            <van-loading size="24px" vertical color="#1989fa">数据加载中...</van-loading>
        </van-popup>
        <!-- 投保人省市区弹出 -->
        <van-popup
          v-model="showProviceCity"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-area 
            :area-list="areaList"
            @cancel="onCancel_provice"
            @confirm="onConfirm_provice"
          />
         </van-popup>
        <!-- 常用联系人 -->
        <van-action-sheet title="选择常用联系人" v-model="showContacts" position="bottom" :style="{ height: '100%' }">
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
import popupContacts from '../../../components/popupContacts' 
import MultipleInsured from "../../../components/base/MultipleInsured";
export default {
  name: "insuranceJiaZheng",
  components: {
    popupContacts: popupContacts,
    MultipleInsured:MultipleInsured
  },
  data() {
    return {
      titleIcon1: require("../../../assets/images/others/personal1.png"),
      titleIcon2: require("../../../assets/images/others/personal2.png"),
      titleIcon3: require("../../../assets/images/others/personal3.png"),
      titleIcon4: require("../../../assets/images/others/personal4.png"),
      titleIcon5: require("../../../assets/images/others/personal5.png"),
      titleIcon6: require("../../../assets/images/others/personal6.png"),
      occupationActions:[
        { name: '保姆（全日制）' , value : '4501100011',type:'1'},
        { name: '家政服务业（小时工）' , value : '4501100022',type : '2'},
        { name: "干部休养所工作人员", value: "4702020012", type: "2" },
        { name: "护理机构服务人员", value: "4702020022", type: "2" },
        { name: "精神康复服务人员", value: "4702020032", type: "2" },
        { name: "老年人、残疾人养护服务人员", value: "4702020042", type: "2" },
        { name: "孤残儿童收养和庇护服务人员", value: "4702020052", type: "2" },
        { name: "社会看护与帮助服务人员", value: "4702020062", type: "2" },
        { name: "搬运工人、装卸工人", value: "3706020015", type: "5" }
      ],
      showPage: true,
      showProviceCity: false,
      industryType_isShow: false,
      loadingShow: false, //加载动画是否显示
      //三级联动
      areaList: '', //三级联动所有数据
      holderList: "", //投保人配置信息(需要让用户填写的信息)
      inserdConfigList: [], //所有被保险人信息
      inserdList: "", //存放单个被保险人基本配置信息
      insuredCertificateType: false, //被保险人证件类型控件显示隐藏
      houseType: false, //被保险人房屋类型控件显示隐藏
      insuredRelationship: false, //与投保人关系控件显示隐藏
      //投保人区域
      holderBirth: "", //投保人性别
      typeShow_holder: false, //投保人证件类型是否显示
      holder_induType_val: "", //投保人职业分类选择的值
      holder_induType_name: "", //投保人职业分类回显的值

      typeActions_holder: "", //投保人证件类型JSON数据   例如:{name:年龄,value:'18'}
      //被保险人区域
      //底部信息 标的信息
      otherList: "",
      totalPrice: "",
      onePrice: "", //单件产品价格
      totalVal: "1", //产品个数
      currInserSelect: "", //当前选择第几个被保险人（下标）
      productId: "", //产品id
      goodName: "", //产品名称
      inserdNum: 1, //被保人个数
      productNum: 1, //产品上限个数
      insuredNumMax: 0, //被保险人上限个数
      insuredNum:'',//被保人个数
      key: 1, //每个被保险人渲染 绑定的key值  删除的时候问题
      minPolicyDate: 1, //最小起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
      maxPolicyDate: 1, //最大起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
      startData: "",
      showOccupation: false, //职业分类是否显示
      OccupationData: "", //家政职业全部JSON数据
      cityListCode: "", //选择最后一个职业列表之后获取的 occupationalCode
      SelectIndex: "", //家政选择第几个职业分类的下标
      jiaZhengCityName:"", //家政省市区选择回调name
      jiaZhengCityCode:"", //家政省市区选择回调code
      showContacts:false, //常用联系人弹窗是否显示
      person:'', //选择常用联系人的是投保人，还是被保险人
      inserdIndex:'', //选择第几个被保险人常用联系人
    };
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
    
    var this_ = this;
    // 投保人配置信息
    var holderArr = [];
    // 被保险人配置信息
    var inserdArr = [];
    // 其他配置信息
    var otherArr = [];

    // 根据产品id 获取产品名称
    var args = this.sign({ productId: this.productId, planId: this.planId });
    // 获取投保人、被保险人、标的信息 配置信息
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

    // 获取家政省市区
    var args2 = this.sign({});
    api.jiazhengProvinceCityArea(args2).then(res => {
      this.areaList = res;
    })
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
      this.Utils.SelectContacts(res, this.person, this.inserdIndex);
    },
    // 常用联系人弹窗
    contacts(person,index){
        // 显示常用联系人弹窗
        this.showContacts = true;
        // 选择的是投保人 还是被保险人
        this.person = person;
        // 选择第几个被保险人的 常用联系人
        this.inserdIndex = index;
    },
    getEffectiveAge(strBirthday, policyDate) {
      //参数一：被保险人的生日
      //参数二：起保日期
      var returnAge;
      var strBirthdayArr = strBirthday.split("-");
      var birthYear = strBirthdayArr[0];
      var birthMonth = strBirthdayArr[1];
      var birthDay = strBirthdayArr[2];

      var policyDateArr = policyDate.split("-");
      var policyYear = policyDateArr[0];
      var policyMonth = policyDateArr[1];
      var policyDay = policyDateArr[2];

      if (policyYear == birthYear) {
        returnAge = 0; //同年 则为0岁
      } else {
        var ageDiff = policyYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (policyMonth == birthMonth) {
            var dayDiff = policyDay - birthDay; //日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          } else {
            var monthDiff = policyMonth - birthMonth; //月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          }
        } else {
          returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge; //返回周岁年龄
    },
    checkInsurdAge(insurdAge) {
      //被保险人的年龄
      let startData = $("#time").val();
      //月份
      let Imouth = parseInt(insurdAge.split("-")[1]);
      let Smouth = parseInt(startData.split("-")[1]);
      //日期
      let Idata = parseInt(insurdAge.split("-")[2]);
      let Sdata = parseInt(startData.split("-")[2]);
      let trueAge = parseInt(this.getEffectiveAge(insurdAge, startData));
      if (trueAge < 16 || trueAge > 65) {
        return false;
      } else if (trueAge == 65) {
        if (Imouth < Smouth) {
          return false;
        } else if (Imouth == Smouth) {
          if (Idata > Sdata || Idata == Sdata) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    // 家政省市区确定回调
    onConfirm_provice(item) {
      this.jiaZhengCityName = '';
      this.jiaZhengCityCode = '';
      item.forEach(e => {
        this.jiaZhengCityName += e.name + " ";
        this.jiaZhengCityCode += e.code + " ";
      });
      
      $("input[name='holderAddress']").val(this.jiaZhengCityName);
      this.showProviceCity = false;
    },
    // 家政省市区返回回调
    onCancel_provice() {
      this.showProviceCity = false;
    },
    holder_industryType() {
      this.industryType_isShow = true;
    },
    //投保人区域
    //投保人证件类型选择回调
    TypeSelect_holder(item) {
      this.typeShow_holder = false;
      this.$refs.holderCertificateType[0].value = item.value;
      // 判断身份证回调类型为身份证的时候，性别锁死
      this.Utils.CertificateTypeLockSex(item.value,$(".holderSex"));
    },
    //投保人职业类型选择回调
    holder_industryType_select(item) {
      this.industryType_isShow = false;
      this.holder_induType_val = item.value;
      this.holder_induType_name = item.name;
    },
    ChooseType_holder() {
      this.typeShow_holder = true;
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
          : "" //健康告知填写信息
      };
      var holder = {}; //投保人信息
      var inserdAllList = []; //被保险人信息
      var this_ = this;

      //==================================================  获取用户填写信息  =================================================

      // 获取投保人填写信息
      holder["personnelType"] = 0;
      $.each(this.holderList, function(index, ele) {
        if (ele.colcode == "holderSex") {
          holder[ele.colcode] = $(".holderSex")
            .find('input[name="sex"]:checked')
            .val();
        } else if (ele.colcode == "holderCertificateType") {
          holder[ele.colcode] = this_.$refs.holderCertificateType[0].value;
        } else if (ele.colcode == "holderAddress") {
          holder[ele.colcode] =
            $("input[name=holderAddress]").val() + 
            "," +
            $("[name='detailAddress']").val();
        } else if (
          ele.colcode == "detailAddress" ||
          ele.colcode == "industryType" ||
          ele.colcode == "totalAssets"
        ) {
        } else {
          holder[ele.colcode] = $('[name="' + ele.colcode + '"]').val();
        }
      });

      holder["elseJson"] = {
        totalAssets: "39990000",
        industryCodeLevel4: $("[name='industryCodeLevel4Text']").attr(
          "selectval"
        ),
        industryCodeLevel4Text: $("[name='industryCodeLevel4Text']").val(),
        provinceId: this.jiaZhengCityCode.split(' ')[0],
        cityId: this.jiaZhengCityCode.split(' ')[1],
        countyId: this.jiaZhengCityCode.split(' ')[2],
        addRess: $("[name='holderAddress']").val()
      };
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
        $.each(this_.inserdList, function(index, ele) {
          if (ele.colcode == "jobName") {
            otherList[ele.colcode] = 1;
            otherList["jobCode"] = $("#occupationClass" + index0).attr("code");
            otherList["jobName"] = $("#occupationClass" + index0).val();
            otherList["jobType"] = $("#occupationClass" + index0).attr(
              "jobType"
            );
          }
        });
        inserdList.subjectJson = otherList;
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
        this.Toast("请输入投保人姓名");
      } else if (!reg.test($("input[name=holderName]").val())) {
        this.Toast("投保人姓名不正确");
      } else if ($("input[name=holderCertificateType]").val() == "") {
        this.Toast("请选择投保人证件类型");
      } else if ($("input[name=holderCertificateNo]").val() == "") {
        this.Toast("请填写投保人证件号码");
      } else if ($("input[name=industryCodeLevel4Text]").val() == "") {
        this.Toast("请选择行业类型");
      } else if ($("input[name=linkManName]").val() == "") {
        this.Toast("请填写联系人姓名");
      } else if (
        $("input[name=holderPhone]").val() == "" ||
        isPhoneNumber($("input[name=holderPhone]").val()) == false
      ) {
        this.Toast("投保人电话不正确");
      } else if (
        $("input[name=holderMailbox]").val() == "" ||
        isEmail($("input[name=holderMailbox]").val()) == false
      ) {
        this.Toast("投保人邮箱不正确");
      } else if ($("input[name=totalAssets]").val() == "") {
        this.Toast("请输入公司总资产");
      } else if ($("input[name=holderAddress]").val() == "") {
        this.Toast("请选择公司办公地址");
      } else if ($("input[name=detailAddress]").val() == "") {
        this.Toast("请输入详细地址");
      } else {
        // 被保险人信息校验
        var Status = true;
        for (var i = 0; i < data.inserd.length; i++) {
          if (data.inserd[i].insuredName == "") {
            this.Toast("请输入被保险人姓名");
            Status = false;
          } else if (data.inserd[i].insuredSex == "") {
            this.Toast("请选择被保险人性别");
            Status = false;
          } else if (data.inserd[i].insuredCertificateType == "") {
            this.Toast("请选择被保险人证件类型");
            Status = false;
          } else if (data.inserd[i].insuredCertificateNo == "") {
            this.Toast("请输入被保险人证件号码");
            Status = false;
          } else if (!this_.checkInsurdAge(data.inserd[i].insuredBirth)) {
            this.Toast("年龄符合本产品承保年龄为16~65周岁！");
            Status = false;
          } else if (
            data.inserd[i].insuredPhone == "" ||
            isPhoneNumber(data.inserd[i].insuredPhone) == false
          ) {
            this.Toast("被保险人联系电话不正确");
            Status = false;
          } else if (data.inserd[i].jobName == "") {
            this.Toast("请选择职业分类");
            Status = false;
          }
        }

        if (Status == true) {
          var args = this_.sign(data);
          this_.loadingShow = true;
          //  this.$axios.post('/org/openapi/Order/appAddpolicy',args)  //林彰淼核保接口
          api.getAppAddpolicy(args)//正式
            .then(
              response => {
                var data = response;
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
  }
};
</script>

<style lang='scss'>
.van-action-sheet{
  max-height: 100%;
}
.job1,
.job2,
.job3,
.job4 {
  background: white;
  height: 72px;
  color: #555;
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
#totleMoney {
  position: relative;
  right: 3.5rem;
}
</style>