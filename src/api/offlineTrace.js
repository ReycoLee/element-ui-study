import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// 分页查询
export function pageList(params) {
  return fetch({
    url: '/api/offlineTrace/pageList',
    method: 'get',
    params
  })
}

// 查询页面的分页数据
export function queryPageList(params) {
  return fetch({
    url: '/api/offlineTrace/queryPageList', 
    method: 'get',
    params
  })
}

// 查询替换零件数据
export function thljList(params) {
  return fetch({
    url: '/api/offlineTrace/thljList', 
    method: 'get',
    params
  })
}

//新增数据
export function add(data) {
  return fetch({
    url: '/api/offlineTrace',
    method: 'post',
    data
  })
}

// //修改数据
// export function edit(data) {
//   return fetch({
//     url: '/api/offlineTrace',
//     method: 'put',
//     data
//   })
// }

// // 单个车辆返修信息
// export function get(params) {
//   return fetch({
//     url: '/api/auditDefect/auditDefect' ,
//     method: 'get',
//     params
//   })
// }

// //根据车辆返修主键删除数据
// export function del(data) {
//   return fetch({
//     url: '/api/auditDefect',
//     method: 'delete',
//     data
//   })
// }

// //导出Excel
// export function download_excel(data) {
//   return download({
//     url: "/api/auditDefect/download",
//     paras: data
//   });
// }
