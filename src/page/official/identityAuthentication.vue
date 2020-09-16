<!-- 组件说明 实名认证 -->
<template>
  <div class="identityAuthentication">
    <van-nav-bar title="实名认证" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="listBox">
      <div class="list">
        <span>姓名</span>
        <input type="text" placeholder="请输入姓名" ref="name" />
      </div>
      <div class="list">
        <span>证件号码</span>
        <input type="text" placeholder="请输入身份证号" ref="IdNumber" />
      </div>
      <div class="list">
        <span>获取验证码</span>
        <input type="text" placeholder="请输入短信验证码" maxlength="6" style="width:47%" ref="code" />
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
          style="color:#5d5757;background:#eee;"
        >{{auth_time}}秒</van-button>
      </div>
      <p>应监管要求需要实名认证，完成后即可查询保单信息</p>
    </div>
    <button @click="confirm()">确定</button>
  </div>
</template>

<script>
import api from "../../fetch/api";
import { isIdCard } from "../../util/validate";
export default {
  name: "identityAuthentication",
  components: {},
  data() {
    return {
      items: [],
      disabledVal: "",
      auth_time: 0,
      yzmicon: "",
      uuids: "",
      phoneVal: this.$route.query.phone,
      sendAuthCode: true,
      auth_time: 0,
      productId: "",
      account: "", //当前用户注册的手机号
    };
  },
  computed: {},
  beforeDestroy() {
    //   清楚所有计时器
    var end = setInterval(function() {}, 100);
    var start = end - 100 > 0 ? end - 100 : 0;
    for (var i = start; i < end; i++) {
      clearInterval(i);
    }
  },
  mounted(){
    var args = this.sign({
      userId: this.getCookie('ZB_JUSER_Mid'),
    });

    // 获取邀请码
    api.queryPersonalInfo(args).then(res=>{
      if(res.code == 20000){
        try {
          this.account = res.data.account;
        } catch (error) {
          console.log("没有获取到用户注册手机号");
        }
      }
    })
  },
  methods: {
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
      //获取短息验证码
      var args = this.sign({
        userPhone: this.account,
        btype: 9
      });
      // 实名认证
      api.getphoneCode(args).then(res => {
        if (res.code == "20000") {
          this.uuids = res.data.uuids;
          this.Toast.success(res.message);
        } else {
          this.Toast.fail(res.message);
        }
      });
    },
    // 确定
    confirm() {
      var name = this.$refs.name.value;
      var IdNumber = this.$refs.IdNumber.value;
      var code = this.$refs.code.value;
      if (name == "") {
        this.Toast("请输入姓名");
      } else if (!isIdCard(IdNumber)) {
        this.Toast("请输入证件号码");
      } else if (code == "") {
        this.Toast("请输入验证码");
      } else {
        // 校验验证码
        var args = this.sign({
          messageCode: code,
          userPhone: this.account,
          uuid: this.uuids
        });
        api.checkCode(args).then(res => {
          if (res.code == 20000) {
            var args1 = this.sign({
              mId: this.getCookie("ZB_JUSER_Mid"),
              realName: name,
              identificationNo: IdNumber,
              verifiedCode: code
            });
            api.identityAuthentication(args1).then(res => {
              if (res.code == 20000) {
                this.Toast.success(res.message);
                // 从保单管理进入到实名认证，认证之后跳回到保单管理页面
                if (this.$route.query.route) {
                  var route = this.$route.query.route;
                  this.$router.push(route);
                } else {
                  this.$router.push("personalData");
                }
              } else {
                this.Toast(res.message);
              }
            });
          } else {
            this.Toast(res.message);
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.identityAuthentication {
  // &>.list:nth-of-type(1){
  //     border-top: solid 20px #F7F7F7;
  // }
  .listBox {
    & > p {
      padding: 0 30px;
      line-height: 33px;
      margin-top: 15px;
      font-size: 24px;
      color: rgb(93, 87, 87);
    }
    & > div:nth-of-type(1) {
      border-top: solid 20px #f7f7f7;
    }
    .list {
      overflow: hidden;
      padding: 0 40px;
      line-height: 100px;
      border-bottom: 2px solid #ebedf0;
      & > span {
        display: inline-block;
        width: 23%;
        box-sizing: border-box;
        height: 100px;
        border: 0;
        float: left;
      }
      & > input {
        height: 98px;
        display: inline-block;
        margin: auto;
        width: 70%;
        text-indent: 2em;
        box-sizing: border-box;
        border: 0;
      }
      .van-icon__image {
        width: 34px;
        height: 34px;
      }
      .van-button--primary {
        width: 180px;
        background: rgba(249, 154, 49, 1);
        border: 0;
        border-radius: 50px;
      }
      .van-cell-group {
        line-height: 98px;
        height: 98px;
        float: left;
        // margin-top: 38px;
        display: inline-block;
        width: 500px;
        padding-left: 29px;
      }
      .van-cell {
        height: 98px;
        margin: auto;
        padding: 18px 32px;
        padding-right: 18px;
        padding-left: 28px;
        // margin-bottom: 20px;
        background: rgba(255, 255, 255, 1);
        float: left;
      }
      .nextstep {
        text-align: center;
        .van-button--large {
          width: 618px;
          height: 98px;
          line-height: 76px;
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
          margin-top: 7.8rem;
          text-align: center;
          width: 100%;
        }
      }
    }
  }

  & > button {
    width: 80%;
    height: 88px;
    background-color: #f99a31;
    margin: auto;
    color: white;
    display: block;
    font-size: 30px;
    border-radius: 44px;
    margin-top: 50px;
  }

  .van-button__text {
    font-size: 25px !important;
  }
}
.van-hairline--top-bottom::after {
  border: 0;
}
</style>