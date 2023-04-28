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
                        <el-option :label="item.liftTypeName" :value="item.id" v-for="(item,index) in liftType"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属用户" v-show="ifAdministrator">
                    <el-select v-model="formInline.userId" placeholder="所属用户" @change="search">
                        <el-option label="全部" value = "0"></el-option>
                        <el-option :label="item.unitName" :value="item.id" v-for="(item,index) in unitName"></el-option>
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
                <div>电梯档案信息</div>
                <div>
                    <el-button size="mini" plain @click="refresh">刷新</el-button>
                </div>
                <div v-if="!ifAdministrator">
                    <el-button size="mini" type="primary" plain @click="addLift" :loading="loading">新增</el-button>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%" max-height="700" border size="small" v-loading="loading">
                <el-table-column label="设备代码" >
                    <template slot-scope="scope">
                        <a @click="checkLiftDetail(scope.row.id)" style="color: #1890ff;cursor: pointer">{{ scope.row.liftCode }}</a>
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
                <el-table-column label="设备位置经度" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.positionX }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="设备位置纬度" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.positionY }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="单位" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.unitName }}</span>
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
            <lift-detail
                :detail-data = "detailData"
                @closeDialog="detailDialogVisibleChange"/>
        </el-dialog>

        <!--自定义弹出框：增加电梯-->
        <el-dialog
            :destroy-on-close="true"
            title="添加设备"
            :visible.sync="addLiftDialogVisible"
            width="1064px"
            :close-on-click-modal="false">
            <add-lift
                @closeDialog="addLiftDialogVisibleChange"
                :lift-type="liftType">

            </add-lift>
        </el-dialog>

    </div>
</template>

<script>
import {_liftData, _liftDataById} from "@/network/api/apiLift";
import LiftDetail from "@/components/baseData/liftDetail";
import AddLift from "@/components/baseData/addLift";
import {_liftType} from "@/network/api/apiLfitType";
import {_unitName} from "@/network/api/apiUser";

export default {
    name: "liftData",
    components: {AddLift, LiftDetail,},
    data() {
        return {
            ifAdministrator: false,
            formInline: {
                liftCode: "",
                liftName: "",
                liftTypeId: "0",
                userId: "0",
                internetStatus:0
            },
            pagination: {
                size: 15,
                current: 1,
                total: 0
            },
            tableData: [],
            loading: true,
            detailDialogVisible: false,
            addLiftDialogVisible:false,

            detailData:{},
            liftType:[],
            unitName:[],
        }
    },
    methods: {
        search() {
            this.loading = true
            this.axiosGetLiftData()
        },
        position() {

        },
        handleCurrentChange(val) {
            this.loading = true
            this.pagination.current = val
            this.axiosGetLiftData(false)
        },
        checkLiftDetail(id){
            this.loading = true
            _liftDataById(id).then(res =>{
                if (res.data.code === 200) {
                    this.detailData = res.data.data
                    this.detailDialogVisible = true
                }
                this.loading = false
            }).catch(()=>{
                this.loading = false
            })
        },
        addLift(){
            this.addLiftDialogVisible = true
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
        detailDialogVisibleChange(ifReload){
            this.detailDialogVisible = !this.detailDialogVisible
            if (ifReload)
                this.axiosGetLiftData(true)
        },
        addLiftDialogVisibleChange(ifReload){
            this.addLiftDialogVisible = !this.addLiftDialogVisible
            if (ifReload)
                this.axiosGetLiftData(true)
        },
        clear(){
            this.formInline.liftCode = ""
            this.formInline.liftName = ""
        },
        refresh(){
            this.axiosGetLiftData(false)
        }
    },
    created() {
        this.ifAdministrator = (localStorage.getItem("userId") === '1');
        this.axiosLiftType()
        if (this.ifAdministrator)
            this.axiosUnitName()
        this.axiosGetLiftData(false)
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

    ::v-deep .el-form-item {
        margin-bottom: 0;
    }
    ::v-deep .el-dialog__header{
        border-bottom: 1px solid var(--colorBorder-theme);
    }
</style>