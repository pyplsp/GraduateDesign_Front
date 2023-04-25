<template>
    <div>
        <!--根据条件查询-->
        <el-card class="search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                <el-form-item label="设备代码">
                    <el-input v-model="formInline.liftCode" placeholder="设备代码" @change="search"></el-input>
                </el-form-item>
                <el-form-item label="告警类型">
                    <el-input v-model="formInline.alarmTypeName" placeholder="告警类型" @change="search"></el-input>
                </el-form-item>
                <el-form-item label="告警状态">
                    <el-select v-model="formInline.alarmStatus" placeholder="告警状态" @change="search">
                        <el-option label="全部" :value = null></el-option>
                        <el-option label="已解除" value="0"></el-option>
                        <el-option label="未解除" value="1"></el-option>
                    </el-select>
                    </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button type="primary" @click="search" plain>查询</el-button>
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button @click="clear">清空</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!--电梯设备展示列表-->
        <div class="table">
            <div class="title">
                <div>告警记录</div>
                <div>
                    <el-button size="mini" plain @click="refresh">刷新</el-button>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%" max-height="700" border size="small" v-loading="loading">
                <el-table-column label="设备代码" >
                    <template slot-scope="scope">
                        <a @click="checkDetail(scope.row.id)" style="color: #1890ff;cursor: pointer">
                            {{ scope.row.liftCode }}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column label="告警类型" >
                    <template slot-scope="scope">
                        <a @click="">{{ scope.row.alarmTypeName }}</a>
                    </template>
                 </el-table-column>
                <el-table-column label="发生时间" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.alarmTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="解除时间" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.alarmRemoveTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.alarmStatus === 1" style="color: var(--colorError-theme)">
                            未解除
                        </span>
                        <span v-else-if="scope.row.alarmStatus === 0" style="color: var(--colorCorrect-theme)">
                            自动解除
                        </span>
                        <span v-else-if="scope.row.alarmStatus === -1" style="color: var(--colorActive-theme)">
                            手动解除
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="人数" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.personNum }} 人</span>
                    </template>
                </el-table-column>
                <el-table-column label="楼层" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.currFloor }} 楼</span>
                    </template>
                </el-table-column>
                <el-table-column label="是否平层" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.ifFlat">平层</span>
                        <span v-else-if="scope.row.ifFlat === -1">不平层</span>
                        <span v-else>未知</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="pagination.current"
                    :page-size="pagination.size"
                    :total="pagination.total">
                </el-pagination>
            </div>
        </div>

        <!--自定义弹出框：电梯详情与编辑-->
        <el-dialog
            :destroy-on-close="true"
            title="设备详细信息"
            :visible.sync="detailDialogVisible"
            width="1064px"
            :close-on-click-modal="false">
            <alarm-detail
                :detail-data="detailData"
                @closeDialog="closeDialog"
                @closeDialogAndRefresh="closeDialogAndRefresh">

            </alarm-detail>
        </el-dialog>

    </div>
</template>

<script>
import {_alarmData, _alarmDataById} from "@/network/api/apiAlarm";
import AlarmDetail from "@/components/baseData/alarmDetail";

export default {
    name: "alarmHistory",
    components: {AlarmDetail},
    data(){
        return{
            formInline: {
                liftCode: "",
                alarmTypeName:"",
                alarmStatus:null,
            },
            tableData:[],
            loading:true,
            pagination: {
                size: 10,
                current: 1,
                total: 0
            },
            detailDialogVisible:false,
            detailData:{},
        }
    },
    methods:{
        getAlarmData(){
            _alarmData(this.pagination, this.formInline).then((res)=>{
                if (res.data.code === 200) {
                    this.tableData = res.data.data.records
                    this.pagination.current = res.data.data.current
                    this.pagination.total = res.data.data.total
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            })
        },
        search(){
            this.pagination.current = 1 //回到第一页
            this.getAlarmData()
        },
        clear(){
            this.formInline = {
                liftCode: "",
                alarmTypeName:"",
                alarmStatus:null,
            }
        },
        handleCurrentChange(val){
            this.loading = true
            this.pagination.current = val
            this.getAlarmData()
        },
        refresh(){
            this.loading = true
            this.getAlarmData()
        },
        checkDetail(id){
            this.loading = true
            _alarmDataById(id).then(res =>{
                if (res.data.code === 200) {
                    this.detailData = res.data.data
                    this.detailDialogVisible=true;
                }
                this.loading = false
            }).catch(()=>{
                this.loading = false
            })
        },
        closeDialog(){
            this.detailDialogVisible = false;
        },
        closeDialogAndRefresh(){
            this.detailDialogVisible = false;
            this.refresh()
        },
    },
    created() {
        this.getAlarmData()
    }
}
</script>

<style scoped>
    .search {
        margin: 10px;
    }

    .table {
        margin: 10px;
        padding: 10px;
        background-color: white;
    }

    .title {
        margin: 10px 0 20px 0;
        display: flex;
        line-height: 28px;
    }

    .title > div {
        padding: 0 8px;
    }

    .pagination {
        margin-top: 20px;
    }
    ::v-deep .el-form-item {
        margin-bottom: 0;
    }
    ::v-deep .el-dialog__header{
        border-bottom: 1px solid var(--colorBorder-theme);
    }
</style>