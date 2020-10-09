<template>
  <div class="class-list">
    <van-nav-bar title="产品列表" style="height:10%">
      <!-- <van-icon name="share" slot="right" /> -->
    </van-nav-bar>
    <div class="productList">
      <form action="/">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @search="onSearch"
        >
          <div slot="action" @click="onSearch" class="searchBtn">搜索</div>
        </van-search>
      </form>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-tabs
          v-model="activeName"
          class="classBox"
          sticky
          animated
          @click="onClick"
          @change="onChange"
          swipeable
          :swipe-threshold="5"
          border
        >
          <van-tab title="全部" name="0" style="min-height:9rem">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :offset="20"
              class="van-clearfix"
            >
              <ul>
                <li v-for="item in goodList" :key="item.id+1000" @click="goDetail(item.id)">
                  <div class="leftDiv">
                    <van-image lazy-load width="100%" :src="imgCommonPath +item.goodSmallImg" />
                    <span>{{item.goodInsuranceCompanyAlias}}</span>
                  </div>
                  <div class="rightDiv">
                    <p class="right_one">{{item.goodName}}</p>
                    <p class="right_two" v-html="item.goodListPromotionalCopy"></p>
                    <p class="right_three">
                      <span class="minFee">
                        ￥{{item.minFee}}
                        <span style="font-size:11px;">起</span>
                      </span>
                      <!-- item.goodsCommissionRateDetailList.length === 0 没有配置佣金-->
                      <span
                        class="commission"
                        v-if="item.goodsCommissionRateDetailList && item.goodsCommissionRateDetailList.length != 0 && auditStatus == 2  && CommissionSwitch"
                        @click="commissionShow($event,item.goodsCommissionRateDetailList,item.goodName)"
                      >{{item.commissionRatio}}</span>
                      <!-- <span class="saleVolume">已售{{item.goodSalesVolume}}份</span> -->
                    </p>
                  </div>
                </li>
              </ul>
            </van-list>
          </van-tab>
          <van-tab title="旅游险" name="1">
            <van-list
              v-model="loading1"
              :finished="finished1"
              finished-text="没有更多了"
              @load="onLoad1"
              :offset="20"
              class="van-clearfix"
            >
              <ul>
                <li v-for="item in goodList1" :key="item.id" @click="goDetail(item.id)">
                  <div class="leftDiv">
                    <van-image lazy-load width="100%" :src="imgCommonPath+item.goodSmallImg" />
                    <span>{{item.goodInsuranceCompanyAlias}}</span>
                  </div>
                  <div class="rightDiv">
                    <p class="right_one">{{item.goodName}}</p>
                    <p class="right_two" v-html="item.goodListPromotionalCopy"></p>
                    <p class="right_three">
                      <span class="minFee">
                        ￥{{item.minFee}}
                        <span style="font-size:11px;">起</span>
                      </span>
                      <!-- item.goodsCommissionRateDetailList.length === 0 没有配置佣金-->
                      <span
                        class="commission"
                        v-if="item.goodsCommissionRateDetailList &&item.goodsCommissionRateDetailList.length != 0 && auditStatus == 2  && CommissionSwitch"
                        @click="commissionShow($event,item.goodsCommissionRateDetailList,item.goodName)"
                      >{{item.commissionRatio}}</span>
                      <!-- <span class="saleVolume">已售{{item.goodSalesVolume}}份</span> -->
                    </p>
                  </div>
                </li>
              </ul>
            </van-list>
          </van-tab>
          <van-tab title="意外险" name="2">
            <van-list
              v-model="loading2"
              :finished="finished2"
              finished-text="没有更多了"
              @load="onLoad2"
              :offset="20"
              class="van-clearfix"
            >
              <ul>
                <li v-for="item in goodList2" :key="item.id" @click="goDetail(item.id)">
                  <div class="leftDiv">
                    <van-image lazy-load width="100%" :src="imgCommonPath+item.goodSmallImg" />
                    <span>{{item.goodInsuranceCompanyAlias}}</span>
                  </div>
                  <div class="rightDiv">
                    <p class="right_one">{{item.goodName}}</p>
                    <p class="right_two" v-html="item.goodListPromotionalCopy"></p>
                    <p class="right_three">
                      <span class="minFee">
                        ￥{{item.minFee}}
                        <span style="font-size:11px;">起</span>
                      </span>
                      <!-- item.goodsCommissionRateDetailList.length === 0 没有配置佣金-->
                      <span
                        class="commission"
                        v-if="item.goodsCommissionRateDetailList &&item.goodsCommissionRateDetailList.length != 0 && auditStatus == 2  && CommissionSwitch"
                        @click="commissionShow($event,item.goodsCommissionRateDetailList,item.goodName)"
                      >{{item.commissionRatio}}</span>
                      <!-- <span class="saleVolume">已售{{item.goodSalesVolume}}份</span> -->
                    </p>
                  </div>
                </li>
              </ul>
            </van-list>
          </van-tab>
          <van-tab title="健康险" name="3">
            <van-list
              v-model="loading3"
              :finished="finished3"
              finished-text="没有更多了"
              @load="onLoad3"
              :offset="20"
              class="van-clearfix"
            >
              <ul>
                <li v-for="item in goodList3" :key="item.id" @click="goDetail(item.id)">
                  <div class="leftDiv">
                    <van-image lazy-load width="100%" :src="imgCommonPath+item.goodSmallImg" />
                    <span>{{item.goodInsuranceCompanyAlias}}</span>
                  </div>
                  <div class="rightDiv">
                    <p class="right_one">{{item.goodName}}</p>
                    <p class="right_two" v-html="item.goodListPromotionalCopy"></p>
                    <p class="right_three">
                      <span class="minFee">
                        ￥{{item.minFee}}
                        <span style="font-size:11px;">起</span>
                      </span>
                      <!-- item.goodsCommissionRateDetailList.length === 0 没有配置佣金-->
                      <span
                        class="commission"
                        v-if="item.goodsCommissionRateDetailList &&item.goodsCommissionRateDetailList.length != 0 && auditStatus == 2  && CommissionSwitch"
                        @click="commissionShow($event,item.goodsCommissionRateDetailList,item.goodName)"
                      >{{item.commissionRatio}}</span>
                      <!-- <span class="saleVolume">已售{{item.goodSalesVolume}}份</span> -->
                    </p>
                  </div>
                </li>
              </ul>
            </van-list>
          </van-tab>
          <van-tab title="人寿险" name="4">
            <van-list
              v-model="loading4"
              :finished="finished4"
              finished-text="没有更多了"
              @load="onLoad4"
              :offset="20"
              class="van-clearfix"
            >
              <ul>
                <li v-for="item in goodList4" :key="item.id" @click="goDetail(item.id)">
                  <div class="leftDiv">
                    <van-image lazy-load width="100%" :src="imgCommonPath+item.goodSmallImg" />
                    <span>{{item.goodInsuranceCompanyAlias}}</span>
                  </div>
                  <div class="rightDiv">
                    <p class="right_one">{{item.goodName}}</p>
                    <p class="right_two" v-html="item.goodListPromotionalCopy"></p>
                    <p class="right_three">
                      <span class="minFee">
                        ￥{{item.minFee}}
                        <span style="font-size:11px;">起</span>
                      </span>
                      <!-- item.goodsCommissionRateDetailList.length === 0 没有配置佣金-->
                      <span
                        class="commission"
                        v-if="item.goodsCommissionRateDetailList &&item.goodsCommissionRateDetailList.length != 0 && auditStatus == 2  && CommissionSwitch"
                        @click="commissionShow($event,item.goodsCommissionRateDetailList,item.goodName)"
                      >{{item.commissionRatio}}</span>
                      <!-- <span class="saleVolume">已售{{item.goodSalesVolume}}份</span> -->
                    </p>
                  </div>
                </li>
              </ul>
            </van-list>
          </van-tab>
          <van-tab title="团体险" name="5">
            <van-list
              v-model="loading5"
              :finished="finished5"
              finished-text="没有更多了"
              @load="onLoad5"
              :offsetoffset="20"
              class="van-clearfix"
            >
              <ul>
                <li v-for="item in goodList5" :key="item.id" @click="goDetail(item.id)">
                  <div class="leftDiv">
                    <van-image lazy-load width="100%" :src="imgCommonPath+item.goodSmallImg" />
                    <span>{{item.goodInsuranceCompanyAlias}}</span>
                  </div>
                  <div class="rightDiv">
                    <p class="right_one">{{item.goodName}}</p>
                    <p class="right_two" v-html="item.goodListPromotionalCopy"></p>
                    <p class="right_three">
                      <span class="minFee">
                        ￥{{item.minFee}}
                        <span style="font-size:11px;">起</span>
                      </span>
                      <!-- item.goodsCommissionRateDetailList.length === 0 没有配置佣金-->
                      <span
                        class="commission"
                        v-if="item.goodsCommissionRateDetailList &&item.goodsCommissionRateDetailList.length != 0 && auditStatus == 2  && CommissionSwitch"
                        @click="commissionShow($event,item.goodsCommissionRateDetailList,item.goodName)"
                      >{{item.commissionRatio}}</span>
                      <!-- <span class="saleVolume">已售{{item.goodSalesVolume}}份</span> -->
                    </p>
                  </div>
                </li>
              </ul>
            </van-list>
          </van-tab>
          <van-tab title="财产险" name="6">
            <van-list
              v-model="loading6"
              :finished="finished6"
              finished-text="没有更多了"
              @load="onLoad6"
              :offsetoffset="20"
              class="van-clearfix"
            >
              <ul>
                <li v-for="item in goodList6" :key="item.id" @click="goDetail(item.id)">
                  <div class="leftDiv">
                    <van-image lazy-load width="100%" :src="imgCommonPath+item.goodSmallImg" />
                    <span>{{item.goodInsuranceCompanyAlias}}</span>
                  </div>
                  <div class="rightDiv">
                    <p class="right_one">{{item.goodName}}</p>
                    <p class="right_two" v-html="item.goodListPromotionalCopy"></p>
                    <p class="right_three">
                      <span class="minFee">
                        ￥{{item.minFee}}
                        <span style="font-size:11px;">起</span>
                      </span>
                      <!-- item.goodsCommissionRateDetailList.length === 0 没有配置佣金-->
                      <span
                        class="commission"
                        v-if="item.goodsCommissionRateDetailList &&item.goodsCommissionRateDetailList.length != 0 && auditStatus == 2  && CommissionSwitch"
                        @click="commissionShow($event,item.goodsCommissionRateDetailList,item.goodName)"
                      >{{item.commissionRatio}}</span>
                      <!-- <span class="saleVolume">已售{{item.goodSalesVolume}}份</span> -->
                    </p>
                  </div>
                </li>
              </ul>
            </van-list>
          </van-tab>
          <!-- <van-tab title="车辆险" name="7">
            <van-list
              v-model="loading7"
              :finished="finished7"
              finished-text="没有更多了"
              @load="onLoad7"
              :offsetoffset="20"
              class="van-clearfix"
            >
              <ul>
                <li v-for="item in goodList7" :key="item.id" @click="goDetail(item.id)">
                  <div class="leftDiv">
                    <van-image lazy-load width="100%" :src="imgCommonPath+item.goodSmallImg" />
                    <span>{{item.goodInsuranceCompanyAlias}}</span>
                  </div>
                  <div class="rightDiv">
                    <p class="right_one">{{item.goodName}}</p>
                    <p class="right_two" v-html="item.goodListPromotionalCopy"></p>
                    <p class="right_three">
                      <span class="minFee">
                        ￥{{item.minFee}}
                        <span style="font-size:11px;">起</span>
                      </span>
                      <span
                        class="commission"
                        v-if="item.goodsCommissionRateDetailList &&item.goodsCommissionRateDetailList.length != 0 && auditStatus == 2  && CommissionSwitch"
                        @click="commissionShow($event,item.goodsCommissionRateDetailList,item.goodName)"
                      >{{item.commissionRatio}}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </van-list>
          </van-tab>
          <van-tab title="理财险" name="8">
            <van-list
              v-model="loading8"
              :finished="finished8"
              finished-text="没有更多了"
              @load="onLoad8"
              :offsetoffset="20"
              class="van-clearfix"
            >
              <ul>
                <li v-for="item in goodList8" :key="item.id" @click="goDetail(item.id)">
                  <div class="leftDiv">
                    <van-image lazy-load width="100%" :src="imgCommonPath+item.goodSmallImg" />
                    <span>{{item.goodInsuranceCompanyAlias}}</span>
                  </div>
                  <div class="rightDiv">
                    <p class="right_one">{{item.goodName}}</p>
                    <p class="right_two" v-html="item.goodListPromotionalCopy"></p>
                    <p class="right_three">
                      <span class="minFee">
                        ￥{{item.minFee}}
                        <span style="font-size:11px;">起</span>
                      </span>
                      <span
                        class="commission"
                        v-if="item.goodsCommissionRateDetailList &&item.goodsCommissionRateDetailList.length != 0 && auditStatus == 2  && CommissionSwitch"
                        @click="commissionShow($event,item.goodsCommissionRateDetailList,item.goodName)"
                      >{{item.commissionRatio}}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </van-list>
          </van-tab> -->
          <van-tab title="行业类" name="9">
            <van-list
              v-model="loading9"
              :finished="finished9"
              finished-text="没有更多了"
              @load="onLoad9"
              :offsetoffset="20"
              class="van-clearfix"
            >
              <ul>
                <li v-for="item in goodList9" :key="item.id" @click="goDetail(item.id)">
                  <div class="leftDiv">
                    <van-image lazy-load width="100%" :src="imgCommonPath+item.goodSmallImg" />
                    <span>{{item.goodInsuranceCompanyAlias}}</span>
                  </div>
                  <div class="rightDiv">
                    <p class="right_one">{{item.goodName}}</p>
                    <p class="right_two" v-html="item.goodListPromotionalCopy"></p>
                    <p class="right_three">
                      <span class="minFee">
                        ￥{{item.minFee}}
                        <span style="font-size:11px;">起</span>
                      </span>
                      <!-- item.goodsCommissionRateDetailList.length === 0 没有配置佣金-->
                      <span
                        class="commission"
                        v-if="item.goodsCommissionRateDetailList &&item.goodsCommissionRateDetailList.length != 0 && auditStatus == 2  && CommissionSwitch"
                        @click="commissionShow($event,item.goodsCommissionRateDetailList,item.goodName)"
                      >{{item.commissionRatio}}</span>
                      <!-- <span class="saleVolume">已售{{item.goodSalesVolume}}份</span> -->
                    </p>
                  </div>
                </li>
              </ul>
            </van-list>
          </van-tab>
        </van-tabs>
      </van-pull-refresh>
      <foot-menu></foot-menu>
      <!-- 佣金展示内容 -->
      <van-popup v-model="commission_show" closeable :style="{ width: '85%' }" :round="true">
        <van-nav-bar :title="commissionGoodName" class="CommissionNavVar" />
        <CommissionPopUp :commissionInfo="commissionInfo"></CommissionPopUp>
      </van-popup>
    </div>
  </div>
