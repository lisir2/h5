<!-- 组件说明 -->
<template>
    <div class='loginMain'>
        <van-nav-bar title="密码登录" left-arrow @click-left="onClickLeft">
           <!-- <van-icon name="share" slot="right" /> -->
        </van-nav-bar>
        <div class="logoBox">
            <van-Image width="195" :src="logo" />
        </div>
        <div class="phoneIcon">
            <van-field
                placeholder="请输入登录密码"
                :left-icon="mimaicon"
                clearable
                v-model="passWordtext"
                @keyup="disabledShow"
                type="password"
            />
        </div>
        <div class="nextstep">
            <van-button type="primary" round size="large" v-bind:disabled="isAble" @click="checkPhone">登录</van-button>
            <!-- <div class="btn">登录</div> -->
            <!-- <p>保险经纪网不会在任何地方泄露您的号码</p> -->
            <div>
                <a href="javascript:;">
                    <span @click="quickLogin">短信快速登录</span>
                </a>
                <a href="javascript:;">
                    <span @click="forgetWord">忘记密码</span>
                </a>
            </div>
        </div>
        <p class="kefuNumber">客服热线：400-693-8080</p>
    </div>
</template>

<script>
import api from "../../fetch/api";
import md5 from "js-md5";

export default {
  name: "loginMain",
  components: {},
  data() {
    return {
      items: [],
      passWordtext: "",
      isAble: true,
      mimaicon: require("../../assets/images/login/mimaicon.png"),
      logo: require("../../assets/images/login/logo.png")
    };
  },
  mounted() {},
  watch:{
    passWordtext(val,old){
      // 去掉空格
      this.passWordtext=this.passWordtext.replace(/\s+/g,'');
    }
  },
  methods: {
    // 密码快速登录
    quickLogin() {
      this.$router.push({
        name: "quickLogin",
        query: {
          phone: this.$route.query.phone,
          routerLink: this.getQueryString('routerLink'),
          routerQuery: this.getQueryString('routerQuery'),
        }
      });
    },
    // 忘记密码
    forgetWord() {
      this.$router.push({
        name: "forgetWord",
        query: {
          phone: this.$route.query.phone,
          routerLink: this.getQueryString('routerLink'),
          routerQuery: this.getQueryString('routerQuery'),
        }
      });
    },
    disabledShow() {
      if (this.passWordtext) {
        return (this.isAble = false);
      } else {
        return (this.isAble = true);
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    checkPhone() {
      // 这里登录的时候passWordtext进行加密了两次 sign 方法加密一次，md5加密一次
      // 因为注册的时候，前端给密码md5加密了一次，后台又进行了一次md5加密 导致加密了两次
      // 然而登录的时候，后端是直接拿我们传的密码进行校验的，这里我们需要对密码进行两次md5加密
      // sing 方法的第二个参数，是要加密的字段
      var args = this.sign({ 
        userPhone: this.$route.query.phone,
        userPassword: md5(this.passWordtext),
        openId: this.getCookie('wxopenId')
      });

      api.getLogin(args).then(res => {
        if (res.code == "20000") {
          this.Toast.success(res.message);
          this.setCookie("openId", res.data.openId, "7");
          // 如果路径参数有routerLink，登录之后直接跳转routerLink路由
          if(this.getQueryString("routerLink") != ""){
            this.$router.push({
              path: this.getQueryString('routerLink'),
              query: this.getQueryString('routerQuery') ? JSON.parse(decodeURIComponent(this.getQueryString('routerQuery'))) : ''
            });
          } else {
            this.$router.push({ path: "/mine" });
          }
        }else{
          this.Toast.fail(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss">
body {
  background: #fff;
  .loginMain {
    width: 100%;
    overflow: hidden;
    background: #fff;
    .van-nav-bar__title {
      font-size: 28px;
    }
    .logoBox {
      .van-image {
        display:block;
        margin:118px auto 95px;
      }
    }

    .van-icon__image {
      width: 34px;
      height: 34px;
    }
    .van-cell {
      border: 2px solid rgba(221, 221, 221, 1);
      border-radius: 50px;
      width: 618px;
      margin: auto;
      padding: 18px 32px;
    }
    .van-button--primary {
      background: #f99a31;
      border: 0;
    }
    .van-field__control {
      text-indent: 1em;
    }
    .nextstep {
      text-align: center;
      margin-top: 138px;
      .btn {
        width: 618px;
        height: 88px;
        background: rgba(249, 154, 49, 1);
        border-radius: 44px;
        text-align: center;
        line-height: 88px!important;
        font-size:32px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:108px;
      }
      .van-button__text{
          font-size: 32px;
      }
      .van-button--large {
        width: 618px;
        height: 88px;
        line-height: 88px;
        margin: 20px 0;
      }
      p {
        color: #8f8a8a;
      }
      div {
        width: 580px;
        display: block;
        margin: auto;
        a:nth-child(2) {
          // display: inline-block;
          float: right;
          color: #0088ff;
        }
        a:nth-child(1) {
          float: left;
        }
      }
    }
    .kefuNumber {
      margin-top: 5.4rem;
      text-align: center;
      width: 100%;
      color: #333;
      font-size: 24px;
    }
    .phoneIcon {
      height: 88px;
      .van-icon {
        height: 100%;
        line-height: initial!important;
      }
      .van-image {
        height: 100%;
      }
      img {
        vertical-align: middle;
      }
    }
  }
}
</style>