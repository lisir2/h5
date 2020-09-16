<!-- 组件说明 我的评价-->
<template>
    <div class='myEvaluation'>
        <van-nav-bar title="详情" left-arrow @click-left="onClickLeft">
           <!-- <van-icon name="share" slot="right" /> -->
        </van-nav-bar>
        <div class="mainBox">
            <p class="productName">复星联合康乐一生重大疾病保险（B款升级款）</p>
            <p class="star">{{starStatus}}</p>
            <van-rate v-model="value" color="#F99A31"/>
            <p class="mainText">
                本产品是否满足您的需求？保险经纪网的服务您是否满意？您有什么需要我们帮助的？
            </p>
            <van-cell-group>
                <van-field
                    v-model="message"
                    type="textarea"
                    placeholder="请填写您的建议"
                    rows="3"
                    autosize
                />
            </van-cell-group>
            <button>提交</button>
            <!-- <div class="statusList">
                   <van-rate v-model="status1" color="#F99A31" :count="status1"/><span class="statusA">较差</span>
                   <van-rate v-model="status2" color="#F99A31" :count="status2"/><span class="statusA">一般</span>
                   <van-rate v-model="status3" color="#F99A31" :count="status3"/><span class="statusA">还好</span>
                   <van-rate v-model="status4" color="#F99A31" :count="status4"/><span class="statusA">满意</span>
            </div> -->
        </div>
        
       
    </div>
</template>

<script>
    export default {
        components: {

        },
        data () {
            return {
               value: 5,
               status1:1,
               status2:2,
               status3:3,
               status4:4,
               message:"",
               starStatus:"非常满意"
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

<style lang='scss'>
    .myEvaluation{
        .mainBox{
            margin: 31px;
            text-align: center;
            margin-top: 0;
            .productName{
                font-size: 32px;
                color: #333;
                font-weight: bold;
                height: 100px;
                line-height: 100px;
                text-align: left;
            }
            .star{
                text-align: center;
                margin-top: 66px;
                color: #333;
                font-size: 32px;
                font-weight: bold;
            }
            .van-rate__icon{
                font-size: 48px;
            }
            .van-rate{
                text-align: center;
                margin-top: 20px;
            }
            .van-rate__item{
                padding-right: 24px;
            }
            .van-cell-group{
                margin-top: 24px;
            }
            .mainText{
                margin-top: 60px;
                color: #8F8A8A;
                font-size: 26px;
                font-weight: 500;
                line-height: 40px;
                text-align: left;
            }
            button{
                width: 618px;
                height: 88px;
                border-radius: 50px;
                background: #F99A31;
                color: #fff;
                text-align: center;
                margin-top: 106px;
            }
            // .statusList{
            //     margin-top: 50px;
            //     text-align: left;
            //     margin-left: 100px;
            //     .van-rate{
            //         text-align: left;
            //         margin-top: 10px;
            //         display: inline-block;
            //         width: 56%;
            //     }
            //     .statusA{
            //         display: inline-block;
            //         vertical-align: super;
            //         color: #333;
            //         font-size: 28px;
            //     }
            // }
        }
            
    }
</style>