import fetch from 'common/fetch_usercenter'

// 分页查询审核过滤零件列表
export function packList(params) {
    return fetch({
      url: '/api/filterpart/list',
      method: 'get',
      params
    })
}

//新增审核过滤零件信息
export function add(data) {
  return fetch({
    url: "/api/filterpart",
    method: "post",
    data
  });
}

//删除审核过滤零件信息
export function del(data) {
  return fetch({
    url: "/api/filterpart",
    method: "delete",
    data
  });
}


//修改数据
export function edit(params,data) {
  return fetch({
    url: "/api/filterpart/" + params.ljbh + "/" +params.ljzpxhd,
    method: "put",
    data
  });
}


//根据零件编号查询工位编号
export function gwbhList(params) {
  return fetch({
    url: '/api/filterpart/gwbhlist/'+ params.ljbh,
    method: 'get'
  })
}