<!-- 组件说明 -->
<template>
    <div class='weiXiuGuaranteeSlip'>
        <van-nav-bar title="批改批增详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div>
            <ul v-for="item in EndorseNoDetail" :key="item.id" class="list">
                 <li>
                    <span>批单号</span>
                    <span>{{item.endorseNo}}</span>
                </li>
                <li>
                    <span>批单生效日期</span>
                    <span>{{item.effectiveDate}}</span>
                </li>
                <li>
                    <span>批单终止日期</span>
                    <span>{{item.effectiveEndDate}}</span>
                </li>
                <li>
                    <span>批改类型</span>
                    <span>{{item.markingDetails}}</span>
                </li>
                <li>
                    <span>批改明细</span>
                    <span>{{item.markingDetails}}</span>
                </li>
                <li>
                    <span>复核保费</span>
                    <span>{{item.actualPremiumChange / 100}}</span>
                </li>
                <li>
                    <span>原被保险人</span>
                    <span>{{item.oldFullName}}</span>
                </li>
                <li>
                    <span>证件类型</span>
                    <span>{{item.oldCertificateType}}</span>
                </li>
                <li>
                    <span>证件号码</span>
                    <span>{{item.oldCertificateNo}}</span>
                </li>
                <li>
                    <span>出生日期</span>
                    <span>{{item.oldBirth}}</span>
                </li>
                 <li>
                    <span>性别</span>
                    <span>{{item.oldSex}}</span>
                </li>
                 <li>
                    <span>手机号码</span>
                    <span>{{item.oldPhone}}</span>
                </li>
                <li>
                    <span>批改后被保险人</span>
                    <span>{{item.newFullName}}</span>
                </li>
                <li>
                    <span>证件类型</span>
                    <span>{{item.newCertificateType}}</span>
                </li>
                <li>
                    <span>证件号码</span>
                    <span>{{item.newCertificateNo}}</span>
                </li>
                <li>
                    <span>出生日期</span>
                    <span>{{item.newBirth}}</span>
                </li>
                <li>
                    <span>性别</span>
                    <span>{{item.newSex}}</span>
                </li>
                <li>
                    <span>手机号码</span>
                    <span>{{item.newPhone}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import api from "../fetch/api";
    export default {
        name:'weiXiuGuaranteeSlip',
        components: {

        },
        data () {
            return {
                endorseNo:'', //批单号
                EndorseNoDetail:'',
            };
        },
        computed: {

        },
        mounted(){
            this.endorseNo = this.$route.query.endorseNo;
            console.log(this.endorseNo)
            var args = this.sign({endorseNo:this.endorseNo})
            api.weiXiuEndorseNoDetail(args).then(res=>{
                if(res.code == 20000){
                    this.EndorseNoDetail = res.data
                }else{
                    this.Toast(res.message)
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
    .weiXiuGuaranteeSlip{
        .list{
            padding: 30px;
            box-sizing: border-box;
            li{
                width: 100%;
                height: 80px;
                span:nth-of-type(1){
                    display: inline-block;
                    width: 240px;
                }
            }
        }
    }
</style>