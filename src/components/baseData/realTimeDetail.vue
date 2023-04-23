<template>
    <div class="root">
        <div class="image" :class="{imgBgOp:wsData.doorState===1,imgBgCl:wsData.doorState===-1}"></div>
        <div class="realTime">
            <div class="reText">
                <div class="realRealItem">
                    <div>当前速度</div>
                    <div id="speedBox">{{wsData.speed}}</div>
                </div>
                <div class="realRealItem">
                    <div>当前人数</div>
                    <div id="personNumBox">{{wsData.personNum}}</div>
                </div>
                <div class="realRealItem">
                    <div>当前楼层</div>
                    <div id="currFloorBox">{{wsData.currFloor}}</div>
                </div>
                <div class="realRealItem">
                    <div>是否有人</div>
                    <div id="hasPersonBox">
                        <span v-if="wsData.hasPerson !== null">
                            {{wsData.hasPerson === -1 ? '没人' : wsData.hasPerson === 0 ? '未知' : '有人'}}
                        </span>
                    </div>
                </div>
                <div class="realRealItem">
                    <div>网络类型</div>
                    <div id="networkTypeBox">{{wsData.networkType}}</div>
                </div>
                <div class="realRealItem">
                    <div>信号强度</div>
                    <div id="signalIntensityBox">{{wsData.signalIntensity}}</div>
                </div>
                <div class="realRealItem">
                    <div>上报时间</div>
                    <div id="timestampBox">{{wsData.timestamp}}</div>
                </div>
                <div class="realRealItem">
                    <div>控制器密码</div>
                    <div id="hasPasswordBox">
                        <span v-if="wsData.hasPassword !== null">
                            {{wsData.hasPassword === -1 ? '无密码' : '有密码'}}
                        </span>
                    </div>
                </div>
            </div>
            <div id="realIcon">
                <div style="background-color: #e8e8e8">
                    <span id="inCall" class="iconfont icon-building" :class="classJudgeButton(wsData.inCallState)"></span>
                    <span>梯内按键</span>
                </div>
                <div style="background-color: #e8e8e8">
                    <span id="outCall" class="iconfont icon-shangxia" :class="classJudgeButton(wsData.outCallState)"></span>
                    <span>楼外召唤</span>
                </div>
                <div id="unique" style="background-color: #e8e8e8">
                    <span class="iconfont" :class="classJudgeRunState(wsData.runState)"></span>
                    <span>运行方向</span>
                </div>
                <div id="ifFlatBox" class="status2">
                    <span class="iconfont icon-layers" :class="classJudge(wsData.ifFlat)"></span>
                    <span>平层信号</span>
                </div>
                <div id="checkStateBox" class="status0">
                    <span class="iconfont icon-shebeixiuli" :class="classJudge(wsData.checkState)"></span>
                    <span>检修信号</span>
                </div>
                <div id="commuStateBox" class="status1">
                    <span class="iconfont icon-xinhao" :class="classJudge(wsData.commuState)"></span>
                    <span>通讯信号</span>
                </div>
                <div id="powerStateBox" class="status0">
                    <span class="iconfont icon-dianyuan" :class="classJudge(wsData.powerState)"></span>
                    <span>电源信号</span>
                </div>
                <div id="jailStateBox" class="status0">
                    <span class="iconfont icon-dianti" :class="classJudge(wsData.jailState)"></span>
                    <span>困人信号</span>
                </div>
                <div id="fireStateBox" class="status2">
                    <span class="iconfont icon-huo" :class="classJudge(wsData.fireState)"></span>
                    <span>消防信号</span>
                </div>
                <div id="fullLoadStateBox" class="status2">
                    <span class="iconfont icon-duoren-renqun" :class="classJudge(wsData.fullLoadState)"></span>
                    <span>满载信号</span>
                </div>
                <div id="overLoadStateBox" class="status2">
                    <span class="iconfont icon-jinzhi" :class="classJudge(wsData.overLoadState)"></span>
                    <span>超载信号</span>
                </div>
                <div id="lockStateBox" class="status2">
                    <span class="iconfont icon-3suo" :class="classJudge(wsData.lockState)"></span>
                    <span>锁梯信号</span>
                </div>
                <div id="overSpeedStateBox" class="status0">
                    <span class="iconfont icon-overspeed" :class="classJudge(wsData.overSpeedState)"></span>
                    <span>超速信号</span>
                </div>
                <div id="runStateBox" class="status0">
                    <span class="iconfont icon-gearmore" :class="classJudge(wsData.runState)"></span>
                    <span>运行信号</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "realTimeDetail",
    data(){
        return{
            // mqtt相关
            message:{
                method:"realtime",
                wsSessionId:null,
                wsState:null
            },

            // 实时数据
            wsData:{
                speed:null, //当前速度
                personNum:null, //当前人数
                currFloor:null, //当前楼层
                hasPerson:null, //是否有人
                networkType:null, //网络类型
                signalIntensity:null, //信号强度
                timestamp:null, //上报时间
                hasPassword:null, //控制器密码

                doorState:-1,
                inCallState:0,
                outCallState:0,
                ifFlat:0,
                checkState:0,
                commuState:0,
                powerState:0,
                jailState:0,
                fireState:0,
                fullLoadState:0,
                overLoadState:0,
                lockState:0,
                overSpeedState:0,
                runState:0
            },

        }
    },
    props: {
        liftCode:{
            type:String
        },
    },
    created() {
        this.message.wsSessionId = this.generateRandomNumber();
    },
    mounted() {
        this.publish(this.liftCode,1)
        this.subscribe('REALTIME/' + this.message.wsSessionId)
    },
    beforeDestroy() {
        this.publish(this.liftCode,0)
        this.unSubscribe('REALTIME/' + this.message.wsSessionId)
    },
    methods:{
        // 数据请求
        publish(topic,ifOpen){
            if (ifOpen)
                this.message.wsState = "open"
            else
                this.message.wsState = "close"
            this.$store.state.mqttClient.publish(topic, JSON.stringify(this.message));
        },
        // 订阅并接收数据
        subscribe(topic){
            this.$store.state.mqttClient.subscribe([topic],{ qos: 0 }, (err) => {
                if (!err) {
                    console.log('订阅主题: ' + topic);
                    this.$store.state.mqttClient.on('message', (top, message) => {
                        if(top === topic){
                            this.wsData = JSON.parse(message.toString())
                        }
                    })
                }
            })
        },
            // 取消订阅
        unSubscribe(topic){
            this.$store.state.mqttClient.unsubscribe(topic,(err)=>{
                if (!err) {
                    console.log('取消订阅: ' + topic);
                }
            })
        },
        generateRandomNumber() {
            return Array(8).fill().map(() => Math.floor(Math.random() * 10)).join('');
        },

        classJudge(status){
            return {'OK':status === 1,'Bad':status === -1}
        },

        classJudgeRunState(status){
            return {'icon-xiangshang1':status === 1,'icon-xiangxia1':status === -1,'icon-24gf-stopCircle':status === 0}
        },

        classJudgeButton(status){
            return {'OK':status === 1}
        },
    },
}
</script>

