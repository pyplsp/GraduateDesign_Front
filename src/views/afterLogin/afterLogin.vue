<template>
    <div id="afterLogin">
        <div id="nav">
            <el-row class="tac">
                <el-col :span="12">
                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        :default-active="defaultActive"
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

            <div id="mqttStatus">
                144161
            </div>
        </div>
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
            myMap:new Map([
                ['1','overview'],
                ['2-1','liftData'],
                ['2-2','liftPosition'],
                ['2-3','alarmHistory'],
                ['2-4','rescueHistory'],
                ['3','internetOfThings'],
                ['4','setting'],
            ]),
            defaultActive:"",
        }
    },
    methods: {
        isSelect(index){
            if(this.nowIndex === index)
                return
            this.nowIndex = index
            this.$router.replace(String(this.myMap.get(index)))
        },
        subscribe(topic){
            this.$store.state.mqttClient.subscribe([topic],{ qos: 2 }, (err) => {
                if (!err) {
                    console.log('订阅主题: ' + topic);
                    this.$store.state.mqttClient.on('message', (top, message) => {
                        if(top === topic){
                            let payload = JSON.parse(message.toString())
                            this.$notify({
                                type: 'warning',
                                title: '告警提示',
                                dangerouslyUseHTMLString: true,
                                message: `
                                <div>设备代码：${payload.liftIDNo}</div>
                                <div>发生时间：${payload.alarmTime}</div>
                                <div>告警类型：${payload.alarmTypeName}</div>
                                <br />
                                <div>请转到<a style="color: var(--colorActive-theme)">告警记录</a>界面查看详情</div>
                            `,
                                duration: 0,
                            });
                        }
                    })
                }
            })
        },
    },
    created() {
        let path = this.$route.path.split('/')
        let temp = new Map(
            Array.from(this.myMap.entries()).map(([key, value]) => [value, key])
        )
        this.defaultActive = temp.get(path[path.length-1])
    },
    mounted() {
        this.subscribe('ALARM/' + localStorage.getItem('userId'))
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
        padding:10px 0 10px 10px;
        position: relative;
        box-sizing: border-box;
        overflow-y: scroll;
        background-color: var(--colorBackground-theme);
    }
    #content::-webkit-scrollbar{
        width: 10px;
    }
    #content::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background: var(--colorActive-theme);
    }
    #nav{
        width: 200px;
    }
    #mqttStatus{
        height: 30vh;
        color: white;
        background-color: var(--colorActive-theme);
    }
    ::v-deep .el-col-12{
        width: 201px;
    }
    .el-menu{
        height: 70vh;
    }
</style>
