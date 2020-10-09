<!-- 组件说明 -->
<template>
  <div class="inviteFriends">
      <div class="InviteContent">
        <img :src="InviteFriendsImg" alt="">
        <div>
            <p class="title"><span></span>邀请有佣</p>
            <div class="textCon">
                您邀请好友成功投保，您即可获得产品推广的代理人佣金
            </div>
        </div>
        <div style="height: 10px;background-color: rgb(248,246,249);"></div>
        <div>
            <p class="title"><span></span>人脉有佣</p>
            <div class="textCon">
                A、B、C都是代理人，邀请关系是A邀请B，B邀请C，C邀请D，则B是A的一级会员，C是A的二级会员，D是A的三级会员。
                B通过A分享的产品链接购买，A可以获得代理人佣金；
                C通过B分享的产品链接购买，A可以获得直接推荐奖；
                D通过C分享的产品链接购买，A可以获得管理津贴。
            </div>
        </div>
    </div>
    <!-- 佣金弹出框 -->
    <div class="Commission_content">
        <div class="popupCommission">
            <div class="tableColor">
                <span style="border-bottom: 0;">用户</span>
                <span style="border-bottom: 0;">与A的关系</span>
                <span style="border-bottom: 0;">A可获得的佣金</span>
            </div>
            <div class="tableColor">
                <span>B</span>
                <span>一级会员</span>
                <span>代理人佣金</span>
            </div>
            <div class="tableColor">
                <span>C</span>
                <span>二级会员</span>
                <span>直接推荐奖</span>
            </div>
            <div class="tableColor">
                <span>D</span>
                <span>三级会员</span>
                <span>管理津贴</span>
            </div>
        </div>
    </div>
    <p style="color:rgba(0, 140, 255, 1);margin:10px 10px 120px 0;text-align: left;padding-left: 10px;">注：代理人佣金、直接推荐奖、管理津贴，可在产品详情中查看</p>
    <div class="share">
        <ul>
            <li @click="invitation()">面对面邀请</li>
            <li @click="linkInvitation()">分享好友链接</li>
        </ul>
    </div>
    <!-- 分享好友 -->
    <van-popup v-model="invitationShow" round :style="{width:'80%',overflow: 'visible',}">
      <div class="invitation">
          <img :src="trophy" alt="" class="trophy">
          <img :src="QRcode" alt="" class="QRcode">
          <p>扫码即可邀请好友</p>
      </div>
    </van-popup>
    <!-- 链接分享 -->
    <van-popup v-model="linkInvitationShow" :style="{width:'100%', height: '100%',overflow: 'visible',background:'transparent'}">
      <div class="linkInvitation" @click="linkInvitationShow = false;">
          <img :src="share" alt="">
      </div>
    </van-popup>
  </div>
</template>

<script>
import api from "@/fetch/api";
import QRCode from 'qrcode';

