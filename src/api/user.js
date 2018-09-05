import fetch from "common/fetch_usercenter";

export function list(params) {
  return fetch({
    url: "/api/user/list?detailed=true",
    method: "get",
    params
  });
}

export function del(data) {
  return fetch({
    url: "/api/user",
    method: "delete",
    data
  });
}
//获取用户信息
export function getUser(params) {
  return fetch({
    url: "/api/user/" + params.code + "?detailed=true",
    method: "get"
  });
}

//添加数据
export function add(data) {
  return fetch({
    url: "/api/user",
    method: "post",
    data
  });
}
//修改数据
export function edit(data) {
  return fetch({
    url: "/api/user/" + data.code,
    method: "put",
    data
  });
}

export function getUserroleleft(params) {
  return fetch({
    url: "/api/user/" + params.code + "/role?notGranted=false",
    method: "get"
  });
}

export function getUserroleright(params) {
  params.notGranted = true;
  return fetch({
    url: "/api/user/" + params.code + "/role?notGranted=true",
    method: "get"
  });
}

export function saverole(data) {
  return fetch({
    url: "/api/user/" + data.code + "/role",
    method: "put",
    data
  });
}

export function resetpassword(data) {
  return fetch({
    url: "/api/user/resetPassword",
    method: "patch",
    data
  });
}

export function editOrg(data) {
  return fetch({
    url: "/api/user/" + data.code + "/org",
    method: "patch",
    data
  });
}

export function changePassword(data) {
  return fetch({
    url: "/api/user/password",
    method: "patch",
    data
  });
}

//systemListAdd 重新保存第三方账号
export function systemListAdd(data) {
  return fetch({
    url: "/api/user/third/account",
    method: "put",
    data
  });
}

//获取系统授权List systemList
export function systemList() {
  return fetch({
    url: "/api/user/third/account/list",
    method: "get"
  });
}

export function getToken(system) {
  return fetch({
    url: "/api/user/third/account?system="+system,
    method: "get"
  });
}
