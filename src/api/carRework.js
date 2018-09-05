import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// 分页查询
export function pageList(params) {
  return fetch({
    url: '/api/carRework/pageList',
    method: 'get',
    params
  })
}

// 单个车辆返修信息
export function get(params) {
  return fetch({
    url: '/api/carRework/carRework' ,
    method: 'get',
    params
  })
}

//根据车辆返修主键删除数据
export function del(data) {
  return fetch({
    url: '/api/carRework',
    method: 'delete',
    data
  })
}

//修改数据
export function edit(data) {
  return fetch({
    url: '/api/carRework',
    method: 'Post',
    data
  })
}

//缺陷部位数据
export function positionList(params) {
  return fetch({
    url: '/api/carRework/getPositionList',
    method: 'get',
    params
  })
}

//缺陷部件数据
export function partList(params) {
  return fetch({
    url: '/api/carRework/getPartList',
    method: 'get',
    params
  })
}
