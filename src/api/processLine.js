import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/processLine/list",
    method: "get",
    params
  });
}

// 删除工艺线
export function del(data) {
  return fetch({
    url: "/api/processLine/" + data.scxbh + "/" + data.gyxbh,
    method: "delete",
  });
}
// 获取工艺线信息
export function getProcessLine(params) {
  return fetch({
    url: "/api/processLine/" + params.scxbh + "/" + params.gyxbh,
    method: "get"
  });
}

// 新增工艺线
export function add(data) {
  return fetch({
    url: "/api/processLine",
    method: "post",
    data
  });
}

//修改工艺线信息
export function edit(data) {
  return fetch({
    url: "/api/processLine/",
    method: "put",
    data
  });
}

// 获取制造中心/车间/生产线/工艺线 四表级联tree
export function getProcessLineTree() {
  return fetch({
    url: "/api/processLine/tree",
    method: "get"
  })
}

// 查询所有工艺线线
export function listAll() {
  return fetch({
    url: '/api/processLine/listAll',
    method: 'get'
  })
}
