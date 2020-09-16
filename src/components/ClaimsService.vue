<!-- 理赔服务 -->
<template>
    <div class='content'>
        <van-nav-bar
            title="理赔服务" 
            left-arrow
            @click-left="onClickLeft"
            />
        <div class="bannerImg">
            <img src="../assets/images/ClaimsService/cliam_banner_01.png" alt="">
        </div>
        <van-button plain type="info" size="normal" class="button" @click="claimSettlement">我要索赔</van-button>
        <p class="title"><span></span>理赔流程</p>
        <div class="flow">
            <img src="../assets/images/ClaimsService/cliam_pic_01.png" alt="">
            <ul>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_pic_02.png" alt="">
                    <p>在线报案</p>
                </li>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_pic_03.png" alt="">
                    <p>提交资料</p>
                </li>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_pic_04.png" alt="">
                    <p>帮助索赔</p>
                </li>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_pic_05.png" alt="">
                    <p>领取赔款</p>
                </li>
            </ul>
        </div>
        <p class="title"><span></span>保险公司报案电话</p>
        <div class="images">
            <div>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_bx_01.png" alt="">
                    <a href="tel:95511">95511</a>
                </li>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_bx_02.png" alt="">
                    <a href="tel:400-9999595">95500</a>
                </li>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_bx_03.png" alt="">
                    <a href="tel:95510">95510</a>
                </li>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_bx_04.png" alt="">
                    <a href="tel:95518">95518</a>
                </li>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_bx_05.png" alt="">
                    <a href="tel:400-8002020">400-8002020</a>
                </li>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_bx_06.png" alt="">
                    <a href="tel:400-0095522">400-0095522</a>
                </li>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_bx_07.png" alt="">
                    <a href="tel:400-8600600">400-8600600</a>
                </li>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_bx_08.png" alt="">
                    <a href="tel:95303">95303</a>
                </li>
                <li>
                    <img src="../assets/images/ClaimsService/cliam_bx_09.png" alt="">
                    <a href="tel:95500">400-9999595</a>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        name:'ClaimsService',
        components: {

        },
        data () {
            return {

            };
        },
        mounted(){
            // 滚动条置顶
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        },
        computed: {

        },
        methods: {
            onClickLeft(){
                window.history.back(-1);
            },
            claimSettlement(){
                Toast('正在开发中');
            }
        },
    }
</script>

<style lang="scss" scoped>
    .content{
        position: absolute;
        .bannerImg{
            width: 100%;
        }
        .button{
            display: block;
            margin:30px auto 10px;
            border-radius: 5px;
        }
        .title{
            padding:0 25px;
            span{
                display: inline-block;
                width: 5px;
                height: 25px;
                background-color: #007aff;
                margin-right: 15px;
                vertical-align: middle;
                margin-top: -3px;
                border-radius:3px;
            }
        }
        .images{
            padding: 0 25px;
            div{
                text-align: center;
                img{
                    width: 80%;
                    margin-top: 10px;
                }
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                margin-top: 20px;
                li{
                    position: relative;
                    width: 30%;
                    height: 1.7rem;
                    border: 2px solid #ccc;
                    margin-bottom: 20px;
                    a{
                        width: 100%;
                        display: inline-block!important;
                        text-align: center!important;
                        border-top: solid 1px #ccc;
                        color: #40afff;
                        font-size: 25px!important;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        line-height: 40px;
                    }
                }
            }
        }
        .flow{
            margin-bottom: 40px;
            &>img{
                margin: 30px 0;
            }
            ul{
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                li{
                    width: 23%;
                    text-align: center;
                    img{
                        width: 80px;
                        height: 80px;
                    }
                    p{
                        margin-top: 15px;
                        font-size: 25px!important;
                    }
                    
                }
            }
        }
    }
</style>