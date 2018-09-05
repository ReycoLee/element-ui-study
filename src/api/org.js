

import fetch from 'common/fetch_usercenter'

//分页查询机构
export function list(params) {
  return fetch({
    url: '/api/org/list?detailed=true',
    method: 'get',
    params
  })
}
//获取机构信息
export function getOrg(params) {
  return fetch({
    url: '/api/org/' + params.code + '?detailed=true',
    method: 'get'
  })
}

//获取机构信息
export function getOrgTree() {
  return fetch({
    url: '/api/org/tree',
    method: 'get'
  })
}
//根据code删除数据
export function del(data) {
  return fetch({
    url: '/api/org',
    method: 'delete',
    data
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/org',
    method: 'post',
    data
  })
}
//修改数据
export function edit(data) {
  return fetch({
    url: '/api/org/' + data.code,
    method: 'put',
    data
  })
}

export function getOrgUser(params) {
  return fetch({
    url: '/api/org/' + params.code + '/user',
    method: 'get',
    params
  })
}

export function getOrgroleleft(params) {
  return fetch({
    url: '/api/org/' + params.code + '/role?notGranted=false',
    method: 'get'
  })
}

export function getOrgroleright(params) {
  return fetch({
    url: '/api/org/' + params.code + '/role?notGranted=true',
    method: 'get'
  })
}

export function save(data) {
  return fetch({
    url: '/api/org/' + data.code + '/user',
    method: 'put',
    data
  })
}

export function saverole(data) {
  return fetch({
    url: '/api/org/' + data.code + '/role',
    method: 'put',
    data
  })
}