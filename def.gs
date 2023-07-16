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
  signalsUrl: "https://api.nature.global/1/signals/",
  get aircon26Dot5DegreeVolume2Url() {
    return def.signalsUrl + PropertiesService.getScriptProperties().getProperty("aircon26Dot5DegreeVolume2Id") + "/send";
  },
    get aircon25Dot5DegreeVolume2Url() {
    return def.signalsUrl + PropertiesService.getScriptProperties().getProperty("aircon25Dot5DegreeVolume2Id") + "/send";
  },
    get aircon24Dot5DegreeVolume2Url() {
    return def.signalsUrl + PropertiesService.getScriptProperties().getProperty("aircon24Dot5DegreeVolume2Id") + "/send";
  },
    get aircon26Dot5DegreeVolume3Url() {
    return def.signalsUrl + PropertiesService.getScriptProperties().getProperty("aircon26Dot5DegreeVolume3Id") + "/send";
  },
    get aircon25Dot5DegreeVolume3Url() {
    return def.signalsUrl + PropertiesService.getScriptProperties().getProperty("aircon25Dot5DegreeVolume3Id") + "/send";
  },
    get aircon24Dot5DegreeVolume3Url() {
    return def.signalsUrl + PropertiesService.getScriptProperties().getProperty("aircon24Dot5DegreeVolume3Id") + "/send";
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
  },
}