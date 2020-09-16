<template>
    <div class="video-content">
        <a href="https://share.polyv.net/front/video/preview?vid=ae8d0c4ec9532ed386df5950d03bafe9_a">
          <img  :src="videoImg" alt="">
        </a>
    </div>
</template>
<script>
export default {
    name: 'company-video',
    data(){
      return{
            videoImg:require('../assets/images/video_img.png'),
      }  
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
    .video-content{
        img{
            width: 94%;
            margin: 5% 3%;
            margin-bottom: 0;
        }
    }
</style>