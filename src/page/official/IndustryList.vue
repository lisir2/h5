<!-- 组件说明 行业保险列表-->
<template>
    <div v-if="showPage">
        <van-skeleton title :row="20" style="padding-top: 0.5rem;"/>
    </div>
    <div v-else class="IndustryDetails">
      <van-nav-bar :title="title" left-arrow @click-left="onClickLeft"/>
      <ul>
        <li v-for="item in items" :key="item.id">
          <router-link :to="{path:'/productdetail',query:{productId:item.id}}">
            <span class="labelStyle" :style="'background-color:'+item.goodImgColor">{{item.goodImgIcon}}</span>
            <!-- <van-image :src="baseImgPath" v-if="!item.goodImg"/>
            <van-image :src="baseImagePath+item.goodImg"/> -->
            <img :src="baseImgPath" alt v-if="!item.goodImg" />
            <img :src="baseImagePath+item.goodImg" alt />
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
    </div>
</template>

<script>
import api from "../../fetch/api";
import { Toast } from 'vant';
export default {
  name: "IndustryList",
  components: {},
  data() {
    return {
      baseImgPath: require("../../assets/images/home/policyLife.png"),
      items: "",
      baseImagePath: this.$store.state.baseImagePath,
      title:'',
      showPage: true,
    };
  },
  computed: {},
  mounted() {
    var industryName = this.$route.query.industryName; //标签名
    this.title = this.$route.query.title; //title
    //通过产品标签获取人生必备保单下产品
    var args = this.sign({ classTag: industryName });
    // this.$axios.post('/brg/openapi/h5/product/getProdGoodsList',args).then(res => {
    api.getGoodList(args).then(res => {
      if(res.code == 20000){
        this.items = res.data;
        this.showPage = false;
      }else{
        Toast(res.message);
      }
      
    });
  },
  methods: {
    onClickLeft() {
      window.history.back(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.van-nav-bar__title{
  max-width: 80%;
}
.IndustryDetails {
  ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 30px;
    padding-bottom: 42px;
    position: relative;
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
      .labelStyle{
          position: absolute;
          top: 0;
          left: 0;
          width: 120px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          font-size: 20px;
          color: white;
          border-radius: 10px 0 9px 0;
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
        border-radius: 10px 10px 0 0!important;
        width: 100%;
        min-height: 160px;
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
        min-height: 1rem;
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