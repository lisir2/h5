<!-- 组件说明 -->
<template>
  <div class="AgentExam">
    <van-nav-bar title="代理人资格考试" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="examinationResult">
      <div class="answer">
        <div>
          <p class="subject" v-text="(subjectNum+1) + '、' +subject.examinationQuestion"></p>
          <label v-for="(temp) in subject.esWxAnswerList" :key="temp.id">
            <span>{{temp.answerInfor}}</span>
            <input
              type="radio"
              name="answer"
              :keyId="temp.id"
              :value="temp.isAnswer"
              :checked="temp.id == answerKeyId[subjectNum > 19 ? 19 : subjectNum].split('&')[0]"
              @click="subjectNum<19 ? next() : ''"
            />
          </label>
        </div>
      </div>
    </div>
    <div class="progressBar">
      <!-- 渲染进度条 -->
      <div><span class="progressContent" :style="{width:(subjectNum + 1) * 5 + '%'}"></span></div>
      <p class="subjectNum">{{subjectNum + 1 > 20 ? 20 : subjectNum + 1}}/20</p>
      <p class="topTopic" v-if="subjectNum > 0" @click="topTopic()">上一题</p>
    </div>
    <button v-if="subjectNum >= 19" @click="next()" class="nextBtn">提交</button>
  </div>
</template>

<script>
import api from "../../fetch/api";
import { Toast } from "vant";
export default {
  name: "AgentExam",
  components: {},
  data() {
    return {
      subject: "",  //渲染题目
      allSubject: "", //所有题目
      answer: "",
      subjectNum: 0, //默认展示第一题
      grade: Array(20).fill(0), //记录分数数组
      answerKeyId: Array(20).fill(""), //记录答案主键id
      title:'', //题目
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 上一题
    topTopic() {
      --this.subjectNum;
      this.subject = this.allSubject[this.subjectNum];
    },
    // 下一题
    next() {
      // 记录分数
      if ($(".answer input:checked").val()) {
        // 答题正确加5分
        if ($(".answer input:checked").val() == 1) {
          this.grade[this.subjectNum] = 5;
        }
        // 获取答案主键id 放到数组中
        this.answerKeyId[this.subjectNum] = $(
          ".answer input:radio[name=answer]:checked"
        ).attr("keyId") + (this.subjectNum <= 19 ? "&" : '');
        
        // 题目加一
        ++this.subjectNum;

        // 是否是最后一题
        if (this.subjectNum <= 19) {
          // 获取题目
          this.subject = this.allSubject[this.subjectNum];
        } else {
          // 最后一题进行答案结算，回答问题id拼接
          var answerId = ""; // 答案id拼接
          var gradeNum = 0; // 分数计算
          for (var i = 0; i < 20; i++) {
            answerId += this.answerKeyId[i];
            gradeNum += Number(this.grade[i]);
          }

          // 上传回答答案id
          api.updateProxyExamination(this.sign({
              mId: this.getCookie("ZB_JUSER_Mid"),
              examinationNo: encodeURIComponent(answerId)
            }))
            .then(res => {
              if (res.code == 20000) {
                this.$router.push({path:'/AgentExaminationResult',query:{grade:gradeNum}})
              } else {
                this.Toast(res.msg);
              }
            });
        }
      } else {
        this.Toast("请回答问题");
      }
    }
  },
  mounted() {
    var that = this;
    // 获取所有问题
    api.getExamination().then(res => {
      if (res.code == 20000) {
        // 所有题目
        that.allSubject = res.data.examinationList;
        // 当前展示题目
        that.subject = that.allSubject[that.subjectNum];
      } else {
        that.Toast(res.msg);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.AgentExam {
  .grade {
    font-weight: bold;
    color: black;
    font-size: 17px;
  }

  .examinationResult {
    text-align: left;
    
    .answer {
      height: 100%;
      display: block;
      text-align: left;
      line-height: 45px;
      .subject {
        color: black;
        font-size: 30px;
        padding: 30px;
        border-bottom: solid 1px #eeeeee;
        background-color: #f1f1f1;
        line-height: 35px;
      }
      div{
        label{
            width: 100%;
            display: inline-block;
            position: relative;
            padding: 25px 35px;
            border-bottom: solid 1px #f1f1f1;
            box-sizing: border-box;
          span{
            width: 90%;
            display: inline-block;
            font-size: 28px;
          }
          input{
            height: 35px;
            width: 35px;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 40px;
            margin: auto;
          }
        }
      }
    }
  }

  .progressContent {
    height: 100%;
    display: block;
    width: 5%;
    background-color: rgb(83, 135, 249);
}

  .progressBar {
    width: 80%;
    margin: 0 auto 30px;
    text-align: center;
    div {
      width: 100%;
      height: 14px;
      border-radius: 14px;
      /* border: solid 1px rgb(186, 194, 194); */
      margin-top: 50px;
      overflow: hidden;
      background-color: #f1f1f1;
      span{
        height: 100%;
        display: block;
        width: 5%;
        background-color: rgb(83, 135, 249);
      }
    }
  }

  

  .subjectNum {
    margin-top: 10px;
  }

  .nextBtn {
    width: 80%;
    height: 70px;
    font-size: 30px;
    background-color: #f99a31;
    margin: auto;
    display: block;
    color: white;
    border-radius: 50px;
    border: none;
  }
  .topTopic {
    text-align: left;
    margin-top: -38px;
    color: rgba(91, 138, 255, 1);
    width: 100px;
  }
}
</style>