<style scoped>
    .root{
        display: flex;
    }
    .image{
        padding: 0 10px;
        height: 480px;
        width: 310px;
    }
    .imgBgOp{
        background-image: url("/src/assets/image/opened.png");
    }
    .imgBgCl{
        background-image: url("/src/assets/image/closed.png");
    }
    .realTime{
        width: 754px;
        padding: 10px;
    }
    .reText{
        display: grid;
        grid-template-columns: 3fr 2fr;
        grid-gap: 0.225rem;
        background-color: #fafafa;
    }
    .realRealItem {
        display: flex;
        height: 2.5rem;
        line-height: 2.5rem;
    }
    .realRealItem > div:nth-child(1) {
        color: #7b7e83;
        width: 6rem;
        padding-left: 0.7rem;
    }
    .realRealItem > div:nth-child(2) {
        color: #606266;
        padding-left: 1.25rem;
        font-weight: 600;
        background-color: white;
        flex: 1;
    }
    #realIcon {
        display: grid;
        margin-top: 1.2rem;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 1px;
        color: #7b7e83;
        background-color: #f5f1f1;
        border: 1px solid #f5f1f1;
    }
    #realIcon > div {
        background-color: white;
        height: 6rem;
        text-align: center;
        padding: 1rem 0 1rem 0;
        box-sizing: border-box;
    }
    #realIcon > div > span:nth-child(1) {
        font-size: 2rem;
    }
    #realIcon > div > span:last-child {
        display: block;
        padding-top: 0.5rem;
        font-size: 0.5rem;
    }

    .OK{
        color: #13ce66;
    }
    .Bad{
        color: red;
    }

    .UP{

    }

</style>