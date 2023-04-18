<template>
    <div class="root">
        <div class="image"><img src="@/assets/image/opened.png"></div>
        <div class="realTime">
            <div class="reText">
                <div class="realRealItem">
                    <div>当前速度</div>
                    <div id="speedBox">0 mm/s</div>
                </div>
                <div class="realRealItem">
                    <div>当前人数</div>
                    <div id="personNumBox"></div>
                </div>
                <div class="realRealItem">
                    <div>当前楼层</div>
                    <div id="currFloorBox">1</div>
                </div>
                <div class="realRealItem">
                    <div>是否有人</div>
                    <div id="hasPersonBox">无人</div>
                </div>
                <div class="realRealItem">
                    <div>网络类型</div>
                    <div id="networkTypeBox">有线</div>
                </div>
                <div class="realRealItem">
                    <div>信号强度</div>
                    <div id="signalIntensityBox">强</div>
                </div>
                <div class="realRealItem">
                    <div>上报时间</div>
                    <div id="timestampBox">2023-04-18 17:19:09</div>
                </div>
                <div class="realRealItem">
                    <div>控制器密码</div>
                    <div id="hasPasswordBox">无密码</div>
                </div>
            </div>
            <div id="realIcon">
                <div style="background-color: #e8e8e8">
                    <span id="inCall" class="iconfont icon-building" style="color: rgb(123, 126, 131);"></span>
                    <span>梯内按键</span>
                </div>
                <div style="background-color: #e8e8e8">
                    <span id="outCall" class="iconfont icon-shangxia" style="color: rgb(123, 126, 131);"></span>
                    <span>楼外召唤</span>
                </div>
                <div id="unique" style="background-color: #e8e8e8">
                    <span class="iconfont icon-24gf-stopCircle" style=""></span>
                    <span style="color: rgb(18, 150, 219); font-size: 2rem; display: none;" class="iconfont icon-xiangshang1"></span>
                    <span style="color: rgb(18, 150, 219); font-size: 2rem; display: none;" class="iconfont icon-xiangxia1"></span>
                    <span>运行方向</span>
                </div>
                <div id="ifFlatBox" class="status2">
                    <span class="iconfont icon-layers"></span>
                    <span>平层信号</span>
                </div>
                <div id="checkStateBox" class="status0">
                    <span class="iconfont icon-shebeixiuli"></span>
                    <span>检修信号</span>
                </div>
                <div id="commuStateBox" class="status1">
                    <span class="iconfont icon-xinhao"></span>
                    <span>通讯信号</span>
                </div>
                <div id="powerStateBox" class="status0">
                    <span class="iconfont icon-dianyuan"></span>
                    <span>电源信号</span>
                </div>
                <div id="jailStateBox" class="status0">
                    <span class="iconfont icon-dianti"></span>
                    <span>困人信号</span>
                </div>
                <div id="fireStateBox" class="status2">
                    <span class="iconfont icon-huo"></span>
                    <span>消防信号</span>
                </div>
                <div id="fullLoadStateBox" class="status2">
                    <span class="iconfont icon-duoren-renqun"></span>
                    <span>满载信号</span>
                </div>
                <div id="overLoadStateBox" class="status2">
                    <span class="iconfont icon-jinzhi"></span>
                    <span>超载信号</span>
                </div>
                <div id="lockStateBox" class="status2">
                    <span class="iconfont icon-3suo"></span>
                    <span>锁梯信号</span>
                </div>
                <div id="overSpeedStateBox" class="status0">
                    <span class="iconfont icon-overspeed"></span>
                    <span>超速信号</span>
                </div>
                <div id="runStateBox" class="status0">
                    <span class="iconfont icon-gearmore"></span>
                    <span>运行信号</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "realTimeDetail"
}
</script>

<style scoped>
    .root{
        display: flex;
    }
    .image{
        padding: 0 10px;
    }
    .realTime{
        width: 100%;
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
</style>