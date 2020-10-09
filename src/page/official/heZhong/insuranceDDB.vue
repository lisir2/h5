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
                    <li v-for="item in holderList" :key="item.id" :parentName="item.colcode">
                        <span class="list_01">{{item.colname}}</span>
                        <span class="list_02">
                            <div v-if="item.colcode === 'holderName'">
                                <input type="text" :name="item.colcode" :placeholder="item.value" :ref="item.colcode" @change="changeHolderName()">
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
                                <input type="text" placeholder="请选择证件类型" @select="TypeSelect_holder" @click="typeShow_holder=true" id="holderCertificateType" :name="item.colcode" readonly :ref="item.colcode">
                                <van-icon name="arrow"/>
                            </div>
                            <div v-else-if="item.colcode === 'CertType'">
                                <van-action-sheet
                                v-model="validityCertificate_show_holder"
                                :actions="item.value"
                                cancel-text="取消"
                                @select="validityCertificate_holder"
                                title="请证件有效期"
                                />
                                <input type="text" placeholder="请选择证件有效期" @click="validityCertificate_show_holder=true"  :class="item.colcode" :name="item.colcode" readonly>
                                <van-icon name="arrow"/>
                            </div>
                            <!-- 投保人证件有效日期 -->
                            <div v-else-if="item.colcode === 'CertStartdate' || item.colcode === 'CertValidate'">
                                <input type="text" :name="item.colcode" :placeholder="item.value" :class="item.colcode" @click="dateTimeType($event)" readonly>
                                <van-icon name="arrow"/>
                            </div>
                            <div v-else-if="item.colcode === 'holderCertificateNo'">
                                <input type="text" :name="item.colcode" class="holderCertificateNo" placeholder="请填写投保人证件号码" @keyup="getMoreInfoHolder" maxlength="18" :ref="item.colcode">
                            </div>
                            <div v-else-if="item.colcode === 'holderBirth'">
                                <input type="text" placeholder="请选择出生日期" id="holderBirth" :name="item.colcode" readonly :ref="item.colcode" @click="HolderDateTimeShow = true">
                                <van-icon name="arrow"/>
                            </div>                                              
                            <div v-else-if="item.colcode === 'holderMailbox'">
                                <input type="text" placeholder="请填写邮箱号码" :name="item.colcode" :ref="item.colcode">
                            </div>
                            <!-- 投保人省市区地址 -->
                            <div v-else-if="item.colcode === 'holderAddress'">
                                <input type="text" :name="item.colcode" :placeholder="item.value" :ref="item.colcode">
                            </div>
                            <!-- 职业 -->
                            <div v-else-if="item.colcode === 'workTypeCode'">
                                <input type="text" :placeholder="item.value" :name="item.colcode" :ref="'holderWorkTypeCode'" @click="showProfession = true;selectWorkTypeCodeDom = $refs.holderWorkTypeCode" :class="item.colcode" readonly>
                                <van-icon name="arrow"/>
                            </div>
                            <!-- 年收入 -->
                            <div v-else-if="item.colcode === 'annualIncome'">
                                <input type="number" :placeholder="item.value" :name="item.colcode" :class="item.colcode" :ref="'annualIncome'">万
                            </div>
                            <!-- 省市区 -->
                            <div v-else-if="item.colcode === 'holderCity'">
                                <input type="text" :placeholder="item.value" :name="item.colcode" :ref="item.colcode" @click="showProvinces = true;selectProvincesDom = $refs.holderCity" readonly>
                                <van-icon name="arrow"/>
                            </div>
                            <div v-else>
                                <input type="text" :name="item.colcode" :placeholder="item.value" :class="item.colcode" :ref="item.colcode">
                            </div>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- 被保险人信息 -->
        <div class="inserdPolicy" >
          <!-- index下标小于1的话,该产品没有被保险人 -->
          <p class="policyTitle" v-if="inserdList.length > 0">
              <van-icon :name="titleIcon5" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
              <span>被保险人信息</span>
          </p>
          <ul>
              <li v-for="(item,index) in inserdList" :key="index" :parentName="item.colcode">
                  <span class="list_01">{{item.colname}}</span>
                  <span class="list_02">
                      <!-- 被保险人姓名 -->
                      <div v-if="item.colcode === 'insuredName'">
                          <input type="text" :name="item.colcode" placeholder="请填写被保险人姓名" class="insuredName" :ref="item.colcode">
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
                          <!-- v-model 控制显示可隐藏 -->
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
                          <input type="text" :name="item.colcode" class="insuredCertificateNo" placeholder="请填写被保险人证件号码" @keyup="getMoreInfoInserd" maxlength="18" :ref="item.colcode">
                      </div>
                      <!-- 被保险人出生日期 -->
                      <div v-else-if="item.colcode === 'insuredBirth'">
                          <input type="text" placeholder="请选择出生日期" class="insuredBirth" id="insuredBirth" :name="item.colcode" readonly :ref="item.colcode" @click="InsuredDateTimeShow = true">
                          <van-icon name="arrow"/>
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
                      <!-- 被保人证件有效期 -->
                      <div v-else-if="item.colcode === 'CertType'">
                            <van-action-sheet
                            v-model="validityCertificate_show_insured"
                            :actions="item.value"
                            cancel-text="取消"
                            @select="validityCertificate_inserd"
                            title="请证件有效期"
                            />
                            <input type="text" placeholder="请选择证件有效期" @click="validityCertificate_show_insured=true" class="CertType" :name="item.colcode" readonly :ref="item.colcode">
                            <van-icon name="arrow"/>
                      </div>
                       <!-- 被保人证件有效日期 -->
                        <div v-else-if="item.colcode === 'CertStartdate' || item.colcode === 'CertValidate'">
                            <input type="text" :name="item.colcode" :placeholder="item.value" :class="item.colcode" :ref="item.colcode" @click="dateTimeType($event)" readonly>
                            <van-icon name="arrow"/>
                        </div>
                      <div v-else-if="item.colcode === 'workTypeCode'">
                          <input type="text" :placeholder="item.value" :name="item.colcode" :class="item.colcode" :ref="'insuredWorkTypeCode'" @click="showProfession = true;selectWorkTypeCodeDom = $refs.insuredWorkTypeCode" readonly>
                          <van-icon name="arrow"/>
                      </div>
                      <div v-else>
                          <input type="text" :placeholder="item.value" :name="item.colcode" :class="item.colcode" :ref="item.colcode">
                      </div>
                  </span>
              </li>
          </ul>
      </div>
      <!-- 续费缴费信息 -->
      <div class="otherPolicy">
          <p class="policyTitle" v-if="xqjfList.length > 0">
              <van-icon :name="titleIcon1" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
              <span>续费缴费信息</span>
          </p>
          <ul>
              <li v-for="item in xqjfList" :key="item.id">
                  <span class="list_01">{{item.colname}}</span>
                  <span class="list_02">
                      <div v-if="item.colcode === 'signingBank'">
                          <input type="text" :placeholder="item.value" :name="item.colcode" :ref="item.colcode" @click="showProvinces = true;selectProvincesDom = $refs.signingBank" readonly>
                          <van-icon name="arrow"/>
                      </div>
                      <div v-else-if="item.colcode === 'cardholder'">
                          <input type="text" :placeholder="item.value" :name="item.colcode" :class="item.colcode" :ref="item.colcode" readonly>
                      </div>
                      <div v-else-if="item.colcode === 'bankCode'">
                          <input type="text" placeholder="请选择银行" @click="bankPopup=true" id="bankCode" :name="item.colcode" readonly :ref="item.colcode">
                          <van-icon name="arrow"/>
                      </div>
                      <div v-else>
                          <input type="text" :placeholder="item.value" :name="item.colcode" :class="item.colcode" :ref="item.colcode">
                      </div>
                  </span>
              </li>
          </ul>
      </div>

      <!-- 受益人组件 -->
      <BeneficiaryData :syrArr='syrArr'></BeneficiaryData>

      <div class="productStandard">
          <!-- 产品规格 -->
          <p class="policyTitle">
            <van-icon :name="titleIcon6" slot="left" size="18px" style="vertical-align:middle;margin-top:-3px"/>
            <span>产品规格</span>
          </p>
          <ul>
            <div v-for="item in planSpecification['planAttrKeyList']" :key="item.id">
              <li v-if="item.attrName == '保障期限'">
                  <span class="list_01">{{item.attrName}}</span>
                  <span class="list_02">
                      <div>
                          <input type="text" placeholder="请选择保障期限" readonly @click="lengthProtection_show = true" v-model="guaranteePeriod">
                          <van-icon name="arrow"/>
                      </div>
                  </span>
              </li>
              <li v-if="item.attrName == '缴费期限'">
                  <span class="list_01">{{item.attrName}}</span>
                  <span class="list_02">
                      <div>
                          <input type="text" placeholder="请选择缴费期限" readonly @click="PaymentIs_show = true" v-model="paymentPeriod">
                          <van-icon name="arrow"/>
                      </div>
                  </span>
              </li>
              <li v-if="item.attrName == '基本保额'">
                  <span class="list_01">{{item.attrName}}</span>
                  <span class="list_02">
                      <div>
                          <input type="text" placeholder="请选择基本保额" readonly @click="SecurityLines_show = true" v-model="guaranteeLimit">
                          <van-icon name="arrow"/>
                      </div>
                  </span>
              </li>
          </div>
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
        <!-- 常用联系人 -->
        <van-action-sheet title="选择常用联系人" v-model="showContacts" position="bottom" :style="{ height: '100%',borderRadius:'0' }">
            <popupContacts @Contacts="ChildContacts"></popupContacts>
        </van-action-sheet>
        <!-- 证件有效期日期控件 -->
        <van-popup v-model="dateTimeShow" :style="{ width: '80%' }">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                title="选择年月日"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="dateTimeShow = false"
                @confirm="dateTimeConfirm"
                />
        </van-popup>
        <!-- 投保人出生日期控件 -->
        <van-popup v-model="HolderDateTimeShow" :style="{ width: '80%' }">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                title="选择出生日期"
                :min-date="HolderMinDate"
                :max-date="HolderMaxDate"
                @cancel="HolderDateTimeShow = false"
                @confirm="HolderBirthDateSelect"
                />
        </van-popup>
        <!-- 被保人出生日期控件 -->
        <van-popup v-model="InsuredDateTimeShow" :style="{ width: '80%' }">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                title="选择年月日"
                :min-date="InsuredMinDate"
                :max-date="InsuredMaxDate"
                @cancel="InsuredDateTimeShow = false"
                @confirm="InsuredBirthDateSelect"
                />
        </van-popup>
        <!-- 省市区库 -->
        <van-action-sheet v-model="showProvinces" position="bottom" :style="{ height: '100%' }" title="省市区">
            <Provinces :brandId="this.getQueryString('brandId')" :catId="this.getQueryString('catId')" :typeId="this.getQueryString('typeId')"></Provinces>
        </van-action-sheet>   
        <!-- 省市区库 -->
        <van-action-sheet v-model="showProfession" position="bottom" :style="{ height: '100%' }" title="职业分类">
            <Profession :brandId="this.getQueryString('brandId')" :catId="this.getQueryString('catId')" :typeId="this.getQueryString('typeId')"></Profession>   
        </van-action-sheet> 
        <!-- 银行列表 -->
        <van-action-sheet v-model="bankPopup" :lazy-render='false' position="bottom" title="银行列表">
            <bankList :brandId="this.getQueryString('brandId')" :catId="this.getQueryString('catId')" :typeId="this.getQueryString('typeId')"></bankList>   
        </van-action-sheet> 
        <!-- 保障期限规格 -->
        <van-action-sheet v-model="lengthProtection_show">
            <van-picker
              title="保障期限"
              show-toolbar
              :columns="lengthProtection_columns"
              @confirm="lengthProtectionConfirm"
              @cancel="lengthProtection_show = false"
            />
        </van-action-sheet> 
        <!-- 缴费期限规格 -->
        <van-action-sheet v-model="PaymentIs_show">
            <van-picker
              title="缴费期限"
              show-toolbar
              :columns="PaymentIs_columns"
              @confirm="PaymentIsConfirm"
              @cancel="PaymentIs_show = false"
            />
        </van-action-sheet> 
         <!-- 基本保额规格 -->
        <van-action-sheet v-model="SecurityLines_show">
            <van-picker
              title="基本保额"
              show-toolbar
              :columns="SecurityLines_columns"
              :default-index="SecurityLines_columns.forEach((ele,index)=>{ele.text == guaranteeLimit ? index : 0})"
              @confirm="SecurityLinesConfirm"
              @cancel="SecurityLines_show = false"
            />
        </van-action-sheet>
        {{SecurityLines_columns.forEach((ele,index)=>{ele.text == guaranteeLimit ? index : 0})}}
        <!-- 签约银行卡 -->
        <van-popup v-model="WhetherBindBankCard_show" class="SignatureBankCard" closeable :style="{width:'80%',padding: '0 20px 20px'}">
          <van-nav-bar title="绑卡扣款" :style="{marginBottom:'20px'}"/>
          <van-field
              v-model="verificationCode"
              center
              clearable
              placeholder="请输入短信验证码"
            >
              <template #button>
                <van-button
                  size="small"
                  type="primary"
                  v-bind:disabled="sendAuthCode"
                  :style="{background: '#f99a31',border:0,borderRadius:'20px',height:'27px'}"
                  @click="sendAuthCode ? '' : getCode()"
                >{{auth_time}}</van-button>
              </template>
            </van-field>
            <van-button type="primary" round color="#f99a31" :style="{marginTop:'20px'}" size="large" @click="signingConfirm">登录</van-button>
        </van-popup>
    </div>
