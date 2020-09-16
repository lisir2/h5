<!-- 组件说明 执业资质-->
<template>
    <div class=''>
        <van-nav-bar title="" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div class="bgcBlock"></div>
        <div class="head">
            <div class="headImg">
                <img src="../assets/images/banner1.png" alt="">
                <span>环晟</span>
                <!-- <span>已认证</span> -->
                <span style="background-color:white;color:rgb(255,133,29);">待审核</span>
            </div>
            <div class="userMessage">
                <p>身份证号: 330*************5418</p>
                <p>执业证编号：260911121121212120393</p>
            </div>
        </div>
        <div class="bgcBlock"></div>
        <!-- 协议 -->
        <div class="agreement">
            <div>协议</div>
            <div>
                <ul>
                    <li>
                        <img src="../assets/images/agent.png" alt="">
                        <p>代理人合同</p>
                    </li>
                    <li>
                        <img src="../assets/images/entrust.png" alt="">
                        <p>合规经营承诺书</p>
                    </li>
                    <li>
                        <img src="../assets/images/commitment.png" alt="">
                        <p>授权委托书</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    //import x from ''
    export default {
        name:'ProfessionalQualifications',
        components: {

        },
        data () {
            return {

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
    .bgcBlock{
        height:20px;
        background:rgba(247,247,247,1);
    }
    .head{
        .headImg{
            padding:20px 30px;
            border-bottom: solid 2px #E8E6E6;
            position: relative;
            img{
                width: 96px;
                height: 96px;
                border-radius: 50%;
            }
            span:nth-of-type(1){
                width:94px;
                height:31px;
                font-size:32px;
                font-family:PingFang SC;
                font-weight:800;
                color:rgba(12,12,12,1);
                line-height:23px;
                margin-left: 24px;
            }
            span:nth-of-type(2){
                width: 120px;
                height: 50px;
                background-color: rgb(255,133,29);
                border: solid 2px rgb(255,133,29);
                border-radius: 25px;
                color: white;
                display: inline-block;
                line-height: 50px;
                text-align: center;
                position: absolute;
                top: 0;
                bottom: 0;
                right: 30px;
                margin: auto;
              }
        }
        .userMessage{
            padding:20px 30px;
            p{
                font-size:26px;
                line-height: 50px;
                font-weight:500;
                color:rgba(12,12,12,1);
            }
        }
    }
    .agreement{
        div:nth-of-type(1){
            padding: 0 30px;
            line-height: 97px;
            font-size:30px;
            font-weight:800;
            color:rgba(12,12,12,1);
            border-bottom: solid 2px #E8E6E6;
        }
        div:nth-of-type(2){
            ul{
                display: flex;
                justify-content: space-around;
                li{
                    text-align: center;
                    padding: 40px 0;
                    img{
                        width: 68px;
                    }
                }
            }
            
        }
    }
</style>