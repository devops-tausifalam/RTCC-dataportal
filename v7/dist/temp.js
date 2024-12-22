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
    plateCoNo.addEventListener("change", () => {
      let modelInput = document.getElementById("model");
      const selectedModel = machinesData.find(
        (item) => item.code === plateCoNo.value
      );
      if (selectedModel) {
        modelInput.value = selectedModel.model; // Update the model field based on selected code
      }
    });
  }
  
  plate();