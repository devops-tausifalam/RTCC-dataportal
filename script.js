async function fetchMachinesData() {
  try {
    const data = await google.script.run
      .withSuccessHandler((data) => {
        populateCoNoDropdown(data);
        localStorage.setItem("machinesData", JSON.stringify(data));
      })
      .fetchMachinesData();
  } catch (error) {
    console.error("Error fetching machines data:", error);
  }
}
function fetchData(headers,tbody,selectedValue) {
  console.log("selectedValue----"+selectedValue);
  google.script.run
    .withSuccessHandler((data) => {
      console.log("Data received:", data); // This will log the JSON string returned
     processReceivedData(JSON.parse(data),tbody,headers);// Pass the data to another function to process
    })
    .withFailureHandler((error) => {
      console.error("Error fetching data:", error);
    })
    .fetchRowsByPlateSelection(selectedValue);
}
function processReceivedData(data,tbody,headers) {
  // Populate rows
  
  data.forEach(row => {
    const tr = document.createElement("tr");

    headers.forEach(header => {
      const td = document.createElement("td");
      td.textContent = row[header];
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}
function populateCoNoDropdown(machines) {
  const plateCoNoSelect = document.getElementById("plateCoNo");

  plateCoNoSelect.innerHTML = '<option value="">Select Code</option>';

  machines.forEach((machine) => {
    const option = document.createElement("option");
    option.value = machine.code;
    option.textContent = machine.code;
    plateCoNoSelect.appendChild(option);
  });
  console.log("Dropdown populated with Codes.");
}



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
  .querySelectorAll('#serviceTypeForm input[type="checkbox"]')
  .forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateType();
    });
  });

document.getElementById("battery").addEventListener("input", () => {
  updateType();
});

window.onload = fetchMachinesData;

document
  .getElementById("serviceForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const serviceTypes = [];

    document
      .querySelectorAll('#serviceTypeForm input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        serviceTypes.push(checkbox.value);
      });

    const data = {
      dateService: formData.get("dateService"),
      model: formData.get("model"),
      plateCoNo: formData.get("plateCoNo"),
      hourKM: formData.get("hourKM"),
      type: formData.get("type"),
      site: formData.get("site"),
      battery: formData.get("battery"),
      serviceTypes: serviceTypes,
    };

    console.log("Form data to be sent:", data);

    if (
      !data.dateService ||
      !data.model ||
      !data.plateCoNo ||
      !data.hourKM ||
      !data.type ||
      !data.site
    ) {
      console.error("Validation failed. One or more fields are missing.");
      return;
    }

    google.script.run
      .withSuccessHandler((response) => {
        console.log("Data saved successfully:", response);
        event.target.reset();

        document
          .querySelectorAll('#serviceTypeForm input[type="checkbox"]')
          .forEach((checkbox) => {
            checkbox.checked = false;
          });
        document.getElementById("type").value = "";
      })
      .saveServiceData(data);
  });


(function () {
  const viewport = document.querySelector('meta[name="viewport"]');

  // Dynamically set viewport width and height based on browser window
  const availableWidth = window.innerWidth;
  const availableHeight = window.innerHeight;

  viewport.setAttribute(
    "content",
    `width=${availableWidth}, height=${availableHeight}, initial-scale=1, user-scalable=no`
  );

  // Adjust the body and HTML to fit content
  document.documentElement.style.height = `${availableHeight}px`;
 // document.documentElement.style.overflow = "hidden";
  document.body.style.height = `${availableHeight}px`;
  document.body.style.overflow = "hidden";
})();


// This script assumes the DOM is already loaded since it runs at the end of the document.


const dropdown = document.getElementById("plateCoNo");

dropdown.addEventListener("change", async () => { 
  const selectedValue = dropdown.value;

  // Clear existing table data
 // tableBody.innerHTML = "";

  if (selectedValue) {
    createTable(selectedValue);
  } else {
    //tableBody.innerHTML = "<tr><td colspan='3'>No data available</td></tr>";
  }
});
function createTable(selectedValue) {
  const tableContainer = document.getElementById("tableContainer");

  // Clear existing content in the container
  tableContainer.innerHTML = "";

  // Create a wrapper div for the table with fixed height
  const wrapper = document.createElement("div");
  wrapper.style.maxHeight = "530px"; 
  wrapper.style.overflowY = "auto"; // Enable vertical scrolling
  wrapper.style.border = "1px solid #ccc"; // Optional: Add border for clarity
  // Create the table element
  const table = document.createElement("table");
  table.border = "1";
  table.style.width = "100%";
  table.style.borderCollapse = "collapse"; // Optional: Cleaner table look

  // Add the table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  // Define headers
  const headers = ["DATE", "MODEL", "CONO", "HOUR", "TYPE"];
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    th.style.position = "sticky"; // Make header sticky
    th.style.top = "0"; // Fix it to the top
    th.style.backgroundColor = "#d3d3d3";// Optional: Header background color
    th.style.zIndex = "1"; // Ensure header stays above content
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Add the table body
  const tbody = document.createElement("tbody");
 
  const  data = fetchData(headers,tbody,selectedValue);
  


  // Filter the rows where column C (index 2) matches the value, excluding the header row
 
 

  table.appendChild(tbody);

  // Append the table to the wrapper
  wrapper.appendChild(table);

  // Append the wrapper to the container
  tableContainer.appendChild(wrapper);
}