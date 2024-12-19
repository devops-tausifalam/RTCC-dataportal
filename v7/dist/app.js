//All functionality excluding table

//Form validation and Modal submission

//transfer required values of serviceType to type.value
// update input=type
function updateType() {
  const engineOil = document.getElementById("engineOil").checked;
  const oilFilter = document.getElementById("oilFilter").checked;
  const airFilter = document.getElementById("airFilter").checked;
  const hydOil = document.getElementById("hydOil").checked;
  const returnFilter = document.getElementById("returnFilter").checked;
  const transmissionOil = document.getElementById("transmissionOil").checked;
  const transmissionFilter =
    document.getElementById("transmissionFilter").checked;

  let type = "";

  if (engineOil) {
    type += "E.O";
  }

  if (oilFilter && engineOil) {
    type += (type ? "+" : "") + "F";
  }

  if (airFilter) {
    type = "A.F";
  }

  if (hydOil) {
    type = "H.O";
  }

  if (returnFilter && hydOil) {
    type += (type ? "+" : "") + "F";
  }

  if (transmissionOil) {
    type = "T.O";
  }

  if (transmissionFilter && transmissionOil) {
    type += (type ? "+" : "") + "F";
  }

  const batteryValue = document.getElementById("battery").value.trim();
  if (batteryValue) {
    type += (type ? "+" : "") + "Battery";
  }

  document.getElementById("type").value = type;
}

document
  .querySelectorAll('#serviceForm input[type="checkbox"]')
  .forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateType();
    });
  });

document.getElementById("battery").addEventListener("input", () => {
  updateType();
});

//get all checkbox values for sheet submission
function getCheckboxStates() {
  return {
    oilFilter: document.getElementById("oilFilter").checked,
    fuelFilter: document.getElementById("fuelFilter").checked,
    waterSep: document.getElementById("waterSep").checked,
    engineOil: document.getElementById("engineOil").checked,
    returnFilter: document.getElementById("returnFilter").checked,
    strainer: document.getElementById("strainer").checked,
    drainFilter: document.getElementById("drainFilter").checked,
    lineFilter: document.getElementById("lineFilter").checked,
    hydOil: document.getElementById("hydOil").checked,
    finalDriveOil: document.getElementById("finalDriveOil").checked,
    swingMotorOil: document.getElementById("swingMotorOil").checked,
    airFilter: document.getElementById("airFilter").checked,
    acFilter: document.getElementById("acFilter").checked,
    transmissionOil: document.getElementById("transmissionOil").checked,
    transmissionFilter: document.getElementById("transmissionFilter").checked,
  };
}
// Transfer the value of <select> to model.input
let plateSelect = document.getElementById("plateCoNo");
plateSelect.addEventListener("input", () => {
  let modelInput = document.getElementById("model");
  modelInput.value = plateSelect.value;
});

