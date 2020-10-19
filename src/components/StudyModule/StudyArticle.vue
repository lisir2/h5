<!-- 组件说明 -->
<template>
  <div class="StudyArticle">
    <van-nav-bar title="文章详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="container">
      <div class="mainTop">
        <div class="title">{{articleInfo.classroomTitle}}</div>
        <div class="form">
          <router-link to="ToReadofFirst">
            保险经纪网
          </router-link>
          <span>{{articleInfo.updateTime ? articleInfo.updateTime.split(' ')[0] : ''}}</span>
        </div>
        <div class="card" v-if="UserInfo.agentInfo && UserInfo.agentInfo.auditStatus == 2">
          <div class="caver">
            <img :src="articleInfo.classroomHead ? articleInfo.classroomHead : headimgDefault" alt width="100%" />
          </div>
          <div class="descName">
            <div>{{articleInfo.shopper}} {{articleInfo.phoneNo}}</div>
            <div>{{articleInfo.companyname ? articleInfo.companyname : '浙江环晟保险经纪有限公司'}}</div>
          </div>
          <a href="javascript:;" class="myBtn" @click="alterCard">换成我的</a>
        </div>
      </div>

      <!--- 文章详细内容  -->
      <div class="articleContent" v-html="articleInfo.classroomContent"></div>

      <router-link class="complaint" :to="{path:'Report',query:{id:articleInfo.classroomId,title:encodeURIComponent(articleInfo.classroomTitle),readingQuantity:readingQuantity}}">声明：本文内容、图片部分来自网络，如有侵权，可立即举报/投诉</router-link>

      <!--- 甄选产品--->
      <div class="product" v-if="recommendProducts.length != 0">
        <div class="titleBox">
          <div class="product_title">甄选产品</div>
          <div class="line"></div>
        </div>
        <router-link
          class="productItem"
          :to="{path:'productdetail',query:{'productId':item.goodId,shareMid:articleShareMid,invitationCode:invitationCode}}"
          v-for="(item,index) in recommendProducts"
          :key="index"
        >
          <div class="leftDiv">
            <div class style="width: 100%;">
              <img width="100%" :src="baseImagePath + item.pic" />
            </div>
            <div class="tag">{{item.company}}</div>
          </div>
          <div class="rightDiv">
            <p class="right_one">{{item.name}}</p>
            <div class="right_two">
              <p v-html="item.keywords"></p>
            </div>
            <p class="right_three">
              <span class="minFee">
                ￥{{item.price}}
                <span style="font-size: 11px;">起</span>
              </span>
            </p>
          </div>
        </router-link>
      </div>
      <!-- 色块 -->
      <div class="colorLump"></div>
      <!----保险顾问-->
      <div class="insurdPerson" v-if="UserInfo.agentInfo && UserInfo.agentInfo.auditStatus == 2">
        <div class="detailData">
          <div class="imgLeft">
            <img :src="articleInfo.classroomHead ? articleInfo.classroomHead : headimgDefault" width="100%" alt />
          </div>
          <div class="data_right">
            <div class="data_title">您的保险顾问-{{articleInfo.shopper}}</div>
            <div class="data_company">{{articleInfo.companyname ? articleInfo.companyname : '浙江环晟保险经纪有限公司'}}</div>
            <div class="data_no">执业证号{{articleInfo.practiceNo}}</div>
          </div>
        </div>
        <div class="phone_weixin">
          <a :href="'tel:' + articleInfo.phoneNo" id="tophone" style="display: none;"></a>
          <img src="../../assets/images/StudyModule/weixin.png" id="phone" alt @click="weixinClick()"
          />
          <img
            src="../../assets/images/StudyModule/phone.png"
            alt
            id="weixin"
            @click="phoneClick(articleInfo.phoneNo)"
          />
        </div>
        <div class="introduce">{{myCardInfo.classroomPersonal}}</div>
        <div class="img_code">
          <img :src="agentInvitationCode == '' ? QRCodeDefault : agentInvitationCode" alt />
          <div class="addme">长按识别二维码，加入我们吧！</div>
        </div>
        <a href="javascript:;" class="tome_btn" @click="alterCard">点击换成我的信息</a>
      </div>
      <!-- 色块 -->
      <div class="colorLump"></div>
      <!---留言 message-->
      <div class="message">
        <div class="message_title">
          <div class="read_other">阅读其他 &nbsp;&nbsp;&nbsp;</div>
          <div class="read_no">阅读{{readingQuantity}}</div>
          <div class="see" @click="hLike()">
            <van-image width="18" height="18" :src="flowerImg" />在看
            <span>{{articleInfo.hLike}}</span>
          </div>
        </div>
        <div class="no_message" v-if="leaveWordList.length == 0" @click="Comment()">写留言</div>
        <div class="yes_message" v-if="leaveWordList.length != 0">
          <div>
            <div class="MessageTitle">
              <div class="goodMessage">
                精选留言
                <span @click="Comment()">留言</span>
              </div>
            </div>
            <div class="messageContent" v-for="(item,index) in leaveWordList" :key="index">
              <div class="messageItem">
                <div class="userHead">
                  <img :src="item.classroomHead ? item.classroomHead : headimgDefault" alt />
                </div>
                <div class="messageDetails">
                  <!-- 如果已经点过赞的渲染img带有class="Praise" -->
                  <div class="userName">
                    {{item.nickName ? item.nickName : '游客'}}
                    <p @click="giveLike(item,item.id)">
                      <img class="Praise" :src="item.leaveMessageLike > 0 ? praise1 : praise" alt />
                      <span class="leaveMessageLike">{{item.leaveMessageLike}}</span>
                    </p>
                  </div>
                  <div class="comment">
                    {{item.leaveMessageContent}}
                    <div class="reply" style v-if="item.auditContent">
                      <span class="label_block"></span>
                      <span>作者</span>
                      <div class="replyContent">
                        <span>{{item.auditContent}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- <div class="imgLeft">
            <img :src="articleInfo.classroomHead ? articleInfo.classroomHead : '../../assets/images/mine/headimg.png'" width="100%" alt />
          </div>
          <div class="data_right">
            <div class="data_title">您的保险顾问-{{articleInfo.shopper}}</div>
            <div class="data_company">{{articleInfo.companyname ? articleInfo.companyname : '浙江环晟保险经纪有限公司'}}</div>
            <div class="data_no">执业证号{{articleInfo.practiceNo}}</div>
          </div> -->
    <!---点击微信弹出的信息（有）-->
    <van-popup v-model="agentCard_show" closeable :style="{width:'80%',background:'transparent'}">
      <div class="agentCardInfo">
        <div class="yesData_font">尊敬的客户您好，长按二维码 关注我的微信号，我将通过微信为您提供一站式的保险、理赔服务。</div>
        <img :src="articleInfo.classroomHead ? articleInfo.classroomHead : headimgDefault" alt class="headimg" />
        <div class="agentCardContent">
          <div>{{articleInfo.companyname ? articleInfo.companyname : '浙江环晟保险经纪有限公司'}}-{{articleInfo.shopper}}</div>
          <div>联系电话{{articleInfo.phoneNo}}</div>
          <!-- 有二维码 -->
          <div class="yesQRCode">
            <img :src="articleInfo.classroomCode ? articleInfo.classroomCode : QRCodeDefault" alt />
            <p>长按二维码扫一扫了解我</p>
          </div>
          <!-- 没有二维码 -->
          <!-- <div class="noQRCode">
            <img src="../../assets/images/StudyModule/img_not pass.png" alt width="50%" />
            <div class="noData_font">这家伙真懒啥也没留下</div>
          </div> -->
        </div>
      </div>
    </van-popup>
    <!-- 留言 -->
    <van-popup v-model="leaveWord_show" round  position="bottom" >
      <div class="leaveWord">
        <van-icon name="cross" style="float:right;" size="20" @click="leaveWord_show = false"/>
        <p>{{articleInfo.classroomTitle}}</p>
        <textarea placeholder="留言将由公众号筛选后显示，对所有人可见" v-model="textareaVal" @input="(textareaVal.length > 0) ? isLeaveWord = true : isLeaveWord = false"></textarea>
        <button :style="isLeaveWord ? ActivityButton : disabledButton" @click="confirmLeaveWord">留言</button>
      </div>
    </van-popup>
    <!-- 弹出框登录 -->
    <van-popup v-model="PopUpLogin_show" round  :style="{width:'85%',overflowY:'visible'}" closeable>
      <PopUpLogin :LoginSuccess="LoginSuccess"></PopUpLogin>
    </van-popup>
  </div>
</template>

<script>
import api from "@/fetch/api";
import QRCode from 'qrcode';
import PopUpLogin from '@/components/base/PopUpLogin'

export default {
  name: "StudyArticle",
  components: {
    PopUpLogin
  },
  data() {
    return {
      headimgDefault: require('../../assets/images/mine/headimg.png'), //用户默认头像
      QRCodeDefault:require('../../assets/images/others/bxjjw.png'),  // 保险经纪网二维码
      flowerImg: require("../../assets/images/StudyModule/flowerImg.png"),
      articleInfo: "", //文章详情
      recommendProducts: [], //推荐产品
      baseImagePath: this.$store.state.baseImagePath,
      leaveWordList: [], //评论列表
      praise: require('../../assets/images/StudyModule/praise.png'),
      praise1: require('../../assets/images/StudyModule/praise1.png'),
      leaveWord_show: false,
      agentCard_show: false,
      ActivityButton:{
        'background':"#F99A31",
        'color':'white',
        'width':'140px',
        'lineHeight':'45px',
        'borderRadius':'30px',
        'fontSize':'15px',
        'display':'block',
        'margin':'20px auto 0',
      },
      disabledButton:{
        'background':"#3333331a",
        'color':'#B8B8B8',
        'width':'140px',
        'lineHeight':'45px',
        'borderRadius':'30px',
        'fontSize':'15px',
        'display':'block',
        'margin':'20px auto 0',
      },
      isLeaveWord:false, //是否可以留言
      textareaVal:'', //留言内容
      readingQuantity:this.getQueryString('readingQuantity'), //阅读量
      UserInfo:'', //用户信息
      agentInvitationCode: '', //代理人邀请注册的二维码
      articleShareMid: this.getQueryString('articleShareMid'), // 用户分享文章mid
      PopUpLogin_show: false, // 弹出框登录
      myCardInfo: '', //名片信息
      invitationCode: '', //邀请码
    };
  },
  computed: {},
  mounted() {
    var that = this;
    var params = {
      id: this.getQueryString("id"),
      memberId: this.articleShareMid ? this.articleShareMid : this.getCookie("ZB_JUSER_Mid"),
    };
    // 获取文章详情
    api.studyClassroomDetail(params).then(res => {
      that.articleInfo = res;
      that.recommendProducts = res.list.filter(res => {
        return res.type == "H5";
      });

      // 微信分享
      if(this.is_weixn()){
        // 分享图片打包图片
        var ShareImage = location.protocol + "//" + location.host + '/hsFileData' + res.hSharePic;
        // 分享描述
        var descript = res.hShareDescribe;
        // 分享title
        var title = res.classroomTitle;
        // 分享链接
        var shareLink = location.origin + location.pathname + '?id='+ this.getQueryString('id') +'&readingQuantity='+ this.getQueryString('readingQuantity') + '&articleShareMid=' + this.getCookie('ZB_JUSER_Mid');
        this.$WXShare(title, descript, ShareImage, shareLink);
      }
      
      // 阅读数加一
      var ReadParams = {
        classroomId: this.articleInfo.classroomId,
        classroomTitle: this.articleInfo.classroomTitle
      };
      api.classroomRead(ReadParams).then(res => {
        console.log(res);
      });

      // 获取评论
      var leaveWordParams = {
        classroomId: this.articleInfo.classroomId
      };
      api.frontLeaveMessageSelect(leaveWordParams).then(res => {
        that.leaveWordList = res;
      });
    });

    if(this.articleShareMid || this.getCookie('ZB_JUSER_Mid')){
      // 根据 memberId 获取微商城的 UserId
      api.getUserId({memberId: String(this.articleShareMid || this.getCookie('ZB_JUSER_Mid'))}).then(res=>{
        this.userId = res;
        // 获取名片信息
        api.myCardSelect({userId: res}).then(res=>{
          this.myCardInfo = res;
        })
      })
    }

    // 获取用户信息 代理人生成邀请二维码
    this.getUserInfo();
  },
  methods: {
    // 用户登录状态获取用户信息
    getUserInfo(){
      // 获取当前用户信息
      if(this.articleShareMid || this.getCookie('ZB_JUSER_Mid')){
        var userInfoParams = this.sign({
          "userId": this.articleShareMid ? this.articleShareMid : this.getCookie('ZB_JUSER_Mid')
        });
        api.queryPersonalInfo(userInfoParams).then(res=>{
          if(res.code == 20000){
            // 判断用户是否是代理人
            if(res.data.agentInfo.auditStatus == 2){
              // 代理人生成邀请二维码
              this.initAgentQRCode(location.origin + '/hsfront/agentRegister?invitationCode=' + res.data.agentInfo.invitationCode);
              this.invitationCode = res.data.agentInfo.invitationCode;
            }
            this.UserInfo = res.data;
          }else{
            this.Toast(res.message);
          }
        })
      }
    },
    // 生成代理人邀请码
    initAgentQRCode(url){
      var that = this;
      var option = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: {
          dark:"#000000",
        }
      };
      QRCode.toDataURL(url,option).then(imgData => {
          if(imgData) {
            that.agentInvitationCode = imgData;
          }
      }).catch(err => {
        console.error('生成二维码失败')
      });
    },
    onClickLeft() {
      this.$router.push('study');
    },
    phoneClick(phone) {
      //询问框
      this.$dialog
        .confirm({
          title: "拨打电话",
          message: "确定拨打电话：" + phone
        })
        .then(() => {
          $("#tophone")[0].click();
        })
        .catch(() => {
          // on cancel
        });
    },
    weixinClick() {
      this.agentCard_show = true;
    },
    // 修改名片
    alterCard(){
      if(this.getCookie('ZB_JUSER_Mid')){
        // 不是代理人去跳转代理人申请页面
        if(this.UserInfo.agentInfo.auditStatus != 2){
          this.$router.push('agent');
        } else{
          // 修改名片
          this.$router.push({path:'myCard',query:{id:this.getQueryString('id'),readingQuantity:this.getQueryString('readingQuantity')}});
        }
      } else{
        // 显示登录
        this.PopUpLogin_show = true;
      }
    },
    // 点赞
    giveLike(item,id){
      var that = this;
      // 文章点赞
      api.leaveMessageLike({id:id}).then(res=>{
        if(res.success == true){
          item.leaveMessageLike++;
          that.Toast(res.message);
        }
      });
    },
    // 留言
    Comment(){
      this.leaveWord_show = true;
    },
    // 确定留言
    confirmLeaveWord(){
      var that = this;
      if(this.isLeaveWord){
        this.leaveWord_show = false;
        var params = {
          classroomId: this.articleInfo.classroomId,
          classroomTitle: this.articleInfo.classroomTitle,
          userId: this.getCookie("ZB_JUSER_Mid"),
          shopper: "",
          leaveMessageContent: this.textareaVal,
        };

        api.leaveMessageContent(params).then(res=>{
          if(res.success == true){
            that.Toast(res.message);
          }
        });
      }
    },
    // 在看
    hLike(){
      var that = this;
      var params = {
        classroomId: this.articleInfo.classroomId,
        classroomTitle: this.articleInfo.classroomTitle,
      };
      // 在看点赞
      api.classroomLike(params).then(res=>{
        if(res.success == true){
          that.articleInfo.hLike++;
          that.Toast(res.message);
        }else{
          that.Toast(res.message);
        }
      })
    },
    // 登录成功回调
    LoginSuccess:function(){
      this.PopUpLogin_show = false;
      // 获取用户信息 代理人生成邀请二维码
      this.getUserInfo();
    }
  }
};
</script>

