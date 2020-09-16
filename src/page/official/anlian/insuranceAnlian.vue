<!-- 组件说明 -->
<template>
    <div>
      <div v-if="showPage">
          <van-skeleton title :row="20" style="padding-top: 0.5rem;"/>
      </div>
      <!--  -->
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
                              <div v-else>
                                  <input type="text" :name="item.colcode" :placeholder="item.value" :ref="item.colcode">
                              </div>
                          </span>
                      </li>
                  </ul>
              </div>
          </div>
          
          <!-- 被保人信息 -->
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
                              <input type="text" :name="item.colcode" class="insuredName" placeholder="请填写被保险人姓名" :ref="item.colcode">
                              <img src="../../../assets/images/person.png" alt="" @click="contacts('bbr')">
                          </div>
                          <!-- 被保险人性别 -->
                          <div v-else-if="item.colcode === 'insuredSex'" >
                              <form class="layui-form " action="javascript:void;">
                                  <div class="layui-input-inline insuredSex" :name="item.colcode">
                                      <input type="radio" name="sex" v-for="(radioItem,index) in item.value" :key="radioItem.name" :value="radioItem.value" :title="radioItem.name" :checked="index == 0 ? 'checked' :''" :ref="item.colcode">
                                  </div>
                              </form>
                          </div>
                          <!-- 被保险人证件类型 -->
                          <div v-else-if="item.colcode === 'insuredCertificateType'">
                              <!-- v-model 控制显示可隐藏 -->
                              <van-action-sheet
                              v-model="insuredCertificateType"
                              :actions="item.value"
                              cancel-text="取消"
                              @select="TypeSelect_inserd"
                              title="请选择证件类型"
                              />
                              <input type="text" placeholder="请选择证件类型" @click="ChooseType_inserd()" :name="item.colcode" id="insuredCertificateType" readonly :ref="item.colcode">
                              <van-icon name="arrow" />
                          </div>
                          <!-- 被保险人证件号 -->
                          <div v-else-if="item.colcode === 'insuredCertificateNo'">
                              <input type="text" :name="item.colcode" class="insuredCertificateNo" placeholder="请填写被保险人证件号码" @keyup="getMoreInfoInserd()" maxlength="18" :ref="item.colcode">
                          </div>
                          <!-- 被保险人出生日期 -->
                          <div v-else-if="item.colcode === 'insuredBirth'" >
                              <input type="text" placeholder="请选择出生日期" class="insuredBirth" id="insuredBirth" :name="item.colcode" readonly :ref="item.colcode">
                          </div> 
                          <!-- 与投保人关系 -->
                          <div v-else-if="item.colcode === 'insuredRelationship'">
                              <van-action-sheet
                              v-model="insuredRelationship"
                              :actions="item.value"
                              cancel-text="取消"
                              @select="inserdSelect_Relationship"
                              :title="goodName == '安联居无忧（自住型）基本版' ? '与房屋关系' : '为谁投保'"
                              />
                              <input type="text" :placeholder="goodName == '安联居无忧（自住型）基本版' ? '与房屋关系' : '为谁投保'" @click="showSelect_Relationship()" id="insuredRelationship" :name="item.colcode" readonly :ref="item.colcode">
                              <van-icon name="arrow" />
                              <!-- <input type="text" :placeholder="item.value" :name="item.colcode"> -->
                          </div>
                          <!-- 安联职业分类 -->
                          <div v-else-if="item.colcode === 'workTypeName'">
                              <input type="text" @click="ShowOccupation" :name=item.colcode :placeholder="item.value" readonly v-model="OccupationVal" :ref="item.colcode"> 
                          </div>
                          <div v-else-if="item.colcode === 'isSocialSecurity'">
                              <input type="text" :name="item.colcode" :value="isSocialSecurity" :class="item.colcode" readonly :ref="item.colcode">
                          </div>
                          <div v-else>
                              <input type="text" :placeholder="item.value" :class="item.colcode" :name="item.colcode" :ref="item.colcode">
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
                    <div v-for="item in otherList" :key="item.id">
                        <li v-if="item.colcode === 'AccountNo' || item.colcode === 'AccountBankName' || item.colcode === 'AccountName'" v-show="renewalOfInsurance == true">
                            <span class="list_01">{{item.colname}}</span>
                            <span class="list_02">
                                <div v-if="item.colcode === 'AccountBankName'">
                                    <input type="text"
                                    readonly
                                    clickable
                                    :value="bankValue"
                                    placeholder="请选择开户银行"
                                    @click="showBank = true"
                                    :name="item.colcode"
                                    />
                                    <van-icon name="arrow" style="vertical-align: middle;margin-top:-1px;"/>
                                </div>
                                <div v-else>
                                    <input type="text" :placeholder="item.value" :name="item.colcode">
                                </div>
                            </span>
                        </li>
                        <li v-else>
                            <span class="list_01">{{item.colname}}</span>
                            <span class="list_02">
                                <!-- 安联臻爱宝 -->
                                <div v-if="item.colcode === 'AutoRenewalFlag'">
                                        <van-action-sheet
                                        v-model="AutoRenewalFlag"
                                        :actions="item.value"
                                        cancel-text="取消"
                                        @select="selectAutoRenewalFlag"
                                        title="请选择是否自动续保"
                                        />
                                        <input type="text" placeholder="请选择是否自动续保" @click="AutoRenewalFlag_show()" :id="'AutoRenewalFlag'" :name="item.colcode" readonly value="是">
                                        <van-icon name="arrow" />
                                </div>
                                <div v-else-if="item.colcode === 'citySelect'" :name="item.colcode">
                                    <input type="text" @click="AreaShow()" :name="item.colcode" :citySelect="'citySelect'" placeholder="请选择省市区" readonly>
                                    <van-icon name="arrow" />
                                </div>
                                <div v-else-if="item.colcode === 'holderAddress'">
                                    <input type="text" :value="holderAddressValue" :name="item.colcode" :placeholder="item.value" @click="showArea" readonly>
                                </div>
                                <div v-else>
                                    <input type="text" :placeholder="item.value" :name="item.colcode">
                                </div>
                            </span>
                        </li>
                    </div>
                </ul>
          </div>
          <!-- 受益人信息 -->
          <div class="beneFiciary" style="padding-bottom:0!important;">
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
          <!-- 安联臻爱医疗保险感恩版展示代扣服务协议 -->
          <div v-if="goodName == '安联臻爱医疗保险感恩版'" v-show="renewalOfInsurance == true">
            <van-checkbox v-model="checked" style="margin: 0.4rem 0.2rem 0.8rem;">
              我已阅读并同意
              <span style="color: rgb(0, 140, 255);" @click="showFile('AnLianRenewalInsurance.pdf')">《客户授权委托书和代扣服务协议》</span>
            </van-checkbox>
          </div>
          <!-- 安联臻爱医疗保险感恩版展示代扣服务协议 -->
          <div class="fixBar">
              <van-tabbar>
                  <van-tabbar-item class="price">￥{{totalPrice}}</van-tabbar-item>
                  <van-tabbar-item class="gobuy" @click="onCheckPolicy">立即投保</van-tabbar-item>
              </van-tabbar>
          </div>  
          <van-popup v-model="areaShow" position="bottom">
          <!-- 省市区下拉框 -->
          <van-area
              :area-list="areaList"
              @confirm="confirm"
              @cancel="cancel"
              :item-height="35"
          />
          </van-popup>
          <!-- 开户银行下拉框 -->
          <van-popup v-model="showBank" position="bottom">
              <van-picker
                  show-toolbar
                  :columns="bankList"
                  @cancel="showBank = false"
                  @confirm="onConfirm"
              />
          </van-popup>
          <!-- 弹出遮罩层 -->
          <van-popup v-model="loadingShow" :lock-scroll="false" style="background-color: transparent;" :close-on-click-overlay="false">
            <!-- 加载动画 -->
              <van-loading size="24px" vertical color="#1989fa">数据加载中...</van-loading>
          </van-popup>
          <!-- 安联省市联动 -->
          <van-popup v-model="showPicker" position="bottom">
              <van-picker
              v-if="pageShow"
              show-toolbar 
              :columns="columns" 
              @cancel="showPicker = false"
              @confirm="onConfirm1" 
              @change="onChange" 
              :item-height="35" />
          </van-popup>
          <!-- 职业选择弹出 -->
          <van-action-sheet title="选择职业分类" v-model="showOccupation" position="bottom" :style="{ height: '80%' }">
              <div class="AnLianOccupation">
                  <ul class="Occupation_one" v-for="(item,index) in OccupationData" :key="index">
                      <!-- 一级职业 -->
                      <li>{{item.trade}}</li>
                      <div>
                          <!-- 二级职业 -->
                          <li v-for="(items,index) in item.anLianSecondJobList" :key="index">
                              <div>
                                  <p @click="childShow($event)">{{items.occupationalClass}}<van-icon name="arrow" style="float:right;"/></p>
                                  <div class="showOccupationalName" v-show="false">
                                      <p v-for="(content,index) in items.anLianThirdJobList" :key="index" @click="selectOccupationVal(content.occupationalCode,item.trade,items.occupationalClass,content.occupationalName)">{{content.occupationalName}}</p>
                                  </div>
                              </div>
                          </li>
                      </div>
                  </ul>
              </div>
          </van-action-sheet>
          <!-- 常用联系人 -->
          <van-action-sheet title="选择常用联系人" v-model="showContacts" position="bottom" :style="{ height: '100%' }">
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
import { Toast } from "vant";
import {
  isIdCard,
  isPhoneNumber,
  isEmail,
  AgeCheck
} from "../../../util/validate";
// 弹出常用联系人
import popupContacts from '../../../components/popupContacts' 
export default {
  name: "insuranceAnlian",
  components: {
    popupContacts:popupContacts,
  },
  data() {
    return {
      titleIcon1: require("../../../assets/images/others/personal1.png"),
      titleIcon2: require("../../../assets/images/others/personal2.png"),
      titleIcon3: require("../../../assets/images/others/personal3.png"),
      titleIcon4: require("../../../assets/images/others/personal4.png"),
      titleIcon5: require("../../../assets/images/others/personal5.png"),
      titleIcon6: require("../../../assets/images/others/personal6.png"),
      showPage: true, //是否显示骨架屏，默认显示
      loadingShow: false, //加载动画是否显示
      //三级联动
      areaList: area, //三级联动所有数据
      areaShow: false, //三级联动是否显示
      holderList: "", //投保人配置信息(需要让用户填写的信息)
      inserdList: "", //存放单个被保险人基本配置信息
      insuredCertificateType: false, //被保险人证件类型控件显示隐藏
      AutoRenewalFlag: false, //被保险人房屋类型控件显示隐藏
      insuredRelationship: false, //与投保人关系控件显示隐藏
      //投保人区域
      holderBirth: "", //投保人性别
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
      productNum: 1, //产品上限个数
      insuredNum: 0, //被保险人上限个数
      minPolicyDate: 1, //最小起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
      maxPolicyDate: 1, //最大起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
      showOccupation: false, //职业分类是否显示
      OccupationData: "", //安联职业全部JSON数据
      OccupationVal: "", //职业分类value
      cityListCode: "", //选择最后一个职业列表之后获取的 occupationalCode
      renewalOfInsurance: true, //是否自动续费
      isSocialSecurity: "", //是否有社保
      showBank: false, //开户银行类型显示隐藏
      bankValue: "", //开户银行类型选择value值
      bankList: [
        //开户银行数据类型
        { text: "中国银行", value: "中国银行" },
        { text: "建设银行", value: "建设银行" },
        { text: "交通银行", value: "交通银行" },
        { text: "邮政储蓄银行", value: "邮政储蓄银行" },
        { text: "广发银行", value: "广发银行" },
        { text: "兴业银行", value: "兴业银行" },
        { text: "广大银行", value: "广大银行" },
        { text: "平安银行", value: "平安银行" },
        { text: "中信银行", value: "中信银行" },
        { text: "浦发银行", value: "浦发银行" },
        { text: "北京银行", value: "北京银行" },
        { text: "广州银行", value: "广州银行" },
        { text: "上海银行", value: "上海银行" }
      ],
      holderAddressValue: "", //安联省市选中value
      provinceCode: "", //安联省code
      cityCode:'',//安联市code
      showContacts:false, //常用联系人弹窗是否显示
      person:'', //选择常用联系人的是投保人，还是被保险人
      columns: [ //安联省市区联动
          {
              values: '',
              className: 'column1'
          },
          {
              values: '',
              className: 'column2',
              defaultIndex: 0
          },
          {
              values: '',
              className: 'column3',
              defaultIndex: 0
          }
      ],
      pageShow:false, //安联省市区联动数据是否渲染完毕
      cityDates:'', //安联当前选中市的所有区所有数据
      showPicker:false,// 安联省市区联动弹窗是否显示
      data:'',//安联所有省市区数据
      checked: false, //安联臻爱医疗保险感恩版展示代扣服务协议
    };
  },
  beforeCreate(){
      // 安联省市区联动数据渲染
      var args1 = this.sign({});
      api.getAnLianArea(args1).then(res => {
          this.data = res.anLianAreaList;
          this.columns[0].values = Object.values(res.anLianAreaList).map(function(e){
              return {text:e.name,code:e.code}
          })
          this.columns[1].values = Object.values(res.anLianAreaList[0].anLianCityList).map(function(e){
              return {text:e.name,code:e.code}
          })
          this.columns[2].values = Object.values(res.anLianAreaList[0].anLianCityList[0].anLianCountyList).map(function(e){
              return {text:e.subcityNameZhs,code:e.subcityCode}
          })
          this.$nextTick(function(){
              this.pageShow = true;
          })
      });
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
    this.changePrice(); //价格试算
    var that = this;

    // 根据产品id 获取产品名称
    var args = this.sign({ productId: this.productId, planId: this.planId });
    // 投保人配置信息
    var holderArr = [];
    // 被保险人配置信息
    var inserdArr = [];
    // 其他配置信息
    var otherArr = [];
    // 获取投保人、被保险人、标的信息 配置信息
    // this.$axios.post('/arg/openapi/h5/product/getProductPolicyInput',args).then(res => {
    api.getSetPolicy(args).then(res => {
      if (res.code == 20000) {
        that.showPage = false;
        that.$nextTick(function() {
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
      }
    });

    // 获取安联职业数据
    var args1 = this.sign({});
    api.getJobByAnLian(args1).then(res => {
      that.OccupationData = res.anLianJobList;
    });

    // 判断是否有传社保
    this.$nextTick(function() {
      if (this.$route.query.isSocialSecurity) {
        this.isSocialSecurity = this.$route.query.isSocialSecurity;
      }
    });

    // 获取当前用户的常用联系人
    var args2 = this.sign({userId: this.getCookie('ZB_JUSER_Mid'),openId: this.getCookie("openId")});
    api.queryFrequentContactsList(args2).then(res=>{
      if(res.code == 20000){
        console.log(res);
      }else{
        Toast(res.message);
      }
    })
  },
  methods: {
    onChange(picker, values,index) {
        picker.setColumnValues(1, this.cityDate(this.data,values[0].code));
        picker.setColumnValues(2, this.county(this.data,values[1].code));
    },
    // 修改市
    cityDate(data,province){
        var that = this;
        data.forEach(function(res){
            if(res.code == province){
                that.cityDates =  res;
            }
        });
        
        return that.cityDates.anLianCityList.map(function(res){
            return {text:res.name,code:res.code};
        })
    },
    // 修改县
    county(data,county){
        var that = this;
        var countyDate = '';
        // 因为vant的 van-picker 回调只会返回你修改的那一列，比如现在为 [北京，北京，东城区]，你修改了省为[天津市，天津市，和平区]，但是vant的change回调会得到[天津市,北京,东城区],其他两个在回调中没有修改，不知道我的渲染方法有问题还是什么问题。
        // 所以我在这里判断change事件触发后，如果你修改了省份的话，回调里面省份会改变，但是市和区还是上一个省份的 市和区，这时我们执行回调修改省，市，区的时候，因为回调只有省改变了，市和区DOM改变了，但是回调里面没改变的问题（不晓得什么问题）,这时我们去找省下面的 市，我们取回调的市名称，如果在省下面没有找到这个市，默认展示第一个市，区也默认展示第一个市下面的区，如果遍历市能查到，就去展示对应的市。
        that.cityDates.anLianCityList.forEach(function(res){
            if(res.code == county){
                countyDate =  res;
            }
        });
        // 这里如果没有找到对应的县
        if(countyDate == ''){
            countyDate = that.cityDates.anLianCityList[0];
        }
        // return 县
        return countyDate.anLianCountyList.map(function(res){
            return {text:res.subcityNameZhs,code:res.subcityCode};
        })
    },
    onConfirm1(val){
      this.showPicker = false;
      this.holderAddressValue = val[0].text + ' ' + val[1].text + ' ' + val[2].text;
      this.provinceCode = val[0].code;
      this.cityCode = val[1].code;
    },
    // 常用联系人回调
    ChildContacts(res){
      this.showContacts = false;
      // 调用公共常用联系人回调
      this.Utils.SelectContacts(res, this.person, 0);
      if(this.person == 'bbr'){
        if($('#insuredCertificateType').val() == '身份证'){
          this.$nextTick(function(){
            $('input[name="insuredBirth"]').parents('li').hide();
            $('.insuredSex').parents('li').hide();
          })
        }else{
          this.$nextTick(function(){
            $('input[name="insuredBirth"]').parents('li').show();
            $('.insuredSex').parents('li').show();
          })
        }
      }
    },
    // 常用联系人
    contacts(person){
      // 显示常用联系人弹窗
      this.showContacts = true;
      // 选择的是投保人 还是被保险人
      this.person = person;
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
    selectOccupationVal(
      code,
      OccupationValOne,
      OccupationValTow,
      OccupationValThree
    ) {
      this.OccupationVal =
        OccupationValOne + " " + OccupationValTow + " " + OccupationValThree;
      this.cityListCode = code;
      this.showOccupation = false;
    },
    //检查被保险人年龄
    checkInsurdAge(insurdAge) {
      let standTime = $("#time").val();
      let minAge = this.$route.query.insurdAge.split("-")[0];
      let maxAge = this.$route.query.insurdAge.split("-")[1];
      return AgeCheck(insurdAge, standTime, minAge, maxAge);
    },
    // 显示安联省市联动
    showArea() {
      this.showPicker = true;
      this.$nextTick(function() {
        // 截取掉DOM元素拼接在后面的code
        for (var i = 0; i < $(".van-ellipsis").length; i++) {
          $(".van-ellipsis")
            .eq(i)
            .html(
              $(".van-ellipsis")
                .eq(i)
                .html()
                .split("-")[0]
            );
        }
      });
    },
    // 开户银行选择回调
    onConfirm(value) {
      this.bankValue = value.value;
      this.showBank = false;
    },
    //投保人区域
    //投保人证件类型选择回调
    TypeSelect_holder(item) {
      this.typeShow_holder = false;
      this.$refs.holderCertificateType[0].value = item.name;
      // 判断身份证回调类型为身份证的时候，性别锁死
      this.Utils.CertificateTypeLockSex(item.value,$(".holderSex"),this.getMoreInfoHolder());
    },
    //被保险人证件类型选择回调
    TypeSelect_inserd(item) {
      if(item.name == '身份证'){
        this.$nextTick(function(){
          $('input[name="insuredBirth"]').parents('li').hide();
          $('.insuredSex').parents('li').hide();
        })
      }else{
         this.$nextTick(function(){
          $('input[name="insuredBirth"]').parents('li').show();
          $('.insuredSex').parents('li').show();
        })
      }
      this.insuredCertificateType = !this.insuredCertificateType;
      $("#insuredCertificateType").val(item.name);
      // 被保人身份证锁定性别
      this.Utils.CertificateTypeLockSex(item.value,$(".insuredSex"),this.getMoreInfoInserd());
    },
    //被保险人证件类型 显示隐藏
    ChooseType_inserd() {
      this.insuredCertificateType = !this.insuredCertificateType;
    },
    //房屋类型选择回调
    selectAutoRenewalFlag(item) {
      this.AutoRenewalFlag = !this.AutoRenewalFlag;
      $("#AutoRenewalFlag").val(item.name);
      if (item.value == "否") {
        this.renewalOfInsurance = false;
      } else {
        this.renewalOfInsurance = true;
      }
    },
    //房屋类型选择 显示隐藏
    AutoRenewalFlag_show() {
      this.AutoRenewalFlag = !this.AutoRenewalFlag;
    },
    // 投保人与被保险人关系类型选择 显示隐藏
    showSelect_Relationship() {
      this.insuredRelationship = !this.insuredRelationship;
    },
    //被保险人与投保人关系类型选择回调
    inserdSelect_Relationship(item) {
      this.insuredRelationship = !this.insuredRelationship;
      $("#insuredRelationship").val(item.name);
      // 选择本人
      if (item.name == "本人" || item.name == "房屋业主") {
        // 被保险人姓名
        $(".inserdPolicy")
          .find($("input[name=insuredName]"))
          .val($("input[name=holderName]").val());
          // 被保险人证件类型
        $("#insuredCertificateType").val(
          $("input[name=holderCertificateType]").val()
        );
          // 被保险人证件号
        $(".inserdPolicy")
          .find($("input[name=insuredCertificateNo]"))
          .val($("input[name=holderCertificateNo]").val());
          // 被保险人手机号码
        $(".inserdPolicy")
          .find($("input[name=insuredPhone]"))
          .val($("input[name=holderPhone]").val());
          // 被保险人性别
        var idVal = $(".insuredCertificateNo").val();
        var tBirth_y = idVal.substring(6, 10);
        var tBirth_m = idVal.substring(10, 12);
        var tBirth_d = idVal.substring(12, 14);
        var tBirth = tBirth_y + "-" + tBirth_m + "-" + tBirth_d;
        if(idVal != '' && $('#holderCertificateType').val() == '身份证'){
          this.$nextTick(function(){
            $('input[name="insuredBirth"]').parents('li').hide();
            $('.insuredSex').parents('li').hide();
          })

          $("#insuredBirth").val(tBirth);
          var sex = idVal.charAt(16);
          if (sex % 2 == 0) {
            $(".insuredSex").eq(0).find("input[title=女]").click();
          } else {
            $(".insuredSex").eq(0).find("input[title=男]").click();
          }
        } else {
          $("#insuredBirth").val($('#holderBirth').val()); // 出生日期
          var holderSexValue = $(".holderSex").find('input[name="sex"]:checked').val();
          $(".insuredSex").eq(0).find("input[title='"+ holderSexValue +"']").click(); // 性别

          this.$nextTick(function(){
            $('input[name="insuredBirth"]').parents('li').show();
            $('.insuredSex').parents('li').show();
          })
        }
        layui.use("form", function() {
          var form = layui.form;
          form.render();
        });
        // 被保人身份证锁定性别
        this.Utils.CertificateTypeLockSex($('#insuredCertificateType').val(), $('.insuredSex'));
      } else {
        // $("input[name=insuredName]").val("");
        // $("input[name=insuredCertificateType]").val("");
        // $("input[name=insuredCertificateNo]").val("");
        // $("input[name=insuredPhone]").val("");
        // $("#insuredBirth0").val("");
      }
    },
    changePrice() {
      // 价格 * 人数 * 份数
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

      //===================================  获取用户填写信息 ==============================

      // 获取投保人填写信息
      $.each(this.holderList, function(index, ele) {
        if (ele.colcode == "holderSex") {
          holder[ele.colcode] = $(".holderSex")
            .find('input[name="sex"]:checked')
            .val();
        } else if (ele.colcode == "postcode") {
        } else {
          holder[ele.colcode] = $('[name="' + ele.colcode + '"]').val();
        }
      });
      
      // 获取被保险人填写信息
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
            .find($("input[name=" + ele.colcode + "]"))
            .val();
        } else if (ele.colcode == "workTypeName") {
          inserdList[ele.colcode] = that.OccupationVal;
          inserdList["work_type_code"] = that.cityListCode;
        } else {
          if (ele.colcode != undefined) {
            inserdList[ele.colcode] = $(".inserdPolicy")
              .find($("input[name=" + ele.colcode + "]"))
              .val();
          }
        }
      });

      // 获取其他信息 放到other对象中
      var otherList = {};
      $.each(that.otherList, function(index, ele) {
        if (that.renewalOfInsurance == false) {
          if (
            ele.colcode != "AccountNo" &&
            ele.colcode != "AccountBankName" &&
            ele.colcode != "AccountName"
          ) {
            otherList[ele.colcode] = $(".otherPolicy")
              .find($("input[name=" + ele.colcode + "]"))
              .val();
          }
        } else if (ele.colcode == "postcode") {
          otherList.postcode = $('[name="' + ele.colcode + '"]').val();
          otherList.provinceCode = that.provinceCode;
          otherList.cityCode = that.cityCode;
        } else {
          otherList[ele.colcode] = $(".otherPolicy")
            .find($("input[name=" + ele.colcode + "]"))
            .val();
        }
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
        Toast("请选择起保时间");
      } else if (!reg.test($("input[name=holderName]").val())) {
        Toast("投保人姓名不正确");
      } else if ($("input[name=holderCertificateType]").val() == "") {
        Toast("请选择投保人证件类型");
      } else if ($("input[name=holderCertificateNo]").val() == "") {
        Toast("请填写投保人证件号码");
      } else if (
        $("input[name=holderCertificateType]").val() == "身份证" &&
        isIdCard($("input[name=holderCertificateNo]").val()) == false
      ) {
        Toast("投保人身份证号码不正确");
      } else if (
        $("input[name=holderPhone]").val() == "" ||
        isPhoneNumber($("input[name=holderPhone]").val()) == false
      ) {
        Toast("投保人电话不正确");
      } else if (
        $("input[name=holderMailbox]").val() == "" ||
        isEmail($("input[name=holderMailbox]").val()) == false
      ) {
        Toast("投保人邮箱不正确");
      } else if ($("input[name=holderBirth]").val() == "") {
        Toast("请选择投保人出生日期");
        // 被保险人信息校验
      } else {  
        var Status = true;
        for (var i = 0; i < data.inserd.length; i++) {
          if (data.inserd[i].insuredRelationship == "") {
            Toast("请选择与投保人关系");
            Status = false;
          } else if (data.inserd[i].insuredName == "") {
            Toast("请输入被保险人姓名");
            Status = false;
          } else if (data.inserd[i].insuredSex == "") {
            Toast("请选择被保险人性别");
            Status = false;
          } else if (data.inserd[i].insuredCertificateNo == "") {
            Toast("请输入被保险人证件号码");
            Status = false;
          } else if (data.inserd[i].insuredCertificateType == "") {
            Toast("请选择被保险人证件类型");
            Status = false;
          } else if (data.inserd[i].insuredBirth == "") {
            Toast("被保险人年龄不符合");
            Status = false;
          } else if (data.inserd[i].insuredPhone == "") {
            Toast("请输入被保险人手机号");
            Status = false;
          } else if (data.inserd[i].workTypeName == "") {
            Toast("请选择职业信息");
            Status = false;
          } else if (data.inserd[i].isSocialSecurity == "") {
            Toast("请选择有无社保");
            Status = false;
            // 标的信息判断
          } else if (that.renewalOfInsurance) {
            if (data.inserd[i].subjectJson.AccountNo == "") {
              Toast("请输入银行账户");
              Status = false;
            } else if (data.inserd[i].subjectJson.AccountBankName == "") {
              Toast("请选择开户银行");
              Status = false;
            } else if (data.inserd[i].subjectJson.AccountName == "") {
              Toast("请输入投标人");
              Status = false;
            }else if (data.inserd[i].subjectJson.holderAddress == "") {
              Toast("请选择投保家居地址");
              Status = false;
            }else if (data.inserd[i].subjectJson.detailedAddress == "") {
              Toast("请输入详细地址");
              Status = false;
            }else if (data.inserd[i].subjectJson.postcode == "") {
              Toast("请输入邮编");
              Status = false;
            }else if(that.goodName == '安联臻爱医疗保险感恩版' && that.checked == false){
              Toast("请同意客户授权委托书和代扣服务协议");
              Status = false;
            }
          // }else if(that.goodName == '安联臻爱医疗保险感恩版' && that.checked == false){
          //   Toast("请同意客户授权委托书和代扣服务协议");
          //   Status = false;
          }
        }
        
        if (Status == true) {
          var args = that.sign(data);
          that.loadingShow = true;
          // 核保
          // this.$axios.post('/brg/openapi/Order/appAddpolicy',args)  //林彰淼核保接口
          api.getAppAddpolicy(args)
            .then(
              response => {
                var data = response;
                that.loadingShow = false;
                if (data.code == 1) {
                  var Pid = data.data;
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
                  Toast(data.message);
                }
              },
              err => {
                that.loadingShow = false;
                Toast(err.message);
              }
            )
            .catch(error => {
              that.loadingShow = false;
              Toast(err.message);
            });
        }
      }
    },
    // 投保人 输入身份证号
    getMoreInfoHolder() {
      if (
        $("#holderCertificateType").val() == "身份证" ||
        $("#holderCertificateType").val() == undefined
      ) {
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
    },
    // 三級联动
    confirm(val) {
      if (val[2] == undefined) {
        $("input[citySelect=" + "citySelect]").val(
          val[0].name + " " + val[1].name
        );
      } else {
        $("input[citySelect=" + "citySelect]").val(
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
    // pdf本地预览
    showFile(url) {
      event.stopPropagation();
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
//scoped
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
.AnLianOccupation {
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
</style>