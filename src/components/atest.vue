<!-- 组件说明 -->
<template>
  <div class="detailsTwo">
    <!-- 计划列表 -->
    <div class="planBox" v-show="listLength">
      <div class="quota">
        <span class="borderA"></span>
        <p class="titleA">保障计划</p>
      </div>
      <div class="quotaList">
        <van-button type="info" size="small" v-for="(item,index) in prodPlanList" :key="item.id" :name=item.id :class="activity == (index) ? 'planBtn' : 'van-button van-button--info van-button--small van-button--hairline van-button--plain van-hairline--surround'" @click="changeQuota(item.id,index)">{{item.planName}}</van-button>
        <span class="showDown" v-if="moreBtn" >展示<van-icon name="arrow-down" /></span>
      </div>
    </div>
    <!-- 切换计划获取计划对应的规格值 -->
    <van-popup v-model="show" class="popuoButton" closeable round position="bottom" :style="{ height: '80%' }">
        <div v-for="(item,i) in prodPlanList_second" :key="item.id" :name="item.attrName">
          <div v-if="item.isDisplay == 0">
            <div class="quota">
                <span class="borderA"></span>
                <p class="titleA">{{item.attrName}}</p>
              </div>
              <!-- <span class="titleA">{{item.attrName}}</span> -->
              <div class="quotaList">
                  <van-button size="small" v-for="(part,j) in item.planAttrValList" :key="part.id" :name="part.id" :class="indexes[i]===j ? 'on' : ''" @click="tap($event,i,j,part.id)">{{part.attrValue}}</van-button>
                  <!-- <span class="showDown" v-if="moreBtn" >展示<van-icon name="arrow-down" /></span> -->
              </div>
          </div>
        </div>
        <!-- 规格选择弹出层的价格试算区 -->
        <div class="fixBar">
          <van-tabbar>
            <!-- //hsib.qiyukf.com/client?k=c5d6706f0d4f32b60dc4ba3aaa148b89&wp=1&robotShuntSwitch=1&robotId=139000 -->
            <router-link href="javascript:void(0)" style="flex:1" @click="toChat" to='/chat'>
                <van-tabbar-item icon="smile-comment-o" style="flex:1;margin-top: 0.2rem;">客服</van-tabbar-item>
            </router-link>
            <van-tabbar-item class="price">￥{{priceResult}}</van-tabbar-item>
            <van-tabbar-item class="gobuy" @click="goBuy">立即投保</van-tabbar-item>
          </van-tabbar>
        </div>
    </van-popup>
    <!-- 保障清单 -->
    <div class="quota">
      <span class="borderA"></span>
      <p class="titleA">保障清单</p>
    </div>
    <div class="guarantee">
      <van-collapse v-model="activeName" accordion>
          <van-collapse-item v-for="item in planEnsureDetailList" :key="item.id" :title="item.ensureName" :value="item.insuranceAmount" :name="item.id">
            <p v-html="item.ensureContent"></p>
          </van-collapse-item>
      </van-collapse>
    </div>
    <div class="colorBlock"></div>
    <!-- 贴心服务 -->
    <div class="quota">
      <span class="borderA"></span>
      <p class="titleA">贴心服务</p>
    </div>
    <div class="heartserve">
      <ul>
        <li v-for="item in prodIntimateServiceList" :key="item.id">
          <van-cell :title="item.serviceTitleName" @click="goService" icon="checked" />
        </li>
      </ul>
    </div>
    <div class="colorBlock"></div>
    <!-- 产品介绍/干货科普 -->
    <div class="heartserve_bottom">
      <van-cell v-for="item in questionList" :key="item.id" :value="item.problemTitle" is-link :to="{name:'articleDetail',params:{goodsId:item.productId,tag:item.tag}}">
        <template slot="title">
          <van-tag type="danger">{{item.tag}}</van-tag>
        </template>
      </van-cell>
      <van-cell v-for="item in questionList1" :key="item.id" :value=" item.problemTitle" is-link :to="{name:'articleDetail',params:{goodsId:item.productId,tag:item.tag}}">
        <template slot="title">
          <van-tag type="normal">{{item.tag}}</van-tag>
        </template>
      </van-cell>
    </div>
    <div class="colorBlock"></div>
    <!-- 详情页底部投保区 -->
    <div class="fixBar">
      <van-tabbar id="polifyBar" style="z-index: 999;">
        <!-- //hsib.qiyukf.com/client?k=c5d6706f0d4f32b60dc4ba3aaa148b89&wp=1&robotShuntSwitch=1&robotId=139000 -->
        <router-link href="javascript:void(0)" style="flex:1" to="/chat">
            <van-tabbar-item icon="smile-comment-o" style="margin-top:6px;">客服</van-tabbar-item>
        </router-link>
        <van-tabbar-item class="price">￥{{priceResult}}</van-tabbar-item>
        <van-tabbar-item :class="WhetherTheShelf == 0 ? 'gobuy' : 'soldOut'" @click="showPopup">{{WhetherTheShelf == 0 ? '立即投保' : '产品已下架'}}</van-tabbar-item>
      </van-tabbar>
    </div>
    <div class="popbox_car" style="height: auto; width: 100%;display:none;">
        <div class="mainlist">
            <p>
                亲爱的用户您好：
            </p>
            <p>
                1、本保险仅限浙江省内的维修企业为员工进行投保；<br />
                2、本保险仅承担在保险期间内被保险人在工作场所（包括因公外出期间）或上下班途中遭受意外伤害并因该意外伤害导致身故、残疾或烧伤的保险金及医疗费、住院津贴；<br />
                3、已阅读《保险合同》、《产品方案》、《投保须知》、《客户告知书》。
            </p>
            <div>
                <a href="javascript:;" id="product_car_look">我再看看</a><a href="javascript:;" id="product_car_sure">我知道了</a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import api from '../fetch/api';
