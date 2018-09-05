import fetch from 'common/fetch_usercenter'

// 分页查询bom
export function list(params) {
  return fetch({
    url: '/api/bom/list',
    method: 'get',
    params
  })
}

//更换零件
export function update(data) {
  return fetch({
    url: '/api/bom/',
    method: 'put',
    data
  })
}
//校验
export function get(data) {
  return fetch({
    url: '/api/bom/',
    method: 'post',
    data
  })
}

//版本比对

export function comparison(params) {
  return fetch({
    url: '/api/bom/',
    method: 'get',
    params
  })
}