<style lang="scss">
.StudyArticle {
  .mainTop {
    padding: 0 30px;
    .title {
      font-size: 34px;
      font-family: PingFang SC;
      font-weight: 800;
      color: rgba(51, 51, 51, 1);
      height: 90px;
      margin-top: 15px;
    }
    .form {
      font-size: 28px;
      height: 70px;
      line-height: 70px;
      a {
        color: #008cff;
      }
      span:nth-child(2) {
        color: #999999;
      }
    }
    .card {
      overflow: hidden;
      background: linear-gradient(
        -8deg,
        rgba(251, 89, 0, 1),
        rgba(251, 132, 0, 1)
      );
      border-radius: 10px;
      margin-top: 20px;
      padding: 30px 0;
      .caver {
        width: 85px;
        float: left;
        height: 85px;
        height: 100%;
        text-align: center;
        vertical-align: middle;
        margin: 0 12px;
      }
      img {
        border-radius: 50%;
      }
      .descName {
        float: left;
        margin: 0 12px;
        color: #fff;
        div:nth-child(1) {
          font-size: 26px;
          height: 50px;
          line-height: 50px;
        }
        div:nth-child(2) {
          font-size: 22px;
        }
      }
      .myBtn {
        float: right;
        width: 150px;
        height: 50px;
        background: rgba(255, 255, 255, 1);
        border: 0px solid rgba(255, 255, 255, 1);
        border-radius: 24px;
        margin-right: 26px;
        margin-top: 18px;
        text-align: center;
        line-height: 50px;
        color: #fb6300;
        font-size: 26px;
      }
    }
  }

  /*
文章详细内容
 */
  .articleContent {
    margin-top: 60px;
    margin-bottom: 60px;
    padding: 0 30px;
    img{
      width:100% !important;
      height: auto!important;
    }
    
  }

  /*
甄选产品*/
  .product {
    padding: 0 30px;
    position: relative;
    overflow: hidden;
    .product_title {
      width: 170px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      height: 70px;
      margin: auto;
      line-height: 70px;
      z-index: 2;
      background: #fff;
      text-align: center;
    }
    .line {
      width: 400px;
      height: 2px;
      background-color: #eeeeee;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
    .titleBox {
      position: relative;
      height: 70px;
      margin-bottom: 24px;
    }
  }

  .productItem {
    height: 250px;
    display: block;
    .leftDiv {
      width: 27%;
      height: 100%;
      float: left;
      .tag {
        text-align: center;
        background: #f6f6f6;
        border-radius: 10px;
        height: 50px;
        line-height: 50px;
        color: #333;
        font-size: 22px;
        width: 100%;
        font-weight: 600;
        overflow:hidden; 
        display:-webkit-box;            //将对象作为弹性伸缩盒子模型显示。
        -webkit-box-orient:vertical;    //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
        -webkit-line-clamp:1;  //规定行数

      }
    }
    .rightDiv{
      float: left;
      width: 68%;
      margin-left: 4%;
      height: 100%;
      .right_one {
        font-size: 31px;
        font-family: PingFang SC;
        font-weight: 800;
        color: rgba(51, 51, 51, 1);
        margin-top: 10px;
      }
      .right_two {
        min-height: 80px;
        margin: 10px 0;
        color: #666;
        display: -webkit-box;
        display: -moz-box;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 26px !important;
        height: auto;
        line-height: 36px;
        li {
          padding: 0;
        }
        p {
          height: auto;
          display: -webkit-box;
          display: -moz-box;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: 26px;
          span {
            font-size: 0.373333rem !important;
          }
          img {
            width: 25px;
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 5px;
          }
        }
      }
      .right_three {
        .minFee {
          color: #fb8400;
          font-weight: 700;
          float: left;
          font-size: 30px;
        }
      }
    }
  }

  /* 保险顾问*/
  .insurdPerson {
    padding: 30px 0 69px;
    .detailData {
      padding: 0 30px;
      overflow: hidden;
      .imgLeft {
        width: 100px;
        height: 100px;
        float: left;
        border-radius: 50%;
        overflow: hidden;
      }
      .data_right {
        float: left;
        margin-left: 24px;
        .data_title {
          font-size: 30px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
        .data_company {
          font-size: 26px;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          line-height: 40px;
          margin: 10px 0 0;
        }
        .data_no {
          font-size: 22px;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .phone_weixin {
      padding: 0 30px;
      height: 70px;
      vertical-align: middle;
      margin-top: 20px;
      border-bottom: solid 2px rgba(238, 238, 238, 1);
      img {
        width: 44px;
        height: 44px;
        float: right;
        margin-right: 20px;
      }
    }
    .introduce {
      margin: 20px 30px 43px;
      padding-bottom: 20px;
      font-size: 26px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 44px;
      border-bottom: solid 2px rgba(238, 238, 238, 1);
    }
  }

  .img_code {
    text-align: center;
    font-size: 26px;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    line-height: 44px;
    margin-bottom: 74px;
  }

  .img_code img {
    width: 300px;
    height: 300px;
  }

  .tome_btn {
    display: block;
    width: 600px;
    height: 88px;
    background: rgba(249, 154, 49, 1);
    border-radius: 44px;
    font-size: 32px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 88px;
    text-align: center;
    margin: auto;
  }

  /*
留言
*/
  .message {
    margin-bottom: -100px;
    .message_title {
      font-size: 28px;
      padding: 20px 30px;
      overflow: hidden;
    }
    .read_other {
      float: left;
      color: #5b8aff;
    }
    .read_no {
      float: left;
      color: #999999;
    }
    .see {
      float: right;
      color: #5b8aff;
      .van-image {
        vertical-align: middle;
        margin-top: -3px;
      }
    }
    .no_message {
      height: 230px;
      background: rgba(247, 247, 247, 1);
      text-align: center;
      line-height: 230px;
      font-size: 28px;
      color: #5b8aff;
    }
    .yes_message {
      padding: 20px 40px;
      background-color: rgb(247, 247, 247);
      .MessageTitle {
        .goodMessage {
          color: #666666;
          span {
            float: right;
            color: #5b8aff;
          }
        }
      }
      .messageContent {
        margin: 20px 0;
        .messageItem {
          display: flex;
          padding: 15px 0;
          border-bottom: solid 2px #eeeeee;
          .userHead {
            flex: 2;
            img {
              width: 80%;
              display: block;
              border-radius: 50%;
            }
          }
          .messageDetails {
            flex: 9;
            .userName {
              color: #999999;
              p {
                float: right;
              }
              img {
                width: 33px;
                vertical-align: middle;
              }
              span {
                vertical-align: middle;
                font-size: 32px;
                margin: 4px 0 0 0;
                display: inline-block;
              }
            }
            .comment {
              color: #333333;
              margin-top: 6px;
              .reply {
                padding: 20px 0;
                .label_block {
                  display: inline-block;
                  width: 8px;
                  height: 30px;
                  background: linear-gradient(
                    150deg,
                    rgba(56, 164, 255, 1),
                    rgba(96, 207, 250, 1)
                  );
                  border-radius: 8px;
                  vertical-align: middle;
                }
                .replyContent {
                  padding-top: 10px;
                }
              }
            }
          }
        }
      }
    }
  }

  /**
点击微信的弹窗
*/
 .noData_font {
    color: #302d2d;
    font-size: 28px;
    color: red;
  }
  .yesData_font {
    color: #8f8f8f;
    background: white;
    border-radius: 20px;
    padding: 67px 55px 110px;
    line-height: 42px;
    font-size: 28px;
  }

  .agentCardContent {
    background: white;
    border-radius: 20px;
    padding: 120px 40px 60px;
    margin-top: -93px;
    text-align: center;
    div {
      font-size: 32px;
      color: #333;
      font-weight: bold;
      color: #333333;
    }
    img {
      width: 304px;
    }
    p {
      font-size: 28px;
      color: #333;
    }
  }

  .complaint {
    display: block;
    padding: 0 30px;
    font-size: 24px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 34px;
  }
  .headimg {
    width: 180px !important;
    position: relative;
    z-index: 10;
    display: block;
    margin: -80px auto 0;
    border-radius: 50%;
  }
  .colorLump {
    height: 20px;
    background: rgba(247, 247, 247, 1);
  }
  .leaveWord{
    padding: 30px;
    p{
      padding: 30px 0;
      font-size: 28px;
    }
    textarea{
        width: 100%;
        background: rgba(247,247,247,1);
        border-radius: 10px;
        border: 0;
        height: 300px;
        padding: 16px 20px;
        box-sizing: border-box!important;
    }
  }
}
</style>