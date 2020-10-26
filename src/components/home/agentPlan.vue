<template>
  <div>
    <ul class="list-menu">
      <li>
        <router-link to="/agent">
          <img width="100%" height="100%" :src="agentImg" />
          <div class="menu_one">
            <p>代理人</p>
            <ul>
              <li>
                <i>●</i>推广赚取
              </li>
              <li>
                <i>●</i>高额佣金
              </li>
            </ul>
          </div>
        </router-link>
      </li>
      <li @click="waitDev">
        <img width="100%" height="100%" :src="planImg" />
        <div class="menu_two">
          <p>计划书</p>
          <ul>
            <li>
              <i>●</i>定制专属
            </li>
            <li>
              <i>●</i>保险计划
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div class="buy_list">
      <div>
        <img src="@/assets/images/home/bxnew.png" alt />

        <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
          <!-- :autoplay="3000" -->
          <van-swipe-item v-for="(item) in articleArr" :key="item.id">
            <router-link :to="{name:'indexArticle',query:{articleId:item.id}}">
              <span style="color: #666;">{{item.title}}</span>
            </router-link>
          </van-swipe-item>
        </van-swipe>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="colorBlock"></div>
  </div>
</template>
<script>
import api from "@/fetch/api";
export default {
  name: "list-menu",
  data() {
    return {
      agentImg: require("@/assets/images/home/agentload.png"),
      planImg: require("@/assets/images/home/planload.png"),
      bxnew: require("@/assets/images/home/bxnew.png"),
      articleArr: []
    };
  },
  mounted() {
    var args = this.sign({ cateval: "30" });
    api.getArticleDetail(args).then(res => {
      this.articleArr = res.data.filter(data => {
        console.log(data.advertisingType);
        return data.advertisingType == "H5头条";
      });
    });
  },
  methods: {
    waitDev() {
      this.Toast("功能正在开发中，敬请期待");
    }
  }
};
</script>
<style lang="scss">
.list-menu {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 36px 33px;
  padding-bottom: 25px;
  overflow: hidden;
  li {
    width: 49%;
    position: relative;
    a {
      display: inline-block;
      height: 100%;
      width: 100%;
    }
    .menu_one,
    .menu_two {
      position: absolute;
      left: 35px;
      top: 24px;
      p {
        font-size: 32px;
        font-family: "PingFang";
        font-weight: 800;
        color: #333;
        width: 160px;
        padding: 0;
      }
      ul {
        margin-top: 16px;
        margin-left: 0.1rem;
        li {
          margin: 0;
          width: 160px;
          color: #333;
          font-size: 22px;
          font-family: "PingFang-SC-Medium";
          line-height: 34px;
          i {
            margin-right: 8px;
            color: #8f8a8a;
            font-size: 20px;
            position: relative;
            bottom: 2px;
          }
        }
      }
    }
  }
}
.buy_list {
  & > div {
    overflow: hidden;
    margin: 0px 30px 25px;
    & > img {
      width: 18%;
      vertical-align: middle;
      margin-top: 0.07rem;
      float: left;
    }

    .notice-swipe {
      width: 70%;
      height: 20PX;
      line-height: 20PX;
      display: inline-block;
      border-left: solid 1PX rgba(221, 221, 221, 1);
      margin-left: 3%;
      padding-left: 3%;
      .van-swipe-item {
        height: 20PX !important;
        line-height: 20PX !important;
      }
      a {
        & > span {
          font-size: 28px;
          height: 20PX;
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
    }
    .van-icon {
      float: right;
    }
    .van-icon-arrow:before {
      margin-top: 3px;
      vertical-align: middle;
    }
  }
  .van-image {
    vertical-align: bottom;
    border-right: 1px solid #ccc;
    padding-right: 10px;
  }
  .van-cell {
    padding: 20px 16px;
  }
  .van-cell__title {
    flex: 1;
    text-align: center;
    span {
      color: #f29230;
      font-size: 24px;
    }
  }
  .van-cell__value {
    flex: 4;
    line-height: 64px;
    font-size: 28px;
    text-align: left;
    text-indent: 0.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .van-cell__right-icon {
    margin-top: 8px;
  }
  .van-tag--danger {
    background-color: #fff;
    padding: 16px;
    font-size: 24px;
    border-radius: 0;
    font-family: "PingFang SC";
    font-weight: 500;
    color: #f29230;
  }
  .van-tag--normal {
    background-color: #8080ff;
    padding: 16px;
    font-size: 24px;
    border-radius: 0;
    font-family: "PingFang SC";
    font-weight: 500;
    color: #fdfdfe;
  }
}
.colorBlock {
  height: 20px;
  background: #f5f5f5;
}
</style>