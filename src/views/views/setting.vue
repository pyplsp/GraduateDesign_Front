<template>
    <div id="root">
        <el-card class="info">
            <div slot="header" class="clearfix">
                用户信息详情
            </div>
            <el-descriptions border>
                <el-descriptions-item label="用户名">{{user.account}}</el-descriptions-item>
                <el-descriptions-item label="手机号">{{user.phoneNumber}}</el-descriptions-item>
                <el-descriptions-item label="单位">{{user.unitName}}</el-descriptions-item>
                <el-descriptions-item label="备注">
                    {{user.description}}
                </el-descriptions-item>
                <el-descriptions-item label="账户类型">
                        <span v-show="user.ifAdministrators !== null">{{user.ifAdministrators ? '管理员':'普通单位'}}</span>
                </el-descriptions-item>
                <el-descriptions-item label="查看密码">
                    <el-input :value="user.password" show-password></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="操作">
                    <el-button size="mini" @click="passwordC">修改密码</el-button>
                    <el-button type="danger" size="mini" @click="out">退出登录</el-button>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-card class="usersManage" v-if="ifAdministrator">
            <div slot="header" class="clearfix">
                <span>账户管理</span>
                <el-button plain size="mini" @click="refresh">刷新</el-button>
                <el-button plain type="primary" size="mini" @click="addUser">新增</el-button>
            </div>
            <el-table stripe :data="tableData" style="width: 100%" max-height="700" border size="small" v-loading="loading">
                <el-table-column label="用户名" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.account }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="密码" >
                    <template slot-scope="scope">
                        <el-input :value="scope.row.password" show-password></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="单位名称" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.unitName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="电话号码">
                    <template slot-scope="scope">
                        <span>{{ scope.row.phoneNumber }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="描述" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="单位地址" >
                    <template slot-scope="scope">
                        <span>{{ scope.row.unitPosition }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <div style="text-align: center">
                            <el-button type="danger" size="mini" @click="deleteUser(scope.row.id)">删除</el-button>
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
        </el-card>

        <el-dialog
            :destroy-on-close="true"
            title="添加用户"
            :visible.sync="dialogVisible"
            width="1064px"
            :close-on-click-modal="false">
                <add-user
                @closeDialog="closeDialog">

                </add-user>
        </el-dialog>


    </div>
</template>

<script>
import {_deleteUser, _getUsers, _psc, _userDetail} from "@/network/api/apiUser";
import addUser from '@/components/baseData/addUser'
export default {
    name: "setting",
    components: {
        addUser
    },
    data(){
        return{
            user:{},
            pagination: {
                size: 5,
                current: 1,
                total: 0
            },
            ifAdministrator: 0,
            tableData:[],
            loading:true,
            dialogVisible:false,

            form:{
                name:'',
                region:''
            },
        }
    },
    methods:{
        axiosUserDetail(){
            _userDetail(localStorage.getItem('userId')).then(res =>{
                if(res.data.code === 200){
                    this.user = res.data.data
                }
            })
        },
        axiosGetUsers(){
            _getUsers(this.pagination).then(res =>{
                if (res.data.code === 200) {
                    this.tableData = res.data.data.records
                    this.pagination.current = res.data.data.current
                    this.pagination.total = res.data.data.total
                    this.loading = false
                }else{
                    this.loading = false
                }
            })
        },
        handleCurrentChange(val) {
            this.loading = true
            this.pagination.current = val
            this.axiosGetUsers()
        },
        out(){
            this.$confirm("是否退出登录？",'提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.clearAndOut()
            })
        },
        passwordC(){
            this.$prompt('新密码', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType:'password',
                inputPattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                inputErrorMessage: '密码要求至少包含一个字母，一个数字，8位以上'
            }).then(({ value }) => {
                _psc(value).then(res =>{
                    if(res.data.code === 200){
                        this.$message.success('修改成功')
                        this.clearAndOut()
                    }
                })
            })
        },
        clearAndOut(){
            // 清除用户登录数据，退出到登录界面
            localStorage.removeItem("Authorization")
            localStorage.removeItem("userId")
            this.$router.replace('login')
        },
        refresh(){
            this.loading = true
            this.axiosGetUsers()
        },
        addUser(){
            this.dialogVisible = true
        },
        closeDialog(ifRefresh){
            this.dialogVisible = false
            if (ifRefresh)
                this.axiosGetUsers()
        },
        deleteUser(id){
            this.$confirm('此操作将删除该用户, 是否继续?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _deleteUser(id).then(res =>{
                    if (res.data.code === 200){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.axiosGetUsers()
                    }
                })
            })
        }
    },
    created() {
        this.ifAdministrator = (localStorage.getItem("userId") === '1');
        this.axiosUserDetail()
        if(localStorage.getItem("userId") === "1"){
            this.axiosGetUsers(this.pagination)
        }
    }
}
</script>

<style scoped>
    .info,.usersManage{
        margin: 10px;
    }
    .clearfix > span{
        font-weight: 900;
        opacity: 0.6;
        padding-right: 15px;
    }
    .pagination {
        margin-top: 20px;
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