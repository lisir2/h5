<!-- 组件说明 H5页面打开-->
<template>
    <div class='binduser'>
        <van-nav-bar title="保险经纪网" left-arrow @click-left="onClickLeft">
           <!-- <van-icon name="share" slot="right" /> -->
        </van-nav-bar>
        <p class="quickPhone">为了您的账户安全，请先绑定手机号</p>
        <van-cell-group>
            <van-field
                    placeholder="请输入手机号"
                    :left-icon="phone"
            />
            <van-field
                center
                clearable
                :left-icon="yzm"
                placeholder="请输入短信验证码"
                v-model="disabledVal"
                maxlength="6"
                @change="disabledShow"
            >
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
                
        </van-cell-group>
        <div class="nextstep">
            <van-button type="primary" round size="large" v-bind:disabled="isAble" @click="checkPhone">下一步</van-button>
            <p>
                <van-checkbox v-model="checked" checked-color="#F99A31"></van-checkbox>
                我已阅读并同意<a>《保险经纪网协议》</a>、<a href="">《隐私协议》</a>
            </p>
            <p class="kefuNumber">客服热线：400-693-8080</p>
        </div>
    </div>
</template>

<script>
    export default {
        name:"binduser",
        components: {

        },
        data () {
            return {
                items:[],
                disabledVal:"",
                isAble:false,
                checked: true,
                phone:require('../../assets/images/login/mobile.png'),
                yzm:require('../../assets/images/login/yzmicon.png')
            };
        },
        mounted() {

        },
        methods:{
            disabledShow(){
                if(this.disabledVal){
                   return this.isAble=false;
                }else{
                   return this.isAble=true;
               }
            },
            onClickLeft(){
                Dialog.confirm({
                    message: '离注册成功仅一步之遥，确认放弃吗'
                    }).then(() => {
                        this.$router.go(-1);
                    }).catch(() => {
                });
            },
            checkPhone(){
                this.$router.push({ path: '/resetPassword' })
            }
        },
    }
</script>

<style lang="scss">
      .binduser{
           .van-nav-bar__title{
                font-size: 28px
            }
            .van-icon__image{
                width: 34px;
                height: 34px;
            }
            .van-field__control{
                text-indent: 0.5em;
            }
            .van-button--primary{
                background:rgba(249,154,49,1);
                border: 0;
                border-radius: 50px;
            }
            .quickPhone{
                padding: 30px;
                color: #302D2D;
                span{
                    color: #0088ff;
                }
            }
            .van-cell{
                border: 1px solid rgba(221,221,221,1);;
                border-radius: 50px;
                width: 618px;
                margin: auto;
                padding: 18px 32px;
                margin-bottom: 20px;
                background:rgba(255,255,255,1);
            }
            .nextstep{
                text-align: center;
                margin-top: 140px;
                .van-button--large{
                    height: 88px;
                    width: 618px;
                    line-height: 88px;
                    margin: 30px 0;
                    background:rgba(249,154,49,1);
                    border:0
                }
                .van-icon {
                    font-size: 32px;
                }
                .van-checkbox{
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: -16px;
                }
                p{
                    color:#8F8A8A;
                    font-size: 24px;
                    a{
                        color: #0088ff
                    }
                }
                .kefuNumber{
                    position: fixed;
                    bottom: 0;
                    text-align: center;
                    width: 100%;
                }
            }
      }

</style>