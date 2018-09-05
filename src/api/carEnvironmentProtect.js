

import fetch from 'common/fetch_usercenter'

//分页查询机构
export function list(params) {
  return fetch({
    url: '/api/carEnvironmentProtect/list?detailed=true',
    method: 'get',
    params
  })
}

// 分页查询
export function cxList(params) {
  return fetch({
    url: '/api/carEnvironmentProtect/carModelList',
    method: 'get',
    params
  })
}

//产线唯一编号集合
export function listAll() {
  return fetch({
    url: '/api/carEnvironmentProtect/listAll',
    method: 'get'
  })
}

//生产区段联动新增数据
export function getScqdCode(params) {
  return fetch({
    url: '/api/carEnvironmentProtect/scqd?code=' + params.code,
    method: 'get'
  })
}

//删除物理点类型
export function del(data) {
  return fetch({
    url: "/api/carEnvironmentProtect/" + data.clxh,
    method: "delete",
    data
  });
}

//获取物理点类型对象信息
export function getCarEnvironmentProtect(params) {
  return fetch({
    url: '/api/carEnvironmentProtect/' + params.clxh + '?detailed=true',
    method: 'get'
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/carEnvironmentProtect',
    method: 'post',
    data
  })
}

//校验物理点类型值是否存在
export function findByPhyPoint(params) {
  return fetch({
    url: '/api/carEnvironmentProtect/check/' + params.wldlx,
    method: 'get'
  })
}

//修改数据
export function edit(data) {
  return fetch({
    url: '/api/carEnvironmentProtect/' + data.clxh,
    method: 'put',
    data
  })
}

//获取字典数据
export function getDictionaryByCode(data) {
  return fetch({
    // url: '/api/carModel/' + data.code + '/code',
    url: '/api/dictionary/entry/' + data.code + '/singlelist',
    method: 'get',
    data
  })
}  

//打印Excel
export function printerExcel(data) {
  return download({
    url: "/api/carEnvironmentProtect/printerExcle",
    paras: data
  });
}

//车型编码模糊查询
export function cxbmList(params) {
  return fetch({
    url: '/api/carEnvironmentProtect/cxbm',
    method: 'get',
    params
  })
}

//复制车型信息
export function copy(params) {
  return fetch({
    url: '/api/carEnvironmentProtect/copy',
    method: 'post',
    params
  })
}


