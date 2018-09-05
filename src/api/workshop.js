import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/workshop/list",
    method: "get",
    params
  });
}

// 删除车间
export function del(data) {
  return fetch({
    url: "/api/workshop/" + data.zzzxbm + "/" + data.cjbm,
    method: "delete",
  });
}
// 获取车间信息
export function getWorkshop(params) {
  return fetch({
    url: "/api/workshop/" + params.zzzxbm + "/" + params.cjbm,
    method: "get"
  });
}

// 新增车间
export function add(data) {
  return fetch({
    url: "/api/workshop",
    method: "post",
    data
  });
}
//修改车间信息
export function edit(data) {
  return fetch({
    url: "/api/workshop/",
    method: "put",
    data
  });
}

// 制造中心/车间树
export function workshopTree(params) {
  return fetch({
    url: '/api/workshop/tree',
    method: 'get',
  })
}

// 根据制造中心编码查询车间列表(不分页)
export function getByZzzxbm(params) {
  return fetch({
    url: '/api/workshop/' + params.zzzxbm,
    method: 'get'
  })
} 

// 获取制造中心列表
export function getZzzxs() {
  return fetch({
    url: '/api/workshop/getZzzxs',
    method: 'get'
  })
} 

// 查询车间下是否有产线
export function haveChildren(params) {
  return fetch({
    url: '/api/workshop/haveChildren',
    method: 'get',
    params
  })
}