import $ from "jquery";
export default {
  name: "detailsTwo",
  components: {},
  data() {
    return {
      activeName: "",
      activity:0,
      prodPlanList:"",
      prodPlanList_second:"",
      moreBtn:false,
      planEnsureDetailList:"",
      prodIntimateServiceList:"",
      indexes:"",
      show:false,
      onStr:"",
      priceResult:"",
      goodId:"",
      planId:"",
      listLength:true,
      questionList:"",
      questionList1:"",
      goodInsuranceCompanyAlias:'',//保险公司
      goodName:'', //产品名称
      WhetherTheShelf:'',  //产品是否上架 0：上架，1：下架
    };
  },
  created(){
    this.goodId=this.getQueryString("productId");
  },
  mounted(){
    // 获取vuex状态里面的产品详情
    this.WhetherTheShelf = this.$store.state.productDetail.data.prodGoods.goodShelf;
    this.prodPlanList=this.$store.state.productDetail.data.prodPlanList;  
    this.goodInsuranceCompanyAlias = this.$store.state.productDetail.data.prodGoods.goodInsuranceCompanyAlias;
    this.goodName = this.$store.state.productDetail.data.prodGoods.goodName;
    this.$store.commit('healthAssort',this.$store.state.productDetail.data.prodGoods.healthAssort);
    this.planEnsureDetailList = this.$store.state.productDetail.data.planEnsureDetailList;
    this.prodIntimateServiceList =this.$store.state.productDetail.data.prodIntimateServiceList;
    this.planId =  this.$store.state.productDetail.data.prodPlanList[0].id; 
    this.priceResult = this.$store.state.productDetail.data.prodPlanList[0].sumFee;    
    this.$emit('SecurityLines',this.planId);
    // 判断产品是否有计划
    if(this.prodPlanList.length<=1){
      this.listLength=false
    }else{
      this.listLength=true
    }
    // 产品介绍
    var args=this.sign({productId:this.goodId,tag:"产品介绍"});
    api.getDetailArt(args).then(res => {
        this.questionList=res.data;
    })
    // 干货科普
    var args1=this.sign({productId:this.goodId,tag:"干货科普"});
    api.getDetailArt(args1).then(res => {
        this.questionList1=res.data;
    })
    this.changeQuota(this.planId,0);
  },
  methods: {
    toChat(){

    },
    //选中当前
    changeQuota(id,index) {
        this.$emit('SecurityLines',id);
        this.planId=id;
        this.activity = index;
        this.prodPlanList_second=this.$store.state.productDetail.data.prodPlanList[index].planAttrKeyList;
        this.planEnsureDetailList=this.$store.state.productDetail.data.planEnsureDetailList;
        this.priceResult = this.$store.state.productDetail.data.prodPlanList[index].sumFee;
        this.indexes=new Array(this.prodPlanList_second.length).fill(0)
    },
    tap(event,i,j,id){
      this.indexes[i]=j;
      this.$forceUpdate();
      this.$nextTick(function(){
        var keyStr="";
        $.each($(".on"),function(index,ele){
          keyStr+=$(ele).attr('name')+","
        })
        var keyStr=keyStr.substring(0,keyStr.length-1);
        var args=this.sign({
          "productId":this.goodId,
          "planId":$(".planBtn").attr('name'),
          "value":keyStr
        });
        var api_this=this;
        // 价格试算
        // this.$axios.post('/brg/openapi/h5/product/priceCalculation',args)
        api.getCalculation(args)
        .then(res => {
            api_this.priceResult=res.data;
        })
      })
    },
    showPopup() {
      var that = this;
      if(this.$store.state.productDetail.data.prodGoods.goodShelf == 0){
        this.show = true;
      }else{
        this.Toast(this.$store.state.productDetail.data.prodGoods.goodBuyPrompt);
      }
    },
    goService() {
      var goodsId=this.goodId;
      this.$router.push({ path: '/intimateService',query:{goodId:goodsId}});
    },
    // 浙江省汽车维修重要告知
    ImportantInform(goodId,planId,priceResult,safeDate,isSocialSecurity){
      console.log(goodId,planId,priceResult,safeDate)
      var this_ = this;
      layer.open({
          type: 1,
          skin: 'layui-layer-demo',  //样式类名
          closeBtn: 0, //不显示关闭按钮
          anim: 2,
          title:['重要告知', 'text-align:center;background-color:#40afff;color:white;'],
          shadeClose: true, //开启遮罩关闭
          content: $('.popbox_car').html(),
          success: function(layero, index){
            $('.layui-layer #product_car_look').click(function(){
              layer.close(index);
            })
            $('.layui-layer #product_car_sure').click(function(){
              this_.$router.push({ path: '/insurancePingAnQiXiu',query:{productId:goodId,planId:planId,priceResult:priceResult,safeDate:safeDate,isSocialSecurity:isSocialSecurity}});
              layer.close(index);
            })
          }
        });
    },
    goBuy(){
      var this_ = this;
      var loginStatus=this.getCookie('ZB_JUSER_Mid');
      //登录跳转投保
      if(loginStatus){
          var keyStr="";
          $.each($(".on"),function(index,ele){
            keyStr+=$(ele).attr('name')+","
          })
          var keyStr=keyStr.substring(0,keyStr.length-1);
          var args=this.sign({
            "productId":this.goodId,
            "planId":$(".planBtn").attr('name'),
            "value":keyStr
          });
          // 价格试算
          api.getCalculation(args).then(res => {
              this.priceResult=res.data;
          })
          // 获取保障期限
          var safeDate = $('div[name="保障期限"]').find($('.quotaList')).find($('.on span')).html();
          // 有无社保
          var isSocialSecurity = $('div[name="社保情况"]').find($('.quotaList')).find($('.on span')).html();
          console.log(this.goodName,this.goodInsuranceCompanyAlias)
          //是否有健康告知 2:无 0:总体 1:逐一
          if(this.$store.state.healthAssort == 0 || this.$store.state.healthAssort == 1){
            if(this.goodInsuranceCompanyAlias == '华安保险'){
              this.$router.push({ path: '/healthInform',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,Router:'/insuranceHuaAn',isSocialSecurity:isSocialSecurity}});
            }else if(this.goodInsuranceCompanyAlias == '中国平安'){  //平安财险
                if(this.goodName == '浙江省汽车维修企业员工团体意外伤害保险'){
                  this.$router.push({ path: '/healthInform',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,Router:'/insurancePingAnQiXiu',isSocialSecurity:isSocialSecurity}});
                }else if(this.goodName == '平安驾驶人考试不通过补考费用损失保险'){
                  this.$router.push({ path: '/healthInform',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,Router:'/insurancePingAnKaoShi',isSocialSecurity:isSocialSecurity}});
                }else{
                  this.$router.push({ path: '/healthInform',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,Router:'/insurancePingAn',isSocialSecurity:isSocialSecurity}});
                }
            }else if(this.goodInsuranceCompanyAlias == '紫金保险'){  //紫金保险
              this.$router.push({ path: '/healthInform',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,Router:'/insuranceZiJin',isSocialSecurity:isSocialSecurity}});
            }else if(this.goodInsuranceCompanyAlias == '安联保险'){
              this.$router.push({ path: '/healthInform',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,Router:'/insuranceAnlian',isSocialSecurity:isSocialSecurity}});
            }else if(this.goodInsuranceCompanyAlias == '中国人民保险'){
                this.$router.push({ path: '/healthInform',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,Router:'/insuranceRenBao'}});
            }
            else if(this.goodInsuranceCompanyAlias == '安心互联网保险'){
                this.$router.push({ path: '/healthInform',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,Router:'/insuranceAnXin'}});
            }
            else if(this.goodInsuranceCompanyAlias == '利宝保险'){
                this.$router.push({ path: '/insuranceLiBao',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,Router:'/insuranceAnXin'}});
            }
            else{
              this.$router.push({ path: '/healthInform',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,Router:'/insurancePingAn'}});
            }
          }else{
            if(this.goodInsuranceCompanyAlias == '华安保险'){
              this.$router.push({ path: '/insuranceHuaAn',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,isSocialSecurity:isSocialSecurity}});
            }else if(this.goodInsuranceCompanyAlias == '中国平安'){  //平安财险
                if(this.goodName == '浙江省汽车维修企业员工团体意外伤害保险'){
                  // 浙江省汽车维修重要告知
                  this.ImportantInform(this_.goodId,this_.planId,this_.priceResult,safeDate,isSocialSecurity);
                }else if(this.goodName == '环晟-平安家政服务综合保险'){
                  this.$router.push({ path: '/insuranceJiaZheng',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,isSocialSecurity:isSocialSecurity}});
                }else if(this.goodName == '平安驾驶人考试不通过补考费用损失保险'){
                  this.$router.push({ path: '/insurancePingAnKaoShi',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,isSocialSecurity:isSocialSecurity}});
                }else{
                  this.$router.push({ path: '/insurancePingAn',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,isSocialSecurity:isSocialSecurity}});
                }
            }else if(this.goodInsuranceCompanyAlias == '紫金保险'){  //紫金保险
              this.$router.push({ path: '/insuranceZiJin',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,isSocialSecurity:isSocialSecurity}});
            }else if(this.goodInsuranceCompanyAlias == '安联保险') {
              this.$router.push({ path: '/insuranceAnlian',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,isSocialSecurity:isSocialSecurity}});
            }else if(this.goodInsuranceCompanyAlias == '中国人民保险'){
              this.$router.push({ path: '/insuranceRenBao',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,isSocialSecurity:isSocialSecurity}});
            }
            else if(this.goodInsuranceCompanyAlias == '安心互联网保险'){
              this.$router.push({ path: '/insuranceAnXin',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,isSocialSecurity:isSocialSecurity}});
            }
            else if(this.goodInsuranceCompanyAlias == '利宝保险'){
              this.$router.push({ path: '/insuranceLiBao',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate}});
            }
            else{
              this.$router.push({ path: '/insurancePingAn',query:{productId:this.goodId,planId:this.planId,priceResult:this.priceResult,safeDate:safeDate,isSocialSecurity:isSocialSecurity}});
            }
          }
      }else{
          this.$router.push({ path: '/loginRegister',query:{productId:this.goodId}});
      }
    }
  }
};
</script>

