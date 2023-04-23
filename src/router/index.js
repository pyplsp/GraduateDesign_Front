import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store/store";

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect:'/afterLogin'
    },
    {
        path:'/afterLogin',
        component:() => import('@/views/afterLogin/afterLogin'),
        children:[
            {
                path: '',
                redirect: 'overview'
            },
            {
                path:'overview',
                component:() => import('@/views/views/baseData/overview')
            },
            {
                path:'liftData',
                component:() => import('@/views/views/baseData/liftData')
            },
            {
                path:'internetOfThings',
                component:() => import('@/views/views/internetOfThings')
            },
            {
                path: 'alarmHistory',
                component: () => import('@/views/views/baseData/alarmHistory')
            },
            {
                path:'rescueHistory',
                component:() => import('@/views/views/baseData/rescueHistory')
            },
            {
                path:'liftPosition',
                component:() => import('@/views/views/baseData/liftPosition')
            },
            {
                path:'setting',
                component:() => import('@/views/views/setting')
            },
        ],
    },
    {
        path:'/login',
        component:() => import('@/views/beforeLogin/login'),
        meta:{notShowMenu:true}
    },

]
const router = new VueRouter({
    routes,
    mode: 'hash'
})


router.beforeEach((to, from, next)=>{
    if (to.path === '/login'){
        // 如果主动到达登录页面，应该尝试断开mqtt连接
        if(store.state.mqttClient.connected === true)
            store.commit("mqttClientDisconnect")
        next();
    }
    else if(localStorage.getItem('Authorization') === null){
        if (from.path !== 'login')
            next('/login')
    }
    else{
        next()
    }
})

export default router


