import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/assemblyLocation/list",
    method: "get",
    params
  });
}

// 删除集配区货位
export function del(data) {
  return fetch({
    url: "/api/assemblyLocation/" + data.hwbh,
    method: "delete",
  });
}
// 获取集配区货位信息
export function get(params) {
  return fetch({
    url: "/api/assemblyLocation/" + params.hwbh,
    method: "get"
  });
}
export function getDetail(params) {
  return fetch({
    url: "/api/assemblyLocation/" + params.hwbh + "/" + params.ljbh,
    method: "get"
  });
}

// 新增集配区货位
export function add(data) {
  return fetch({
    url: "/api/assemblyLocation",
    method: "post",
    data
  });
}
//修改集配区货位信息
export function edit(data) {
  return fetch({
    url: "/api/assemblyLocation/",
    method: "put",
    data
  });
}

// 为集配区批量添加集配区货架
export function batchAdd(data) {
  return fetch({
    url: "/api/assemblyLocation/batchSave",
    method: "post",
    data
  });
}

// 清空货位
export function deleteByHjbh(params) {
  return fetch({
    url: "/api/assemblyLocation/batch/" + params.hjbh,
    method: "delete"
  });
}

//集配区/工位/货架/货位四表级联tree
export function tree() {
  return fetch({
    url: '/api/assemblyLocation/tree',
    method: 'get'
  })
}

//根据货架编号查询货位数量
export function getCountByHjbh(params) {
  return fetch({
    url: '/api/assemblyLocation/count/' + params.hjbh,
    method: 'get'
  })
}

//根据货架编号查询货位列表
export function getListByHjbh(params) {
  return fetch({
    url: '/api/assemblyLocation/list/' + params.hjbh,
    method: 'get'
  })
}

//查询货架/货位级联列表
export function cascadeList(params) {
  return fetch({
    url: '/api/assemblyLocation/cascadeList',
    method: 'get',
    params
  })
}

//批量启用货位
export function batchEnable(params) {
  return fetch({
    url: '/api/assemblyLocation/status/batch/' + params.hjbh,
    method: 'put'
  })
}

//单个启用货位
export function updateStatus(params) {
  return fetch({
    url: '/api/assemblyLocation/status/' + params.hwbh + "/" + params.sfyx,
    method: 'put'
  })
}

//查询工位对应物理点信息
export function getPhysicalList(params) {
  return fetch({
    url: '/api/assemblyLocation/physicalList',
    method: 'get',
    params
  })
}

//批量设置零件装配消耗点
export function batchSetLjzpxhd(params) {
  return fetch({
    url: '/api/assemblyLocation/batchSetLjzpxhd',
    method: 'put',
    params
  })
}

//查询所有
export function listAll(params) {
  return fetch({
    url: '/api/assemblyLocation/listAll',
    method: 'get',
    params
  })
}

//查询所有
export function getComponentList(params) {
  return fetch({
    url: '/api/assemblyLocation/componentList',
    method: 'get',
    params
  })
}