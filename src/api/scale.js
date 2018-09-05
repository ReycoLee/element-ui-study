import fetch from 'common/fetch_usercenter'

// 分页查询看板循环列表
export function scaleList(params) {
  return fetch({
    url: '/api/scale/list',
    method: 'get',
    params
  })
}

export function effective(data) {
  return fetch({
    url: '/api/scale/state/effective',
    method: 'put',
    data
  })
}


export function uneffective(data) {
  return fetch({
    url: '/api/scale/state/uneffective',
    method: 'put',
    data
  })
}


export function freeze(data) {
  return fetch({
    url: '/api/scale/freeze',
    method: 'put',
    data
  })
}

export function unfreeze(data) {
  return fetch({
    url: '/api/scale/unfreeze',
    method: 'put',
    data
  })
}
export function updateDqxhgm(data) {
  return fetch({
    url: '/api/scale/updateDqxhgm',
    method: 'put',
    data
  })
}



export function order() {
  return fetch({
    url: '/api/scale/order',
    method: 'get'
  })
}

export function gross() {
  return fetch({
    url: '/api/scale/gross',
    method: 'get'
  })
}