function doGet() {
    return HtmlService.createHtmlOutputFromFile('form'); // Ensure the HTML file name matches
}

function fetchMachinesData() {
    const fileId = '1G-CDJu9VhqqhjE1R-T6eUBx7KTaRW1JS'; // Insert your actual file ID for the JSON file
    const file = DriveApp.getFileById(fileId);
    const jsonData = file.getBlob().getDataAsString();
    return JSON.parse(jsonData);
}
function fetchRowsByPlateSelection(selectedValue) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Service1"); // Name of the sheet
  const data = sheet.getDataRange().getValues();
Logger.log("selectedValue");
    Logger.log(selectedValue);
  // Filter the rows where column C (index 2) matches the value, excluding the header row
  const filteredRows = data.slice(1).filter(row => row[2] === selectedValue);
   Logger.log("filteredRows");
    Logger.log(filteredRows);
  
 const headers = ["DATE", "MODEL", "PLATE/CO.NO", "HOUR", "TYPE"];
  // Convert the filtered rows into a map-like structure
  Logger.log("headers");
    Logger.log(headers);
  const data1 = filteredRows.map(row => {
    const rowMap = {};
    headers.forEach((header, index) => {
      rowMap[header] = row[index]; // Use header as key
      // If you prefer using column index instead of header:
      // rowMap[index] = row[index];
    });
    return rowMap;
  });

  const formattedData = data1.map(row => {
  return {
    DATE: Utilities.formatDate(row["DATE"], Session.getScriptTimeZone(), "yyyy-MM-dd"), 
    MODEL: row["MODEL"], 
    CONO: row["PLATE/CO.NO"], 
    HOUR: row["HOUR"], 
    TYPE: row["TYPE"]
  };
});
  return JSON.stringify(formattedData);
}
