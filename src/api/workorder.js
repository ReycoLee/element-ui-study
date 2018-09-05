import fetch from 'common/fetch_usercenter'
import download from 'common/download_usercenter'
// 分页查询workorder
export function list(params) {
  return fetch({
    url: '/api/workorder/list',
    method: 'get',
    params
  })
}

//根据制造中心查询版次
export function getBc(params) {
  return fetch({
    url: '/api/workorder/zzzxbm',
    method: 'get',
    params
  })
}



//查询工作版次下面的所有工作时间
export function listAll(params) {
  return fetch({
    url: '/api/workorder/order',
    method: 'get',
    params
  })
}


export function getOrders() {
  return fetch({
    url: '/api/workorder',
    method: 'get'
  })
}


export function download_excel(){
  return download({
    url: '/api/workorder/download'
  })
}








