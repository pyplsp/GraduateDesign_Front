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
                        <span slot="title">数据概览</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <span>电梯数据</span>
                        </template>
                        <el-menu-item index="2-1">
                            <span slot="title">电梯档案</span>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <span slot="title">电梯位置</span>
                        </el-menu-item>
                        <el-menu-item index="2-3">
                            <span slot="title">告警记录</span>
                        </el-menu-item>
                        <el-menu-item index="2-4">
                            <span slot="title">救援记录</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">
                        <span slot="title">物联网</span>
                    </el-menu-item>
                    <el-menu-item index="4">
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
    data(){
        return{
            nowIndex:'',
        }
    },
    methods: {
        isSelect(index){
            if(this.nowIndex === index)
                return
            this.nowIndex = index

            switch (index[0]){
                case '1':
                    this.$router.replace('overview')
                    break;
                case '2':
                    if(index === '2-1')
                        this.$router.replace('liftData')
                    else if(index === '2-2')
                        this.$router.replace('liftPosition')
                    else if(index === '2-3')
                        this.$router.replace('alarmHistory')
                    else if(index === '2-4')
                        this.$router.replace('rescueHistory')
                    break;
                case '3':
                    this.$router.replace('internetOfThings')
                    break;
                case '4':
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
        background-color: #f0f2f5;
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
