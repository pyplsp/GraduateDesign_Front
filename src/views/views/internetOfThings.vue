<template>
    <div>
        <!--根据条件查询-->
        <el-card class="search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                <el-form-item label="设备代码">
                    <el-input v-model="formInline.liftCode" placeholder="设备代码" @change="search"></el-input>
                </el-form-item>
                <el-form-item label="设备名称">
                    <el-input v-model="formInline.liftName" placeholder="电梯名称" @change="search"></el-input>
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-select v-model="formInline.liftTypeId" placeholder="电梯类型" @change="search">
                        <el-option label="全部" value = "0"></el-option>
                        <el-option :label="item.liftTypeName" :value="item.id" v-for="(item,index) in liftType" :key="'liftType-' + index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属用户" v-show="ifAdministrator">
                    <el-select v-model="formInline.userId" placeholder="所属用户">
                        <el-option label="全部" value = "0"></el-option>
                        <el-option :label="item.unitName" :value="item.id" v-for="(item,index) in unitName" :key="'user-' + index"></el-option>
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
                <div>物联网信息</div>
                <div>
                    <el-button size="mini" @click="refresh" plain>刷新</el-button>
                </div>
            </div>
            <el-table stripe :data="tableData" style="width: 100%" max-height="700" border size="small" v-loading="loading">
                <el-table-column label="设备代码" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.liftCode }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="设备名称" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.liftName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="设备类型" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.liftTypeName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="单位">
                    <template slot-scope="scope">
                        <span>{{ scope.row.unitName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="打开摄像头" >
                    <template slot-scope="scope">
                        <div class="realTime">
                            <a
                                style="cursor: pointer"
                                class="el-icon-camera-solid"
                                @click="openVideo(scope.row.liftCode)">
                            </a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="打开实时数据">
                    <template slot-scope="scope">
                        <div class="realTime">
                            <a
                               @click="openRealtime(scope.row.liftCode)"
                               style="cursor: pointer"
                               class="el-icon-s-platform">
                            </a>
                        </div>
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

        <!--   电梯实时数据弹窗     -->
        <el-dialog
            :title="'实时数据 (' + nowLIftCode + ')'"
            :visible.sync="realTimeDialogVisible"
            width="1064px"
            :close-on-click-modal="false">
            <real-time-detail
                v-if="realTimeDialogVisible"
                :lift-code = "nowLIftCode"
                ref="customComponent">

            </real-time-detail>
        </el-dialog>

        <!--    监控实时数据弹窗        -->
        <el-dialog
        :title="'画面直播 (' + nowLIftCode + ')'"
        :visible.sync="videoDialogVisible"
        width="1064px"
        :close-on-click-modal="false">
            <video-detail v-if="videoDialogVisible" :flv-url="nowFlvUrl"/>
        </el-dialog>

    </div>
</template>

<script>
import {_liftType} from "@/network/api/apiLfitType";
import {_unitName} from "@/network/api/apiUser";
import {_liftData} from "@/network/api/apiLift";
import RealTimeDetail from "@/components/baseData/realTimeDetail";
import VideoDetail from "@/components/baseData/videoDetail";
export default {
    name: "internetOfThings",
    components:{
        VideoDetail,
        RealTimeDetail
    },
    data() {
        return {
            ifAdministrator: 0,
            formInline: {
                liftCode: "",
                liftName: "",
                liftTypeId: "0",
                userId: "0",
                internetStatus:1
            },
            pagination: {
                size: 10,
                current: 1,
                total: 0
            },
            tableData: [],
            loading: true,

            liftType:[],
            unitName:[],

            realTimeDialogVisible:false,
            videoDialogVisible:false,

            nowFlvUrl:'',
            nowLIftCode:"",

            flvPlayer:null
        }
    },
    methods: {
        search() {
            this.loading = true
            this.axiosGetLiftData()
        },
        handleCurrentChange(val) {
            this.loading = true
            this.pagination.current = val
            this.axiosGetLiftData(false)
        },
        axiosGetLiftData(goToOne) {
            if (goToOne){
                this.pagination.current = 1 //回到第一页
            }
            _liftData(this.pagination, this.formInline).then(res => {
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
        axiosLiftType(){
            _liftType().then(res =>{
                if(res.data.code === 200){
                    this.liftType = res.data.data
                }
            })
        },
        axiosUnitName(){
            _unitName().then(res =>{
                if(res.data.code === 200){
                    this.unitName = res.data.data
                }
            })
        },
        clear(){
            this.formInline.liftCode = ""
            this.formInline.liftName = ""
        },
        openRealtime(liftCode){
            this.nowLIftCode = liftCode
            this.realTimeDialogVisible = true
        },
        openVideo(liftCode){
            this.loading = true
            fetch('http://47.107.228.239:10000/api/v1/stream/start?serial=' + liftCode,{
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => {
                if(res.status === 200){
                    // 获取到视频流
                    return res.json()
                }else{
                    // 获取不到视频流
                    throw new TypeError("we haven't got JSON!");
                }
            }).then(data => {
                this.loading = false
                this.nowLIftCode = liftCode
                this.nowFlvUrl = data.FLV
                this.videoDialogVisible = true
            }).catch(error => {
                this.loading = false
            });
        },
        refresh(){
            this.axiosGetLiftData(false)
        },
    },
    created() {
        this.ifAdministrator = (localStorage.getItem("userId") === '1');
        this.axiosLiftType()
        if (this.ifAdministrator)
            this.axiosUnitName()
        this.axiosGetLiftData(false)
    },
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
    .title > div:first-child{
        font-weight: 900;
        opacity: 0.6;
    }
    .title > div {
        padding: 0 8px;
    }

    .pagination {
        margin-top: 20px;
    }
    .realTime{
        text-align: center;
        font-size: 1.5rem;
        color: var(--colorActive-theme)
    }
    ::v-deep .el-form-item {
        margin-bottom: 0;
    }
    ::v-deep .el-dialog__header{
        border-bottom: 1px solid var(--colorBorder-theme);
    }
</style>