<!-- 组件说明 智能核保 -->
<template>
  <div class="PersonalTailor">
    <img :src="recommend_banner" alt />
    <div class="scheme">
      <div id="insuranceCaseWrap">
        <div class="insurance-case" v-for="(item,index) in customerAnswers" :key="index">
          <div class="case-title">
            <!-- 与申请人关系 -->
            <h1>
              <span>{{item.relationship}}</span>的保险方案
            </h1>
            <!-- 合计保费 -->
            <div class="case-price">
              合计：
              <span>{{item.countPrice}}</span>元/年
            </div>
          </div>
          <ul class="case-user-info">
            <li>
              年龄：
              <span>{{item.age}}岁</span>
            </li>
            <li>
              个人年收入：
              <span>{{item.annualIncome}}万</span>
            </li>
            <li>
              社保：
              <span>{{item.socialSecurity}}社保</span>
            </li>
            <li>
              常住地址：
              <span>{{item.address}}</span>
            </li>
          </ul>
          <p class="case-description">{{item.znWenAn}}</p>
          <div class="tab-wrap">
            <ul class="tab-switch">
              <!-- <li class="selected">人生必备保单</li> -->
              <!-- <li class="selected">推荐保单</li> -->
            </ul>
            <div class="tab-content">
              <ul class="insurance-item">
                <li v-for="(items,indexs) in products[index]" :key="indexs">
                  <span class="product-classify">{{items.classTag}}</span>
                  <img
                    :src="baseImagePath + items.goodSmallImg"
                    alt
                  />
                  <h1>{{items.goodName}}</h1>
                  <dl>
                    <dt v-html="items.goodListPromotionalCopy"></dt>
                    <dd></dd>
                  </dl>
                  <div class="policy-price">
                    <span>{{items.price}}元</span>起
                  </div>
                  <router-link :to="{name:'productdetail',query:{productId:items.productId}}">立即投保</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="insurance-config">
      <h1>保险配置方案</h1>
      <table>
        <thead>
          <tr>
            <td width="11%">角色</td>
            <td width="30%">建议产品</td>
            <td width="11%">
              建议
              <br />保额
            </td>
            <td width="12%">
              保险
              <br />年限
            </td>
            <td width="12%">
              缴费
              <br />期限
            </td>
            <td width="11%">
              年缴
              <br />保费
            </td>
          </tr>
        </thead>
        <tbody id="insuranceConfigWrap" v-for="(item,index) in customerAnswers" :key="index">
          <tr v-for="(items,indexs) in products[index]" :key="indexs">
            <td :rowspan="products[index].length" v-if="indexs == 0">
              {{item.relationship}}
              <br />{{item.age}}岁
            </td>
            <!-- 建议产品 -->
            <td style="text-align: left;padding:5px;">{{items.goodName}}</td>
            <!-- 建议保额 -->
            <td>{{items.sumInsured / 10000}}万</td>
            <!-- 保障年限 -->
            <td>{{items.guaranteePeriod}}</td>
            <!-- 缴费年限 -->
            <td>一次性缴清</td>
            <!-- 年缴保费 -->
            <td>{{items.price}}</td>
          </tr>
          <!-- <tr>
            <td style="text-align: left;padding:5px;">安联臻爱医疗保险(2017版)-卓越计划(有社保)</td>
            <td>500万</td>
            <td>1年</td>
            <td>一次性缴清</td>
            <td>1262</td>
          </tr> -->
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6">
              <span id="totalCount">{{totalExpenditures}}</span>元/年
            </td>
          </tr>
        </tfoot>
      </table>
      <p class="case-tips">注：保险配置预算仅供参考，实际缴费金额与投保时选择的内容有关。</p>
      <router-link :to="{name:'Customize',query:{anew:'yes'}}">重新测试</router-link>
    </div>
  </div>
</template>

