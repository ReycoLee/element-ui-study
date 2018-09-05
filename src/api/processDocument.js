import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// 分页查询
export function list(params) {
  return fetch({
    url: '/api/processDocument/pageList',
    method: 'get',
    params
  })
}

// 分页查询权限
export function jurisdictionList(params) {
  return fetch({
    url: '/api/processDocument/jurisdictionList',
    method: 'get',
    params
  })
}

// 工艺文件数据
export function get(params) {
  return fetch({
    url: '/api/processDocument/processDocument',
    method: 'get',
    params
  })
}

//根据主键删除数据
export function del(data) {
  return fetch({
    url: '/api/processDocument',
    method: 'delete',
    data
  })
}

//修改数据
export function edit(data) {
  return fetch({
    url: '/api/processDocument/',
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

//文件授权
export function roleJurisdiction(data) {
  return fetch({
    url: '/api/processDocument/roleJurisdiction',
    method: 'post',
    data
  })
}

//增加角色
export function addRole(data) {
  return fetch({
    url: '/api/processDocument/addRole',
    method: 'post',
    data
  })
}

//获取当前登录人角色
export function getUserRole(data) {
  return fetch({
    url: '/api/processDocument/userRole/',
    method: 'get',
    data
  })
}
