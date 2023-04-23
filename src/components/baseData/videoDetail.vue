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
        liftCode:{
            type:String
        }
    },
    created() {
        console.log(this.liftCode)
    },
    mounted() {
        if(flvJs.isSupported()){
            const video = document.getElementById('myVideo');
            this.flvPlayer = flvJs.createPlayer({
                type: 'flv',
                url: `https://28181.shenri.net.cn:10010/sms/34020000002020000001/flv/hls/${this.liftCode}_${this.liftCode}.flv` //你的url地址
            });
            this.flvPlayer.attachMediaElement(video);
            this.flvPlayer.load();
            this.flvPlayer.play();
        }
    },
    beforeDestroy() {
        this.flvPlayer.destroy()
    }
}
</script>

<style scoped>

</style>