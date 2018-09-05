import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/assemblyStation/list",
    method: "get",
    params
  });
}

// 删除集配区工位
export function del(data) {
  return fetch({
    url: "/api/assemblyStation/" + data.jpqgwbh,
    method: "delete",
  });
}

// 获取集配区信息
export function get(params) {
  return fetch({
    url: "/api/assemblyStation/" + params.jpqgwbh,
    method: "get"
  });
}

// 新增集配区
export function add(data) {
  return fetch({
    url: "/api/assemblyStation",
    method: "post",
    data
  });
}

//修改集配区信息
export function edit(data) {
  return fetch({
    url: "/api/assemblyStation/",
    method: "put",
    data
  });
}

// 为集配区批量添加集配区工位
export function batchAdd(params) {
  return fetch({
    url: "/api/assemblyStation/" + params.jpqbh + "/" + params.count,
    method: "post",
  });
}
// 
export function listAll(params) {
  return fetch({
    url: "/api/assemblyStation/listAll",
    method: "get",
    params
  });
}

//查询集配区工位下是否有货架
export function haveChildren(params) {
  return fetch({
    url: "/api/assemblyStation/haveChildren",
    method: "get",
    params
  });
}

//查询集配区工位数量
export function getCount(params) {
  return fetch({
    url: "/api/assemblyStation/count/" + params.jpqbh,
    method: "get"
  });
}