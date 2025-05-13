function MachineInputs() {
  return (
    <>
      <div className="upper-section">
        <h1>MACHINE INFORMATION</h1>
        <div className="input-group">
          <input
            type="date"
            name="date"
            className="form-control"
            id="date-input"
            placeholder="Service Date"
          />
          <input
            type="text"
            name="companyNumber"
            className="form-control"
            id="company-number"
            placeholder="Company Number"
          />
          <select
            name="companySelect"
            className="form-control"
            id="company-select"
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
          </select>
          <input
            type="text"
            name="modelName"
            className="form-control"
            id="model-name"
            placeholder="Model Name (autofill)"
            disabled
          />
        </div>
      </div>
    </>
  );
}
export default MachineInputs;
