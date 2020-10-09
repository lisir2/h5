<template>
  <div class="home"> 
    <!-- <mt-header fixed title="保险经纪网" class="header_title">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header> -->
    <van-nav-bar title="保险经纪网">
        <!-- <van-icon name="ellipsis" slot="right" /> -->
    </van-nav-bar>
    <div class="page" >  
        <!-- 首页轮播图 -->
        <div class="banner">
          <van-swipe indicator-color="white" :autoplay="3000">
            <van-swipe-item v-for="(item,index) in items" :key="index">
              <van-image :src="item.adv_content_pic.replace('fs:',bannerImagePath)" alt="" @click="jump(item.follow_up_content)">
              </van-image>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 分类九宫格列表 -->
        <gird-menu></gird-menu>
        <!-- 代理人及计划书 -->
        <agent-plan></agent-plan>
        <!-- 人生必备保单 -->
        <policy-life></policy-life>
        <!-- 精品热卖 -->
        <hot-product></hot-product>
        <!-- 宣传视频 -->
        <company-video></company-video>
        <!-- 在线服务及关于我们 -->
        <server-online></server-online>
        <!-- 底部公共内容 -->
        <end-modul></end-modul>
        <!-- Tabbar标签栏 -->
        <foot-menu></foot-menu>
    </div>
  </div>
</template>

<script>
import FootMenu from '../../components/footMenu.vue'
import GirdMenu from '../../components/girdMenu.vue'
import AgentPlan from '../../components/agentPlan.vue'
import PolicyLife from '../../components/policyLife.vue'
import HotProduct from '../../components/hotProduct.vue'
import CompanyVideo from '../../components/companyVideo.vue'
import ServerOnline from '../../components/serverOnline.vue'
import EndModul from '../../components/endModul.vue'
import $ from 'jquery';
import api from '../../fetch/api'

export default {
  name: 'home',
   data () {
    return {
      items: [],
      acid:"",
      bannerImagePath:this.$store.state.bannerImagePath,
    }
  },
  mounted() {
      var args=this.sign({ad_code:"h5-index-banner"})
      api.getAdvcode(args).then(res => {
          this.acid=res.data.acid;
          var data=this.sign({acid:res.data.acid})
          api.getBanner(data).then(res => {
              this.items=res.data
          })
      });
      
      // 微信分享  具体分享在main.js 全局路由守卫里面
      if(this.is_weixn()){
        // 分享图片
        var ShareImage = location.protocol + "//" + location.host + '/hsfront' + require('@/assets/images/home/logo.png').substring(1);
        // 分享描述
        var descript = '打造"人人买得起，个个有保障"的保险产品，为每个中国公民撑起保护伞,买保险上保险经纪网，帮挑帮赔。网上买保险推荐选择！';
        // 分享title
        var title = '保险经纪网';
        // 分享链接
        var shareLink = location.href;
        // 调用分享
        this.$WXShare(title, descript, ShareImage, shareLink);
      }
      
  },
  methods: {
    developMsg: function () {
      this.$toast({
        message: '正在开发，敬请期待!',
        duration: 1500
      })
    },
    jump:function(url){
      location.href=url;
      // this.$router.push({ path: "/productdetail", query: { productId: id } });
    }
  },
  components: {FootMenu,GirdMenu,AgentPlan,PolicyLife,HotProduct,CompanyVideo,ServerOnline,EndModul}
}
</script>

<style lang="scss">
  .home {
    background: #fff;
    .banner {
      width: 100%;
      min-height: 375px;
      margin-bottom: 45px;
      .van-swipe__track{
        width: 50000px!important;  //老板手机问题
        box-sizing: border-box!important;
      }
      .van-swipe{
        height: 100%;
        .van-image{
          min-height: 375px;
          vertical-align: bottom;
          width: 100%;
        }
      }
    }
    .header_title{
      background:#fff;
      color:#000;
    }
    .menu-icon {
      background: #fff;
      overflow: hidden;
      li {
        width: 13%;
        margin: 20px 6%;
        float: left;
        text-align: center;
        margin-top: 0;
      }
    }
    .announce-gossip {
      overflow: hidden;
      padding: 2%;
      .title {
        float: left;
        width: 18%;
        margin-top: 10px;
      }
      dl {
        float: left;
        width: 79%;
        margin-left: 15px;
        dt {
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 5px;
        }
      }
    }
    .product-list {
      margin-top: 20px;
      .product-item {
        text-align: left;
        overflow: hidden;
        img {
          width: 100%;
        }
        p {
          font-size: 28px;
          line-height: 66px;
          border-bottom: 1px solid #ddd;
          margin-bottom: 20px;
        }
        span {
          color: #008fdf;
          font-weight: bold;
          font-size: 28px;
          line-height: 28px;
        }
        a {
          float: right;
        }
      }
    }
    // 人气必备保单/精品热卖/在线服务等标题
    .sameTitle{
        padding:20px 30px;
        .leftB{
            width:8px;
            height:34px;
            background:linear-gradient(150deg,rgba(96,207,250,1),rgba(56,164,255,1));
            border-radius:8px;
            display: inline-block;
            vertical-align: middle;
        }
        .titleA{
            // text-shadow: 1px 1px #333;
            font-size: 34px;
            display: inline-block;
            color: #333;
            font-weight: 700;
            vertical-align: middle;
            // margin-left: 10px
        }
        i{
          font-size: 28px;
          color: #8F8A8A;
          float: right;
          display: inline-block;
          height: 44px;
          line-height: 44px
        }
    }
    
    .van-cell__title span{
       font-weight: 600;
       font-size: 34px;
       color: #333;
       font-family: 'PingFang-SC-Bold';
    }
  }
</style>
