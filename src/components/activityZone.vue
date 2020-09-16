<!-- 组件说明 活动专区-->
<template>
    <div class='activityZone'>
        <van-nav-bar title="活动专区" left-arrow @click-left="onClickLeft">
           <!-- <van-icon name="share" slot="right" /> -->
        </van-nav-bar>
        <div class="activityBox" v-show="showActivity">
            <p class="firstBox">
                <span>{{data.product_name}}</span>
                <input type="button" :value="data.lottery_status == 1 ? '未开奖' : (data.lottery_status == 2 ? '未中奖' : (data.lottery_status == 3 ? '已中奖' : ''))">
            </p>
            <ul>
                <li>
                    <span>被保险人: </span>
                    <span>{{data.insured_person_name}}</span>
                </li>
                <li> 
                    <span>订单号: </span>
                    <span>{{data.o_number}}</span>
                </li>
                <li>
                    <span>生效时间: </span>
                    <span>{{data.insurance_begin_time}}</span>
                </li>
                <li>
                    <span>截止时间: </span>
                    <span>{{data.insurance_end_time}}</span>
                </li>
                <li>
                    <span>抽奖号码:</span>
                    <span>{{data.draw_number}}</span>
                </li>
            </ul>
        </div>
        <div v-show="noActivity" style="text-align:center;padding:20px 0;">暂无活动</div>
    </div>
</template>

<script>
    import api from '../fetch/api';
    export default {
        components: {

        },
        data () {
            return {
                data:'', //活动详细数据
                showActivity:false,  //活动内容是否展示
                noActivity:false, //没有活动模块展示
            };
        },
        computed: {

        },
        mounted(){
            var that = this;
            var params = {
                source:"",
                mId:this.getCookie('ZB_JUSER_Mid'),
                openId:this.getCookie('wxopenId'),
            }
            if(this.is_weixn()){
                params.source='WX';
            }else{
                params.source='PC';
            }
            var args=this.sign(params);
            // this.$axios.post('/brg/openapi/h5/activity/queryZHenAiBaoActivityOrder',args).then(res=>{
            api.queryZHenAiBaoActivityOrder(args).then(res=>{
                if(res.code == 20000){
                    if(res.data.length == 0){
                        this.showActivity = false;
                        this.noActivity = true;
                    }else{
                        this.showActivity = true;
                        that.data = res.data[0];
                    }
                    
                }else{
                    this.Toast(res.message)
                }
            })
        },
        methods: {
            onClickLeft() {
               this.$router.go(-1);
            }
        },
    }
</script>

<style lang='scss'>
    .activityZone{
        .activityBox{
            .firstBox{
                margin: 32px;
                display: flow-root;
                span{
                    font-weight: bold;
                    color: #333333;
                    font-size: 32px;
                    display: inline-block;
                    width: 516px;
                    height: 80px;
                    line-height: 40px;
                }
                input{
                    width: 120px;
                    height: 50px;
                    background: #F99A31;
                    color: #fff;
                    border-radius: 50px;
                    margin-left: 50px;
                    font-size: 24px;
                    float: right;
                    margin-top: 10px
                }
            }
            ul{
                border-top: 1px solid #eee;
                li{
                    height: 80px;
                    line-height: 80px;
                    color: #333333;
                    font-size: 28px;
                    margin: 0 32px;
                }
            }
        }
    }
</style>