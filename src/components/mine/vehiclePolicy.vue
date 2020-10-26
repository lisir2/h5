<!-- 车险保单 -->
<template>
  <div class="personal">
    <van-nav-bar title="车险保单" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="personalBox">
      <van-tabs
        v-model="activeName"
        sticky
        animated
        @change="onClick"
        swipeable
        title-active-color="#333"
        line-width="0"
      >
        <van-tab title="全部" name="a">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="20"
            class="van-clearfix"
          >
            <ul class="policylist">
              <li v-for="(item,index) in policylist" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <div v-for="(insuranceItem,index) in insuranceCompanyInfo" :key="index">
                    <img
                      v-if="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias"
                      :src="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias ? baseImagePath + insuranceItem.h5ImgUrl : ''"
                      alt
                    />
                  </div>
                  <span>{{item.orderStatus == 1 ? '待支付' : (item.orderStatus == 2 ? '即将生效' : (item.orderStatus == 3 ? '已生效' : (item.orderStatus == 4 ? '已关闭' : (item.orderStatus == 5 ? '即将到期' : (item.orderStatus == 6 ? '已到期' : (item.orderStatus == 7 ? '注销' : (item.orderStatus == 8 ? '退保' : (item.orderStatus == -1 ? '删除' : (item.orderStatus == 0 ? '默认' : '')))))))))}}</span>
                </div>
                <p class="goodName">{{item.goodName}}</p>
                <p class="fontColor666">
                  <span>订单号：</span>
                  <span>{{item.orderNo}}</span>
                </p>
                <p class="fontColor666">
                  <span>保障时间：</span>
                  <span>{{item.startTime}} - {{item.endTime}}</span>
                </p>
                <p class="fontColor666">
                  <span>被保险人：</span>
                  <span>{{item.policyViewInsuredVoList.length != 0 ? item.policyViewInsuredVoList[0].insuredName : ''}}</span>
                  <span
                    v-if="item.policyViewInsuredVoList.length > 1"
                    style="margin-left:10px;"
                  >等{{item.policyViewInsuredVoList.length}}人</span>
                </p>
                <p>
                  <span>共{{item.policyNum}}份，合计：{{item.policySumPrice}}</span>
                  <span>
                    <router-link
                      style="color:#008CFF;"
                      :to="{path: 'personalDetail', query: {orderNo:item.orderNo}}"
                    >查看详情</router-link>
                  </span>
                </p>

                <p v-if="item.orderStatus == 1">
                  <router-link :to="{path:item.goodName == '合众多多宝终身重大疾病保险' ? 'DDBPreview' : 'policyPreview',query:{id:item.id,productId:item.goodId,planId:item.planId}}">
                    <input type="button" value="立即支付" class="againBuy" />
                  </router-link>
                </p>
                <p v-else>
                  <router-link :to="{path:'productdetail',query:{productId:item.goodId}}">
                      <input type="button" value="再次购买" class="againBuy" />
                  </router-link>
                  <!-- <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                  <input type="button" value="申请理赔" class="claimBtn"> -->
                </p>
              </li>
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
              <li v-for="(item,index) in policylist1" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <div v-for="(insuranceItem,index) in insuranceCompanyInfo" :key="index">
                    <img
                      v-if="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias"
                      :src="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias ? baseImagePath + insuranceItem.h5ImgUrl : ''"
                      alt
                    />
                  </div>
                  <span>{{item.orderStatus == 1 ? '待支付' : (item.orderStatus == 2 ? '即将生效' : (item.orderStatus == 3 ? '已生效' : (item.orderStatus == 4 ? '已关闭' : (item.orderStatus == 5 ? '即将到期' : (item.orderStatus == 6 ? '已到期' : (item.orderStatus == 7 ? '注销' : (item.orderStatus == 8 ? '退保' : (item.orderStatus == -1 ? '删除' : (item.orderStatus == 0 ? '默认' : '')))))))))}}</span>
                </div>
                <p class="goodName">{{item.goodName}}</p>
                <p class="fontColor666">
                  <span>订单号：</span>
                  <span>{{item.orderNo}}</span>
                </p>
                <p class="fontColor666">
                  <span>保障时间：</span>
                  <span>{{item.startTime}} - {{item.endTime}}</span>
                </p>
                <p class="fontColor666">
                  <span>被保险人：</span>
                  <span>{{item.policyViewInsuredVoList.length != 0 ? item.policyViewInsuredVoList[0].insuredName : ''}}</span>
                  <span
                    v-if="item.policyViewInsuredVoList.length > 1"
                    style="margin-left:10px;"
                  >等{{item.policyViewInsuredVoList.length}}人</span>
                </p>
                <p>
                  <span>共{{item.policyNum}}份，合计：{{item.policySumPrice}}</span>
                  <span>
                    <router-link
                      style="color:#008CFF;"
                      :to="{path: 'personalDetail', query: {orderNo:item.orderNo}}"
                    >查看详情</router-link>
                  </span>
                </p>

                <p>
                  <router-link :to="{path:'productdetail',query:{productId:item.goodId}}">
                    <input type="button" value="再次购买" class="againBuy" />
                  </router-link>
                  <!-- <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                  <input type="button" value="申请理赔" class="claimBtn">-->
                </p>
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
              <li v-for="(item,index) in policylist2" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <div v-for="(insuranceItem,index) in insuranceCompanyInfo" :key="index">
                    <img
                      v-if="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias"
                      :src="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias ? baseImagePath + insuranceItem.h5ImgUrl : ''"
                      alt
                    />
                  </div>
                  <span>{{item.orderStatus == 1 ? '待支付' : (item.orderStatus == 2 ? '即将生效' : (item.orderStatus == 3 ? '已生效' : (item.orderStatus == 4 ? '已关闭' : (item.orderStatus == 5 ? '即将到期' : (item.orderStatus == 6 ? '已到期' : (item.orderStatus == 7 ? '注销' : (item.orderStatus == 8 ? '退保' : (item.orderStatus == -1 ? '删除' : (item.orderStatus == 0 ? '默认' : '')))))))))}}</span>
                </div>
                <p class="goodName">{{item.goodName}}</p>
                <p class="fontColor666">
                  <span>订单号：</span>
                  <span>{{item.orderNo}}</span>
                </p>
                <p class="fontColor666">
                  <span>保障时间：</span>
                  <span>{{item.startTime}} - {{item.endTime}}</span>
                </p>
                <p class="fontColor666">
                  <span>被保险人：</span>
                  <span>{{item.policyViewInsuredVoList.length != 0 ? item.policyViewInsuredVoList[0].insuredName : ''}}</span>
                  <span
                    v-if="item.policyViewInsuredVoList.length > 1"
                    style="margin-left:10px;"
                  >等{{item.policyViewInsuredVoList.length}}人</span>
                </p>
                <p>
                  <span>共{{item.policyNum}}份，合计：{{item.policySumPrice}}</span>
                  <span>
                    <router-link
                      style="color:#008CFF;"
                      :to="{path: 'personalDetail', query: {orderNo:item.orderNo}}"
                    >查看详情</router-link>
                  </span>
                </p>

                <p>
                  <router-link :to="{path:'productdetail',query:{productId:item.goodId}}">
                    <input type="button" value="再次购买" class="againBuy" />
                  </router-link>
                  <!-- <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                  <input type="button" value="申请理赔" class="claimBtn">-->
                </p>
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
              <li v-for="(item,index) in policylist3" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <div v-for="(insuranceItem,index) in insuranceCompanyInfo" :key="index">
                    <img
                      v-if="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias"
                      :src="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias ? baseImagePath + insuranceItem.h5ImgUrl : ''"
                      alt
                    />
                  </div>
                  <span>{{item.orderStatus == 1 ? '待支付' : (item.orderStatus == 2 ? '即将生效' : (item.orderStatus == 3 ? '已生效' : (item.orderStatus == 4 ? '已关闭' : (item.orderStatus == 5 ? '即将到期' : (item.orderStatus == 6 ? '已到期' : (item.orderStatus == 7 ? '注销' : (item.orderStatus == 8 ? '退保' : (item.orderStatus == -1 ? '删除' : (item.orderStatus == 0 ? '默认' : '')))))))))}}</span>
                </div>
                <p class="goodName">{{item.goodName}}</p>
                <p class="fontColor666">
                  <span>订单号：</span>
                  <span>{{item.orderNo}}</span>
                </p>
                <p class="fontColor666">
                  <span>保障时间：</span>
                  <span>{{item.startTime}} - {{item.endTime}}</span>
                </p>
                <p class="fontColor666">
                  <span>被保险人：</span>
                  <span>{{item.policyViewInsuredVoList.length != 0 ? item.policyViewInsuredVoList[0].insuredName : ''}}</span>
                  <span
                    v-if="item.policyViewInsuredVoList.length > 1"
                    style="margin-left:10px;"
                  >等{{item.policyViewInsuredVoList.length}}人</span>
                </p>
                <p>
                  <span>共{{item.policyNum}}份，合计：{{item.policySumPrice}}</span>
                  <span>
                    <router-link
                      style="color:#008CFF;"
                      :to="{path: 'personalDetail', query: {orderNo:item.orderNo}}"
                    >查看详情</router-link>
                  </span>
                </p>

                <p>
                  <router-link :to="{path:'productdetail',query:{productId:item.goodId}}">
                    <input type="button" value="再次购买" class="againBuy" />
                  </router-link>
                  <!-- <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                  <input type="button" value="申请理赔" class="claimBtn">-->
                </p>
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
              <li v-for="(item,index) in policylist4" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <div v-for="(insuranceItem,index) in insuranceCompanyInfo" :key="index">
                    <img
                      v-if="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias"
                      :src="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias ? baseImagePath + insuranceItem.h5ImgUrl : ''"
                      alt
                    />
                  </div>
                  <span>{{item.orderStatus == 1 ? '待支付' : (item.orderStatus == 2 ? '即将生效' : (item.orderStatus == 3 ? '已生效' : (item.orderStatus == 4 ? '已关闭' : (item.orderStatus == 5 ? '即将到期' : (item.orderStatus == 6 ? '已到期' : (item.orderStatus == 7 ? '注销' : (item.orderStatus == 8 ? '退保' : (item.orderStatus == -1 ? '删除' : (item.orderStatus == 0 ? '默认' : '')))))))))}}</span>
                </div>
                <p class="goodName">{{item.goodName}}</p>
                <p class="fontColor666">
                  <span>订单号：</span>
                  <span>{{item.orderNo}}</span>
                </p>
                <p class="fontColor666">
                  <span>保障时间：</span>
                  <span>{{item.startTime}} - {{item.endTime}}</span>
                </p>
                <p class="fontColor666">
                  <span>被保险人：</span>
                  <span>{{item.policyViewInsuredVoList.length != 0 ? item.policyViewInsuredVoList[0].insuredName : ''}}</span>
                  <span
                    v-if="item.policyViewInsuredVoList.length > 1"
                    style="margin-left:10px;"
                  >等{{item.policyViewInsuredVoList.length}}人</span>
                </p>
                <p>
                  <span>共{{item.policyNum}}份，合计：{{item.policySumPrice}}</span>
                  <span>
                    <router-link
                      style="color:#008CFF;"
                      :to="{path: 'personalDetail', query: {orderNo:item.orderNo}}"
                    >查看详情</router-link>
                  </span>
                </p>

                <p>
                  <router-link :to="{path:'productdetail',query:{productId:item.goodId}}">
                    <input type="button" value="再次购买" class="againBuy" />
                  </router-link>
                  <!-- <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                  <input type="button" value="申请理赔" class="claimBtn">-->
                </p>
              </li>
            </ul>
          </van-list>
        </van-tab>
        <van-tab title="已关闭" name="f">
          <van-list
            v-model="loading5"
            :finished="finished5"
            finished-text="没有更多了"
            @load="onLoad5"
            :offset="20"
            class="van-clearfix"
          >
            <ul class="policylist">
              <li v-for="(item,index) in policylist5" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <div v-for="(insuranceItem,index) in insuranceCompanyInfo" :key="index">
                    <img
                      v-if="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias"
                      :src="insuranceItem.simpleBrandName == item.goodInsuranceCompanyAlias ? baseImagePath + insuranceItem.h5ImgUrl : ''"
                      alt
                    />
                  </div>
                  <span>{{item.orderStatus == 1 ? '待支付' : (item.orderStatus == 2 ? '即将生效' : (item.orderStatus == 3 ? '已生效' : (item.orderStatus == 4 ? '已关闭' : (item.orderStatus == 5 ? '即将到期' : (item.orderStatus == 6 ? '已到期' : (item.orderStatus == 7 ? '注销' : (item.orderStatus == 8 ? '退保' : (item.orderStatus == -1 ? '删除' : (item.orderStatus == 0 ? '默认' : '')))))))))}}</span>
                </div>
                <p class="goodName">{{item.goodName}}</p>
                <p class="fontColor666">
                  <span>订单号：</span>
                  <span>{{item.orderNo}}</span>
                </p>
                <p class="fontColor666">
                  <span>保障时间：</span>
                  <span>{{item.startTime}} - {{item.endTime}}</span>
                </p>
                <p class="fontColor666">
                  <span>被保险人：</span>
                  <span>{{item.policyViewInsuredVoList.length != 0 ? item.policyViewInsuredVoList[0].insuredName : ''}}</span>
                  <span
                    v-if="item.policyViewInsuredVoList.length > 1"
                    style="margin-left:10px;"
                  >等{{item.policyViewInsuredVoList.length}}人</span>
                </p>
                <p>
                  <span>共{{item.policyNum}}份，合计：{{item.policySumPrice}}</span>
                  <span>
                    <router-link
                      style="color:#008CFF;"
                      :to="{path: 'personalDetail', query: {orderNo:item.orderNo}}"
                    >查看详情</router-link>
                  </span>
                </p>

                <p>
                  <router-link :to="{path:'productdetail',query:{productId:item.goodId}}">
                    <input type="button" value="再次购买" class="againBuy" />
                  </router-link>
                  <!-- <input type="button" value="评价" class="evaluateBtn" @click="showEvalut(item.goodId)">
                  <input type="button" value="申请理赔" class="claimBtn">-->
                </p>
              </li>
            </ul>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 小球 -->
    <div class="globule">
      <router-link to="/historyPolicy/carHistoryPolicy">
        <div>
          <p>历史</p>
          <p>保单</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import { Toast } from "vant";
