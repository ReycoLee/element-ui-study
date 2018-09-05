import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// 分页查询零件包装列表
export function list(params) {
    return fetch({
      url: '/api/componentpack/list',
      method: 'get',
      params
    })
}


//新增零件包装列表
export function add(data) {
  return fetch({
    url: "/api/componentpack",
    method: "post",
    data
  });
}


//获取单个零件包装信息
export function getComponentPack(params){
  return fetch({
    url: "/api/componentpack/" + params.ljbh + "/" +params.bzxh,
    method: "get"
  });
}


//修改数据
export function edit(params,data) {
  return fetch({
    url: "/api/componentpack/" + params.ljbh + "/" +params.bzxh,
    method: "put",
    data
  });
}

//删除零件包装信息
export function del(data) {
  return fetch({
    url: "/api/componentpack",
    method: "delete",
    data
  });
}


//导出Excel
export function download_excel(data) {
  return download({
    url: "/api/componentpack/download",
    paras: data
    
  });
}

//模糊查询包装型号
export function allList(params) {
  return fetch({
    url: "/api/componentpack/lists",
    method: "get",
    params
  });

}