</template>

<script>
import FootMenu from "../../components/footMenu.vue";
import api from "../../fetch/api";
import $ from "jquery";
import CommissionPopUp from "@/components/productDetailComponent/CommissionPopUp";

export default {
  name: "classlist",
  components: { FootMenu, CommissionPopUp },
  data() {
    return {
      imgCommonPath: this.$store.state.baseImagePath,
      duration: 1500,
      value: "",
      activeName: "",
      count: 0,
      allDataShow: false, //全部导航栏 数据是否请求完毕
      isLoading: false, //下拉刷新状态
      items: [],
      list: [],
      // 第一个table
      goodList: [],
      loading: false,
      finished: false,
      page: 1,
      // 第二个table
      goodList1: [],
      loading1: false,
      finished1: false,
      page1: 1,
      // 第三个table
      goodList2: [],
      loading2: false,
      finished2: false,
      page2: 1,
      // 第四个table
      goodList3: [],
      loading3: false,
      finished3: false,
      page3: 1,
      // 第五个table
      goodList4: [],
      loading4: false,
      finished4: false,
      page4: 1,
      // 第六个table
      goodList5: [],
      loading5: false,
      finished5: false,
      page5: 1,
      // 第七个table
      goodList6: [],
      loading6: false,
      finished6: false,
      page6: 1,
      // 第八个table
      goodList7: [],
      loading7: false,
      finished7: false,
      page7: 1,
      // 第九个table
      goodList8: [],
      loading8: false,
      finished8: false,
      page8: 1,
      // 第九个table
      goodList9: [],
      loading9: false,
      finished9: false,
      page9: 1,
      title: "", //导航栏title
      commission_show: false, // 佣金弹出框展示
      commissionInfo: [], //佣金弹出框信息
      auditStatus: "", // 代理人状态 2 审核通过
      commissionGoodName: "", //佣金弹出框的产品名称
      CommissionSwitch: false // 佣金开关（是否展示佣金）
    };
  },
  mounted() {
    var that = this;
    this.activeName = String(this.$route.query.titleIndex);
    // 导航栏底部条根据文字改变  这里必须使用延时器不然样式添加不上。
    setTimeout(() => {
      if (this.activeName == 0) {
        $(".class-list .productList .van-tabs__line").css("width", "0.9rem");
      } else {
        $(".class-list .productList .van-tabs__line").css("width", "1.3rem");
      }
    }, 100);

    // 获取用户信息，判断是否是代理人
    var params = this.sign({
      userId: this.getCookie("ZB_JUSER_Mid")
    });
    api.queryPersonalInfo(params).then(res => {
      if (res.code == 20000) {
        try {
          that.auditStatus = res.data.agentInfo.auditStatus;
          that.CommissionSwitch =
            res.data.agentInfo.goodsStatus == 1 ? true : false;
        } catch (error) {
          console.log("改用户无代理人信息");
        }
      }
    });
  },
  methods: {
    // 佣金展示
    commissionShow(event, data, goodName) {
      this.commissionInfo = data;
      this.commissionGoodName = goodName;
      // 阻止事件冒泡
      event.stopPropagation();
      this.commission_show = true;
    },
    // 开发中
    developMsg: function() {
      this.$toast({
        message: "正在开发，敬请期待!"
      });
    },
    // 下拉刷新
    onRefresh() {
      var that = this;
      if (this.title == "" || this.title == "全部") {
        this.value = "";
        this.goodList = [];
        this.page = 1;
        this.onLoad(this.refresh);
      } else if (this.title == "旅游险") {
        this.goodList1 = [];
        this.page1 = 1;
        this.onLoad1(this.refresh);
      } else if (this.title == "意外险") {
        this.goodList2 = [];
        this.page2 = 1;
        this.onLoad2(this.refresh);
      } else if (this.title == "健康险") {
        this.goodList3 = [];
        this.page3 = 1;
        this.onLoad3(this.refresh);
      } else if (this.title == "人寿险") {
        this.goodList4 = [];
        this.page4 = 1;
        this.onLoad4(this.refresh);
      } else if (this.title == "团体险") {
        this.goodList5 = [];
        this.page5 = 1;
        this.onLoad5(this.refresh);
      } else if (this.title == "财产险") {
        this.goodList6 = [];
        this.page6 = 1;
        this.onLoad6(this.refresh);
      } else if (this.title == "车辆险") {
        this.goodList7 = [];
        this.page7 = 1;
        this.onLoad7(this.refresh);
      } else if (this.title == "理财险") {
        this.goodList8 = [];
        this.page8 = 1;
        this.onLoad8(this.refresh);
      } else if (this.title == "行业类") {
        this.goodList9 = [];
        this.page9 = 1;
        this.onLoad9(this.refresh);
      }
    },
    refresh() {
      // this.$toast("刷新成功");
      this.isLoading = false;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onSearch: function() {
      this.activeName = 1; //选中第几个tab，默认搜索选中全部
      this.goodList = [];
      this.page = 1;
      this.onLoad();
    },
    goDetail(id) {
      this.$router.push({ path: "/productdetail", query: { productId: id } });
    },
    // 这里chang事件，是为了监听 滑动屏幕切换导航栏 的回调。
    onChange(name, title) {
      this.title = title;
      if (this.title == "行业类") {
        this.$router.push("IndustryClass");
      }
      // 导航栏底部条根据文字改变  这里必须使用延时器不然样式添加不上（不晓得什么原因，有可能是因为dom渲染延迟什么的 使用 this.$nextTick 没用）。
      setTimeout(() => {
        if (this.title.length == 2) {
          $(".class-list .productList .van-tabs__line").css("width", "0.9rem");
        } else if (this.title.length == 3) {
          $(".class-list .productList .van-tabs__line").css("width", "1.3rem");
        }
      }, 100);
    },
    // 点击 切换导航栏回调
    onClick(name, title) {
      // 这里单独写点击事件，是为了实现 点击全部导航栏的时候，重载列表 title置空是因为 传参时全部导航栏 传的值为 空
      this.value = "";
      var that = this;
      // 导航栏title
      this.title = title;
      if (this.title == "全部") {
        this.title = "";
        this.loading = true;
        this.goodList = [];
        this.page = 1;
        this.finished = false;
        if (this.allDataShow == false) {
          this.allDataShow = true;
          this.onLoad();
        }
        // 单独判断行业类导航栏，跳转行业类页面。
      } else if (this.title == "行业类") {
        this.$router.push("IndustryClass");
      }
      // 导航栏底部条根据文字改变  这里必须使用延时器不然样式添加不上（不晓得什么原因，有可能是因为dom渲染延迟什么的 使用 this.$nextTick 没用）。
      setTimeout(() => {
        if (this.title.length == 0) {
          $(".class-list .productList .van-tabs__line").css("width", "0.9rem");
        } else if (this.title.length == 3) {
          $(".class-list .productList .van-tabs__line").css("width", "1.3rem");
        }
      }, 100);
    },
    onLoad(isLoad) {
      // 异步更新数据
      var args = this.sign({
        classTag: "",
        currentPage: this.page,
        goodName: this.value
      });
      var that = this;
      api.getGoodList(args).then(res => {
        // 关闭下拉刷新动画
        if (isLoad) {
          isLoad();
        }
        // 全部列表是否加载完毕
        that.finished = false;
        // 加载状态结束
        that.loading = false;
        // 数据全部加载完成
        if (res.data.pages < that.page || res.data.pages == 0) {
          that.finished = true;
        } else {
          that.goodList = that.goodList.concat(res.data.list);
          that.allDataShow = false;
        }
        this.page++;
      });
    },
    onLoad1(isLoad) {
      // 异步更新数据
      var args = this.sign({ classTag: "旅游险", currentPage: this.page1 });
      var that = this;
      api.getGoodList(args).then(res => {
        if (isLoad) {
          isLoad();
        }
        // 旅游险列表是否全部加载完毕
        that.finished1 = false;
        // 加载状态结束
        that.loading1 = false;
        // 数据全部加载完成
        if (res.data.pages < that.page1 || res.data.pages == 0) {
          that.finished1 = true;
        } else {
          that.goodList1 = that.goodList1.concat(res.data.list);
        }
        this.page1++;
      });
    },
    onLoad2(isLoad) {
      // 异步更新数据
      var args = this.sign({ classTag: "意外险", currentPage: this.page2 });
      var that = this;
      api.getGoodList(args).then(res => {
        if (isLoad) {
          isLoad();
        }
        // 意外险列表是否加载完毕
        that.finished2 = false;
        // 加载状态结束
        that.loading2 = false;
        // 数据全部加载完成
        if (res.data.pages < that.page2 || res.data.pages == 0) {
          that.finished2 = true;
        } else {
          that.goodList2 = that.goodList2.concat(res.data.list);
        }
        this.page2++;
      });
    },
    onLoad3(isLoad) {
      // 异步更新数据
      var args = this.sign({ classTag: "健康险", currentPage: this.page3 });
      var that = this;
      api.getGoodList(args).then(res => {
        if (isLoad) {
          isLoad();
        }
        // 健康险列表是否加载完毕
        that.finished3 = false;
        // 加载状态结束
        that.loading3 = false;
        // 数据全部加载完成
        if (res.data.pages < that.page3 || res.data.pages == 0) {
          that.finished3 = true;
        } else {
          that.goodList3 = that.goodList3.concat(res.data.list);
        }
        this.page3++;
      });
    },
    onLoad4(isLoad) {
      // 异步更新数据
      var args = this.sign({ classTag: "人寿险", currentPage: this.page4 });
      var that = this;
      api.getGoodList(args).then(res => {
        if (isLoad) {
          isLoad();
        }
        // 人寿险是否加载完毕
        that.finished4 = false;
        // 加载状态结束
        that.loading4 = false;
        // 数据全部加载完成
        if (res.data.pages < that.page4 || res.data.pages == 0) {
          that.finished4 = true;
        } else {
          that.goodList4 = that.goodList4.concat(res.data.list);
        }
        this.page4++;
      });
    },
    onLoad5(isLoad) {
      // 异步更新数据
      var args = this.sign({ classTag: "团体险", currentPage: this.page5 });
      var that = this;
      api.getGoodList(args).then(res => {
        if (isLoad) {
          isLoad();
        }
        // 团体险是否加载完毕
        that.finished5 = false;
        // 加载状态结束
        that.loading5 = false;
        if (res.data.pages < that.page5 || res.data.pages == 0) {
          that.finished5 = true;
        } else {
          that.goodList5 = that.goodList5.concat(res.data.list);
        }
        this.page5++;
      });
    },
    onLoad6(isLoad) {
      // 异步更新数据
      var args = this.sign({ classTag: "财产险", currentPage: this.page6 });
      var that = this;
      api.getGoodList(args).then(res => {
        if (isLoad) {
          isLoad();
        }
        // 财产险是否加载完毕
        that.finished6 = false;
        // 加载状态结束
        that.loading6 = false;
        if (res.data.pages < that.page6 || res.data.pages == 0) {
          that.finished6 = true;
        } else {
          that.goodList6 = that.goodList6.concat(res.data.list);
        }
        this.page6++;
      });
    },
    onLoad7(isLoad) {
      // 异步更新数据
      var args = this.sign({ classTag: "车辆险", currentPage: this.page7 });
      var that = this;
      api.getGoodList(args).then(res => {
        if (isLoad) {
          isLoad();
        }
        // 车辆险是否加载完毕
        that.finished7 = false;
        // 加载状态结束
      that.loading7 = false;
        // 数据全部加载完成
        if (res.data.pages < that.page7 || res.data.pages == 0) {
          that.finished7 = true;
        } else {
          that.goodList7 = that.goodList7.concat(res.data.list);
        }
        this.page7++;
      });
    },
    onLoad8(isLoad) {
      // 异步更新数据
      var args = this.sign({ classTag: "理财险", currentPage: this.page8 });
      var that = this;
      api.getGoodList(args).then(res => {
        if (isLoad) {
          isLoad();
        }
        // 理财险是否加载完毕
        that.finished8 = false;
        // 加载状态结束
        that.loading8 = false;
        // 数据全部加载完成
        if (res.data.pages <= that.page8 || res.data.pages == 0) {
          that.finished8 = true;
        } else {
          that.goodList8 = that.goodList8.concat(res.data.list);
        }
        this.page8++;
      });
    },
    onLoad9(isLoad) {
      // 异步更新数据
      var args = this.sign({ classTag: "行业类", currentPage: this.page9 });
      var that = this;
      api.getGoodList(args).then(res => {
        if (isLoad) {
          isLoad();
        }
        // 行业类是否加载完毕
        that.finished9 = false;
        // 加载状态结束
        that.loading9 = false;
        // 数据全部加载完成
        if (res.data.pages < that.page9 || res.data.pages == 0) {
          that.finished9 = true;
        } else {
          that.goodList9 = that.goodList9.concat(res.data.list);
        }
        this.page9++;
      });
    }
  }
};
</script>

<style lang="scss">
.class-list {
  background: #fff;
  .van-tab {
    color: #666;
    z-index: 11;
  }
  .van-tab::after {
    display: none;
  }
  input[type="search"] {
    font-size: 24px;
  }
  .searchBtn {
    width: 100px;
    height: 62px;
    background: #38a4ff;
    line-height: 62px;
    text-align: center;
    border-radius: 30px;
    color: #fff;
    font-size: 24px;
    -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  }
  .van-tab--active span {
    font-weight: 700 !important;
    font-size: 30px;
    color: #333;
  }
  .van-hairline--top-bottom::after {
    border: none !important;
  }
  .productList {
    .van-search__action {
      padding: 0;
      padding-left: 26px;
      padding-right: 14px;
      -webkit-tap-highlight-color: transparent;
      background-color: #fff;
    }
    .van-search__content {
      flex: 0.98;
    }
    height: 100%;
    .van-tabs__line {
      background: linear-gradient(150deg, #60cffa, #38a4ff);
      bottom: 28px !important; /*no*/
      height: 10px;
      width: 0.9rem;
    }
    .classBox ul li {
      display: inline-block;
      width: 100%;
      padding: 44px 30px;
      border-bottom: 1px solid #eee;
      .leftDiv {
        width: 27%;
        float: left;
        .van-image {
          min-height: 2.08rem;
        }
        img {
          min-height: 2.08rem;
        }
        .van-image__img {
          border-radius: 10px 10px 0px 0px;
        }
        span {
          display: block;
          text-align: center;
          background: #f6f6f6;
          border-radius: 0px 0px 10px 10px;
          height: 0.72rem;
          line-height: 0.72rem;
          color: #333;
          font-size: 0.32rem;
          // margin-top: 156px;
          width: 100%;
          font-weight: 600;
          // 溢出一点表示
          display: -webkit-box;
          display: -moz-box;
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      }
      .rightDiv {
        position: relative;
        display: inline-block;
        width: 68%;
        // min-height: 3rem;
        margin-left: 4%;
        .right_one {
          margin-top: 5px;
          line-height: 44px;
          font-weight: 700;
          font-size: 32px;
          display: -webkit-box;
          display: -moz-box;
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .right_two {
          min-height: 80px;
          margin: 10px 0;
          color: #666;
          display: -webkit-box;
          display: -moz-box;
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: 26px !important;
          height: auto;
          line-height: 36px;
          li {
            padding: 0;
          }
          p {
            height: auto;
            display: -webkit-box;
            display: -moz-box;
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            font-size: 26px;
            span {
              font-size: 0.373333rem !important;
            }
            img {
              width: 25px;
              vertical-align: middle;
              margin-top: -2px;
              margin-right: 5px;
            }
          }
        }
        .right_three {
          font-size: 24px;
          display: flow-root;
          height: 48px;
          line-height: 48px;
          // position: absolute;
          // bottom: 0;
          // width: 100%;
          .minFee {
            color: #fb8400;
            font-weight: bold;
            float: left;
            font-size: 30px;
          }
          .commission {
            font-size: 25px;
            float: right;
            color: #fb8400;
          }
          .saleVolume {
            color: #999999;
            float: right;
            font-size: 22px;
          }
        }
      }
    }
    .classBox ul li:nth-child(1) {
      padding-top: 20px;
    }
  }
  .van-image {
    display: block;
  }
}
.CommissionNavVar {
  .van-nav-bar__title {
    max-width: 80%;
  }
}
</style>

