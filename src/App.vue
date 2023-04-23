<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'App',
    beforeDestroy() {
        // 断开mqtt连接
        this.$store.commit("mqttClientDisconnect")
    }
}
</script>

<style scoped>
    @import url('assets/css/base.css');
</style>
