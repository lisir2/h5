<!-- 组件说明 提现信息 -->
<template>
    <div class='WithdrawalInformation'>
        <van-nav-bar title="提现信息" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <span class="box"></span>
        <ul>
            <li>收款人姓名</li>
            <li>{{userInfo.name}}</li>
        </ul>
        <ul>
            <li>身份证号</li>
            <li>{{userInfo.realCertificationNo}}</li>
        </ul>
        <span class="box"></span>
        <ul>
            <li>开户行</li>
            <li>{{wxCashInfo.acountBank}}</li>
        </ul>
        <ul>
            <li>银行卡号</li>
            <li>{{wxCashInfo.acountNo}}</li>
        </ul>
        <!-- <ul>
            <li>开户行支行</li>
            <li>{{wxCashInfo.acount_branch}}</li>
        </ul> -->
        <ul>
            <li>支行名称</li>
            <li>{{wxCashInfo.acountBranch}}</li>
        </ul>
    </div>
</template>

<script>
    import api from "../fetch/api";
    export default {
        components: {

        },
        data () {
            return {
                userInfo:'', //用户个人信息
                agentInfo:'',
                wxCashInfo:'',
            };
        },
        computed: {

        },
        mounted(){
            // 获取用户个人资料
            var args = this.sign({userId:this.getCookie('ZB_JUSER_Mid')});
            // this.$axios.post('/arg/openapi/h5/personalCenter/queryPersonalInfo',args).then(res=>{
            api.queryPersonalInfo(args).then(res=>{
                if(res.code == 20000){
                    this.userInfo = res.data;
                    this.agentInfo = res.data.agentInfo;
                    this.wxCashInfo = res.data.wxCashInfo;
                }
            })
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .WithdrawalInformation{
        .box{
            display: block;
            background-color: #F7F7F7;
            height: 20px;
            border-top: solid 1px #E8E6E6;
        }
        ul{
            padding: 0 30px;
            height: 100px;
            border-bottom: solid 1px #E8E6E6;
            li:nth-of-type(1){
                line-height: 100px;
                float: left;
            }
            li:nth-of-type(2){
                line-height: 100px;
                float: right;
            }
        }
    }
</style>