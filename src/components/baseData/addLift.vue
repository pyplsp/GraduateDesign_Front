<template>
    <div>
        <div>
            <span>操作</span>
            <div class="btn">
                <el-button type="primary" size="mini" plain @click="submit('ruleForm')">提交</el-button>
                <el-button size="mini" @click="close(false)">关闭</el-button>
            </div>
        </div>

        <div class="baseData">
            <span>基本信息</span>
            <el-form :model="detailData" :rules="rules" ref="ruleForm">
                <el-descriptions class="margin-top" :column="3" border>
                    <el-descriptions-item>
                        <template slot="label">
                            <span style="color: red">* </span>
                            设备代码
                        </template>
                        <el-form-item prop="liftCode">
                            <el-input v-model="detailData.liftCode" placeholder="请输入设备代码"></el-input>
                        </el-form-item>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <span style="color: red">* </span>
                            设备名称
                        </template>
                        <el-form-item prop="liftName">
                            <el-input v-model="detailData.liftName" placeholder="请输入设备名称"></el-input>
                        </el-form-item>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <span style="color: red">* </span>
                            设备类型
                        </template>
                        <el-form-item prop="liftTypeId">
                            <el-select v-model="detailData.liftTypeId" placeholder="电梯类型">
                                <el-option :label="item.liftTypeName" :value="item.id" v-for="(item,index) in liftType"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            设备经度
                        </template>
                        <el-input v-model="detailData.positionX" placeholder="请输入设备经度"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            设备纬度
                        </template>
                        <el-input v-model="detailData.positionY" placeholder="请输入设备纬度"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            单位
                        </template>
                        本单位，不可编辑
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            描述
                        </template>
                        <el-input  type="textarea" v-model="detailData.description" placeholder="描述"></el-input>
                    </el-descriptions-item>
                </el-descriptions>
            </el-form>

        </div>
    </div>
</template>

<script>
import {_addLift} from "@/network/api/apiLift";

export default {
    name: "addLift",
    props:{
        liftType:{
            type: Object,
            require: true,
            default: function () {
                return {}
            }
        }
    },
    data(){
        return{
            detailData:{
                description:"",
                internetStatus:0,
                liftCode:"",
                liftName:"",
                liftTypeId:null,
                positionX:"",
                positionY:"",
            },
            rules:{
                liftCode: [
                    { required: true, message: '请输入电梯设备代码', trigger: 'blur' },
                    { min: 16, max: 21, message: '长度在 16 到 21 个字符', trigger: 'blur' }
                ],
                liftName: [
                    { required: true, message: '请输入电梯名称', trigger:'blur'},
                    { min: 2,max:20, message: '至少输入 2 个字符', trigger: 'blur' }
                ],
                liftTypeId:[
                    { required: true, message: '请选择电梯类型', trigger:'blur'},
                ]
            }
        }
    },
    methods:{
        close(ifReload){
            this.$emit('closeDialog',ifReload)
        },
        submit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _addLift(this.detailData).then(res =>{
                        if(res.data.code === 200){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.close(true)
                        }else{
                            this.$message.error('添加失败');
                        }
                    })
                } else {
                    return false;
                }
            });
        },
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

    .position {
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

    ::v-deep .el-form-item__error{
        padding-top: 0;
    }
</style>