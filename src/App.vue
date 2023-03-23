<template>
    <div id="app">
        <el-row class="tac">
            <el-col :span="12">
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="1">
                        <span class="iconfont icon-dianti"></span>
                        <span slot="title">电梯档案</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <span class="iconfont icon-jingbao"></span>
                            <span>告警</span>
                        </template>
                        <el-menu-item index="2-1">
                            <span class="iconfont icon-winfo-icon-quyusaomiao"></span>
                            <span slot="title">实时告警</span>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <span class="iconfont icon-shijian"></span>
                            <span slot="title">告警记录</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">
                        <span class="iconfont icon-ditu"></span>
                        <span slot="title">位置分布</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <span class="iconfont icon-miehuoqi"></span>
                        <span slot="title">救援信息</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <span class="iconfont icon-shezhi"></span>
                        <span slot="title">设置</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <div id="content">

        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>
    .iconfont{
        padding: 0 8px;
        font-size: 20px;
        color: #909399;
    }
    #app{
        display: flex;
    }
    #content{
        flex: 1;
    }
    .tac{
        width: 200px;
    }
    ::v-deep .el-col-12{
        width: 200px;
    }
    .el-menu{
        height: 100vh;
    }
</style>
