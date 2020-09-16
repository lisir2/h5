<!-- 组件说明 修改昵称-->
<template>
    <div class='alterName'>
        <van-nav-bar title="修改昵称" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div class="u_name">
            <span>昵称</span><input type="text" v-model="userName" placeholder="请输入昵称">
        </div>
        <button @click="changName()">修改昵称</button>
    </div>
</template>

<script>
    import api from "../fetch/api";
    export default {
        components: {

        },
        data () {
            return {
                userName:'', //用户昵称
            };
        },
        mounted(){
            this.getUserName();
        },
        computed: {

        },
        methods: {
            // 获取用户昵称
            getUserName(){
                var args = this.sign({userId:this.getCookie('ZB_JUSER_Mid')});
                api.queryPersonalInfo(args).then(res=>{
                    if(res.code == 20000){
                        this.userName = res.data.name;
                    }
                })
            },
            onClickLeft() {
                this.$router.go(-1);
            },
            changName(){
                if(this.userName == ''){
                    this.Toast('请输入昵称')
                }else{
                    var that = this;
                    var args = this.sign({
                    mId:that.getCookie('ZB_JUSER_Mid'),
                    imgPath:'',
                    name:that.userName,
                    })
                    // this.$axios.post('/arg/openapi/h5/personalCenter/updatePersonalImgAndInfo',args).then(res=>{
                    api.updatePersonalImgAndInfo(args).then(res=>{
                        if(res.code == 20000){
                            that.Toast.success("修改成功");
                            that.getUserName();
                            that.$router.push('/personalData');
                        }
                        console.log(res);
                    })
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .alterName{
        .u_name{
            padding:0 40px;
            border-top: solid 20px #F7F7F7;
            line-height: 100px;
            border-bottom: 1px solid #F7F7F7;
            span{
                display: inline-block;
                width: 30%;
                box-sizing: border-box;
                height: 100px;
                border: 0;
            }
            input{
                height: 100px;
                display: inline-block;
                margin: auto;
                width: 70%;
                text-indent: 2em;
                box-sizing: border-box;
                border: 0;
            }
        }
        button{
            width: 80%;
            height:88px;
            background-color: #F99A31;
            margin: auto;
            color: white;
            display: block;
            font-size: 30px;
            border-radius: 44px;
            margin-top: 50px;
        }
    }
</style>