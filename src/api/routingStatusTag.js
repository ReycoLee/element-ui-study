import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/routstatustag/list",
    method: "get",
    params
  });
}

// 删除
export function del(data) {
  return fetch({
    url: "/api/routstatustag/",
    method: "delete",
    data
  });
}
// 获取
export function getTag(params) {
  return fetch({
    url: "/api/routstatustag/" + params.ccqbh+ "/" +params.lyzlfkxx,
    method: "get"
  });
}

// 新增
export function add(data) {
  return fetch({
    url: "/api/routstatustag",
    method: "post",
    data
  });
}
//修改
export function edit(data) {
  return fetch({
    url: "/api/routstatustag" ,
    method: "put",
    data
  });
}


export function ccqbhSelect(params) {
  return fetch({
    url: '/api/routstatustag/ccqbhSelect',
    method: 'get',
  })
}


