<!-- 组件说明 个人资料-->
<template>
  <div class="personalData">
    <van-nav-bar title="个人资料" left-arrow @click-left="onClickLeft">
      <!-- <van-icon name="share" slot="right" /> -->
    </van-nav-bar>
    <div class="mainBox">
      <ul>
        <li>
          <span class="headerImg">头像</span>
          <div class="hello">
            <div class="user-header"> 
              <input
                type="file"
                name="image"
                accept="image/*"
                @change="onchangeImgFun"
                class="header-upload-btn user-header-com"
              />
              <img alt :src="imagePath" class="user-header-img user-header-com" ref="img"/>
              <!-- <p class="tip">图片限制50kb <span class="error">{{errorStr}}</span></p> -->
            </div>
          </div>
        </li>
      </ul>
      <van-cell-group>
        <router-link :to="{name:'alterName'}">
          <van-cell
            title="昵称"
            :value="userInfo.name ? userInfo.name : ''"
            is-link 
          />
        </router-link>
        <van-cell title="注册手机" :value="userInfo.account ? userInfo.account : ''" />
        <van-cell title="执业资质" :to="agentInfo.auditStatus == 2 ? '/practicingCertificate' : (agentInfo.auditStatus == 1 ? '/practicingCertificateAudit' : '')" :value="agentInfo.auditStatus == 2  ? '已认证' : (agentInfo.auditStatus == 1 ? '审核中' : '未认证')" is-link />
        <router-link :to="{'path':'/bankInformation',query:{'immutable':true}}" v-if="agentInfo.auditStatus == 2">
          <van-cell title="提现信息" :value="Object.keys(userInfo.wxCashInfo || {}).length == 0 ? '未绑定' : '已绑定'" is-link/>
        </router-link>
        <van-cell title="微信绑定" :value="agentInfo.openId ? '已绑定' : '未绑定'" is-link/>
        <van-cell title="邀请码" :value="agentInfo.invitationCode ? agentInfo.invitationCode : ''" v-if="agentInfo.auditStatus == 2"/>
        <van-cell title="实名认证" :value="!realCertificationNo && !realName ? '未实名' : '已实名'" is-link :to="!realCertificationNo && !realName ? '/identityAuthentication' : ''"/>
      </van-cell-group>
    </div>
  </div>
</template>


<script>
import api from "@/fetch/api";
import { Toast } from "vant";
export default {
  components: {},
  data() {
    return {
      imgStr: require("@/assets/images/mine/headimg.png"),
      errorStr: "",
      userInfo:'', //用户信息
      agentInfo:'', // 代理人信息
      imagePath:'', //用户头像路径
      lvId:'', //5代理人
      realCertificationNo:'', //证件号码
      realName:'',//真实姓名
    };
  },
  computed: {},
  created(){
    this.userMessage();
  },
  mounted(){
    
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      // this.$router.push('/mine');
    },
    // 获取用户个人资料
    userMessage(){
      var args = this.sign({userId:this.getCookie('ZB_JUSER_Mid')});
      // this.$axios.post('/arg/openapi/h5/personalCenter/queryPersonalInfo',args).then(res=>{
      api.queryPersonalInfo(args).then(res=>{
        var response = res;
        console.log(response)
        if(response.code == 20000){
          this.userInfo = response.data;
          this.agentInfo = response.data.agentInfo;
          this.lvId = response.data.lvId;
          this.realCertificationNo = response.data.realCertificationNo;
          this.realName = response.data.realName;
          // 判断是否有头像
          if(this.userInfo.face){
            this.imagePath = this.userInfo.face;
          }else{
            this.imagePath = this.imgStr;
          }
        }
      })
    },
    onchangeImgFun(e) {
      var that = this;
      /**
       * 使用cropper剪切工具进行图片剪切上传
       * e : 事件源对象
       * resultObj: 修改之后展示的用户头像
       * aspectRatio ：cropper 插件的参数 （屏幕高宽比 1 等比例）
       * e.target.files[0].name：上传图片的名称
       * true：上传之后是否修改当前用户头像
       */
      this.clip(e,{
        resultObj:that.$refs.img,
        aspectRatio:1,
      },e.target.files[0].name,true);


      // var _this = this;
      // var file = e.target.files[0];
      // console.log(e.target.files[0].name)
      // let imgSize = file.size;
      // if (imgSize >= 500 * 1024){
      //   Toast.fail("图片大小超出范围");
      // }else{
      //   var formData = new window.FormData();
      //   formData.append("file", file);
      //   console.log(_this.$store.state.baseImagePath)
      //   $.ajax({
      //       url: _this.$store.state.baseImagePath + '/openapi/common/upload',
      //       type: 'POST',
      //       data: formData, // 上传formdata封装的数据包
      //       dataType: 'JSON',
      //       cache: false, // 不缓存
      //       processData: false, // jQuery不要去处理发送的数据
      //       contentType: false, // jQuery不要去设置Content-Type请求头
      //       success: function (res) { // 成功回调
      //         if(res.code == 20000){
      //           _this.imgStr = res.data.url;
      //           var args = _this.sign({
      //             mId:_this.getCookie('ZB_JUSER_Mid'),
      //             imgPath:res.data.url,
      //             name:'',
      //           })
      //           api.updatePersonalImgAndInfo(args).then(res=>{
      //             if(res.code == 20000){
      //               Toast.success("修改成功");
      //               _this.userMessage();
      //             }else{
      //               Toast.fail("修改失败");
      //             }
      //             console.log(res);
      //           })
      //         }
      //         console.log(res)
      //       },
      //       error:function(res){
      //         console.log('上传失败')
      //       }
      //   });
      // }

    }
  }
};
</script>

<style lang='scss' scoped>
.personalData {
  .mainBox {
    ul li {
      display: flow-root;
      height: 130px;
      // border-bottom: 1px solid #ebedf0;
      background: #fff;
      .headerImg {
        float: left;
        line-height: 130px;
        color: #0c0c0c;
        font-size: 30px;
        margin-left: 30px;
        font-weight: 500;
      }
      .hello {
        position: relative;
        height: 100%;
        .user-header {
          width: 100px;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 30px;
          margin: auto;
          input{
            position:relative;
            z-index: 100;
          }
          .user-header-com {
            width: 100px;
            height: 100px;
            display: inline-block;
            margin-right: 30px;
            border-radius: 50%;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
          }
        }
        .header-upload-btn {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          /* 通过定位把input放在img标签上面，通过不透明度隐藏 */
        }
        .tip {
          font-size: 14px;
          color: #666;
        }
        /* error是用于错误提示 */
        .error {
          font-size: 12px;
          color: tomato;
          margin-left: 10px;
        }
      }
    }
    // .van-cell--clickable{
    //     border-bottom: solid 1px #302d2d;
    //   }
    .van-cell:nth-of-type(1){
      border-bottom: solid 1px #ebedf0;
    }
    .van-cell {
      padding: 36px 30px;
      .van-cell__title {
        span {
          font-size: 30px;
          color: #302d2d;
        }
      }
      .van-cell__value {
        span {
          color: #302d2d;
          text-align: left;
          display: inline-block;
        }
      }
    }
  }
}
</style>