<style lang="scss">
.detailsTwo {
  .on{
      background: #1989fa;
      color: #ffffff;
      border: 1px solid #1989fa;
      border-radius: 6px;
  }
  .guarantee {
    padding: 10px 40px;
    color: #333;
    p{
      text-indent: 2em;
    }
    .btitle{
      font-weight: 700;
      font-size: 28px;
      color: #333;
      height: 88px;
      line-height: 88px;
      display: block;
    }
    ul li:nth-child(1) {
      font-weight: bold;
      border-bottom: 1px dotted #ccc;
      padding: 16px 0;
    }
    .van-cell {
      padding: 20px 0;
      .van-cell__title,
      .van-cell__value {
        font-size: 26px;
        color: #333333;
      }
    }
  }
  .quotaList {
    padding: 20px 40px;
    .van-button {
      margin-right: 30px;
      // width: 150px;
      height: 56px;
      margin-bottom: 16px;
    }
    .showDown {
      float: right;
      display: inline-block;
      height: 56px;
      line-height: 56px;
      margin-right: 10px;
    }
  }
  .heartserve {
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 20px 40px;
      padding-bottom: 36px;
      li {
        width: 220px;
        .van-cell {
          padding: 0;
          .van-cell__title {
            span {
              font-size: 24px;
              color: #8f8f8f;
            }
          }
        }
      }
    }
    .van-icon-checked {
      color: #008cff;
    }
  }
  .heartserve_bottom {
    .van-cell {
      padding: 40px 32px;
    }
    .van-cell__title {
      flex: 1;
    }
    .van-cell__value {
      flex: 4;
      line-height: 64px;
      font-size: 28px;
      text-align: left;
      text-indent: 0.5em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .van-cell__right-icon {
      margin-top: 8px;
    }
    .van-tag--danger {
      background-color: #008cff;
      padding: 16px;
      font-size: 24px;
      border-radius: 0;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #fdfdfe;
      border-radius: 10px;
    }
    .van-tag--normal {
      background-color: #8080ff;
      padding: 16px;
      font-size: 24px;
      border-radius: 0;
      font-family: "PingFang SC";
      font-weight: 500;
      color: #fdfdfe;
      border-radius: 10px;
    }
  }
}
.popuoButton{
  padding-bottom: 100px;
}
.mainlist{
  div{
    width: 370px;
    display: block;
    margin:20px auto 0;
  }
  padding: 30px;
}
#product_car_look,#product_car_sure{
  display: inline-block;
  background-color: #40afff;
  color: white;
  padding:8px 12px;
  margin-left: 40px;
  border-radius: 5px;
}
.titleBgc{
  background-color: #40afff;
}
// .layui-layer-title{
//   padding: 0!important;
// }
@supports (bottom: env(safe-area-inset-bottom)) {
	#polifyBar {
		margin-bottom: env(safe-area-inset-bottom);
	}
}
.soldOut{
  background-color: #CCCCCC;
  .van-tabbar-item__text{
      color: #fff;
      font-size: 36px;
  }
}
</style>