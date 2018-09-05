import fetch from 'common/fetch_usercenter'

//数据列表
export function list(params) {
  return fetch({
    url: '/api/table/list',
    method: 'get',
    params
  })
}

//根据id查询数据
export function get(params) {
  return fetch({
    url: '/api/table/'+params.id,
    method: 'get'
  })
}

//根据id删除数据
export function del(data) {
  return fetch({
    url: '/api/table/'+data.id,
    method: 'delete'
  })
}
//添加或修改数据
export function save(data) {
  return fetch({
    url: '/api/table',
    method: 'post',
    data
  })
}
//批量删除
export function batch_del(data) {
  return fetch({
    url: '/api/table',
    method: 'delete',
    data
  })
}

