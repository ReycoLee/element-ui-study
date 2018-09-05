

import fetch from 'common/fetch_usercenter'

//分页查询报警类型
export function list(params) {
  return fetch({
    url: '/api/carInsertOutSearcher/list?detailed=true',
    method: 'get',
    params
  })
}
//生产线编号集合
export function getScxbhList() {
    return fetch({
      url: '/api/carInsertOutSearcher/getScxbhList',
      method: 'get'
    })
}
//工艺线编号集合
export function getGyxbhList() {
    return fetch({
      url: '/api/carInsertOutSearcher/getGyxbhList?detailed=true',
      method: 'get'
    })
}

//删除物理点类型
export function del(data) {
  return fetch({
    url: "/api/carInsertOutSearcher/" + data.bjlxbh,
    method: "delete",
    data
  });
}

//获取报警类型对象信息
export function getAlarmType(params) {
  return fetch({
    url: '/api/carInsertOutSearcher/' + params.bjlxbh + '?detailed=true',
    method: 'get'
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/carInsertOutSearcher',
    method: 'post',
    data
  })
}

//修改数据
export function edit(data) {
  return fetch({
    url: '/api/carPointSeacher/' + data.bjlxbh,
    method: 'put',
    data
  })
}

