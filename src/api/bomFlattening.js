import fetch from 'common/fetch_usercenter'
import download from 'common/download_usercenter'
// 分页查询bom
export function list(params) {
  return fetch({
    url: '/api/bom/flattening/list',
    method: 'get',
    params
  })
}


export function download_excel() {
  return download({
    url: '/api/bom/flattening/download'
  })
}

