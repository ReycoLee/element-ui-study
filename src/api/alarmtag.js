import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/alarmtag/list",
    method: "get",
    params
  });
}

// 删除
export function del(data) {
  return fetch({
    url: "/api/alarmtag/",
    method: "delete",
    data
  });
}
// 获取生产警报tag
export function getAlarmTag(params) {
  return fetch({
    url: "/api/alarmtag/" + params.bjxx+ "/" +params.gwbh,
    method: "get"
  });
}

// 新增生产警报tag
export function add(data) {
  return fetch({
    url: "/api/alarmtag",
    method: "post",
    data
  });
}
//修改生产警报tag信息
export function edit(data) {
  return fetch({
    url: "/api/alarmtag" ,
    method: "put",
    data
  });
}

// 获取 工艺线/工位 两表级联树
export function gwbhSelect(params) {
  return fetch({
    url: '/api/alarmtag/tree',
    method: 'get',
  })
}

export function bjlxbhSelect(params) {
  return fetch({
    url: '/api/alarmtag/bjlxbhSelect',
    method: 'get',
  })
}

export function scxbhSelect(params) {
  return fetch({
    url: '/api/alarmtag/scxbhSelect',
    method: 'get',
  })
}

export function gyxbhSelect(params) {
  return fetch({
    url: '/api/alarmtag/gyxbhSelect/'+ params.scxbh,
    method: 'get',
  })
}

export function getGwbhByGyx(params) {
  return fetch({
    url: '/api/alarmtag/gwbhByGyxSelect',
    method: 'get',
    params
  })
}

export function getGwbhByScx(params) {
  return fetch({
    url: '/api/alarmtag/gwbhByScxSelect/'+ params.scxbh,
    method: 'get',
  })
}