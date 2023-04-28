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
                    <el-button type="primary" size="mini" @click="">编辑信息</el-button>
                    <el-button size="mini" @click="passwordC">修改密码</el-button>
                    <el-button type="danger" size="mini" @click="out">退出登录</el-button>
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
        <el-card class="manage">
            <div slot="header" class="clearfix">账号管理</div>

        </el-card>
    </div>
</template>

<script>
import {_psc, _userDetail} from "@/network/api/apiUser";

export default {
    name: "setting",
    data(){
        return{
            user:{}
        }
    },
    methods:{
        axiosUserDetiail(){
            _userDetail(localStorage.getItem('userId')).then(res =>{
                if(res.data.code === 200){
                    this.user = res.data.data
                }
            })
        },
        out(){
            this.$confirm("是否退出登录？",'提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                localStorage.removeItem("Authorization")
                localStorage.removeItem("userId")
                this.$router.replace('login')
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
                        localStorage.removeItem("Authorization")
                        localStorage.removeItem("userId")
                        this.$router.replace('login')
                    }
                })
            })
        },
    },
    created() {
        this.axiosUserDetiail()
    }

}
</script>

<style scoped>
    .info,.manage{
        margin: 10px;
    }
    .clearfix{
        font-weight: 900;
        opacity: 0.6;
    }
    ::v-deep .el-input__inner{
        border: none;
    }
</style>