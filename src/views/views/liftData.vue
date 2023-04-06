<template>
    <div>
        <div class="search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="设备代码">
                    <el-input v-model="formInline.liftCode" placeholder="设备代码"></el-input>
                </el-form-item>
                <el-form-item label="电梯名称">
                    <el-input v-model="formInline.liftName" placeholder="电梯名称"></el-input>
                </el-form-item>
                <el-form-item label="电梯类型">
                    <el-select v-model="formInline.liftType" placeholder="电梯类型">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属用户">
                    <el-select v-model="formInline.user" placeholder="所属用户">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="table">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="日期"
                    width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="姓名"
                    width="180">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>姓名: {{ scope.row.name }}</p>
                            <p>住址: {{ scope.row.address }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.name }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
export default {
    name: "liftData",
    data() {
        return {
            formInline: {
                liftCode: "",
                liftName: "",
                liftType: null,
                user: null,
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    }
,
methods:{
    search() {
    }
}
}
</script>

<style scoped>
.search {

}
</style>