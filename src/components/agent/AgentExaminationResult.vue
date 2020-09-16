<!-- 组件说明 -->
<template>
  <div class="AgentExaminationResult">
    <van-nav-bar title="考试结果" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="examinationResult">
      <img src alt />
      <p class="grade">
        您的成绩是:
        <span class="grade"></span>分
      </p>
      <h4 class="IsPass"></h4>
      <p class="NoPass" style="color: #8f8f94;">依照行业监管要求，考试成绩≥80分后，方可申请代理人！为了您早日通过考试，建议先观看答题解析内容。</p>
      <p class="Pass">
        恭喜您通过考试
        <br />信息认证审核通过后，即可获得代理人资质。
      </p>
      <button
        class="NoPass btnColor"
        @click="$router.push('/AgentAnswerAnalysis')"
      >答题解析</button>
      <button class="NoPass" @click="$router.push('/AgentExam')">重新考试</button>
      <button class="Pass btnColor" @click="$router.push('/AgentAuthentication')">信息认证</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AgentExaminationResult",
  components: {},
  data() {
    return {
      passExam: require("@/assets/images/agent/passExam.png"),
      FailExam: require("@/assets/images/agent/FailExam.png")
    };
  },
  mounted() {
    // grade获取分数
    var grade = this.$route.query.grade;
    $(".grade").html("你的成绩:" + grade + "分");
    if (grade >= 80) {
      $(".IsPass").html("通过");
      $(".IsPass").css("color", "#009944");
      $(".Pass").show();
      $(".examinationResult img").attr("src", this.passExam);
    } else {
      $(".IsPass").html("不通过");
      $(".IsPass").css("color", "#F31818");
      $(".NoPass").show();
      $(".examinationResult img").attr("src", this.FailExam);
    }
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  }
};
</script>

<style lang="scss" scoped>
.grade {
  font-weight: bold;
  color: black;
  font-size: 32px;
}
.examinationResult {
  text-align: center;
  padding: 0 10px;
}
.examinationResult > img {
  width: 75%;
  margin: 60px auto 0;
}
.examinationResult > h3 {
  margin-bottom: 20px;
}
.examinationResult button {
  width: 80%;
  margin-top: 0.3rem;
  height: 75px;
  font-size: 0.28rem;
  border-radius: 50px;
  border: 1px solid #dddddd;
}
.IsPass {
  margin:10px 0 20px 0;
  font-size: 33px;
  font-weight: 600;
}
.NoPass,
.Pass {
  display: none;
  width: 90%;
  text-align: center;
  margin: 0 auto;
}
.examinationResult button.btnColor {
  border: none;
  background-color: #f99a31;
  color: white;
  margin-top: 0.5rem;
}
</style>