/**
 * スプレッドシートに入力した室温より高く（低く）なったら、設定温度を下げる（上げる）。
 */
const clampTemperature = () => {
  const configSheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("spreadSheetId")).getSheetByName("config")

  // 使用することのフラグ
  const enabled = configSheet.getRange(1, 2).getValue()
  if (enabled != "ON") return;

  const remoSensorValues = getRemoSensorValues()
  // 現在の室温
  const temp = remoSensorValues.te.val
  // 室温の最小値
  const tempMin = configSheet.getRange(2, 2).getValue()
  // 現在の設定温度
  const airconTemp = getAirconTemp()
  // 設定温度の最大値
  const airconTempMax = configSheet.getRange(5, 2).getValue()

  if (temp < tempMin && airconTemp < airconTempMax) {
    const newAirconTemp = incrementTemperature();
    AppendValuesToSheet("airconLog", new Date(), airconTemp, newAirconTemp, temp, remoSensorValues.hu.val)
    return;
  }

  // 室温の最大値
  const tempMax = configSheet.getRange(3, 2).getValue()
  // 設定温度の最小値
  const airconTempMin = configSheet.getRange(4, 2).getValue()

  if (temp > tempMax && airconTemp > airconTempMin) {
    const newAirconTemp = decrementTemperature();
    AppendValuesToSheet("airconLog", new Date(), airconTemp, newAirconTemp, temp, remoSensorValues.hu.val)
    return;
  }
}

/**
 * ログ出力する。
 */
const log = () => {
  const SHEET_NAME = "log"
  const remoSensorValues = getRemoSensorValues();
  AppendValuesToSheet(SHEET_NAME, new Date(), remoSensorValues.te.val, remoSensorValues.hu.val, getAirconTemp())
}

/**
 * 設定温度を設定する。
 */
const setTemparature = () => {
  const configSheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("spreadSheetId")).getSheetByName("config")

  const enabled = configSheet.getRange(13, 2).getValue()
  if(enabled !== "ON") return
  
  const hour = configSheet.getRange(14, 2).getValue()
  if(new Date().getHours() !== hour) return

  const temp = configSheet.getRange(15, 2).getValue()
  setTemparature(temp)

  const airVolume = configSheet.getRange(16, 2).getValue()
  setAirVolume(airVolume)
}