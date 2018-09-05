import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/productionLine/list",
    method: "get",
    params
  });
}

// 删除产线
export function del(data) {
  return fetch({
    url: "/api/productionLine/" + data.cxwybm,
    method: "delete"
  });
}
// 获取产线信息
export function getProductionLine(params) {
  return fetch({
    url: "/api/productionLine/" + params.cxwybm,
    method: "get"
  });
}

// 新增产线
export function add(data) {
  return fetch({
    url: "/api/productionLine",
    method: "post",
    data
  });
}
//修改产线信息
export function edit(data) {
  return fetch({
    url: "/api/productionLine/",
    method: "put",
    data
  });
}

// 获取 制造中心/车间/产线三表级联树
export function productionLineTree() {
  return fetch({
    url: '/api/productionLine/tree',
    method: 'get',
  })
}

// 查询所有主线
export function getParents(params) {
  return fetch({
    url: '/api/productionLine/parents?zzzxbm=' + params.zzzxbm + "&cjbm=" + params.cjbm + "&zxzxbs=" + params.zxzxbs,
    method: 'get'
  })
}

// 查询所有产线
export function listAll() {
  return fetch({
    url: '/api/productionLine/listAll',
    method: 'get'
  })
}

// 查询产线下是否有支线/工艺线
export function haveChildren(params) {
  return fetch({
    url: '/api/productionLine/haveChildren',
    method: 'get',
    params
  })
}



//查询需要工作日历的产线
export function getByCal(params) {
  return fetch({
    url: "/api/productionLine/cal",
    method: "get",
    params
  });
}