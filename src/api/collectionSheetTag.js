import fetch from "common/fetch_usercenter";

// 查询列表
export function list(params) {
  return fetch({
    url: "/api/collectionSheetTag/list",
    method: "get",
    params
  });
}

// 删除
export function del(data) {
  return fetch({
    url: "/api/collectionSheetTag/" + data.jpdxx + "/" + data.tdbh,
    method: "delete",
  });
}

// 查询详情
export function get(params) {
  return fetch({
    url: "/api/collectionSheetTag/" + params.jpdxx + "/" + params.tdbh,
    method: "get"
  });
}

// 新增集配单下发交互tag
export function add(data) {
  return fetch({
    url: "/api/collectionSheetTag",
    method: "post",
    data
  });
}

//修改集配单下发交互tag信息
export function edit(data) {
  return fetch({
    url: "/api/collectionSheetTag/",
    method: "put",
    data
  });
}

//查询通道编号
export function queryTdbh(params) {
  return fetch({
    url: "/api/collectionSheetTag/queryTdbh/" + params.jpqbh,
    method: "get"
  });
}