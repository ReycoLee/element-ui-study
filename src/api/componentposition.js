import fetch from 'common/fetch_usercenter'
import download from "common/download_usercenter";

// 分页查询零件-工位列表
export function getComponentPositionList(params) {
  return fetch({
    url: '/api/componentposition/list',
    method: 'get',
    params
  })
}

// 新增
export function componentpositionAdd(data) {
  return fetch({
    url: '/api/componentposition/',
    method: 'post',
    data
  })
}

// 修改
export function componentpositionUpdate(data) {
  return fetch({
    url: '/api/componentposition/' + data.ljbh,
    method: 'put',
    data
  })
}

// 删除
export function componentpositionDelete(data) {
  return fetch({
    url: '/api/componentposition/',
    method: 'delete',
    data
  })
}

//获取零件-工位信息
export function getComponentposition(params) {
  return fetch({
    url: '/api/componentposition/',
    method: 'get',
    params
  });
}

//模板导出
export function download_excel() {
  return download({
    url: '/api/componentposition/download'
  })
}

//导出
export function downloads_excel(params) {
  return download({
    url: '/api/componentposition/exportdownload',
    paras:params
  })
}