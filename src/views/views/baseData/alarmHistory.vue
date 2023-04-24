<template>
    <div>
        <!--根据条件查询-->
        <el-card class="search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                <el-form-item label="设备代码">
                    <el-input v-model="formInline.liftCode" placeholder="设备代码"></el-input>
                </el-form-item>
                <el-form-item label="设备名称">
                    <el-input v-model="formInline.liftName" placeholder="电梯名称"></el-input>
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-select v-model="formInline.liftTypeId" placeholder="电梯类型">
                        <el-option label="全部" value = "0"></el-option>
                        <el-option :label="item.liftTypeName" :value="item.id" v-for="(item,index) in liftType"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属用户" v-show="ifAdministrator">
                    <el-select v-model="formInline.userId" placeholder="所属用户">
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
                <el-table-column label="所属单位" >
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

    </div>
</template>

<script>
export default {
    name: "alarmHistory",
    data(){
        return{
            formInline: {
                liftCode: "",
                liftName: "",
                liftTypeId: "0",
                userId: "0",
            },
        }
    }
}
</script>

<style scoped>

</style>