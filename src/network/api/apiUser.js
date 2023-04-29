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

// 获取用户列表
export function _getUsers(params){
    return baseReq(true).get('user/list',{
        params:{
            size:params.size,
            current:params.current
        }
    })
}

// 添加用户
export function _addUser(json){
    return baseReq(true).post('user',json)
}

// 删除用户
export function _deleteUser(id){
    return baseReq(true).delete('user/' + id)
}