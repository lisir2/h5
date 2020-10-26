<!-- 组件说明 保险头条：文章详情-->
<template>
    <div class='articleDetail'>
        <van-nav-bar title="详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div class="mainBox">
            <span class="mainName">{{title}}</span>
            <div class="author">来源： {{data.source}}   通讯员： {{data.reporter}}     发布日期：{{data.addTime}}</div>
            <div class="mainText" v-html="this.content">
                无论驾驶/乘坐汽车的意外都保障，一张保单保全车人员，投保年龄1~70周岁无论驾驶/乘坐汽车的意外都保障，一张保单保全车人员，投保年龄1~70周岁，乘坐汽车的意外都保障，无论驾驶/乘坐汽车的意外都保障，一张保单保全车人员，投保年龄1~70周岁无论驾驶/乘坐汽车的意外都保障，一张保单保全车人员，投保年龄1~70周岁，乘坐汽车的意外都保障无论驾驶/乘坐汽车的意外都保障，一张保单保全车人员，投保年龄1~70周岁无论驾驶/乘坐汽车的意外都保障，一张保单保全车人员，投保年龄1~70周岁，乘坐汽车的意外都保障
                无论驾驶/乘坐汽车的意外都保障，一张保单保全车人员，乘坐汽车的意外都保障，无论驾驶/乘坐汽车的意外都保障，一张保单保全车人员，投保年龄1~70周岁无论驾驶/乘坐汽车的意外都保障，一张保单保全车人员，投保年龄1~70周岁，乘坐汽车的意外都保障无论驾驶/乘坐汽车的意外都保障，一张保单保全车人员。
            </div>
            <div class="keyword">关键字:{{data.key1}}  {{data.key2}}  {{data.key3}}</div>
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
                title:"",
                content:"",
                data:'', //文章数据
            }
        },
        mounted(){
            var id=this.$route.query.articleId;
            console.log(id)
            var args=this.sign({})
            // this.$axios.post('/brg/openapi/h5/index/getInsuranceClassroom',args).then(res=>{
            api.getArticleDetail(args).then(res => {
                for(var i = 0;i < res.data.length;i++){
                    if(id == res.data[i].id){
                        this.data = res.data[i];
                        this.title=res.data[i].title;
                        this.content=res.data[i].content;
                    }
                }
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
            .author{
                color: #999;
                // text-align: center;
                font-size: 22px;
                margin-top: 30px;
            }
            .mainText{
                width: 100%;
                overflow: hidden;
                margin-top: 30px;
                text-indent: 2em;
                font-size: 26px;
                color: #333;
                p{
                    // text-indent: 0!important;
                    img{
                        width: 100%!important;
                        height: auto!important;
                        margin-left: -2em!important;
                    }
                }
            }
            .keyword{
                color: #999;
                font-size: 22px;
                margin-top: 40px;
            }
        }
    }
    video{
        width: 100%;
    }
</style>