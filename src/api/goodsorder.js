import fetch from 'common/fetch_usercenter'

// 分页查询要货令列表
export function goodsList(params) {
  return fetch({
    url: '/api/goodsorder/list',
    method: 'get',
    params
  })
}


//終止要货令
export function end(data) {
  return fetch({
    url: '/api/goodsorder/end',
    method: 'put',
    data
  })
}



