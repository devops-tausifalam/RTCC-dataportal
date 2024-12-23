window.onload = () => {
  mainTbl(); //initailize the table
};

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
// Handle Plate dropdown and related functions for form , trigger the table to show data related to the selected dropdown
function plate() {
  let MachineJSON = "scripts/data/machines.json";
  let plateCoNo = document.getElementById("plateCoNo");

  let machinesData = [];
  // Fetch the data only once, not on every click
  fetch(MachineJSON)
    .then((resp) => resp.json())
    .then((data) => {
      machinesData = data;
      data.forEach((item) => {
        let opt = document.createElement("option");
        opt.value = item.code;
        opt.textContent = item.code;
        plateCoNo.appendChild(opt);
      });
    })
    .catch((error) => {
      let formError = document.getElementById("formError");
      formError.textContent = error;
      setTimeout(() => {
        formError.textContent = ""; // Remove error message after 2.5s
      }, 2500);
    });

  // Use 'change' event to handle modelInput update
  plateCoNo.addEventListener("change", (event) => {
    let modelInput = document.getElementById("model");
    const selectedModel = machinesData.find(
      (item) => item.code === plateCoNo.value
    );
    if (plateCoNo.value === "") {
      modelInput.value = "";
    } else if (selectedModel) {
      modelInput.value = selectedModel.model; // Update the model field based on selected code
    }
  });

  // enabling autoSuggestions from machinedata to search input
  let searchPlate = document.getElementById("searchPlate");
  let matchedList = document.getElementById("searchMatches");
  searchPlate.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase(); // get the query in lowercase
    matchedList.innerHTML = ""; // clear ul for new list of search matches

    if (query) {
      const filteredData = machinesData.filter((item) => {
        return item.code.toLowerCase().includes(query);
      });

      filteredData.forEach((item) => {
        const listitem = document.createElement("li");
        listitem.textContent = item.code;

        // add click function to assign values to our input namely the search and the model
        listitem.addEventListener("click", () => {
          searchPlate.value = item.code;
          let modelInput = document.getElementById("model");
          modelInput.value = item.model;
          matchedList.innerHTML = ""; // clear the ul once user selects his desired matched
        });
        matchedList.appendChild(listitem);
      });

      plateCoNo.disabled = true; // disabled the select to avoid multiple selections
    } else {
      plateCoNo.disabled = false; // enable the select
    }
  });
}
plate(); // Call the function to initialize
function valid() {
  let dateService = document.getElementById("dateService").value;

  let plateCoNo = document.getElementById("plateCoNo").value;
  let searchPlate = document.getElementById("searchPlate").value;

  let model = document.getElementById("model").value;
  let hourKM = document.getElementById("hourKM").value;
  let serviceType = document.getElementById("type").value;
  let site = document.getElementById("site").value;
  let battery = document.getElementById("battery").value;
  // validate the data and pass-on as JSON with true if everything validates
  if (
    !dateService ||
    (!plateCoNo && !searchPlate) ||
    !hourKM ||
    !site ||
    !serviceType
  ) {
    return false;
  } else {
    let submissionData = [
      dateService,
      model,
      plateCoNo || searchPlate,
      hourKM,
      serviceType,
    ];
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
  let searchPlate = document.getElementById("searchPlate");
  let model = document.getElementById("model");
  let hourKM = document.getElementById("hourKM");
  let serviceType = document.getElementById("type");
  let site = document.getElementById("site");

  // Array to hold field names and their corresponding values
  let inputs = [
    { name: "Date Service", elem: dateService },
    { name: "Plate Company No.", elem: [plateCoNo, searchPlate] },
    { name: "Model", elem: model },
    { name: "Hour/KM", elem: hourKM },
    { name: "Service Type", elem: serviceType },
    { name: "Site", elem: site },
  ];
  // Remove the error class from all inputs before checking
  inputs.forEach((input) => {
    if (Array.isArray(input.elem)) {
      if (input.elem[0].value.trim() || input.elem[1].value.trim()) {
        input.elem.forEach((field) => field.classList.remove("error"));
      }
    } else {
      // For other fields, just remove the error class if it has a value
      if (input.elem.value.trim()) {
        input.elem.classList.remove("error");
      }
    }
  });

  // Find the missing fields and add the error class to them
  let missingFields = inputs
    .filter((input) => {
      if (Array.isArray(input.elem)) {
        // If it's an array, check if either of the fields is empty
        return !input.elem[0].value.trim() && !input.elem[1].value.trim();
      } else {
        // For single elements, just check if the value is empty
        return !input.elem.value.trim();
      }
    })
    .map((input) => {
      if (Array.isArray(input.elem)) {
        // If it's an array, add the error class to both fields
        input.elem.forEach((field) => field.classList.add("error"));
      } else {
        // For single fields, add the error class to the field
        input.elem.classList.add("error");
      }
      return input.name;
    });

  // Display the error message
  if (missingFields.length > 0) {
    errorMssg += missingFields.join(", ");
    error.textContent = errorMssg;
  } else {
    error.textContent = "";
  }
  // let missingFields = inputs
  //   .filter((zeroInput) => !zeroInput.elem.value)
  //   .map((zeroInput) => {
  //     zeroInput.elem.classList.add("error");
  //     return zeroInput.name;
  //   });
  // if (missingFields.length > 0) {
  //   errorMssg += missingFields.join(", ");
  //   error.textContent = errorMssg;
  // } else {
  //   error.textContent = "";
  // }
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
function mainTbl() {
  return new gridjs.Grid({
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
      },
    },
  }).render(document.getElementById("table-wrapper"));
}
// Print Functionality
// Print function to print the grid
function printTable() {
  const gridWrapper = document.querySelector(".gridjs-wrapper");
  const tableRows = gridWrapper.querySelectorAll("table tbody tr");
  const companyName = "AL RASHID TRADING & CONTRACTING CO.";

  // Extract all dates from the Date column
  const dates = Array.from(tableRows)
    .map((row) => row.querySelector("td:nth-child(1)")?.textContent.trim())
    .filter((date) => date && !isNaN(new Date(date))); // Ensure valid dates

  // Sort the dates to find the earliest and latest
  const sortedDates = dates.map((date) => new Date(date)).sort((a, b) => a - b);

  const firstDate =
    sortedDates.length > 0 ? sortedDates[0].toISOString().split("T")[0] : "N/A";
  const lastDate =
    sortedDates.length > 0
      ? sortedDates[sortedDates.length - 1].toISOString().split("T")[0]
      : "N/A";
  // generate random printID with timestamp combined
  const timestring = Date.now().toString(36); // base-12 string
  const randomValue = Math.random().toString(36).substring(2, 10);
  const printID = `${timestring}-${randomValue}`
  const dateRangeBox = `
    <div style="text-align: center; margin-bottom: 20px; border: 1px solid #000; padding: 10px;">
      <h2>${companyName}</h2>
      <p><strong>Date Range:</strong> ${firstDate} - ${lastDate} / <strong>UID:</strong> ${printID} </p>
    </div>
  `;
  const styles = `
    <style>
      @media print {
    * {
        -webkit-print-color-adjust: exact;
        /* Ensures color accuracy */
        print-color-adjust: exact;
    }

    body {
        display: block;
        padding: 0;
        margin: 0;
        font-family: Arial, sans-serif;
    }

    body::after {
        content: "RTCC";
        /* Your watermark text */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 10rem;
        color: rgba(0, 0, 0, 0.1);
        /* Semi-transparent color */
        font-weight: bold;
        z-index: 1;
        pointer-events: none;
        /* Ensure it doesn't interfere with content */
    }

    /* Table wrappers and elements */
    .table-wrapper {
        background: transparent;
    }

    .gridjs-table {
        border: 1px solid #000;
        /* Replace g.$secondary with a valid color */
        width: 100%;
        border-collapse: collapse;
    }

    .gridjs-th,
    .gridjs-td,
    .gridjs-tr {
        border: 1px solid black;
        /* Set border style for table, th, td, tr */
        padding: 8px;
        text-align: left;
    }

    /* Page layout */
    @page {
        margin: 10mm;
    }

    /* Hide print button */
    .print-button {
        display: none;
    }
}
    </style>
  `;

  const printContent = `
    ${styles}
    ${dateRangeBox}
    ${gridWrapper.innerHTML}
  `;

  // Create a new window or iframe for printing
  const printWindow = window.open(
    "",
    "_blank",
    "width=768,height=620,top=100,left=100"
  );
  printWindow.document.write(`
    <html>
      <head>
        <title>UID: ${printID}</title>
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
  `);
  printWindow.document.close(); // Ensure the document is fully loaded
  printWindow.print(); // Trigger the print dialog
}

