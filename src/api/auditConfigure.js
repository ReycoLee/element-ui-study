import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// 分页查询
export function pageList(params) {
  return fetch({
    url: '/api/auditConfigure/pageList',
    method: 'get',
    params
  })
}

// Audit大车型配置信息
export function getAuditConfigure(params) {
  return fetch({
    url: '/api/auditConfigure/auditConfigure' ,
    method: 'get',
    params
  })
}

//根据Audit大车型配置主键删除数据
export function del(data) {
  return fetch({
    url: '/api/auditConfigure',
    method: 'delete',
    data
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/auditConfigure',
    method: 'post',
    data
  })
}
//修改数据
export function edit(data) {
  return fetch({
    url: '/api/auditConfigure',
    method: 'put',
    data
  })
}

//获取大车型列表
export function dcxList(params) {
  return fetch({
    url: '/api/auditConfigure/dcxs',
    method: 'get',
    params
  })
}