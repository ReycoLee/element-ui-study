import fetch from "common/fetch_usercenter";
import download from "common/download_usercenter";

// 查询列表
export function list(params) {
  return fetch({
    url: "/api/collectionSheet/list",
    method: "get",
    params
  });
}

// 查询详情
export function getOne(params) {
  return fetch({
    url: "/api/collectionSheet/" + params.jpdbh,
    method: "get"
  });
}

// 查询车辆列表
export function getCarplanList(params) {
  return fetch({
    url: "/api/collectionSheet/carplanList/" + params.zzzx + "/" + params.zzsxsx,
    method: "get"
  });
}

// 查询明细列表
export function getDetailList(params) {
  return fetch({
    url: "/api/collectionSheet/detailList/" + params.jpdbh,
    method: "get"
  });
}

// 再验证
export function revalidation(params) {
  return fetch({
    url: "/api/collectionSheet/revalidation/" + params.jpdbhs,
    method: "put"
  });
}

// 强制放行
export function forceRelease(params) {
  return fetch({
    url: "/api/collectionSheet/forceRelease/" + params.jpdbhs,
    method: "put"
  });
}

// 手工拣选
export function manualPicking(params) {
  return fetch({
    url: "/api/collectionSheet/manualPicking/" + params.jpdbhs,
    method: "put"
  });
}

// 取消手工拣选
export function manualPickingCancel(params) {
  return fetch({
    url: "/api/collectionSheet/manualPickingCancel/" + params.jpdbhs,
    method: "put"
  });
}

// 导出集配单明细
export function downloadExcel(params) {
  return download({
    url: "/api/collectionSheet/download/" + params.jpdbh,
    method: "get"
  });
}

//集配单明细打印Excel
export function printerDetail(data) {
  return fetch({
    url: "/api/collectionSheet/collectionSheetPrinter", 
    method: "post", 
    data
  });
}  

//打印Excel
 export function printerExcel(data) {
  return fetch({
    url: "/api/collectionSheet/printerExcle", 
    method: "post", 
    data
  });
} 