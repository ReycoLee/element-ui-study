

import fetch from 'common/fetch_usercenter'

//分页查询机构
export function list(params) {
  return fetch({
    url: '/api/physicalpoint/list?detailed=true',
    method: 'get',
    params
  })
}

//分页查询物理单类型集合
export function listPhysicalPoint(params) {
  return fetch({
    url: '/api/physicalpoint/listPhysicalPoint?detailed=true',
    method: 'get',
    params
  })
}

//分页查询物理单类型集合
export function listPhysicalPoint2(params) {
  return fetch({
    url: '/api/physicalpoint/listPhysicalPoint2?detailed=true',
    method: 'get',
    params
  })
}

//删除物理点类型
export function del(data) {
  return fetch({
    url: "/api/physicalpoint/" + data.wldlx,
    method: "delete",
    data
  });
}

//获取物理点类型对象信息
export function getPhysicalPoint(params) {
  return fetch({
    url: '/api/physicalpoint/' + params.wldlx + '?detailed=true',
    method: 'get'
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/physicalpoint',
    method: 'post',
    data
  })
}

//修改数据
export function edit(data) {
  return fetch({
    url: '/api/physicalpoint/' + data.wldlx,
    method: 'put',
    data
  })
}


export function listAll() {
  return fetch({
    url: '/api/physicalpoint/listPhysicalPoint2',
    method: 'get'
  })
}