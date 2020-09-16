<!-- 组件说明 保险特卖 -->
<template>
  <div v-if="showPage">
    <van-skeleton title :row="20" style="padding-top: 0.5rem;" />
  </div>
  <div v-else class="classBox">
    <van-nav-bar title="保险特卖" left-arrow @click-left="onClickLeft" />
    <ul>
      <li v-for="item in goodList" :key="item.id+1000" @click="goDetail(item.id)" >
        <div class="leftDiv">
          <van-image width="2.375rem" height="2.08rem" :src="imgCommonPath +item.goodSmallImg" />
          <span>{{item.goodInsuranceCompanyAlias}}</span>
        </div>
        <div class="rightDiv">
          <p class="right_one">{{item.goodName}}</p>
          <p class="right_two" v-html="item.goodListPromotionalCopy"></p>
          <p class="right_three">
            <span class="minFee">
              ￥{{item.minFee}}
              <span>起</span>
            </span>
            <!-- <span class="saleVolume">已售{{item.goodSalesVolume}}份</span> -->
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../fetch/api";
export default {
  name: "InsuranceSale",
  components: {},
  data() {
    return {
      showPage: true, //是否显示骨架屏，默认显示
      goodList: [],
      imgCommonPath: this.$store.state.baseImagePath
    };
  },
  computed: {},
  mounted() {
    //通过产品标签获取人生必备保单下产品
    var args = this.sign({ classTag: "保险特卖" });
    // this.$axios.post('/brg/openapi/h5/product/getProdGoodsList',args).then(res => {
    api.getGoodList(args).then(res => {
      if (res.code == 20000) {
        this.showPage = false;
        this.goodList = res.data;
      }
    });
  },
  methods: {
    onClickLeft() {
      window.history.back(-1);
    },
    goDetail(id) {
      this.$router.push({ path: "/productdetail", query: { productId: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.classBox {
  background: #fff;
    ul li {
      display: inline-block;
      width: 100%;
      padding: 44px 30px;
      border-bottom: 1px solid #eee;
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
          font-weight: 600;
          // 溢出一点表示
          // display: -webkit-box;
          // display: -moz-box;
          // white-space: pre-wrap;
          // word-wrap: break-word;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // -webkit-box-orient: vertical;
          // -webkit-line-clamp: 1;
        }
      }
      .rightDiv {
        position: relative;
        display: inline-block;
        width: 6.4rem;
        // min-height: 3rem;
        margin-left: 30px;
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
</style>