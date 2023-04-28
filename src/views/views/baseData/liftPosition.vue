<template>
    <div class="root">
        <baidu-map class="bm-view" :scroll-wheel-zoom="true" center="深圳" :zoom="15">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-marker :position="{lng: item.positionX, lat: item.positionY}" v-for="(item,index) in liftPosition" @click="checkDetail(item.id)" />
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
            show: false
        }
    },
    methods:{
        checkDetail (id) {
            _liftDataById(id).then(res =>{
                if (res.data.code === 200){
                    this.show = true
                }
            })
        }
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