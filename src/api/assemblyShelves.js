import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/assemblyShelves/list",
    method: "get",
    params
  });
}

// 删除集配区货架
export function del(data) {
  return fetch({
    url: "/api/assemblyShelves/" + data.hjbh,
    method: "delete",
  });
}
// 获取集配区货架信息
export function get(params) {
  return fetch({
    url: "/api/assemblyShelves/" + params.hjbh,
    method: "get"
  });
}

// 新增集配区货架
export function add(data) {
  return fetch({
    url: "/api/assemblyShelves",
    method: "post",
    data
  });
}
//修改集配区货架信息
export function edit(data) {
  return fetch({
    url: "/api/assemblyShelves/",
    method: "put",
    data
  });
}

//集配区/工位/货架三表级联tree
export function tree() {
  return fetch({
    url: '/api/assemblyShelves/tree',
    method: 'get'
  })
}

// 为集配区批量添加集配区货架
export function batchAdd(params) {
  return fetch({
    url: "/api/assemblyShelves/batchSave",
    method: "post",
    params
  });
}
//添加货架至工位
export function batchSetGwbh(params) {
  return fetch({
    url: "/api/assemblyShelves/" + params.jpqgwbh + "/" + params.hjbhs,
    method: "put"
  });
}

//查询所有有货架的货位
export function getHaveLocations() {
  return fetch({
    url: '/api/assemblyShelves/getHaveLocations',
    method: 'get'
  })
}

//查询集配区货架下是否有货位
export function haveChildren(params) {
  return fetch({
    url: "/api/assemblyShelves/haveChildren",
    method: "get",
    params
  });
}

//切换货架模式
export function switchHjms(data) {
  return fetch({
    url: "/api/assemblyShelves/switchHjms",
    method: "put",
    data
  });
}

//查询所有
export function listAll(params) {
  return fetch({
    url: "/api/assemblyShelves/listAll",
    method: "get",
    params
  });
}

// 根据集配区编号查询货架数量
export function getCount(params) {
  return fetch({
    url: "/api/assemblyShelves/count/" + params.jpqbh,
    method: "get"
  });
}