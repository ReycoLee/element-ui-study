import fetch from 'common/fetch_usercenter'

// 分页查询菜单列表
export function menuManageList(params) {
  return fetch({
    url: '/api/menu/list?detailed=true',
    method: 'get',
    params
  })
}

// 添加菜单
export function menuManageAdd(data) {
  return fetch({
    url: '/api/menu/',
    method: 'post',
    data
  })
}

// 查询菜单下的按钮
export function menuButtonList(params) {
  return fetch({
    url: '/api/menu/' + params.code + '/button',
    method: 'get',
    params
  })
}

// 查询菜单下的API列表
export function menuApiList(params) {
  return fetch({
    url: '/api/menu/' + params.code + '/apiList',
    method: 'get',
  })
}

// 查询按钮下的API列表
export function buttonApiList(params) {
  return fetch({
    url: '/api/menu/button/' + params.code + '/apiList',
    method: 'get',
    params
  })
}

// 修改菜单下的API列表
export function menuApiUpdate(data) {
  return fetch({
    url: '/api/menu/' + data.code + '/apiList',
    method: 'patch',
    data
  })
}

// 修改按钮下的API列表
export function buttonApiUpdate(data) {
  return fetch({
    url: '/api/menu/button/' + data.code + '/apiList',
    method: 'patch',
    data
  })
}

// 获得所有api
export function allApi(params) {
  return fetch({
    url: '/api/api/all',
    method: 'get',
  })
}

// 修改菜单下的按钮
export function menuButtonListUpdate(data) {
  return fetch({
    url: '/api/menu/' + data.code + '/button',
    method: 'put',
    data
  })
}

// 获取菜单信息
export function menuDetail(params) {
  return fetch({
    url: '/api/menu/' + params.code + '?detailed=true',
    method: 'get',
  })
}

// 新增菜单的菜单树
export function menuTree(params) {
  return fetch({
    url: '/api/menu/tree',
    method: 'get',
  })
}

// 修改菜单信息
export function menuUpdate(data) {
  return fetch({
    url: '/api/menu/' + data.code,
    method: 'put',
    data
  })
}

// 删除菜单
export function menuDelete(data) {
  return fetch({
    url: '/api/menu/',
    method: 'delete',
    data
  })
}