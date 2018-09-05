import fetch from 'common/fetch_usercenter'

// 分页查询设备交互列表
export function pageList(params) {
    return fetch({
      url: '/api/equipmentinteraction/list',
      method: 'get',
      params
    })
}

// 新增设备交互
export function add(data) {
  return fetch({
    url: '/api/equipmentinteraction/',
    method: 'post',
    data
  })
}

// 得到设备交互信息
export function getEquipmentInteraction(params) {
  return fetch({
    url: '/api/equipmentinteraction/single',
    method: 'get',
    params
  })
}



// 修改设备交互
export function update(data) {
  return fetch({
    url: '/api/equipmentinteraction/' + data.bh,
    method: 'put',
    data
  })
}


//删除数据
export function del(data) {
  return fetch({
    url: '/api/equipmentinteraction',
    method: 'delete',
    data
  })
}

//查询所有数据或除本数据以外的数据
export function allExcept(params) {
  return fetch({
    url: '/api/equipmentinteraction/allexcept',
    method: 'get',
    params
  })
}

// 校验名称是否已使用
export function checkName(params) {
  return fetch({
    url: '/api/equipmentinteraction/checkname',
    method: 'get',
    params
  })
}