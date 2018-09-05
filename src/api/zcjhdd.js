import fetch from 'common/fetch_usercenter'

// 分页查询零件列表
export function zcjhddList(params) {
    return fetch({
      url: '/api/zcjhdd/list',
      method: 'get',
      params
    })
}

