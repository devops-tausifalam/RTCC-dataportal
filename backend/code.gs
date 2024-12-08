// This function will be called when the form is submitted
function doPost(e) {
  var sheetName = 'service1'; // Name of the sheet where you want to save data
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  // Get the data from the form submission
  var data = [
    e.parameter.date_service,
    e.parameter.model,
    e.parameter.plate_number,
    e.parameter.hour_km,
    e.parameter.type,
    e.parameter.oil_filter ? '✓' : '',
    e.parameter.fuel_filter ? '✓' : '',
    e.parameter.water_sep ? '✓' : '',
    e.parameter.air_filter ? '✓' : '',
    e.parameter.transmission_filter ? '✓' : '',
    e.parameter.return_filter ? '✓' : '',
    e.parameter.drain_filter ? '✓' : '',
    e.parameter.line_filter ? '✓' : '',
    e.parameter.strainer ? '✓' : '',
    e.parameter.engine_oil,
    e.parameter.hyd_oil,
    e.parameter.transmission_oil,
    e.parameter.final_drive_oil,
    e.parameter.swing_motor_oil,
    e.parameter.battery,
    e.parameter.site
  ];
  
  // Append the data to the sheet
  sheet.appendRow(data);
  
  // Return a success message
  return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
}
