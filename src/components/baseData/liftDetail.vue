<template>
    <div>
        <div>
            <span>操作</span>
            <div class="btn">
                <el-button type="primary" size="mini" plain @click="editor" v-if="readyToEditor">编辑</el-button>
                <el-button type="primary" size="mini" plain @click="submit" v-else>完成</el-button>
                <el-button type="info" size="mini" plain @click="cancel">取消</el-button>
                <el-button type="danger" size="mini" plain @click="deleteLf">删除</el-button>
                <el-button size="mini" @click="close(false)">关闭</el-button>
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
                    <el-input :disabled = true v-model="detailData.unitName"></el-input>
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
            <baidu-map class="bm-view" :scroll-wheel-zoom="true" :center="{lng: detailData.positionX, lat: detailData.positionY}" :zoom="15">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-marker :position="{lng: detailData.positionX, lat: detailData.positionY}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" />
            </baidu-map>
        </div>

    </div>
</template>

<script>
import {_deleteLift, _modifyLift} from "@/network/api/apiLift";

export default {
    name: "liftDetail",
    props: {
        detailData: {
            type: Object,
            require: true,
            default: function () {
                return {
                    // positionX:112.000,
                    // positionY:38.000
                }
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
            this.$confirm('此操作将更新该设备, 是否继续?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _modifyLift(this.detailData.id,this.detailData).then(res=>{
                    if (res.data.code === 200){
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        });
                        this.close(true)
                    }
                })
            })
        },
        deleteLf(){
            this.$confirm('此操作将删除该设备, 是否继续?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _deleteLift(this.detailData.id).then(res=>{
                    if (res.data.code === 200){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.close(true)
                    }
                })
            })

        },
        close(ifReload){
            this.$emit('closeDialog',ifReload)
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
.bm-view {
    width: 100%;
    height: 500px;
}
</style>