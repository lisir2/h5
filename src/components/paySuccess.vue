<!-- 组件说明 -->
<template>
    <div class='paySuccess'>
        <van-nav-bar title="支付成功" left-arrow @click-left="onClickLeft">
           <!-- <van-icon name="share" slot="right" /> -->
        </van-nav-bar>
        <div class="Part1">
            <van-Image width="58" height="58" :src="successicon" />
            <span class="part_span">提交成功!</span>
        </div>
        <!-- <p class="paytext1">订单号：<span>5446853256456</span></p> -->
        <p class="paytext2">恭喜您成功投保</p>
        <p class="paytext3">
            恭喜您成功投保，稍后您的手机将会收到保单信息，电子保单将会发送到您的投保邮箱中，请注意查收。若您没收到电子保单，
            <span>可以联系客服 400-693-8080</span> 
            或在-
            <span>我的保单</span>
            里查看。
        </p>
        <router-link to="/mine">
            <input type="button" class="lookmore" value="查看保单">
        </router-link>
        <p class="paytext4"><span>{{time}}</span>秒后自动跳转到我的页面</p>
        <div class="Part2">
             <van-Image width="163" height="163" :src="bxjjw" />
             <div>
                <p>关注微信公众号可随时查看保单提供理赔服务</p>
                <input type="text" value="一键保存" readonly>
             </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {

        },
        data () {
            return {
                successicon:require('../assets/images/others/successful.png'),
                showmore:require('../assets/images/others/showmore.png'),
                bxjjw:require('../assets/images/others/bxjjw.png'),
                time:10, //倒计时
                timeInterval:'',
            };
        },
        computed: {

        },
        mounted(){
            /**
             * 中科软可回溯
             */
            var infor = {};
            infor.start=2;
            initEasyReplay(infor);
            console.log('支付成功页面调用initEasyReplay()方法;');

            var that = this;
            that.timeInterval = setInterval(() => {
                that.time --;
                if(that.time == 0){
                    clearInterval(that.timeInterval);
                    that.$router.push('/mine');
                }
            }, 1000);
        },
        // 销毁前清楚计时器
        beforeDestroy(){
            clearInterval(this.timeInterval);
            /**
             * 中科软可回溯 结束录制
             */
            ending();
            console.log('ending() 结束录制');
        },
        methods: {
            onClickLeft() {
               this.$router.go(-1);
            }
        },
    }
</script>
<style lang='scss'>
        .paySuccess{
            text-align: center;
            background: #fff;
            .Part1{
                margin:55px 215px;
                overflow: hidden;
                .van-image{
                    float: left;
                }
                .part_span{
                    margin-left: 47px;
                    vertical-align: top;
                    margin-top: 40px;
                    display: inline-block;
                    font-size: 32px;
                    color: #333;
                    font-weight: bold;
                    float: left;
                }
            }
            .paytext1{
                font-size: 26px;
                color: #333;
                font-weight: 500;
            }
            .paytext2{
                font-size: 30px;
                margin-top: 30px;
                color: #333;
                font-weight: 500;
            }
            .paytext3{
                width: 631px;
                margin: 40px auto;
                color: #8f8f8f;
                font-size: 24px;
                text-align: left;
                line-height: 36px;
                span{
                    color: red
                }
            }
            .paytext4{
                margin-top: 30px;
                color: #8F8A8A;
                font-size: 24px;
            }
            .lookmore{
                background: #F99A31;
                text-align: center;
                width: 618px;
                height: 88px;
                color: #fff;
                border-radius: 50px;
                margin-top: 53px;
            }
            .Part2{
                margin: 20px 30px;
                display: flow-root;
                van-image{
                    float: left;
                }
                div{
                    float: left;
                }
                p{
                    margin-top: 60px;
                    margin-left: 15px;
                    font-size: 28px;
                    color: #333;
                    width: 287px;
                }
                input{
                    color: #008CFF;
                    font-size: 26px;
                    border:2px dashed #008CFF;
                    text-align: center;
                    margin-top: 80px;
                    width: 200px;
                    height: 60px;
                    border-radius: 6px;
                    margin-left: 50px;
                }
            }
        }
</style>