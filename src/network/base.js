import axios from 'axios'
import { Message } from 'element-ui'
import {showMessage} from '@/utils/utils'
import router from '@/router/index.js'
import NProgress from 'nprogress';


axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

function setVerify(){
    return {'Authorization':localStorage.getItem('Authorization')}
}

// ifVerify参数，表示是否要传输token
export function baseReq(ifVerify){
    // 进行基础配置
    const instance = axios.create({
        baseURL:'http://127.0.0.1:8080/api',
        timeout:8000,
    })

    // 设置请求拦截器
    instance.interceptors.request.use(function (config) {
        // 2xx 范围内的状态码都会触发该函数。
        // TODO:在发送请求之前做些什么
        NProgress.start();
        if(ifVerify){
            config.headers = setVerify()
        }
        return config;
    }, function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // TODO:对请求错误做点什么

        return Promise.reject(error);
    });

    //响应拦截器
    instance.interceptors.response.use(function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // TODO:对响应数据做点什么
        NProgress.done()
        return response;
    }, (error) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // TODO:对响应错误做点什么
        NProgress.done()
        // 返回401表示请求验证失败，登录信息过期,让其返回到登录界面
        if(error.response.status === 401){
            router.replace('/login')
        }else{
            // 显示加载错误信息
            showMessage('网络错误','error')
        }
        return Promise.reject(error);
    });

    return instance
}


