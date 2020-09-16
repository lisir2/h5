<!-- 组件说明 -->
<template>
  <div class="healthBox">
    <van-nav-bar title="健康告知" left-arrow @click-left="onClickLeft">
      <!-- <van-icon name="share" slot="right" /> -->
    </van-nav-bar>
    <div class="mainBox">
      <p class="productName">{{productName}}</p>
      <div class="healthContent">
        <div class="content">
          <div style="padding:0 0.4rem;">
            <p>投保人应在对所有被保险人健康/职业状况充分了解的基础上履行如实告知义务。投保人承诺完全知晓所有被保险人健康/职业状况。若被保险人健康/职业状况与下述告知内容不符:</p>
            <p>(1)本公司有权不同意承保或解除合同。</p>
            <p>(2)如发生保险事故，本公司不承担赔偿或给付保险金的责任，对于故意不如实告知的，不退还保险费。</p>
          </div>
          <div style="padding:0 0.4rem;">
            <p style="font-weight: bold;margin-top: 0.5rem;">投保人需确认被保险人是否有以下情况？</p>
            <li>
              被保险人是否从事属于
              <a style="color: blue" @click="openFile('zhonganjob57.pdf')">《众安特殊职业类别表(5-7类人员表)》</a>
              中所列种类的职业。
            </li>
            <li>被保险人过去1年内是否发现健康检查异常(如血液、超声、影像检查、内镜、病理检查等),过去2年内是否住院或被要求进一步检查、手术或治疗(不包括剖腹产/顺产/鼻炎/急性胃肠炎/单次发作已痊愈的肺炎/上呼吸道感染住院)。</li>
            <li>
              被保险人过去两年内投保人身保险或健康保险时，是否被保险公司拒保、延期、加费或者附加相关条件承保。
              <p></p>
            </li>
            <li>被保险人目前或过往是否患有下列疾病:良、恶性肿瘤(含原位癌),2级或以上高血压(收缩压达到160mmHg，或舒张压达到100mmHg)，冠心病，心肌病、心肌梗死，脑梗死，脑出血，脑外伤后遗症，风湿性心脏病，心功能不全二级（含）以上，慢性肾炎、肾萎缩、肾功能不全，肝炎（肝炎病毒携带者），肝硬化，重型再障性贫血，系统性红斑狼疮，类风湿性关节炎，糖尿病，阿尔茨海默病，帕金森氏病，癫痫，精神病，先天性疾病，法定传染病（包含甲类及乙类），慢性阻塞性肺病、瘫痪 ，性病、艾滋病及HIV阳性。</li>
            <li>过去1年内是否存在下列症状：反复头痛、晕厥、胸痛、气急、紫绀、持续反复发热、抽搐、不明原因出血、皮下出血点、咯血、反复呕吐、进食梗噎感或吞咽困难、呕血、浮肿、腹痛、黄疸、便血、血尿、蛋白尿、性质不明的肿块、消瘦（非健身原因所致的体重减轻5公斤以上）。</li>
            <li>适用于女性被保险人:是否曾患有葡萄胎或其他妊娠滋养细胞疾病、宫颈不典型增生；半年内是否存在阴道异常出血、乳头异常溢液、疼痛、糜烂或回缩、乳房表面皮肤凹陷、皱褶或皮肤收缩等症状。</li>
            <li>2周岁以下被保险人出生时体重是否低于2.5公斤，是否早产，窒息，发育迟缓，脑瘫。</li>
          </div>
        </div>
      </div>
    </div>
    <p class="btnItem">
      <button :class="buttonColor == 1 ? 'buttonColor' : ''" @click="unifiedAnswer(1,'Y')">部分是</button>
      <button :class="buttonColor == 2 ? 'buttonColor' : ''" @click="unifiedAnswer(2,'N')">以上全否</button>
    </p>
    <!-- 弹出框内容 -->
    <div class="popup" style="display:none">
      <div class="chooseBox" style="text-align: center; display: block;">
        <p>请勾选有以上情况的家属</p>
        <p style="padding: 0 0.5rem">我们需要进一步了解他们的健康状况，以确认是否可以为您承保。</p>
        <ul style="display: inline-block;margin-top: 10px;width: 90%" class="allPeopleBox">
          <li v-for="item in recognizeeList" :key="item.insuredCertificateNo">
            <label>
              <img :src="item.insuredSex == '男' ? boyImg : girlImg" alt />
              <p>{{item.insuredName}}</p>
              <input
                type="checkbox"
                class="recognizee"
                :insuredCertificateNo="item.insuredCertificateNo"
                value="N"
              />
            </label>
            <input type="hidden" value="110101199003072914" />
          </li>
        </ul>
        <div style="text-align: center">
          <input type="button" class="underwriting" value="确认" />
        </div>
      </div>
    </div>
    <!-- 加载动画 -->
    <van-popup v-model="loadingShow" :lock-scroll="false" style="background-color: transparent;" :close-on-click-overlay="false">
        <!-- 加载动画 -->
        <van-loading size="24px" vertical color="#1989fa">数据加载中...</van-loading>
    </van-popup>
  </div>
</template>

