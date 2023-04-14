<template>
    <div>
        <!--根据条件查询-->
        <el-card class="search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                <el-form-item label="设备代码">
                    <el-input v-model="formInline.liftCode" placeholder="设备代码"></el-input>
                </el-form-item>
                <el-form-item label="电梯名称">
                    <el-input v-model="formInline.liftName" placeholder="电梯名称"></el-input>
                </el-form-item>
                <el-form-item label="电梯类型">
                    <el-select v-model="formInline.liftType" placeholder="电梯类型">
                        <el-option label="全部" value=0></el-option>
                        <el-option label="区域一" value=1></el-option>
                        <el-option label="区域二" value=2></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属用户" v-show="ifAdministrator">
                    <el-select v-model="formInline.user" placeholder="所属用户">
                        <el-option label="全部" value=0></el-option>
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button @click="search">清空</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!--电梯设备展示列表-->
        <div class="table">
            <div class="title">
                <div>电梯档案信息</div>
                <div>
                    <el-button size="mini">新增</el-button>
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
        <!--自定义弹出框：增加电梯-->
        <el-dialog
            title="电梯详细信息"
            :visible.sync="dialogVisible"
            width="70%">
            <lift-detail
                :detail-data = "detailData"
                @closeDialog="dialogVisibleChange"/>

        </el-dialog>


        <!--自定义弹出框：编辑电梯-->

    </div>
</template>

<script>
import {liftData, liftDataById} from "@/network/api";
import LiftDetail from "@/components/baseData/liftDetail";

export default {
    name: "liftData",
    components: {LiftDetail},
    data() {
        return {
            ifAdministrator: 0,
            formInline: {
                liftCode: "",
                liftName: "",
                liftType: null,
                user: null,
            },
            pagination: {
                size: 10,
                current: 1,
                total: 0
            },
            tableData: [],
            loading: true,
            dialogVisible: false,
            detailData:{},
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
            this.axiosGetLiftData()
        },
        checkLiftDetail(id){
            this.loading = true
            liftDataById(id).then(res =>{
                if (res.data.code === 200) {
                    this.detailData = res.data.data
                    this.dialogVisible = true
                }
                this.loading = false
            }).catch(()=>{
                this.loading = false
            })
        },
        axiosGetLiftData() {
            liftData(this.pagination, this.formInline).then(res => {
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
        dialogVisibleChange(){
            this.dialogVisible = !this.dialogVisible
        }
    },
    created() {
        this.ifAdministrator = Number(localStorage.getItem("Administrator"));
        this.axiosGetLiftData()
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