import fetch from 'common/fetch_usercenter'


// 得到对应的物理点和工位
export function getWldsAndGws(params) {
    return fetch({
      url: '/api/activeinteractionforpoint/singlelist',
      method: 'get',
      params
    })
  }