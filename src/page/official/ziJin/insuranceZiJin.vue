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
                                <input type="text" placeholder="请选择证件类型" @select="TypeSelect_holder" @click="ChooseType_holder" id="holderCertificateType" :name="item.colcode" readonly :ref="item.colcode">
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
                            <input type="text" :name="item.colcode" id="insuredName" placeholder="请填写被保险人姓名" :ref="item.colcode">
                            <img src="../../../assets/images/person.png" alt="" @click="contacts('bbr')" :ref="item.colcode">
                        </div>
                        <!-- 被保险人性别 -->
                        <div v-else-if="item.colcode === 'insuredSex'" >
                            <form class="layui-form" action="javascript:void;">
                                <div class="layui-input-inline insuredSex" :name="item.colcode">
                                    <input type="radio"  name="sex" v-for="(radioItem,index) in item.value" :key="radioItem.name" :value="radioItem.value" :title="radioItem.name" :checked="index == 0 ? 'checked' :''" :ref="item.colcode">
                                </div>
                            </form>
                        </div>
                        <!-- 被保险人证件类型 -->
                        <div v-else-if="item.colcode === 'insuredCertificateType'" >
                            <!-- v-model 控制显示可隐藏 -->
                            <van-action-sheet
                            v-model="insuredCertificateType"
                            :actions="item.value"
                            @select="TypeSelect_inserd"
                            cancel-text="取消"
                            title="请选择证件类型"
                            />
                            <input type="text" placeholder="请选择证件类型" @click="ChooseType_inserd()" :name="item.colcode" id="insuredCertificateType" readonly :ref="item.colcode">
                            <van-icon name="arrow" />
                        </div>
                        <!-- 被保险人证件号 -->
                        <div v-else-if="item.colcode === 'insuredCertificateNo'">
                            <input type="text" :name="item.colcode" id="insuredCertificateNo" placeholder="请填写被保险人证件号码" @keyup="getMoreInfoInserd()" maxlength="18" :ref="item.colcode">
                        </div>
                        <!-- 被保险人出生日期 -->
                        <div v-else-if="item.colcode === 'insuredBirth'">
                            <input type="text" placeholder="请选择出生日期" id="insuredBirth" :name="item.colcode" readonly :ref="item.colcode">
                        </div> 
                        <!-- 与投保人关系 -->
                        <div v-else-if="item.colcode === 'insuredRelationship'">
                            <van-action-sheet
                            v-model="insuredRelationshipShow"
                            :actions="item.value"
                            @select="holderSelect_Relationship"
                            cancel-text="取消"
                            title="与投保人关系"
                            />
                            <input type="text" placeholder="与投保人关系" @select="holderSelect_Relationship" @click="showSelect_Relationship()" id="insuredRelationship" :name="item.colcode" readonly :ref="item.colcode">
                            <van-icon name="arrow" />
                            <!-- <input type="text" :placeholder="item.value" :name="item.colcode">-->
                        </div>
                        <div v-else-if="item.colcode === 'insuredPhone'">
                            <input type="text" :placeholder="item.value" id="insuredPhone" :name="item.colcode" :ref="item.colcode">
                        </div>
                        <!-- 紫金职业分类 -->
                        <div v-else-if="item.colcode === 'workTypeName'" id="occupationClass">
                            <input type="text" @click="ShowOccupation" :name=item.colcode :placeholder="item.value" readonly v-model="OccupationVal" :ref="item.colcode">
                            <van-icon name="arrow" />
                        </div>
                        <div v-else> 
                            <input type="text" placeholder="" :name="item.colcode" :class="item.colcode" :ref="item.colcode">
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
                        <div v-if="item.colcode === 'housesAgeLimit'">
                            <input type="number" class="year" placeholder="请输入房屋年龄" :name="item.colcode" style="width: 5.866667rem;"/>年
                        </div>
                        <div v-else-if="item.colcode === 'citySelect'" :name="item.colcode">
                            <input type="text" @click="AreaShow()" :name="item.colcode" placeholder="请选择省市区" readonly>
                            <van-icon name="arrow" />
                        </div>
                        <div v-else-if="item.colcode === 'situation'">
                            <input type="text" placeholder="请填写详细地址" :name="item.colcode">
                        </div>
                        <div v-else-if="item.colcode === 'licenseNumber' || item.colcode === 'brandNumber'  || item.colcode === 'carframeNumber'">
                            <input type="text" :placeholder="item.value" :name="item.colcode">
                        </div>
                        <div v-else>
                            <input type="text" :placeholder="item.value" :name="item.colcode">
                        </div>
                    </span>
                </li>
            </ul>
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
        <van-popup v-model="areaShow" position="bottom">
        <van-area
            :area-list="areaList"
            @confirm="confirm"
            @cancel="cancel"
            :item-height="35"
        />
        </van-popup>

        <!-- 弹出遮罩层 -->
        <van-popup v-model="loadingShow" :lock-scroll="false" style="background-color: transparent;" :close-on-click-overlay="false">
            <!-- 加载动画 -->
            <van-loading size="24px" vertical color="#1989fa">数据加载中...</van-loading>
        </van-popup>
        <!-- 职业选择弹出 -->
        <van-action-sheet v-model="showOccupation" position="bottom" :style="{ height: '80%' }" title="选择职业分类">
          <van-search placeholder="请输入搜索关键词" v-model="value" @input="onSearch"/>
            <div class="ZhiJinOccupation" v-show="OccupationContent == 'all' ? true : false">
                <ul class="Occupation_one" v-for="(item,index) in OccupationAll" :key="index">
                    <!-- 一级职业 -->
                    <li :code="item.code">{{item.cate}}</li>
                    <div>
                        <!-- 二级职业 -->
                        <li v-for="(items,index) in item.zjJinSecondJobList" :key="index">
                            <div>
                                <p @click="childShow($event)">{{items.cate}}<van-icon name="arrow" style="float:right;"/></p>
                                <div class="showOccupationalName" v-show="false">
                                    <p v-for="(content,index) in items.zjJinThirdJobList" :key="index" @click="selectOccupationVal(item.code + ' ' + items.code + ' ' + content.code,item.cate.trim() + ' ' + items.cate.trim() + ' ' + content.cate.trim())">{{content.cate}}</p>
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
            </div>
            <!-- 搜索展示 -->
            <div class="SearchContent" v-show="OccupationContent == 'search' ? true : false">
              <p v-for="(item,index) in OccupationSearch" :key="index" @click="selectOccupationVal(item.OccupationCode,item.Occupation)">{{item.Occupation}}</p>
            </div>
        </van-action-sheet>
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
import popupContacts from '../../../components/popupContacts' 
export default {
  name: "insuranceZiJin",
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
      showPage: true, //骨架屏是否显示
      loadingShow: false, //加载动画是否显示
      //三级联动
      areaList: area, //三级联动所有数据
      areaShow: false, //三级联动是否显示
      holderList: "", //投保人配置信息(需要让用户填写的信息)
      inserdList: "", //存放单个被保险人基本配置信息
      insuredCertificateType: false, //被保险人证件类型控件显示隐藏
      houseType: false, //被保险人房屋类型控件显示隐藏
      insuredRelationshipShow: false, //与投保人关系控件显示隐藏
      //投保人区域
      typeShow_holder: false, //投保人证件类型是否显示
      //被保险人区域
      //底部信息 标的信息
      otherList: "",
      totalPrice: "",
      onePrice: "", //单件产品价格
      totalVal: "1", //产品个数
      productId: "", //产品id
      goodName: "", //产品名称
      inserdNum: 1, //投保人个数
      productNum: 1, //产品上线个数
      insuredNum: 0, //被保险人上线个数
      inserdArr: "",
      minPolicyDate: 1, //最小起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
      maxPolicyDate: 1, //最大起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
      relationShip: "本人", //投保人与被保险人之间的关系
      relationShipValue: "",
      showOccupation: false, //职业分类是否显示
      OccupationSearch: "", //紫金职业查询数据
      OccupationAll: "", //紫金职业全部JSON数据
      OccupationVal: "", //职业分类value
      cityListCode: "", //选择最后一个职业列表之后获取的code
      value: "", // 职业搜索
      OccupationContent: "all", //全部职业显示为all  查询出来的职业为search
      showContacts:false, //常用联系人弹窗是否显示
      person:'', //选择常用联系人的是投保人，还是被保险人
    };
  },
  created() {},
  mounted() {
    this.onePrice = this.$route.query.priceResult; // 价格
    this.productId = this.$route.query.productId; // 产品id
    this.planId = this.$route.query.planId; // 计划id
    this.changePrice();
    // 投保人配置信息
    var holderArr = [];
    // 被保险人配置信息
    var inserdArr = [];
    // 其他配置信息
    var otherArr = [];
    var that = this;

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
          //获取到第一个select的选择的value
          var that = this;

          // 获取紫金职业分类所有数据
          var args1 = that.sign({});
          api.getZiJinJob(args1).then(res => {
            if (res.success == true) {
              that.OccupationAll = res.ziJinJobList;
            }
          });

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
      });
    });
  },
  methods: {
    // 选择常用联系人回调
    ChildContacts(res){
      this.showContacts = false;
      // 调用公共常用联系人回调
      this.Utils.SelectContacts(res, this.person, 0);
    },
    // 常用联系人
    contacts(person){
        // 显示常用联系人弹窗
        this.showContacts = true;
        // 选择的是投保人 还是被保险人
        this.person = person;
    },
    // 职业搜索
    onSearch() {
      var that = this;
      var value = this.value;
      var SearchContent = [];
      this.OccupationAll.filter(function(res, index) {
        if (value == "") {
          that.OccupationContent = "all";
          return that.OccupationAll;
        } else {
          that.OccupationContent = "search";
          // 过滤一级职业
          if (res.cate.search(value) != -1) {
            for (var q = 0; q < res.zjJinSecondJobList.length; q++) {
              for (
                var w = 0;
                w < res.zjJinSecondJobList[q].zjJinThirdJobList.length;
                w++
              ) {
                SearchContent.push({
                  Occupation:
                    res.cate.trim() +
                    " " +
                    res.zjJinSecondJobList[q].cate.trim() +
                    " " +
                    res.zjJinSecondJobList[q].zjJinThirdJobList[w].cate.trim(),
                  OccupationCode:
                    res.code.trim() +
                    " " +
                    res.zjJinSecondJobList[q].code.trim() +
                    " " +
                    res.zjJinSecondJobList[q].zjJinThirdJobList[w].code.trim()
                });
              }
            }
          } else {
            // 过滤二级职业
            for (var i = 0; i < res.zjJinSecondJobList.length; i++) {
              if (res.zjJinSecondJobList[i].cate.search(value) != -1) {
                for (
                  var w = 0;
                  w < res.zjJinSecondJobList[i].zjJinThirdJobList.length;
                  w++
                ) {
                  SearchContent.push({
                    Occupation:
                      res.cate.trim() +
                      " " +
                      res.zjJinSecondJobList[i].cate.trim() +
                      " " +
                      res.zjJinSecondJobList[i].zjJinThirdJobList[
                        w
                      ].cate.trim(),
                    OccupationCode:
                      res.code.trim() +
                      " " +
                      res.zjJinSecondJobList[i].code.trim() +
                      " " +
                      res.zjJinSecondJobList[i].zjJinThirdJobList[w].code.trim()
                  });
                }
              } else {
                // 过滤三级职业
                for (
                  var j = 0;
                  j < res.zjJinSecondJobList[i].zjJinThirdJobList.length;
                  j++
                ) {
                  if (
                    res.zjJinSecondJobList[i].zjJinThirdJobList[j].cate.search(
                      value
                    ) != -1
                  ) {
                    SearchContent.push({
                      Occupation:
                        res.cate.trim() +
                        " " +
                        res.zjJinSecondJobList[i].cate.trim() +
                        " " +
                        res.zjJinSecondJobList[i].zjJinThirdJobList[
                          j
                        ].cate.trim(),
                      OccupationCode:
                        res.code.trim() +
                        " " +
                        res.zjJinSecondJobList[i].code.trim() +
                        " " +
                        res.zjJinSecondJobList[i].zjJinThirdJobList[
                          j
                        ].code.trim()
                    });
                  }
                }
              }
            }
          }
        }
        return SearchContent;
      });
      this.OccupationSearch = SearchContent;
    },
    // 显示职业分类选择
    ShowOccupation() {
      this.showOccupation = true;
    },
    // 职业分类二级选择显示隐藏
    childShow(event) {
      if (
        $(event.target)
          .parent("div")
          .find("div")
          .attr("class") == "showOccupationalName"
      ) {
        $(".showOccupationalName").removeClass("OccupationalName");
        $(".van-icon").css("transform", "rotate(0deg)");
        $(event.target)
          .parent("div")
          .find("div")
          .addClass("OccupationalName");
        $(event.target)
          .find($(".van-icon"))
          .css("transform", "rotate(90deg)");
      } else {
        $(event.target)
          .parent("div")
          .find("div")
          .removeClass("OccupationalName");
        $(event.target)
          .find($(".van-icon"))
          .css("transform", "rotate(0deg)");
      }
    },
    // 职业分类三级选择获取内容和code
    selectOccupationVal(code, val) {
      this.OccupationVal = val;
      this.cityListCode = code;
      this.showOccupation = false;
    },
    //投保人区域
    //投保人证件类型选择回调
    TypeSelect_holder(item) {
      this.typeShow_holder = false;
      this.$refs.holderCertificateType[0].value = item.value;
      // 判断身份证回调类型为身份证的时候，性别锁死
      this.Utils.CertificateTypeLockSex(item.value,$(".holderSex"),this.getMoreInfoHolder());
    },
    // 投保人证件配置显示隐藏
    ChooseType_holder() {
      this.typeShow_holder = true;
    },
    //被保险人证件类型选择回调
    TypeSelect_inserd(item) {
      this.insuredCertificateType = false;
      this.$refs.insuredCertificateType[0].value = item.name;
      // 被保人身份证锁定性别
      this.Utils.CertificateTypeLockSex(item.value, $(".insuredSex"),this.getMoreInfoInserd());
    },
    //被保险人证件类型 显示隐藏
    ChooseType_inserd() {
      this.insuredCertificateType = true;
    },
    // 投保人与被保险人关系类型选择 显示隐藏
    showSelect_Relationship() {
      this.insuredRelationshipShow = !this.insuredRelationshipShow;
    },
    //被保险人与投保人关系类型选择回调
    holderSelect_Relationship(item) {
      this.relationShip = item.name; //判断是本人，父母，子女
      this.relationShipValue = item.value;
      
      //======================================获取投保人填写的信息=============
      if (this.relationShip == "本人") {
        var holder = {}; //投保人信息
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
        // 被保人选择本人 被保人信息赋值
        $("#insuredName").val(holder.holderName);
        $("#insuredCertificateNo").val(holder.holderCertificateNo);
        $("#insuredBirth").val(holder.holderBirth);
        $("#insuredPhone").val(holder.holderPhone);
        $("#insuredCertificateType").val(holder.holderCertificateType);

        if (holder.holderSex == "男-1" || holder.holderSex == "男") {
          $(".insuredSex input[title=男]").click();
        } else {
          $(".insuredSex input[title=女]").click();
        }
        layui.form.render();
        // 被保人身份证锁定性别
        this.Utils.CertificateTypeLockSex($('#insuredCertificateType').val(), $('.insuredSex'));
      } else {
        $("#insuredName").val("");
        $("#insuredCertificateType").val("");
        $("#insuredCertificateNo").val("");
        $("#insuredBirth").val("");
        $("#insuredPhone").val("");
        $(".insuredSex input[title=男]").click();
        layui.form.render();
      }

      this.insuredRelationshipShow = !this.insuredRelationshipShow;
      $("#insuredRelationship").val(item.name);
    },
    // 价格计算 单价*人数*份数
    changePrice() {
      this.totalPrice = this.accMul(Number(this.onePrice),Number(this.totalVal),Number(this.inserdNum));
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
      let isSocialSecurity = that.$route.query.isSocialSecurity;
      $.each(that.inserdList, function(index, ele) {
        if (ele.colcode == "insuredSex") {
          var radioContent = $(".inserdPolicy")
            .find($("div[name=" + ele.colcode + "]"))
            .find('input[name="sex"]:checked')
            .val();
          inserdList[ele.colcode] = radioContent;
        } else if (isSocialSecurity) {
          isSocialSecurity = false;
          inserdList["isSocialSecurity"] =
            that.$route.query.isSocialSecurity;
        } else if (ele.colcode == "workTypeName") {
          if (that.OccupationVal != "" && that.cityListCode != "") {
            inserdList[ele.colcode] = {};
            inserdList[ele.colcode]["job1"] = {
              name: that.OccupationVal.split(" ")[0],
              code: that.cityListCode.split(" ")[0]
            };
            inserdList[ele.colcode]["job2"] = {
              name: that.OccupationVal.split(" ")[1],
              code: that.cityListCode.split(" ")[1]
            };
            inserdList[ele.colcode]["job3"] = {
              name: that.OccupationVal.split(" ")[2],
              code: that.cityListCode.split(" ")[2]
            };
          }
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
      data.holder = holder;
      data.inserd = inserdAllList;
      console.log(data);

      //==================================================  校验户填写信息  =================================================

      // 投保人信息校验
      var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; //验证姓名正则
      if ($("#time").val() == "") {
        this.Toast("请选择起保时间");
      } else if (!reg.test($("input[name=holderName]").val())) {
        this.Toast("投保人姓名不正确");
      } else if ($("input[name=holderCertificateType]").val() == "") {
        this.Toast("请选择投保人证件类型");
      } else if ($("input[name=holderCertificateNo]").val() == "") {
        this.Toast("请填写投保人证件号码");
      } else if (
        $("input[name=holderCertificateType]").val() == "身份证" &&
        isIdCard($("input[name=holderCertificateNo]").val()) == false
      ) {
        this.Toast("投保人身份证号码不正确");
      } else if ($("input[name=holderBirth]").val() == "") {
        this.Toast("请选择投保人出生日期");
        // 被保险人信息校验
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
      } else if ($("input[name=insuredRelationship]").val() == "") {
        //开始校验被保险人
        this.Toast("请选择与投保人关系");
      } else if ($("input[name=insuredName]").val() == "") {
        this.Toast("请输入被保险人姓名");
      } else if ($("input[name=insuredCertificateType]").val() == "") {
        this.Toast("请选择被保险人证件类型");
      } else if ($("input[name=insuredCertificateNo]").val() == "") {
        this.Toast("请输入被保险人证件号码");
      } else if (
        $("input[name=insuredCertificateType]").val() == "身份证" &&
        isIdCard($("input[name=insuredCertificateNo]").val()) == false
      ) {
        this.Toast("被保险人身份证号码不正确");
      } else if ($("input[name=insuredBirth]").val() == "") {
        this.Toast("请选择被保险人出生日期");
      } else if (
        $("input[name=insuredPhone]").val() == "" ||
        $("input[name=insuredPhone]").val() != undefined
          ? isPhoneNumber($("input[name=insuredPhone]").val()) == true
            ? false
            : true
          : false
      ) {
        this.Toast("被保险人电话不正确");
      } else if ($("input[name=workTypeName]").val() == '') {
        this.Toast("请选择职业分类");
      } else {
        var Status = true;
        var licenseNumber = ""; //车牌号
        for (var i = 0; i < data.inserd.length; i++) {
          if (data.inserd[i].subjectJson.citySelect == "") {
            this.Toast("请选择房屋地址");
            Status = false;
          } else if (data.inserd[i].subjectJson.HouseZipCode == "") {
            this.Toast("请输入房屋邮政编码");
            Status = false;
          }
        }

        if (Status == true) {
          var args = that.sign(data);
          that.loadingShow = true;

          api.getAppAddpolicy(args).then(
              response => {
                that.loadingShow = false;
                var res = response;
                if (res.code == 1) {
                  var Pid = res.data;
                  that.$router.push({
                    path: "/policyPreview", //保单预览路由
                    query: {
                      id: Pid,
                      productId: that.productId,
                      planId: that.planId
                    }
                  });
                  this.Toast(res.message);
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
    // 被保险人 输入身份证号
    getMoreInfoInserd() {
      if ($("#insuredCertificateType").val() == "身份证") {
        var idVal = $("#insuredCertificateNo").val();
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
    },
    // 三級联动
    confirm(val) {
      if (val[2] == undefined) {
        $("input[name=citySelect]").val(
          val[0].name + " " + val[1].name
        );
      } else {
        $("input[name=citySelect]").val(
          val[0].name + " " + val[1].name + " " + val[2].name
        );
      }
      this.areaShow = false;
    },
    cancel() {
      this.areaShow = false;
    },
    AreaShow() {
      this.areaShow = true;
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
      margin-top: -9px;
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
  
  #occupationClass select {
    display: block;
  }
  #occupationClass .van-cell {
    padding: 0;
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
#job1,
#job2,
#job3 {
  background: white;
  height: 72px;
  color: #555;
}
// 紫金职业分类样式
.ZhiJinOccupation {
  .Occupation_one {
    & > li {
      padding: 20px 70px;
      background-color: rgb(245, 245, 245);
      text-align: center;
    }
    & > div > li {
      padding: 0 50px;
      border-bottom: solid 1px rgb(245, 245, 245);
      div {
        p {
          padding: 20px 0;
        }
        div {
          p {
            padding: 20px 40px;
            border-top: solid 1px rgb(245, 245, 245);
          }
        }
      }
    }
  }
}
.OccupationalName {
  display: block !important;
}
.SearchContent {
  p {
    padding: 20px 40px;
    border-top: solid 2px rgb(245, 245, 245);
  }
  & > p:nth-last-child(1) {
    border-bottom: solid 2px rgb(245, 245, 245);
  }
}
</style>