import fetch from 'common/fetch_usercenter'


//自动出道集合
export function atuoOutList(params) {
  return fetch({
    url: '/api/storageareacontrol/autoout/'+params.ccqbh+'/'+params.jscdcls,
    method: 'get',
  })
}

//手动出道集合
export function manualOutList(params) {
  return fetch({
    url: '/api/storageareacontrol/manualout/'+params.ccqbh,
    method: 'get',
  })
}

//目前自动出道内容
export function autoOutData(params) {
  return fetch({
    url: '/api/storageareacontrol/autooutdata/'+params.ccqbh,
    method: 'get',
  })
}

//存储区车辆信息
export function carInStorage(params) {
  return fetch({
    url: '/api/storageareacontrol/'+params.ccqbh,
    method: 'get',
  })
}


//删除出道车辆
export function delOutCar(data) {
  return fetch({
    url: '/api/storageareacontrol/',
    method: "delete",
    data
  });
}


//检查车辆是否在出道队列中
export function checkCarInOrNot(params) {
  return fetch({
    url: '/api/storageareacontrol/'+params.ccqbh+'/'+params.vin,
    method: 'get',
  });
}

//将手动选择的车辆添加至出道队列中
export function manualInOutQueue(data) {
  return fetch({
    url: '/api/storageareacontrol',
    method: 'post',
    data
  });
}


//查看存储区是否开启自动出入道
export function storageStatus(params) {
  return fetch({
    url: '/api/storageareacontrol/storageStatus/'+params.ccqbh,
    method: 'get',
  })
}


//关闭自动出道
export function stopAutoOut(params) {
  return fetch({
    url: '/api/storageareacontrol/stopautoout/'+params.ccqbh,
    method: 'put',
  })
}
