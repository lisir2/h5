<!-- 组件说明 我们平台购买平安驾乘保险支付方式-->
<template>
    <div class='JiaChengPay'>
        <!-- 平安驾乘支付弹框 -->
        <van-action-sheet v-model="pay_Show" title="付款详情">
            <div class="amountPayable">
                <span>应付金额</span>
                <span>{{policyFee}}.00元</span>
            </div>
            <p class="paymentProcedure">支付方式</p>
            <van-radio-group v-model="paymentProcedure" class="paySelect">
                <van-cell-group>
                <van-cell clickable @click="paymentProcedure = 'weiXin'">
                    <img :src="weiXinIcon" class="plyIcon" alt=""><span>微信</span>
                    <template #right-icon>      
                    <van-radio name="weiXin" />
                    </template>
                </van-cell>
                <van-cell clickable @click="paymentProcedure = 'zhiFuBao'" v-if="!is_weixn()">
                    <img :src="zhiFuBaoIcon" class="plyIcon" alt=""><span>支付宝</span>
                    <template #right-icon>
                    <van-radio name="zhiFuBao" />
                    </template>
                </van-cell>
                </van-cell-group>
            </van-radio-group>
            <van-button type="primary" block style="margin-top:30px;" @click="JiaChengPolicyPay">立即支付</van-button>
        </van-action-sheet>
    </div>
</template>

<script>
    import api from "../../../fetch/api";
    export default {
        components: {

        },
        data () {
            return {
                weiXinIcon: require("../../../assets/images/weiXin.jpg"),
                zhiFuBaoIcon: require("../../../assets/images/zhiFuBao.jpg"),
                paymentProcedure:'weiXin', //支付方式默认微信
                pay_Show:false,
            };
        },
        props:['payShow','policyFee','goodName'],
        computed: {

        },
        watch:{
            payShow(val,oldval){
                this.pay_Show = val;
            },
            pay_Show(val,oldval){
                this.$emit('payShow',val)
            }
        },
        methods: {
            // 驾乘支付
            JiaChengPolicyPay(){
                if(this.paymentProcedure == 'zhiFuBao'){
                    var args = this.sign({
                        out_trade_no: this.getQueryString('orderNo'), //订单号
                        total_amount: this.policyFee,  //价格
                        subject: this.goodName //产品名称 
                    }); 

                    // 自己平台购买平安驾乘支付宝支付 
                    api.alipayJC(args).then(res=>{
                        // 返回字符串表单
                        if(typeof(res) == 'string'){
                            $('body').append(res);
                        }else{
                            this.Toast(res.message);
                        }
                    })
                }else if(this.paymentProcedure == 'weiXin'){
                    var args;
                    // 微信浏览器打开
                    if(this.is_weixn()){
                        args = this.sign({
                            out_trade_no: this.getQueryString('orderNo'), //订单号
                            total_amount: this.policyFee,  //价格
                            openId:this.getCookie('wxopenId'), //微信传入openid
                            // openId:'o5LeXwKWUVxzIGoMebulp8-BeuXA',
                        }); 
                    }else{
                        // 不是微信浏览器打开
                        args = this.sign({
                            out_trade_no: this.getQueryString('orderNo'), //订单号
                            total_amount: this.policyFee,  //价格
                        });
                    }

                    // 自己平台购买平安驾乘微信支付
                    api.wxOrderPayJC(args).then(res=>{
                        // this.$axios.post('/brg/openapi/pay/wxOrderPay',args).then(res=>{
                        var result = res;
                        if(result.code == 20000){
                            // 微信浏览器支付
                            if(result.tradeType == "JSAPI"){
                                this.oldPeople(result);
                            }else if(result.tradeType == "MWEB"){
                                // 其他浏览器支付
                                window.location.href = result.mweb_url+"&redirect_url="+encodeURIComponent("https://" + location.host + "/hsfront/TianAnPayState?merchantSeq=" + result.merchantSeq);
                            }
                        }else{
                            this.Toast(res.message);
                        }
                    })
                }
            },
            // 微信支付
            oldPeople(res) {
              let this_ = this;
              WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                  appId: res.appid,
                  timeStamp: res.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                  nonceStr: res.nonceStr, // 支付签名随机串，不长于 32 位
                  package: res.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                  signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                  paySign: res.paySign // 支付签名
                },
                function(res) {
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    this_.$router.push("/paySuccess");
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                    // 支付失败
                    this_.$router.push("/paymentFailure");
                  }
                }
              );
            },
        },
    }
</script>

<style scoped>

</style>