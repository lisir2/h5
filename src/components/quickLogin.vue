<!-- 组件说明 -->
<template>
  <div class="quickLogin">
    <van-nav-bar title="短信登录" left-arrow @click-left="onClickLeft">
      <!-- <van-icon name="share" slot="right" /> -->
    </van-nav-bar>
    <p class="quickPhone">
      您的手机号为:
      <span class="phoneNumber">{{phoneVal}}</span>
    </p>
    <van-cell-group>
      <van-field
        center
        clearable
        :left-icon="yzmicon"
        placeholder="请输入短信验证码"
        maxlength="6"
        v-model="disabledVal"
        @keyup="disabledShow"
      >
        <van-button
          v-show="sendAuthCode"
          slot="button"
          size="small"
          type="primary"
          @click="getAuthCode"
        >获取验证码</van-button>
        <van-button
          v-show="!sendAuthCode"
          slot="button"
          size="small"
          type="primary"
          style="color:#999;background:#eee;"
        >{{auth_time}}秒</van-button>
      </van-field>
    </van-cell-group>
    <div class="nextstep">
      <van-button type="primary" round size="large" v-bind:disabled="isAble" @click="quickLogin">登录</van-button>
      <p @click="passwdLogin">密码登录</p>
      <p class="kefuNumber">客服热线：400-693-8080</p>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import api from "../fetch/api";
import md5 from "js-md5";
export default {
  name: "quickLogin",
  components: {},
  data() {
    return {
      items: [],
      disabledVal: "",
      isAble: true,
      yzmicon: require("../assets/images/login/yzmicon.png"),
      uuids: "",
      phoneVal: this.$route.query.phone,
      sendAuthCode: true,
      auth_time: 0,
      productId: ""
    };
  },
  mounted() {
    this.productId = this.$route.query.productId;
    console.log(this.productId);
  },
  methods: {
    disabledShow() {
      if (this.disabledVal.length == 6) {
        return (this.isAble = false);
      } else {
        return (this.isAble = true);
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    getAuthCode() {
      // 短信倒计时
      this.sendAuthCode = false;
      this.auth_time = 60;
      var auth_timetimer = setInterval(() => {
        this.auth_time--;
        if (this.auth_time <= 0) {
          this.sendAuthCode = true;
          clearInterval(auth_timetimer);
        }
      }, 1000);

      //获取短信验证码
      var args = this.sign({
        userPhone: this.$route.query.phone,
        btype: 3
      });
      api.getphoneCode(args).then(res => {
        console.log(res);
        if (res.code == "20000") {
          this.uuids = res.data.uuids;
          Toast.success(res.message);
        } else {
          Toast.fail(res.message);
        }
      });
    },
    quickLogin() {
      var args = this.sign({
        userPhone: this.$route.query.phone, // 手机号码
        messageCode: this.disabledVal, // 短信验证码
        uuid: this.uuids // 识别码
      });
      api.quickLogin(args).then(res => {
        console.log(res);
        if (res.code == "20000") {
          Toast.success("登录成功!");
          this.setCookie("openId", res.data.openId, "7");
          if(this.getQueryString("routerLink") != ''){
            this.$router.push({
              path: this.getQueryString('routerLink'),
              query: this.getQueryString('routerQuery') ? JSON.parse(decodeURIComponent(this.getQueryString('routerQuery'))) : ''
            });
          } else {
            this.$router.push({ path: "/mine" });
          }
        } else {
          Toast.fail(res.message);
        }
      });
    },
    passwdLogin() {
      this.$router.push({
        path: "/loginMain",
        query: {
          phone: this.getQueryString("phone"),
          routerLink: this.getQueryString('routerLink'),
          routerQuery: this.getQueryString('routerQuery'),
        }
      });
    }
  }
};
</script>

<style lang="scss">
.phoneNumber {
  color: #5b8aff;
}
.quickLogin {
  background: #fff;
  .van-nav-bar__title {
    font-size: 28px;
  }
  .van-field__control {
    text-indent: 1em;
  }
  .quickPhone {
    padding: 30px 0;
    padding-left: 30px;
    margin: auto;
    background: rgba(247, 247, 247, 1);
    border-top: 1px solid rgba(247, 247, 247, 1);
  }
  .van-cell-group{
    .van-button__text{
      font-size: 25px; 
      padding: 0px 16px;
    }
  }
  .van-icon__image {
    width: 34px;
    height: 34px;
  }
  .van-button--primary {
    background: rgba(249, 154, 49, 1);
    border: 0;
    border-radius: 50px;
  }
  .van-cell-group {
    margin-top: 38px;
  }
  .van-cell {
    border: 2px solid rgba(221, 221, 221, 1);
    border-radius: 50px;
    width: 618px;
    height: 88px;
    margin: auto;
    padding: 18px 32px;
    padding-right: 18px;
    padding-left: 28px;
    // margin-bottom: 20px;
    background: rgba(255, 255, 255, 1);
  }
  .nextstep {
    text-align: center;
    .van-button--large {
      width: 618px;
      height: 88px;
      line-height: 88px;
      margin-top: 140px;
      margin-bottom: 30px;
    }
    p {
      color: #333;
    }
    div {
      width: 70%;
      display: inline-block;
      margin-top: 20px;
      a {
        display: inline-block;
        float: right;
        color: #0088ff;
      }
      span {
        float: left;
      }
    }
    .kefuNumber {
      margin-top: 8.4rem;
      text-align: center;
      width: 100%;
      font-size: 24px;
    }
    .van-button__text {
      font-size: 32px ;
    }
  }
}
.van-hairline--top-bottom::after {
  border: 0;
}
</style>