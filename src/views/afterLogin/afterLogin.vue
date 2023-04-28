<template>
    <div id="afterLogin">
        <div id="nav">
            <div id="myN">
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
                                <span slot="title">
                                    <span class="iconfont icon-zhexiantu"></span>
                                    数据概览
                                </span>
                            </el-menu-item>
                            <el-submenu index="2">
                                <template slot="title">
                                    <span>
                                        <span class="iconfont icon-xiaofangdianti"></span>
                                        电梯数据
                                    </span>
                                </template>
                                <el-menu-item index="2-1">
                                    <span slot="title">
                                        <span class="iconfont icon-duowenjian"></span>
                                        电梯档案
                                    </span>
                                </el-menu-item>
                                <el-menu-item index="2-2">
                                    <span slot="title">
                                        <span class="iconfont icon-ditu"></span>
                                        电梯位置
                                    </span>
                                </el-menu-item>
                                <el-menu-item index="2-3">
                                    <span slot="title">
                                        <span class="iconfont icon-jinggao"></span>
                                        告警记录
                                    </span>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item index="3">
                                <span slot="title">
                                    <span class="iconfont icon-monitor-camera-full"></span>
                                    物联网
                                </span>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <span slot="title">
                                    <span class="iconfont icon-gearmore"></span>
                                    设置
                                </span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </div>
            <div id="mqttStatus">
                <el-card class="netBoard">
                    <div slot="header">
                        物联网状态
                        <span v-if="connectNet" class="yes el-icon-check"></span>
                        <span v-else @click="connectMqtt" class="refresh el-icon-refresh-left"></span>
                    </div>
                    <div>
                        <span v-if="connectNet">物联网已连接 <span class="el-icon-success" style="color: var(--colorCorrect-theme)"></span></span>
                        <span v-else>物联网未连接 <span class="el-icon-warning" style="color: var(--colorError-theme)"></span></span>
                    </div>
                    <br />
                    <div>
                        <span v-if="subAlarm">告警已订阅 <span class="el-icon-success" style="color: #5affa0"></span></span>
                        <span v-if="!ifAdministrator && !subAlarm">告警未订阅 <span class="el-icon-success" style="color: #ff5454"></span></span>
                    </div>
                </el-card>
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
            ifAdministrator: false,
            nowIndex:'',
            myMap:new Map([
                ['1','overview'],
                ['2-1','liftData'],
                ['2-2','liftPosition'],
                ['2-3','alarmHistory'],
                ['3','internetOfThings'],
                ['4','setting'],
            ]),
            defaultActive:"",

            connectNet:false,
            subAlarm:false,

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
                    this.subAlarm = true
                    this.$store.state.mqttClient.on('message', (top, message) => {
                        if(top === topic){
                            let payload = JSON.parse(message.toString())
                            if(payload.alarmStatus === 0){
                                this.$notify({
                                    type: 'success',
                                    title: '告警解除',
                                    dangerouslyUseHTMLString: true,
                                    message: `
                                    <div>设备代码：${payload.liftIDNo}</div>
                                    <div>解除时间：${payload.alarmTime}</div>
                                    <div>告警类型：${payload.alarmTypeName}</div>
                                    <br />
                                    <div>请转到<a style="color: var(--colorActive-theme)">告警记录</a>界面查看详情</div>
                                `,
                                    duration: 0,
                                });
                            }else{
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
                        }
                    })
                }
            })
        },
        connectMqtt(){
            this.$store.commit("mqttClientConnect")
            this.$store.state.mqttClient.on('connect',()=>{
                this.connectNet = true
                if(!this.ifAdministrator){
                    this.subscribe('ALARM/' + localStorage.getItem('userId'))
                }
            })
        },
    },
    created() {
        this.ifAdministrator = (localStorage.getItem("userId") === '1');
        let path = this.$route.path.split('/')
        let temp = new Map(
            Array.from(this.myMap.entries()).map(([key, value]) => [value, key])
        )
        this.defaultActive = temp.get(path[path.length-1])
    },
    mounted() {
        this.connectMqtt()
    },
}
</script>

<style scoped>
    #afterLogin{
        height: 100vh;
        display: flex;
        overflow: hidden;
    }
    #content{
        min-height: 750px;
        flex: 1;
        padding:10px 10px 10px 10px;
        position: relative;
        box-sizing: border-box;
        overflow-y: scroll;
        background-color: var(--colorBackground-theme);
    }
    #content::-webkit-scrollbar{
        display: none;
    }
    #nav{
        width: 200px;
        height: 100%;
        background-color: #545c64;
        min-height: 750px;
    }
    #myN{
        height: 70%;
    }
    .netBoard{
        background-color: #68717a;
        color: white
    }
    #mqttStatus{
        height: 30%;
        font-weight: 900;
        color: white;
        padding: 10px;
        box-sizing: border-box;

    }
    .refresh{
        float: right;
        cursor: pointer ;
    }
    .yes{
        float: right;
    }
    ::v-deep .el-col-12{
        width: 201px;
    }
</style>
