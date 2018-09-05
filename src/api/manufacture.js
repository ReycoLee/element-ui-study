import fetch from 'common/fetch_usercenter'

// 分页制造中心列表
export function manufactureList(params) {
    return fetch({
      url: '/api/manufacture/list',
      method: 'get',
      params
    })
}

//获取制造中心信息
export function getManufacture(params) {
  return fetch({
    url: "/api/manufacture/" + params.code + "?detailed=true",
    method: "get"
  });
}

//添加数据
export function add(data) {
  return fetch({
    url: "/api/manufacture",
    method: "post",
    data
  });
}

//修改数据
export function edit(data) {
  return fetch({
    url: "/api/manufacture/" + data.zzzxbm,
    method: "put",
    data
  });
}

//删除数据
export function manufactureDelete(data) {
  return fetch({
    url: '/api/manufacture/',
    method: 'delete',
    data
  })
}

// 查询制造中心
export function getList() {
    return fetch({
      url: '/api/manufacture/listAll',
      method: 'get'
    })
}

