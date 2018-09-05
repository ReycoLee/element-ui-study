import fetch from 'common/fetch_usercenter'

// 分页查询入道优先级规则列表
export function inpriorityruleList(params) {
    return fetch({
      url: '/api/inpriorityrule/list',
      method: 'get',
      params
    })
}

// 新增入道优先级规则
export function inpriorityruleAdd(data) {
  return fetch({
    url: '/api/inpriorityrule/',
    method: 'post',
    data
  })
}

// 修改入道优先级规则
export function inpriorityruleUpdate(data) {
  return fetch({
    url: '/api/inpriorityrule/' + data.code,
    method: 'put',
    data
  })
}

//获取单个入道优先级规则信息
export function getInpriorityrule(params) {
  return fetch({
    url: '/api/inpriorityrule/',
    method: 'get',
    params
  });
}

//获取字典数据
export function getDictionaryByCode(data) {
  return fetch({
    url: '/api/dictionary/entry/' + data.code + '/singlelist',
    method: 'get',
    data
  })
}

// 删除入道优先级规则信息
export function inpriorityruleDelete(data) {
  return fetch({
    url: '/api/inpriorityrule/',
    method: 'delete',
    data
  })
}
