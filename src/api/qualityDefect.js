import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// 部位分页查询
export function positionList(params) {
  return fetch({
    url: '/api/qualityDefect/position/pageList',
    method: 'get',
    params
  })
}

// 获取一个部位数据
export function getPosition(params) {
  return fetch({
    url: '/api/qualityDefect/position/position',
    method: 'get',
    params
  })
}

// 新增部位数据
export function addPosition(data) {
  return fetch({
    url: '/api/qualityDefect/position',
    method: 'Post',
    data
  })
}

//编辑部位数据
export function editPosition(data) {
  return fetch({
    url: '/api/qualityDefect/position',
    method: 'Put',
    data
  })
}

//删除部位数据
export function delPosition(data) {
  return fetch({
    url: '/api/qualityDefect/position',
    method: 'delete',
    data
  })
}

// 部件分页查询
export function partList(params) {
  return fetch({
    url: '/api/qualityDefect/part/pageList',
    method: 'get',
    params
  })
}

// 获取一个部件数据
export function getPart(params) {
  return fetch({
    url: '/api/qualityDefect/part/part',
    method: 'get',
    params
  })
}

// 新增部件数据
export function addPart(data) {
  return fetch({
    url: '/api/qualityDefect/part',
    method: 'Post',
    data
  })
}

//编辑部件数据
export function editPart(data) {
  return fetch({
    url: '/api/qualityDefect/part',
    method: 'Put',
    data
  })
}

//删除部件数据
export function delPart(data) {
  return fetch({
    url: '/api/qualityDefect/part',
    method: 'delete',
    data
  })
}

// 缺陷描述分页查询
export function defectList(params) {
  return fetch({
    url: '/api/qualityDefect/defect/pageList',
    method: 'get',
    params
  })
}

// 获取一个缺陷描述数据
export function getDefect(params) {
  return fetch({
    url: '/api/qualityDefect/defect/defect',
    method: 'get',
    params
  })
}

// 新增缺陷描述数据
export function addDefect(data) {
  return fetch({
    url: '/api/qualityDefect/defect',
    method: 'Post',
    data
  })
}

//编辑缺陷描述数据
export function editDefect(data) {
  return fetch({
    url: '/api/qualityDefect/defect',
    method: 'Put',
    data
  })
}

//删除缺陷描述数据
export function delDefect(data) {
  return fetch({
    url: '/api/qualityDefect/defect',
    method: 'delete',
    data
  })
}

//获取字典数据
export function getDictionaryByCode(data) {
  return fetch({
    // url: '/api/carModel/' + data.code + '/code',
    url: '/api/dictionary/entry/' + data.code + '/singlelist',
    method: 'get',
    data
  })
}

// 新增责任单位
export function addZrdw(data) {
  return fetch({
    url: '/api/auditConfigure/addZrdw',
    method: 'Post',
    data
  })
}