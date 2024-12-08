function saveServiceData(data) {
    // Debugging: Log incoming data
    Logger.log("Received data: " + JSON.stringify(data));

    if (!data || !data.dateService || !data.model || !data.plateCoNo || !data.hourKM || !data.type || !data.site) {
        Logger.log("Validation failed. One or more fields are missing.");
        return { success: false, message: "Missing required fields." }; // Return error if any required field is missing
    }

    const sheetId = '1Wb0Rg5iKMDGIwOuRCrRVmn1JiVYk5vlzGR9smkGw3Pc'; //your sheet ID
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('service1');
    
    // Check if the sheet is valid
    if (!sheet) {
        Logger.log("Error: Sheet not found.");
        return { success: false, message: "Sheet not found." };
    }

    // Prepare the row data
    const row = [
        data.dateService, // Column A
        data.model,       // Column B
        data.plateCoNo,   // Column C
        data.hourKM,      // Column D
        data.type,        // Column E
        '',               // Column F (OIL FILTER)
        '',               // Column G (FUEL FILTER)
        '',               // Column H (WATER SEP)
        '',               // Column I (AIR FILTER)
        '',               // Column J (TRANSMISSION FILTER)
        '',               // Column K (RETURN FILTER)
        '',               // Column L (DRAIN FILTER)
        '',               // Column M (LINE FILTER)
        '',               // Column N (STRAINER)
        '',               // Column O (ENGINE OIL)
        '',               // Column P (HYD.OIL)
        '',               // Column Q (TRANSMISSION OIL)
        '',               // Column R (FINAL DRIVE OIL)
        '',               // Column S (SWING MOTOR OIL)
        data.battery,     // Column T
        data.site         // Column U
    ];

    // Handle checkbox values to populate respective columns with "R"
    const serviceTypes = data.serviceTypes || [];
    
    // Populate respective columns based on the checkboxes
    serviceTypes.forEach(service => {
        switch (service) {
            case 'OIL FILTER':
                row[5] = 'R'; // Column F for OIL FILTER
                break;
            case 'FUEL FILTER':
                row[6] = 'R'; // Column G for FUEL FILTER
                break;
            case 'WATER SEP':
                row[7] = 'R'; // Column H for WATER SEP
                break;
            case 'AIR FILTER':
                row[8] = 'R'; // Column I for AIR FILTER
                break;
            case 'TRANSMISSION FILTER':
                row[9] = 'R'; // Column J for TRANSMISSION FILTER
                break;
            case 'RETURN FILTER':
                row[10] = 'R'; // Column K for RETURN FILTER
                break;
            case 'DRAIN FILTER':
                row[11] = 'R'; // Column L for DRAIN FILTER
                break;
            case 'LINE FILTER':
                row[12] = 'R'; // Column M for LINE FILTER
                break;
            case 'STRAINER':
                row[13] = 'R'; // Column N for STRAINER
                break;
            case 'ENGINE OIL':
                row[14] = 'R'; // Column O for ENGINE OIL
                break;
            case 'HYD.OIL':
                row[15] = 'R'; // Column P for HYD.OIL
                break;
            case 'TRANSMISSION OIL':
                row[16] = 'R'; // Column Q for TRANSMISSION OIL
                break;
            case 'FINAL DRIVE OIL':
                row[17] = 'R'; // Column R for FINAL DRIVE OIL
                break;
            case 'SWING MOTOR OIL':
                row[18] = 'R'; // Column S for SWING MOTOR OIL
                break;
        }
    });

    try {
        // Append the data to the sheet
        sheet.appendRow(row);

        // Log a success message
        Logger.log("Data saved successfully: " + JSON.stringify(row));
        
        return { success: true, message: "Data saved successfully.", row: row }; // Return success with row data
    } catch (error) {
        // Log any error that occurs during the process
        Logger.log("Error while saving data: " + error.message);
        return { success: false, message: "Error while saving data.", error: error.message };
    }
}
