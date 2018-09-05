import fetch from 'common/fetch_usercenter'

// 分页查询主动交互列表
export function pageList(params) {
    return fetch({
      url: '/api/activeinteraction/list',
      method: 'get',
      params
    })
}

// 新增主动交互
export function add(data) {
  return fetch({
    url: '/api/activeinteraction/',
    method: 'post',
    data
  })
}

// 得到主动交互信息
export function getActiveInteraction(params) {
  return fetch({
    url: '/api/activeinteraction/single',
    method: 'get',
    params
  })
}



// 修改主动交互
export function update(data) {
  return fetch({
    url: '/api/activeinteraction/' + data.bh,
    method: 'put',
    data
  })
}


//删除数据
export function del(data) {
  return fetch({
    url: '/api/activeinteraction',
    method: 'delete',
    data
  })
}