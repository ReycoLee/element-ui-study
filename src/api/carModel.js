import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// 分页查询
export function cxList(params) {
  return fetch({
    url: '/api/carModel/list',
    method: 'get',
    params
  })
}

// 车型数据
export function getCarModel(params) {
  return fetch({
    url: '/api/carModel/' + params.cxbm,
    method: 'get',
    params
  })
}

//根据cxbm删除数据
export function del(data) {
  return fetch({
    url: '/api/carModel',
    method: 'delete',
    data
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/carModel',
    method: 'post',
    data
  })
}
//修改数据
export function edit(data) {
  return fetch({
    url: '/api/carModel/' + data.cxbm,
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

//导出Excel
export function download_excel(data) {
  return download({
    url: "/api/carModel/download",
    paras: data
  });
}

// 查询所有车型编码
export function allCxbm(params) {
  return fetch({
    url: '/api/carModel/allCxbm',
    method: 'get',
    params
  })
}


export function getAllByCxbm(params) {
  return fetch({
    url: '/api/carModel/cxbm',
    method: 'get',
    params
  })
}

export function getAllByDcx(params) {
  return fetch({
    url: '/api/carModel/dcx',
    method: 'get',
    params
  })
}