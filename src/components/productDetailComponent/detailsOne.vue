<!-- 组件说明 -->
<template>
    <div class='detailOne'>
        
        <van-Image width="100%" :src="img" />
        <div class="goodsInfo">
            <span class="goodsName">{{prodGoods.goodName}}</span>
            <p class="desc" v-html="prodGoods.goodDetailsPromotionalCopy"></p>
        </div>
        <div class="colorBlock"></div>
    </div>
</template>

<script>
import api from '@/fetch/api';
    name:"detailOne"
    export default {
        components: {},
        data () {
            return {
                img:'',
                prodGoods:"",
                goodId:""
            };
        },
        created(){
            this.goodId=this.getQueryString('productId');
        },
        mounted(){
            var args=this.sign({"productId":this.goodId,planId:""});
            this.prodGoods=this.$store.state.productDetail.data.prodGoods; 
                // 产品详情图
            this.img=this.$store.state.baseImagePath+this.$store.state.productDetail.data.prodGoods.goodImg;
        },
        methods: {
            
        }
    }
</script>

<style lang="scss">
    .detailOne{
        .goodsInfo{
            padding: 0.2rem 28px;
            .goodsName{
                font-size: 36px;
                display: inline-block;
                font-family: "PingFang-SC-Heavy";
                font-weight: 700;
                color: #333
            }
            .desc{
                font-size: 26px;
                p{
                    font-size: 26px;
                }
                color: #8F8F8F;
                font-family:PingFang SC;
                font-weight:500;
                color:#666;
                margin-top: 8px;
                margin-bottom: 10px;
                line-height:36px;
            }     
        }
        
    }
</style>