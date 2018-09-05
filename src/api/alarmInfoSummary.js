import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/alarmInfoSummary/list",
    method: "get",
    params
  });
}


