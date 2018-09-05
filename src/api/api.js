import fetch from 'common/fetch_usercenter'

// 分页查询API列表
export function apiList(params) {
    return fetch({
      url: '/api/api/list',
      method: 'get',
      params
    })
}

// 新增API
export function apiAdd(data) {
  return fetch({
    url: '/api/api/',
    method: 'post',
    data
  })
}

// 修改API
export function apiUpdate(data) {
  return fetch({
    url: '/api/api/' + data.code,
    method: 'put',
    data
  })
}

// 删除API
export function apiDelete(data) {
  return fetch({
    url: '/api/api/',
    method: 'delete',
    data
  })
}