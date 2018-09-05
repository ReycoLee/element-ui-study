import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// 分页查询
export function pageList(params) {
  return fetch({
    url: '/api/partSupplier/pageList',
    method: 'get',
    params
  })
}

// 零件供应商信息
export function getPartSupplier(params) {
  return fetch({
    url: '/api/partSupplier/partSupplier' ,
    method: 'get',
    params
  })
}

//根据零件供应商主键删除数据
export function del(data) {
  return fetch({
    url: '/api/partSupplier',
    method: 'delete',
    data
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/partSupplier',
    method: 'post',
    data
  })
}
//修改数据
export function edit(data) {
  return fetch({
    url: '/api/partSupplier/',
    method: 'put',
    data
  })
}

//导出Excel
export function download_excel(data) {
  return download({
    url: "/api/partSupplier/download",
    paras: data
  });
}