import api from "@/fetch/api";
export default {
  name: "vehiclePolicy",
  components: {},
  data() {
    return {
      activeName: "",
      companyLogo: require("@/assets/images/mine/zgtp.png"),
      policylist: "", //全部
      policylist1: "", //即将生效
      policylist2: "", //已生效
      policylist3: "", //即将到期
      policylist4: "", //已到期
      policylist5: "", //已关闭
      insuranceCompanyInfo: "", //保险公司信息
      baseImagePath: "",
      pageSize: 3, //每页页数
      // 第一个 nav
      policy_list: [], //全部
      loading: false,
      finished: true,
      page: 0,
      // 第二个 nav
      policy_list1: [], //即将生效
      loading1: false,
      finished1: true,
      page1: 0,
      // 第三个 nav
      policy_list2: [], //即将生效
      loading2: false,
      finished2: true,
      page2: 0,
      // 第四个 nav
      policy_list3: [], //即将生效
      loading3: false,
      finished3: true,
      page3: 0,
      // 第五个 nav
      policy_list4: [], //即将生效
      loading4: false,
      finished4: true,
      page4: 0,
      // 第六个 nav
      policy_list5: [], //即将生效
      loading5: false,
      finished5: true,
      page5: 0
    };
  },
  computed: {},
  mounted() {
    this.baseImagePath = this.$store.state.baseImagePath;
    var userId = this.getCookie("ZB_JUSER_Mid");
    var that = this;
    // 保单列表
    var args = this.sign({
      userId: userId,
      orderStatus: 0,
      policyType: 3,
    });
    api.policyList(args).then(res => {
      if (res.code == 20000) {
        var responseData = res.data;
        console.log(res.data.length);
        for (var i = 0; i < res.data.length; i++) {
          responseData[i].endTime = that.timestampToTime(
            Number(responseData[i].endTime)
          );
          responseData[i].startTime = that.timestampToTime(
            Number(responseData[i].startTime)
          );
        }
        that.policylist = responseData;
        this.finished = false;
      } else {
        this.Toast(res.message);
      }
    });
    // 保险公司信息
    var args1 = this.sign({});
    api.getInsuranceCompany(args1).then(res => {
      if (res.code == 20000) {
        this.insuranceCompanyInfo = res.data;
      }
    });
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        for (
          var i = this.page * this.pageSize;
          i < this.policylist.length;
          i++
        ) {
          if (i < (this.page + 1) * this.pageSize) {
            this.policy_list.push(this.policylist[i]);
          }
        }
        // 加载状态结束
        this.loading = false;
        if (
          this.policylist.length == this.policy_list.length ||
          this.policylist.length < this.policy_list.length
        ) {
          this.finished = true;
        }
        this.page++;
      }, 200);
    },
    onLoad1() {
      setTimeout(() => {
        for (
          var i = this.page1 * this.pageSize;
          i < this.policylist1.length;
          i++
        ) {
          if (i < (this.page1 + 1) * this.pageSize) {
            this.policy_list1.push(this.policylist1[i]);
          }
        }
        // 加载状态结束
        this.loading1 = false;
        if (
          this.policylist1.length == this.policy_list1.length ||
          this.policylist1.length < this.policy_list1.length
        ) {
          this.finished1 = true;
        }
        this.page1++;
      }, 200);
    },
    onLoad2() {
      setTimeout(() => {
        for (
          var i = this.page2 * this.pageSize;
          i < this.policylist2.length;
          i++
        ) {
          if (i < (this.page2 + 1) * this.pageSize) {
            this.policy_list2.push(this.policylist2[i]);
          }
        }
        // 加载状态结束
        this.loading2 = false;
        if (
          this.policylist2.length == this.policy_list2.length ||
          this.policylist2.length < this.policy_list2.length
        ) {
          this.finished2 = true;
        }
        this.page2++;
      }, 200);
    },
    onLoad3() {
      setTimeout(() => {
        for (
          var i = this.page3 * this.pageSize;
          i < this.policylist3.length;
          i++
        ) {
          if (i < (this.page3 + 1) * this.pageSize) {
            this.policy_list3.push(this.policylist3[i]);
          }
        }
        // 加载状态结束
        this.loading3 = false;
        if (
          this.policylist3.length == this.policy_list3.length ||
          this.policylist3.length < this.policy_list3.length
        ) {
          this.finished3 = true;
        }
        this.page3++;
      }, 200);
    },
    onLoad4() {
      setTimeout(() => {
        for (
          var i = this.page4 * this.pageSize;
          i < this.policylist4.length;
          i++
        ) {
          if (i < (this.page4 + 1) * this.pageSize) {
            this.policy_list4.push(this.policylist4[i]);
          }
        }
        // 加载状态结束
        this.loading4 = false;
        if (
          this.policylist4.length == this.policy_list4.length ||
          this.policylist4.length < this.policy_list4.length
        ) {
          this.finished4 = true;
        }
        this.page4++;
      }, 200);
    },
    onLoad5() {
      setTimeout(() => {
        for (
          var i = this.page5 * this.pageSize;
          i < this.policylist5.length;
          i++
        ) {
          if (i < (this.page5 + 1) * this.pageSize) {
            this.policy_list5.push(this.policylist5[i]);
          }
        }
        // 加载状态结束
        this.loading5 = false;
        if (
          this.policylist5.length == this.policy_list5.length ||
          this.policylist5.length < this.policy_list5.length
        ) {
          this.finished5 = true;
        }
        this.page5++;
      }, 200);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    showEvalut(goodId) {
      this.$router.push({ path: "/myEvaluation", query: { goodId: goodId } });
    },
    onClick(name, title) {
      var that = this;
      that.finished = true;
      that.finished1 = true;
      that.finished2 = true;
      that.finished3 = true;
      that.finished4 = true;
      that.finished5 = true;
      if (title == "全部") {
        this.listMessage(0).then(res => {
          that.policylist = res;
          that.finished = false;
        });
      } else if (title == "即将生效") {
        this.listMessage(2).then(res => {
          that.policylist1 = res;
          that.finished1 = false;
        });
      } else if (title == "已生效") {
        this.listMessage(3).then(res => {
          that.policylist2 = res;
          that.finished2 = false;
        });
      } else if (title == "即将到期") {
        this.listMessage(5).then(res => {
          that.policylist3 = res;
          that.finished3 = false;
        });
      } else if (title == "已到期") {
        this.listMessage(6).then(res => {
          that.policylist4 = res;
          that.finished4 = false;
        });
      } else if (title == "已关闭") {
        this.listMessage(4).then(res => {
          that.policylist5 = res;
          that.finished5 = false;
        });
      }
    },
    async listMessage(status) {
      var userId = this.getCookie("ZB_JUSER_Mid");
      var that = this;
      var Data = "";
      var args = this.sign({
        userId: userId,
        orderStatus: status,
        policyType: 3,
      });
      await api.policyList(args).then(res => {
        if (res.code == 20000) {
          var responseData = res.data;
          for (var i = 0; i < res.data.length; i++) {
            responseData[i].endTime = that.timestampToTime(
              Number(responseData[i].endTime)
            );
            responseData[i].startTime = that.timestampToTime(
              Number(responseData[i].startTime)
            );
          }
          Data = responseData;
        } else {
          this.Toast(res.message);
        }
      });
      return Data;
    }
  }
};
</script>

