import fetch from 'common/fetch_usercenter'

// 车辆交互信息列表
export function carOptTagList(params) {
    return fetch({
      url: '/api/carOptTag/list',
      method: 'get',
      params
    })
}

//获取车辆交互信息
export function getCarOptTag(params) {
  return fetch({
    url: "/api/carOptTag/" + "?detailed=true",
    method: "get",
    params
  });
}

//添加数据
export function add(data) {
  return fetch({
    url: "/api/carOptTag",
    method: "post",
    data
  });
}

//修改数据
export function edit(data) {
  return fetch({
    url: "/api/carOptTag/",
    method: "put",
    data
  });
}

//删除数据
export function carOptTagDelete(data) {
  return fetch({
    url: '/api/carOptTag/',
    method: 'delete',
    data
  })
}
