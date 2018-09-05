import fetch from 'common/fetch_usercenter'
import download from "common/download_usercenter";

// 工位列表
export function stationList(params) {
    return fetch({
      url: '/api/station/list',
      method: 'get',
      params
    })
}

//获取产线
export function getScxbhList() {
  return fetch({
    url: '/api/station/getScxbhList',
    method: 'get'
  })
}

//获取工艺线
export function getGyxbhList(params) {
  return fetch({
    url: '/api/station/getGyxbhList',
    method: 'get',
    params
  })
}

//获取工位信息
export function getStation(params) {
  return fetch({
    url: "/api/station/" + "?detailed=true",
    method: "get",
    params
  });
}

//添加数据
export function add(data) {
  return fetch({
    url: "/api/station",
    method: "post",
    data
  });
}

//修改数据
export function edit(data) {
  return fetch({
    url: "/api/station/" + data.gwbm,
    method: "put",
    data
  });
}

//删除数据
export function stationDelete(data) {
  return fetch({
    url: '/api/station/',
    method: 'delete',
    data
  })
}



//导出Excel
export function download_excel(data) {
  return download({
    url: "/api/station/download",
    paras: data
  });
}


//根據工位查詢列表
export function listAll(params) {
  return fetch({
    url: "/api/station/listAll",
    method: "get",
    params
  });
}



//获取所有工位
export function getAllGw(params){
  return fetch({
    url:'/api/station/gwList',
    method:'get',
    params
  })
}
