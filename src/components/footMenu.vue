<template>
  <div class="btnClass">
    <router-view></router-view>
    <van-tabbar route v-model="active" class="tabbar" active-color="#5B8AFF" inactive-color="#8F8A8A">
    <van-tabbar-item
      replace
      to="/"
    >
    <span>首页</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? icon.activeHome : icon.staticHome"
    >
  </van-tabbar-item>
  <van-tabbar-item
      replace
      to="/classlist"
    >
    <span>分类</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? icon.activeClasslist : icon.staticClasslist"
    >
  </van-tabbar-item>
  <van-tabbar-item
      replace
      to="/study"
    >
    <span>展业</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? icon.activeStudy : icon.staticStudy"
    >
  </van-tabbar-item>
  <van-tabbar-item
      replace
      to="/mine"
    >
    <span>我的</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? icon.activeMine : icon.staticMine"
    >
  </van-tabbar-item>
    <div class="cover"></div>
  </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "foot-menu",
  data() {
    return {
      selectedTab: "",
      active: 0,
      icon: {
        staticHome: require("../assets/images/tabbar/homeTabbar.png"),
        activeHome: require("../assets/images/tabbar/homeTabbar1.png"),
        staticClasslist: require("../assets/images/tabbar/classlistTabbar.png"),
        activeClasslist: require("../assets/images/tabbar/classlistTabbar1.png"),
        staticMine: require("../assets/images/tabbar/mineTabbar.png"),
        activeMine: require("../assets/images/tabbar/mineTabbar1.png"),
        staticStudy: require("../assets/images/tabbar/studyTabbar.png"),
        activeStudy: require("../assets/images/tabbar/studyTabbar1.png")
      }
    };
  }
};
</script>

<style lang="scss" scoped>

@supports (bottom: env(safe-area-inset-bottom)) {
  .tabbar {
    bottom: env(safe-area-inset-bottom);
  }
  // .cover {
  //   position: absolute;
  //   bottom: -1rem; // -env(safe-area-inset-bottom)
  //   width: 100%;
  //   height: 1rem;
  //   background: white;
  //   z-index: -1;
  // }
}

.van-tabbar-item {
  position: relative;
  height: 100%;
}
.tabbar {
  border-top: 1px solid #e5e5e5;
  height: 105px;
  img {
    width: 48px;
    height: 48px;
  }
  span {
    font-size: 23px;
  }
}
.van-hairline--top-bottom::after{
  border-bottom: none;
}
.foot-menu {
  // height: 102px;
  background: #f4f4ff;
  border-top: 1px solid #ccd0db; /*no*/
  .mint-tab-item {
    .mint-tab-item-label {
      color: #b4aeb5;
    }
    .mint-tab-item-icon {
      display: block;
      // width: 56px;
      // height: 56px;
      background: url(../assets/images/icon_home.png) no-repeat top center;
      background-size: cover;
    }
    &:nth-child(2) {
      .mint-tab-item-icon {
        background-image: url(../assets/images/icon_classify.png);
      }
    }
    &:nth-child(3) {
      .mint-tab-item-icon {
        background-image: url(../assets/images/icon_mine.png);
      }
    }
    &.is-selected {
      background-color: transparent;
      .mint-tab-item-label {
        color: #333;
      }
      .mint-tab-item-icon {
        background-position: bottom center;
      }
    }
  }
}
</style>
