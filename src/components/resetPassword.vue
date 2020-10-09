<!-- 组件说明 重置密码页面-->
<template>
  <div class="resetPassword">
    <van-nav-bar title="重置密码" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <p class="quickPhone">密码由字母+数字组成，长度6~16位</p>
    <van-cell-group>
      <van-field
        placeholder="请输入新密码"
        type="password"
        :left-icon="invitation"
        v-model="firstVal"
        clearable
      />
      <van-field
        placeholder="再次输入新密码"
        type="password"
        :left-icon="mimaicon"
        v-model="secondVal"
        clearable
      />
    </van-cell-group>
    <div class="nextstep">
      <van-button type="primary" round size="large" @click="resetPassword">下一步</van-button>
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
  name: "resetPassword",
  components: {},
  data() {
    return {
      items: [],
      firstVal: "",
      secondVal: "",
      isAble: true,
      mimaicon: require("../assets/images/login/mimaicon.png"),//icon-invitation
      invitation: require("../assets/images/login/icon-invitation.png"),//icon-invitation
    };
  },
  mounted() {
    // console.log(this.$route.query.phonecode)
    // console.log(this.$route.query.phone)
    // console.log(this.$route.query.uuid)
  },
  methods: {
    disabledShow() {
      if (this.firstVal && this.secondVal) {
        if (this.firstVal === this.secondVal) {
          //两次输入密码相同
          var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
          if (reg.test(this.firstVal)) {
            var args = this.sign({
              userPhone: this.$route.query.phone,
              userPassword: md5(this.secondVal),
              messageCode: this.$route.query.phonecode,
              uuid: this.$route.query.uuid
            });
            api.resetWord(args).then(res => {
              console.log(res);
              if (res.code == "20000") {
                Toast.success("密码重置成功");
                this.$router.push({
                  path: "/resetSuccess",
                  query: {
                    routerLink: this.getQueryString('routerLink'),
                    routerQuery: this.getQueryString('routerQuery'),
                  }
                });
              } else {
                Toast(res.message);
              }
            });
          } else {
            Toast("密码由字母+数字组成，长度6~16位!");
            return;
          }
        } else {
          Toast("两次密码不相同");
          return;
        }
      } else {
        Toast("请确认密码填写");
        return;
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    resetPassword() {
      this.disabledShow();
    }
  }
};
</script>

<style lang="scss">
body {
  background: #fff;
}
.resetPassword {
  .van-nav-bar__title {
    font-size: 28px;
  }
  .van-cell {
    width: 618px;
    height: 88px;
    border: 2px solid #ccc;
    border-radius: 44px;
    margin: 20px 66px;
  }
  // .van-icon__image {
  //   width: inherit;
  //   height: inherit;
  // }
  .van-icon {
    line-height: initial!important;
  }
  .van-image__img {
    width: 36px;
    height: 36px;
  }
  .van-field__control {
    text-indent: 1em;
  }
  .quickPhone {
    padding: 31px;
    font-size: 28px;
    color: #302d2d;
    background: #f7f7f7;
  }
  .nextstep {
    text-align: center;
    .van-button--large {
      width: 618px;
      height: 88px;
      line-height: 88px;
      margin: 30px 0;
      margin-top: 140px;
    }
    .van-button--primary {
      background: #f99a31;
      border: 0;
    }
    div {
      width: 70%;
      display: inline-block;
      margin-top: 20px;
      a {
        display: inline-block;
        color: #0088ff;
      }
      span {
        float: left;
      }
    }
    .kefuNumber {
      text-align: center;
      width: 100%;
      position: absolute;
      top: 90%;
      color: #333;
    }
  }
  [class*=van-hairline]::after{
    border: 0;
  }
}
</style>