function valid() {
  let dateService = document.getElementById("dateService").value;
  let plateCoNo = document.getElementById("plateCoNo").value;
  let model = document.getElementById("model").value;
  let hourKM = document.getElementById("hourKM").value;
  let serviceType = document.getElementById("type").value;
  let site = document.getElementById("site").value;
  let battery = document.getElementById("battery").value;
  // validate the data and pass-on as JSON with true if everything validates
  if (!dateService || !plateCoNo || !hourKM || !site || !serviceType) {
    return false;
  } else {
    let submissionData = [dateService, model, plateCoNo, hourKM, serviceType];
    // GET input=checked values
    let forSheetData = [{ ...submissionData, ...getCheckboxStates() }];
    console.log(forSheetData);
    // show response to the user from submissionData
    let userResponseRow = document.getElementById("userResponseRow");
    // clear existing <td>
    userResponseRow.innerHTML = "";
    submissionData.forEach((respArray) => {
      let resp_data = document.createElement("td");
      resp_data.textContent = respArray;
      userResponseRow.appendChild(resp_data);
    });
    return true;
  }
}
function onFailed() {
  // return error message when form validation fails
  let error = document.getElementById("formError");
  errorMssg = "Empty Input: ";
  // A function to show which field is not filled properly
  let dateService = document.getElementById("dateService");
  let plateCoNo = document.getElementById("plateCoNo");
  let model = document.getElementById("model");
  let hourKM = document.getElementById("hourKM");
  let serviceType = document.getElementById("type");
  let site = document.getElementById("site");

  // Array to hold field names and their corresponding values
  let inputs = [
    { name: "Date Service", elem: dateService },
    { name: "Plate Company No.", elem: plateCoNo },
    { name: "Model", elem: model },
    { name: "Hour/KM", elem: hourKM },
    { name: "Service Type", elem: serviceType },
    { name: "Site", elem: site },
  ];
  // Remove the error class from all inputs before checking
  inputs.forEach((input) => {
    input.elem.classList.remove("error");
  });

  let missingFields = inputs
    .filter((zeroInput) => !zeroInput.elem.value)
    .map((zeroInput) => {
      zeroInput.elem.classList.add("error");
      return zeroInput.name;
    });
  if (missingFields.length > 0) {
    errorMssg += missingFields.join(", ");
    error.textContent = errorMssg;
  } else {
    error.textContent = "";
  }
}
function consent() {
  // take consent for data accuracy from user and send it to backend and update the table
  alert("consent");
}
let checkData = document.getElementById("checkData");
let iConsent = document.getElementById("consent");
checkData.addEventListener("click", (e) => {
  e.preventDefault();
  if (valid()) {
    iConsent.style.display = "block";
  } else {
    onFailed(); //show message on failing to validate
  }
});
// called when the user clicks edit button
function hideConsent() {
  iConsent.style.display = "none";
}
// table-init
new gridjs.Grid({
  // columns: ["Date", "Model", "CONO", "Hour", "Type"],
  columns: [
    { name: "Date", width: "150px" },
    { name: "Model" },
    { name: "CONO", width: "125px" },
    { name: "Hour", width: "125px" },
    { name: "Type", width: "125px" },
  ],
  data: [
    ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
    ["2024-08-21", "JCB035HD", "SL133", "9584", "E.O+F"],
    ["2024-08-21", "JCB535HD", "SL133", "9584", "E.O+F"],
    ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
    ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
    ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
    ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
    ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
  ],
  search: true,
  sort: true,
  fixedHeader: true,
  language: {
    search: {
      placeholder: "Find specific data...",
    },
  },
  style: {
    table: {
      width: "100%",
      "border-collapse": "collapse",
      margin: "10px auto",
      "table-layout": "fixed",
    },
    th: {
      padding: "10px",
      "text-align": "left",
      "border-bottom": "1px solid rgba(0, 0, 0, 0.1)",
      "background-color": "#FFB200",
      color: "#ffffff",
      "font-weight": "bold",
    },
    td: {
      padding: "10px",
      "text-align": "left",
      "border-bottom": "1px solid rgba(0, 0, 0, 0.1)",
    }
  }
}).render(document.getElementById("table-wrapper"));

// Print Functionality
// Print function to print the grid
function printTable() {
  const gridWrapper = document.querySelector(".gridjs-wrapper");
  const tableRows = gridWrapper.querySelectorAll("table tbody tr");
  const companyName = "AL RASHID TRADING & CONTRACTING CO.";

  // Extract all dates from the Date column
  const dates = Array.from(tableRows)
      .map(row => row.querySelector("td:nth-child(1)")?.textContent.trim())
      .filter(date => date && !isNaN(new Date(date))); // Ensure valid dates

  // Sort the dates to find the earliest and latest
  const sortedDates = dates.map(date => new Date(date)).sort((a, b) => a - b);

  const firstDate = sortedDates.length > 0 ? sortedDates[0].toISOString().split('T')[0] : "N/A";
  const lastDate = sortedDates.length > 0 ? sortedDates[sortedDates.length - 1].toISOString().split('T')[0] : "N/A";

  const dateRangeBox = `
    <div style="text-align: center; margin-bottom: 20px; border: 1px solid #000; padding: 10px;">
      <h2>${companyName}</h2>
      <p><strong>Date Range:</strong> ${firstDate} - ${lastDate}</p>
    </div>
  `;

  const printContent = `
    ${dateRangeBox}
    ${gridWrapper.innerHTML}
  `;

  const originalContent = document.body.innerHTML;

  document.body.innerHTML = `
    <html>
      <head>
        <title>Print Table</title>
        <link href="https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css" rel="stylesheet">
        <style>
          body { font-family: Arial, sans-serif; }
          h2 { margin: 0; }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `;

  window.print();
  document.body.innerHTML = originalContent; // Restore the original content
}



