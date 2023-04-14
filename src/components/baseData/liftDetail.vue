<template>
    <div>
        <div>
            <span>操作</span>
            <div class="btn">
                <el-button type="primary" size="mini" @click="editor" v-if="readyToEditor">编辑</el-button>
                <el-button type="primary" size="mini" @click="submit" v-else>完成</el-button>
                <el-button type="info" size="mini" @click="cancel">取消</el-button>
                <el-button type="danger" size="mini" @click="deleteLf">删除</el-button>
                <el-button size="mini" @click="close">关闭</el-button>
            </div>
        </div>


        <div class="baseData">
            <span>基本信息</span>
            <el-descriptions class="margin-top" :column="3" border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        设备代码
                    </template>
                    <el-input :disabled = true v-model="detailData.liftCode"></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        设备名称
                    </template>
                    <el-input :disabled="readyToEditor" v-model="detailData.liftName"></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        设备类型
                    </template>
                    <el-input :disabled="readyToEditor" v-model="detailData.liftTypeName"></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        设备经度
                    </template>
                    <el-input :disabled="readyToEditor" v-model="detailData.positionX"></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        设备纬度
                    </template>
                    <el-input :disabled="readyToEditor" v-model="detailData.positionY"></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        所属单位
                    </template>
                    <el-input :disabled = true v-model="detailData.userId"></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        描述
                    </template>
                    <el-input  type="textarea" :disabled="readyToEditor" v-model="detailData.description"></el-input>
                </el-descriptions-item>
            </el-descriptions>
        </div>

        <div class="position">
            <span>电梯位置</span>

        </div>

    </div>
</template>

<script>
import {deleteLift} from "@/network/api";

export default {
    name: "liftDetail",
    props: {
        detailData: {
            type: Object,
            require: true,
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {
            readyToEditor:true,
            detailDataBackUp:{},
            btnShow:true
        };
    },
    methods:{
        editor(){
            this.detailDataBackUp = Object.assign({},this.detailData)
            this.readyToEditor = false
        },
        cancel(){
            if (this.readyToEditor === false){
                this.readyToEditor = true
                this.detailData = this.detailDataBackUp
            }
        },
        submit(){

        },
        deleteLf(){
            console.log(12)
            deleteLift(this.detailData.id)
        },
        close(){
            this.$emit('closeDialog')
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
</style>