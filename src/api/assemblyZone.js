import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/assemblyZone/list",
    method: "get",
    params
  });
}

// 删除集配区
export function del(data) {
  return fetch({
    url: "/api/assemblyZone/" + data.jpqbh,
    method: "delete",
  });
}
// 获取集配区信息
export function get(params) {
  return fetch({
    url: "/api/assemblyZone/" + params.jpqbh,
    method: "get"
  });
}

// 新增集配区
export function add(data) {
  return fetch({
    url: "/api/assemblyZone",
    method: "post",
    data
  });
}
//修改集配区信息
export function edit(data) {
  return fetch({
    url: "/api/assemblyZone/",
    method: "put",
    data
  });
}

//查询集配区下是否有工位
export function haveChildren(params) {
  return fetch({
    url: "/api/assemblyZone/haveChildren",
    method: "get",
    params
  });
}

//根据集配区编号模糊查询集配区列表
export function listAll(params) {
  return fetch({
    url: "/api/assemblyZone/listAll/" + params.jpqbh,
    method: "get"
  });
}

//
export function tree(params) {
  return fetch({
    url: "/api/assemblyZone/tree",
    method: "get",
    params
  });
}