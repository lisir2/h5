<!-- 组件说明:身份证识别 -->
<template>
    <div class='IdCardIdentification'>
        <van-button round type="info" size="large" color="#f9912e" :style="{width:'100px'}" @click="upIdCard('front')">上传身份证正面</van-button>
        {{idCardFront}}
        <br/>
        <br/>
        <van-button round type="info" size="large" color="#f9912e" :style="{width:'100px'}" @click="upIdCard('back')">上传身份证反面</van-button>
        {{idCardBack}}
        <input type="file" ref="upIdCard" @change="IdCardIdentification" accept="image/*" v-show="false">   
    </div>
</template>

<script>
import api from '@/fetch/api';
    export default {
        name:'IdCardIdentification',
        components: {

        },
        data () {
            return {
                idCardFront:'',
                idCardBack:'',
                status:'',
            };
        },
        computed: {

        },
        methods: {
            IdCardIdentification(){
                var formData = new window.FormData();
                formData.append("file", this.$refs.upIdCard.files[0]);
                formData.append("idCardSide", this.status);
                
                api.idCardUpload(formData,{
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(res=>{
                    if(res.code == '20000'){
                        if(this.status == 'front'){
                            this.idCardFront = res;
                        }else if(this.status == 'back'){
                            this.idCardBack = res;
                        }
                    }else{
                        this.Toast(res.message);
                    }
                });
            },
            upIdCard(status){
                this.status = status;
                this.$refs.upIdCard.click();
            }
        },
    }
</script>

<style scoped>

</style>