export default {
  name: "inviteFriends",
  components: {},
  data() {
    return {
        shareLink:'',
        InviteFriendsImg:require('@/assets/images/agent/InviteFriendsImg.png'),
        trophy:require('@/assets/images/agent/trophy.png'),
        share:require('@/assets/images/agent/share.png'),
        invitationShow: false,
        linkInvitationShow: false,
        QRcode:'', //邀请二维码
    };
  },
  computed: {},
  mounted(){
    // 获取邀请码
    let invitationCode = this.getCookie('ZB_JUSER_Invitation_Code');
    // 分享出去页面的url
    this.shareLink = decodeURI('https://' + location.host + '/hsfront/agentRegister?invitationCode=' + invitationCode);

    // 微信分享  具体分享在main.js 全局路由守卫里面
    if(this.is_weixn()){
      // 分享图片打包图片
      var ShareImage = location.protocol + "//" + location.host + '/hsfront' + require('@/assets/images/agent/ewm.jpg').substring(1);
      // 分享描述
      var descript = '百万保险人士信赖，维护您的利益，定制好产品吗，给予高收入！实时保健，在线出单，方案灵活，安全透明。立即注册';
      // 分享title
      var title = '加入环晟保险经纪网代理人,出单笔笔奖励';
      // 分享链接
      var shareLink = location.protocol + "//" + location.host + "/hsfront/AgentRegister?invitationCode=" + invitationCode;
      this.$WXShare(title, descript, ShareImage, shareLink);
    }
  },
  methods: {
    // 链接分享
    linkInvitation() {
        this.linkInvitationShow = true;
    },
    // 面对面邀请
    invitation(){
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
      QRCode.toDataURL(this.shareLink,option).then(imgData => {
          if(imgData) {
            that.invitationShow = true;
            that.QRcode = imgData;
          }
      }).catch(err => {
        console.error('生成二维码失败')
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.inviteFriends {
  .InviteContent>img {
    width: 100%;
  }

  .grade {
    font-weight: bold;
    color: black;
    font-size: 32px;
  }

  .examinationResult {
    text-align: center;
    padding: 0 10px;
    padding-top: 180px;
  }

  .examinationResult > img {
    vertical-align: middle;
  }

  .share > ul {
    width: 100%;
    list-style: none;
    position: absolute;
    bottom: 0;
  }

  .share li {
    display: block;
    width: 80%;
    line-height: 80px;
    text-align: center;
    font-size: 30px;
    box-sizing: border-box;
    border-radius: 40px;
    font-size: 32px;
    font-weight: 550;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
  }
  .share li:nth-of-type(1) {
    border: solid 2px rgba(255, 188, 0, 1);
    color: rgba(255, 188, 0, 1);
    background-color: white;
    bottom: 120px;
  }

  .share li:nth-of-type(2) {
    border-left: 0;
    background: linear-gradient(
      0deg,
      rgba(255, 150, 0, 1),
      rgba(255, 207, 0, 1)
    );
    color: white;
    bottom: 26px;
  }

  .invitation {
    text-align: center;
    padding-top: 20px;
    background-color: rgba(0, 0, 0, 0);
  }

  .invitation p {
    color: black;
    font-size: 32px;
    font-weight: 550;
    margin-bottom: 30px;
  }

  .title span {
    display: inline-block;
    width: 10px;
    height: 42px;
    background: linear-gradient(
      150deg,
      rgba(56, 164, 255, 1),
      rgba(96, 207, 250, 1)
    );
    border-radius: 5px;
    vertical-align: top;
    margin-right: 20px;
  }
  .title {
    color: black;
    font-size: 30px;
    padding: 14px;
    border-bottom: 2px solid rgba(221, 221, 221, 1);
    margin-bottom: 0;
  }

  .textCon {
    padding: 30px 50px;
    font-size: 28px;
  }

  .QRcode {
    width: auto;
    height: 280px;
    padding: 20px;
  }

  .linkInvitation {
    width: 100%;
    height: 100%;
  }

  .trophy {
    width: 80%;
    display: block;
    margin: auto;
    margin-top: -160px;
  }

  .linkInvitation img {
    width: 70%;
    float: right;
    margin-top: -40px;
  }

  .popupCommission {
    margin: 0 30px;
    border: 2px rgba(221, 221, 221, 1) solid;
    border-right: 0;
    border-bottom: 0;
  }
  .tableColor {
    width: 100%;
    overflow: hidden;
    color: rgba(51, 51, 51, 1);
  }
  .tableColor span {
    float: left;
    display: block;
    width: 33.3%;
    line-height: 70px;
    box-sizing: border-box;
    text-align: center;
    font-size: 28px;
    border-bottom: 2px rgba(221, 221, 221, 1) solid;
    border-right: 2px rgba(221, 221, 221, 1) solid;
  }

  .popupCommission > div:nth-of-type(1) {
    background-color: RGBA(240, 237, 241, 1);
  }
}
</style>