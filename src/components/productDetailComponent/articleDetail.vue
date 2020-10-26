<!-- 组件说明 文章详情-->
<template>
    <div class='articleDetail'>
        <van-nav-bar title="详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div class="mainBox" v-for="item in articleArr" :key="item.id">
            <span class="mainName">{{item.problemTitle}}</span>
            <div class="mainText" v-html="item.problemContent">
            </div>
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
                articleArr:""
            }
        },
        mounted(){
            // console.log(this.$route.params.goodsId);
            var goodsId=this.$route.query.goodsId;       
            // console.log(this.$route.params.tag);
            var tag=this.$route.query.tag;
            var args=this.sign({productId:goodsId,tag:tag})
            api.getDetailArt(args).then(res => {
                console.log(res.data);
                this.articleArr=res.data;
            })
        },
        methods: {
            onClickLeft(){
                 this.$router.go(-1);
            }
        },
    }
</script>

<style lang='scss'>
    .articleDetail{
        .mainBox{
            margin: 31px;
            line-height: 36px;
            .mainName{
                font-weight: 700;
                font-size: 32px;
                color: #333;
            }
            .mainText{
                margin-top: 80px;
                text-indent: 2em;
                font-size: 26px;
                color: #333;
                span{
                    text-indent: 0;
                    display: block;
                }
            }
        } 
    }
</style>