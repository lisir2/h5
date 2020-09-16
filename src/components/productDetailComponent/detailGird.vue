<template>
  <div class="detail-gird">
    <!-- 产品详情/购买须知/理赔服务/用户评价 -->
    <van-sticky>
      <div class="tabItem">
        <ul>
          <li :class="activity == 1 ? 'actived' :''" @click="selectThis(1,'#tabFirst')">
            <a href="javascript:;">产品详情</a>
          </li>
          <li :class="activity == 2 ? 'actived' :''" @click="selectThis(2,'#tabSecond')">
            <a href="javascript:;">购买须知</a>
          </li>
          <li :class="activity == 3 ? 'actived' :''" @click="selectThis(3,'#tabThird')">
            <a href="javascript:;">理赔服务</a>
          </li>
          <li :class="activity == 4 ? 'actived' :''" @click="selectThis(4,'#tabFourth')">
            <a href="javascript:;">{{CommentsOrInsure == 'Insure' ? '免费领取' : '用户评价'}}</a>
          </li>
        </ul>
      </div>
    </van-sticky>
    <div class="tabContent">
      <div class="quota" id="tabFirst">
        <span class="borderA"></span>
        <p class="titleA">产品特色</p>
        <div v-html="prodGoods.goodFeatureOfProduct"></div>
      </div>
      <div class="colorBlock"></div>
      <div class="quota" id="tabSecond">
        <span class="borderA"></span>
        <p class="titleA">购买须知</p>
        <div v-html="prodGoods.goodPurchaseNotes"></div>
      </div>
      <div class="colorBlock"></div>
      <div class="quota" id="tabThird">
        <span class="borderA"></span>
        <p class="titleA">理赔服务</p>
        <ul>
          <li>
            <img :src="lipei1" alt />
            <span>出险后，请您立即拨打{{companyName}}24小时客服热线{{companyPhone}}进行报案。</span>
          </li>
          <li>
            <img :src="lipei2" alt />
            <span>保险公司根据案件情况，及时立案、安排人员上门查勘，并指导您提供本案理赔所需资料。</span>
          </li>
          <li>
            <img :src="lipei3" alt />
            <span>理赔资料齐全后，请您递交保险公司并索取理赔资料收讫依据；保险公司按照保险合同约定时间进行赔付。</span>
          </li>
          <li>
            <img :src="lipei4" alt />
            <span>请您在接到保险公司赔款通知后，查询赔款到账情况；如有疑问拨打保险公司客服热线进行咨询。</span>
          </li>
          <li>
            <img :src="lipei5" alt />
            <span>如果发生理赔纠纷，请您拨打环晟保险经纪公司24小时理赔服务电话0571-88310700，由环晟理赔顾问帮助您与保险公司沟通、协调、解决理赔纠纷。</span>
          </li>
        </ul>
      </div>
      <div class="colorBlock"></div>
      <div class="quota">
        <span class="borderA"></span>
        <p class="titleA">我们的服务</p>
        <ul class="wefory">
          <li>
            <i>●</i>解答理赔相关问题
          </li>
          <li>
            <i>●</i>及时受理报案给予理赔指南
          </li>
          <li>
            <i>●</i>协助您收集理赔资料
          </li>
          <li>
            <i>●</i>代向保险公司递交理赔申请
          </li>
          <li>
            <i>●</i>全程跟踪理赔进度
          </li>
          <li>
            <i>●</i>确保您快速得到赔款
          </li>
        </ul>
      </div>
      <!-- 详情底部四宫格 -->
      <div class="otherBox">
        <!-- <van-grid :column-num="4" style="border:0;background:#fff;">
                  <van-grid-item text="72*小时" :icon="other1" style="border:0"/>
                  <van-grid-item text="15分钟内" :icon="other2" style="border:0"/>
                  <van-grid-item text="我们免费" :icon="other3" style="border:0"/>
                  <van-grid-item text="让您快速" :icon="other4" style="border:0"/>
        </van-grid>-->
        <ul class="fourtext">
          <!-- <van-grid :border="false" :column-num="4" style="padding:0px;">
            <van-grid-item>
              <van-image :src="fourtextImg01" />
            </van-grid-item>
            <van-grid-item>
              <van-image :src="fourtextImg02" />
            </van-grid-item>
            <van-grid-item>
              <van-image :src="fourtextImg03" />
            </van-grid-item>
            <van-grid-item>
              <van-image :src="fourtextImg04" />
            </van-grid-item>
          </van-grid>-->
          <li>
            <img :src="other1" alt />
            <p class="firstP">7×24小时</p>
            <p>在线服务</p>
          </li>
          <li>
            <img :src="other2" alt />
            <p class="firstP">15分钟内</p>
            <p>极速回访</p>
          </li>
          <li>
            <img :src="other3" alt />
            <p class="firstP">我们免费</p>
            <p>协助理赔</p>
          </li>
          <li>
            <img :src="other4" alt />
            <p class="firstP">让您快速</p>
            <p>得到赔款</p>
          </li>
        </ul>
      </div>
      <div class="colorBlock"></div>
      
      <div class="quota" id="tabFourth">
        <!-- 免费领取活动投保 -->
        <div v-if="CommentsOrInsure == 'Insure'">
          <span class="borderA"></span>
          <p class="titleA">
              免费领取
              <span></span>
          </p>
          <div class="holderPolicy">
            <ul>
              <li>
                <span class="list_01">为谁投保</span>
                <span class="list_02">
                  <div>
                    <input
                      type="text"
                      name="insuredRelationship"
                      id="insuredRelationship"
                      placeholder="请选择为谁投保"
                      readonly
                      value="本人"
                    />
                    <!-- @click="show_insuredRelationship=true" -->
                  </div>
                </span>
              </li>
              <li>
                <span class="list_01">姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名</span>
                <span class="list_02">
                  <div>
                    <input type="text" name="name" placeholder="信息保密,仅用投保" id="name" />
                  </div>
                </span>
              </li>
              <li>
                <span class="list_01">身份证号</span>
                <span class="list_02">
                  <div>
                    <input type="text" name="IdNumber" placeholder="信息保密,仅用投保" id="IdNumber" />
                  </div>
                </span>
              </li>
              <li>
                <span class="list_01">手机号码</span>
                <span class="list_02">
                  <div>
                    <input type="text" name="phone" placeholder="信息保密,仅用投保" id="phone" maxlength="11"/>
                  </div>
                </span>
              </li>
              <li>
                <span class="list_01">电子邮箱</span>
                <span class="list_02">
                  <div>
                    <input type="text" name="email" placeholder="信息保密,仅用投保" id="email" />
                  </div>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
            <span class="borderA"></span>
            <p class="titleA">
              用户评价
              <span></span>
            </p>
            <a href="javascript:;">
              <p style="float:right;color: #333333;" class="noChat">
                暂无评论
                <van-icon name="arrow" size="15" style="vertical-align: middle;margin-top: -3px;" />
              </p>
            </a>
            <!-- <router-link to="/CommentList"></router-link> -->
            <!-- <div class="userComment">
              <div class="userHead">
                <img src="../assets/images/home/agentload.png" alt="">
                <p>秋天***</p>
              </div>
              <div class="commentContent">
                <div class="star">
                  <van-rate v-model="value" readonly size="12" gutter="2" style="display:inline;" color="#F9912E"/>
                  <span>非常满意</span>
                  <span style="color:#8F8F8F;float:right;">2019-05-24</span>
                  <p>非常好的一款重疾险，性价比高非常好的一款重疾险，性价比高非常好的一款重疾险。</p>
                </div>
              </div>
            </div>-->
            <!-- <div class="userComment">
              <div class="userHead">
                <img src="../assets/images/home/agentload.png" alt="">
                <p>秋天***</p>
              </div>
              <div class="commentContent">
                <div class="star">
                  <van-rate v-model="value" readonly size="12" gutter="2" style="display:inline;" color="#F9912E"/>
                  <span>非常满意</span>
                  <span style="color:#8F8F8F;float:right;">2019-05-24</span>
                  <p>非常好的一款重疾险，性价比高非常好的一款重疾险，性价比高非常好的一款重疾险。</p>
                </div>
              </div>
            </div>-->
            <!-- <div>该产品暂无评价</div> -->
        </div>
      </div>
    </div>
    <!-- 详情底部——我们为您 -->
    <!-- <div class="quota"><span></span><p class="titleA">我们为您</p>
            <ul class="wefory">
                <li><i>●</i>解答理赔相关问题</li>
                <li><i>●</i>及时受理报案给予理赔指南</li>
                <li><i>●</i>协助您手机理赔资料</li>
                <li><i>●</i>代向保险公司递交理赔申请</li>
                <li><i>●</i>全程跟踪理赔进度</li>
                <li><i>●</i>确保您快速得到赔款</li>
            </ul>
    </div>-->
    <van-action-sheet
      v-model="show_insuredRelationship"
      :actions="insuredRelationship"
      cancel-text="取消"
      @select="insuredRelationship_callback"
      title="为谁投保"
    />
  </div>
