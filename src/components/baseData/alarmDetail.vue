<template>
    <div>
        <div>
            <span>操作</span>
            <div class="btn">
                <el-button type="primary" size="mini" plain @click="unLock" v-if="detailData.alarmStatus === 1 && !ifAdministrator">
                    标记为已解除
                </el-button>
                <el-button size="mini" @click="close()">关闭</el-button>
            </div>
        </div>

        <div class="baseData">
            <span>基本信息</span>
            <el-descriptions class="margin-top" :column="3" border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        设备代码
                    </template>
                    <span>{{detailData.liftCode}}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        是否平层
                    </template>
                    <span v-if="detailData.ifFlat">平层</span>
                    <span v-else-if="detailData.ifFlat === -1">不平层</span>
                    <span v-else>未知</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        人数
                    </template>
                    <span>{{detailData.personNum}} 人</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        告警时间
                    </template>
                    <span>{{detailData.alarmTime}}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        告警移除时间
                    </template>
                    <span>{{detailData.alarmRemoveTime}}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        当前楼层
                    </template>
                    <span>{{detailData.currFloor}} 楼</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        告警事件名称
                    </template>
                    <span>{{detailData.alarmTypeName}}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        所属单位
                    </template>
                    <span>{{detailData.unitName}}</span>
                </el-descriptions-item>
            </el-descriptions>
        </div>


    </div>
</template>

<script>
import {_alarmUnlock} from "@/network/api/apiAlarm";

export default {
    name: "alarmDetail",
    props:{
        detailData: {
            type: Object,
            require: true,
        },
        ifAdministrator:{
            type:Number,
            require: true
        },
    },
    data(){
        return{

        }
    },
    methods:{
        unLock(){
            _alarmUnlock(this.detailData.id).then(res =>{
                if (res.data.code === 200){
                    this.$emit("closeDialogAndRefresh")
                    this.$message.success("成功解除告警")
                }
            })
        },
        close(){
            this.$emit("closeDialog")
        }

    },

}
</script>

<style scoped>
    .btn {
        background-color: var(--colorBackground-theme);
        padding: 5px 10px;
        margin-bottom: 20px;
    }
    .baseData {
        margin: 20px 0;
    }
    .btn, .position > div, .baseData > div {
        margin-top: 10px;
    }
    ::v-deep .el-input__inner{
        border: none;
    }
    ::v-deep .el-input.is-disabled .el-input__inner{
        background: none;
    }
    ::v-deep .el-textarea__inner{
        border: none;
    }
    ::v-deep .el-textarea.is-disabled .el-textarea__inner{
        border: none;
        background: none;
    }
</style>