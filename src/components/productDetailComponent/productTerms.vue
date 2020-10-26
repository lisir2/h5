<!-- 组件说明 产品条款-->
<template>
    <div class='productTerms'>
        <van-nav-bar title="产品条款" left-arrow @click-left="onClickLeft">
           <!-- <van-icon name="share" slot="right" /> -->
        </van-nav-bar>
        <div class="mainContent">
            <p class="productName">{{productName}}</p>
            <div class="termlist">
                <span>产品条款</span>
                <ul>
                    <p v-if="this.mainList == ''" style="margin:15px 30px;">暂无条款</p>
                    <div v-for="item in mainList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <!-- <van-cell :title="item.termFileNo"/> -->
                    </div>
                    <!-- <van-cell title="除外责任" is-link /> -->
                </ul>
                <!-- <ul v-if="additionalList">
                    <span>产品费率表</span>
                    <p v-if="this.additionalList == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in additionalList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>

                 <ul v-if="moneyList">
                    <span>现金价值表</span>
                    <p v-if="this.moneyList == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in moneyList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>

                 <ul v-if="insuranceList">
                    <span>投保须知</span>
                    <p v-if="this.insuranceList == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in insuranceList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>

                 <ul v-if="CustomerList">
                    <span>客户告知书</span>
                    <p v-if="this.CustomerList == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in CustomerList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>

                 <ul v-if="deductionMoneyList">
                    <span>扣款知情同意书</span>
                    <p v-if="this.deductionMoneyList == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in deductionMoneyList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>

                 <ul v-if="lifeInsurance">
                    <span>人生保险投保提示书</span>
                    <p v-if="this.lifeInsurance == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in lifeInsurance" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>

                 <ul v-if="liabilityList">
                    <span>责任免除</span>
                    <p v-if="this.liabilityList == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in liabilityList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>

                 <ul v-if="agreementList">
                    <span>合作协议</span>
                    <p v-if="this.agreementList == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in agreementList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>

                 <ul v-if="serviceList">
                    <span>服务手册</span>
                    <p v-if="this.serviceList == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in serviceList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>

                <ul v-if="truthList">
                    <span>如实告知</span>
                    <p v-if="this.truthList == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in truthList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>
                <ul v-if="declarationList">
                    <span>投保声明</span>
                    <p v-if="this.declarationList == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in declarationList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>
                <ul v-if="compensationList">
                    <span>如何获赔</span>
                    <p v-if="this.compensationList == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in compensationList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>

                 <ul v-if="statementList">
                    <span>隐私声明</span>
                    <p v-if="this.additionalList == ''" style="margin-left:30px;">暂无条款</p>
                    <div v-for="item in additionalList" :key="item.id">
                        <van-cell :title="item.termName" is-link @click="$showPDF(link+item.termFilePath)"/>
                        <van-cell :title="item.termFileNo"/>
                    </div>
                </ul>  -->
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/fetch/api';
    import $ from 'jquery';
    export default {
        components: {

        },
        data () {
            return {
               //term_type 类型字段说明：1主险条款，2产品费率表，3现金价值表，4投保须知，5客户告知书,
               //6扣款知情同意书，7人生保险投保提示书，8责任免除，9合作协议，10服务手册，11如实告知，12投保声明，13如何获赔，14隐私声明
               mainList:"",//产品条款
               additionalList:"",//2产品费率表
               moneyList:"",//3现金价值表  
               insuranceList:"",//4投保须知 
               CustomerList:"",//5客户告知书 
               deductionMoneyList:"",//6扣款知情同意书
               lifeInsurance:"",//7人生保险投保提示书
               liabilityList:"",//8责任免除
               agreementList:"",//9合作协议
               serviceList:"",//10服务手册
               truthList:"",//11如实告知
               declarationList:"",//12投保声明
               compensationList:"",//13如何获赔
               statementList:"",//14隐私声明
               productName:this.$route.query.productName,
               Termslist:"",
               link: this.$store.state.JumpPath, //页面跳转路径
            };
        },
        mounted(){
            var planId=this.$route.query.planId;
            var args=this.sign({planId:planId});
            api.getTerms(args).then(res => {
                var mainList=[];
                var additionalList=[];
                var insuranceList=[];
                var CustomerList=[];
                var deductionMoneyList=[];
                var lifeInsurance=[];
                var liabilityList=[];
                var agreementList=[];
                var serviceList=[];
                var truthList=[];
                var declarationList=[];
                var compensationList=[];
                var statementList=[];
                $.each(res.data,function(index,ele){
                    if(ele.termType=="3"){
                        mainList.push(ele)
                    }
                    if(ele.termType=="2"){
                        additionalList.push(ele)
                    }
                    if(ele.termType=="4"){
                        insuranceList.push(ele)
                    }
                    if(ele.termType=="5"){
                        CustomerList.push(ele)
                    }
                    if(ele.termType=="6"){
                        deductionMoneyList.push(ele)
                    }
                    if(ele.termType=="7"){
                        lifeInsurance.push(ele)
                    }
                    if(ele.termType=="8"){
                        liabilityList.push(ele)
                    }
                    if(ele.termType=="9"){
                        agreementList.push(ele)
                    }
                    if(ele.termType=="10"){
                        serviceList.push(ele)
                    }
                    if(ele.termType=="11"){
                        truthList.push(ele)
                    }
                    if(ele.termType=="12"){
                        declarationList.push(ele)
                    }
                    if(ele.termType=="13"){
                        compensationList.push(ele)
                    }
                    if(ele.termType=="14"){
                        statementList.push(ele)
                    }
                })
                if(additionalList.length>0){
                     this.additionalList=additionalList;
                }
                if(insuranceList.length>0){
                     this.insuranceList=insuranceList;
                }
                if(CustomerList.length>0){
                     this.CustomerList=CustomerList;
                }
                if(deductionMoneyList.length>0){
                     this.deductionMoneyList=deductionMoneyList;
                }
                if(lifeInsurance.length>0){
                     this.lifeInsurance=lifeInsurance;
                }
                if(liabilityList.length>0){
                     this.liabilityList=liabilityList;
                }
                 if(agreementList.length>0){
                     this.agreementList=agreementList;
                }
                 if(serviceList.length>0){
                     this.serviceList=serviceList;
                }
                 if(truthList.length>0){
                     this.truthList=truthList;
                }
                 if(declarationList.length>0){
                     this.declarationList=declarationList;
                }
                 if(compensationList.length>0){
                     this.compensationList=compensationList;
                }
                 if(statementList.length>0){
                     this.statementList=statementList;
                }
                
                this.mainList=mainList;
            })
           
        },
        methods: {
            onClickLeft() {
               this.$router.go(-1);
            },
        }
    }
</script>

<style lang='scss'>
    body{
        background: #fff;
    }
    .productTerms{
        .mainContent{
            background: #fff;
            &>.productName{
                padding:0 31px;
               font-size: 32px;
               color: #333;
               font-weight: 600;
               background-color: #F7F7F7;
               height: 150px;
               line-height: 150px;
            }
            .van-cell{
               padding: 30px 0;
            }
            .termlist{
                &>span{
                    display: block;
                    font-size: 30px;
                    font-weight: 600;
                    height: 100px;
                    line-height: 100px;
                    padding: 0 30px;
                    border-top: #EEEEEE solid 1px;
                    border-bottom: #EEEEEE solid 1px;
                }
                &>ul:nth-of-type(n+2){
                    border-top: #F7F7F7 20px solid;
                }
               ul{
                //    padding:0 31px;
                   &>div{
                       padding:0 31px;
                       border-bottom: solid 2px #EEEEEE;
                   }
                   &>span{
                       font-size: 30px;
                       font-weight: 600;
                       display: block;
                       height: 80px;
                       line-height: 80px;
                       margin-top: 20px;
                   }
               }
            }
        }
    }
</style>