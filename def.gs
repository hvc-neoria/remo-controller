/**
 * 定数。
 * 非公開データはPropertiesServiceのScriptPropertiesに設定している。
 */
const def = {
  remoUrl: "https://api.nature.global/1/devices",
  appliancesUrl: "https://api.nature.global/1/appliances",
  get airconSettingsUrl() {
    return def.appliancesUrl + "/" + PropertiesService.getScriptProperties().getProperty("airconId") + "/aircon_settings";
  },

  gettingOptions: {
    method: "get",
    headers: {
      "Content-Type": "application/json;",
      get authorization() {
        return "Bearer " + PropertiesService.getScriptProperties().getProperty("accessToken")
      }
    },
  },

  postingOptions: {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      get authorization() {
        return "Bearer " + PropertiesService.getScriptProperties().getProperty("accessToken")
      },
      accept: "application/json",
    },
  }
}