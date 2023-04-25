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
                <div slot="header" class="clearfix">物联网接入趋势</div>
                <div>

                </div>
            </el-card>
        </div>
        <div>
            <el-card class="alarmRemoveTender">
                <div slot="header" class="clearfix">告警趋势</div>
                <div>

                </div>
            </el-card>
        </div>
        <div>
            <el-card class="internetTender">
                <div slot="header" class="clearfix">电梯数量统计</div>
                <div>

                </div>
            </el-card>
        </div>
        <div>
            <el-card class="liftTypePie">
                <div slot="header" class="clearfix">告警数量统计</div>
                <div>

                </div>
            </el-card>
        </div>
        <div>
            <el-card class="alarmTypePie">
                <div slot="header" class="clearfix">告警状态统计</div>
            </el-card>
        </div>

        <!--        <vue-echarts :option="option_column" style="height: 400px"></vue-echarts>-->
    </div>
</template>

<script>

export default {
    name: "overview",
    data(){
        return{
            option_column: {
                title: { text: "Column Chart" },
                tooltip: {},
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20],
                    },
                ],
            },
        }
    },

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