// Data Access and Filter 

function DamTbl() {
  new gridjs.Grid({
    // columns: ["Date", "Model", "CONO", "Hour", "Type"],
    columns: [
      { name: "Date", width: "150px" },
      { name: "Model" },
      { name: "CONO", width: "125px" },
      { name: "Hour", width: "125px" },
      { name: "Type", width: "125px" },
    ],
    data: [
      ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
      ["2024-08-21", "JCB035HD", "SL133", "9584", "E.O+F"],
      ["2024-08-21", "JCB535HD", "SL133", "9584", "E.O+F"],
      ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
      ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
      ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
      ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
      ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
      ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
      ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
      ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
      ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
      ["2024-08-21", "JCB135HD", "SL133", "9584", "E.O+F"],
    ],
    search: true,
    sort: true,
    height: "380px",
    language: {
      search: {
        placeholder: "Find specific data...",
      },
    },
    style: {
      table: {
        width: "100%",
        "border-collapse": "collapse",
        margin: "10px auto",
        "table-layout": "fixed",
      },
      th: {
        padding: "10px",
        "text-align": "left",
        "border-bottom": "1px solid rgba(0, 0, 0, 0.1)",
        "background-color": "#000000",
        color: "#ffffff",
        "font-weight": "bold",
      },
      td: {
        padding: "10px",
        "text-align": "left",
        "border-bottom": "1px solid rgba(0, 0, 0, 0.1)",
      },
    },
  }).render(document.getElementById("DAM_table"));
}



function openDAM() {
  let container = document.getElementById("DAM");
  container.style.display = "flex";
  let DAM_table = document.getElementById("DAM_table");
  DAM_table.innerHTML = "";
  DamTbl() // initialise the table 
  console.log(DAM_table)
}
// Closing DAM in desktops and PCs when the active element is not out DAM 
function DAMinactive(e) {
  let targetElem = document.getElementById("DAM");
  if (targetElem && !targetElem.contains(e.target)) {
    targetElem.style.display = "none";
    let DAM_table = document.getElementById("DAM_table");
    DAM_table.innerHTML = ""; // destroy table
  }
}
document.addEventListener("click", DAMinactive, true);
// Reserved only for mobile and tablet devices due to space issues
function closeDAM() {
  let container = document.getElementById("DAM");
  container.style.display = "none";
  let DAM_table = document.getElementById("DAM_table");
  DAM_table.innerHTML = ""; // destroy table 
  console.log(DAM_table)
}
function printDAM() {
  let wrapperElement = document.querySelector("#DAM_table .gridjs-wrapper");
  let rows = wrapperElement.querySelectorAll("#DAM_table table tbody tr");
  let company = "AL RASHID TRADING & CONTRACTING CO.";

  // Extract all dates from the Date column
  let dateList = Array.from(rows)
    .map(row => row.querySelector("td:nth-child(1)")?.textContent.trim())
    .filter(date => date && !isNaN(new Date(date))); // Ensure valid dates

  // Sort the dates to find the earliest and latest
  let sortedDatesList = dateList.map(date => new Date(date)).sort((a, b) => a - b);

  let earliestDate = sortedDatesList.length > 0 ? sortedDatesList[0].toISOString().split('T')[0] : "N/A";
  let latestDate = sortedDatesList.length > 0 ? sortedDatesList[sortedDatesList.length - 1].toISOString().split('T')[0] : "N/A";

  let dateRangeBoxHTML = `
    <div style="text-align: center; margin-bottom: 20px; border: 1px solid #000; padding: 10px;">
      <h2>${company}</h2>
      <p><strong>Date Range:</strong> ${earliestDate} - ${latestDate}</p>
    </div>
  `;

  let printContentHTML = `
    ${dateRangeBoxHTML}
    ${wrapperElement.innerHTML}
  `;

  let originalPageContent = document.body.innerHTML;

  document.body.innerHTML = `
    <html>
      <head>
        <title>Print Table</title>
        <link href="https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css" rel="stylesheet">
        <style>
          body { font-family: Arial, sans-serif; }
          h2 { margin: 0; }
        </style>
      </head>
      <body>
        ${printContentHTML}
      </body>
    </html>
  `;

  window.print();
  document.body.innerHTML = originalPageContent; // Restore the original content
}
