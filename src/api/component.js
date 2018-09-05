import fetch from 'common/fetch_usercenter'

// 分页查询零件
export function getComponentsList(params) {
    return fetch({
      url: '/api/component/list',
      method: 'get',
      params
    })
}

// 新增零件
export function componentAdd(data) {
  return fetch({
    url: '/api/component/',
    method: 'post',
    data
  })
}

// 修改零件
export function componentUpdate(data) {
  return fetch({
    url: '/api/component/' + data.ljbh,
    method: 'put',
    data
  })
}

// 删除零件
export function componentDelete(data) {
  return fetch({
    url: '/api/component/',
    method: 'delete',
    data
  })
}

//获取零件信息
export function getComponent(params) {
  return fetch({
    url: "/api/component/",
    method: "get",
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

//根据零件名称/零件编号查询零件列表
export function listAll(params) {
  return fetch({
    url: "/api/component/listAll/" + params.query,
    method: "get"
  });

}


export function allList(params) {
  return fetch({
    url: "/api/component/lists",
    method: "get",
    params
  });

}