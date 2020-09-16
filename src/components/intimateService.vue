<!-- 组件说明 -->
<template>
    <div class='detailService'>
        <van-nav-bar title="贴心服务" left-arrow @click-left="onClickLeft">
          
        </van-nav-bar>
        <ul v-for="item in prodIntimateServiceList" :key="item.id">
            <li>
                <div>
                    <img :src="baseImagePath+item.serviceIcon" alt="">
                    <span>{{item.serviceTitleName}}</span>
                </div>
                <span v-html="item.serviceDetailContent" class="span_text"></span>
            </li>
            <!-- <li>
                <img :src="service2" alt="">
                <span>投保成功后，系统自动发送电子保单到您的投保是填写的电子邮箱中。平台所有保单100%支持保险公司官网验真，100%真实有效。</span>
            </li>
            <li>
                <img :src="service3" alt="">
                <span>如果您对某些健康状况不确认，可在健康告知页面进行智能核保，通过回答疾病问卷，即可在线直接得出核保结论。</span>
            </li>
            <li>
                <img :src="service4" alt="">
                <span>如果您对某些健康状况不确认，可在健康告知页面进行智能核保，通过回答疾病问卷，即可在线直接得出核保结论。</span>
            </li>
            <li>
                <img :src="service5" alt="">
                <span>如果您对某些健康状况不确认，可在健康告知页面进行智能核保，通过回答疾病问卷，即可在线直接得出核保结论。</span>
            </li>
            <li>
                <img :src="service6" alt="">
                <span>如果您对某些健康状况不确认，可在健康告知页面进行智能核保，通过回答疾病问卷，即可在线直接得出核保结论。</span>
            </li> -->
        </ul>
    </div>
</template>

<script>
    import api from '../fetch/api';
    export default {
        name:"detailService",
        components: {

        },
        data () {
            return {
                service1:require('../assets/images/detail/server6.png'),
                service2:require('../assets/images/detail/server5.png'),
                service3:require('../assets/images/detail/server4.png'),
                service4:require('../assets/images/detail/server3.png'),
                service5:require('../assets/images/detail/server2.png'),
                service6:require('../assets/images/detail/server1.png'),
                prodIntimateServiceList:"",
                baseImagePath:this.$store.state.baseImagePath,
            };
        },
        mounted(){
            console.log(this.$route.query.goodId)
            var args=this.sign({"productId":this.$route.query.goodId,planId:""});
            api.getDetail(args).then(res => {
                console.log(res);
                this.prodIntimateServiceList=res.data.prodIntimateServiceList;
            
            })
        },
        methods: {
            onClickLeft(){
                 this.$router.go(-1);
            }
        },
    }
</script>

<style lang="scss">
    .detailService{
        ul{
            padding:20px 30px 0;
            li{
                padding: 30px 10px;
                background-color: #F7F7F7;
                border-radius: 10px;
                div{
                    float: left;
                    display:inline-grid;
                    text-align: center;
                    width: 200px;
                    img{
                        width: 90px;
                        height: 90px;
                        margin: auto;
                    }
                    span{
                        margin-top: 31px;
                    }
                }
                .span_text{
                    float: left;
                    display: inline-block;
                    margin-left: 40px;
                    width: 427px;
                    font-size: 26px;
                    line-height: 42px;
                }
            }
            li:after{
                height: 1px;
                width: 100%;
                display: block;
                content: '';
                clear: both;
                overflow: hidden;
            }
        }
    }
</style>