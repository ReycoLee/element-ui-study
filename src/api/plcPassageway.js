import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// 分页查询
export function pageList(params) {
  return fetch({
    url: '/api/plcPassageway/pageList',
    method: 'get',
    params
  })
}

// PLC通道信息
export function getObject(params) {
  return fetch({
    url: '/api/plcPassageway/plcPassageway' ,
    method: 'get',
    params
  })
}

//删除数据
export function del(data) {
  return fetch({
    url: '/api/plcPassageway',
    method: 'delete',
    data
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/plcPassageway',
    method: 'post',
    data
  })
}
//修改数据
export function edit(data) {
  return fetch({
    url: '/api/plcPassageway',
    method: 'put',
    data
  })
}
