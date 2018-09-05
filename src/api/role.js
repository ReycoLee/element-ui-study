import fetch from 'common/fetch_usercenter'

// 分页查询角色
export function roleList(params) {
  return fetch({
    url: '/api/role/list?detailed=true',
    method: 'get',
    params
  })
}

// 角色下菜单预览
export function roleMenu(params) {
  return fetch({
    url: '/api/role/' + params.code + '/menu',
    method: 'get',
    params
  })
}

// 根据角色code查询数据
export function roleGet(params) {
  return fetch({
    url: '/api/role/' + params.code,
    method: 'get'
  })
}

// 根据角色code查询数据
export function roleMenuGet(params) {
  return fetch({
    url: '/api/role/' + params.code + '/menuAndButton',
    method: 'get'
  })
}

// 添加角色
export function roleAdd(data) {
  return fetch({
    url: '/api/role',
    method: 'post',
    data
  })
}

// 权限列表
export function rolePermissionList(params) {
  return fetch({
    url: '/api/data-permission/listAll',
    method: 'get',
  })
}

// 修改角色信息
export function roleChange(data) {
  return fetch({
    url: '/api/role/' + data.code,
    method: 'put',
    data
  })
}

// 删除角色
export function roleDelete(data) {
  return fetch({
    url: '/api/role',
    method: 'delete',
    data
  })
}

// 角色已授权
export function roleHasPermission(params) {
  return fetch({
    url: '/api/role/' + params.code + '/user',
    method: 'get',
    params
  })
}

// 角色未授权
export function roleHasNoPermission(params) {
  return fetch({
    url: '/api/role/' + params.code + '/unuser',
    method: 'get',
    params
  })
}

// 调整用户角色
export function roleChangePermission(data) {
  return fetch({
    url: '/api/role/' + data.code + '/user',
    method: 'put',
    data
  })
}
