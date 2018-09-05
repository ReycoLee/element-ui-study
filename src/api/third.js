import fetch from 'common/fetch_usercenter'

// 分页查询第三方接入系统列表
export function thirdList(params) {
    return fetch({
      url: '/api/third/list',
      method: 'get',
      params
    })
}

//获取用户信息
export function getThird(params) {
  return fetch({
    url: "/api/third/" + params.code + "?detailed=true",
    method: "get"
  });
}

// 新增第三方接入系统
export function thirdAdd(data) {
  return fetch({
    url: '/api/third/',
    method: 'post',
    data
  })
}

// 修改第三方接入系统
export function thirdUpdate(data) {
  return fetch({
    url: '/api/third/' + data.code,
    method: 'put',
    data
  })
}

// 删除第三方接入系统
export function thirdDelete(data) {
  return fetch({
    url: "/api/third/" + data.code,
    method: 'delete',
    data
  })
}