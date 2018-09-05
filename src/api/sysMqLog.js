import fetch from 'common/fetch_usercenter'

// 分页查询
export function logList(params) {
    return fetch({
      url: '/api/sysmqlog/list',
      method: 'get',
      params
    })
}

// 删除
export function logDelete(data) {
  return fetch({
    url: '/api/sysmqlog/',
    method: 'delete',
    data
  })
}

// 清除日志
export function clear(data) {
  return fetch({
    url: '/api/sysmqlog/clear',
    method: 'delete',
    data
  })
}

//获取单个消息日志信息
export function getSysMqLog(params) {
  return fetch({
    url: '/api/sysmqlog/',
    method: 'get',
    params
  });
}