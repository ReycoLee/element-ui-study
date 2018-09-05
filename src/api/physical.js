

import fetch from 'common/fetch_usercenter'

//分页查询机构
export function list(params) {
  return fetch({
    url: '/api/physical/list?detailed=true',
    method: 'get',
    params
  })
}

//产线唯一编号集合
export function listAll() {
  return fetch({
    url: '/api/physical/listAll',
    method: 'get'
  })
}

//生产区段联动新增数据
export function getScqdCode(params) {
  return fetch({
    url: '/api/physical/scqd?code=' + params.code,
    method: 'get'
  })
}

//删除物理点类型
export function del(data) {
  return fetch({
    url: "/api/physical/" + data.wldbh,
    method: "delete",
    data
  });
}

//获取物理点类型对象信息
export function getPhysical(params) {
  return fetch({
    url: '/api/physical/' + params.wldbh + '?detailed=true',
    method: 'get'
  })
}

//获取产线对象信息
export function getCxwybhType(params) {
  return fetch({
    url: '/api/physical/getCxwybhType?cxwybm=' + params.cxwybm,
    method: 'get'
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/physical',
    method: 'post',
    data
  })
}

//校验物理点类型值是否存在
export function findByPhyPoint(params) {
  return fetch({
    url: '/api/physical/check/' + params.wldlx,
    method: 'get'
  })
}

//校验物理点类型值是否存在
export function getGyxbhList(params) {
  return fetch({
    url: '/api/physical/getGyxbhList/' + params.scxbh,
    method: 'get'
  })
}

//修改数据
export function edit(data) {
  return fetch({
    url: '/api/physical/' + data.wldbh,
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
    url: "/api/printer/printerExcle",
    paras: data
  });
}

//根据产线编号或者工艺线编号获取对应的通道编号
export function getTdbh(params){
  return fetch({
    url:'/api/physical/tdbh',
    method:'get',
    params
  })
}

//根据工控机IP查询
export function getByGkjip(params){
  return fetch({
    url:'/api/physical/getByGkjip',
    method:'get',
    params
  })
}

//获取所有物理点
export function getAllWld(params){
  return fetch({
    url:'/api/physical/wldList',
    method:'get',
    params
  })
}
