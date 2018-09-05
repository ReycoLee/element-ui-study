import fetch from 'common/fetch_usercenter'



//查询单个存储区信息
export function getStorageAreaForCar(params){
  return fetch({
    url: "/api/storageareaforcar/" + params.ccqbh,
    method: "get"
  });
}

// 存储区新增车辆
export function addCar(data) {
  return fetch({
    url: "/api/storageareaforcar",
    method: "post",
    data
  });
}

// 存储区替换车辆
export function changeCar(params) {
  return fetch({
    url: "/api/storageareaforcar/changeCar",
    method: "put",
    params
  });
}
// 存储区编辑车辆信息
export function editCar(params) {
  return fetch({
    url: "/api/storageareaforcar/editCar",
    method: "put",
    params
  });
}

// 存储区删除车辆
export function delCar(data) {
  return fetch({
    url: "/api/storageareaforcar",
    method: "delete",
    data
  });
}


// 存储区编辑车辆信息
export function getCar(params) {
  return fetch({
    url: "/api/storageareaforcar/getCar",
    method: "get",
    params
  });
}