<script>
import $ from "jquery";
import api from "../../../fetch/api";
export default {
  name: "healthInformZhongAn",
  components: {},
  data() {
    return {
      buttonColor: 0,
      productId: "",
      planId: "",
      productName: "尊享e生旗舰版",
      boyImg: require("@/assets/images/healthInformZhongAn/headerImg1.png"),
      girlImg: require("@/assets/images/healthInformZhongAn/headerImg2.png"),
      recognizeeList: "", //被保险人数组
      loadingShow:false,
    };
  },
  created() {
    // 滚动条置顶
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  },
  computed: {},
  mounted() {
    this.productId = this.$route.query.productId;
    this.planId = this.$route.query.planId;
    // 投保信息
    this.recognizeeList = JSON.parse(
      sessionStorage.getItem("zunXiangJT_InsuranceInformation")
    ).inserd;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 总体回答
    unifiedAnswer(num, answerContent) {
      var that = this;
      // 切换button颜色
      this.buttonColor = num;
      if (answerContent == "N") {
        // 回答正确进行核保
        that.Submit();
      } else if (answerContent == "Y") {
        layer.open({
          type: 1,
          area: ["90%"],
          title: false,
          // closeBtn: 0, //不显示关闭按钮
          anim: 2,
          shadeClose: true, //开启遮罩关闭
          content: $(".popup").html(),
          success: function() {
            that.underwriting();
          }
        });
      }
    },
    // 健康告知回答正确，进行核保
    Submit() {
      this.loadingShow = true;
      var args = this.sign(JSON.parse(
        sessionStorage.getItem("zunXiangJT_InsuranceInformation")
      ));
      //核保
      api.getAppAddpolicy(args).then(
        response => {
          var data = response; //本地的话加上一层data
          //核保成功
          if (data.code == 1) {
            this.loadingShow = false;
            //进入预览页面
            this.$router.push({
              path: "/policyPreview",
              query: {
                id: data.data,
                productId: this.productId,
                planId: this.planId
              }
            });
          } else {
            this.Toast(data.message);
          }
        },
        err => {
          this.Toast(err.message);
        }
      );
    },
    // 健康告知不正确，进行智能核保
    underwriting() {
      var that = this;
      $(".underwriting").click(function() {
        var InsuranceInformation = JSON.parse(
          sessionStorage.getItem("zunXiangJT_InsuranceInformation")
        );
        if($(".recognizee:checked").length == 0){
          layer.msg('请选择智能核保对象');
        }else{
          for (var i = 0; i < $(".recognizee:checked").length; i++) {
            //获取选中被保险人
            for (var j = 0; j < InsuranceInformation.inserd.length; j++) {
              //判断是哪一个被保险人
              if (
                $(".recognizee:checked")
                  .eq(i)
                  .attr("insuredCertificateNo") ==
                InsuranceInformation.inserd[j].insuredCertificateNo
              ) {
                InsuranceInformation.inserd[j].subjectJson = { smartUw: "Y" };
              }
            }
          }
          // 选着不符合健康告知的被保险人之后，进行核保
          var args = that.sign(InsuranceInformation);
          api.IntelligentUnderwriting(args).then(res => {
            if (res.success == true) {
              location.href = res.url;
            }else{
              layer.msg(res.error);
            }
          });
          console.log(InsuranceInformation);
        }
      });
    },
    // 在线预览pdf
    openFile(url){
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

<style lang="scss" scoped>
.healthBox {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: scroll;
  .mainBox {
    height: 80%;
    overflow: scroll;
    // margin: 30px;
    .productName {
      font-size: 32px;
      color: #333;
      font-weight: bold;
      padding: 60px 35px;
      background-color: #f7f7f7;
    }
    .healthContent {
      .content {
        margin-top: 38px;
        line-height: 0.6rem;
      }
      .commonDiv {
        padding: 0 30px;
        // border-bottom: 1px solid #eee;
        p {
          font-size: 26px;
          color: #333;
          margin-bottom: 40px;
          line-height: 36px;
        }
        p:nth-child(1) {
          font-weight: bold;
          margin-top: 38px;
          font-size: 30px;
          margin-bottom: 30px;
        }
      }
    }
  }
}
.buttonColor {
  background-color: #1989fa !important;
  color: white !important;
}
.btnItem {
  margin-top: 60px;
  text-align: center;
  button {
    width: 250px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    color: #008cff;
    border: 2px solid #008cff;
    border-radius: 6px;
    margin-left: 20px;
    background-color: white;
  }
}
// 弹出框样式
.chooseBox {
  width: 90%;
  background: #fff;
  border-radius: 10px;
  display: none;
  margin: auto;
}
.chooseBox p:nth-child(1) {
  font-size: 0.4rem;
  text-align: center;
  margin-top: 0.45rem;
}
.chooseBox p:nth-child(2) {
  margin-top: 0.2rem;
  color: #666;
  font-size: 0.3rem;
  text-align: center;
}
.chooseBox ul li {
  float: left;
  list-style: none;
  border-radius: 5px;
  text-align: center;
  width: 33.33%;
  margin-bottom: 8px;
}
.chooseBox ul li img {
  width: 1.2rem;
  /* height: 4.8rem; */
  display: block;
  margin: auto;
}
.chooseBox p:nth-child(2) {
  margin-top: 0.2rem;
  color: #666;
  font-size: 0.3rem;
  text-align: center;
}
.chooseBox input[type="checkbox"] {
  vertical-align: middle;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
.chooseBox input[type="button"] {
  width: 5.5rem;
  height: 0.9rem;
  line-height: 0.73rem;
  background: #fb8400;
  color: #fff;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
// 弹出框样式
</style>