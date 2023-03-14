<template>
    <div class="hello">
        <button @click="createConnection">订阅</button>
    </div>
</template>

<script>
import * as mqtt from "mqtt/dist/mqtt.min";

export default {
    data() {
        return{
            option:{
                username: "admin",
                password: "admin",
                cleanSession : true,
                keepAlive:60,
                clientId: 'vue_' + Math.random().toString(16).substr(2, 8),
                connectTimeout: 4000
            }
        }
    },
    created() {

    },
    methods: {
        createConnection() {

            this.client = mqtt.connect('ws://211.159.225.217:8083/mqtt',this.option);
            this.client.on('connect', (e) => {
                console.log('连接成功')
                // 订阅主题
                this.client.subscribe(['test'],{ qos: 1 }, (err) => {
                    if (!err) {
                        console.log("订阅成功");
                        this.getMsg();
                    }
                })
            })
        },
        getMsg(){
            this.client.on('message', function (topic, message) {

                // message is Buffer
                console.log(message.toString())
                // this.client.end()
            })
        }
    },
};
</script>

<style scoped>

</style>
