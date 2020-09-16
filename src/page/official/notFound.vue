<!-- 组件说明 404页面-->
<template>
    <div class='paymentFailure'>
        <van-nav-bar title="404" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <van-Image :src="paymentFailure" class="Image"/>
        <p>抱歉，找不到页面!</p>
    </div>
</template>

<script>
    export default {
        name:'notFound',
        components: {

        },
        data () {
            return {
                paymentFailure:require('../../assets/images/paymentFailure/paymentFailure.png')
            };
        },
        computed: {

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