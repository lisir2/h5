<!-- 组件说明 -->
<template>
    <div class='loginRegister'>
        <van-nav-bar title="登录/注册" left-arrow @click-left="onClickLeft">
           <!-- <van-icon name="share" slot="right" /> -->
        </van-nav-bar>
        <div class="logoBox">
            <van-Image width="195" :src="logo" />
        </div>
       <div class="phoneIcon">
           <van-field
            placeholder="请输入手机号码"
            :left-icon="phone"
            clearable
            v-model="disabledVal"
            @keyup="disabledShow"
        />
       </div>
        <div class="nextstep">
            <van-button type="primary" class="nextText" round size="large" v-bind:disabled="isAble" @click="checkPhone(disabledVal)">下一步</van-button>
            <p>保险经纪网不会在任何地方泄露您的号码</p>
        </div>
        <div class="advLogin">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in items" :key="index">
                <img :src="item.url" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import api from "../../fetch/api";
import md5 from "js-md5";

export default {
  name: "loginRegister",
  components: {},
  data() {
    return {
      items: [
        {
          url: require("../../assets/images/login/fastadv.jpg")
        }
      ],
      disabledVal: "",
      isAble: true,
      logo: require("../../assets/images/login/logo.png"),
      phone: require("../../assets/images/login/mobile.png")
    };
  },
  watch:{
    disabledVal(val,old){
      this.disabledVal = val.substring(0,11);
    }
  },
  mounted() {
    // console.log(md5('hello'))
  },
  methods: {
    disabledShow() {
      var re = /^1(3|4|5|7|8)\d{9}$/;
      if (this.disabledVal && re.test(this.disabledVal)) {
        return (this.isAble = false);
      } else {
        return (this.isAble = true);
      }
    },
    checkPhone(val) {
      var args = this.sign({
        userPhone: val,
        userPassword: "",
        openId: this.getCookie("wxopenId"),
      });

      api.getLogin(args).then(res => {
        // 账号已注册去跳转登录
        if (res.code == "20006") {
          this.$router.push({
            path: "/loginMain",
            query: {
              phone: this.disabledVal,
              routerLink: this.getQueryString('routerLink'),
              routerQuery: this.getQueryString('routerQuery'),
            }
          });
          // 账号未注册跳转注册
        }else if (res.code == "20002") {
          this.$router.push({
            path: "/registerMain",
            query: {
              phone: this.disabledVal,
              routerLink: this.getQueryString('routerLink'),
              routerQuery: this.getQueryString('routerQuery'),
            }
          });
        }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.loginRegister {
  background: #fff;
  .van-swipe {
    margin: 30px;
    height: 150px;
    border-radius: 10px;
  }
  .van-cell-group {
    background: initial;
    border: 0;
  }
  .van-nav-bar__title {
    font-size: 28px;
  }
  .van-swipe {
    display: grid;
  }
  .van-field__control {
    text-indent: 1em;
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
  .logoBox {
    .van-image {
      display: block;
      margin:118px auto 95px;
    }
  }

  .nextstep {
    text-align: center;
    .van-button--large {
      width: 618px;
      height: 88px;
      line-height: 88px;
      margin: 20px 0;
      margin-top: 138px;
      box-shadow: 0px 6px 20px #f99a31;
      font-size: 32px;
    }
    p {
      color: #8f8a8a;
      margin-top: 10px;
      font-size: 24px;
    }
  }
  .advLogin {
    margin-top: 160px;
  }
  .phoneIcon {
    height: 88px;
    .van-field {
      height: 88px;
    }
    .van-icon {
      height: 100%;
    }
    .van-icon::before {
      vertical-align: middle;
    }
    .van-image {
      display: inline-block;
    }
    .van-image__img {
      img {
        vertical-align: middle;
      }
    }
  }
  .van-button__text {
    font-size: 32px !important;
  }
}
</style>
