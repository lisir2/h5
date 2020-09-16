<!-- 组件说明 行业保险列表-->
<template>
  <div v-if="showPage">
      <van-skeleton title :row="20" style="padding-top: 0.5rem;"/>
  </div>
  <div v-else class="IndustryClass">
    <van-nav-bar title="行业保险" left-arrow @click-left="onClickLeft" />
    <ul class="IndustryList">
      <li v-for="(item,index) in items" :key="index">
        <img :src="item.adv_content_pic.replace('fs:',bannerImagePath)" alt @click="jump(item.follow_up_content)"/>
        <p>{{item.adv_title}}</p>
      </li>
      <!-- <li>
          <router-link :to='{path:"IndustryList",query:{industryName:"老年人行业",title:"杭州市老年人团体意外伤害统筹保险"}}'>
              <img src="../../assets/images/IndustryClass/laonianren.png" alt />
              <p>杭州市老年人团体意外伤害统筹保险</p>
          </router-link>
      </li>
      <li>
          <router-link :to='{path:"IndustryList",query:{industryName:"家政行业",title:"环晟-平安家政服务综合保险项目"}}'>
            <img src="../../assets/images/IndustryClass/jiazheng.png" alt />
            <p>环晟-平安家政服务综合保险项目</p>
        </router-link>
      </li>
      <li>
          <router-link :to='{path:"IndustryList",query:{industryName:"汽修行业",title:"浙江省汽修企业团体意外伤害保险项目"}}'>
            <img src="../../assets/images/IndustryClass/weixiu.png" alt />
            <p>浙江省汽修企业团体意外伤害保险项目</p>
        </router-link>
      </li>
      <li>
          <router-link :to='{path:"IndustryList",query:{industryName:"人人巴士行业",title:"平安驾乘意外伤害保险项目"}}'>
            <img src="../../assets/images/IndustryClass/renren.png" alt />
            <p>平安驾乘意外伤害保险项目</p>
        </router-link>
      </li> -->
    </ul>
  </div>
</template>

<script>
import api from '@/fetch/api';
export default {
  name: "IndustryClass",
  components: {},
  data() {
    return {
        showPage:true,  // 骨架屏
        items:[], // 行业列表
        bannerImagePath:this.$store.state.bannerImagePath,  // 图片路径
    };
  },
  computed: {},
  mounted() {
    var args=this.sign({ad_code:"H5_hangye_banner"});
    api.getAdvcode(args).then(res => {
        this.acid=res.data.acid;
        var data=this.sign({acid:res.data.acid})
        api.getBanner(data).then(res => {
          if(res.code == 20000){
            this.items=res.data;
            this.showPage = false;
          }else{
            this.Toase(res.message);
          }
        })
    });
  },
  methods: {
    onClickLeft() {
      window.history.back(-1);
    },
    jump:function(url){
      location.href=url;
    }
  }
};
</script>

<style lang="scss" scoped>
.IndustryClass {
  .IndustryList {
    padding: 30px;
    li {
      position: relative;
      width: 100%;
      margin-bottom: 20px;
      img {
        width: 100%;
        min-height: 290px;
        vertical-align: bottom;
      }
      p {
        width: 100%;
        height: 80px;
        line-height: 80px;
        display: block;
        position: absolute;
        bottom: 0px;
        background: rgba(51, 51, 51, 0.45);
        color: white;
        padding: 0 30px;
        border-radius: 0 0 8px 8px;
      }
    }
  }
}
</style>