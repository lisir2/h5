<!-- 组件说明 -->
<template>
  <div class="AgentAnswerAnalysis">
    <van-nav-bar title="代理人资格考试" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="content">
        <div class="subjectBox" v-for="(item,index) in AnswerAnalysisList" :key="index">
            <p class="subject">{{index+1 + '、' + item.examinationQuestion}}</p>
            <div class="answer" v-for="(temp,num) in item.esWxAnswerList" :key="num">
                {{temp.answerInfor}}
            </div>
            <div class="answer" v-for="(temp,num) in item.esWxAnswerList" :key="num+'_'">
                <p v-if="temp.isAnswer == 1">
                    <span>您的回答：{{item.customerAnswer[0]}}</span>
                    <img v-if="temp.isAnswer == 1" :src="temp.answerInfor == item.customerAnswer[0] ? successImg : errorImg" alt="">
                </p>
                <p v-if="temp.isAnswer == 1">正确答案：<span>{{temp.answerInfor}}</span></p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import api from "../../fetch/api";
export default {
  name: "AgentAnswerAnalysis",
  components: {},
  data() {
    return {
        AnswerAnalysisList:[],
        successImg:require('@/assets/images/agent/yes.png'),
        errorImg:require('@/assets/images/agent/no.png'),
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  mounted(){
      var args = this.sign({
            mId: this.getCookie("ZB_JUSER_Mid"),
        });
      api.getAnswerAnalysis(args).then(res=>{
            if(res.code == 20000){
                this.AnswerAnalysisList = res.data;
            }
        })
  }
};
</script>

<style lang="scss" scoped>
.grade {
  font-weight: bold;
  color: black;
  font-size: 30px;
}

.examinationResult {
  text-align: center;
  padding: 0 20px;
}

.examinationResult > img {
  width: 100%;
  margin: 60px auto 0;
}

.examinationResult > h3 {
  margin-bottom: 30px;
}

.examinationResult button {
  width: 90%;
  margin-top: 30px;
  line-height: 50px;
}
.subjectBox {
  padding: 30px;
  border-top: solid 20px rgb(229, 237, 237);
}
.subjectBox p img {
  width: 40px;
  vertical-align: middle;
  margin-left: 10px;
  margin-top: -5px;
}
.subject {
  font-size: 30px;
  color: black;
}
.answer {
  line-height: 60px;
}
.answer p,
.subjectBox p {
  color: black;
}
</style>