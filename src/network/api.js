import {baseReq} from './base'

function setVerify(){
    return {'Authorization':localStorage.getItem('Authorization')}
}

// 登录接口
export function login(account,password){
    return baseReq().post('user/login',{
        account:account,
        password:password
    })
}

// 查询电梯的详情 (分页查询)
export function liftData(params,json){
    return baseReq().post('lift/list',{
        userId:json.userId,
        liftTypeId:json.liftTypeId,
        liftCode:json.liftCode,
        liftName:json.liftName
    }, {
        params:{
            size:params.size,
            current:params.current
        },
        headers:setVerify()
    })
}

// 查询单个电梯信息
export function liftDataById(id){
    return baseReq().get('lift/' + id)
}
