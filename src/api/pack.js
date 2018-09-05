import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";


// 分页查询包装列表
export function packList(params) {
    return fetch({
      url: '/api/pack/list',
      method: 'get',
      params
    })
}

//删除包装信息
export function del(data) {
  return fetch({
    url: "/api/pack",
    method: "delete",
    data
  });
}

//新增包装信息
export function add(data) {
  return fetch({
    url: "/api/pack",
    method: "post",
    data
  });
}

//查询单个包装信息
export function getPack(params){
  return fetch({
    url: "/api/pack/" + params.bzxh,
    method: "get"
  });
}


//修改数据
export function edit(data) {
  return fetch({
    url: "/api/pack/" + data.bzxh,
    method: "put",
    data
  });
}

//导出Excel
export function download_excel(data) {
  return download({
    url: "/api/pack/download",
    paras: data
    
  });
}

//模糊查询包装型号
export function allList(params) {
  return fetch({
    url: "/api/pack/lists",
    method: "get",
    params
  });

}