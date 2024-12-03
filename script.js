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

document.getElementById("plateCoNo").addEventListener("change", function () {
  const selectedCode = this.value;
  const modelInput = document.getElementById("model");

  if (!selectedCode) {
    modelInput.value = "";
    return;
  }

  const machines = JSON.parse(localStorage.getItem("machinesData")) || [];
  const selectedMachine = machines.find(
    (machine) => machine.code === selectedCode
  );

  if (selectedMachine) {
    modelInput.value = selectedMachine.model;
  } else {
    modelInput.value = "";
  }
});

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
<<<<<<< HEAD

//   handle viewport
(function () {
  const desktopWidth = 1200; // Fixed desktop width
  const viewport = document.querySelector('meta[name="viewport"]');

  if (window.innerWidth < desktopWidth) {
    viewport.setAttribute(
      "content",
      `width=${desktopWidth}, initial-scale=${
        window.innerWidth / desktopWidth
      }, user-scalable=no`
    );
  } else {
    viewport.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0, user-scalable=no"
    );
  }
})();
=======
>>>>>>> 875a399 (revamped service form, and seggregated code)
