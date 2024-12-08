function testFetchRowsByPlateSelection() {
  const selectedValue = "E176"; // Replace with your test value
  const result = fetchRowsByPlateSelection(selectedValue);

  Logger.log("JSON Result:");
  Logger.log(result); // This will log the JSON string

const serverData = [
  { CONO: "E176", DATE: "Tue Nov 26 00:00:00 GMT+03:00 2024", TYPE: "E.O+F", HOUR: "1234.0", MODEL: "EC480DL" }
];  return result;
}
