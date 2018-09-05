import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/calendarclass/list",
    method: "get",
    params
  });
}

export function del(data) {
  return fetch({
    url: "/api/calendarclass/",
    method: "delete",
    data
  });
}

export function getCalendarClass(params) {
  return fetch({
    url: "/api/calendarclass/" + params.sxh+ "/" +params.bcbh,
    method: "get"
  });
}

export function add(data) {
  return fetch({
    url: "/api/calendarclass",
    method: "post",
    data
  });
}
export function edit(data) {
  return fetch({
    url: "/api/calendarclass" ,
    method: "put",
    data
  });
}



export function cxwybmSelect(params) {
  return fetch({
    url: '/api/calendarclass/cxwybmSelect',
    method: 'get',
  })
}


export function getmbbh(params) {
  return fetch({
    url: '/api/calendarclass/mbbhlist',
    method: 'get',
  })
}




