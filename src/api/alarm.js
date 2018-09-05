import fetch from 'common/fetch_usercenter'

// 分页查询异常报警信息列表
export function alarmList(params) {
    return fetch({
      url: '/api/alarm/list',
      method: 'get',
      params
    })
}



//查询计算模块
export function getJsmkList() {
  return fetch({
    url: '/api/alarm/jsmklist',
    method: 'get'
  })
}


