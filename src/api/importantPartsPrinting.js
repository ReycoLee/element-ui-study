import fetch from 'common/fetch_usercenter'
import download from "common/download_usercenter";

// 关重键清单列表
export function importantPartsPrintingList(params) {
    return fetch({
      url: '/api/importantPartsPrinting/list',
      method: 'get',
      params
    })
}

// 指定的打印物理点
export function getWldList() {
  return fetch({
    url: '/api/importantPartsPrinting/getWldList',
    method: 'get'
  })
}

//生成关重件 清单
export function scqdByVin(params) {
  return fetch({
    url: '/api/importantPartsPrinting/scqdByVin',
    method: 'post',
    params
  })
}

//打印关重件清单
export function dayin(params) {
  return fetch({
    url: '/api/importantPartsPrinting/dayin',
    method: 'get',
    params
  })
}