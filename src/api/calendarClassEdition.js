import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/calendarClassEdition/list",
    method: "get",
    params
  });
}



export function getData(params) {
  return fetch({
    url: "/api/calendarClassEdition/" + params.sxh+ "/" +params.bcbh+ "/" +params.scxbh+ "/" +params.gzr,
    method: "get"
  });
}

export function save(params) {
  return fetch({
    url: "/api/calendarClassEdition",
    method: "post",
    params
  });
}
export function edit(data) {
  return fetch({
    url: "/api/calendarClassEdition" ,
    method: "put",
    data
  });
}



export function getbcbh() {
  return fetch({
    url: "/api/calendarClassEdition/bcbhlist",
    method: "get"
  });
}







