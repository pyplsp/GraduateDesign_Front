<template>
    <div>
        <div>
            <span>操作</span>
            <div class="btn">
                <el-button type="primary" size="mini" plain @click="submit">提交</el-button>
                <el-button size="mini" @click="close(false)">关闭</el-button>
            </div>
        </div>
        <div class="baseData">
            <span>基本信息</span>
            <div>
                <el-form ref="form" :model="form" :rules="rules">
                    <el-descriptions class="margin-top" :column="3" border>
                        <el-descriptions-item>
                            <template slot="label">
                                <span style="color: red">* </span>
                                用户名
                            </template>
                            <el-form-item prop="account">
                                <el-input v-model="form.account"></el-input>
                            </el-form-item>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <span style="color: red">* </span>
                                密码
                            </template>
                            <el-form-item prop="password">
                                <el-input v-model="form.password"></el-input>
                            </el-form-item>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                <span style="color: red">* </span>
                                单位名称
                            </template>
                            <el-form-item prop="unitName">
                                <el-input v-model="form.unitName"></el-input>
                            </el-form-item>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                电话号码
                            </template>
                            <el-input v-model="form.phoneNumber"></el-input>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label">
                                描述
                            </template>
                            <el-input v-model="form.description"></el-input>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-form>
            </div>

        </div>

    </div>
</template>

<script>
import {_addUser} from "@/network/api/apiUser";

export default {
    name: "adduser",
    data() {
        return {
            form: {
                account: '',
                password: '',
                unitName: '',
                phoneNumber: null,
                description: '',
                ifAdministrators:0,
            },
            rules: {
                account: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 6, max: 10, message: '长度在 6 到 10 个字符之间', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入初始密码', trigger: 'blur'},
                    {min: 6, max: 10, message: '初始密码在 6 到 10 个字符之间', trigger: 'blur'}
                ],
                unitName: [
                    {required: true, message: '请输入单位名称', trigger: 'blur'},
                ]
            },
        }
    },
    methods:{
        submit(){
            this.$refs['form'].validate((valid) => {
                if(valid){
                    _addUser(this.form).then(res =>{
                        if(res.data.code === 200){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.close(true)
                        }
                    })
                }else {
                    return false;
                }
            })
        },
        close(ifReload){
            this.$emit('closeDialog',ifReload)
        },
    }
}
</script>

<style scoped>
    .baseData {
        margin: 20px 0;
    }

    .btn {
        background-color: var(--colorBackground-theme);
        padding: 5px 10px;
        margin-bottom: 20px;
    }

    .btn, .baseData > div {
        margin-top: 10px;
    }
</style>