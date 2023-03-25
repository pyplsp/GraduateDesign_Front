<template>
    <div id="afterLogin">
        <el-row class="tac">
            <el-col :span="12">
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    @select="isSelect"
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
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "afterLogin",
    methods: {
        isSelect(index){
            switch (index[0]){
                case '1':
                    this.$router.replace('liftData')
                    break;
                case '2':
                    if(index === '2-1')
                        this.$router.replace('alarmNow')
                    else if(index === '2-2')
                        this.$router.replace('alarmHistory')
                    break;
                case '3':
                    this.$router.replace('liftPosition')
                    break;
                case '4':
                    this.$router.replace('rescueInformation')
                    break;
                case '5':
                    this.$router.replace('setting')
                    break;
            }
        }
    },
}
</script>

<style scoped>
    .iconfont{
        padding: 0 8px;
        font-size: 20px;
        color: #909399;
    }
    #afterLogin{
        display: flex;
        overflow: hidden;
    }
    #content{
        height: 100vh;
        flex: 1;
        padding:10px;
        position: relative;
        box-sizing: border-box;
        overflow-y: scroll;
    }
    #content::-webkit-scrollbar{
        width: 10px;
    }
    #content::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background: var(--colorActive-theme);
    }
    .tac{
        width: 200px;
    }
    ::v-deep .el-col-12{
        width: 201px;
    }
    .el-menu{
        height: 100vh;
    }
</style>
