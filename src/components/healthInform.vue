<!-- 组件说明 -->
<template>
  <div class="healthBox">
    <van-nav-bar :title="healthNoteCate" left-arrow @click-left="onClickLeft">
      <!-- <van-icon name="share" slot="right" /> -->
    </van-nav-bar>
    <div class="mainBox">
      <p class="productName">{{productName}}</p>
      <div class="healthContent">
        <div class="commonDiv">
          <p>{{healthNoteCate}}</p>
          <p class="healthNotificationStatement" v-html="healthNotificationStatement"></p>
        </div>
        <div class="content">
          <div style="padding:0 0.4rem;" v-if="healthAssort == 0 && allIssue != ''" :name="allIssue[0].id" v-html="allIssue[0].questionText"></div>
            <div v-if="healthAssort == 1">
              <div v-for="item in allIssue" :key="item.id">
                <div style="padding:0 0.4rem;" v-html="item.questionText"></div>
                <div class="topic" style="background-color:#F7F7F7;padding:0 0.4rem;margin:10px 0;">
                  <label style="display: inline-block;margin: 10px 50px 10px 0;">
                    <input style="vertical-align: middle;" type="radio" :name='item.id' value="Y">
                    <span>是</span>
                  </label>
                  <label style="display: inline-block;margin: 10px 50px 10px 0;margin:10px 0;">
                    <input style="vertical-align: middle;" type="radio" :name='item.id' value="N">
                    <span>否</span>
                  </label>
                </div>
              </div>
            </div>
        </div>
        <div class="healthNotificationRemark" v-if="healthNotificationRemarkIsShow != ''">
          <p>备注:</p>
          <div v-html="healthNotificationRemark"></div>
        </div>
        <div class="preInsuranceStatement" v-if="preInsuranceStatementIsShow != ''">
          <p>投保前声明</p>
          <div v-html="preInsuranceStatement"></div>
        </div>
      </div>
    </div>
    <div>
      <p class="btnItem" v-if="healthAssort === 0 ? true : false">
        <button :class="buttonColor == 1 ? 'buttonColor' : ''" @click="unifiedAnswer(1,'N')">{{healthAssortAnswer == 'Y' ? '至少有一项否' : '全部否'}}</button>
        <button :class="buttonColor == 2 ? 'buttonColor' : ''" @click="unifiedAnswer(2,'Y')">{{healthAssortAnswer == 'Y' ? '全部是' : '至少有一项是'}}</button>
      </p>
      <input v-if="healthAssort === 1 ? true : false" type="text" value="下一步" class="nextStyp" @click="nextStyp" readonly />
    </div>
  </div>
</template>

