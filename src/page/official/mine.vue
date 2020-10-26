<template>
    <div class="userlogin">
        <van-nav-bar title="保险经纪网" class="header_mine">
             <van-icon :name="topicon1" slot="right" @click="setup" size="18"/>
             <van-icon :name="topicon2" slot="right" style="margin-left:5px;" @click="chat" size="18"/>
        </van-nav-bar>
        <user-login @update:userDetails="(val)=>{userinfo = val;}"></user-login>
        <my-policy :userinfo="userinfo"></my-policy>
    </div>
</template>
<script>
import UserLogin from '@/components/mine/userLogin.vue';
import MyPolicy from '@/components/mine/myPolicy.vue';
export default {
    name: 'mine',
    components: {UserLogin,MyPolicy},
    data(){
        return {
            topicon1:require('@/assets/images/mine/topicon1.png'),
            topicon2:require('@/assets/images/mine/topicon2.png'),
            userinfo:'',
        }
    },
    mounted(){
        //  登录注册状态判断
        var loginStatus=this.getCookie('ZB_JUSER_Mid');
        // if(loginStatus){
        //     Toast.success('您已登录')
        // }
    },
    methods:{
        // 设置页面
        setup(){
            this.$router.push({ path: '/setUp' });
        },
        chat(){
            this.$router.push({ path: '/chat' });
        },
    }
}
</script>
<style lang="scss">
    .userlogin{
        background: #fff;
        .header_title{
            background:#fff;
            color:#000;
        }
        .mineset{
            display: flow-root;
            margin-top: 80px;
            i{
                float:right;
                margin-right: 20px;
                padding-top: 5px
            }
        }
        .header_mine{
             .van-nav-bar__left{
                 vertical-align: middle;
             }
             .van-nav-bar__right{
                .van-icon{
                    vertical-align:inherit;
                    margin-right: 16px;
                }
             }
                .van-icon{
                    vertical-align:inherit;
                }
                .van-image__img{
                    width: 39px;
                    height: 39px;
                }
        }
        .sameTitle{
            padding:20px 30px;
            border-bottom: 1px solid #eee;
            .leftB{
                width:8px;
                height:34px;
                background:linear-gradient(150deg,rgba(56,164,255,1),rgba(96,207,250,1));
                border-radius:8px;
                display: inline-block;
                vertical-align: middle;
            }
            .titleA{
                font-size: 0.4rem;
                line-height: 46px;
                display: inline-block;
                color: #0C0C0C;
                font-weight: 500;
                vertical-align: middle;
                margin-left: 10px;
            }
            i{
                font-size: 28px;
                color: #8F8A8A;
                float: right;
                display: inline-block;
                height: 44px;
                line-height: 44px
            }
        }
    }
    
</style>