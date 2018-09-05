import fetch from 'common/fetch_usercenter'

//分页查询报警类型
export function list(params) {
  return fetch({
    url: '/api/massDefect/carList',
    method: 'get',
    params
  })
}

//生产车间下拉框
export function getSccjList() {
  return fetch({
    url: '/api/massDefect/getSccjList',
    method: 'get'
  })
}

//担当单位
export function getDddwList() {
  return fetch({
    url: '/api/massDefect/getDddwList',
    method: 'get'
  })
}

//质检工位
export function getZjgwList() {
  return fetch({
    url: '/api/massDefect/getGwList',
    method: 'get'
  })
}


//质检部位下拉框
export function zjbwList(params) {
  return fetch({
    url: '/api/massDefect/getZjbwOptions',
    method: 'get',
    params
  })
}

//质检部件下拉框
export function zjbjList(params) {
  return fetch({
    url: '/api/massDefect/getZjbjOptions',
    method: 'get',
    params
  })
}

//缺陷代码下拉框
export function qxdmList(params) {
  return fetch({
    url: '/api/massDefect/getQxdmOptions',
    method: 'get',
    params
  })
}


// 车辆缺陷列表
export function massDefectList(params) {
    return fetch({
      url: '/api/massDefect/list',
      method: 'get',
      params
    })
}

//合格 addHg
export function addHg(params) {
  return fetch({
    url: '/api/massDefect/addVinHg',
    method: 'post',
    params
  })
}

//判断是否去不合格页面 sfhg
export function sfhg(params) {
  return fetch({
    url: '/api/massDefect/toQxlb',
    method: 'get',
    params
  })
}


//获取车辆缺陷
export function getMassDefect(params) {
  return fetch({
    url: "/api/massDefect/clqxById",
    method: "get",
    params
  });
}

//添加车辆缺陷数据
export function add(data) {
  return fetch({
    url: "/api/massDefect",
    method: "post",
    data
  });
}

//修改数据
export function edit(data) {
  return fetch({
    url: "/api/massDefect",
    method: "put",
    data
  });
}


//删除数据
export function massDefectDelete(data) {
  return fetch({
    url: '/api/massDefect/',
    method: 'delete',
    data
  })
}
