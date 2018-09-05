import fetch from 'common/fetch_usercenter'

// 分页查询数据权限
export function dataPermissionList(params) {
    return fetch({
      url: '/api/data-permission/list',
      method: 'get',
      params
    })
}

// 获取数据权限信息
export function dataPermissionDetail(params) {
  return fetch({
    url: '/api/data-permission/' + params.code,
    method: 'get',
  })
}

// 添加数据权限
export function dataPermissionAdd(data) {
  return fetch({
    url: '/api/data-permission/',
    method: 'post',
    data
  })
}

// 修改数据权限信息
export function dataPermissionUpdate(data) {
  return fetch({
    url: '/api/data-permission/' + data.code,
    method: 'put',
    data
  })
}

// 删除数据权限
export function dataPermissionDelete(data) {
  return fetch({
    url: '/api/data-permission/',
    method: 'delete',
    data
  })
}

// 查看数据权限
export function dataPermissionView(params) {
  return fetch({
    url: '/api/data-permission/' + params.code,
    method: 'get',
  })
}

export function dataPermissionViewTree(params) {
  return fetch({
    url: '/api/org/tree',
    method: 'get',
    params
  })
}