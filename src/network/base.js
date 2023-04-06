import axios from 'axios'

export function baseReq(){
    // 进行基础配置
    const instance = axios.create({
        baseURL:'http://127.0.0.1:8080/api',
        timeout:3000,
    })

    // 设置请求拦截器
    instance.interceptors.request.use(function (config) {
        // 2xx 范围内的状态码都会触发该函数。
        // TODO:在发送请求之前做些什么

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

        return response;
    }, (error) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        // TODO:对响应错误做点什么

        return Promise.reject(error);
    });

    return instance
}


