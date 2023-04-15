import {baseReq} from '../base'

// 查询电梯的详情 (分页查询)
export function _liftType(){
    return baseReq(true).get('liftType')
}