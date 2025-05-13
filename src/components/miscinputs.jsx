function MiscInputs() {
  return (
    <>
      <div className="grid-2">
        <label htmlFor="hourKM">Hour / K.M:</label>
        <input
          type="text"
          id="hourKM"
          name="hourKM"
          autoComplete="off"
          placeholder="write here"
          required
        />

        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          autoComplete="off"
          placeholder="Serivce Type (autofill)"
          required
          disabled
        />

        <label htmlFor="site">Site:</label>
        <input
          type="text"
          id="site"
          name="site"
          autoComplete="off"
          placeholder="Enter site/location"
          required
        />
        <ul id="siteSuggestion" className="suggestionList siteList"></ul>

        {/* Optional battery input – remove comments to activate */}
        {/* 
            <label htmlFor="battery">Battery (Optional):</label>
            <input
              type="text"
              id="battery"
              name="battery"
              autoComplete="off"
              placeholder="Enter battery details"
            />
       */}
      </div>
    </>
  );
}

export default MiscInputs;
