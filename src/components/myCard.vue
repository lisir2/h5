<!-- 组件说明 -->
<template>
  <div class="myCard">
    <van-nav-bar title="我的名片" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="container">
      <div class="inputItem">
        <div class="left">头像</div>
        <input
          type="file"
          id="headImg"
          @change="upLoadImage($refs.headImg)"
          style="display: none;"
        />
        <div class="right classroomHead">
          <img ref="headImg" class="headImg" :src="myCardInfo.classroomHead ? myCardInfo.classroomHead : headimgDefault" alt onclick="document.getElementById('headImg').click()"
          />
        </div>
      </div>
      <div class="inputItem">
        <div class="left">真实姓名</div>
        <div class="right agentName">{{myCardInfo.shopper}}</div>
      </div>
      <div class="inputItem">
        <div class="left">注册手机</div>
        <div class="right registerPhone">{{myCardInfo.phoneNo}}</div>
      </div>
      <div class="inputItem">
        <div class="left">所属公司</div>
        <div class="right companyname">{{myCardInfo.companyname ? myCardInfo.companyname : '浙江环晟保险经纪有限公司'}}</div>
      </div>
      <div class="inputItem">
        <div class="left">执业证编号</div>
        <div class="right practiceNo">{{myCardInfo.practiceNo}}</div>
      </div>
      <div class="inputItem">
        <div class="left">微信二维码</div>
        <router-link class="right classroomCode" to="getWeixinCode">如何获取微信二维码</router-link>
      </div>
      <div class="code">
        <input
          type="file"
          id="upQRCode"
          style="display:none;"
          @change="upLoadImage($refs.upLoadQRCode)"
        />
        <div class="showImg" onclick="document.getElementById('upQRCode').click()">
          <van-icon name="plus" size="40" />
          <img :src="myCardInfo.classroomCode" alt ref="upLoadQRCode" class="upLoadQRCode" width="100%" />
        </div>
        <div class="upLoadQRCodeText">点击上传二维码</div>
      </div>
      <div class="desc">
        <div class="descTitle">个人简介</div>
        <textarea rows="5" cols="20" name="message" class="descContent" placeholder="请输入，120字以内" v-model="myCardInfo.classroomPersonal" maxlength="120"></textarea>
      </div>
      <div class="save" @click="save()">保存</div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  name: "myCard",
  components: {},
  data() {
    return {
      headimgDefault: require('@/assets/images/mine/headimg.png'), //用户默认头像
      myCardInfo:'', //用户名片信息
      userId:'', //用户id
    };
  },
  computed: {},
  mounted(){
    // 根据 memberId 获取微商城的 UserId
    console.log(typeof(String(this.getCookie('ZB_JUSER_Mid'))))
    api.getUserId({memberId: String(this.getCookie('ZB_JUSER_Mid'))}).then(res=>{
      this.userId = res;
      api.myCardSelect({userId: res}).then(res=>{
        this.myCardInfo = res;
      })
    })
    
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 上传图片
    upLoadImage(element) {
      var that = this;
      /**
       * 使用cropper剪切工具进行图片剪切上传
       * e : 事件源对象
       * resultObj: 修改之后展示的用户头像
       * aspectRatio ：cropper 插件的参数 （屏幕高宽比 1 等比例）
       * e.target.files[0].name：上传图片的名称
       * false：上传之后是否修改当前用户头像
       */
      this.clip(event,{
        resultObj:element,
        aspectRatio:1,
      },event.target.files[0].name,false);
    },
    // 修改名片
    save(){
      var params = {
        userId: this.userId,
        classroomPersonal: $('.descContent').val(),
        classroomCode: $('.upLoadQRCode').attr("src"),
        classroomHead: $('.headImg').attr("src") == this.headimgDefault ? '' : $('.headImg').attr("src"),
      }
      api.myCardUpdate(params).then(res=>{
        if(res.success == true){
          // 有id参数，代表从文章详情进来的，修改名片之后返回文章页面
          if(this.getQueryString('id')){
            const toast = this.Toast.success({
              duration: 0, // 持续展示 toast
              forbidClick: true,
              message: res.message,
            });

            let second = 2;
            const timer = setInterval(() => {
              second--;
              if (!second) {
                clearInterval(timer);
                // 手动清除 Toast
                this.Toast.clear();
                this.$router.push({path:'StudyArticle',query:{id:this.getQueryString('id'),readingQuantity:this.getQueryString('readingQuantity')}});
              }
            }, 1000);
          }else{
            const toast = this.Toast.success({
              duration: 2000, // 持续展示 toast
              forbidClick: true,
              message: res.message,
            });
          }
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.myCard {
  .container {
    padding: 0 0 40px;
  }

  .inputItem {
    padding: 0rem 30px;
    height: 110px;
    font-size: 30px;
    border-bottom: 1px solid #e8e6e6;
    color: #302d2d;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      vertical-align: middle;
      border: solid 1px #eee;
    }
    .left {
      float: left;
      width: 30%;
    }
    .right {
      float: right;
      width: 70%;
      text-align: right;
    }
  }

  .code {
    text-align: center;
    color: #302d2d;
    font-size: 28px;
    border-bottom: 1px solid #e8e6e6;
    position: relative;
    padding: 10px 0;
    .showImg {
      width: 248px;
      min-height: 248px;
      margin: auto;
      .van-icon{
        margin: 70px 0;
      }
      img{
        width: 248px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
    .upLoadQRCodeText{
      margin-top: -50px;
    }
  }

  .desc {
    padding: 0rem 30px;
    color: #302d2d;
    margin-bottom: 40px;
    .descTitle {
      padding: 40px 0;
      font-size: 28px;
    }

    textarea {
      border: none;
      width: 100%;
    }
  }

  .save {
    width: 600px;
    height: 88px;
    background: rgba(249, 154, 49, 1);
    border-radius: 44px;
    margin: 0 auto;

    font-size: 32px;
    color: rgba(255, 255, 255, 1);
    line-height: 88px;
    text-align: center;
  }
}
</style>