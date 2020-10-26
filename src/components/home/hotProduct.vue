<template>
  <div class="hot-menu">
    <!-- <p class="title">精品热卖</p> -->
    <div class="sameTitle">
      <span class="leftB"></span>
      <p class="titleA">精品热卖</p>
      <!-- <van-cell is-link to="/classlist" value="更多" /> -->
      <i @click="more" to="/classlist">更多<van-icon name="arrow" /></i>
    </div>
    <!-- <span class="leftB"></span>
    <van-cell title="精品热卖" value="更多" to="/classlist"/>-->
    <!-- <ul class="hotlist">
            <li v-on:click="showHot(1)" v-bind:class='{actived:1==faceValue}'>旅游出行</li> 
            <li v-on:click="showHot(2)" v-bind:class='{actived:2==faceValue}'>女性专属</li> 
            <li v-on:click="showHot(3)" v-bind:class='{actived:3==faceValue}'>少儿保障</li> 
            <li v-on:click="showHot(4)" v-bind:class='{actived:4==faceValue}'>家庭保障</li> 
    </ul>-->
    <van-tabs v-model="activeName" animated border>
      <van-tab v-for="(items,index) in tabs" :key="items.id">
        <div class="tab-title" slot="title"  @click="tabChange(items.title,index)">{{ items.title }}</div>
        <div class="tab-content">
          <div class="mainBox">
            <ul>
              <li v-for="item in items.content" :key="item.id" @click="goDetail(item.id)">
                <div class="leftDiv">
                  <van-image
                    width="2.375rem"
                    height="2.08rem"
                    lazy-load
                    :src="imgCommonPath +item.goodSmallImg"
                  />
                  <span>{{item.goodInsuranceCompanyAlias}}</span>
                </div>
                <div class="rightDiv">
                  <p class="right_one">{{item.goodName}}</p>
                  <p class="right_two" v-html="item.goodListPromotionalCopy" style="color: #666;"></p>
                  <p class="right_three">
                    <span class="minFee">
                      ￥{{item.minFee}}<span>起</span>
                    </span>
                    <!-- <span class="saleVolume" style="color:#999999">已售{{item.goodSalesVolume}}份</span> -->
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <div class="colorBlock"></div>
  </div>