<script>
//import x from ''
import api from "../fetch/api";
export default {
  components: {},
  data() {
    return {
      recommend_banner: require("../assets/images/PersonalTailor/recommend_banner.png"),
      icon_age_recommend: require("../assets/images/PersonalTailor/icon_age_recommend.png"),
      icon_income_recommend: require("../assets/images/PersonalTailor/icon_income_recommend.png"),
      icon_location_recommend: require("../assets/images/PersonalTailor/icon_location_recommend.png"),
      icon_shebao_recommend: require("../assets/images/PersonalTailor/icon_shebao_recommend.png"),
      customerAnswers:'',  //所有方案
      products:[], //计划产品产品
      baseImagePath:this.$store.state.baseImagePath,
      totalExpenditures:'', //总额
    };
  },
  computed: {},
  mounted(){
    var that = this;
    var args = this.sign({"openId":this.getCookie('openId'),mId:this.getCookie('ZB_JUSER_Mid')});
    // 获取方案
    // this.$axios.post('/brg/openapi/h5/personalCenter/getZnCustomerPlan',args).then(res=>{
    api.getZnCustomerPlan(args).then(res=>{
      var response = res;
      if(response.code == 20000){
        that.customerAnswers = JSON.parse(response.data.customerFa).customerAnswers;
        console.log(that.customerAnswers)
        that.totalExpenditures = JSON.parse(response.data.customerFa).totalExpenditures;
        // 从计划中取出产品
        for(var i = 0;i < that.customerAnswers.length;i++){  //外层循环人数
          var planProduct = [];
          for(var j = 0;j < that.customerAnswers[i].catExpenditures.length;j++){ //循环计划
            for(var z = 0;z < that.customerAnswers[i].catExpenditures[j].mapZnGoods.length;z++){  //循环产品
              that.customerAnswers[i].catExpenditures[j].mapZnGoods[z].classTag = that.customerAnswers[i].catExpenditures[j].two_cat_name;
              planProduct.push(that.customerAnswers[i].catExpenditures[j].mapZnGoods[z]);
            }
          }
          that.products.push(planProduct);
        }
        console.log(this.products)
      }
    })
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.PersonalTailor {
  padding: 30px;
  & > img {
    width: 100%;
  }
  .scheme {
    .insurance-case {
      margin: 20px auto 20px auto;
      background: #fff;
      border-radius: 5px;
      border: 2px solid #eee;
      padding: 5px;
      .case-title {
        overflow: hidden;
        border-bottom: 1px solid #eee;
        padding: 0 10px;
        line-height: 0.75rem;
        h1 {
          color: #333;
          float: left;
          font-size: 0.37rem;
          line-height: 0.75rem;
          span {
            color: #5b8aff;
          }
        }
      }
      .product-classify {
        position: absolute;
        top: 12px;
        right: 12px;
        background: #f1f1f1;
        font-size: 0.35rem;
        padding: 3px 8px;
      }
      .case-price {
        float: right;
        color: #999;
        font-size: 0.28rem;
        span {
          color: #f31818;
          font-size: 0.37rem;
          margin-right: 3px;
        }
      }
      .case-user-info {
        padding: 10px;
        font-size: 0.4rem;
        overflow: hidden;
        li {
          float: left;
          width: 50%;
          padding-left: 0.55rem;
          font-size: 0.3rem;
          height: 0.7rem;
          line-height: 0.7rem;
        }
        & > li:nth-of-type(1) {
          background: url("../assets/images/PersonalTailor/icon_age_recommend.png")
            no-repeat left center;
          background-size: 0.45rem 0.45rem;
        }
        & > li:nth-of-type(2) {
          background: url("../assets/images/PersonalTailor/icon_income_recommend.png")
            no-repeat left center;
          background-size: 0.45rem 0.45rem;
        }
        & > li:nth-of-type(3) {
          background: url("../assets/images/PersonalTailor/icon_location_recommend.png")
            no-repeat left center;
          background-size: 0.45rem 0.45rem;
        }
        & > li:nth-of-type(4) {
          background: url("../assets/images/PersonalTailor/icon_shebao_recommend.png")
            no-repeat left center;
          background-size: 0.45rem 0.45rem;
        }
      }
      .case-description {
        padding: 5px 10px 20px;
        color: #333;
      }
      .tab-content {
        margin-bottom: 5px;
        .insurance-item {
          width: 100%;
          overflow-x: auto;
          white-space: nowrap;
          padding: 0 5px;
          a {
            background: #fb8400;
            color: #fff;
            border-radius: 3px;
            font-size: 0.35rem;
            float: right;
            padding: 5px 10px;
          }
          .policy-price {
            float: left;
            color: #999;
            font-size: 0.28rem;
            margin-bottom: 20px;
            span {
              color: #f99a31;
              font-size: 0.43rem;
              margin-right: 0.25rem;
            }
          }
          h1 {
            line-height: 0.5rem;
            font-size: 0.34rem;
            margin: 5px 0;
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          dl {
            color: #999;
            font-size: 0.28rem;
            line-height: 0.4rem;
            margin-bottom: 24px;
            height: 35px;
            overflow: hidden;
            p{
              display: -webkit-box;
              display: -moz-box;
              white-space: pre-wrap;
              word-wrap: break-word;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }
          }
          dl dt,
          dl dd {
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          li {
            display: inline-block;
            position: relative;
            padding: 12px;
            width: 57%;
            border: 1px solid #eee;
            margin-right: 10px;
            img {
              min-height: 4.2rem;
              background: #eee;
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .insurance-config {
    background: #fff;
    padding: 10px 0;
    margin-top: 10px;
    h1 {
      font-size: 0.4rem;
      margin: 16px 0;
    }
    table {
      text-align: center;
      td {
        font-size: 0.33rem;
        text-align: center;
        color: #333;
        line-height: 0.38rem;
        border: solid 2px white;
        padding: 8px 0;
      }
      thead td {
        background: #5b8aff;
        color: #fff;
      }
       tfoot td {
          font-size: 0.4rem;
          padding: 20px;
          span {
            color: #f31818;
            font-size: 0.4rem;
        }
      }
      tr:nth-child(even) {
        background: #b3c9fe;
      }
      tr:nth-child(odd) {
        background: #d8e3fe;
      }
    }
    .case-tips {
        color: #999;
        font-size: 0.3rem;
        text-align: left;
        background: #fff;
    }
     a {
        background: #f99a31;
        color: #fff;
        width: 80%;
        margin: 15px auto;
        display: block;
        text-align: center;
        padding: 18px 0;
        border-radius: 5px;
    }
  }
}
</style>