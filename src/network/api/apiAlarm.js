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