import {baseReq} from './base'

function setVerify(){
    return {
        headers:{'Authorization':localStorage.getItem('token')}
    }
}

// 登录接口
export function login(account,password){
    return baseReq().post('user/login',{
        account:account,
        password:password
    })
}
