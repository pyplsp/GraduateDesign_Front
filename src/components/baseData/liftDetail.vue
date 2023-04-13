<template>
    <div>
        <div>
            <span>操作</span>
            <div class="btn">
                <el-button type="primary" size="mini">编辑</el-button>
                <el-button type="danger" size="mini">删除</el-button>
                <el-button size="mini">关闭</el-button>
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
                    <el-input v-model="detailData.liftCode"></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        设备名称
                    </template>
                    <el-input v-model="detailData.liftName"></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        设备类型
                    </template>
                    <el-input v-model="detailData.liftTypeId"></el-input>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-tickets"></i>
                        设备经纬度
                    </template>
                    {{ detailData.positionX }}, {{ detailData.positionY }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        设备位置
                    </template>

                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        所属单位
                    </template>
                    {{ detailData.userId }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        描述
                    </template>
                    {{ detailData.description }}
                </el-descriptions-item>
            </el-descriptions>
        </div>

        <div class="position">
            <span>电梯位置</span>

        </div>

    </div>
</template>

<script>
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
        return {};
    },
    created() {

    }
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

::v-deep .el-input__inner {
    border: none;
}
</style>