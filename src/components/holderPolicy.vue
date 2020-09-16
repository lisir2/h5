<!-- 组件说明 -->
<template>
    <div class='holderPolicy'>
        <p class="policyTitle">投保人信息</p>
        <ul>
            <li>
                <span class="list_01">投保人姓名</span>
                <span class="list_02">
                    <input type="text" v-model="holdername" placeholder="请填写投保人姓名" @change="holderName">
                </span>
            </li>
            <li>
                <span class="list_01">证件类型</span>
                <span class="list_02">
                    <van-action-sheet
                    v-model="show"
                    :actions="actions"
                    @select="onSelect"
                    title="证件类型选择"
                    />
                    <input type="text" placeholder="请选择证件类型" @select="onSelect" @click="chooseType" v-model="typeVal" readonly>
                    <van-icon name="arrow" />
                </span>
            </li>
            <li>
                <span class="list_01">证件号码</span>
                <span class="list_02">
                    <input type="text" placeholder="请填写投保人证件号码">
                </span>
            </li>
            <li>
                <span class="list_01">手机号码</span>
                <span class="list_02">
                    <input type="text" placeholder="请填写投保人手机号码">
                </span>
            </li>
            <li>
                <span class="list_01">电子邮箱</span>
                <span class="list_02">
                    <input type="text" placeholder="请填写投保人电子邮箱">
                </span>
            </li>
        </ul>
        <!-- <van-cell-group>
        <van-field
            v-model="holderName"
            label="投保人姓名"
            placeholder="请输入投保人姓名"
      
        />
        <van-field
            v-model="cardNum"
            label="证件类型"
            placeholder="请输入证件号码"
        />
        <van-field
            v-model="cardNum"
            label="证件号码"
            placeholder="请输入证件号码"
       
        />
        </van-cell-group> -->
    </div>
</template>

<script>
    //import x from ''
    import Vue from "vue";
    import { ActionSheet, Toast } from 'vant';
    Vue.use(Toast)
    Vue.use(ActionSheet);
    export default {
        components: {

        },
        data () {
            return {
                holdername:"",
                show:false,
                actions: [
                    { name: '身份证' },
                    { name: '护照' }
                ],
                typeVal:""
            };
        },
        computed: {

        },
        methods: {
            holderName(){
              this.$emit('getholderName',this.holdername)
            },
            onSelect(item) {
                this.show = false;
                // Toast(item.name);
                this.typeVal=item.name;
                // this.$emit('getholderName',this.typeVal)
            },
            onCancel(){

            },
            chooseType(){
                this.show=true;
            }
        },
    }
</script>

<style lang='scss'>
    .holderPolicy{
        ul{
            li{
                border-bottom: 1px solid #dddddd;
                width: 100%;
                height: 100px;
                line-height: 100px;
                .list_01{
                    display: inline-block;
                    height: 100px;
                    line-height: 100px;
                    margin-left: 30px;
                    width: 200px;
                    color: #0C0C0C;
                    font-size: 28px;
                }
                .list_02{
                    display: inline-block;
                    height: 100px;
                    line-height: 100px;
                    .van-action-sheet__close{
                        padding: 0 50px;
                    }
                }
            }
        }
    }
</style>