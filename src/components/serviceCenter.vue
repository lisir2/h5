<!-- 组件说明 -->
<template>
    <div class='content'>
        <van-nav-bar
            title="客服中心"
            left-arrow
            @click-left="onClickLeft"
            />
        <div class="bannerImg">
            <img src="../assets/images/serviceCenter/pic_txt_02.png" alt="">
        </div>
        <p class="title"><span></span>联系方式</p>
        <div class="text">
            <p>保险经纪网依托线下十年运营模式已形成一套完整的风险查勘、风险评估、风险防范、委托投保、协助理赔、日常咨询、安全培训等全程一站式服务体系。</p>
            <p>其服务内容包括：为投保人拟订投保方案，选择保险人，办理投保手续；协助被保险人或受益人进行索赔；为委托人提供防灾、防损或风险评估、风险管理咨询服务。推行快速响应机制，确保在第一时间解决客户后顾之忧。</p>
            <p>凭借自身专业“保险知识、诚信服务、创新理念、理赔服务”为客户保驾护航，让您对保险方案满意、解决问题满意、理赔服务满意</p>
        </div>
        <div class="issue">
            <p>如您需要关于保险各方面的帮助</p>
            <p>请拔打我们7 *24小时服务电话:</p>
        </div>
        <div class="tel">
            <a href="tel://4006938080">(资讯)400-693-8080</a>
            <a href="tel://057188310700">(理赔)0571-88310700</a>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'serviceCenter',
        components: {

        },
        data () {
            return {

            };
        },
        computed: {

        },
        methods: {
            onClickLeft(){
                window.history.back(-1);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .content{
        position: absolute;
        .bannerImg{
            width: 100%;
        }
        .title{
            padding:0 25px;
            margin: 30px 0;
            font-size: 30px;
            font-weight: 600;
            span{
                display: inline-block;
                width: 8px;
                height: 35px;
                background-color: #007aff;
                margin-right: 15px;
                vertical-align: middle;
                margin-top: -5px;
                border-radius:3px;
            }
        }
        .text{
            padding: 0 20px;
            p{
                text-indent: 2em;
                line-height: 43px;
                margin-top: 15px;
            }
        }
        .issue{
            p{
                text-align: center;
                margin-top: 20px;
            }
        }
        .tel{
            padding-top: 30px;
            a{
                display: block;
                text-align: center;
                margin-top: 15px;
                color: #007aff;
            }
        }
        
    }
</style>