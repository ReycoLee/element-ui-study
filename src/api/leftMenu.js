import fetch from 'common/fetch_usercenter'

// 分页查询角色
export function menuList(params) {
    return fetch({
      url: '/api/user/menu',
      method: 'get',
      params
    })
}
