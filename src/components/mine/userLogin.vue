<template>
    <div class="user-login" :style="userlogin">
        <div class="user_head">
            <img :src="user_head" alt="">
        </div>
        <!-- <van-image :src="user_head" /> -->
        <div class="cenDiv">
            <p class="userName">{{userName}}</p>
            <button @click="showChange">{{loginAndregist}}</button>
        </div>
        <van-icon name="arrow" class="headRight" @click="showChange"/>   
    </div>
</template>
<script>
import md5 from 'js-md5';
import { Toast } from 'vant';
import api from "@/fetch/api";
export default {
    name:"user-login",
    data(){
        return {
            img:require('@/assets/images/mine/headimg.png'),
            userlogin:{
                backgroundImage:"url(" + require("@/assets/images/mine/minebg.png") + ")",
            },
            userName:"",
            loginAndregist:"", //是否完善信息
            user_head:'', //用户头像
        }
    },
    created(){
        //  登录注册状态判断
        var loginStatus=this.getCookie('ZB_JUSER_Mid');
        // alert(loginStatus)
        if(loginStatus){
            this.user_Name();
        }else{
            this.userName = "您还未登录，请先登录";
            this.loginAndregist = "登录/注册";
            this.user_head = this.img;
        }
    },
    methods:{
        showChange(){
            var loginStatus=this.getCookie('ZB_JUSER_Mid');
            // 已登录
            if(loginStatus){
                this.$router.push({ path: '/personalData' });
                // Toast.fail('跳转待确定');
            }else{ //未登录跳转登录注册
                this.$router.push({ path: '/loginRegister' });
            }
        },
        // 获取用户信息
        user_Name(){
            var that = this;
            var args = this.sign({userId:this.getCookie('ZB_JUSER_Mid')});
            // this.$axios.post('/arg/openapi/h5/personalCenter/queryPersonalInfo',args).then(res=>{
            api.queryPersonalInfo(args).then(res=>{
                if(res.code == 20000){
                    that.$emit('update:userDetails', res.data);

                    // 判断是否有用户名有展示名称，没有展示手机号码
                    if(res.data.name){
                        this.userName = res.data.name;
                    }else{
                        this.userName = res.data.account;
                    }

                    // 判断是否有头像，有展示头像，没有展示默认图片
                    if(res.data.face){
                        this.user_head = res.data.face;
                    }else{
                        this.user_head = this.img;
                    }

                    // 根据用户的 判断用户信息是否完善
                    if(res.data.lvId == 5){ 
                        //个人代理商
                        if(res.data.name == '' || res.data.account == '' || res.data.face == '' || res.data.agentInfo.openId == '' || res.data.wxCashInfo == '' || res.data.wxCashInfo == null || res.data.agentInfo.invitationCode == '' || res.data.realName == '' || res.data.realCertificationNo == ''){
                            this.loginAndregist="未完善资料";
                        }else{
                            this.loginAndregist="已完善资料";
                        }
                    }else{ //普通会员
                        if(res.data.name == '' || res.data.account == '' || res.data.face == '' || res.data.agentInfo.openId == '' || res.data.realName == '' || res.data.realCertificationNo == ''){
                            this.loginAndregist="未完善资料";
                        }else{
                            this.loginAndregist="已完善资料";
                        }
                    }
                }else{
                    this.Toast(res.message);
                }
            })
        },
    }
}
</script>
<style lang="scss">
    .user-login{
        display: flex;
        // background: url('@/assets/images/mine/minebg.png') center center no-repeat;
        background-size: 100%;
        height: 236px;
        .user_head{
            img{
                width: 144px;
                height: 145px;
                float: left;
                margin:46px 30px;
                border-radius: 50%;
            }
        }
        // .van-image__img{
        //     width: 144px;
        //     height: 145px;
        //     float: left;
        //     margin:46px 30px;
        // }
        // .van-image{
        //     width: 210px;
        //     img{
        //         border-radius: 50%;
        //     }
        // }
        div{
            float: left;
        }
        .cenDiv{
            width:450px;
            margin: 60px 0;
            .userName{
                width: 80%;
                font-size: 34px;
                color: #fff;
                height: 45px;
                display: -webkit-box;
                display: -moz-box;
                white-space: pre-wrap;
                word-wrap: break-word;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
            }
            button{
                text-align: center;
                background: #4D7CF1;
                width: 180px;
                height: 45px;
                border-radius: 6px;
                margin-top: 15px;
                color: #fff;
                border: 2px solid rgba(255,255,255,1);
                border-radius: 40px;
                font-size: 26px;
            }
        }
        .headRight{
            margin-top: 105px;
            color: #fff;
            height:15px;
        }
    }
</style>


