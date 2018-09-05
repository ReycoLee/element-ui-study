import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// 分页查询
export function pageList(params) {
  return fetch({
    url: '/api/auditDefect/pageList',
    method: 'get',
    params
  })
}

// 查询页面的分页数据
export function queryPageList(params) {
  return fetch({
    url: '/api/auditDefect/queryPageList', 
    method: 'get',
    params
  })
}

//新增数据
export function add(data) {
  return fetch({
    url: '/api/auditDefect',
    method: 'post',
    data
  })
}

//修改数据
export function edit(data) {
  return fetch({
    url: '/api/auditDefect',
    method: 'put',
    data
  })
}

// 单个车辆返修信息
export function get(params) {
  return fetch({
    url: '/api/auditDefect/auditDefect' ,
    method: 'get',
    params
  })
}

// 
export function getCarPlan(params) {
  return fetch({
    url: '/api/auditDefect/carPlan' ,
    method: 'get',
    params
  })
}

// 生产车间信息
export function getSCCJS(params) {
  return fetch({
    url: '/api/auditDefect/getSccjList' ,
    method: 'get',
    params
  })
}

//根据车辆返修主键删除数据
export function del(data) {
  return fetch({
    url: '/api/auditDefect',
    method: 'delete',
    data
  })
}

//导出Excel
export function download_excel(data) {
  return download({
    url: "/api/auditDefect/download",
    paras: data
  });
}

//导出报告
export function download_excel_BG(data) {
  return download({
    url: "/api/auditDefect/downloadBG",
    paras: data
  });
}
