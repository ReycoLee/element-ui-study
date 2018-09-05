import fetch from 'common/fetch_usercenter'

// 分页查询存储区列表
export function list(params) {
    return fetch({
      url: '/api/storagearea/list',
      method: 'get',
      params
    })
}

//删除存储区信息
export function del(data) {
  return fetch({
    url: "/api/storagearea",
    method: "delete",
    data
  });
}

//新增存储区信息
export function add(data) {
  return fetch({
    url: "/api/storagearea",
    method: "post",
    data
  });
}

//查询单个存储区信息
export function getStorageArea(params){
  return fetch({
    url: "/api/storagearea/" + params.ccqbh,
    method: "get"
  });
}


//修改数据
export function edit(data) {
  return fetch({
    url: "/api/storagearea/" + data.ccqbh,
    method: "put",
    data
  });
}

//获取模拟排产结果
export function getAnalogList(params){
  return fetch({
    url: "/api/storagearea/analoglist/" + params.ccqbh,
    method: "get"
  });
}

//获取存储区编号
export function getCcqbh(){
  return fetch({
    url: "/api/storagearea/ccqbhlist/",
    method: "get"
  });
}