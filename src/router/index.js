import Vue from 'vue'
import VueRouter from 'vue-router'

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
                redirect: 'liftData'
            },
            {
                path:'liftData',
                component:() => import('@/views/afterLogin/liftData')
            },
            {
                path:'alarmNow',
                component:() => import('@/views/afterLogin/alarmNow')
            },
            {
                path:'alarmHistory',
                component:() => import('@/views/afterLogin/alarmHistory')
            },
            {
                path:'liftPosition',
                component:() => import('@/views/afterLogin/liftPosition')
            },
            {
                path:'rescueInformation',
                component:() => import('@/views/afterLogin/rescueInformation')
            },
            {
                path:'setting',
                component:() => import('@/views/afterLogin/setting')
            },
        ],
    },
    {
        path:'/login',
        component:() => import('@/views/login'),
        meta:{notShowMenu:true}
    },
]
const router = new VueRouter({
    routes,
    mode: 'hash'
})


/*router.beforeEach((to, from, next)=>{
    if (to.path === '/login' || to.path === '/register'){
        next();
    }
    else if(localStorage.getItem('token') === null){
        next('/login')
    }
    else{
        if(store.state.verify === false){
            refresh().then(res =>{
                localStorage.setItem('token',res.data.data.token)
                next()
                store.commit('changeVerify')
            }).catch(() =>{
                // token过期，跳转到 login 界面
                next('/login')
            })
        }else{
            next()
        }
    }
})*/

export default router


