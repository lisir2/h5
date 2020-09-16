<!-- 组件说明 -->
<template>
  <div class="AgentTeam">
    <van-nav-bar title="我的团队成员" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-tabs
      v-model="active"
      color="rgba(0, 140, 255, 1)"
      title-active-color="rgba(0, 140, 255, 1)"
      :sticky="true"
      :swipeable="true"
      animated
    >
      <van-tab title="一级会员">
        <van-pull-refresh v-model="refreshingOne" @refresh="onRefreshOne">
          <van-list v-model="loadingOne" :finished="finishedOne" finished-text="没有更多了" @load="onLoadOne">
            <div v-for="(item,index) in TeamListOne" :key="index">
              <div class="colorBlock"></div>
              <div class="teamInfo">
                <div>
                  <img src="../../assets/images/mine/headimg.png" alt class="teamHead" />
                  <div class="teamPhone">
                    <p>{{item.uName}}</p>
                    <p>{{item.agentName}}</p>
                  </div>
                </div>
                <div class="regTime">
                  注册时间：
                  <span>{{item.regTime.split(' ')[0]}}</span>
                </div>
              </div>
              <div class="teamCommission">
                <div>
                  <p>{{item.actualPayment}}</p>
                  <p>累计保费</p>
                </div>
                <div>
                  <p>{{item.commissionPayment}}</p>
                  <p>提供佣金</p>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="二级会员">
        <van-pull-refresh v-model="refreshingTwo" @refresh="onRefreshTwo">
          <van-list v-model="loadingTwo" :finished="finishedTwo" finished-text="没有更多了" @load="onLoadTwo">
            <div v-for="(item,index) in TeamListTwo" :key="index">
              <div class="colorBlock"></div>
              <div class="teamInfo">
                <div>
                  <img src="../../assets/images/mine/headimg.png" alt class="teamHead" />
                  <div class="teamPhone">
                    <p>{{item.uName}}</p>
                    <p>{{item.agentName}}</p>
                  </div>
                </div>
                <div class="regTime">
                  注册时间：
                  <span>{{item.regTime.split(' ')[0]}}</span>
                </div>
              </div>
              <div class="teamCommission">
                <div>
                  <p>{{item.actualPayment}}</p>
                  <p>累计保费</p>
                </div>
                <div>
                  <p>{{item.commissionPayment}}</p>
                  <p>提供佣金</p>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="三级会员">
        <van-pull-refresh v-model="refreshingThree" @refresh="onRefreshThree">
          <van-list v-model="loadingThree" :finished="finishedThree" finished-text="没有更多了" @load="onLoadThree">
            <div v-for="(item,index) in TeamListThree" :key="index">
              <div class="colorBlock"></div>
              <div class="teamInfo">
                <div>
                  <img src="../../assets/images/mine/headimg.png" alt class="teamHead" />
                  <div class="teamPhone">
                    <p>{{item.uName}}</p>
                    <p>{{item.agentName}}</p>
                  </div>
                </div>
                <div class="regTime">
                  注册时间：
                  <span>{{item.regTime.split(' ')[0]}}</span>
                </div>
              </div>
              <div class="teamCommission">
                <div>
                  <p>{{item.actualPayment}}</p>
                  <p>累计保费</p>
                </div>
                <div>
                  <p>{{item.commissionPayment}}</p>
                  <p>提供佣金</p>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from "@/fetch/api";
export default {
  name: "AgentTeam",
  components: {},
  data() {
    return {
      active: 0, //默认展示第几个tab
      TeamListOne: [], // 一级会员列表
      TeamListTwo: [], // 二级会员列表
      TeamListThree: [], // 三级会员列表
      loadingOne: false, // 一级会员加载状态
      finishedOne: false,  // 一级会员是否加载完毕
      refreshingOne: false, // 一级会员下拉加载状态
      loadingTwo: false, // 二级会员加载状态
      finishedTwo: false,  // 二级会员是否加载完毕
      refreshingTwo: false, // 二级会员下拉加载状态
      loadingThree: false, // 二级会员加载状态
      finishedThree: false,  // 二级会员是否加载完毕
      refreshingThree: false // 二级会员下拉加载状态
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    /**
     * 加载一级会员列表
     * closeRefreshing 是否关闭当前列表的下拉加载
     */
    onLoadOne(closeRefreshing) {
      var params = this.sign({
        mId: this.getCookie("ZB_JUSER_Mid")
      });
      // 我的团队
      api.queryMyTeam(params).then(res => {
        if (res.code == 20000) {
          this.TeamListOne = res.data.teamOne;
          this.loadingOne = false;
          this.finishedOne = true;
          if(closeRefreshing){
            this.refreshingOne = false;
          };
        }
      });
    },
    // 一级会员下拉刷新
    onRefreshOne() {
      // 清空列表数据
      this.TeamListOne = [];
      this.finishedOne = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loadingOne = true;
      this.onLoadOne(true);
    },
    /**
     * 加载二级会员列表
     * closeRefreshing 是否关闭当前列表的下拉加载
     */
    onLoadTwo(closeRefreshing) {
      var params = this.sign({
        mId: this.getCookie("ZB_JUSER_Mid")
      });
      // 我的团队
      api.queryMyTeam(params).then(res => {
        if (res.code == 20000) {
          this.TeamListTwo = res.data.teamTwo;
          this.loadingTwo = false;
          this.finishedTwo = true;
          if(closeRefreshing){
            this.refreshingTwo = false;
          };
        }
      });
    },
    // 二级会员下拉刷新
    onRefreshTwo() {
      // 清空列表数据
      this.TeamListTwo = [];
      this.finishedTwo = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loadingTwo = true;
      this.onLoadTwo(true);
    },
    /**
     * 加载三级会员列表
     * closeRefreshing 是否关闭当前列表的下拉加载
     */
    onLoadThree(closeRefreshing) {
      var params = this.sign({
        mId: this.getCookie("ZB_JUSER_Mid")
      });
      // 我的团队
      api.queryMyTeam(params).then(res => {
        if (res.code == 20000) {
          this.TeamListThree = res.data.teamThree;
          this.loadingThree = false;
          this.finishedThree = true;
          if(closeRefreshing){
            this.refreshingThree = false;
          };
        }
      });
    },
    // 三级会员下拉刷新
    onRefreshThree() {
      // 清空列表数据
      this.TeamListThree = [];
      this.finishedThree = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loadingThree = true;
      this.onLoadThree(true);
    },
  }
};
</script>

<style lang="scss" scoped>
.AgentTeam {
  background-color: #F7F7F7;
  position: absolute;
  width: 100%;
  height: 100%;
  .teamInfo,
  .teamCommission {
    background-color: white;
    height: 150px;
    padding: 20px 0;
    display: flex;
    justify-content: space-around;
    img {
      width: 100px;
      border: solid 2px #dddddd;
      border-radius: 50%;
    }
  }
  .teamInfo {
    border-bottom: solid 2px #dddddd;
    font-size: 28px;
    .regTime {
      color: #999999;
      font-size: 24px;
      padding-top: 15px;
    }
    .teamHead {
      float: left;
    }
    .teamPhone {
      float: left;
      margin-left: 15px;
      margin-top: 15px;
    }
  }
  .teamCommission {
    div {
      text-align: center;
      p:nth-of-type(1) {
        color: #ff8400;
        font-size: 36px;
        padding: 10px 0;
      }
      p:nth-of-type(2) {
        font-size: 28px;
      }
    }
  }
  .colorBlock {
    display: block;
    height: 20px;
    background-color: rgb(245, 245, 245);
  }
}
</style>