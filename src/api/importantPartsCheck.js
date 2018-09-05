import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

//校验vin
export function checkVIN(params) {
  return fetch({
    url: '/api/importantPartsCheck/checkVIN',
    method: 'Get',
    params
  })
}

// 指定的打印物理点
export function getWldList() {
  return fetch({
    url: '/api/importantPartsCheck/getWldList',
    method: 'get'
  })
}

// 通过ip地址获取物理点
export function getWlds() {
  return fetch({
    url: '/api/importantPartsCheck/getWlds',
    method: 'get'
  })
}

// 分页查询
export function pageList(params) {
  return fetch({
    url: '/api/importantPartsCheck/pageList',
    method: 'Get',
    params
  })
}

//新增数据
export function add(data) {
  return fetch({
    url: '/api/importantPartsCheck',
    method: 'Post',
    data
  })
}

//校验
export function check(data) {
  return fetch({
    url: '/api/importantPartsCheck',
    method: 'Put',
    data
  })
}

// 根据主键删除数据
export function del(data) {
  return fetch({
    url: '/api/importantPartsCheck',
    method: 'delete',
    data
  })
}
