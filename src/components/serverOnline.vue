<template>

    <div class="other-menu">
        <div class="sameTitle">
            <span class="leftB"></span>
            <p class="titleA">在线服务</p>
        </div>
        <ul class="onlineList">
            <li @click="policyInquiry">
               <img :src="online3" alt="">
               <span>保单管理</span>
            </li> 
            <li @click="goDispute">
                <img :src="online4" alt="">
                <span>理赔服务</span>
            </li> 
            <li @click="orderPolicy">
               <img :src="online2" alt="">
               <span>定制保险</span>
            </li> 
            <li @click="insuranceClass">
                <img :src="online1" alt="">
                <span>保险课堂</span>
            </li> 
        </ul>
        <div class="colorBlock"></div>
        <div class="sameTitle aboutMeBox" style="text-align: center;padding:0rem">
            <div class="line"></div>
            <p class="titleA " id="aboutMe">关于我们</p>
        </div>
        <ul class="about">
            <li>
                <img :src="about1" alt="">
                <span>20年+</span>
                <p>深耕行业</p>
            </li> 
            <li>
                <img :src="about2" alt="">
                <span>权威认证</span>
                <p>保监会权威认证</p>
            </li> 
            <li>
                <img :src="about3" alt="">
                <span>30+</span>
                <p>品牌授权</p>
            </li> 
            <li>
                <img :src="about4" alt="">
                <span>2000万+</span>
                <p>投保人次</p>
            </li> 
        </ul>
        <ul class="list-menu">
            <li @click="onDownload">
                <img :src="other2" alt="">
                <div>
                    <p class="strong">下载APP</p>
                    <p class="corb2">随时随地便捷投保</p>
                </div>
            </li>
            <li @click="onFollow">
                <img :src="other1" alt="">
                <div>
                    <p class="strong">关注公众号</p>
                    <p class="corb2">不定期有惊喜</p>
                </div>
            </li>
            <van-popup v-model="show">
                <div class="followBox">
                    <span>关注保险经纪网公众号</span><br>
                    <p>1、长按下方二维码，并保存到手机</p>
                    <p>2、打开微信二维码扫一扫功能，点击右上角菜单从相册选取到刚才保存的二维码即可</p>
                    <img :src="bxjjw" alt="">
                     <!-- <input type="button" class="saveBtn" @click="downhander()" value="长按图片保存">  -->
                </div>
            </van-popup>
        </ul>
        <p class="cte" style="color:#999999">保险经纪网累计定制保险方案22,008,248，累计发出65,886,119保单</p>
        <!-- <div class="colorBlock"></div> -->
    </div>
