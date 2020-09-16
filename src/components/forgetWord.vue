<!-- 组件说明 -->
<template>
    <div class='forgetWord'>
        <van-nav-bar title="身份验证" left-arrow @click-left="onClickLeft">
           <!-- <van-icon name="share" slot="right" /> -->
        </van-nav-bar>
        <p class="quickPhone">验证码短信已发送到:<span>{{phone}}</span></p>
        <van-cell-group id="code">
            <van-field
                center
                clearable
                :left-icon="yzm"
                placeholder="请输入短信验证码"
                v-model="phoneCode"
                maxlength="6"
                @keyup="disabledShow"
            >
            <van-button v-show="sendAuthCode" slot="button" size="small" type="primary" @click="getCode">发送验证码</van-button>
            <van-button v-show="!sendAuthCode" slot="button" size="small" type="primary" style="color:#999;background:#eee;">{{auth_time}}秒</van-button>
            </van-field>
        </van-cell-group>
        <div class="nextstep">
            <van-button type="primary" round size="large" v-bind:disabled="isAble" @click="checkPhoneCode">下一步</van-button>
            <!-- <p>密码登录</p> -->
            <p class="kefuNumber">客服热线：400-693-8080</p>
        </div>
    </div>
</template>

<script>
import { Toast } from "vant";
import api from "../fetch/api";
import md5 from "js-md5";
export default {
  name: "forgetWord",
  components: {},
  data() {
    return {
      items: [],
      phoneCode: "",
      isAble: true,
      yzm: require("../assets/images/login/yzmicon.png"),
      uuids: "",
      sendAuthCode: true,
      auth_time: 0,
      phone: "",
      productId: ""
    };
  },
  mounted() {
    this.phone = this.$route.query.phone;
    this.productId = this.$route.query.productId;
  },
  methods: {
    disabledShow() {
      if (this.phoneCode.length == 6) {
        return (this.isAble = false);
      } else {
        return (this.isAble = true);
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    getCode() {
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
    checkPhoneCode() {
      var args = this.sign({
        userPhone: this.$route.query.phone,
        messageCode: this.phoneCode,
        uuid: this.uuids
      });
      api.checkCode(args).then(res => {
        console.log(res);
        if (res.code == "20000") {
          this.$router.push({
            path: "/resetPassword",
            query: {
              phonecode: this.phoneCode,
              phone: this.$route.query.phone,
              uuid: this.uuids,
              routerLink: this.getQueryString('routerLink'),
              routerQuery: this.getQueryString('routerQuery'),
            }
          });
        } else {
          Toast.fail(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scope>

.forgetWord {
  background: #fff;
  #code {
    border: none !important;
  }
  .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
    border-width:0;
  }
  .van-nav-bar__title {
    font-size: 28px;
  }
  .van-field__control {
    text-indent: 1em;
  }
  .van-icon__image {
    width: 34px;
    height: 34px;
  }
  .van-cell {
    border: 0.026667rem solid #dddddd;
    border-radius: 0.666667rem;
    width: 8.24rem;
    height: 1.173333rem;
    margin: auto;
    padding: 0 0.426667rem;
    padding-right: 18px;
    padding-left: 28px;
    background: white;
    margin-top: 38px;
  }
  .van-button--primary {
    background: #f99a31;
    border: 0;
    border-radius: 44px;
  }
  .quickPhone {
    color: #302d2d;
    font-size: 28px;
    padding: 30px;
    background: rgba(247, 247, 247, 1);
    span {
      color: #0088ff;
    }
  }
  .nextstep {
    text-align: center;
    margin-top: 140px;
    .van-button--large {
      width: 618px;
      height: 88px;
      line-height: 88px;
    }

    // div{
    //     width: 70%;
    //     display: inline-block;
    //     margin-top: 20px;
    //     a{
    //         display: inline-block;
    //         float: right;
    //         color: #0088ff;
    //     }
    //     span{
    //         float: left;
    //     }
    // }
    .kefuNumber {
      margin-top: 8.8rem;
      text-align: center;
      width: 100%;
    }
  }

  .van-button__text {
    font-size: 25px !important;
  }
}
</style>