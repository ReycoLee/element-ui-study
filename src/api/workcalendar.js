import fetch from 'common/fetch_usercenter'
import download from 'common/download_usercenter'
// 分页查询workcalendar
export function list(params) {
  return fetch({
    url: '/api/workcalendar/list',
    method: 'get',
    params
  })
}

//修改是否工作日
export function updateWorkday(data) {
  return fetch({
    url: '/api/workcalendar/workday',
    method: 'put',
    data
  })
}

//修改工作版次
export function update(data) {
  return fetch({
    url: '/api/workcalendar/',
    method: 'put',
    data
  })
}


export function download_excel(){
  return download({
    url: '/api/workcalendar/download'
  })
}


