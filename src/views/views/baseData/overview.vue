<template>
    <div id="root">
        <div>
            <el-card class="baseData">
                <div slot="header" class="clearfix">基本数据</div>
                <div>

                </div>
            </el-card>
        </div>
        <div>
            <el-card class="alarmTender">
                <div slot="header" class="clearfix">告警趋势</div>
                <vue-echarts :option="alarmTender" v-loading="loading" style="height: 100%"></vue-echarts>
            </el-card>
        </div>
        <div>
            <el-card class="alarmRemoveTender">
                <div slot="header" class="clearfix">告警移除</div>
                <vue-echarts :option="alarmRemoveTender" v-loading="loading" style="height: 100%"></vue-echarts>
            </el-card>
        </div>
        <div>
            <el-card class="internetTender">
                <div slot="header" class="clearfix">电梯类型统计</div>
                <vue-echarts :option="liftTypePie" v-loading="loading" style="height: 100%"></vue-echarts>
            </el-card>
        </div>
        <div>
            <el-card class="liftTypePie">
                <div slot="header" class="clearfix">告警类型统计</div>
                <vue-echarts :option="alarmTypePie" v-loading="loading" style="height: 100%"></vue-echarts>
            </el-card>
        </div>
        <div>
            <el-card class="alarmTypePie">
                <div slot="header" class="clearfix">告警状态统计</div>
                <vue-echarts :option="alarmStatusPie" v-loading="loading" style="height: 100%"></vue-echarts>
            </el-card>
        </div>


    </div>
</template>

<script>

import {_overview} from "@/network/api/overview";

export default {
    name: "overview",
    data(){
        return{
            alarmTender:{},
            alarmRemoveTender:{},
            liftTypePie:{},
            alarmTypePie:{},
            alarmStatusPie:{},
            overviewData:null,
            loading:true,
        }
    },
    methods:{
        mapToLists(obj,key1,key2){
            let list1 = [],list2 = []
            for (const ele of obj) {
                list1.push(ele[key1])
                list2.push(ele[key2])
            }
            return [list1,list2]
        },
        mapToMap(obj,key1,key2){
            let list = []
            for (const ele of obj) {
                let ob = {}
                ob.name = ele[key1]
                ob.value = ele[key2]
                list.push(ob)
            }
            return list
        },
        changeDate(date){
            return date.substring(5,10).replace('-','/')
        },
        tenderConfig(tips){
            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#dddc6b'
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [],
                },
                yAxis: {},
                series: [
                    {
                        name: tips,
                        type: 'line',
                        smooth: true,
                        data: [],
                    },
                ],
            }
        },
        pieConfig(){
            return {
                legend:{

                },
                calculable: false,
                tooltip: {
                    trigger: 'item'
                },
                series:{
                    type: 'pie',
                    minAngle: 4,
                    radius: ['50%', '80%'],
                    data: [],
                    itemStyle: {
                        normal: {
                            label: {show: false},
                            labelLine: {show: false},
                        },
                    },
                }
            }
        }
    },
    created(){
        this.alarmTender = this.tenderConfig("告警数量")
        this.alarmRemoveTender = this.tenderConfig("告警移除")
        this.liftTypePie = this.pieConfig()
        this.alarmTypePie = this.pieConfig()
        this.alarmStatusPie = this.pieConfig()
        _overview().then(res =>{
            if(res.data.code === 200){
                // 告警趋势
                let alarmTenderLists = this.mapToLists(res.data.data.alarmTender,"date","count")
                this.alarmTender.xAxis.data = alarmTenderLists[0].map(this.changeDate)
                this.alarmTender.series[0].data = alarmTenderLists[1]
                // 告警移除趋势
                let alarmRemoveTenderLists = this.mapToLists(res.data.data.alarmRemoveTender,"date","count")
                this.alarmRemoveTender.xAxis.data = alarmRemoveTenderLists[0].map(this.changeDate)
                this.alarmRemoveTender.series[0].data = alarmRemoveTenderLists[1]
                // 电梯类型饼图
                this.liftTypePie.series.data = this.mapToMap(res.data.data.liftTypePie,"liftTypeName","count")
                this.alarmTypePie.series.data = this.mapToMap(res.data.data.alarmTypePie,"alarmTypeName","count")
                this.alarmStatusPie.series.data = this.mapToMap(res.data.data.alarmStatusPie,"alarmStatus","count")
                this.loading = false
            }
        })
    }

}
</script>

<style scoped>
    #root{
        height: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-gap: 10px;
        background-color: var(--colorBackground-theme);
    }
    .el-card{
        height: 100%;
        box-shadow: none;
    }
    ::v-deep .el-card__header{
        height: 12%;
        box-sizing: border-box;
    }
    ::v-deep .el-card__body{
        height: 88%;
        box-sizing: border-box;
    }

</style>