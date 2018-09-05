import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// 分页查询
export function pageList(params) {
  return fetch({
    url: '/api/tagPoint/pageList',
    method: 'get',
    params
  })
}

// TAG点信息
export function getObject(params) {
  return fetch({
    url: '/api/tagPoint/tagPoint' ,
    method: 'get',
    params
  })
}

//删除数据
export function del(data) {
  return fetch({
    url: '/api/tagPoint',
    method: 'delete',
    data
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/tagPoint',
    method: 'post',
    data
  })
}
//修改数据
export function edit(data) {
  return fetch({
    url: '/api/tagPoint',
    method: 'put',
    data
  })
}

//模糊查询PLC通道
export function queryPlc(params) {
  return fetch({
    url: '/api/tagPoint/plcPassageways',
    method: 'get',
    params
  })
}


//模糊查询tag点
export function getAllByTag(params) {
  return fetch({
    url: '/api/tagPoint/tag',
    method: 'get',
    params
  })
}

// 获取不同类别的TAG点信息
export function getAllOption(params) {
  return fetch({
    url: '/api/tagPoint/alloption' ,
    method: 'get',
    params
  })
}