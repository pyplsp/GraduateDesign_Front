import {baseReq} from '../base'

// 登录接口
export function _login(account,password){
    return baseReq(false).post('user/login',{
        account:account,
        password:password
    })
}

// 获取单位名称
export function _unitName(){
    return baseReq(true).get('user/unitName')
}

// 获取单个单位详情
export function _userDetail(id){
    return baseReq(true).get('user/' + id)
}


// 修改密码
export function _psc(password){
    return baseReq(true).post('user/psc',{
        password:password
    })
}