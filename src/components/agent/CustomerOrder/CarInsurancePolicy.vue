<!-- 组件说明: 历史保单微商城数据 -->
<template>
  <div class="CarInsurancePolicy">
    <van-tabs
      v-model="active"
      color="rgba(0, 140, 255, 1)"
      title-active-color="rgba(0, 140, 255, 1)"
      :sticky="true"
      :swipeable="true"
      :swipe-threshold="5"
    >
      <van-tab title="全部">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ul class="policylist">
              <li v-for="(item,index) in list" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <div>
                    <img :src="$store.state.baseImagePath + item.brandImgUrl" alt />
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
                </p>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="即将生效">
        <van-pull-refresh v-model="refreshing1" @refresh="onRefresh1">
          <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1">
            <ul class="policylist">
              <li v-for="(item,index) in list1" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <div>
                    <img :src="$store.state.baseImagePath + item.brandImgUrl" alt />
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
                </p>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="已生效">
        <van-pull-refresh v-model="refreshing2" @refresh="onRefresh2">
          <van-list v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="onLoad2">
            <ul class="policylist">
              <li v-for="(item,index) in list2" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <div>
                    <img :src="$store.state.baseImagePath + item.brandImgUrl" alt />
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
                </p>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="即将到期">
        <van-pull-refresh v-model="refreshing3" @refresh="onRefresh3">
          <van-list v-model="loading3" :finished="finished3" finished-text="没有更多了" @load="onLoad3">
            <ul class="policylist">
              <li v-for="(item,index) in list3" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <div>
                    <img :src="$store.state.baseImagePath + item.brandImgUrl" alt />
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
                </p>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="已到期">
        <van-pull-refresh v-model="refreshing4" @refresh="onRefresh4">
          <van-list v-model="loading4" :finished="finished4" finished-text="没有更多了" @load="onLoad4">
            <ul class="policylist">
              <li v-for="(item,index) in list4" :key="index">
                <p></p>
                <div class="lineHeight"></div>
                <div class="coverImg">
                  <div>
                    <img :src="$store.state.baseImagePath + item.brandImgUrl" alt />
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
                </p>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from "@/fetch/api";
export default {
  name: "CarInsurancePolicy",
  components: {},
  data() {
    return {
      policyType: 3, //（1：个险2：行业：3车险）
      active: 0, //默认展示第几个tab
      // 全部
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      // 即将生效
      list1: [],
      loading1: false,
      finished1: false,
      refreshing1: false,
      // 已生效
      list2: [],
      loading2: false,
      finished2: false,
      refreshing2: false,
      // 即将到期
      list3: [],
      loading3: false,
      finished3: false,
      refreshing3: false,
      // 已到期
      list4: [],
      loading4: false,
      finished4: false,
      refreshing4: false
    };
  },
  computed: {},
  methods: {
    onLoad() {
      var that = this;
      this.getOrderList(4, function(data) {
        that.list = data;
        that.loading = false;
        console.log(that.list.length, data.length);
        if (that.list.length >= data.length) {
          that.finished = true;
        }
        console.log(data);
      },function(){
        that.loading = false;
        that.finished = true;
      });
    },
    onRefresh() {
      // 在下拉回调中 this.refreshing 会变成 true 这时清空数据,重新加载列表
      this.list = [];
      // 关闭加载状态
      this.refreshing = false;
      // 加载完毕状态改为false
      this.finished = false;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      // 重新加载数据
      this.onLoad();
    },
    // 即将生效
    onLoad1() {
      var that = this;
      this.getOrderList(1, function(data) {
        that.list1 = data;
        that.loading1 = false;
        console.log(that.list1.length, data.length);
        if (that.list1.length >= data.length) {
          that.finished1 = true;
        }
        console.log(data);
      },function(){
        that.loading1 = false;
        that.finished1 = true;
      });
    },
    onRefresh1() {
      // 在下拉回调中 this.refreshing 会变成 true 这时清空数据,重新加载列表
      this.list1 = [];
      // 关闭加载状态
      this.refreshing1 = false;
      // 加载完毕状态改为false
      this.finished1 = false;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading1 = true;
      // 重新加载数据
      this.onLoad1();
    },
    // 已生效
    onLoad2() {
      var that = this;
      this.getOrderList(0, function(data) {
        that.list2 = data;
        that.loading2 = false;
        console.log(that.list2.length, data.length);
        if (that.list2.length >= data.length) {
          that.finished2 = true;
        }
        console.log(data);
      },function(){
        that.loading2 = false;
        that.finished2 = true;
      });
    },
    onRefresh2() {
      // 在下拉回调中 this.refreshing 会变成 true 这时清空数据,重新加载列表
      this.list2 = [];
      // 关闭加载状态
      this.refreshing2 = false;
      // 加载完毕状态改为false
      this.finished2 = false;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading2 = true;
      // 重新加载数据
      this.onLoad2();
    },
    // 即将到期
    onLoad3() {
      var that = this;
      this.getOrderList(2, function(data) {
        that.list3 = data;
        that.loading3 = false;
        console.log(that.list3.length, data.length);
        if (that.list3.length >= data.length) {
          that.finished3 = true;
        }
        console.log(data);
      },function(){
        that.loading3 = false;
        that.finished3 = true;
      });
    },
    onRefresh3() {
      // 在下拉回调中 this.refreshing 会变成 true 这时清空数据,重新加载列表
      this.list3 = [];
      // 关闭加载状态
      this.refreshing3 = false;
      // 加载完毕状态改为false
      this.finished3 = false;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading3 = true;
      // 重新加载数据
      this.onLoad3();
    },
    // 已到期
    onLoad4() {
      var that = this;
      this.getOrderList(3, function(data) {
        that.list4 = data;
        that.loading4 = false;
        console.log(that.list4.length, data.length);
        if (that.list4.length >= data.length) {
          that.finished4 = true;
        }
        console.log(data);
      },function(){
        that.loading4 = false;
        that.finished4 = true;
      });
    },
    onRefresh4() {
      // 在下拉回调中 this.refreshing 会变成 true 这时清空数据,重新加载列表
      this.list4 = [];
      // 关闭加载状态
      this.refreshing4 = false;
      // 加载完毕状态改为false
      this.finished4 = false;
      // 将 loading 设置为 true，表示处于加载状态
      this.loading4 = true;
      // 重新加载数据
      this.onLoad4();
    },
    // 获取保单数据
    getOrderList(policyValid, callBack,errorCallBack) {
      var that = this;
      var params = this.sign({
        sharerMid: this.getCookie("ZB_JUSER_Mid"),
        policyValid: policyValid, //（0:已经生效 1：未生效;2:即将到期;3:已到期;4:查询全部）
        policyType: this.policyType //（1：个险2：行业：3车险）
      });
      api.selectCustomerOrder(params).then(res => {
        if (res.code == 20000) {
          callBack(res.data);
        } else {
          that.Toast(res.message);
          errorCallBack();
        }
        // console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.CarInsurancePolicy {
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
</style>