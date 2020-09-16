<!-- 资质牌照 -->
<template>
    <div class='content'>
        <van-nav-bar title="资质牌照" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div class="contentText">

        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import api from '../fetch/api'
    export default {
        name:'QualificationLicence',
        components: {

        },
        data () {
            return {
 
            };
        },
        computed: {

        },
        mounted(){
            var args=this.sign({advTitle:'资质牌照'});
            // this.$axios.post('/brg/openapi/h5/index/getAdContent',args).then(res=>{
            api.getAdContent(args).then(res=>{
                var response = res;
                if(response.code == 20000){
                    $('.contentText').html(response.data[0].adv_content)
                }else{
                    this.Toast(response.message);
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

<style scoped>

</style>