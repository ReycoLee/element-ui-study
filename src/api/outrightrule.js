import fetch from 'common/fetch_usercenter'

// 分页查询出道权重规则列表
export function outrightruleList(params) {
    return fetch({
      url: '/api/outrightrule/list',
      method: 'get',
      params
    })
}

//获取单个出道权重规则信息
export function getOutrightrule(params) {
  return fetch({
    url: '/api/outrightrule/',
    method: 'get',
    params
  });
}

// 保存设置出道权重规则
export function szSave(data) {
  return fetch({
    url: '/api/outrightrule/'+ data.ccqbh,
    method: 'put',
    data
  })
}

//获取字典数据
export function getDictionaryByCode(data) {
  return fetch({
    url: '/api/dictionary/entry/' + data.code + '/singlelist',
    method: 'get',
    data
  })
}

//获取出道不可连排规则列表
export function outrightruleUnList(params) {
  return fetch({
    url: '/api/outrightrule/unserieslist',
    method: 'get',
    params
  })
}

//保存出道不可连排规则信息
export function unseriesAdd(data) {
  return fetch({
    url: '/api/outrightrule/unseries',
    method: 'post',
    data
  })
}

//修改出道不可连排规则信息
export function unseriesUpdate(data) {
  return fetch({
    url: '/api/outrightrule/unseries/'+ data.ccqbh,
    method: 'put',
    data
  })
}


//获取单个出道不可连排规则信息
export function getOutrightruleUnseries(params) {
  return fetch({
    url: '/api/outrightrule/unseries',
    method: 'get',
    params
  })
}

//出道数量约束规则
export function outrightruleCarList(params){
  return fetch({
    url: '/api/outrightrule/carrestrictlist',
    method: 'get',
    params
  })
}

//保存出道数量约束
export function outrightruleSlysAdd(data){
  return fetch({
    url: '/api/outrightrule/slys',
    method: 'post',
    data
  })
}

//获取单个出道不可连排规则信息
export function getOutrightruleCarrestrict(params) {
  return fetch({
    url: '/api/outrightrule/carrestrict',
    method: 'get',
    params
  })
}

//修改出道不可连排规则信息
export function slysUpdate(data) {
  return fetch({
    url: '/api/outrightrule/slys/'+ data.ccqbh,
    method: 'put',
    data
  })
}

//保存不可排规则
export function outrightruleBkpAdd(data){
  return fetch({
    url: '/api/outrightrule/bkp',
    method: 'post',
    data
  })
}

//修改不可排规则
export function bkpUpdate(data) {
  return fetch({
    url: '/api/outrightrule/bkp/'+ data.ccqbh,
    method: 'put',
    data
  })
}
//生效
export function effect(params) {
  return fetch({
    url: '/api/outrightrule/effect',
    method: 'put',
    params
  })
}

//失效
export function invalid(params) {
  return fetch({
    url: '/api/outrightrule/invalid',
    method: 'put',
    params
  })
}

//升级
export function addlevel(params) {
  return fetch({
    url: '/api/outrightrule/addlevel',
    method: 'put',
    params
  })
}

//降级
export function minuslevel(params) {
  return fetch({
    url: '/api/outrightrule/minuslevel',
    method: 'put',
    params
  })
}


// 删除
export function deleteData(params) {
  return fetch({
    url: "/api/outrightrule/",
    method: "delete",
    params
  });
}