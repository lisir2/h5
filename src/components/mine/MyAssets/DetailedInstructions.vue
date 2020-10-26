<!-- 组件说明 明细说明-->
<template>
    <div class='instructions'>
        <van-nav-bar title="明细说明" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div class="title" style="margin-top:0;">
            <p>一、收入明细说明</p>
        </div>
        <div class="textContent">
            <p class="weight">待结算收入</p>
            <p>指推广的订单支付成功后获得的推广佣金收入。</p>
            <p>如果有退保等相关费用退出，将扣除对应的推广佣金收入。</p>
        </div>
        <div class="textContent">       
            <p class="weight">已结算收入</p>
            <p>是指推广佣金收入过了结算日期的收入。</p>
            <p>结算日期以保险公司的经纪费结算日为准，</p>
            <p>举例:</p>
            <p>代理人小张推荐小王在2018年11月13日购买了一份平安保险的保险A产品，A产品保单生效日期为2018年11月14日，平安保险公司与保险经纪网的经纪费结算日为次月15日，代理人小张在2018年12月15日可获得该笔推广佣金。</p>
            <p>如果以上有退保、减员等操作，将扣除相应的收入。</p>
            <p class="weight">累计收入。</p>
            <p>指已结算收入的汇总</p>
            <p>可提现金额</p>
            <p>可提现金额指已结算后的收入，可以提现。</p>
        </div>
        <div class="title">
            <p>二、提现明细说明</p>
        </div>
        <div class="textContent">
            <p class="weight">提现前完善信息</p>
            <p>提现前需完善提现银行卡账户信息，建议填写本人的农行银行卡信息。
请真实填写本人银行卡信息，以免无法收到推广佣金。</p>
            <p class="weight">提现到账时间</p>
            <p>每月10日之前提交的提现金额，于隔月25日前到账。</p>
            <p class="weight">提现记录状态</p>
            <p>已成功，说明保险经纪网已向银行安排付款，银行正在处理，请耐心等待。</p>
            <p>已失败，申请记录会有失败原因告知，点击查看即可。</p>
            <p>处理中，提现申请已提交，工作人员正在处理中，请耐心等待。</p>
        </div>
        <div class="title">
            <p>三、扣税说明</p>
        </div>
        <div class="textContent">
            <p>等待财务给到扣税详细文档。</p>
        </div>
    </div>
</template>

<script>
    export default {
        name:'DetailedInstructions',
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
                this.$router.go(-1);   
            },
        },
    }
</script>

<style lang="scss" scoped>
.instructions{
    .title{
        line-height: 100px;
        background:rgba(247,247,247,1);
        padding: 0 30px;
        margin: 30px 0;
    }
    .textContent{
        padding: 0 30px;
        p{
            line-height: 45px;
        }
        .weight{
            font-weight: 700;
            margin-top: 25px;
        }
    }
}
</style>