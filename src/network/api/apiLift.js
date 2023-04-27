import {baseReq} from '../base'

// 查询电梯的详情 (分页查询)
export function _liftData(params,json){
    return baseReq(true).post('lift/list',json, {
        params:{
            size:params.size,
            current:params.current
        },
    })
}

// 查询单个电梯信息
export function _liftDataById(id){
    return baseReq(true).get('lift/' + id)
}

// 添加电梯
export function _addLift(json){
    return baseReq(true).post('lift/',json)
}

// 提交电梯修改信息
export function _modifyLift(id,json){
    return baseReq(true).put('lift/' + id,json)
}

// 删除电梯
export function _deleteLift(id){
    return baseReq(true).delete('lift/' + id)
}

// 查询所有电梯位置信息
export function _liftPosition(){
    return baseReq(true).get('/lift/liftPosition')
}