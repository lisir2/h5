<template>
    <div class="father">
        <van-nav-bar title="在线客服"></van-nav-bar>
        <div class="chatBox" style="padding-top:46px;">
            <iframe id="service" :src="$store.state.baseImagePath + '/servicePage?k=c5d6706f0d4f32b60dc4ba3aaa148b89&wp=1&robotShuntSwitch=1&robotId=139000'" frameborder="0"></iframe>
            <!-- https://hsib.qiyukf.com/client?k=c5d6706f0d4f32b60dc4ba3aaa148b89&wp=1&robotShuntSwitch=1&robotId=139000 -->
        </div>
    </div>
</template>

<script>
export default {
    name:"chat",
    date(){
        return{

        }
    },
    mounted(){
        startRecord("service");
        console.log('客服页面调用 startRecord("service");');
    },
    beforeDestroy(){
        stopRecord("service");
        console.log('结束客服页面录制stopRecord("service")');
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>

.father{
    height: 100%;
    width: 100%;
    position: absolute;
    .chatBox{
        width: 100%;
        height: 100%;
        bottom: 0;
        position: absolute;
        iframe{
            float: left;
            height: 100%;
            width: 100%;
        }
    }
}
</style>

