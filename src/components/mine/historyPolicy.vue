<template>
  <div class="personal history">
    <van-nav-bar title="历史保单" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <van-dropdown-menu style="z-index:10000;">
      <van-dropdown-item v-model="typeChangeValue" :options="option1" @change="typeChange"/>
    </van-dropdown-menu>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "historyPolicy",
  data() {
    return {
      typeChangeValue: 0, //下拉选择框的状态，默认选择的是个险保单
      option1: [
        { text: "个险保单", value: 0 },
        { text: "车险保单", value: 1 },
        { text: "团险保单", value: 2 }
      ]
    };
  },
  mounted() {
    if (this.$route.name == "carHistoryPolicy") {
      this.typeChangeValue = 1;
    } else if (this.$route.name == "industryHistoryPolicy") {
      this.typeChangeValue = 2;
    } else if (this.$route.name == "personalHistoryPolicy") {
      this.typeChangeValue = 0;
    }
  },
  watch: {
    // $route(to, from) {
    //   console.log(to, from);
    //   if (to.name == "carHistoryPolicy") {
    //     this.typeChangeValue == 1;
    //   } else if (to.name == "industryHistoryPolicy") {
    //     this.typeChangeValue == 2;
    //   } else if (to.name == "personalHistoryPolicy") {
    //     this.typeChangeValue == 0;
    //   }
    // }
  },
  methods: {
    typeChange(value) {
      this.typeChangeValue = value; //记录下拉框的状态
      if (this.typeChangeValue == 1) {
        //车险
        this.$router.push({ name: "carHistoryPolicy" });
      } else if (this.typeChangeValue == 2) {
        //行业险
        this.$router.push({ name: "industryHistoryPolicy" });
      } else if (this.typeChangeValue == 0) {
        //个险
        this.$router.push({ name: "personalHistoryPolicy" });
      }
    },
    onClickLeft() {
      this.$router.push("/personalPolicy");
    }
  }
};
</script>
<style lang='scss'>
.history {
  background: #fff;
  .statusName {
    position: absolute;
    right: 30px;
    bottom: 0px;
    color: rgb(0, 140, 255);
  }
  .globule {
    position: fixed;
    top: 800px;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: #f99a31;
    height: 110px;
    right: 10px;
    word-wrap: break-word;
    div {
      height: 70px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      p {
        font-size: 26px;
        color: white;
        text-align: center;
      }
    }
  }
  .van-tab--active span {
    font-size: 28px;
    font-weight: 700 !important;
    color: #333;
  }
  .policylist {
    display: block;
    .coverImg {
      height: 0px !important;
      position: relative;
      span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 26px;
        color: rgb(0, 140, 255);
      }
      img {
        height: 100%;
        width: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .goodName {
      font-weight: 700;
      font-size: 30px !important;
      margin-bottom: 40px;
      margin-top: 0px;
      padding-top: 36px;
      border-top: 1.1px solid #e8e6e6;
      margin: 0px 0px 40px;
      padding: 36px 30px 0px;
      position: relative;
    }
    .fontColor666 {
      font-size: 26px;
      color: #666;
    }
    li {
      display: block !important;
      p {
        margin: 20px 30px;
        font-size: 26px;
        color: #0c0c0c;
      }
      p:nth-child(1) {
        margin: 0;
        border-bottom: 1.1px solid #e8e6e6;
        img {
          width: 234px;
          margin-left: 30px;
        }
        span {
          display: block;
        }
      }
      p:nth-child(3) {
        font-size: 30px;
      }

      p:nth-child(8) {
        margin: 0;
        margin-top: 40px;
        border-bottom: 1.1px solid #e8e6e6;
        padding-bottom: 36px;
        span:nth-child(1) {
          margin-left: 30px;
        }
        span:nth-child(2) {
          color: #008cff;
          float: right;
          line-height: 38px;
          margin-right: 30px;
        }
      }
      p:nth-child(9) {
        margin-top: 24px;
        margin-bottom: 24px;
        input {
          height: 50px;
          width: 140px;
          border: 0;
          border-radius: 6px;
          font-size: 24px;
          margin-right: 20px;
        }
        .againBuy {
          background: #fb8400;
          color: #fff;
        }
        .evaluateBtn,
        .claimBtn {
          border: 2px solid #fb8400;
          color: #fb8400;
          background: #fff;
        }
      }
    }
  }
}
.lineHeight {
  height: 20px;
  background: rgba(247, 247, 247, 1);
}
</style>