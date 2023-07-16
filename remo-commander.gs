/**
 * 設定温度を1度上げる
 * @return {Number} 変更後の設定温度
 */
const incrementTemperature = () => {
  const newTemp = getAirconTemp() + 1;
  setAirconTemp(newTemp);
  return newTemp;
}

/**
 * 設定温度を1度下げる
 * @return {Number} 変更後の設定温度
 */
const decrementTemperature = () => {
  const newTemp = getAirconTemp() - 1;
  setAirconTemp(newTemp);
  return newTemp;
}

/**
 * 設定温度を0.5度上げる
 * @return {Number} 変更後の設定温度
 */
const increaseHalfDegree = () => {
  const airconTemp = getAirconTemp()
  const remoteSheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("spreadSheetId")).getSheetByName("remote")
  const sheetTemp = remoteSheet.getRange(3, 1).getValue()
  const preferredTemp = Math.abs(airconTemp - sheetTemp) <= 0.5 ? sheetTemp : airconTemp
  const newTemp = preferredTemp + 0.5
  setAirconTemp(newTemp)
  remoteSheet.getRange(3, 1).setValue(newTemp)
  return newTemp;
}

/**
 * 設定温度を1度下げる
 * @return {Number} 変更後の設定温度
 */
const decreaseHalfDegree = () => {
  const airconTemp = getAirconTemp()
  const remoteSheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("spreadSheetId")).getSheetByName("remote")
  const sheetTemp = remoteSheet.getRange(3, 1).getValue()
  const preferredTemp = Math.abs(airconTemp - sheetTemp) <= 0.5 ? sheetTemp : airconTemp
  const newTemp = preferredTemp - 0.5
  setAirconTemp(newTemp)
  remoteSheet.getRange(3, 1).setValue(newTemp)
  return newTemp;
}

/**
 * Remoのセンサーの値を取得する。
 * @return {Object} Remoのセンサーの値
 */
const getRemoSensorValues = () => {
  const data = JSON.parse(UrlFetchApp.fetch(def.remoUrl, def.gettingOptions));
  return data[0].newest_events
}

/**
 * 設定温度を取得する。
 * @return {number} 設定温度
 */
const getAirconTemp = () => {
  const data = JSON.parse(UrlFetchApp.fetch(def.appliancesUrl, def.gettingOptions))

  // 私の環境の場合インデックスが4のデータがエアコンだったため、インデックスを4としている。
  if (data[4].id !== PropertiesService.getScriptProperties().getProperty("airconId")) {
    throw new Error("家電データの5番目のIDが、エアコンのIDではありませんでした。")
  }
  const temp = data[4].settings.temp
  const tempInt = parseInt(temp)
  return tempInt
}

/**
 * 風量を取得する。
 * @return {number} 風量
 */
const getAirconVolume = () => {
  const data = JSON.parse(UrlFetchApp.fetch(def.appliancesUrl, def.gettingOptions))

  // 私の環境の場合インデックスが4のデータがエアコンだったため、インデックスを4としている。
  if (data[4].id !== PropertiesService.getScriptProperties().getProperty("airconId")) {
    throw new Error("家電データの5番目のIDが、エアコンのIDではありませんでした。")
  }
  const volume = data[4].settings.vol
  const volumeInt = parseInt(volume)
  return volumeInt
}


/**
 * 設定温度を設定する。
 * @param {number} temp 設定温度
 * @return {Object} 設定後のエアコンの設定
 */
const setAirconTemp = temp => {
  if (Number.isInteger(temp)) {
    const optionsWithPayload = Object.assign({}, def.postingOptions)
    optionsWithPayload.payload = "temperature=" + temp
    return JSON.parse(UrlFetchApp.fetch(def.airconSettingsUrl, optionsWithPayload))
  }
  const optionsWithPayload = Object.assign({}, def.postingOptions)
  if(getAirconVolume() === 3)
  {
    if(temp === 26.5) {
      return JSON.parse(UrlFetchApp.fetch(def.aircon26Dot5DegreeVolume3Url, optionsWithPayload))
    }
    if(temp === 25.5) {
      return JSON.parse(UrlFetchApp.fetch(def.aircon25Dot5DegreeVolume3Url, optionsWithPayload))
    }
    if(temp === 24.5) {
      return JSON.parse(UrlFetchApp.fetch(def.aircon24Dot5DegreeVolume3Url, optionsWithPayload))
    }
  }
  if(temp === 26.5) {
    return JSON.parse(UrlFetchApp.fetch(def.aircon26Dot5DegreeVolume2Url, optionsWithPayload))
  }
  if(temp === 25.5) {
    return JSON.parse(UrlFetchApp.fetch(def.aircon25Dot5DegreeVolume2Url, optionsWithPayload))
  }
  if(temp === 24.5) {
    return JSON.parse(UrlFetchApp.fetch(def.aircon24Dot5DegreeVolume2Url, optionsWithPayload))
  }
  throw new Error("指定した設定温度は対応しておりません。")
}

/**
 * 風量を設定する。
 * @param {number} volume 風量
 * @return {Object} 設定後のエアコンの設定
 */
const setAirVolume = volume => {
  const optionsWithPayload = Object.assign({}, def.postingOptions)
  optionsWithPayload.payload = "air_volume=" + volume
  return JSON.parse(UrlFetchApp.fetch(def.airconSettingsUrl, optionsWithPayload))
}