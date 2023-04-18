let _store = {
    mqttConfig:{
        username: "admin",
        password: "admin",
        cleanSession : true,
        keepAlive:60,
        clientId: 'vue_' + Math.random().toString(16).substr(2, 8),
        connectTimeout: 4000
    }
}

export default _store;