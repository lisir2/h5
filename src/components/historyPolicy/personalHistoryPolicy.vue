<template>
  <div class="personal">
    <div class="personalBox">
      <van-tabs
        v-model="activeName"
        sticky
        animated
        @click="onClick"
        @change="onClick"
        swipeable
        title-active-color="#333"
        line-width="0"
      >
        <van-tab title="全部" name="a" title-style>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="20"
            class="van-clearfix"
          >
            <ul class="policylist">
              <li v-for="(item,index) in policy_list" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <!-- <div v-for="(insuranceItem,index) in insuranceCompanyInfo" :key="index">
                    <img
                      v-if="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias"
                      :src="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias ? baseImagePath + insuranceItem.h5ImgUrl : ''"
                      alt
                    />
                  </div>-->
                  <span>{{item.orderStatus == 1 ? '待支付' : (item.orderStatus == 2 ? '即将生效' : (item.orderStatus == 3 ? '已生效' : (item.orderStatus == 4 ? '已关闭' : (item.orderStatus == 5 ? '即将到期' : (item.orderStatus == 6 ? '已到期' : (item.orderStatus == 7 ? '注销' : (item.orderStatus == 8 ? '退保' : (item.orderStatus == -1 ? '删除' : (item.orderStatus == 0 ? '默认' : '')))))))))}}</span>
                </div>
                <p class="goodName">
                  {{item.productName}}
                  <span class="statusName">{{item.statusName}}</span>
                </p>
                <p class="fontColor666">
                  <span>订单号：</span>
                  <span>{{item.oNumber}}</span>
                </p>
                <p class="fontColor666">
                  <span>保障时间：</span>
                  <span>{{item.startTimeName}} 00:00:00 - {{item.endTimeName}} 23:59:59</span>
                </p>
                <p class="fontColor666">
                  <span>被保险人：</span>
                  <span>{{item.insuredName}}</span>
                </p>
                <p>
                  <span>保单金额：{{item.totalFee/100}}元</span>
                  <span>
                    <router-link
                      style="color:#008CFF;"
                      :to="{path: '/personnalpolicyDetail', query: {orderNo:item.oNumber}}"
                    >查看详情</router-link>
                  </span>
                </p>

                <!-- <p>
                  <router-link :to="{path:'productdetail',query:{productId:item.bId}}">
                    <input type="button" value="再次购买" class="againBuy" />
                  </router-link>
                  <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                  <input type="button" value="申请理赔" class="claimBtn">
                </p>-->
              </li>
              <!-- <li>
                            <p>
                                <img :src="companyLogo" alt="">
                                <span>已生效</span>
                            </p>
                            <p>复星联合康乐一生重大疾病保险（B款升级款）条款</p>
                            <p><span>订单号：</span><span>E1000001900546313</span></p>
                            <p><span>保障时间：</span><span>2018-08-09 00时 - 2018-08-08 24时</span></p>
                            <p><span>被保险人：</span><span>张军</span></p>
                            <p><span>共1份，合计：378.00</span><span @click="lookDetail">查看详情</span></p>
                            <p>
                                <input type="button" value="再次购买" class="againBuy">
                                <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                                <input type="button" value="申请理赔" class="claimBtn">
                            </p>
                        </li>
                        <li>
                            <p>
                                <img :src="companyLogo" alt="">
                                <span>即将生效</span>
                            </p>
                            <p>复星联合康乐一生重大疾病保险（B款升级款）条款</p>
                            <p><span>订单号：</span><span>E1000001900546313</span></p>
                            <p><span>保障时间：</span><span>2018-08-09 00时 - 2018-08-08 24时</span></p>
                            <p><span>被保险人：</span><span>张军</span></p>
                            <p><span>共1份，合计：378.00</span><span @click="lookDetail">查看详情</span></p>
                            <p>
                                <input type="button" value="再次购买" class="againBuy">
                                <input type="button" value="评价" class="evaluateBtn">
                                <input type="button" value="申请理赔" class="claimBtn">
                            </p>
              </li>-->
            </ul>
          </van-list>
        </van-tab>
        <van-tab title="即将生效" name="b">
          <van-list
            v-model="loading1"
            :finished="finished1"
            finished-text="没有更多了"
            @load="onLoad1"
            :offset="20"
            class="van-clearfix"
          >
            <ul class="policylist">
              <li v-for="(item,index) in policy_list1" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <!-- <div v-for="(insuranceItem,index) in insuranceCompanyInfo" :key="index">
                    <img
                      v-if="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias"
                      :src="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias ? baseImagePath + insuranceItem.h5ImgUrl : ''"
                      alt
                    />
                  </div>-->
                  <span>{{item.orderStatus == 1 ? '待支付' : (item.orderStatus == 2 ? '即将生效' : (item.orderStatus == 3 ? '已生效' : (item.orderStatus == 4 ? '已关闭' : (item.orderStatus == 5 ? '即将到期' : (item.orderStatus == 6 ? '已到期' : (item.orderStatus == 7 ? '注销' : (item.orderStatus == 8 ? '退保' : (item.orderStatus == -1 ? '删除' : (item.orderStatus == 0 ? '默认' : '')))))))))}}</span>
                </div>
                <p class="goodName">
                  {{item.productName}}
                  <span class="statusName">{{item.statusName}}</span>
                </p>
                <p class="fontColor666">
                  <span>订单号：</span>
                  <span>{{item.oNumber}}</span>
                </p>
                <p class="fontColor666">
                  <span>保障时间：</span>
                  <span>{{item.startTimeName}} 00:00:00 - {{item.endTimeName}} 23:59:59</span>
                </p>
                <p class="fontColor666">
                  <span>被保险人：</span>
                  <span>{{item.insuredName}}</span>
                </p>
                <p>
                  <span>保单金额：{{item.totalFee/100}}元</span>
                  <span>
                    <router-link
                      style="color:#008CFF;"
                      :to="{path: '/personnalpolicyDetail', query: {orderNo:item.oNumber}}"
                    >查看详情</router-link>
                  </span>
                </p>
                <!-- <p>
                  <router-link :to="{path:'productdetail',query:{productId:item.bId}}">
                    <input type="button" value="再次购买" class="againBuy" />
                  </router-link>
                  <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                  <input type="button" value="申请理赔" class="claimBtn">
                </p>-->
              </li>
            </ul>
          </van-list>
        </van-tab>
        <van-tab title="已生效" name="c">
          <van-list
            v-model="loading2"
            :finished="finished2"
            finished-text="没有更多了"
            @load="onLoad2"
            :offset="20"
            class="van-clearfix"
          >
            <ul class="policylist">
              <li v-for="(item,index) in policy_list2" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <!-- <div v-for="(insuranceItem,index) in insuranceCompanyInfo" :key="index">
                    <img
                      v-if="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias"
                      :src="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias ? baseImagePath + insuranceItem.h5ImgUrl : ''"
                      alt
                    />
                  </div>-->
                  <span>{{item.orderStatus == 1 ? '待支付' : (item.orderStatus == 2 ? '即将生效' : (item.orderStatus == 3 ? '已生效' : (item.orderStatus == 4 ? '已关闭' : (item.orderStatus == 5 ? '即将到期' : (item.orderStatus == 6 ? '已到期' : (item.orderStatus == 7 ? '注销' : (item.orderStatus == 8 ? '退保' : (item.orderStatus == -1 ? '删除' : (item.orderStatus == 0 ? '默认' : '')))))))))}}</span>
                </div>
                <p class="goodName">
                  {{item.productName}}
                  <span class="statusName">{{item.statusName}}</span>
                </p>
                <p class="fontColor666">
                  <span>订单号：</span>
                  <span>{{item.oNumber}}</span>
                </p>
                <p class="fontColor666">
                  <span>保障时间：</span>
                  <span>{{item.startTimeName}} 00:00:00 - {{item.endTimeName}} 23:59:59</span>
                </p>
                <p class="fontColor666">
                  <span>被保险人：</span>
                  <span>{{item.insuredName}}</span>
                </p>
                <p>
                  <span>保单金额：{{item.totalFee/100}}元</span>
                  <span>
                    <router-link
                      style="color:#008CFF;"
                      :to="{path: '/personnalpolicyDetail', query: {orderNo:item.oNumber}}"
                    >查看详情</router-link>
                  </span>
                </p>
                <!-- <p>
                  <router-link :to="{path:'productdetail',query:{productId:item.bId}}">
                    <input type="button" value="再次购买" class="againBuy" />
                  </router-link>
                  <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                  <input type="button" value="申请理赔" class="claimBtn">
                </p>-->
              </li>
            </ul>
          </van-list>
        </van-tab>
        <van-tab title="即将到期" name="d">
          <van-list
            v-model="loading3"
            :finished="finished3"
            finished-text="没有更多了"
            @load="onLoad3"
            :offset="20"
            class="van-clearfix"
          >
            <ul class="policylist">
              <li v-for="(item,index) in policy_list3" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <!-- <div v-for="(insuranceItem,index) in insuranceCompanyInfo" :key="index">
                    <img
                      v-if="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias"
                      :src="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias ? baseImagePath + insuranceItem.h5ImgUrl : ''"
                      alt
                    />
                  </div>-->
                  <span>{{item.orderStatus == 1 ? '待支付' : (item.orderStatus == 2 ? '即将生效' : (item.orderStatus == 3 ? '已生效' : (item.orderStatus == 4 ? '已关闭' : (item.orderStatus == 5 ? '即将到期' : (item.orderStatus == 6 ? '已到期' : (item.orderStatus == 7 ? '注销' : (item.orderStatus == 8 ? '退保' : (item.orderStatus == -1 ? '删除' : (item.orderStatus == 0 ? '默认' : '')))))))))}}</span>
                </div>
                <p class="goodName">
                  {{item.productName}}
                  <span class="statusName">{{item.statusName}}</span>
                </p>
                <p class="fontColor666">
                  <span>订单号：</span>
                  <span>{{item.oNumber}}</span>
                </p>
                <p class="fontColor666">
                  <span>保障时间：</span>
                  <span>{{item.startTimeName}} 00:00:00 - {{item.endTimeName}} 23:59:59</span>
                </p>
                <p class="fontColor666">
                  <span>被保险人：</span>
                  <span>{{item.insuredName}}</span>
                </p>
                <p>
                  <span>保单金额：{{item.totalFee/100}}元</span>
                  <span>
                    <router-link
                      style="color:#008CFF;"
                      :to="{path: '/personnalpolicyDetail', query: {orderNo:item.oNumber}}"
                    >查看详情</router-link>
                  </span>
                </p>
                <!-- <p>
                  <router-link :to="{path:'productdetail',query:{productId:item.bId}}">
                    <input type="button" value="再次购买" class="againBuy" />
                  </router-link>
                  <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                  <input type="button" value="申请理赔" class="claimBtn">
                </p>-->
              </li>
            </ul>
          </van-list>
        </van-tab>
        <van-tab title="已到期" name="e">
          <van-list
            v-model="loading4"
            :finished="finished4"
            finished-text="没有更多了"
            @load="onLoad4"
            :offset="20"
            class="van-clearfix"
          >
            <ul class="policylist">
              <li v-for="(item,index) in policy_list4" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <!-- <div v-for="(insuranceItem,index) in insuranceCompanyInfo" :key="index">
                    <img
                      v-if="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias"
                      :src="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias ? baseImagePath + insuranceItem.h5ImgUrl : ''"
                      alt
                    />
                  </div>-->
                  <span>{{item.orderStatus == 1 ? '待支付' : (item.orderStatus == 2 ? '即将生效' : (item.orderStatus == 3 ? '已生效' : (item.orderStatus == 4 ? '已关闭' : (item.orderStatus == 5 ? '即将到期' : (item.orderStatus == 6 ? '已到期' : (item.orderStatus == 7 ? '注销' : (item.orderStatus == 8 ? '退保' : (item.orderStatus == -1 ? '删除' : (item.orderStatus == 0 ? '默认' : '')))))))))}}</span>
                </div>
                <p class="goodName">
                  {{item.productName}}
                  <span class="statusName">{{item.statusName}}</span>
                </p>
                <p class="fontColor666">
                  <span>订单号：</span>
                  <span>{{item.oNumber}}</span>
                </p>
                <p class="fontColor666">
                  <span>保障时间：</span>
                  <span>{{item.startTimeName}} 00:00:00 - {{item.endTimeName}} 23:59:59</span>
                </p>
                <p class="fontColor666">
                  <span>被保险人：</span>
                  <span>{{item.insuredName}}</span>
                </p>
                <p>
                  <span>保单金额：{{item.totalFee/100}}元</span>
                  <span>
                    <router-link
                      style="color:#008CFF;"
                      :to="{path: '/personnalpolicyDetail', query: {orderNo:item.oNumber}}"
                    >查看详情</router-link>
                  </span>
                </p>
                <!-- <p>
                  <router-link :to="{path:'productdetail',query:{productId:item.bId}}">
                    <input type="button" value="再次购买" class="againBuy" />
                  </router-link>
                  <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                  <input type="button" value="申请理赔" class="claimBtn">
                </p>-->
              </li>
            </ul>
          </van-list>
        </van-tab>
        <!-- <van-tab title="已关闭" name="f">
          <van-list
            v-model="loading5"
            :finished="finished5"
            finished-text="没有更多了"
            @load="onLoad5"
            :offset="20"
            class="van-clearfix"
          >
            <ul class="policylist">
              <li v-for="(item,index) in policy_list5" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <span>{{item.orderStatus == 1 ? '待支付' : (item.orderStatus == 2 ? '即将生效' : (item.orderStatus == 3 ? '已生效' : (item.orderStatus == 4 ? '已关闭' : (item.orderStatus == 5 ? '即将到期' : (item.orderStatus == 6 ? '已到期' : (item.orderStatus == 7 ? '注销' : (item.orderStatus == 8 ? '退保' : (item.orderStatus == -1 ? '删除' : (item.orderStatus == 0 ? '默认' : '')))))))))}}</span>
                </div>
                <p class="goodName">{{item.goodName}}</p>
                <p class="fontColor666">
                  <span>订单号：</span>
                  <span>{{item.orderNo}}</span>
                </p>
                <p class="fontColor666">
                  <span>保障时间：</span>
                  <span>{{item.startTimeName}} 00:00:00 - {{item.endTimeName}} 23:59:59</span>
                </p>
                <p class="fontColor666">
                  <span>被保险人：</span>
                  <span>{{item.insuredName}}</span>
                </p>
                <p>
                  <span>共{{item.policyNum}}份，合计：{{item.policySumPrice}}</span>
                  <span>
                    <router-link
                      style="color:#008CFF;"
                      :to="{path: '/personnalpolicyDetail', query: {orderNo:item.oNumber}}"
                    >查看详情</router-link>
                  </span>
                </p>
                <p>
                  <router-link :to="{path:'productdetail',query:{productId:item.bId}}">
                    <input type="button" value="再次购买" class="againBuy" />
                  </router-link>
                  <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                  <input type="button" value="申请理赔" class="claimBtn">
                </p>
              </li>
            </ul>
          </van-list>
        </van-tab> -->
      </van-tabs>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import { Toast } from "vant";