<style lang='scss' >
.personal {
  background: #fff;
  .globule {
    position: fixed;
    top: 800px;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: #f99a31;
    height: 110px;
    right: 10px;
    word-wrap:break-word;
    div{
      height: 70px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      p{
        font-size: 26px;
        color: white;
        text-align: center;
      }
    }
  }
  .van-tab--active span {
    font-size: 28px;
    font-weight: 700 !important;
    color: #333;
  }
  .policylist {
    display: block;
    .coverImg {
      height: 120px;
      position: relative;
      span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 26px;
        color: rgb(0, 140, 255);
      }
      img {
        height: 100%;
        width: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .goodName {
      font-weight: 700;
      font-size: 30px !important;
      margin-bottom: 40px;
      margin-top: 0px;
      padding-top: 36px;
      border-top: 1.1px solid #e8e6e6;
      margin: 0px 0px 40px;
      padding: 36px 30px 0px;
    }
    .fontColor666 {
      font-size: 26px;
      color: #666;
    }
    li {
      display: block !important;
      p {
        margin: 20px 30px;
        font-size: 26px;
        color: #0c0c0c;
      }
      p:nth-child(1) {
        margin: 0;
        border-bottom: 1.1px solid #e8e6e6;
        img {
          width: 234px;
          margin-left: 30px;
        }
        span {
          display: block;
        }
      }
      p:nth-child(3) {
        font-size: 30px;
      }

      p:nth-child(8) {
        margin: 0;
        margin-top: 40px;
        border-bottom: 1.1px solid #e8e6e6;
        padding-bottom: 36px;
        span:nth-child(1) {
          margin-left: 30px;
        }
        span:nth-child(2) {
          color: #008cff;
          float: right;
          line-height: 38px;
          margin-right: 30px;
        }
      }
      p:nth-child(9) {
        margin-top: 24px;
        margin-bottom: 24px;
        input {
          height: 50px;
          width: 140px;
          border: 0;
          border-radius: 6px;
          font-size: 24px;
          margin-right: 20px;
        }
        .againBuy {
          background: #fb8400;
          color: #fff;
        }
        .evaluateBtn,
        .claimBtn {
          border: 2px solid #fb8400;
          color: #fb8400;
          background: #fff;
        }
      }
    }
  }
}
.lineHeight {
  height: 20px;
  background: rgba(247, 247, 247, 1);
}
</style>