<script>
//import x from ''
import $ from "jquery";
import api from "../fetch/api";
export default {
  components: {
    name: "healthInform"
  },
  data() {
    return {
      buttonColor: 0,
      Router: "",
      productId: "",
      planId: "",
      priceResult: "",
      safeDate: "",
      productName: "",
      allIssue:'', //所有问题
      healthAssort:'', // 健康告知 统一 或者 逐一
      healthNotificationRemark:'', //健康告知备注
      preInsuranceStatement:'', //投保前声明
      healthNotificationRemarkIsShow:'', //健康告知是否显示
      preInsuranceStatementIsShow:'', //投保前声明是否显示
      healthAssortAnswer:'', //健康告知统一回答 正确答案
      healthNotificationStatement:'',// 健康告知说明
      healthNoteCate:'健康告知说明', //健康告知title名称
      routerLinkParams: {}, // 路由参数
    };
  },
  created() {
    // 滚动条置顶
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  },
  computed: {},
  mounted() {
    /**
     * 中科软可回溯
     */
    var infor={};
    infor.start=1; //必传
    initEasyReplay(infor);//初始化

    var that = this;
    this.Router = this.$route.query.Router;
    this.productId = this.$route.query.productId;
    this.planId = this.$route.query.planId;
    this.priceResult = this.$route.query.priceResult;
    this.safeDate = this.$route.query.safeDate;
    this.isSocialSecurity = this.$route.query.isSocialSecurity;
    
    // 获取健康告知内容 
    var args1 = this.sign({ productId: this.productId });
    // this.$axios.post('/arg/openapi/h5/product/healthNote',args1).then(res=>{
    api.healthNote(args1).then(res => {
      // 获取产品名称
      this.productName = res.data.productName;
      // 所有健康告知问题
      this.allIssue = res.data.prodHealthNoteList;
      // 健康告知类型
      this.healthAssort = res.data.healthAssort;
      // 健康告知说明
      this.healthNotificationStatement = res.data.healthNotificationStatement;
      // 投保前声明
      this.preInsuranceStatement = res.data.preInsuranceStatement;
      // 备注
      this.healthNotificationRemark = res.data.healthNotificationRemark;
      this.preInsuranceStatementIsShow = that.preInsuranceStatement.replace(/<.*?>/ig,"");
      this.healthNotificationRemarkIsShow = that.healthNotificationRemark.replace(/<.*?>/ig,"");
      // 0:总体 1:逐一
      if(res.data.healthAssort == 0){
        this.healthAssortAnswer = res.data.overallAnswer; //总体回答答案
      };
      // 路由参数
      this.routerLinkParams = {
        productId: this.productId,
        planId: this.planId,
        priceResult: this.priceResult,
        safeDate: this.safeDate,
        isSocialSecurity: this.isSocialSecurity,
        activityCode: this.getQueryString("activityCode"),
        invitationCode: this.getQueryString("invitationCode"),
        topActivityCode: this.getQueryString("topActivityCode"),
        insurdAge: this.getQueryString("insurdAge"), //承保年龄
        shareMid:this.getQueryString("shareMid"),
        brandId: this.getQueryString("brandId"), // 品牌编号
        catId: this.getQueryString("catId"),  // 分类id
        typeId: this.getQueryString("typeId"), // 类型id 
      };

      // 如果路径上有 SaveSpecification(多多宝保存规格id)，则跳转下一个页面时传，没有不传
      if(this.getQueryString("SaveSpecification")){
        this.routerLinkParams.SaveSpecification = this.getQueryString("SaveSpecification");
      };
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 逐一回答
    nextStyp() {
      var answer = {
        productId: this.productId,  //产品id
        productName: this.productName,  //产品名称
        answer:[],   // 选择题和答案
        healthAssort:'1'
      };
      for(var i = 0;i < this.allIssue.length;i++){
        if($('.content .topic').eq(i).find('input:checked').attr('name') == this.allIssue[i].id){
          if($('.content .topic').eq(i).find('input:checked').val() == this.allIssue[i].answer){
            // 获取用户回答内容
            answer.answer.push({issueId:$('.content .topic').eq(i).find('input:checked').attr('name'),answer:this.allIssue[i].answer});
            // 保存回答到本地
            this.setCookie('healthAnswer',JSON.stringify(answer));
            if(i == (this.allIssue.length-1)){
              console.log(answer);
              this.$router.push({
                path: this.Router,
                query: this.routerLinkParams
              });
            }
          }else{
            layer.confirm(
              "您的健康告知不符合保险公司的审核标准，无法提交保单。请联系环晟保险顾问协助您进行处理。",
              {
                area: ["80%"],
                btn: ["确定"] //按钮
              },
              function(index) {
                layer.close(index);
              }
            );
            return false;
          }
        }else{
          this.Toast('请选择第' + (i+1) + '题');
          return false;
        }
      }
    },
    // 总体回答
    unifiedAnswer(num,answerContent){
      // 回答问题记录
      var answer = {
        productId: this.productId,
        productName: this.productName,
        answer:[],
        healthAssort:'0'
      };
      // 切换button颜色
      this.buttonColor=num;
      if($('.content div').attr('name') == this.allIssue[0].id){
        if(answerContent == this.allIssue[0].answer){
          // 保存回答到本地
          answer.answer.push({issueId:$('.content div').attr('name'),answer:answerContent});
          this.setCookie('healthAnswer',JSON.stringify(answer));
          // 跳转投保页面
          this.$router.push({
            path: this.Router,
            query: this.routerLinkParams
          });
        }else{
          layer.confirm(
              "您的健康告知不符合保险公司的审核标准，无法提交保单。请联系环晟保险顾问协助您进行处理。",
              {
                area: ["80%"],
                btn: ["确定"] //按钮
              },
              function(index) {
                layer.close(index);
              }
            );
        }
      }
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
  .layui-layer-btn0{
        background-color: #f9912e ;
  }
  .mainBox {
    height: 80%;
    overflow: scroll;
    // margin: 30px;
    .productName {
      font-size: 32px;
      color: #333;
      font-weight: bold;
      padding: 60px 35px;
      background-color: #F7F7F7;
    }
    .healthContent{
      .content {
        margin-top: 38px;
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
    .healthNotificationRemark{
      padding: 0 30px;
      p{
        margin: 40px 0 20px 0;
        font-size: 28px;
        font-weight: 700;
      }
    }
    .preInsuranceStatement{
      p{
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 30px;
      }
      margin: 81px 30px 0;
      background-color: rgba(247,247,247,1);
      padding: 30px 25px;
      box-shadow: #eeeeee 0 0 0.1rem 0.1rem;
      line-height: 36px;
    }
  }
}
.buttonColor {
  background-color: #f9912e !important;
  border: 2px solid #f9912e!important;
  color: white !important;
}
.nextStyp {
  display: block;
  width: 470px;
  height: 88px;
  border-radius: 6px;
  background: #f9912e;
  color: #fff;
  font-size: 32px;
  text-align: center;
  margin: 40px auto 0;
}
.btnItem {
  margin-top: 50px;
  text-align: center;
  button {
    width: 250px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    color: #666;
    border: 2px solid #ebedf0;
    border-radius: 6px;
    margin-left: 20px;
    background-color: white;
  }
}
</style>