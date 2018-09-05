

import fetch from 'common/fetch_usercenter'

//分页查询报警类型
export function list(params) {
  return fetch({
    url: '/api/alarmType/list?detailed=true',
    method: 'get',
    params
  })
}

//停线方式集合
export function getTxfsList() {
  return fetch({
    url: '/api/alarmType/getTxfsList',
    method: 'get'
  })
}

//删除物理点类型
export function del(data) {
  return fetch({
    url: "/api/alarmType/" + data.bjlxbh,
    method: "delete",
    data
  });
}


//获取报警类型对象信息
export function getAlarmType(params) {
  return fetch({
    url: '/api/alarmType/' + params.bjlxbh + '?detailed=true',
    method: 'get'
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/alarmType',
    method: 'post',
    data
  })
}

//修改数据
export function edit(data) {
  return fetch({
    url: '/api/alarmType/' + data.bjlxbh,
    method: 'put',
    data
  })
}

//获取字典数据
export function getDictionaryByCode(data) {
  return fetch({
    // url: '/api/carModel/' + data.code + '/code',
    url: '/api/dictionary/entry/' + data.code + '/singlelist',
    method: 'get',
    data
  })
}

