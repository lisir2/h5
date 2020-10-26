<!-- 组件说明 -->
<template>
    <div class='commonwt'>
        <van-nav-bar title="常见问题" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <ul>
            <li v-for="(item,index) in items" :key="index">
                <span>{{index+1}}、{{item.problemTitle}}</span>
                <p v-html="item.problemContent"></p>
            </li>
        </ul>
    </div>
</template>

<script>
import api from '@/fetch/api';
    export default {
        components: {

        },
        data () {
            return {
                items:[]
            };
        },
        mounted() {
            var productId = this.$route.query.productId;
            var args=this.sign({productId:productId,tag:"常见问题"});
            api.getDetailArt(args).then(res => {
                console.log(res);
                this.items=res.data;
            })
        },
        methods: {
            onClickLeft(){
                 this.$router.go(-1);
            }
        },
    }
</script>

<style lang="scss">
    .commonwt{
        ul{
            li{
                font-size: 32px;
                color: #333333;
                span{
                    display: block;
                    padding: 37px 28px;
                    font-weight: 700;
                    background:rgba(247,247,247,1);
                }
                p{
                    margin: 40px 28px;
                }
            }
        }
    }
</style>