<template>
  <div class="life-menu">
    <div class="sameTitle">
      <span class="leftB"></span>
      <p class="titleA" style>人生必备保单</p>
    </div>
    <ul>
      <li v-for="item in items" :key="item.id">
        <router-link :to="{path:'/productdetail',query:{productId:item.id}}">
          <van-image lazy-load :src="baseImagePath+item.indexHotProdImg" width="100%"/>
          <div class="contentBox">
            <div class="content">
              <p class="productName">{{item.goodName}}</p>
              <p class="productDisc" v-html="item.goodListPromotionalCopy" style="color: #666;"></p>
            </div>
            <p class="productPrice">
              ￥{{item.minFee}}
              <span>起</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="colorBlock"></div>
  </div>
</template>
<script>
import api from "@/fetch/api";
export default {
  name: "life-menu",
  data() {
    return {
      baseImgPath: require("@/assets/images/home/policyLife.png"), //policyLife.png  require
      items: "",
      baseImagePath: this.$store.state.baseImagePath
    };
  },
  mounted() {
    //通过产品标签获取人生必备保单下产品
    var args = this.sign({ classTag: "人生必备保单" });
    // this.$axios.post('/brg/openapi/h5/product/getProdGoodsList',args).then(res => {
    api.getGoodList(args).then(res => {
      this.items = res.data;
    });
  }
};
</script>
<style lang="scss">
.life-menu {
  .Stance {
    width: 100%;
    height: 180px;
  }
  .sameTitle {
    padding: 40px 30px;
  }
  .title {
    font-size: 32px;
    font-weight: bold;
    text-indent: 1em;
    padding: 20px 0;
  }
  ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 30px;
    padding-bottom: 42px;
    padding-top: 0;
    li {
      width: 48.7%;
      margin-bottom: 20px;
      // padding:0 20px;
      background: rgba(255, 255, 255, 1);
      // box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);

      border-radius: 10px;
      position: relative;
      a {
        display: block;
        width: 100%;
      }
      .contentBox {
        border: 1.2px solid #e5e5e5;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        border-top: none;
      }
      .content {
        padding: 0 15px;
        height: 136px;
        overflow: hidden;
      }
      img {
        display: block;
        border-radius: 10px 10px 0 0;
        width: 100%;
      }
      .productName {
        font-weight: 700 !important;
        font-size: 28px;
        color: #333;
        font-weight: 600;
        margin-top: 12px;
        display: -webkit-box;
        display: -moz-box;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .productDisc {
        font-size: 24px;
        color: #8f8f8f;
        margin-top: 8px;
        font-weight: 500;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 36px;
        letter-spacing: 1px;
        height: 72px;
        li {
          width: auto;
        }
        span {
          font-size: 25px !important;
        }
        p {
          font-size: 25px !important;
          display: -webkit-box;
          display: -moz-box;
          white-space: pre-wrap;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          img {
            width: 25px;
            height: auto;
            margin-right: 5px;
            margin-top: -5px;
          }
        }
      }
      .productPrice {
        padding: 0 15px;
        color: #fb8400;
        font-size: 30px;
        font-family: "PingFang SC";
        font-weight: 800;
        margin-bottom: 15px;
        span {
          font-size: 22px;
        }
      }
    }
  }
}
</style>