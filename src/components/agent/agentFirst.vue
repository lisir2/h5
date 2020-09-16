<!-- 组件说明 代理人首页-->
<template>
  <div class="AgentFirst">
    <van-swipe indicator-color="white" :autoplay="3000">
      <van-swipe-item>
        <van-image :src="banner1" alt></van-image>
      </van-swipe-item>
      <van-swipe-item>
        <van-image :src="banner2" alt></van-image>
      </van-swipe-item>
    </van-swipe>
    <div class="session">
      <img src="../../assets/images/agent/threeStype.png" alt />
      <div style="padding:0.2rem 0 0.5rem 0;" @click="agentStatus()">
        <img src="../../assets/images/agent/agentBtn.png" />
      </div>
      <img src="../../assets/images/agent/centerImg.png" />
    </div>
    <!--弹框html-->
    <div class="inspection">
      <div class="title">
        <img src alt />
        <span style="margin-left: 5px;"></span>
      </div>
      <div class="msg"></div>
      <a class="reUplode" href="javascript:;">确定</a>
    </div>
    <AgentFooter></AgentFooter>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Image } from "vant";
Vue.use(Swipe).use(SwipeItem);
import AgentFooter from "./AgentFooter";
import api from "@/fetch/api";
export default {
  name: "AgentFirst",
  components: {
    AgentFooter
  },
  data() {
    return {
      banner1: require("../../assets/images/agent/agentBanner2.png"),
      banner2: require("../../assets/images/agent/agentBanner.png"),
      success: require("../../assets/images/agent/success.jpg"),
      successful: require("../../assets/images/agent/icon-successful.png")
    };
  },
  computed: {},
  methods: {
    //弹框js icon:弹窗图片  link:确定之后跳转地址 text：提示文本 title：弹出框提示文字 imgText:图片旁边的文字提示 btnText:按钮文字
    inspection(icon, link, text, title, imgText, btnText) {
      var that = this;
      $(".title img").attr("src", icon);
      $(".reUplode").html(btnText);
      $(".msg").html(text);
      $(".title span").html(imgText);
      layer.open({
        type: 1,
        area: "90%", //宽高
        shadeClose: true,
        title: title ? title : "提示",
        content: $(".inspection").html(),
        success: function() {
          $(".reUplode").click(function() {
            that.$router.push(link);
            layer.closeAll();
          });
        }
      });
    },
    agentStatus() {
      var args = this.sign({
        mId: this.getCookie("ZB_JUSER_Mid") 
      });
      // 获取代理人信息
      api.getAgentAuditInformation(args).then(res => {
          if (res.code != 20000) {
            // 已经登录返回错误抛出异常
            if(this.getCookie("ZB_JUSER_Mid")){
              this.$dialog.alert({
                message: res.message,
              });
            }else{
              this.$router.push({
                path: "/loginRegister",
                query: {
                  routerLink: this.$route.path
                }
              })
            }
          } else if (res.data.categoryCode.indexOf("personal") == 0) {
            // 判断是否是代理人auditStatus == 2:为审核成功
            if (res.data.auditStatus == "2") {
              this.inspection(
                this.success,
                "/mine",
                "您已是代理人，无需重新申请，去推广产品赚取佣金吧！",
                "提示",
                "资质审核已通过",
                "确定"
              );
            } else if (res.data.auditStatus == "1") {
              this.inspection(
                this.successful,
                "/mine",
                "尊敬的用户，您的代理人申请正在审核中，请耐心等待！审核人员将在1~3个工作日内完成资料审核。",
                "提示",
                "审核中",
                "确定"
              );
            } else if (res.data.auditStatus == "0") {
              if (res.data.isAnswerStatus == 0) {
                // 申请代理人没考过试 先去学习在考试 -> AgentExam
                this.$router.push("/agentLearn");
              } else {
                // 考试通过但是没有完善资料
                this.inspection(
                  this.successful,
                  "/AgentAuthentication",
                  "请完善您的资料交由后台审核",
                  "提示",
                  "完善资料",
                  "确定"
                );
              }
            } else {
              // 审核不通过
              this.inspection(
                this.successful,
                "/AgentAuthentication",
                "您提交的信息审核不通过，原因：" +
                  res.data.failureAuditReason +
                  "，请重新提交审核材料，审核通过后可正常展业，获取佣金！</br>如有疑问您可拨打客服热线<span style='color:red'>400-693-8080</span></br>我们将竭诚为您服务。",
                "提示",
                "资质审核未通过",
                "重新认证"
              );
            }
          } else if (res.data.categoryCode == "ordinary") {
            if (res.data.auditStatus == "2") {
              this.inspection(
                this.success,
                "/mine",
                "您已是代理人，无需重新申请，去推广产品赚取佣金吧！",
                "提示",
                "资质审核已通过",
                "确定"
              );
            } else if (res.data.auditStatus == "1") {
              this.inspection(
                this.successful,
                "/mine",
                "尊敬的用户，您的代理人申请正在审核中，请耐心等待！审核人员将在1~3个工作日内完成资料审核。",
                "提示",
                "审核中",
                "确定"
              );
            } else if (res.data.auditStatus == "0") {
              console.log(res.data.examinationNo);
              if (res.data.isAnswerStatus == 0) {
                // 申请代理人没考过试 先去学习在考试 -> AgentExam
                this.$router.push('/agentLearn');
              } else {
                // 考试通过但是没有完善资料
                this.inspection(
                  this.successful,
                  "/AgentAuthentication",
                  "请完善您的资料交由后台审核",
                  "提示",
                  "完善资料",
                  "确定"
                );
              }
            } else {
              // 审核不通过
              this.inspection(
                this.successful,
                "/AgentAuthentication",
                "您提交的信息审核不通过，原因：" +
                  res.data.failureAuditReason +
                  "，请重新提交审核材料，审核通过后可正常展业，获取佣金！</br>如有疑问您可拨打客服热线<span style='color:red'>400-693-8080</span></br>我们将竭诚为您服务。",
                "提示",
                "资质审核未通过",
                "重新认证"
              );
            }
          } else if (res.data.categoryCode == "company") {
            this.inspection(
              this.successful,
              "/AgentAuthentication",
              "您的身份为企业用户，请您完善相关信息",
              "提示",
              "完善资料"
            );
          }
        });
    }
  },
  mounted() {
    console.log(this.$route)
  }
};
</script>

<style lang="scss" scoped>
header img {
  width: 100%;
  display: block;
  height: 100%;
}

.session {
  div {
    img {
      width: 250px;
      display: block;
      margin: auto;
    }
  }
}

/*弹框css*/
.inspection {
  background-color: red;
  height: 400px;
  width: 80%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 11;
  display: none;
}

.layui-layer .title {
  text-align: center;
  padding: 60px 0px;
}

.title img {
  width: 100px;
}

.layui-layer .title img,
span {
  padding-left: 0;
  vertical-align: middle;
  display: inline-block;
  float: none;
}

.layui-layer .msg {
  width: 80%;
  margin: 0 auto;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: black;
  line-height: 42px;
}

.layui-layer .reUplode {
  display: block;
  width: 75%;
  height: 80px;
  margin: 60px auto;
  background: rgba(249, 154, 49, 1);
  border-radius: 44px;
  text-align: center;
  line-height: 80px;
  color: #fff;
  font-size: 32px;
  text-decoration: none;
}
</style>
