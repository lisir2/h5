<!-- 组件说明 提现信息 -->
<template>
    <div class='withdrawDepositResule'>
        <van-nav-bar title="提现结果" left-arrow @click-left="onClickLeft" right-text="完成" @click-right="onClickRight"></van-nav-bar>
        <span class="box"></span>
        <div class="iconSuccess">
            <img :src="iconSuccess" alt="支付成功" />
            <span>提现申请已提交</span>
        </div>
        <ul>
            <li>提现金额</li>
            <li>{{WithdrawalResults.withdrawalAmount}}</li>
        </ul>
        <ul>
            <li>提现申请时间</li>
            <li>{{WithdrawalResults.applyTime}}</li>
        </ul>
        <ul>
            <li>银行账户</li>
            <li v-if="WithdrawalResults.acountNo">{{WithdrawalResults.acountBank + "(尾号" + WithdrawalResults.acountNo.substr(WithdrawalResults.acountNo.length - 4,4) + ")"}}</li>
        </ul>
        <ul>
            <li>打款日</li>
            <li>{{WithdrawalResults.paymentDate}}</li>
        </ul>
        <!-- <ul>
            <li>开户行支行</li>
            <li>{{wxCashInfo.acount_branch}}</li>
        </ul> -->
        <!-- <ul>
            <li>支行名称</li>
            <li>{{wxCashInfo.acount_branch}}</li>
        </ul> -->
        <button class="billingDetails"><router-link :to="{path:'billingDetails',query:{active:1}}">查看提现记录</router-link></button>
        <div class="warmPrompt">
            <p>温馨提示：</p>
            <p>每月20日（含）前提交的提现申请,当月25日进行打款,每月21号之后提交的提现申请,次月25日进行打款,如有节假日顺延。</p>
        </div>
    </div>
</template>

<script>
    import api from "@/fetch/api";
    export default {
        name:"withdrawDepositResule",
        components: {
            
        },
        data () {
            return {
                WithdrawalResults:'', //提现结果
                iconSuccess:require("@/assets/images/paymentSuccess/icon-success.png")
            };
        },
        computed: {

        },
        mounted(){
            // 获取用户个人资料
            var args = this.sign({"cashNo": this.getQueryString('cashNo')});
            api.selectWithdrawalResults(args).then(res=>{
                if(res.code == 20000){
                    this.WithdrawalResults = res.data;
                }
            })
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            onClickRight(){
                this.$router.push('mine');
            }
        },
    }
</script>

<style lang="scss" scoped>
    .withdrawDepositResule{
        background-color:#F7F7F7;
        .iconSuccess{
            background-color: white;
            padding: 50px 0;
            img{
                width: 120px;
                display: block;
                margin: auto;
            }
            span{
                display: block;
                text-align: center;
                font-size: 32px;
                margin-top: 20px;
            }
        }
        .box{
            display: block;
            background-color: #F7F7F7;
            height: 20px;
            border-top: solid 1px #E8E6E6;
        }
        &>ul:nth-of-type(1){
            border-top: solid 1px #E8E6E6;
        }
        ul{
            background-color: white;
            padding: 0 30px;
            height: 100px;
            border-bottom: solid 1px #E8E6E6;
            li:nth-of-type(1){
                line-height: 98px;
                float: left;
            }
            li:nth-of-type(2){
                line-height: 98px;
                float: right;
            }
        }
        .billingDetails{
            background-color: white;
            background-color: #F99A31;
            width: 80%;
            margin: auto;
            height: 90px;
            display: block;
            margin:100px auto 0;
            border-radius: 50px;
            a{
                color: white;
                font-size: 32px;
            }
        }
        .warmPrompt{
            padding: 80px 30px;
            &>p:nth-of-type(2){
                color: #8F8A8A;
                line-height: 32px;
            }
        }
    }
</style>