<template>
    <div>
        <video autoplay controls width="100%" height="500" id="myVideo"></video>
    </div>
</template>

<script>
import flvJs from "flv.js";
export default {
    name: "videoDetail",
    props:{
        flvUrl:{
            type:String
        },
        streamId:{
            type:String,
            default:null
        }
    },
    created() {

    },
    mounted() {
        if(flvJs.isSupported()){
            const video = document.getElementById('myVideo');
            this.flvPlayer = flvJs.createPlayer({
                type: 'flv',
                url:this.flvUrl,
            });
            this.flvPlayer.attachMediaElement(video);
            this.flvPlayer.load();
            this.flvPlayer.play();
        }
    },
    beforeDestroy() {
        // 带有streamId的是回放，需要关闭
        if(this.streamId){
            fetch('http://47.107.228.239:10000/api/v1/playback/stop?streamid='+this.streamId)
        }
        this.flvPlayer.destroy()
    }
}
</script>

<style scoped>

</style>