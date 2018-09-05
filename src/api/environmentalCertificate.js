

import fetch from 'common/fetch_usercenter'

//分页查询机构
export function list(params) {
  return fetch({
    url: '/api/environmentalCertificate/list?detailed=true',
    method: 'get',
    params
  })
}

//环保证书生成
export function generatorEnvironData(params) {
    return fetch({
      url: '/api/environmentalCertificate/generatorEnvironDataList?detailed=true',
      method: 'get',
      params
    })
  }

//获取大车型模糊查询数据
export function  dcxList(params){
  return fetch({
    url: '/api/environmentalCertificate/getDcxList',
    method: 'get',
    params
  })
}

// 分页查询
export function cxList(params) {
  return fetch({
    url: '/api/environmentalCertificate/carModelList',
    method: 'get',
    params
  })
}

//产线唯一编号集合
export function listAll() {
  return fetch({
    url: '/api/environmentalCertificate/listAll',
    method: 'get'
  })
}

//生产区段联动新增数据
export function getScqdCode(params) {
  return fetch({
    url: '/api/environmentalCertificate/scqd?code=' + params.code,
    method: 'get'
  })
}

//删除物理点类型
export function del(data) {
  return fetch({
    url: "/api/environmentalCertificate/" + data.vin,
    method: "delete",
    data
  });
}

//获取物理点类型对象信息
export function getEnvironmentalCertificate(params) {
  return fetch({
    url: '/api/environmentalCertificate/' + params.vin + '?detailed=true',
    method: 'get'
  })
}

//添加数据
export function add(data) {
  return fetch({
    url: '/api/environmentalCertificate',
    method: 'post',
    data
  })
}

//校验物理点类型值是否存在
export function findByPhyPoint(params) {
  return fetch({
    url: '/api/environmentalCertificate/check/' + params.wldlx,
    method: 'get'
  })
}

//修改数据
export function edit(data) {
  return fetch({
    url: '/api/environmentalCertificate/' + data.vin,
    method: 'put',
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


//打印环保证书
export function printerExcel(data) {
  return fetch({
    url: "/api/environmentalCertificate/environmentalCertificatePrinter", 
    method: "post", 
    data
  });
}

//打印合格证
export function printerCertificate(data) {
  return fetch({
    url: "/api/environmentalCertificate/certificatePrinter", 
    method: "post", 
    data
  });
}

//打印一致性证书
export function printerConformanceCertificate(data) {
  return fetch({
    url: "/api/environmentalCertificate/conformanceCertificatePrinter", 
    method: "post", 
    data
  });
}


