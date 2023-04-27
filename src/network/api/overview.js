import {baseReq} from '../base'

// 数据概览
export function _overview   (){
    return baseReq(true).get('overview/')
}