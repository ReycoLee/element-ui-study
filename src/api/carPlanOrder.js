import fetch from 'common/fetch_usercenter'
import download from "common/download_usercenter";

// 整车计划订单执行列表
export function carPlanOrderList(params) {
  return fetch({
    url: '/api/carPlanOrder/list',
    method: 'get',
    params
  })
}

//挂起
export function gqData(data) {
  return fetch({
    url: '/api/carPlanOrder/gqData',
    method: 'post',
    data
  })
}

//恢复 hfData
export function hfData(data) {
  return fetch({
    url: '/api/carPlanOrder/hfData',
    method: 'post',
    data
  })
}

//冻结
export function djData(data) {
  return fetch({
    url: '/api/carPlanOrder/djData',
    method: 'post',
    data
  })
}

//解冻
export function jdData(data) {
  return fetch({
    url: '/api/carPlanOrder/jdData',
    method: 'post',
    data
  })
}

//调序保存
export function txSave(data) {
  return fetch({
    url: '/api/carPlanOrder/txSave',
    method: 'post',
    data
  })
}

//获取焊装产线
export function findCxwybm() {
  return fetch({
    url: '/api/carPlanOrder/cxwybm',
    method: 'get'
  })
}


//车量上线计划与过点查询
export function carPlanList(params) {
  return fetch({
    url: '/api/carPlanOrder/planlist',
    method: 'get',
    params
  })
}

//导出Excel
export function download_excel(data) {
  return download({
    url: "/api/carPlanOrder/download",
    paras: data
  });
}

//向上调序
export function upData(data) {
  return fetch({
    url: '/api/carPlanOrder/upData',
    method: 'post',
    data
  })
}

//向下调序
export function downData(data) {
  return fetch({
    url: '/api/carPlanOrder/downData',
    method: 'post',
    data
  })
}