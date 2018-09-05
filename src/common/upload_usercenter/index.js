import { server_base_url_usercenter } from "common/config";
import { getToken } from "common/auth";

export function fileUploadOptions(uri) {
  return {
    action: server_base_url_usercenter + uri,
    headers: {
      "Doit-Token": getToken()
    },
    showFileList: false
  };
}
