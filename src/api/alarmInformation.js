import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/alarminformation/list",
    method: "get",
    params
  });
}

export function getUserData() {
  return fetch({
    url: "/api/alarminformation/getUserData",
    method: "get"
  });
}

export function getBjData() {
  return fetch({
    url: "/api/alarminformation/getBjData",
    method: "get"
  });
}

export function edit(params) {
  return fetch({
    url: "/api/alarminformation/edit",
    method: "put",
    params
  });
}

export function getdatabyid(params) {
  return fetch({
    url: "/api/alarminformation/getDataById",
    method: "get",
    params
  });
}


