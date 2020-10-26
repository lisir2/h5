<!-- 组件说明 设置页面-->
<template>
    <div class='setBox'>
        <van-nav-bar title="设置" left-arrow @click-left="onClickLeft">
           <!-- <van-icon name="share" slot="right" /> -->
        </van-nav-bar>
        <div class="mainBox">
            <a href="javascript:;" @click="personalData()" >
                <van-cell title="个人资料" style="border-bottom: 0.1px solid #ebedf0!important;" is-link/>
            </a>
            <van-cell-group v-if="auditStatus">
                <van-cell title="佣金比例显示">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon>
                        <van-switch v-model="case1" size="25" active-color="#F99A31" inactive-color="rgb(230,230,230)" @change="changeCell"/>
                    </template>
                </van-cell>
                <!-- <van-switch-cell v-model="case2" active-color="#F99A31" inactive-color="rgb(230,230,230)" title="消息通知" />
                <van-switch-cell v-model="case3" active-color="#F99A31" inactive-color="rgb(230,230,230)" title="个人展示" /> -->
            </van-cell-group>
            <input type="button" value="退出当前账号" @click="logOut" class="logoutBtn">
        </div>
    </div>
</template>

<script>
    import api from '@/fetch/api'
    export default {
        components: {

        },
        data () {
            return {
                case1: true,
                auditStatus: false,
            };
        },
        computed: {

        },
        mounted(){
            var params = this.sign({
                "userId": this.getCookie("ZB_JUSER_Mid")
            });
            api.queryPersonalInfo(params).then(res=>{
                if(res.code == 20000){
                    this.auditStatus = res.data.agentInfo.auditStatus == 2 ? true : false;
                    this.case1 = res.data.agentInfo.goodsStatus == 1 ? true : false;
                }
            });
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1);
            },
            //退出当前账号
            logOut(){
                // 清除当前域下的cookie 用于本地开发调试使用
                this.delCookie('ZB_JUSER_Name');
                this.delCookie('ZB_JUSER_Mid');
                this.delCookie('openId');
                this.delCookie('user_phone');
                this.delCookie('ZB_JUSER_Top_Activity_Code');
                this.delCookie('ZB_JUSER_Top_Invitation_Code');
                this.delCookie('ZB_JUSER_Invitation_Code');
                this.delCookie('ZB_JUSER');
                this.delCookie('ZB_JSESSIONID');
                this.delCookie('wxopenId');
                this.delCookie('contactsMessage');  // 联系人信息
                // 清除.zgbxjj.com域下的cookie 用于发布使用
                this.delCookie('ZB_JUSER_Name','.zgbxjj.com');
                this.delCookie('ZB_JUSER_Mid','.zgbxjj.com');
                this.delCookie('user_phone','.zgbxjj.com');
                this.delCookie('ZB_JUSER_Top_Activity_Code','.zgbxjj.com');
                this.delCookie('ZB_JUSER_Top_Invitation_Code','.zgbxjj.com');
                this.delCookie('ZB_JUSER_Invitation_Code','.zgbxjj.com');
                this.delCookie('ZB_JUSER','.zgbxjj.com');
                this.delCookie('ZB_JSESSIONID','.zgbxjj.com');
                this.delCookie('wxopenId','.zgbxjj.com');
                this.setCookie('Logout',true); // 退出登录，在首页和我的页面不进行授权登录
                this.$router.push({ path: '/' });
            },
            personalData(){
                this.$router.push({path:'/personalData'});
            },
            // 佣金开关
            changeCell(data){
                var params = this.sign({
                    "mId": this.getCookie('ZB_JUSER_Mid'), // 用户mid
                    "goodsStatus":data == true ? 1 : 0,
                });
                api.agentDisplaySettings(params).then(res=>{
                    if(res.code == 20000){
                        this.Toast(res.data);
                    } else{
                        this.Toast(res.data);
                    }
                })
            }
        },
    }
</script>

<style lang='scss' scoped>
   .setBox{
       .mainBox{
            .van-switch--on .van-switch__node,.van-switch__node{
                font-size: 48px;
            }
            .logoutBtn{
                width: 618px;
                height: 88px;
                border-radius: 50px;
                background: #F99A31;
                // margin-top: 360px;
                color: #fff;
                font-size: 32px;
                margin: 360px auto;
                display: block;
            }
       }
       .van-cell:not(:last-child)::after{
           width: 100%;
           left: 0;
       }
       .van-cell{
            padding: 25px 28px;
       }
   }
</style>