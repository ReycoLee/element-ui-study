//导入模块
import * as api_file from "./file";
import * as api_table from "./table";
import * as api_login from "./login";
import * as api_org from "./org";
import * as api_role from "./role";
import * as api_user from "./user";
import * as api_dataPermission from "./dataPermission";
import * as api_leftMenu from "./leftMenu";
import * as api_menu from "./menu";
import * as api_saibong from "./saibong";
import * as api_dictionary from "./dictionary";
import * as api_api from "./api";
import * as api_log from "./log";
import * as api_component from "./component";
import * as api_zcjhdd from "./zcjhdd";
import * as api_bom from "./bom";
import * as api_bomFlattening from "./bomFlattening";
import * as api_bomCombine from "./bomCombine";
import * as api_manufacture from "./manufacture";
import * as api_componentposition from "./componentposition";
import * as api_station from "./station";
import * as api_pack from "./pack";
import * as api_componentPack from "./componentPack";
import * as api_storageArea from "./storageArea";
import * as api_productionLine from "./productionLine";
import * as api_workshop from "./workshop";
import * as api_physicalpoint from "./physicalpoint";
import * as api_physical from "./physical";
import * as api_workcalendar from "./workcalendar";
import * as api_workorder from "./workorder";
import * as api_processLine from "./processLine";
import * as api_carModel from "./carModel";
import * as api_alarmtag from "./alarmtag";
import * as api_alarmType from "./alarmType";
import * as api_carOptTag from "./carOptTag";
import * as api_partSupplier from "./partSupplier";
import * as api_inpriorityrule from "./inpriorityrule";
import * as api_carModelAI from "./carModelAI";
import * as api_carPointSeacher from "./carPointSeacher";
import * as api_routerTag from "./routerTag";
import * as api_accessRule from "./accessRule";
import * as api_carPlanOrder from "./carPlanOrder";
import * as api_vehicleTechnology from "./vehicleTechnology";
import * as api_storageAreaForCar from "./storageAreaForCar";
import * as api_carInsertOutSearcher from "./carInsertOutSearcher";
import * as api_carFreezeCode from "./carFreezeCode";
import * as api_assemblyZone from "./assemblyZone";
import * as api_assemblyStation from "./assemblyStation";
import * as api_assemblyShelves from "./assemblyShelves";
import * as api_assemblyLocation from "./assemblyLocation";
import * as api_collectionSheetTag from "./collectionSheetTag";
import * as api_outrightrule from "./outrightrule";
import * as api_classAlarmSearcher from "./classAlarmSearcher";
import * as api_processLineAlarmSearcher from "./processLineAlarmSearcher";
import * as api_stationAlarmSearcher from "./stationAlarmSearcher";
import * as api_filterpart from "./filterpart";
import * as api_alarmInfoSummary from "./alarmInfoSummary";
import * as api_alarmInformation from "./alarmInformation";
import * as api_scale from "./scale";
import * as api_processDocument from "./processDocument";
import * as api_third from './third'
import * as api_collectionSheet from "./collectionSheet";
import * as api_goodsorder from "./goodsorder";
import * as api_routingStatusTag from "./routingStatusTag";
import * as api_qualityDefect from "./qualityDefect";
import * as api_alarm from "./alarm";
import * as api_carRework from "./carRework";
import * as api_massDefect from "./massDefect";
import * as api_importantPartsPrinting from "./importantPartsPrinting";
import * as api_auditDefect from "./auditDefect";
import * as api_storageAreaInOut from './storageAreaInOut'
import * as api_offlineTrace from "./offlineTrace";
import * as api_carEnvironmentProtect from "./carEnvironmentProtect";
import * as api_environmentalCertificate from './environmentalCertificate'
import * as api_calendarClass from './calendarClass'
import * as api_calendarClassEdition from './calendarClassEdition'
import * as api_auditConfigure from "./auditConfigure";
import * as api_threeDimensional from './threeDimensional';
import * as api_importantPartsCheck from './importantPartsCheck';
import * as api_sysMqLog from "./sysMqLog";
import * as api_printManage from "./printManage";
import * as api_plcPassageway from "./plcPassageway";
import * as api_tagPoint from "./tagPoint";
// 新增
import * as api_tagLogSetting from "./tagLogSetting";
import * as api_activeinteraction from "./activeinteraction";
import * as api_activeinteractionforpoint from "./activeinteractionforpoint";
import * as api_equipmentinteraction from "./equipmentinteraction";


const apiObj = {
  api_file,
  api_table,
  api_login,
  api_org,
  api_role,
  api_user,
  api_dataPermission,
  api_leftMenu,
  api_menu,
  api_saibong,
  api_dictionary,
  api_api,
  api_log,
  api_pack,
  api_zcjhdd,
  api_bom,
  api_bomFlattening,
  api_component,
  api_bomCombine,
  api_manufacture,
  api_componentposition,
  api_componentPack,
  api_storageArea,
  api_station,
  api_productionLine,
  api_workshop,
  api_physicalpoint,
  api_physical,
  api_workcalendar,
  api_workorder,
  api_processLine,
  api_carModel,
  api_alarmtag,
  api_alarmType,
  api_carOptTag,
  api_partSupplier,
  api_inpriorityrule,
  api_carModelAI,
  api_carPointSeacher,
  api_routerTag,
  api_accessRule,
  api_carPlanOrder,
  api_storageAreaForCar,
  api_carInsertOutSearcher,
  api_carFreezeCode,
  api_assemblyZone,
  api_assemblyStation,
  api_assemblyShelves,
  api_assemblyLocation,
  api_collectionSheetTag,
  api_outrightrule,
  api_vehicleTechnology,
  api_classAlarmSearcher,
  api_processLineAlarmSearcher,
  api_stationAlarmSearcher,
  api_filterpart,
  api_alarmInfoSummary,
  api_alarmInformation,
  api_scale,
  api_processDocument,
  api_third,
  api_collectionSheet,
  api_goodsorder,
  api_routingStatusTag,
  api_qualityDefect,
  api_alarm,
  api_carRework,
  api_massDefect,
  api_importantPartsPrinting,
  api_auditDefect,
  api_storageAreaInOut,
  api_offlineTrace,
  api_carEnvironmentProtect,
  api_environmentalCertificate,
  api_calendarClass,
  api_calendarClassEdition,
  api_auditConfigure,
  api_threeDimensional,
  api_importantPartsCheck,
  api_sysMqLog,
  api_printManage,
  api_plcPassageway,
  api_tagPoint,
  // 新增
  api_tagLogSetting,
  api_activeinteraction,
  api_activeinteractionforpoint,
  api_equipmentinteraction,
};

const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;

  //定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get() {
        return apiObj;
      }
    }
  });
};

export default {
  install
};
