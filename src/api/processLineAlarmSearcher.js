import fetch from 'common/fetch_usercenter'
import download from "common/download_usercenter";

//分页查询工艺线报警及停线信息
export function list(params) {
  return fetch({
    url: '/api/processLineAlarmSearcher/list?detailed=true',
    method: 'get',
    params
  })
}

//分页查车辆VIN集合
export function getCarVinSelectlist(params) {
  return fetch({
    url: '/api/processLineAlarmSearcher/getCarVinSelectlist',
    method: 'get',
    params
  })
}

//查询车辆VIN集合
export function getCarVinList(params) {
  return fetch({
    url: '/api/processLineAlarmSearcher/getCarVinList',
    method: 'get',
    params
  })
}

//生产线编号集合
export function getScxbhList() {
    return fetch({
      url: '/api/processLineAlarmSearcher/getScxbhList',
      method: 'get'
    })
}
//工艺线编号集合
export function getGyxbhList() {
    return fetch({
      url: '/api/processLineAlarmSearcher/getGyxbhList?detailed=true',
      method: 'get'
    })
}

//冻结码编号集合
export function getCldjmList() {
  return fetch({
    url: '/api/processLineAlarmSearcher/getCldjmList',
    method: 'get'
  })
}

//重置冻结码
export function reset(data) {
  return fetch({
    url: "/api/processLineAlarmSearcher/" + data.vin,
    method: "patch",
    data
  });
}

//获取车辆VIN对象信息
export function getCarFreezeCode(params) {
  return fetch({
    url: '/api/processLineAlarmSearcher/' + params.vin + '?detailed=true',
    method: 'get'
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/processLineAlarmSearcher',
    method: 'post',
    data
  })
}

//修改数据
export function edit(data) {
  return fetch({
    url: '/api/processLineAlarmSearcher/' + data.vin,
    method: 'put',
    data
  })
}

//导出Excel
export function download_excel(data) {
  return download({
    url: "/api/processLineAlarmSearcher/download",
    paras: data
    
  });
}