</div>
</template>

<script>
import Vue from "vue";
import api from "@/fetch/api";
import $ from "jquery";
// 多个受益人
import BeneficiaryData from "@/components/base/BeneficiaryData";
import { isIdCard, isPhoneNumber, isEmail } from "@/util/validate";
// 弹出常用联系人
import popupContacts from '@/components/popupContacts';
// 省市区库
import Provinces from './Provinces';
// 职业分类库
import Profession from './Profession';
// 银行列表
import bankList from './bankList';
export default {
  name: "insuranceDDB",
  components: {
    popupContacts,
    Provinces,
    Profession,
    BeneficiaryData,
    bankList
  },
  data() {
    return {
      titleIcon1: require("../../../assets/images/others/personal1.png"),
      titleIcon2: require("../../../assets/images/others/personal2.png"),
      titleIcon3: require("../../../assets/images/others/personal3.png"),
      titleIcon4: require("../../../assets/images/others/personal4.png"),
      titleIcon5: require("../../../assets/images/others/personal5.png"),
      titleIcon6: require("../../../assets/images/others/personal6.png"),
      planSpecification:'', // 计划对应的规格值
      showPage:true, // 骨架屏显示
      loadingShow: false, //加载动画是否显示
      holderList: "", //投保人配置信息(需要让用户填写的信息)
      inserdList: "", //存放单个被保险人基本配置信息
      insuredCertificateType: false, //被保险人证件类型控件显示隐藏
      insuredRelationship: false, //与投保人关系控件显示隐藏
      typeShow_holder: false, //投保人证件类型是否显示
      typeActions_holder: "", //投保人证件类型JSON数据   例如:{name:年龄,value:'18'}
      validityCertificate_show_holder:false,  //投保人证件有效期
      validityCertificate_show_insured: false, //被保人证件有效期
      xqjfList: "", // 续期缴费信息
      planId: this.getQueryString("planId"), //计划id
      totalPrice: "",  //总价（单价*人数*产品个数）
      onePrice: this.getQueryString("priceResult"), //单件产品价格
      totalVal: "1", //产品个数
      productId: this.getQueryString("productId"), //产品id
      goodName: "", //产品名称
      inserdNum: 1, //投保人个数
      productNum: 1, //产品上线个数
      insuredNum: 0, //被保险人上线个数
      minPolicyDate: 1, //最小起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
      maxPolicyDate: 1, //最大起保投保日期为当前时间的几天后。 默认为1，如果后台没有配置不会报错
      showContacts:false, //常用联系人弹窗是否显示
      person:'', //选择常用联系人的是投保人，还是被保险人
      dateTimeShow:false,  //证件有效日期控件显示、隐藏
      minDate: new Date(new Date().setFullYear((new Date().getFullYear() - 100))),  // 证件有效日期控件最小范围
      maxDate: new Date(new Date().setFullYear((new Date().getFullYear() + 100))), // 证件有效日期控件最大范围
      currentDate: new Date(), // 证件有效日期控件当前选择默认时间
      activityDateTimeDom: '', //当前选中的证件有效日期DOM
      HolderDateTimeShow: false, //投保人出生日期控件显示、隐藏
      HolderMinDate:'', //投保人出生日期最小范围
      HolderMaxDate:'', //投保人出生日期最大范围
      HolderCurrentDate: '', // 投保人出生日期当前选择默认时间
      InsuredDateTimeShow: false, //被保人出生日期控件显示、隐藏
      InsuredMinDate:'', //被保人出生日期最小范围
      InsuredMaxDate:'', //被保人出生日期最大范围
      InsuredCurrentDate: '', // 被保人出生日期当前选择默认时间
      showProvinces: false, //省市区库显示隐藏
      selectProvincesDom: '', //当前选中（投保人或被保人）省市区DOM，用于选择省市区之后回调赋值
      showProfession: false, //职业分类库显示隐藏
      selectWorkTypeCodeDomDom:'', //当前选中（投保人或被保人）职业DOM，用于选择职业之后回调赋值
      bankPopup:false, // 银行名称弹出框是否显示
      syrArr:[], //受益人数组
      lengthProtection_show: false, //保障期限规格展示
      lengthProtection_columns:[], //保障期限绑定数据
      lengthProtection_columns_all:[], //保障期限绑定全部数据
      PaymentIs_show:false, //缴费期限规格展示
      PaymentIs_columns:[], //缴费期限绑定数据
      PaymentIs_columns_all:[], //缴费期限全部数据
      SecurityLines_show:false, //基本保额规格展示
      SecurityLines_columns:[], //基本保额绑定数据
      SecurityLines_columns_all:[], //基本保额全部数据
      guaranteePeriod:'',  // 当前选择保障期限
      guaranteeLimit:'',  // 当前选择基本保额
      paymentPeriod:'', // 当前选择缴费期限
      calculatePrice: '', // 试算价格
      WhetherBindBankCard_show: false, // 签约银行卡展示
      verificationCode: '', // 验证码
      sendAuthCode: false, // 是否可获取验证码
      auth_time: "获取验证码", // 验证码倒计时
      orderId: '', // 核保成功，生成订单id
    };
  },
  mounted() {
    this.changePrice(); //价格试算
    var laydate = layui.laydate;
    var that = this;
    // 投保人配置信息
    var holderArr = [];
    // 被保险人配置信息
    var inserdArr = [];
    // 其他配置信息
    var xqjfArr = [];

    // 根据产品id 获取产品名称
    var args = this.sign({ productId: this.productId,planId:this.planId });
    // 获取单个投保人、被保险人、其他 信息
    api.getSetPolicy(args).then(res => {
      that.showPage = false;
      that.$nextTick(()=>{
        // 产品名称
        that.goodName = res.data.policyParams.goodName;
        // 最大起保日期
        that.maxPolicyDate = res.data.policyParams.goodSlowestEffectiveTime;
        // 最小起保日期
        that.minPolicyDate = res.data.policyParams.goodFastestEffectiveTime;
        // 获取产品详情根据计划id，获取最大产品个数
        that.productNum = res.data.policyParams.insuredPortion;
        
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
          } else if (ele.classcode == "xqjf_info") {
            try {
              ele.value = eval(ele.value);
            } catch (error) {}
            xqjfArr.push(ele);
          } else if (ele.classcode == "bbr_num") {
            try {
              ele.value = eval(ele.value);
            } catch (error) {}
            that.insuredNum = ele.value;
          } else if (ele.classcode == "syr_info") {
            try {
              ele.value = eval(ele.value);
            } catch (error) {}
            that.syrArr.push(ele);
          }
        });
         // 取出 投保人信息数据
        that.holderList = holderArr;
        // 取出 被保人信息
        that.inserdList = inserdArr;
        // 取出续期缴费 配置信息
        that.xqjfList = xqjfArr;

        // 绑定日期选择器
        that.$nextTick(function() {
          // 渲染起保日期 日历
          layui.use(['laydate','form'],function(){
              var laydate = layui.laydate;
              var form = layui.form;
              var time = new Date().setDate(new Date().getDate()+Number(that.minPolicyDate));
              // 起保时间
              laydate.render({
                  elem: "#time",
                  type : 'date',
                  format : 'yyyy-MM-dd',
                  min:+Number(that.minPolicyDate), //起保日期
                  max:+Number(that.maxPolicyDate),
                  value:that.timestampToTime(time,true),
                  done:value => {
                      $('#time').val(value);
                  }
              }); 
              form.render();
          })
        });
      })
    });

    // 获取保存规格
    var params = this.sign({
      id:this.getQueryString('SaveSpecification')
    });
    // 获取保存规格值
    api.orderMiddlePolicySelect(params).then(res=>{
      that.guaranteePeriod = res.guaranteePeriod;
      that.guaranteeLimit = res.guaranteeLimit;
      that.paymentPeriod = res.paymentPeriod;
    });

    // 获取产品详情
    var productParams = this.sign({ productId: this.productId, planId: "" });
    api.getDetail(productParams).then(res => {
      if(res.code == 20000){
        res.data.prodPlanList.forEach(ele=>{
          if(ele.id == that.planId){
            that.planSpecification = ele;
            // 过滤需要的规格
            that.planSpecification.planAttrKeyList.forEach(element => {
              if(element.attrName == "保障期限"){
                that.lengthProtection_columns = that.specification_To_VanPickerColumns(element);
                that.lengthProtection_columns_all = that.specification_To_VanPickerColumns(element);
                console.log(that.lengthProtection_columns)
              }else if(element.attrName == "缴费期限"){
                that.PaymentIs_columns = that.specification_To_VanPickerColumns(element);
                that.PaymentIs_columns_all = that.specification_To_VanPickerColumns(element);
                // 根据选中的缴费期限，限制投保人年龄范围
                that.PaymentIs_columns_all.forEach(ele=>{
                  if(that.paymentPeriod == ele.text){
                    this.HolderMinDate = new Date(new Date().setFullYear((new Date().getFullYear() - ele.maxRange))); //被保人出生日期最小范围
                    this.HolderMaxDate = new Date(new Date().setFullYear((new Date().getFullYear() - ele.minRange))); //被保人出生日期最大范围
                  }
                });
              }else if(element.attrName == "基本保额"){
                that.SecurityLines_columns = that.specification_To_VanPickerColumns(element);
                that.SecurityLines_columns_all = that.specification_To_VanPickerColumns(element);
                // 根据选中的基本保额，限制被保人年龄范围
                that.SecurityLines_columns_all.forEach(ele=>{
                  if(that.guaranteeLimit == ele.text){
                    this.InsuredMinDate = new Date(new Date().setFullYear((new Date().getFullYear() - ele.insuredMaxRange))); //被保人出生日期最小范围
                    this.InsuredMaxDate = new Date(new Date().setFullYear((new Date().getFullYear() - ele.insuredMinRange))); //被保人出生日期最大范围
                  }
                });
              }
            });
          }
        });
      }else{
        that.Toast(res.message);
      }
      console.log(res);
    });
  },
  methods: {
    // 选择常用联系人
    ChildContacts(res){
      this.showContacts = false;
      // 调用公共常用联系人回调
      if(this.person == "tbr"){
        this.Utils.SelectContacts(res, this.person, 0,'',this.changeHolderName);
      }else{
        this.Utils.SelectContacts(res, this.person, 0);
      }
    },
    // 常用联系人
    contacts(person){
        // 显示常用联系人弹窗
        this.showContacts = true;
        // 选择的是投保人 还是被保险人
        this.person = person;
    },
    //投保人区域
    //投保人证件有效期选择回调
    validityCertificate_holder(item){
        $('.holderPolicy .CertType').val(item.value);
        this.validityCertificate_show_holder = false;
        if(item.value == "长期有效"){
          $('.holderPolicy li[parentName="CertStartdate"]').hide();
          $('.holderPolicy li[parentName="CertValidate"]').hide();
        }else if(item.value == "短期有效"){
          $('.holderPolicy li[parentName="CertStartdate"]').show();
          $('.holderPolicy li[parentName="CertValidate"]').show();
        }
    },
    // 投保人省市区选择回调
    selectProvinces(code,value){
        this.showProvinces = false;
        this.selectProvincesDom[0].value = value;
        this.selectProvincesDom[0].setAttribute('code',code.split(' ')[2]);
    },
    // 职业分类选择回调
    selectProfession(code,value){
        this.showProfession = false;
        this.selectWorkTypeCodeDom[0].value = code;
        this.selectWorkTypeCodeDom[0].setAttribute('code',value);
    },
    // 银行选择回调
    SelectBank(name,code){
      console.log(name,code)
      this.bankPopup = false;
      this.$refs.bankCode[0].value = name;
      this.$refs.bankCode[0].setAttribute('code',code);
    },
    // 选择日期类型
    dateTimeType(event){
        this.dateTimeShow = true;
        this.activityDateTimeDom = $(event.target);
        if($(event.target).val() != ''){
            this.currentDate = new Date($(event.target).val());
        }
    },
    // 证件有效期日期选择回调
    dateTimeConfirm(date){
        this.dateTimeShow = false;
        this.activityDateTimeDom.val(this.timestampToTime(date,true));
    },
    //投保人证件类型选择回调
    TypeSelect_holder(item) {
      this.typeShow_holder = false;
      this.$refs.holderCertificateType[0].value = item.value;
      // 判断身份证回调类型为身份证的时候，性别锁死
      this.Utils.CertificateTypeLockSex(item.value,$(".holderSex"),this.getMoreInfoHolder());
    },
    //被保人证件有效期选择回调
    validityCertificate_inserd(item){
        $('.inserdPolicy .CertType').val(item.value);
        this.validityCertificate_show_insured = false;
        if(item.value == "长期有效"){
          $('.inserdPolicy li[parentName="CertStartdate"]').hide();
          $('.inserdPolicy li[parentName="CertValidate"]').hide();
        }else if(item.value == "短期有效"){
          $('.inserdPolicy li[parentName="CertStartdate"]').show();
          $('.inserdPolicy li[parentName="CertValidate"]').show();
        }
    },
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
      this.insuredRelationship = !this.insuredRelationship;
    },
    //被保险人与投保人关系类型选择回调
    holderSelect_Relationship(item) {
      this.insuredRelationship = !this.insuredRelationship;
      $("#insuredRelationship").val(item.name);
      //选择本人的回调
      if (item.name == "本人") {
        this.selectOneSelf(item);
        // 被保人身份证锁定性别
        this.Utils.CertificateTypeLockSex($('#insuredCertificateType').val(), $('.insuredSex'));
      }else{
          //不是选择的本人的话，将所有的被保险人信息置为空
          // this.selectOther(item)
      }
    },
    // 被保人选择非本人 清空数据
    selectOther(item){
       $("input[name='insuredName']").val('')
       $("input[name='insuredCertificateType']").val('')
       $("input[name='insuredCertificateNo']").val('')
       $("input[name='insuredBirth']").val('')
       $("input[name='insuredPhone']").val('')
       $(".insuredSex input[title=男]").prop('checked','checked');
       layui.form.render();
    },
    // 被保人选择本人
    selectOneSelf() {
      $("input[name='insuredName']").val($("input[name='holderName']").val());
      $("input[name='insuredCertificateType']").val($("input[name='holderCertificateType']").val());
      $("input[name='insuredCertificateNo']").val($("input[name='holderCertificateNo']").val());
      $("input[name='insuredBirth']").val($("input[name='holderBirth']").val());
      $("input[name='insuredPhone']").val($("input[name='holderPhone']").val());
      if ($('.holderSex input:checked').val() == "男") {
        $(".insuredSex input[title=男]").prop('checked','checked');
      }else {
        $(".insuredSex input[title=女]").prop('checked','checked');
      }
      $(".inserdPolicy .CertType").val($(".holderPolicy .CertType").val());
      console.log($(".holderPolicy .CertType").val());
      if($(".holderPolicy .CertType").val() == "长期有效"){
        $('.inserdPolicy li[parentName="CertStartdate"]').hide();
        $('.inserdPolicy li[parentName="CertValidate"]').hide();
      }else{
        $('.inserdPolicy li[parentName="CertStartdate"]').show();
        $('.inserdPolicy li[parentName="CertValidate"]').show();
        $(".inserdPolicy .CertStartdate").val($(".holderPolicy .CertStartdate").val());
        $(".inserdPolicy .CertValidate").val($(".holderPolicy .CertValidate").val());
      };
      $(".inserdPolicy .workTypeCode").val($(".holderPolicy .workTypeCode").val());
      $(".inserdPolicy .workTypeCode").attr('code',$(".holderPolicy .workTypeCode").attr('code'));
      layui.form.render();
      // 价格试算
      this.PricesTrial();
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
        goodId: this.productId,
        source: "2",
        planId: this.planId,
        policyFee: this.totalPrice,
        safeDate: decodeURI(this.getQueryString("safeDate")),
        activityCode:this.getQueryString('activityCode'),  //活动id
        invitationCode:this.getQueryString('invitationCode'),  //邀请码
        topActivityCode:this.getQueryString('topActivityCode'),  //上级邀请码
        healthNotification:this.getCookie('healthAnswer') ? JSON.parse(this.getCookie('healthAnswer')) : '',
        guaranteeLimit: this.guaranteeLimit,
	      paymentPeriod: this.paymentPeriod,
      };
      //投保人信息
      var holder = {
        "personnelType": "0",
      }; 
      //被保险人信息
      var inserdAllList = []; 
      // 投保人elseJson
      var holderElseJson = {
        "mildExemptionPrice": this.calculatePrice.mildExemptionPrice,
        "mainRiskPrice": this.calculatePrice.mainRiskPrice,
        "policyHolderExemptionPrice": this.calculatePrice.policyHolderExemptionPrice,
        "totalPrice": this.calculatePrice.totalPrice,
        "jobCode": $(".holderPolicy").find($("input[name=workTypeCode]")).attr('code'),
        "annualIncome": $(".holderPolicy").find($("input[name=annualIncome]")).val()  //年收入
      }; // 投保人elseJson
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
        } else if (ele.colcode == "CertValidate"){
          if($(".holderPolicy").find($("input[name=CertType]")).val() == "长期有效"){
            holder[ele.colcode] =  '9999-09-09';
          }else{
            holder[ele.colcode] = $(".holderPolicy")
              .find($("input[name=" + ele.colcode + "]"))
              .val();
          }
        } else if (ele.colcode == "CertStartdate"){
          if($(".holderPolicy").find($("input[name=CertType]")).val() == "长期有效"){
            holder[ele.colcode] =  '';
          }else{
            holder[ele.colcode] = $(".holderPolicy")
              .find($("input[name=" + ele.colcode + "]"))
              .val();
          }
        } else if (ele.colcode == "holderAddress"){
          holder[ele.colcode] = $('[name="holderCity"]').val() + ' ' + $('[name="' + ele.colcode + '"]').val();
        } else if (ele.colcode == "workTypeCode" || ele.colcode == "annualIncome" || ele.colcode == "holderCity"){
          // 投保人职业 和 年收入 放到投保人的 elseJson 里面,holderCity 和 holderAddress 拼接一起传
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
            .find($("input[name=insuredCertificateType]"))
            .val();
        } else if (ele.colcode == "CertValidate"){
          if($(".inserdPolicy").find($("input[name=CertType]")).val() == "长期有效"){
            inserdList[ele.colcode] =  '9999-09-09';
          }else{
            inserdList[ele.colcode] = $(".inserdPolicy")
              .find($("input[name=" + ele.colcode + "]"))
              .val();
          }
        } else if (ele.colcode == "CertStartdate"){
          if($(".inserdPolicy").find($("input[name=CertType]")).val() == "长期有效"){
            inserdList[ele.colcode] =  '';
          }else{
            inserdList[ele.colcode] = $(".inserdPolicy")
              .find($("input[name=" + ele.colcode + "]"))
              .val();
          }
        } else if (ele.colcode == "workTypeCode"){
            inserdList[ele.colcode] = $(".inserdPolicy")
              .find($("input[name=" + ele.colcode + "]")).attr('code');
        } else {
          if (ele.colcode != undefined) {
            inserdList[ele.colcode] = $(".inserdPolicy")
              .find($("input[name=" + ele.colcode + "]"))
              .val();
          }
        }
      });

      // 获取续费缴费信息 放到合并到投保人里面
      var xqjfList = {};
      $.each(that.xqjfList, function(index, ele) {
        if(ele.colcode == 'cardholder'){
          // 持卡人姓名 cardholder，根据投保人姓名走，不用传给后台
        } else if (ele.colcode == "bankCode" || ele.colcode == "signingBank"){
            xqjfList[ele.colcode] = $(".otherPolicy")
              .find($("input[name=" + ele.colcode + "]"))
              .attr('code');
        } else{
          xqjfList[ele.colcode] = $(".otherPolicy")
          .find($("input[name=" + ele.colcode + "]"))
          .val();
        }
        
      });

      //获取全部的受益人信息
     let BeneficiaryData = [];   //BeneficiaryInput
      $.each($(".BeneficiaryInput"), function(index, ele) {
        let beneficiary = {};//每一个受益人信息
        beneficiary.beneficiaryRelationship  = $('#beneficiaryRelationship'+index).val();
        beneficiary.beneficiaryName = $('#beneficiaryName'+index).val();
        beneficiary.beneficiaryCertificateType = $('#beneficiaryCertificateType'+index).val();
        beneficiary.beneficiaryCertificateNo = $('#beneficiaryCertificateNo'+index).val();
        beneficiary.beneficiaryRate = $('#beneficiaryRate'+index).val() / 100;
        beneficiary.beneficiaryTelphone = $('#beneficiaryTelphone'+index).val();
        beneficiary.beneficiaryCertificateStartdate = $('#beneficiaryCertType'+index).val() == "短期有效" ? $('#beneficiaryCertificateStartdate'+index).val() : '';
        beneficiary.beneficiaryCertificateValidate = $('#beneficiaryCertType'+index).val() == "短期有效" ? $('#beneficiaryCertificateValidate'+index).val() : '9999-09-09';
        beneficiary.certType = $('#beneficiaryCertType'+index).val();
        BeneficiaryData.push(beneficiary);
      });

      // 续费缴费信息 合并到 投保人信息中
      Object.assign(holder,xqjfList);
      holder.elseJson = holderElseJson;
      inserdAllList.push(inserdList);
      data.holder = holder;
      data.inserd = inserdAllList;
      data.beneficiary = BeneficiaryData;
      console.log(data);

      //==================================================  校验户填写信息  =================================================

      // 投保人信息校验
      var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/; //验证姓名正则
      if ($("#time").val() == "") {
        this.Toast("请选择起保时间");
      } else if (!reg.test(data.holder.holderName)) {
        this.Toast("投保人姓名不正确");
      } else if (data.holder.holderCertificateType == "") {
        this.Toast("请选择投保人证件类型");
      } else if (data.holder.holderCertificateNo == "") {
        this.Toast("请填写投保人证件号码");
      } else if (
        data.holder.holderCertificateType == "身份证" &&
        isIdCard(data.holder.holderCertificateNo) == false
      ) {
        this.Toast("投保人身份证号码不正确");
      } else if (data.holder.holderBirth == "") {
        this.Toast("请选择投保人出生日期");
        // 被保险人信息校验
      } else if (
        data.holder.holderPhone == "" ||
        isPhoneNumber(data.holder.holderPhone) == false
      ) {
        this.Toast("投保人电话不正确");
      } else if(data.holder.CertType == ''){
        this.Toast("请选择投保人证件有效期");
      } else if(data.holder.CertType == '短期有效' && data.holder.CertStartdate == ''){
        this.Toast("请选择投保人证件有效期起");
      } else if(data.holder.CertType == '短期有效' && data.holder.CertValidate == ''){
        this.Toast("请选择投保人证件有效期止");
      } else if (
        data.holder.holderMailbox == "" ||
        isEmail($("input[name=holderMailbox]").val()) == false
      ) {
        this.Toast("投保人邮箱不正确");
      } else if (
        data.holder.annualIncome == "") {
        this.Toast("请输入年收入");
      } else if (
        data.holder.holderAddress == "") {
        this.Toast("请选择投保人省市区");
      } else if (
        data.holder.workTypeCode == "") {
        this.Toast("请选择投保人职业");
      } else {
        var Status = true;
        for (var i = 0; i < data.inserd.length; i++) {
          if(data.inserd[i].insuredRelationship == ""){
            this.Toast("请选择与投保人关系");
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
          } else if (data.inserd[i].insuredCertificateNo == "") {
            this.Toast("请输入被保险人证件号码");
            Status = false;
          } else if (data.inserd[i].CertType == "") {
            this.Toast("请选择证件有效期");
            Status = false;
          } else if (data.inserd[i].CertType == "短期有效" && data.inserd[i].CertStartdate == '') {
            this.Toast("请选择被保人证件有效期起");
            Status = false;
          } else if (data.inserd[i].CertType == "短期有效" && data.inserd[i].CertValidate == '') {
            this.Toast("请选择被保人证件有效期止");
            Status = false;
          } else if (data.inserd[i].insuredBirth == "") {
            this.Toast("请输入被保险人出生日期");
            Status = false;
          } else if (
            data.inserd[i].insuredPhone == "" ||
            (data.inserd[i].insuredPhone ? isPhoneNumber(data.inserd[i].insuredPhone) == false : false)
          ) {
            this.Toast("被保险人手机号码不正确");
            Status = false;
          } else if(data.inserd[i].workTypeCode == ''){
            this.Toast("请选择被保人职业类型");
            Status = false;
          }
        };

        // 被保人信息校验完毕
        if(Status == true){
          // 续费缴费信息校验
          if(data.holder.cardholder == ''){
            Status = false;
            this.Toast("请输入持卡人姓名");
          } else if(data.holder.signingPhone == '' || (data.holder.signingPhone ? isPhoneNumber(data.holder.signingPhone) == false : false)){
            Status = false;
            this.Toast("持卡人手机号码不正确");
          } else if(data.holder.bankCode == ''){
            Status = false;
            this.Toast("请选择银行名称");
          } else if(data.holder.signingBank == ''){
            Status = false;
            this.Toast("请选择开户行所在地");
          } else if(data.holder.accountNo == ''){
            Status = false;
            this.Toast("请输入银行账号");
          }

          // 续费缴费信息校验完毕
          if(Status == true){
            // 校验受益人信息
            if($('#BeneficiaryTye').val() == '指定受益人'){
              // 受益人比例
              var beneficiaryRate = 0;
              data.beneficiary.forEach((ele,index)=>{
                beneficiaryRate += Number(ele.beneficiaryRate);
                if(ele.beneficiaryRelationship == ''){
                  this.Toast("请选择受益人关系");
                } else if(ele.beneficiaryName == ''){
                  this.Toast("请输入受益人姓名");
                } else if(ele.beneficiaryCertificateType == ''){
                  this.Toast("请选择受益人证件类型");
                } else if(ele.beneficiaryCertificateNo == ''){
                  this.Toast("请输入受益人证件号码");
                }else if(ele.beneficiaryCertificateType == "身份证" && isIdCard(ele.beneficiaryCertificateNo) == false){
                  this.Toast("受益人证件号码不正确");
                } else if(ele.beneficiaryCertType == ''){
                  this.Toast("请选择受益人证件有效期");
                } else if(ele.beneficiaryCertType == '短期有效' && ele.beneficiaryCertificateStartdate == ''){
                  this.Toast("请选择受益人证件有效期开始时间");
                } else if(ele.beneficiaryCertType == '短期有效' && ele.beneficiaryCertificateValidate == ''){
                  this.Toast("请选择受益人证件有效期截止时间");
                } else if(ele.beneficiaryTelphone == '' || (ele.beneficiaryTelphone ? isPhoneNumber(ele.beneficiaryTelphone) == false : false)){
                  this.Toast("请输入受益人手机号码");
                } else if(ele.beneficiaryRate == ''){
                  this.Toast("请输入受益人比例");
                } else if((index+1) == data.beneficiary.length){
                  // 最后一个受益人
                  if(beneficiaryRate != 1){
                    this.Toast("受益人比例总和为100%");
                  }else{
                    // 核保
                    this.underwritingInterface(data);
                  }
                }
              })
            }else{
              this.underwritingInterface(data);
            }
          }
        }
      }
    },
    // 核保接口
    underwritingInterface(data){
      var that = this;
      var args = that.sign(data);
      that.loadingShow = true;
      api.getAppAddpolicy(args).then(
          response => {
            let data = response; //上线删除.data
            that.loadingShow = false;
            if (data.code == 1) {
              that.orderId = data.data;
              // 判断是否绑定银行卡
              that.WhetherBindBankCard(that.orderId,function(){
                that.$router.push({
                  path: "/DDBPreview",
                  query: {
                    id: that.orderId,
                    productId: that.productId,
                    planId: that.planId
                  }
                });
              });
            } else {
              that.loadingShow = false;
              this.Toast(data.message);
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
    // 判断是否绑定银行卡
    WhetherBindBankCard(orderId,callBack){
      api.signingQuery(this.sign({orderId})).then(res=>{
        if(res.code == 0){
          // 需要签约，获取验证码签约银行卡
          this.getCode(()=>{
            this.WhetherBindBankCard_show = true;
          });
          console.log('需要签约');
        }else{
          callBack();
        }
      })
    },
    // 获取签约手机号验证码
    getCode(callback) {
        // 判断是否签约银行卡
        var params = this.sign({"orderId": this.orderId});
        api.signingApply(params).then(res=>{
          if(res.code == -1){
            if(res.message.includes('无需签约')){
              this.$router.push({
                path: "/DDBPreview",
                query: {
                  id: this.orderId,
                  productId: this.productId,
                  planId: this.planId
                }
              });
            }else{
              this.Toast.fail(res.message);
            }
          }else if(res.code == 1){
            // 执行回调
            if(callback){
              callback();
            }
            // 短信倒计时
            this.sendAuthCode = true;
            this.auth_time = 60;
            var auth_timetimer = setInterval(() => {
              this.auth_time--;
              if (this.auth_time <= 0) {
                this.sendAuthCode = false;
                clearInterval(auth_timetimer);
                this.auth_time = "获取验证码";
              }
            }, 1000);
          }
        });
    },
    // 签约银行卡校验手机验证码
    signingConfirm(){
       var params = this.sign({"orderId": this.orderId,'code': this.verificationCode});
        api.signingConfirm(params).then(res=>{
          if(res.code == 1){
            this.$dialog.alert({
              title: '提示',
              message: res.message,
            }).then(() => {
              this.$router.push({
                path: "/DDBPreview",
                query: {
                  id: this.orderId,
                  productId: this.productId,
                  planId: this.planId
                }
              });
            });
          }else{
            this.Toast.fail(res.message);
          }
        })
    },
    // 投保人 输入身份证号
    getMoreInfoHolder() {
      this.PricesTrial();
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
            $(".holderSex input[value=男]").prop('checked','checked');
            layui.form.render();
          } else {
            $(".holderSex input[value=女]").prop('checked','checked');
            layui.form.render();
          }
        } else {
          //    alert('身份证非18位证件号码')
        }
      }
    },
    // 被保险人 输入身份证号
    getMoreInfoInserd() {
      this.PricesTrial();
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
              .prop('checked','checked');
          } else {
            $(".insuredSex")
              .find("input[title=男]")
              .prop('checked','checked');
          }
          layui.form.render();
        } else {
          //    alert('身份证非18位证件号码')
        }
      }
    },
    // 规格转 vant Picker 选择器的Columns数据格式
    specification_To_VanPickerColumns(element){
        return element.planAttrValList.map(function(temp){
          return {
            text:temp['attrValue'],
            id:temp['id'] == null ? '' : temp['id'],
            insuredMaxRange:temp['insuredMaxRange'] == null ? '' : temp['insuredMaxRange'],
            insuredMinRange:temp['insuredMinRange'] == null ? '' : temp['insuredMinRange'],
            isEnable:temp['isEnable'] == null ? '' : temp['isEnable'],
            maxRange:temp['maxRange'] == null ? '' : temp['maxRange'],
            mildExemption:temp['mildExemption'] == null ? '' : temp['mildExemption'],
            minRange:temp['minRange'] == null ? '' : temp['minRange'],
            paymentPeriod:temp['paymentPeriod'] == null ? '' : temp['paymentPeriod'],
            policyHolderExemption:temp['policyHolderExemption'] == null ? '' : temp['policyHolderExemption'],
            relationship:temp['relationship'] == null ? '' : temp['relationship'],
          }
        })
    },
    // 保障期限选择回调
    lengthProtectionConfirm(data){
      this.lengthProtection_show = false;
      this.guaranteePeriod = data.text;
      this.PricesTrial();
    },
    // 缴费期限选择回调
    PaymentIsConfirm(data){
      this.PaymentIs_show = false;
      this.paymentPeriod = data.text;
      // 根据选中的缴费期限，限制投保人年龄范围
      this.PaymentIs_columns_all.forEach(ele=>{
        if(this.paymentPeriod == ele.text){
          this.HolderMinDate = new Date(new Date().setFullYear((new Date().getFullYear() - ele.maxRange))); //被保人出生日期最小范围
          this.HolderMaxDate = new Date(new Date().setFullYear((new Date().getFullYear() - ele.minRange))); //被保人出生日期最大范围
        }
      });
      console.log(data);
      this.PricesTrial();
    },
    // 基本保额选择回调
    SecurityLinesConfirm(data){
      this.SecurityLines_show = false;
      this.guaranteeLimit = data.text;
      this.SecurityLines_columns_all.forEach(ele=>{
        if(this.guaranteeLimit == ele.text){
          this.InsuredMinDate = new Date(new Date().setFullYear((new Date().getFullYear() - ele.insuredMaxRange))); //被保人出生日期最小范围
          this.InsuredMaxDate = new Date(new Date().setFullYear((new Date().getFullYear() - ele.insuredMinRange))); //被保人出生日期最大范围
        }
      });
      console.log(data);
      this.PricesTrial();
    },
    // 投保人出生日期选择回调
    HolderBirthDateSelect(date){
      $("#holderBirth").val(this.timestampToTime(date,true));
      var age = this.Utils.getFullAge(this.timestampToTime(date,true));
      this.renderDeadlinePayment(age,"holder");
      this.HolderDateTimeShow = false;
    },
    // 被保人出生日期选择回调
    InsuredBirthDateSelect(date){
      $("#insuredBirth").val(this.timestampToTime(date,true));
      var age = this.Utils.getFullAge(this.timestampToTime(date,true));
      this.renderDeadlinePayment(age,"insured");
      this.renderBasicSumInsured(age);
      this.InsuredDateTimeShow = false;
    },
    // 根据关联条件 渲染缴费期限 personType：投保人 或 被保人
    renderDeadlinePayment(age,personType){
      if(personType == 'holder'){
        // 根据投保人年龄渲染缴费期限
        this.PaymentIs_columns = this.PaymentIs_columns_all.filter(ele=>{
          console.log(ele.maxRange,ele.minRange,age)
          return ele.maxRange >= age && ele.minRange <= age;
        });
        
        this.paymentPeriod = this.PaymentIs_columns[0].text;
      }else if (personType == 'insured'){
        // 根据被保人年龄渲染缴费期限
        this.PaymentIs_columns = this.PaymentIs_columns_all.filter(ele=>{
          return ele.insuredMaxRange >= age && ele.insuredMinRange <= age;
        });
        this.paymentPeriod = this.PaymentIs_columns[0].text;
      }
    },
    // 根据关联条件 渲染基本保额
    renderBasicSumInsured(age){
      // 根据被保人年龄渲染基本保额
      this.SecurityLines_columns = this.SecurityLines_columns_all.filter(ele=>{
        return ele.maxRange >= age && ele.minRange <= age;
      });
      this.guaranteeLimit = this.SecurityLines_columns[0].text;
    },
    // 价格试算
    PricesTrial(){
      let holderBirth = $("input[name='holderBirth']").val();
      let holderSex = $(".holderSex").find('input[name="sex"]:checked').val();
      let insuredBirth = $("input[name='insuredBirth']").val();
      let insuredSex = $("div[name=insuredSex]").find('input[name="sex"]:checked').val();
      let insuredRelationship = $("#insuredRelationship").val();

      if(this.guaranteeLimit && this.guaranteePeriod && holderBirth && holderSex && insuredBirth && insuredSex && this.paymentPeriod && this.planId && insuredRelationship){
        this.Toast.loading({
          duration: 0, // 持续展示 toast
          message: '价格试算中...',
          forbidClick: true,
          loadingType: 'spinner',
        });

        var params = this.sign({
          "guaranteeLimit": this.guaranteeLimit,
          "guaranteePeriod": this.guaranteePeriod,
          "holderBirth": holderBirth,
          "holderSex": holderSex,
          "insuredBirth": insuredBirth,
          "insuredSex": insuredSex,
          "paymentPeriod": this.paymentPeriod,
          "planId": this.planId,
          "policyHolderExemption": '不投保'
        });

        api.longTermInsurancePriceCalculation(params).then(res=>{
          if(res.code == 20000){
            this.Toast.clear();
            this.calculatePrice = res.data;
            this.totalPrice = res.data.totalPrice;
          }else{
            this.Toast(res.message);
          }
        });
      }
    },
    // 修改投保人姓名,持卡人姓名跟着联动（这里因为使用常用联系人模板所以不使用 v-module绑定）常用联系人使用的是dom赋值
    changeHolderName(){
      $('input[name=cardholder]').val($('input[name=holderName]').val());
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
  .productStandard,
  .startTime,
  .BeneficiaryData {
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
          input[type="number"] {
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
  .productStandard {
    padding-bottom: 100px;
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
  .SignatureBankCard{
    .van-cell {
      border: 2px solid rgba(221, 221, 221, 1);
      border-radius: 50px;
      padding: 18px 32px;
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