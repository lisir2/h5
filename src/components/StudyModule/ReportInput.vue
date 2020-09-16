<!-- 组件说明 -->
<template>
  <div class="ReportInput">
    <van-nav-bar title="举报投诉" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="container">
      <div class="desc">
        <textarea
          rows="8"
          cols="20"
          name="message"
          placeholder="请详细描述您的问题（必填）"
          @input="inputIssue"
          ref="reportContent"
          maxlength="150"
        ></textarea>
      </div>
      <div class="font_no">
        <span class="start_no" style="color: #F31818;">{{textLength}}</span>/150
      </div>
      <input type="text" placeholder="请输入手机号码" ref="phone" />
      <div class="submit" @click="submit()">提交</div>
    </div>
  </div>
</template>

<script>
import api from "@/fetch/api";
export default {
  name: "ReportInput",
  components: {},
  data() {
    return {
      textLength: 0
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //   输入内容
    inputIssue() {
      this.textLength = this.$refs.reportContent.value.length;
    },
    // 投诉提交
    submit() {
      if (this.$refs.reportContent.value == "") {
        this.Toast("请输入投诉内容");
      } else if (
        this.$refs.phone.value == "" ||
        !this.Utils.isPhoneNumber(this.$refs.phone.value)
      ) {
        this.Toast("请输入正确的手机号码");
      } else {
        // 投诉
        api
          .complaintSubmit({
            classroomId: 353,
            classroomTitle: decodeURIComponent(this.getQueryString("title")),
            complaintType: decodeURIComponent(this.getQueryString("type")),
            complaintPerson: this.$refs.phone.value,
            complaintContent: this.$refs.reportContent.value
          })
          .then(res => {
            if (res.success == true) {
              const toast = this.Toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: "提交成功"
              });

              let second = 2;
              const timer = setInterval(() => {
                second--;
                if (!second) {
                  clearInterval(timer);
                  // 手动清除 Toast
                  this.Toast.clear();
                  this.$router.push({path:'StudyArticle',query:{id:this.getQueryString('id'),readingQuantity:this.getQueryString('readingQuantity')}})
                }
              }, 1000);
              this.Toast.success("提交成功");
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ReportInput {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  .desc {
    color: #302d2d;
  }

  .descTitle {
    padding: 40px 0;
    font-size: 28px;
  }

  .desc textarea {
    border: none;
    padding: 45px 30px;
    width: 100%;
  }

  .font_no {
    text-align: right;
    margin-right: 30px;
    background-color: #f7f7f7;
    padding: 10px 0;
  }

  .container input {
    border: none;
    outline: none;
    padding: 25px 30px;
    width: 100%;
    display: block;
  }

  .submit {
    width: 600px;
    height: 88px;
    background: rgba(249, 154, 49, 1);
    border-radius: 44px;
    margin: 74px auto 0;
    font-size: 32px;
    color: rgba(255, 255, 255, 1);
    line-height: 88px;
    text-align: center;
  }
}
</style>