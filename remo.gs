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
  if(data[4].id !== PropertiesService.getScriptProperties().getProperty("airconId")) {
    throw new Error("家電データの5番目のIDが、エアコンのIDではありませんでした。")
  }
  const temp = data[4].settings.temp
  const tempInt = parseInt(temp)
  return tempInt
}

/**
 * 設定温度を設定する。
 * @param {number} temp 設定温度
 * @return {Object} 設定後のエアコンの設定
 */
const setAirconTemp = temp => {
  const optionsWithPayload = Object.assign({}, def.postingOptions)
  optionsWithPayload.payload = "temperature=" + temp
  return JSON.parse(UrlFetchApp.fetch(def.airconSettingsUrl, optionsWithPayload))
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