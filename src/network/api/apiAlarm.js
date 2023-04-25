import {baseReq} from '../base'

// 查询电梯的详情 (分页查询)
export function _alarmData(params,json){
    return baseReq(true).post('alarm/list',json, {
        params:{
            size:params.size,
            current:params.current
        },
    })
}

// 查询单个记录
export function _alarmDataById(id){
    return baseReq(true).get("alarm/" + id);
}

export function _alarmUnlock(id){
    return baseReq(true).get("alarm/unlock/" + id);
}