</template>
<script>
import { Toast } from 'vant';
import api from '../fetch/api';
export default {
    name: 'other-menu',
    data(){
      return{
            online1:require('../assets/images/home/online1.png'),
            online2:require('../assets/images/home/online2.png'),
            online3:require('../assets/images/home/online3.png'),
            online4:require('../assets/images/home/online4.png'),
            about1:require('../assets/images/home/about1.png'),
            about2:require('../assets/images/home/about2.png'),
            about3:require('../assets/images/home/about3.png'),
            about4:require('../assets/images/home/about4.png'),
            other1:require('../assets/images/home/weixin_icon.png'),
            other2:require('../assets/images/home/phone_icon.png'),
            show : false, //关注公众号弹出层
            bxjjw:require('../assets/images/others/bxjjw.png'), //保险经纪网二维码
            link:this.$store.state.JumpPath, //页面跳转路径
      }  
    },
    methods:{
        policyInquiry(){
            this.$router.push({path:'/policyInquiry'});
        },
        orderPolicy(){
            this.$router.push({ path: '/CustomizedInsurance' })
        },
        insuranceClass(){
            location.href="//mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3MDQ4MzE4OA==&scene=124#wechat_redirect"
        },
        goDispute(){
            this.$router.push({path:'/ClaimsService'})
        },
        //关注公众号
        onFollow(){
            this.show = true;
        },
        onDownload(){
            Toast('功能正在开发中,敬请期待');
        },
        downImg(){
            console.log('下载')
            var alink = document.createElement("a");
            alink.href = 'http://pic16.nipic.com/20111006/6239936_092702973000_2.jpg';
            alink.download = "pic"; //图片名
            alink.click();
        },
        downhander(){
				 this.downloadImg(this.bxjjw,'pic');
			},
        downloadImg(imgsrc, name){
				var image = new Image();
				// 解决跨域 Canvas 污染问题
				image.setAttribute("crossOrigin", "anonymous");
				image.onload = function() {
					var canvas = document.createElement("canvas");
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext("2d");
					context.drawImage(image, 0, 0, image.width, image.height);
					var url = canvas.toDataURL(); //得到图片的base64编码数据
					console.log(url)
 
					var a = document.createElement("a"); // 生成一个a元素
					var event = new MouseEvent("click"); // 创建一个单击事件
					a.download = name || "photo"; // 设置图片名称
					a.href = url; // 将生成的URL设置为a.href属性
					a.dispatchEvent(event); // 触发a的单击事件
				};
				image.src = imgsrc;
			},
    }
}
</script>
<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0
    }
    .aboutMeBox{
        height: 129px;
    }
    body{
        .van-popup--center{
            width: 80%;
            border-radius: 10px;
            padding: 60px;
            padding-bottom: 40px;
            .followBox{
                text-align: center;
                span{
                    font-weight: 600;
                    font-size: 32px;
                    color: #333;
                    text-align: center;
                    margin-bottom: 44px;
                    display: inline-block;
                }
                p{
                    font-size: 28px;
                    color: #8F8A8A;
                    text-align: left;
                    line-height:40px;
                }
                img{
                    width: 230px;
                    height: 230px;
                    margin-top: 34px;
                    margin-bottom: 30px;
                }
                input{
                    width: 200px;
                    height: 60px;
                    border-radius: 6px;
                    color:#008CFF;
                    border:1px solid #008cff;
                    display: block;
                    background: #fff;
                    margin: 0 auto;
                }
            }
        }
    }
    .other-menu{
        .sameTitle{
            position: relative;
              #aboutMe{
                width: 130px;
                height: 30px;
                display: block;
                position: absolute;
                text-align: center;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                z-index: 1;
                font-size:26px;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:30px;
                background-color: #FFF;
            }
            .line{
                height: 1px;
                width: 3.2rem;
                border-top: solid 2px #666;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
            }
            padding: 45px 30px;
        }
        .title{
            font-size: 32px;
            font-weight: bold;
            text-indent: 1em;
            padding: 20px 0;
            background-color: #fff;
        }
        .cte{
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 20px;

        }
        .corb2{
            color: #B1AFAF;
            font-size: 24px;
        }
        .onlineList{
            margin: 0 30px;
            padding-bottom: 50px;
            justify-content: space-around;
            li {
                height: 160px;
                flex: 0.23;
                background: #f5f5f5;
                span{
                    margin-top: 13px;  /*12月13日 13px*/
                    color: #333333;
                    font-size: 24px;
                }
                img{
                    width: 57px;
                    height: 57px;
                    margin-top: 28px;
                }
            }
        }
        .about{
            margin-top: 0;
            li{
                img{
                    width: 60px;
                    height: 60px;
                }
                span{
                    margin-top: 12px;
                    color: #333;
                    font-size: 24px;
                }
                p{
                   margin-top: -4px;
                   color: #999999;
                   font-size: 20px;
                }
            }
        }
        ul{
           display: flex;
           margin: 20px 0;
           li{
                flex:1;
                text-align: center;
                img{
                    width: 80px;
                    height: 80px;
                }
                span{
                    display: block;
                    font-size: 24px
                }
            }
        }
        .list-menu{
            display:flex;
            flex-flow:row wrap;
            justify-content: space-between;
            margin: 0;
            padding: 20px 30px;
            padding-top: 8px;
            &>li:nth-of-type(2){
                img{
                    margin-left: 15px;
                }
            }
            li {
                width:338px;
                height: 134px; 
                display: flex;
                padding: 20px 12px;
                border-radius: 10px;
                &:nth-child(1){
                    background: #FCCA5E;
                    margin-right: 16px;
                }
                &:nth-child(2){
                    background: #5EADFC;
                }
                img{
                    width: 78px;
                    height: 78px;
                    margin:10px 0;
                }
                
                div{
                    flex: 2;
                    margin-left: 10px;
                    margin-top: 10px;
                    line-height: 40px;
                    p{
                        padding: 0;
                        text-align: left;
                        color: #fff;
                    } 
                    .strong{
                        font-size: 0.36rem;
                        text-align: left;
                        font-weight: 800;
                    }
                }
                
            }
        }
  }
</style>