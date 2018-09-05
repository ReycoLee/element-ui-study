import Cookies from "js-cookie";

const TokenKey = "Doit-Token";
const BtnBListKey = "BtnBList";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getBtnBList() {
  let data = Cookies.get(BtnBListKey);
  let ds = [];
  if (data && data !== "") {
    ds = data.split("-");
  }
  let ret = {};
  for (let i in ds) {
    ret[ds[i]] = true;
  }
  return ret;
}

export function setBtnBList(data) {
  return Cookies.set(BtnBListKey, data);
}

export function removeBtnBList() {
  return Cookies.remove(BtnBListKey);
}
