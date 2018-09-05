import fetch from 'common/fetch_usercenter'

// 分页查询字典列表
export function dictionaryList(params) {
    return fetch({
      url: '/api/dictionary/list',
      method: 'get',
      params
    })
}

// 新增字典
export function dictionaryAdd(data) {
  return fetch({
    url: '/api/dictionary/',
    method: 'post',
    data
  })
}

// 删除字典
export function dictionaryDelete(data) {
  return fetch({
    url: '/api/dictionary/',
    method: 'delete',
    data
  })
}

// 获取字典信息
export function dictionaryEntryList(params) {
  return fetch({
    url: '/api/dictionary/entry/' + params.code + '/list',
    method: 'get',
    params
  })
}

// 根据字典类型获取字典信息
export function singlelist(params) {
  return fetch({
    url: '/api/dictionary/entry/' + params.code + '/singlelist',
    method: 'get',
    params
  })
}

// 获取条目详细信息
export function dictionaryEntryDetail(params) {
  return fetch({
    url: '/api/dictionary/entry/' + params.code,
    method: 'get',
    params
  })
}

// 新增条目/修改
export function dictionaryEntryAdd(data) {
  return fetch({
    url: '/api/dictionary/entry/',
    method: 'post',
    data
  })
}

// 条目修改
export function dictionaryEntryUpdate(data) {
  return fetch({
    url: '/api/dictionary/entry/',
    method: 'put',
    data
  })
}

// 删除条目
export function dictionaryEntryDelete(data) {
  return fetch({
    url: '/api/dictionary/entry/',
    method: 'delete',
    data
  })
}

// 获取条目树
export function dictionaryEntryTree(params) {
  return fetch({
    url: '/api/dictionary/entry/tree',
    method: 'get',
  })
}

//查询条目
export function getDictionary(params){
  return fetch({
    url: '/api/dictionary/entry',
    method: 'get',
    params
  })
}