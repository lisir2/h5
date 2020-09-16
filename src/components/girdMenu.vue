<template>
  <div>
    <ul class="gird-menu">
        <li>
            <router-link :to="{path:'/InsuranceSale'}">
                <img src="../assets/images/home/home-icon1.png"/>
                <span>保险特卖</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{path: '/classlist', query: {titleIndex:'1'}}">
                <img src="../assets/images/home/home-icon3.png"/>
                <span>旅游保险</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{path: '/classlist', query: {titleIndex:'6'}}">
                <img src="../assets/images/home/home-icon4.png"/>
                <span>财产保险</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{path: '/classlist', query: {titleIndex:'2'}}">
                <img src="../assets/images/home/home-icon9.png"/>
                <span>意外保险</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{path: '/classlist', query: {titleIndex:'3'}}">
                <img src="../assets/images/home/home-icon10.png"/>
                <span>健康保险</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{path: '/IndustryClass'}">
                <img src="../assets/images/home/home-icon7.png"/>
                <span>行业保险</span>
            </router-link>
        </li>
        <li>
            <router-link :to="{path: '/classlist', query: {titleIndex:'0'}}">
                <img src="../assets/images/home/home-icon8.png"/>
                <span>全部产品</span>
            </router-link>
        </li>
         <li>
            <div @click="development">
            <!-- <a href="javascriput:;" @click="Customize"> -->
                <img src="../assets/images/home/home-icon2.png"/>
                <span>私人定制</span>
            <!-- </a> -->
            </div>
        </li>
    </ul>
    <!-- <div class="colorBlock"></div> -->
  </div>
</template>
<script>
import api from '../fetch/api'
export default {
  name: 'gird-menu',
   data () {
    return {
      items: []
    }
  },
  mounted() {
      
  },
  methods:{
      development(){
          this.Toast('功能正在开发中，敬请期待');
      },
      Customize(){
          this.$router.push({path:'/Customize'});
      }
  }
}
</script>
<style lang="scss">
    .gird-menu{
        margin: auto;
        display:flex;
        flex-flow:row wrap;
        justify-content: space-between;
        a{
           display: contents;
        }
    }
   .gird-menu li{
        width:25%;
        text-align:center;
        padding-bottom:25px;
        img{
            width:70px;
        }
        span{
            display: block;
            color: #3d3d3d;
            font-size: 24px;
            width: 100%;
            text-align: center;
            margin-top: 14px;
        }
    }
</style>