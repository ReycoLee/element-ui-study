import fetch from 'common/fetch_usercenter'
import download from "common/download_usercenter";

// 三坐标车型列表
export function threeDimensionalList(params) {
    return fetch({
      url: '/api/threeDimensional/list',
      method: 'get',
      params
    })
}

//车辆列表
export function threeDimensionalCarList(params) {
  return fetch({
    url: '/api/threeDimensional/carList',
    method: 'get',
    params
  })
}

//添加车辆 addCar
export function addCar(params) {
  return fetch({
    url: '/api/threeDimensional/addCar',
    method: 'post',
    params
  })
}

//通过VIN删除 车辆数据 / 车面数据 / 测量数据
export function deleteAllByVin(params) {
  return fetch({
    url: '/api/threeDimensional/deleteAllByVin',
    method: 'delete',
    params
  })
}

// 车面数据列表
export function threeDimensionalDataList(params) {
  return fetch({
    url: '/api/threeDimensional/dataList',
    method: 'get',
    params
  })
}

// 测量数据列表
export function threeDimensionalDataClList(params) {
  return fetch({
    url: '/api/threeDimensional/dataClList',
    method: 'get',
    params
  })
}

// 增加车型
export function add(params) {
  return fetch({
    url: '/api/threeDimensional',
    method: 'post',
    params
  })
}

//通过ID清除车面数据
export function deleteDataByVin(params) {
  return fetch({
    url: '/api/threeDimensional/deleteDataByVin',
    method: 'delete',
    params
  })
}

//通过id清除测量数据
export function deleteClDataByVin(params) {
  return fetch({
    url: '/api/threeDimensional/deleteClDataByVin',
    method: 'delete',
    params
  })
}

//通过id删除车型 以及其下的所有的三坐标数据  车面/测量 数据
export function deleteAllById(params) {
  return fetch({
    url: '/api/threeDimensional/deleteAllById',
    method: 'delete',
    params
  })
}

//导出Excel
export function download_excel(data) {
  return download({
    url: "/api/threeDimensional/download",
    method: 'get',
    paras: data
  });
}