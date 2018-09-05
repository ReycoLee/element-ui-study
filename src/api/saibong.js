import fetch from 'common/fetch_saibong'

// 分页查询采番数据
export function saibongList(data) {
    return fetch({
      url: '/saibongs',
      method: 'post',
      data
    })
}

// 单个查询采番数据
export function saibongItem(params) {
    return fetch({
      url: '/saibongs',
      method: 'get',
      params
    })
}

// 修改采番规则
export function saibongUpdate(data) {
  return fetch({
    url: '/saibongs/items/' + data.cfzdm,
    method: 'put',
    data
  })
}

// 注册采番
export function saibongAdd(data) {
  return fetch({
    url: '/saibongs/items/',
    method: 'post',
    data
  })
}