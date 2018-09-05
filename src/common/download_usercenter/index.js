import { server_base_url_usercenter } from "common/config";
import { getToken } from "common/auth";

export default function download(options) {
  let query = "?";
  if (!options.paras) {
    options.paras = {};
  }
  options.paras["Doit-Token"] = getToken();
  let first = true;
  for (let i in options.paras) {
    if (!options.paras[i]) {
      continue;
    }
    if (first) {
      first = false;
    } else {
      query += "&";
    }
    query += i + "=" + options.paras[i];
  }

  let url = server_base_url_usercenter + options.url + query;
  window.open(url);
}
