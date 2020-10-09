<!-- 组件说明 支付失败-->
<template>
    <div class='paymentFailure'>
        <van-nav-bar title="支付失败" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <van-Image :src="paymentFailure" class="Image"/>
        <p>抱歉，支付失败！</p>
        <router-link to="/mine">
            <input type="button" class="lookmore" value="重新投保">
        </router-link>
    </div>
</template>

<script>
    export default {
        name:'paymentFailure',
        components: {

        },
        data () {
            return {
                paymentFailure:require('../../assets/images/paymentFailure/paymentFailure.png')
            };
        },
        computed: {

        },
        mounted(){
            /**
             * 中科软可回溯
             */
            var infor = {};
            infor.start=2;
            initEasyReplay(infor);
            console.log('支付失败页面调用initEasyReplay()方法;');
        },
        // 销毁前清楚计时器
        beforeDestroy(){
            /**
             * 中科软可回溯 结束录制
             */
            ending();
            console.log('ending() 结束录制');
        },
        methods: {
            onClickLeft() {
               this.$router.go(-1);
            }
        },
    }
</script>

<style scoped lang="scss">
.paymentFailure{
    .Image{
        width: 150px;
        display: block;
        margin:80px auto;
    }
    p{
        text-align: center;
        font-size: 30px;
    }
    .lookmore{
        display: block;
        background: #F99A31;
        text-align: center;
        width: 618px;
        height: 88px;
        color: #fff;
        border-radius: 50px;
        margin: 53px auto;
    }
}
</style>