<!-- 组件说明 注册成功页面 -->
<template>
    <div class='registerSuccess'>
        <van-nav-bar title="注册新用户" left-arrow @click-left="onClickLeft">
           <!-- <van-icon name="share" slot="right" /> -->
        </van-nav-bar>
        <div class="logoSuccess">
              <img :src="logo" alt="">
              <span>恭喜您，注册成功</span>
        </div>
        <van-button type="primary" round size="large" to="./loginRegister">完成</van-button>
        <!-- <p>密码登录</p> -->
        <p class="kefuNumber">如有疑问请致电客服热线：400-693-8080</p>
        <div class="advLogin">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in items" :key="index">
                <img :src="item.url" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
    export default {
        components: {

        },
        data () {
            return {
                logo:require('@/assets/images/login/logosuccess.png'),
                items:[
                    {
                        url:require('@/assets/images/login/fastadv.jpg')
                    }
                ],
            };
        },
        computed: {

        },
        methods: {
            onClickLeft(){
                this.$router.go(-1);   
            },
        },
    }
</script>

<style lang="scss">
body{
    background: #fff;
}
        .registerSuccess{
            text-align: center;
            .logoSuccess{
                margin:110px 200px;
                text-align: center;
                img{
                    width: 116px;
                    height: 116px;
                    display: block;
                    margin: auto;
                }
                span{
                    font-size: 32px;
                    display: block;
                    margin-top:37px;
                    font-weight: 500;
                }
            }
            .van-button--large{
                width: 618px;
                height: 88px;
                line-height: 88px;
                margin: 30px 0;
            }
            .van-button--primary{
                background: #F99A31;
                border: 0
            }
            .kefuNumber{
                text-align: center;
                width: 100%;
                font-size: 24px;
                color: #8F8A8A;
            }
            .advLogin{
                margin-top: 309px;
                .van-swipe{
                    margin: 30px;
                    height: 150px;
                    border-radius: 10px;
                }
            }
        }
</style>