</template>
<script>
import $ from "jquery";
import "vant/lib/index.css";
import api from "@/fetch/api";
export default {
  name: "detail-gird",
  data() {
    return {
      goodId: "",
      faceValue: "0",
      correList: "",
      activeName: "a",
      prodGoods: "",
      activity: "1",
      companyName: "", //公司名称
      companyPhone: "", //保险公司电话
      brandId: "",
      lipei1: require("@/assets/images/detail/lipei1.png"),
      lipei2: require("@/assets/images/detail/lipei2.png"),
      lipei3: require("@/assets/images/detail/lipei3.png"),
      lipei4: require("@/assets/images/detail/lipei4.png"),
      lipei5: require("@/assets/images/detail/lipei5.png"),
      other1: require("@/assets/images/detail/other1.png"),
      other2: require("@/assets/images/detail/other2.png"),
      other3: require("@/assets/images/detail/other3.png"),
      other4: require("@/assets/images/detail/other4.png"),
      fourtextImg01: require("@/assets/images/detail/72小时.png"), //fourtext
      fourtextImg02: require("@/assets/images/detail/15分钟.png"), //fourtext
      fourtextImg03: require("@/assets/images/detail/免费理赔.png"), //fourtext
      fourtextImg04: require("@/assets/images/detail/快速赔款.png"), //fourtext
      value: 5,
      show_insuredRelationship: false,
      insuredRelationship: [
        { name: "本人", value: "本人" }
      ],
    };
  },
  props:['CommentsOrInsure'],
  mounted() {
    var routerName = this.$route.name;
    // 监听滚动条高度
    var that = this;
    window.onscroll = function() {
      if ($(document).scrollTop() >= $("#tabFirst").offset().top - 56) {
        that.activity = 1;
        if(routerName == 'FreeInsurance'){
          $('.PdfList').fadeIn();
          $('.tempBox').fadeIn();
        }
      }else{
        if(routerName == 'FreeInsurance'){
          $('.PdfList').fadeOut();
          $('.tempBox').fadeOut();
        }
      }
      if ($(document).scrollTop() >= $("#tabSecond").offset().top - 56) {
        that.activity = 2;
      }
      if ($(document).scrollTop() >= $("#tabThird").offset().top - 56) {
        that.activity = 3;
      }
      if ($(document).scrollTop() >= $("#tabFourth").offset().top - 56) {
        that.activity = 4;
      }
    };

    this.goodId = this.getQueryString("productId");
    var productId = this.goodId;
    this.prodGoods = this.$store.state.productDetail.data.prodGoods;
    this.brandId = this.$store.state.productDetail.data.prodGoods.brandId;
    //获取保险公司电话
    var args1 = this.sign({
      brandId: this.$store.state.productDetail.data.prodGoods.brandId
    });
    api.getCompanyTel(args1).then(res => {
      if (res.code == 20000) {
        this.companyName = res.data.brandName;
        this.companyPhone = res.data.brandPhone;
      }
    });

    //获取保险公司电话
  },
  destroyed() {
    window.onscroll = null;
  },
  methods: {
    showHot: function(id) {
      this.faceValue = id;
    },
    selectThis(index, name) {
      $("html,body").animate(
        { scrollTop: this.$el.querySelector(name).offsetTop - 54 },
        500
      );
    },
    // 为谁投保回调
    insuredRelationship_callback(item) {
      $("#insuredRelationship").val(item.name);
      this.show_insuredRelationship = false;
    },
  }
};
</script>
<style lang="scss">
.detail-gird {
  .quota {
    padding: 30px 20px;
    .borderA {
      width: 8px;
      height: 34px;
      background: linear-gradient(
        150deg,
        rgba(96, 207, 250, 1),
        rgba(56, 164, 255, 1)
      );
      border-radius: 8px;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .wefory {
    margin-top: 20px;
    li {
      font-size: 26px;
      color: #333;
      padding: 12px 20px;
      i {
        color: #f9912e;
        margin-right: 24px;
      }
    }
  }
  .titleA {
    font-size: 28px;
    display: inline-block;
    color: #333;
    font-weight: 800;
    vertical-align: middle;
    margin-left: 10px;
  }
  .van-grid-item__content {
    padding-bottom: 0;
  }
  .van-grid-item__text {
    color: #333;
    font-size: 24px;
    font-family: "PingFang-SC-Medium";
  }
  .fourtext {
    display: flex;
    padding-bottom: 46px;
    padding-top: 36px;
    border-top: 1px solid #eee;
    li {
      flex: 1;
      text-align: center;
      img {
        width: 70px;
        height: 70px;
      }
      .firstP {
        margin-top: 24px;
      }
      p {
        text-align: center;
        color: #333;
        font-size: 24px;
        line-height: 32px;
      }
    }
  }
  .tabItem .actived {
    border-bottom: 3px solid #46b3fd;
    color: #46b3fd !important;
    font-weight: 900 !important;
  }
  .actived a {
    font-weight: 700 !important;
    color: #46b3fd;
  }
  .tabItem {
    ul {
      display: flex;
      background: #fff;
      li {
        flex: 1;
        padding: 36px 0px;
        text-align: center;
        a {
          font-size: 30px;
        }
      }
    }
  }
  .tabContent {
    #tabFirst {
      padding-top: 30px;
      div {
        padding-top: 30px;
      }
    }
    #tabSecond {
      & > div {
        padding: 0 10px;
        margin-top: 30px;
      }
    }
    #tabThird {
      ul {
        // margin-top: 60px;
        & > li:nth-last-child(1) {
          border: 0;
        }
        li {
          margin-bottom: 96px;
          width: 100%;
          padding: 25px 0;
          margin: 0;
          border-bottom: 1px solid rgba(238, 238, 238, 1);
          overflow: hidden;
          img {
            float: left;
            width: 30%;
            margin-left: -30px;
          }
          span {
            float: left;
            display: inline-block;
            width: 72%;
            font-size: 26px;
            line-height: 38px;
            background: #fff;
            color: #333;
          }
        }
      }
    }
    #tabFourth {
      .noChat {
        font-size: 26px;
        position: relative;
        top: 4px;
      }
      .userComment {
        padding: 43px 0;
        overflow: hidden;
        border-bottom: 2px solid #eeeeee;
        .userHead {
          width: 18%;
          float: left;
          p {
            font-size: 21px;
            margin-top: 15px;
            color: #008cff;
          }
          img {
            width: 86px;
            height: 86px;
            border-radius: 100%;
          }
        }
        .commentContent {
          .star {
            span {
              font-size: 23px !important;
              color: #f9912e;
            }
            span:nth-of-type(1) {
              margin-left: 20px;
            }
            p {
              color: #333333;
              font-size: 28px;
              margin-top: 15px;
            }
          }
          width: 82%;
          float: left;
        }
      }
      & > div:nth-last-child(1) {
        border-bottom: 0;
      }
    }
  }
  .otherBox {
    .van-icon__image {
      width: 70px;
      height: 70px;
    }
  }
  .holderPolicy {
    ul {
      margin-top: 10px;
      li {
        overflow: hidden;
        border-bottom: 2px solid #dddddd;
        width: 100%;
        height: 100px;
        line-height: 100px;
        display: flex;
        .list_01 {
          display: inline-block;
          height: 100px;
          line-height: 100px;
          margin-left: 10px;
          width: 200px;
          color: #0c0c0c;
          font-size: 28px;
        }
        .list_02 {
          & > div {
            height: 100%;
            img {
              width: 44px;
            }
          }
          display: inline-block;
          height: 100px;
          line-height: 100px;
          .van-action-sheet__close {
            padding: 0 30px;
          }
          .van-radio-group {
            display: flex;
            margin: 30px auto;
            .van-radio {
              margin-right: 30px;
            }
          }
          input[type="text"] {
            width: 87%;
            height: 100%;
          }
        }
      }
      & > li:nth-last-child(1) {
        border: 0;
      }
    }
  }
}
p {
  word-break: break-all;
}
span {
  word-break: break-all;
}
</style>