// Data Access and Filter
let gridInstance = null;

function DamTbl() {
  return new gridjs.Grid({
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
  if (gridInstance) {
    gridInstance.destroy(); // Destroy the existing Grid.js instance
  }
  DAM_table.innerHTML = ""; // Clear the container after destroying

  gridInstance = DamTbl(); // Initialize the table and store the instance
}
// Closing DAM in desktops and PCs when the active element is not out DAM
function DAMinactive(e) {
  let targetElem = document.getElementById("DAM");
  if (targetElem && !targetElem.contains(e.target)) {
    targetElem.style.display = "none";
    let DAM_table = document.getElementById("DAM_table");
    if (gridInstance) {
      gridInstance.destroy(); // Destroy the Grid.js instance
      gridInstance = null; // Reset the reference
    }
    DAM_table.innerHTML = ""; // Clear the container after destroying
    document.getElementById("searchInput").value = ""; // destroy value of search
  }
}
document.addEventListener("click", DAMinactive, true);
// Reserved only for mobile and tablet devices due to space issues
function closeDAM() {
  let container = document.getElementById("DAM");
  container.style.display = "none";
  let DAM_table = document.getElementById("DAM_table");
  if (gridInstance) {
    gridInstance.destroy(); // Destroy the Grid.js instance
    gridInstance = null; // Reset the reference
  }
  DAM_table.innerHTML = ""; // Clear the container after destroying
  document.getElementById("searchInput").value = ""; // destroy value of search
}
function printDAM() {
  const gridWrapper = document.querySelector("#DAM_table .gridjs-wrapper");
  const tableRows = gridWrapper.querySelectorAll("#DAM_table table tbody tr");
  const companyName = "AL RASHID TRADING & CONTRACTING CO.";

  // Extract all dates from the Date column
  const dates = Array.from(tableRows)
    .map((row) => row.querySelector("td:nth-child(1)")?.textContent.trim())
    .filter((date) => date && !isNaN(new Date(date))); // Ensure valid dates

  // Sort the dates to find the earliest and latest
  const sortedDates = dates.map((date) => new Date(date)).sort((a, b) => a - b);

  const firstDate =
    sortedDates.length > 0 ? sortedDates[0].toISOString().split("T")[0] : "N/A";
  const lastDate =
    sortedDates.length > 0
      ? sortedDates[sortedDates.length - 1].toISOString().split("T")[0]
      : "N/A";
  // generate random printID with timestamp combined
  const timestring = Date.now().toString(36); // base-12 string
  const randomValue = Math.random().toString(36).substring(2, 10);

  const printID = `${timestring}-${randomValue}`;
  const dateRangeBox = `
    <div style="text-align: center; margin-bottom: 20px; border: 1px solid #000; padding: 10px;">
      <h2>${companyName}</h2>
      <p><strong>Date Range:</strong> ${firstDate} - ${lastDate} / <strong>UID:</strong> ${printID}</p>
    </div>
  `;
  const styles = `
    <style>
      @media print {
    * {
        -webkit-print-color-adjust: exact;
        /* Ensures color accuracy */
        print-color-adjust: exact;
    }

    body {
        display: block;
        padding: 0;
        margin: 0;
        font-family: Arial, sans-serif;
    }

    body::after {
        content: "RTCC";
        /* Your watermark text */
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 10rem;
        color: rgba(0, 0, 0, 0.1);
        /* Semi-transparent color */
        font-weight: bold;
        z-index: 1;
        pointer-events: none;
        /* Ensure it doesn't interfere with content */
    }

    /* Table wrappers and elements */
    .table-wrapper {
        background: transparent;
    }

    .gridjs-table {
        border: 1px solid #000;
        /* Replace g.$secondary with a valid color */
        width: 100%;
        border-collapse: collapse;
    }

    .gridjs-th,
    .gridjs-td,
    .gridjs-tr {
        border: 1px solid black;
        /* Set border style for table, th, td, tr */
        padding: 8px;
        text-align: left;
    }

    /* Page layout */
    @page {
        margin: 10mm;
    }

    /* Hide print button */
    .print-button {
        display: none;
    }
}
    </style>
  `;
  const printContent = `
    ${styles}
    ${dateRangeBox}
    ${gridWrapper.innerHTML}
  `;
  // Create a new window or iframe for printing
  const printWindow = window.open(
    "",
    "_blank",
    "width=768,height=620,top=100,left=100"
  );
  printWindow.document.write(`
    <html>
      <head>
        <title>UID: ${printID}</title>
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
  `);
  printWindow.document.close(); // Ensure the document is fully loaded
  printWindow.print(); // Trigger the print dialog
}

// handle searchBy function
let method = document.getElementById("searchBy");
method.addEventListener("change", () => {
  let dateMethod = document.getElementById("dateMethod");
  let otherMethod = document.getElementById("otherMethod");
  if (method.value !== "date_range") {
    otherMethod.style.display = "block";
    dateMethod.style.display = "none";
  } else {
    otherMethod.style.display = "none";
    dateMethod.style.display = "block";
  }
});
// handle other method search to interact with main search
let searchBy = document.getElementById("searchInput");
searchBy.addEventListener("input", () => {
  let targetSearch = document.querySelector(
    ".right-access #DAM_table .gridjs-input.gridjs-search-input"
  );
  targetSearch.value = searchBy.value;
  // Trigger the input event to make Grid.js recognize the change
  targetSearch.dispatchEvent(new Event("input", { bubbles: true }));
});
