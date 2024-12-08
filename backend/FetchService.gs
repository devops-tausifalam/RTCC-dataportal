function fetchServiceData(coNo) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Service1"); // Name of the sheet
  const data = sheet.getDataRange().getValues();

  // Create an array to hold the matched data
  const matchedData = data.filter(row => row[2] === coNo); // Filter based on column C (Co.No)

  // If a match is found, return the first match only
  if (matchedData.length > 0) {
    return {
      date: matchedData[0][0], // Column A (Date)
      model: matchedData[0][1], // Column B (Model)
      hour: matchedData[0][3], // Column D (Hour)
      type: matchedData[0][4] // Column E (Type)
    };
  }
  return null; // No match found
}
