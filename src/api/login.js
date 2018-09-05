import fetch from "common/fetch_usercenter";

//登录
export function login(data) {
  return fetch({
    url: "/api/login",
    method: "post",
    data
  });
}
//登出
export function logout() {
  return fetch({
    url: "/api/logout",
    method: "post"
  });
}

export function captchaId() {
  return fetch({
    url: "/api/login/captchaId",
    method: "get"
  });
}
