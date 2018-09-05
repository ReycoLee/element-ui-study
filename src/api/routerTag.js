import fetch from 'common/fetch_usercenter'

// 路由指令交互列表
export function routerTagList(params) {
    return fetch({
      url: '/api/routerTag/list',
      method: 'get',
      params
    })
}

//获取路由指令交互信息
export function getRouterTag(params) {
  return fetch({
    url: "/api/routerTag/" + "?detailed=true",
    method: "get",
    params
  });
}

//添加数据
export function add(data) {
  return fetch({
    url: "/api/routerTag",
    method: "post",
    data
  });
}

//修改数据
export function edit(data) {
  return fetch({
    url: "/api/routerTag/",
    method: "put",
    data
  });
}

//删除数据
export function routerTagDelete(data) {
  return fetch({
    url: '/api/routerTag/',
    method: 'delete',
    data
  })
}

//获取存储区编号模糊查询
export function getAllByCcqbh(params) {
  return fetch({
    url: '/api/routerTag/ccqbh/'+ params.ccqbh,
    method: 'get',
    params
  })
}
