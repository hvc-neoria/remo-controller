/**
 * 指定したシートの最終行の次の行に値を入力する。
 * @param {string} sheetName シート名
 * @param {string} ...values 値
 */
const AppendValuesToSheet = (sheetName, ...values) =>　{
  const sheet = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("spreadSheetId")).getSheetByName(sheetName)
  const lastRowPlus1 = sheet.getLastRow() + 1
  const range = sheet.getRange(lastRowPlus1, 1, 1, values.length)
  range.setValues([values])
}