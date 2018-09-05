import fetch from 'common/fetch_usercenter'

// 查询bom合子件
export function list(params) {
  return fetch({
    url: '/api/bom/combine/list',
    method: 'get',
    params
  })
}
// 新增bom合子件
export function bomCombineAdd(data) {
  return fetch({
    url: '/api/bom/combine/',
    method: 'post',
    data
  })
}

// 删除bom合子件
export function bomCombineDelete(data) {
  return fetch({
    url: '/api/bom/combine/',
    method: 'delete',
    data
  })
}
// 修改bom合子件
export function bomCombineUpdate(data) {
  return fetch({
    url: '/api/bom/combine/',
    method: 'put',
    data
  })
}


