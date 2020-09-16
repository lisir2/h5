<!-- 组件说明 -->
<template>
  <div class="ProductFixBar">
    <!-- 详情页底部投保区 -->
    <div class="fixBar">
      <!-- 代理人分享tabbar -->
      <van-tabbar id="sharePolifyBar" style="z-index: 999;" v-if="IsAgentShare">
        <van-tabbar-item class="share_agentInfo" @click="SetInsuranceConsultantShow()">
          <div class="agentHead">
            <img
              :src="agentUserInfo.proxyImg ? agentUserInfo.proxyImg : '../../assets/images/agent/trophy.png'"
              alt
            />
          </div>
          <div class="agentInfo">
            <p>{{agentUserInfo.agentName}}</p>
            <p>您的保险顾问</p>
          </div>
        </van-tabbar-item>
        <van-tabbar-item class="share_price">￥{{priceResult}}</van-tabbar-item>
        <van-tabbar-item class="share_text" @click="SetWxShareShow()">
          分享给
          <br />客户
        </van-tabbar-item>
        <van-tabbar-item
          :class="preparation ? 'soldOut' : (WhetherTheShelf == 0 ? 'gobuy' : 'soldOut')"
          @click="showPopup()"
        >立即投保</van-tabbar-item>
        <div class="cover"></div>
      </van-tabbar>
      <!-- 非分享tabbar -->
      <van-tabbar id="polifyBar" style="z-index: 999;" v-if="!IsAgentShare">
        <!-- //hsib.qiyukf.com/client?k=c5d6706f0d4f32b60dc4ba3aaa148b89&wp=1&robotShuntSwitch=1&robotId=139000 -->
        <a href="javascrpt:;" @click="serviceShow = true">
          <img src="../../assets/images/detail/客服.png" alt class="Tochat" />
        </a>
        <van-tabbar-item class="price">￥{{priceResult}}</van-tabbar-item>
        <van-tabbar-item
          :class="preparation ? 'soldOut' : (WhetherBuy == 0 ? 'gobuy' : 'soldOut')"
          @click="showPopup()"
        >{{preparation ? '备案中' : (WhetherTheShelf == 0 ? '立即投保' : (WhetherTheShelf == 1 ? '产品已下架' : '备案中'))}}</van-tabbar-item>
        <div class="cover"></div>
      </van-tabbar>
    </div>
    <!-- 客服页面 -->
    <van-popup v-model="serviceShow" closeable :style="{width:'100%',height:'100%'}" get-container="body" @close="closeService" :lazy-render="true">
      <chat v-if="serviceShow"></chat>
    </van-popup>
  </div>
</template>

<script>

import chat from '@/page/official/chat'
export default {
  components: {
    chat
  },
  data() {
    return {
      serviceShow: false,
    };
  },
  // 父组件状态、方法 传值状态意思看 detailsTwo 组件
  props:['IsAgentShare','agentUserInfo','priceResult','preparation','WhetherTheShelf','WhetherBuy','SetInsuranceConsultantShow','SetWxShareShow','showPopup'],
  computed: {},
  methods: {
    closeService(){
      this.serviceShow = false;
      // endRecord();
      // console.log('在结束时调用结束录制方法endRecord();');
    }
  },
  mounted(){
    
  }
};
</script>

<style lang="scss" scoped>
.ProductFixBar {
  .fixBar {
    height: auto !important;
    position: relative;
    z-index: 100;
    .van-hairline--top-bottom::after {
      border-width: 3px 0;
      border-bottom: 0px;
    }
    .van-tabbar-item--active {
      color: #8f8f8f;
    }
    #polifyBar {
      .price {
        flex: 2;
      }
      .gobuy {
        flex: 3;
      }
      .soldOut {
        flex: 3;
      }
    }

    #sharePolifyBar {
      .share_agentInfo {
        flex: 3.8 !important;
        .van-tabbar-item__text {
          width: 90%;
          display: flex;
          .agentHead {
            img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              border: 1px solid black;
            }
          }
          .agentInfo {
            height: 60px;
            margin-top: 13px;
            margin-left: 10px;
            p {
              color: black;
              overflow: hidden;
              display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
              -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
              -webkit-line-clamp: 1; //规定行数
            }
            p:nth-of-type(1) {
              font-size: 25px;
            }
            p:nth-of-type(2) {
              font-size: 23px;
              margin-top: 5px;
            }
          }
        }
      }
      .share_price {
        flex: 2.4 !important;
        border-right: solid 1px #ccc;
      }
      .share_text {
        flex: 1.6 !important;
        font-size: 16px;
        text-align: center;
      }
      .soldOut {
        flex: 3 !important;
      }
      .gobuy {
        flex: 3 !important;
      }
    }

    .price,
    .share_price {
      color: #333;
      margin: 20px 0;
      height: auto;
      .van-tabbar-item__icon {
        display: none;
      }
      .van-tabbar-item__text {
        font-weight: 700;
        font-size: 36px;
        color: #f9912e;
      }
    }
    .gobuy {
      color: #333;
      background: #f9912e;
      .van-tabbar-item__icon {
        display: none;
      }
      .van-tabbar-item__text {
        color: #fff;
        font-size: 36px;
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-weight: bold;
      }
    }
    .soldOut {
      background-color: #cccccc;
      .van-tabbar-item__text {
        color: #fff;
        font-size: 36px;
      }
    }
  }
}
</style>