</template>
<script>
import $ from "jquery";
import "vant/lib/index.css";
import api from "@/fetch/api";
import { Toast } from "vant";
export default {
  name: "hot-menu",
  data() {
    return {
      imgCommonPath: this.$store.state.baseImagePath,
      activeName: "a",
      correList: "",
      // activeName: 'a',
      items: [],
      tabs: [
        {
          id: "1",
          title: "旅游出行",
          content: ""
        },
        {
          id: "2",
          title: "女性专属",
          content: ""
        },
        {
          id: "3",
          title: "少儿保障",
          content: ""
        },
        {
          id: "4",
          title: "家庭保障",
          content: ""
        }
      ],
      goodList: ""
    };
  },
  mounted() {
    // 异步更新数据
    var args = this.sign({ classTag: "旅游出行", currentPage: 1 });
    var this_ = this;
    // this.$axios.post('/brg/openapi/h5/product/getProdGoodsList',args).then(res => {
    api.getGoodList(args).then(res => {
      if (res.data) {
        this_.tabs[0].content = res.data.list.splice(0, 3);
      }
    });
  },
  methods: {
    tabChange(name, index) {
      var title = "";
      if (name == "旅游出行") {
        title = "旅游出行";
      } else if (name == "女性专属") {
        title = "女性专属";
      } else if (name == "少儿保障") {
        title = "少儿保障";
      } else if (name == "家庭保障") {
        title = "家庭保障";
      }
      var this_ = this;
      // 清空上一次产品展示数据
      this_.goodList = "";
      // 异步更新数据
      var args = this.sign({ classTag: title, currentPage: 1 });
      // this.$axios.post('/arg/h5/product/getProdGoodsList',args).then(res => {
      api.getGoodList(args).then(res => {
        if (this_.tabs[index].content == "") {
          if (res.data) {
            this_.tabs[index].content = res.data.list.splice(0, 3);
          }
        }
      });
    },
    more() {
      this.$router.push({ path: "/classlist" });
    }, //查看更多
    goDetail(id) {
      this.$router.push({ path: "/productdetail", query: { productId: id } });
    }
  }
};
</script>
<style lang="scss" >
.hot-menu .van-tab {
  display: flex;
  position: relative;
  z-index: 1 !important;
}
.van-ellipsis {
  width: 100%;
}
.hot-menu .van-tab::after {
  content: "";
  display: inline-block;
  width: 2px;
  height: 40px;
  background: rgba(221, 221, 221, 1);
  z-index: 0;
  position: absolute;
  top: 0px;
  bottom: 0px;
  margin: auto;
  right: 0;
}
.van-tab:nth-of-type(4)::after {
  // background-color: red;
  display: none;
}
.tab-title {
  color: #666;
  color: 26px;
  padding-left: 22px;
  padding-right: 22px;
}
.hot-menu {
  .sameTitle {
    padding: 38px 30px 15px;
    i {
      font-size: 26px;
      font-weight: 400;
      color: #666;
    }
  }
  .title {
    font-size: 32px;
    font-weight: bold;
    text-indent: 1em;
    padding: 20px 0;
  }
  [class*="van-hairline"]::after {
    border: 0;
  }
  .van-tabs__line {
    position: absolute;
    background-image: linear-gradient( #5dcbfa,#38a4ff);
    top: 26.5px; /*no*/
    // opacity: 0.7;
    left: -2px;
    height: 10px;
    width: 138px !important;
    z-index: 0 !important;
  }
  .tab-title {
    letter-spacing: 0.02rem;
    font-weight: 500;
  }
  .van-tab--active .tab-title {
    font-size: 30px;
    color: #333333;
    font-weight: 700 !important;
  }
  .hotlist {
    display: flex;
    padding: 20px 0;
    .actived {
      border-bottom: 3px solid #0088ff;
    }
    li {
      flex: 1;
      text-align: center;
      padding-bottom: 20px;
    }
  }
  .mainBox {
    display: inline-block;
    margin-top: 10px;
    .hotSell {
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
    .formulation {
      margin: 20px 0;
      color: #b2b2b2;
      display: -webkit-box;
      display: -moz-box;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 24px;
      height: auto;
    }
    li {
      display: flex;
      padding: 44px 30px;
      border-bottom: 1px solid #eee;
    }
    li:nth-child(1) {
      padding-top: 20px !important;
    }
    li:last-child {
      padding-bottom: 62px !important;
    }
    div:nth-child(1) {
      float: left;
      .van-image__img {
        border-radius: 10px 10px 0px 0px;
      }
      span {
        display: block;
        text-align: center;
        background: #f6f6f6;
        height: 54px;
        line-height: 54px;
        color: #333;
        // border-radius: 0px 0px 10px 10px;
        font-size: 24px;
        margin-top: 156px;
        font-weight: 600;
      }
    }
    div:nth-child(2) {
      display: inline-block;
      width: 6.5rem;
      margin-left: 30px;
      // p:nth-child(1) {
      //   font-size: 32px;
      //   font-weight: 800;
      //   line-height: 38px;
      //   color: #333;
      // }
      // p:nth-child(2) {
      //   font-size: 24px;
      //   margin: 24px 0;
      //   line-height: 30px;
      //   color: #8f8f8f;
      // }
      // p:nth-child(3) {
      //   font-size: 24px;
      //   display: flow-root;
      //   height: 48px;
      //   line-height: 48px;
      //   .price {
      //     color: #fb8400;
      //     font-weight: bold;
      //     float: left;
      //     font-size: 30px;
      //     i {
      //       font-size: 22px;
      //     }
      //   }
      //   .totalSell {
      //     color: #919191;
      //     float: right;
      //     font-size: 22px;
      //   }
      // }
    }
    .leftDiv {
      float: left;
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
        width: 178px;
        font-weight: 700;
      }
    }
    .rightDiv {
      position: relative;
      display: inline-block;
      width: 6.5rem;
      margin-left: 30px;
      .right_one {
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
        color: rgba(143, 143, 143, 1);
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
        p {
          font-size: 26px !important;
          img {
            width: 25px;
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 5px;
          }
          p {
            font-size: 26px !important;
            color: rgba(143, 143, 143, 1) !important;
            span {
              font-size: 26px !important;
              color: rgba(143, 143, 143, 1) !important;
            }
          }
          span {
            font-size: 26px !important;
          }
        }
      }
      .right_three {
        font-size: 26px;
        display: flow-root;
        height: 48px;
        line-height: 48px;
        width: 100%;
        .minFee {
          font-size: 30px;
          color: #fb8400;
          font-weight: bold;
          float: left;
          span {
            font-size: 22px;
          }
        }
        .saleVolume {
          color: #b2b2b2;
          float: right;
          font-size: 22px;
        }
      }
    }
  }
}
.right_two {
  color: rgba(143, 143, 143, 1);
}
</style>