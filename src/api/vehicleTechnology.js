import fetch from 'common/fetch_usercenter'

// 车辆工艺指导查询
export function vehicleTechnologyList(params) {
    return fetch({
      url: '/api/vehicleTechnology/list',
      method: 'get',
      params
    })
}
