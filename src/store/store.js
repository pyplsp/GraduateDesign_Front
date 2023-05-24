import Vue from 'vue'
import Vuex from 'vuex'
import * as mqtt from "mqtt/dist/mqtt.min";
// 1.安装插件
Vue.use(Vuex)

// 2.创建对象 new Vuex.Store
const store = new Vuex.Store({
    // 这5个对象一般都是固定的
    state: { //保存状态
        mqttClient:{
            connect:false
        },
        mqttUrl:'ws://175.178.47.147:8083/mqtt',
        mqttConfig:{
            username: "admin",
            password: "admin",
            cleanSession : true,
            keepAlive:60,
            clientId: 'vue_PY_' + Math.random().toString(16).substr(2, 8),
            connectTimeout: 4000
        }
    },
    mutations: {
        mqttClientConnect(state){
            state.mqttClient = mqtt.connect(state.mqttUrl,state.mqttConfig)
            state.mqttClient.on('connect',()=>{
                console.log('成功连接mqtt服务器')
            })
        },
        mqttClientDisconnect(state){
            try {
                state.mqttClient.end(false, () => {
                    console.log('成功断开mqtt服务器')
                })
            } catch (error) {
                console.log('实时数据：断开mqtt服务器失败', error.toString())
            }
        },
    },
    actions: { // 如果有异步操作在这里写 比如网络请求

    },
    getters: {

    },
    modules: {

    }
})
// 3.导出store对象
export default store