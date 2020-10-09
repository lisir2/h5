<!-- 组件说明 天安产品非微信浏览器，进行微信支付，查询订单支付状态 -->
<template>
    <div class='pay'>
        <!-- 弹出遮罩层 -->
          <van-popup v-model="loadingShow" :lock-scroll="false" style="background-color: transparent;" :close-on-click-overlay="false">
            <!-- 加载动画 -->
            <van-loading size="24px" vertical color="#1989fa" style="overflow: hidden;">数据加载中...</van-loading>
          </van-popup>
    </div>
</template>

<script>
    import api from "../../../fetch/api";
    import { Toast } from 'vant';
    export default {
        components: {

        },
        data () {
            return {
                loadingShow:true, //加载状态
                merchantSeq:this.getQueryString('merchantSeq'),
            };
        },
        computed: {

        },
        mounted(){
            setTimeout(() => {
                // 根据流水号查询订单是否支付成功
                var params = this.sign({ merchantSeq:this.merchantSeq });
                api.TianAnPayState(params).then(res => {
                    if(res.code == 20000){
                        if(res.data.orderPaymentStatus == 2){
                            this.$router.push('/paySuccess');
                        }else if(res.data.orderPaymentStatus == 1){
                            this.$router.push("/paymentFailure");
                        }
                    }else{
                        this.Toast(res.message);
                    }
                })
            }, 5000);
        },
        methods: {

        },
    }
</script>

<style lang="scss" scoped>
    .pay{
        width: 100%;
        height: 100%;
        background-color:white;
    }
</style>