import api from "../../fetch/api";
export default {
  name: "personalHistoryPolicy",
  data() {
    return {
      typeChangeValue: 0, //下拉选择框的状态，默认选择的是个险保单
      value1: 0,
      option1: [
        { text: "个险保单", value: 0 },
        { text: "车险保单", value: 1 },
        { text: "团险保单", value: 2 }
      ],
      activeName: "",
      companyLogo: require("../../assets/images/mine/zgtp.png"),
      policylist: "", //全部
      policylist1: "", //即将生效
      policylist2: "", //已生效
      policylist3: "", //即将到期
      policylist4: "", //已到期
      policylist5: "", //已到期
      insuranceCompanyInfo: "", //保险公司信息
      baseImagePath: "",
      pageSize: 3, //每页页数
      // 第一个 nav
      policy_list: [], //全部
      loading: false,
      finished: false,
      page: 1,
      // 第二个 nav
      policy_list1: [], //即将生效
      loading1: false,
      finished1: false,
      page1: 1,
      // 第三个 nav
      policy_list2: [], //即将生效
      loading2: false,
      finished2: false,
      page2: 1,
      // 第四个 nav
      policy_list3: [], //即将生效
      loading3: false,
      finished3: false,
      page3: 1,
      // 第五个 nav
      policy_list4: [], //即将生效
      loading4: false,
      finished4: false,
      page4: 1,
      // 第六个 nav
      policy_list5: [], //即将生效
      loading5: false,
      finished5: false,
      page5: 1
    };
  },
  methods: {
    typeChange(value) {
      console.log(value);
      this.typeChangeValue = value; //记录下拉框的状态
      this.policy_list = [];

      if (value == 1) {
        //车险
      } else if (value == 2) {
        //行业险
        this.TradeInsurance().then(res => {
          this.policylist = res;
          this.finished = false;
        });
      }
    },
    onLoad() {
      let this_ = this;
      this.listMessage(99, this_.page).then(res => {
        console.log(res);
        res.Data.forEach((item, index) => [this_.policy_list.push(item)]);
        this_.page++;
        // 加载状态结束
        this_.loading = false;
        //判断数据条数相等  ||  判断数据条数大于的情况 || 判断数据条数小于的情况（也就是）
        if (
          this_.policy_list.length == res.total ||
          this_.policy_list.length > res.total ||
          res.Data.length == 0
        ) {
          this_.finished = true;
        }
      });
    },
    onLoad1() {
      let this_ = this;
      this.listMessage(2, this_.page1).then(res => {
        res.Data.forEach((item, index) => [this_.policy_list1.push(item)]);
        this_.page1++;
        // 加载状态结束
        this_.loading1 = false;
        //判断数据条数相等  ||  判断数据条数大于的情况 || 判断数据条数小于的情况（也就是）
        if (
          this_.policy_list1.length == res.total ||
          this_.policy_list1.length > res.total ||
          res.Data.length == 0
        ) {
          this_.finished1 = true;
        }
      });
    },
    onLoad2() {
      let this_ = this;
      this.listMessage(3, this_.page2).then(res => {
        res.Data.forEach((item, index) => [this_.policy_list2.push(item)]);
        this_.page2++;
        // 加载状态结束
        this_.loading2 = false;
        //判断数据条数相等  ||  判断数据条数大于的情况 || 判断数据条数小于的情况（也就是）
        if (
          this_.policy_list2.length == res.total ||
          this_.policy_list2.length > res.total ||
          res.Data.length == 0
        ) {
          this_.finished2 = true;
        }
      });
    },
    onLoad3() {
      let this_ = this;
      this.listMessage(5, this_.page3).then(res => {
        res.Data.forEach((item, index) => [this_.policy_list3.push(item)]);
        this_.page3++;
        // 加载状态结束
        this_.loading3 = false;
        //判断数据条数相等  ||  判断数据条数大于的情况 || 判断数据条数小于的情况（也就是）
        if (
          this_.policy_list3.length == res.total ||
          this_.policy_list3.length > res.total ||
          res.Data.length == 0
        ) {
          this_.finished3 = true;
        }
      });
    },
    onLoad4() {
      let this_ = this;
      this.listMessage(6, this_.page4).then(res => {
        res.Data.forEach((item, index) => {
          this_.policy_list4.push(item); 
          });
        this_.page4++;
        // 加载状态结束
        this_.loading4 = false;
        //判断数据条数相等  ||  判断数据条数大于的情况 || 判断数据条数小于的情况（也就是）
        if (
          this_.policy_list4.length == res.total ||
          this_.policy_list4.length > res.total ||
          res.Data.length == 0
        ) {
          this_.finished4 = true;
        }
      });
    },
    onLoad5() {
      this.finished5 = true;
      this.loading5 = false;
    },

    showEvalut(goodId) {
      this.$router.push({ path: "/myEvaluation", query: { goodId: goodId } });
    },
    onClick(name, title) {
      var this_ = this;
      this_.finished = true;
      this_.finished1 = true;
      this_.finished2 = true;
      this_.finished3 = true;
      this_.finished4 = true;
      this_.finished5 = true;
      if (title == "全部") {
        // this_.page = 2;
        // this.listMessage(99, 1).then(res => {
        //   this_.policy_list = res.Data;
        //   this_.finished = false;
        //   if(res.total == 0){ //第一次点击获取数据，但是并没有获取到数据
        //     this_.finished = true;
        //   }
        // });
         this_.finished = false;
      } else if (title == "即将生效") {
        // this_.page1 = 2;
        // this.listMessage(2, 1).then(res => {
        //   this_.policy_list1 = res.Data;
        //   this_.finished1 = false;
        //   if(res.total == 0){ //第一次点击获取数据，但是并没有获取到数据
        //     this_.finished1 = true;
        //   }
        // });
         this_.finished1 = false;
      } else if (title == "已生效") {
        // this_.page2 = 2;
        // this.listMessage(3, 1).then(res => {
        //   this_.policy_list2 = res.Data;
        //   this_.finished2 = false;
        //   if(res.total == 0){ //第一次点击获取数据，但是并没有获取到数据
        //     this_.finished2 = true;
        //   }
        // });
         this_.finished2 = false;
      } else if (title == "即将到期") {
        // this_.page3 = 2;
        // this.listMessage(5, 1).then(res => {
        //   console.log(res)
        //   this_.policy_list3 = res.Data;
        //   this_.finished3 = false;
        //   if(res.total == 0){ //第一次点击获取数据，但是并没有获取到数据
        //     this_.finished3 = true;
        //   }
        // });
         this_.finished3 = false;
      } else if (title == "已到期") {
        // this_.page4 = 2;
        // this.listMessage(6, 1).then(res => {
        //   this_.policy_list4 = res.Data;
        //   this_.finished4 = false;
        //   if(res.total == 0){ //第一次点击获取数据，但是并没有获取到数据
        //     this_.finished4 = true;
        //   }
        // });
         this_.finished4 = false;
      } else if (title == "已关闭") {
        // this.listMessage(4, 1).then(res => {
        //   this_.policylist5 = res;
        //   this_.finished5 = false;
        //   if(res.total == 0){ //第一次点击获取数据，但是并没有获取到数据
        //     this_.finished5 = true;
        //   }
        // });
         this_.finished5 = false;
      }
    },
    async listMessage(status, page) {
      //page为请求的页数
      var userId = this.getCookie("ZB_JUSER_Mid");
      var this_ = this;
      var Data = "";
      var args = {
        source: 1,
        mId: this.getCookie("ZB_JUSER_Mid"),
        status: status,
        page: page,
        limit: "5"
      };
      let total;
      await this.$axios
        .post("/zbjj/Phone/queryHistoricalOldPolicy", args)   //  zbjj/Phone/queryHistoricalOldPolicy
        .then(res => {
          console.log(res);
          total = res.data.total;
          let response = res.data;
          //api.policyList(args).then(res => {
          if (response.success) {
            var responseData = response.orderList || [];
            for (var i = 0; i < responseData.length; i++) {
              responseData[i].endTime = this_.timestampToTime(
                Number(responseData[i].endTime)
              );
              responseData[i].startTime = this_.timestampToTime(
                Number(responseData[i].startTime)
              );
            }
            Data = responseData;
          } else {
            this_.$router.push("/loginRegister");
          }
        });
      return { Data: Data, total: total };
    }
  },
  mounted() {
    this.baseImagePath = this.$store.state.baseImagePath;
    var userId = this.getCookie("ZB_JUSER_Mid");
    var this_ = this;

    //刚进入页面的时候，获取请求渲染（全部）的数据
    // this.listMessage(99, 1).then(res => {
    //   console.log(res);
    //   this_.policy_list = res.Data;
    //   this_.finished = false;
    // });

    // 保险公司信息
    // var args1 = this.sign({});
    // api.getInsuranceCompany(args1).then(res => {
    //   if (res.code == 20000) {
    //     this.insuranceCompanyInfo = res.data;
    //   }
    // });
  }
};
</script>