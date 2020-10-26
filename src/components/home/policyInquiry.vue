<!-- 组件说明 保单管理-->
<template>
  <div class="policyInquiry">
    <van-nav-bar title="保单管理" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <!-- right-text="记录" -->
      <!-- <van-icon name="share" slot="right" /> -->
    </van-nav-bar>
    <div class="queryKey">
      <ul>
        <li>
          <span>姓名</span>
          <span>
            <input type="text" placeholder="请输入被保险人真实姓名" class="name" />
          </span>
        </li>
        <li>
          <span>证件号码</span>
          <span>
            <input type="text" placeholder="请输入被保险人身份证号或护照号或军官证号" class="code" />
          </span>
        </li>
      </ul>
      <div class="warmPrompt">
        <p>温馨提示：</p>
        <p>本保单查询功能仅支持根据被保险人身份信息查询其名下保单详情。若需查询投保人保单，请前往<span>“我的保单”</span>页面查询。</p>
      </div>
      <input type="button" value="查询" class="queryBtn" @click="query()" />
    </div>
    <!-- 查询结果 -->
    <div class="queryResults">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul v-for="(item,index) in list" :key="index">
          <li>
            <span>产品名称</span>
            <span>{{item.goodName}}</span>
          </li>
          <li>
            <span>保单号</span>
            <span>{{item.policyNo}}</span>
          </li>
          <li>
            <span>投保时间</span>
            <span>{{item.insuredTime}}</span>
          </li>
          <li>
            <span>起保时间</span>
            <span>{{item.startTime}}</span>
          </li>
          <li>
            <span>失效时间</span>
            <span>{{item.endTime}}</span>
          </li>
          <li>
            <span>投保人</span>
            <span>{{item.holderName}}</span>
          </li>
          <li>
            <span>被保险人</span>
            <span>{{item.insuredName}}</span>
          </li>
          <li>
            <span>证件号</span>
            <span>{{item.iCertificateNo}}</span>
          </li>
        </ul>
      </van-list>
    </div>
    <!-- 小球 -->
    <div class="globule">
      <router-link to="/mine">
        <div>
          <p>我的</p>
          <p>保单</p>
        </div>
      </router-link>
    </div>
    <!-- 弹出遮罩层 -->
    <van-popup v-model="loadingShow" :lock-scroll="false" style="background-color: transparent;" :close-on-click-overlay="false">
        <!-- 加载动画 -->
        <van-loading size="24px" vertical color="#1989fa">数据加载中...</van-loading>
    </van-popup>
  </div>
</template>

<script>
import api from "@/fetch/api";
import md5 from "js-md5";
import $ from "jquery";

export default {
  components: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      data: "", //查询所有数据
      page: 0, //第几页
      loadingShow: false //加载动画是否显示
    };
  },
  computed: {},
  mounted() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    onClickRight() {
      this.$router.push({ path: "/record" });
    },
    // 查询
    query() {
      var that = this;
      // 每次查询默认回到第一页
      this.page = 0;
      that.list = [];
      var name = $(".name").val();
      var code = $(".code").val();
      if (name == "") {
        this.Toast("请输入真实姓名");
      } else if (code == "") {
        this.Toast("请输入身份证号或护照号或军官证号");
      } else {
        that.loadingShow = true;
        var args = this.sign({
          insuredName: name,
          iCertificateNo: code,
          mId: that.getCookie("ZB_JUSER_Mid")
        });
        // this.$axios.post("/brg/openapi/h5/personalCenter/queryPolicy", args).then(res => {
        api
          .queryPolicy(args)
          .then(
            res => {
              var response = res;
              that.loadingShow = false;
              if (response.code == 20000) {
                that.data = response.data;
                that.finished = false;
              } else {
                that.Toast(response.message);
              }
            },
            err => {
              that.finished = false;
            }
          )
          .catch(err => {
            that.finished = false;
          });
      }
    },
    onLoad() {
      setTimeout(() => {
        // 异步更新数据
        for (var i = (this.page * 3); i < this.data.length; i++) {
          if (i < (this.page + 1) * 3) {
            this.list.push(this.data[i]);
          }
        };
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (
          this.data.length == this.list.length ||
          this.data.length < this.list.length
        ) {
          this.finished = true;
        }
        this.page++;
      }, 300);
    }
  }
};
</script>

<style lang='scss'>
.policyInquiry {
  background: #fff;
  .queryKey {
    ul {
      li {
        height: 100px;
        line-height: 100px;
        border-bottom: 1px solid #ddd;
        span:nth-child(1) {
          margin-left: 30px;
          width: 120px;
          display: inline-block;
        }
        span:nth-child(2) {
          margin-left: 40px;
          width: 480px;
          display: inline-block;
          input {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .queryBtn {
      width: 618px;
      height: 88px;
      border-radius: 50px;
      text-align: center;
      line-height: 88px;
      color: #fff;
      background: #f99a31;

      display: block;
      margin: 93px auto;
    }
  }
  .queryResults {
    ul {
      border-top: 2px solid #ddd;
      margin-top: 20px;
      li:nth-child(1) {
        background-color: #f7f7f7;
        font-weight: bold;
        span:nth-child(1) {
          font-weight: bold;
          color: #0c0c0c;
          box-sizing: border-box;
          width: 32%;
          margin: 0;
          padding-left: 30px;
          display: block;
          float: left;
        }
        span:nth-child(2) {
          display: inline-block;
          font-weight: bold;
          color: #333333;
          font-size: 28px;
          box-sizing: border-box;
          width: 66%;
          margin: 0;
          height: auto;
          // display: -webkit-box;
          // display: -moz-box;
          // white-space: pre-wrap;
          // word-wrap: break-word;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // -webkit-box-orient: vertical;
          // -webkit-line-clamp: 1;
          float: left;
        }
      }
      li {
        height: auto;
        padding: 15px 0;
        overflow: hidden;
        span:nth-child(1) {
          box-sizing: border-box;
          padding-left: 0.4rem;
          display: block;
          float: left;
          width: 32%;
        }
        span:nth-child(2) {
          display: inline-block;
          box-sizing: border-box;
          width: 66%;
          margin: 0;
          word-wrap: break-word;
          word-break: break-all;
          overflow: hidden;
        }
      }
    }
  }
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
  .warmPrompt{
    padding: 40px 20px;
    p:nth-of-type(1){
      font-size: 24px;
    }
     p:nth-of-type(2){
      font-size: 24px;
      color: #999999;
      margin-top: 5px;
      span{
        color: red;
      }
    }
  }
}
</style>