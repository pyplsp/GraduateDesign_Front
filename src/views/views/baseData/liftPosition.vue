<template>
    <div class="root">
        <baidu-map class="bm-view" :scroll-wheel-zoom="true" center="深圳" :zoom="15">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-marker :position="{lng: item.positionX, lat: item.positionY}" v-for="(item,index) in liftPosition" @click="checkDetail(item.id)" />
            <bm-info-window :position="{lng: infoWindow.lng, lat: infoWindow.lat}"
                            :title="infoWindow.title"
                            :show="infoWindow.show"
                            @close="infoWindowClose"
                            @open="infoWindowOpen">
                <div class="window" v-html="infoWindow.contents"></div>
            </bm-info-window>
        </baidu-map>
    </div>
</template>

<script>
import {_liftDataById, _liftPosition} from "@/network/api/apiLift";
export default {
    name: "liftPosition",
    components: {
    },
    data(){
        return{
            liftPosition:[],
            infoWindow: {
                title:`<sapn style="font-weight: bolder">详情</sapn>`,
                lng:null,
                lat:null,
                show: false,
                contents: '',
                style:'style="color: var(--colorActive-theme);font-weight: 900"',
            },
        }
    },
    methods:{
        checkDetail (id) {
            _liftDataById(id).then(res =>{
                if (res.data.code === 200){
                    let myData = res.data.data
                    this.infoWindow.lng = myData.positionX
                    this.infoWindow.lat = myData.positionY
                    this.infoWindow.contents = `
                        <P><span ${this.infoWindow.style}>设备代码：</span>${myData.liftCode}</P>
                        <P><span ${this.infoWindow.style}>设备名称：</span>${myData.liftName}</P>
                        <P><span ${this.infoWindow.style}>设备类型：</span>${myData.liftTypeName}</P>
                        <P><sapn ${this.infoWindow.style}>描述：</sapn>${myData.description === null ? '无' : myData.description}</P>
                    `
                    this.infoWindow.show = true
                }
            })
        },
        infoWindowClose (e) {
            this.infoWindow.show = false
        },
        infoWindowOpen (e) {
            this.infoWindow.show = true
        },
    },
    created() {
        _liftPosition().then(res =>{
            this.liftPosition = res.data.data
        })
    }
}
</script>

<style scoped>
    .root{
        height: 100%;
    }
    .bm-view{
        height: 100%;
        width: 100%;
    }
</style>