import fetch from 'common/fetch_usercenter';
import download from "common/download_usercenter";

// EOL电检分页查询
export function EOLdjList(params) {
  return fetch({
    url: '/api/EOLdj/pageList',
    method: 'get',
    params
  })
}

// EOL电检数据
export function getEOLdj(params) {
  return fetch({
    url: '/api/EOLdj/EOLdj',
    method: 'get',
    params
  })
}

//删除EOL电检数据
export function delEOLdj(data) {
  return fetch({
    url: '/api/EOLdj',
    method: 'delete',
    data
  })
}

//EOL电检添加数据
export function EOLdjAdd(data) {
  return fetch({
    url: '/api/EOLdj',
    method: 'post',
    data
  })
}
//EOL电检修改数据
export function EOLdjEdit(data) {
  return fetch({
    url: '/api/EOLdj/',
    method: 'put',
    data
  })
}

// EOL电检配置分页查询
export function EOLdjpzList(params) {
  return fetch({
    url: '/api/EOLdjpz/pageList',
    method: 'get',
    params
  })
}

//EOL电检配置添加数据
export function EOLdjpzAdd(data) {
  return fetch({
    url: '/api/EOLdjpz',
    method: 'post',
    data
  })
}

//EOL电检配置修改数据
export function EOLdjpzEdit(data) {
  return fetch({
    url: '/api/EOLdjpz/',
    method: 'put',
    data
  })
}

// EOL电检配置单个数据
export function getEOLdjpz(params) {
  return fetch({
    url: '/api/EOLdjpz/EOLdjpz',
    method: 'get',
    params
  })
}

//删除EOL电检配置数据
export function delEOLdjpz(data) {
  return fetch({
    url: '/api/EOLdjpz',
    method: 'delete',
    data
  })
}

// 打标机分页查询
export function markingMachineList(params) {
  return fetch({
    url: '/api/markingMachine/pageList',
    method: 'get',
    params
  })
}

//打标机添加数据
export function markingMachineAdd(data) {
  return fetch({
    url: '/api/markingMachine',
    method: 'post',
    data
  })
}

//打标机修改数据
export function markingMachineEdit(data) {
  return fetch({
    url: '/api/markingMachine/',
    method: 'put',
    data
  })
}

// 打标机单个数据
export function getMarkingMachine(params) {
  return fetch({
    url: '/api/markingMachine/markingMachine',
    method: 'get',
    params
  })
}

//删除打标机数据
export function delMarkingMachine(data) {
  return fetch({
    url: '/api/markingMachine',
    method: 'delete',
    data
  })
}

//胎压检测仪分页查询
export function tyrePressureMonitorList(params) {
  return fetch({
    url: '/api/tyrePressureMonitor/pageList',
    method: 'get',
    params
  })
}

//胎压检测仪添加数据
export function tyrePressureMonitorAdd(data) {
  return fetch({
    url: '/api/tyrePressureMonitor',
    method: 'post',
    data
  })
}

//胎压检测仪修改数据
export function tyrePressureMonitorEdit(data) {
  return fetch({
    url: '/api/tyrePressureMonitor/',
    method: 'put',
    data
  })
}

//胎压检测仪单个数据
export function getTyrePressureMonitor(params) {
  return fetch({
    url: '/api/tyrePressureMonitor/tyrePressureMonitor',
    method: 'get',
    params
  })
}

//删除胎压检测仪数据
export function delTyrePressureMonitor(data) {
  return fetch({
    url: '/api/tyrePressureMonitor',
    method: 'delete',
    data
  })
}

//检测线分页查询
export function detectionLineList(params) {
  return fetch({
    url: '/api/detectionLine/pageList',
    method: 'get',
    params
  })
}

//检测线添加数据
export function detectionLineAdd(data) {
  return fetch({
    url: '/api/detectionLine',
    method: 'post',
    data
  })
}

//检测线修改数据
export function detectionLineEdit(data) {
  return fetch({
    url: '/api/detectionLine/',
    method: 'put',
    data
  })
}

//检测线单个数据
export function getDetectionLine(params) {
  return fetch({
    url: '/api/detectionLine/detectionLine',
    method: 'get',
    params
  })
}

//删除检测线数据
export function delDetectionLine(data) {
  return fetch({
    url: '/api/detectionLine',
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

//导出EOL电检Excel
export function download_EOLdj_excel(data) {
  return download({
    url: "/api/EOLdj/download",
    paras: data
  });
}

//导出EOL电检配置Excel
export function download_EOLdjpz_excel(data) {
  return download({
    url: "/api/EOLdjpz/download",
    paras: data
  });
}

//导出打标机Excel
export function download_markingMachine_excel(data) {
  return download({
    url: "/api/markingMachine/download",
    paras: data
  });
}

//导出胎压检测仪Excel
export function download_tyrePressureMonitor_excel(data) {
  return download({
    url: "/api/tyrePressureMonitor/download",
    paras: data
  });
}

//导出检测线Excel
export function download_detectionLine_excel(data) {
  return download({
    url: "/api/detectionLine/download",
    paras: data
  });
}

//模糊查询产线号
export function getCXH(params) {
  return fetch({
    url: '/api/carModel/cxh',
    method: 'get',
    params
  })
}