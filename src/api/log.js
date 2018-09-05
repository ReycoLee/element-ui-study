import fetch from 'common/fetch_usercenter'

// 分页查询API列表
export function logList(params) {
    return fetch({
      url: '/api/log/list',
      method: 'get',
      params
    })
}

// 删除API
export function logDelete(data) {
  return fetch({
    url: '/api/log/',
    method: 'delete',
    data
  })
}

// 清除日志
export function clear(data) {
  return fetch({
    url: '/api/log/clear',
    method: 'delete',
    data
  })
}