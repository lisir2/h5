<!-- 组件说明 -->
<template>
  <div class="Study">
    <van-nav-bar title="展业"></van-nav-bar>
    <van-tabs
      v-model="active"
      color="rgba(0, 140, 255, 1)"
      title-active-color="rgba(0, 140, 255, 1)"
      :sticky="true"
      :swipeable="true"
    >
      <van-tab title="保险理念">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <router-link v-for="(item,index) in list" :key="index" :to="{path:'/StudyArticle',query:{id:item.id,readingQuantity:item.hRead}}" class="artivleItem">
              <div class="left">
                    <div class="title">{{item.title}}</div>
                    <div class="subTitle">
                        <span class="read"><span>{{item.hRead}}</span>阅读 </span>&nbsp;
                        <span class="share"><span>{{item.hShare}}</span>分享 </span>&nbsp;
                        <span class="tab"> #{{item.key1}}</span>
                    </div>
                </div>
                <div class="right">
                    <img :src="baseImagePath + '/hsFileData/' + item.hSharePic" alt="" width="100%">
                </div>
            </router-link>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="产品介绍">
        <van-pull-refresh v-model="refreshing1" @refresh="onRefresh1">
          <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1">
            <router-link v-for="(item,index) in list1" :key="index" :to="{path:'/StudyArticle',query:{id:item.id,readingQuantity:item.hRead}}" class="artivleItem">
              <div class="left">
                    <div class="title">{{item.title}}</div>
                    <div class="subTitle">
                        <span class="read"><span>{{item.hRead}}</span>阅读 </span>&nbsp;
                        <span class="share"><span>{{item.hShare}}</span>分享 </span>&nbsp;
                        <span class="tab"> #{{item.key1}}</span>
                    </div>
                </div>
                <div class="right">
                    <img :src="baseImagePath + '/hsFileData/' + item.hSharePic" alt="" width="100%">
                </div>
            </router-link>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="政策法规">
        <van-pull-refresh v-model="refreshing2" @refresh="onRefresh2">
          <van-list v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="onLoad2">
            <router-link v-for="(item,index) in list2" :key="index" :to="{path:'/StudyArticle',query:{id:item.id,readingQuantity:item.hRead}}" class="artivleItem">
              <div class="left">
                    <div class="title">{{item.title}}</div>
                    <div class="subTitle">
                        <span class="read"><span>{{item.hRead}}</span>阅读 </span>&nbsp;
                        <span class="share"><span>{{item.hShare}}</span>分享 </span>&nbsp;
                        <span class="tab"> #{{item.key1}}</span>
                    </div>
                </div>
                <div class="right">
                    <img :src="baseImagePath + '/hsFileData/' + item.hSharePic" alt="" width="100%">
                </div>
            </router-link>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  name: "Study",
  components: {},
  data() {
    return {
      active: 0, //默认展示第几个tab
      list: [],
      page:1,
      loading: false,
      finished: false,
      refreshing: false,
      list1: [],
      page1:1,
      loading1: false,
      finished1: false,
      refreshing1: false,
      list2: [],
      page2:1,
      loading2: false,
      finished2: false,
      refreshing2: false,
      baseImagePath: this.$store.state.baseImagePath,
    };
  },
  computed: {},
  methods: {
    onLoad() {
      var that = this;
      // 保险理念
      var params = {
        cateType: '07',
        page: this.page,
        limit: '5',
      };
      api.study(params).then(res=>{
        if(that.list.length < res.totalCount){
          that.page++;
          that.list = that.list.concat(res.list);
          that.loading = false;
        }else{
          console.log('保险理念加载完成');
          that.loading = false;
          that.finished = true;
        }
      });
    },
    onRefresh() {
      // 清空列表数据
      this.list = [];
      this.page = 1;
      this.refreshing = false;
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    onLoad1() {
      var that = this;
      // 产品介绍
      var params = {
        cateType: '09',
        page: this.page1,
        limit: '5',
      };
      api.study(params).then(res=>{
        if(that.list1.length < res.totalCount){
          that.page1++;
          that.list1 = that.list1.concat(res.list);
          that.loading1 = false;
        }else{
          console.log('产品介绍加载完成');
          that.loading1 = false;
          that.finished1 = true;
        }
      });
    },
    onRefresh1() {
      // 清空列表数据
      this.list1 = [];
      this.page1 = 1;
      this.refreshing1 = false;
      this.finished1 = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading1 = true;
      this.onLoad1();
    },
    onLoad2() {
      var that = this;
      // 政策法规
      var params = {
        cateType: '10',
        page: this.page2,
        limit: '5',
      };
      api.study(params).then(res=>{
        if(that.list2.length < res.totalCount){
          that.page2++;
          that.list2 = that.list2.concat(res.list);
          that.loading2 = false;
        }else{
          console.log('政策法规加载完成');
          that.loading2 = false;
          that.finished2 = true;
        }
      });
    },
    onRefresh2() {
      // 清空列表数据
      this.list2 = [];
      this.page2 = 1;
      this.refreshing2 = false;
      this.finished2 = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading2 = true;
      this.onLoad2();
    },
  }
};
</script>

<style lang="scss" scoped>
.Study{
    .artivleItem {
        padding: 30px 30px;
        display: block;
        overflow: hidden;
        border-bottom: solid 1px #EEEEEE;
        .left {
            width: 65%;
            height: 100%;
            margin-right: 5%;
            float: left;
            .title {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2; //行数
                -webkit-box-orient: vertical;
                font-size: 29px;
                font-weight: 700;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                margin-bottom: 35px;
            }
            .subTitle{
                .read, .share {
                    color: #999999;
                }
                .tab {
                    color: #FB8400;
                }
            }
        }
        .right {
            width: 30%;
            float: right;
        }
    }
}

</style>