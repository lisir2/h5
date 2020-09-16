<!-- 组件说明 保单管理-->
<template>
    <div class='myAssets'>
        <van-nav-bar title="我的资产" left-arrow @click-left="onClickLeft" right-text="明细" @click-right="onClickRight"></van-nav-bar>
        <div v-if="userInfo!=''">
            <div class="headBox" :style="headNote">
                 <p class="countMoney">{{userInfo.commissionTotal.availablePresent.toFixed(2)}}</p>
                 <p class="yueText">余额(元)</p>
            </div>
            <ul class="countMain">
                <li style="border-right:1px solid #eee;">
                    <p>{{userInfo.commissionTotal.frozenAmount.toFixed(2)}}</p>
                    <p>待生效(元)</p>
                </li>
                <li>
                    <p>{{userInfo.commissionTotal.grossIncome.toFixed(2)}}</p>
                    <p>累计收入(元)</p>
                </li>
            </ul>
            <input type="button" value="提现" class="cashBtn" @click="clickCashOut">
        </div>
    </div>
</template>

<script>
    import api from '@/fetch/api'
    import md5 from 'js-md5';
    export default {
        components: {

        },
        data () {
            return {
                headNote:{
                    backgroundImage:"url(" + require("../assets/images/others/assetsBanner.png") + ")",
                },
                userInfo:'',
            };
        },
        mounted(){
            var that = this;
            var args = this.sign({userId:this.getCookie('ZB_JUSER_Mid')});
            api.queryPersonalInfo(args).then(res=>{
                if(res.code == 20000){
                    that.userInfo = res.data;
                }else{
                    this.Toast(res.message);
                }
            })
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1);   
            },
            onClickRight(){
                this.$router.push('/billingDetails');
            },
            clickCashOut(){
                if(!this.userInfo.wxCashInfo || !this.userInfo.wxCashInfo.acountBank || !this.userInfo.wxCashInfo.acountNo ){
                    this.$dialog({
                        title: "提示",
                        message: "申请提现需要绑定银行卡"
                    }).then(() => {
                        this.$router.push({
                            path: "bankInformation",
                            query: { route: "myAssets" }
                        });
                    });
                } else{
                    this.$router.push('/cashOut');
                }
            }
        },
    }
</script>

<style lang='scss'>
    .myAssets{
        .headBox{
            width: 100%;
            height: 300px;
            display: inline-block;
            background-size: 100%;
            p{
               text-align: center;
                color: #fff;
            }
            .countMoney{
                margin-top: 100px;
                font-size: 60px;
                height: 45px; 
                line-height: 45px;
            }
            .yueText{
                margin-top: 20px;
                font-size: 28px;
            }
        }
        .countMain{
            display: flex;
            // margin-top: 10px;
            li{
                flex: 1;
                text-align: center;
                color: #333;
                height: 90px;
                margin:23px 0;
                p:nth-child(1){
                    font-size: 43px;
                }
                p:nth-child(2){
                    font-size: 28px;
                }
            }
        }
        .cashBtn{
            width: 618px;
            height: 88px;
            border-radius: 50px;
            text-align: center;
            color: #fff;
            font-size: 32px;
            background: #F99A31;
            margin: 0 auto;
            margin-top: 360px;
            display: block;
        }
    }
</style>