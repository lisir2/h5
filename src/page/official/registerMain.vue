<!-- 组件说明 -->
<template>
  <div class="registerMain">
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft">
      <!-- <van-icon name="share" slot="right" /> -->
    </van-nav-bar>
    <p class="quickPhone">
      验证码短信已发送到:
      <span>{{phoneVal}}</span>
    </p>
    <van-field
      center
      clearable
      :left-icon="yzmicon"
      placeholder="请输入短信验证码"
      v-model="phoneCode"
      maxlength="6"
      @keyup="disabledShow"
    >
      <!-- <van-button slot="button" size="small" type="primary" @click="getCode">发送验证码</van-button> -->
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
        style="color:#ddd;background:#eee;"
      >{{auth_time}}秒</van-button>
    </van-field>
    <van-field
      placeholder="密码由字母+数字组成，长度6~16位"
      :left-icon="mimaicon"
      v-model="password"
      @keyup="disabledShow"
      type="password"
    />
    <van-field placeholder="请输入邀请码/推荐人手机号（选填）" :left-icon="yqmicon" v-model="agentCode" :readonly="LockInvitationCode"/>
    <div class="nextstep">
      <van-button
        type="primary"
        round
        size="large"
        v-bind:disabled="isAble"
        @click="registSuccess"
      >立即注册</van-button>
      <p>
        <van-checkbox v-model="checked" checked-color="#F99A31"></van-checkbox>&nbsp我已同意
        <a @click="showFile('zgbxjj_zcxy.pdf')">《保险经纪网协议》</a>
      </p>
      <p class="kefuNumber">客服热线：400-693-8080</p>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import api from "../../fetch/api";
import md5 from "js-md5";
export default {
  name: "registerMain",
  components: {},
  data() {
    return {
      items: [],
      phoneCode: "",
      isAble: true,
      checked: false, //是否已同意相关文件
      yzmicon: require("../../assets/images/login/yzmicon.png"),
      mimaicon: require("../../assets/images/login/mimaicon.png"),
      yqmicon: require("../../assets/images/login/dlricon.png"),
      phoneVal: this.$route.query.phone,
      password: "",
      agentCode: "", // 代理人邀请码
      uuids: "",
      sendAuthCode: true,
      auth_time: 0,
      LockInvitationCode: false, // 邀请码是否锁定（链接有邀请码锁定）
    };
  },
  mounted() {
    try {
      this.agentCode = JSON.parse(
        this.getQueryString("routerQuery")
      ).invitationCode;
      this.LockInvitationCode = JSON.parse(this.getQueryString("routerQuery")).invitationCode ? true : false;
    } catch (error) {
      console.log("链接没有邀请码");
    }
  },
  methods: {
    disabledShow() {
      if (this.phoneCode.length == 6 && this.password && this.password.length >= 6) {
        return (this.isAble = false);
      } else {
        return (this.isAble = true);
      }
    },
    onClickLeft() {
      this.$dialog
        .confirm({
          message: "离注册成功仅一步之遥，确认放弃吗"
        })
        .then(() => {
          this.$router.go(-1);
        })
        .catch(() => {});
    },
    // 获取验证码
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
      //获取短息验证码
      var args = this.sign({
        userPhone: this.$route.query.phone,
        btype: "3"
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
    registSuccess() {
      if (this.checked) {
        var that = this;
        var args = {
          userPhone: this.$route.query.phone,
          userPassword: md5(this.password), // 密码md5加密
          messageCode: this.phoneCode,
          uuid: this.uuids,
          topInvitationCode: this.agentCode, // 用户邀请码
          topActivityCode: this.getQueryString("topActivityCode") // 渠道邀请码
        };

        // 是否是微信
        if (this.is_weixn()) {
          args.openId = this.getCookie("wxopenId");
        }

        api.getRegister(that.sign(args)).then(res => {
          console.log(res);
          if (res.code == "20000") {
            Toast.success("注册成功");
            if (this.getQueryString("routerLink")) {
              this.$router.push({
                path: this.getQueryString("routerLink"),
                query: decodeURIComponent(this.getQueryString("routerQuery")) ? JSON.parse(
                  decodeURIComponent(this.getQueryString("routerQuery"))
                ) : ''
              });
            } else {
              this.$router.push({ path: "/home" });
            }
          } else {
            Toast.fail(res.message);
          }
        });
      } else {
        this.Toast("请同意协议");
      }
    },
    showFile(url) {
      layer.open({
        type: 1,
        title: "信息(点击“+”号放大查看条款)",
        area: ["100%", "100%"], //宽高
        content:
          "<iframe src='./static/pdf/web/viewer.html?file=" +
          url +
          "' style='width:100%;height:100%'></iframe>"
      });
    }
  }
};
</script>

<style lang="scss">
.registerMain {
  background: #fff;
  .van-nav-bar__title {
    font-size: 28px;
  }
  .van-icon__image {
    width: 36px;
    height: 36px;
  }
  .van-field__control {
    text-indent: 0.5em;
  }
  .van-button--primary {
    background: rgba(249, 154, 49, 1);
    border: 0;
    border-radius: 50px;
  }
  .van-button--small {
    height: 48px;
    line-height: 48px;
    font-size: 22px;
  }
  .quickPhone {
    padding: 30px 0;
    width: 618px;
    margin: auto;
    color: #302d2d;
    span {
      color: #0088ff;
    }
  }
  .van-cell {
    border: 2px solid rgba(221, 221, 221, 1);
    border-radius: 50px;
    width: 618px;
    margin: auto;
    padding: 18px 32px;
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 1);
  }
  .nextstep {
    text-align: center;
    margin-top: 140px;
    .van-button--large {
      height: 88px;
      width: 618px;
      line-height: 88px;
      margin: 30px 0;
      background: rgba(249, 154, 49, 1);
      border: 0;
    }
    .van-icon {
      font-size: 30px;
    }
    .van-checkbox {
      display: inline-block;
      vertical-align: middle;
      margin-top: -6px;
    }
    p {
      color: #333;
      a {
        color: #5b8aff;
      }
    }
    .kefuNumber {
      font-size: 28px;
      width: 100%;
      text-align: center;
      position: absolute;
      top: 90%;
    }
  }
}
</style>