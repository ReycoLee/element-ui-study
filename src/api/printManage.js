import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// 分页查询
export function pageList(params) {
  return fetch({
    url: '/api/printJob/pageList',
    method: 'get',
    params
  })
}

// 打印
export function print(params) {
  return fetch({
    url: '/api/printJob/print' ,
    method: 'post',
    params
  })
}