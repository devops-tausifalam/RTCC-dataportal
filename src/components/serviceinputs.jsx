function ServiceInputs() {
  return (
    <>
      <div className="middle-section">
        <h2>SELECT SERVICE TYPE</h2>
        <div className="input-group">
          <div className="engine-service">
            <label>Engine Service</label>
            <input
              type="checkbox"
              id="oil-filter"
              name="oil-filter"
              value="OIL FILTER"
            />
            <label htmlFor="oil-filter">فلتر زيت OIL FILTER</label>
            <input
              type="checkbox"
              id="fuel-filter"
              name="fuel-filter"
              value="FUEL FILTER"
            />
            <label htmlFor="fuel-filter">فلتر ديزل FUEL FILTER</label>
            <input
              type="checkbox"
              id="water-sep"
              name="water-sep"
              value="WATER SEP"
            />
            <label htmlFor="water-sep">فلتر سيبر يتر WATER SEP</label>
            <input
              type="checkbox"
              id="engine-oil"
              name="engine-oil"
              value="ENGINE OIL"
            />
            <label htmlFor="engine-oil">زيت محرك ENGINE OIL</label>
          </div>

          <div className="hydraulic-service">
            <label>Hydraulic Service</label>
            <input
              type="checkbox"
              id="return-filter"
              name="return-filter"
              value="RETURN FILTER"
            />
            <label htmlFor="return-filter">فلتر هيدروليك RETURN FILTER</label>
            <input
              type="checkbox"
              id="strainer"
              name="strainer"
              value="STRAINER"
            />
            <label htmlFor="strainer">فلتر هيدروليك STRAINER</label>
            <input
              type="checkbox"
              id="drain-filter"
              name="drain-filter"
              value="DRAIN FILTER"
            />
            <label htmlFor="drain-filter">فلتر هيدروليك DRAIN FILTER</label>
            <input
              type="checkbox"
              id="line-filter"
              name="line-filter"
              value="LINE FILTER"
            />
            <label htmlFor="line-filter">فلتر هيدروليك LINE FILTER</label>
            <input
              type="checkbox"
              id="hyd-oil"
              name="hyd-oil"
              value="HYD.OIL"
            />
            <label htmlFor="hyd-oil">زيت هيدروليك HYD.OIL</label>
          </div>

          <div className="other-service">
            <label>Other Service</label>
            <input
              type="checkbox"
              id="final-drive-oil"
              name="final-drive-oil"
              value="FINAL DRIVE OIL"
            />
            <label htmlFor="final-drive-oil">زيت ديفرينس FINAL DRIVE OIL</label>
            <input
              type="checkbox"
              id="swing-motor-oil"
              name="swing-motor-oil"
              value="SWING MOTOR OIL"
            />
            <label htmlFor="swing-motor-oil">زيت دوران SWING MOTOR OIL</label>
            <input
              type="checkbox"
              id="air-filter"
              name="air-filter"
              value="AIR FILTER"
            />
            <label htmlFor="air-filter">فلتر هواء AIR FILTER</label>
            <input
              type="checkbox"
              id="ac-filter"
              name="ac-filter"
              value="AC FILTER"
            />
            <label htmlFor="ac-filter">فلتر مكيف AC FILTER</label>
          </div>

          <div className="transmission-service">
            <label>Transmission Service</label>
            <input
              type="checkbox"
              id="transmission-oil"
              name="transmission-oil"
              value="TRANSMISSION OIL"
            />
            <label htmlFor="transmission-oil">زيت جير TRANSMISSION OIL</label>
            <input
              type="checkbox"
              id="transmission-filter"
              name="transmission-filter"
              value="TRANSMISSION FILTER"
            />
            <label htmlFor="transmission-filter">
              فلتر جير TRANSMISSION FILTER
            </label>
          </div>

          <div className="battery">
            <input
              type="text"
              id="battery"
              name="battery"
              placeholder="Battery Details (Optional)"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default ServiceInputs;
