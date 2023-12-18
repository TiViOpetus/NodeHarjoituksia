// AN EXAMPLE MODULE FOR RETRIEVING AND STORING MULTIVALUE OBSERVATIONS AND FORECASTS
// ==================================================================================

// LIBRARIES AND MODULES
// ---------------------

// Axios for using http or https requests to get data
const axios = require('axios');

// Camaro to parse and beautify XML data
const { transform, prettyPrint } = require('camaro');

// The pg-pool library for PostgreSQL Server
const Pool = require('pg').Pool;

// Math for making calculations
const math = require('mathjs');

// Module to access DB settings
const AppSettings = require('./handleSettings');
const { response } = require('express');

// DATABASE SETTINGS
// -----------------
const appSettings = new AppSettings('settings.json');
const settings = appSettings.readSettings();

// Create a new pool for Postgres connections using settings file parameters
const pool = new Pool({
  user: settings.user,
  password: settings.password,
  host: settings.server,
  database: settings.db,
  port: settings.port,
});

// CLASS DEFINITIONS
// -----------------

/**
 * Reads observation or forecast multi valued data from FMI's WFS Server.
 * This is a super class for WeatherObservationTable and WeatherForecastTable
 * classes
 */

class WeatherMultiValueData {
  /**
   * Constructor for the class
   * @param {string} baseUrl - FMI's WFS url without place or parameter list.
   * @param {string} place - A Short name of the weather station
   * @param {[string]} parameters - List of parameters, defaults to an empty list
   */

  constructor(baseUrl, place, parameters = []) {
    this.baseUrl = baseUrl;
    this.place = place;
    this.parameters = parameters;

    // Create a default template for time and location values
    this.timeAndPlaceXmlPath = '';
    this.timeAndPlaceDataTag = '';
    this.timeAndPlaceTemplate = [
      this.timeAndPlaceXmlPath,
      this.timeAndPlaceDataTag,
    ];

    // Create a default template for weather parameters
    this.weatherXmlPath = '';
    this.weatheDataTag = '';
    this.weatheDataTemplate = [this.weatherDataXmlPath, this.weatheDataTag];

    // Convert parameter list to a string
    this.parameterString = this.parameters.toString();

    // Build a WFS query string for Axios request
    // If no parameters used leave parameter portion out of WFS query string
    if (this.parameterString == '') {
      this.wfsQuery = this.baseUrl + '&place=' + this.place;
    } else {
      this.wfsQuery =
        this.baseUrl +
        '&place=' +
        this.place +
        '&parameters=' +
        this.parameterString;
    }

    // Define Axios configuration for http/https get method
    this.axiosConfig = {
      method: 'get',
      maxBodyLength: 'infinity',
      url: this.wfsQuery,
      headers: {},
    };
  }

  /**
   * A method to test that WFS data is available. Data is available as response.data
   */

  testRetrieveData() {
    axios.request(this.axiosConfig).then((response) => {
      console.log(response.data);
    });
  }

  /**
   * A method to set the path to a tag where time and location data starts. Used in Camaro transformations
   * @param {string} xmlPath - A XML path to start of time and location data
   * @param {string} dataTag - The tag used for actual data
   */

  setTimeAndPlaceTemplate(xmlPath, dataTag) {
    this.timeAndPlaceXmlPath = xmlPath;
    this.timeAndPlaceDataTag = dataTag;
    this.timeAndPlaceTemplate = [
      this.timeAndPlaceXmlPath,
      this.timeAndPlaceDataTag,
    ];
  }

  /**
   * Sets a path and a tag to the begining of weather data
   * @param {string} xmlPath - A XML path to start of weather data
   * @param {string} dataTag - The tag used for actual data
   */

  setWeatherDataTemplate(xmlPath, dataTag) {
    this.weatherDataXmlPath = xmlPath;
    this.weatheDataTag = dataTag;
    this.weatheDataTemplate = [this.weatherDataXmlPath, this.weatheDataTag];
  }

  getDataAsArray() {
    // Make Axios request and wait for promise to fullfill
    axios.request(this.axiosConfig).then((response) => {
      // Create an empty array for results. The array will consist 2 table like elements
      // First containing latitude, longitude, empty column and time value in UNIX seconds
      // Second contains weather observation or forecast values in same order as time values
      let resultArray = [];

      // Make Camaro transformation and wait for promise to get time and place information
      transform(response.data, this.timeAndPlaceTemplate)
        .then((result) => {
          let trimmedTableArrayTime = []; // An empty array for time and location table
          let rowString = result.toString(); // Convert array to a string for splitting
          let rowArray = rowString.split('\n'); // Split by newline to an array -> row
          rowArray.shift(); // Remove the 1 st row which is empty
          rowArray.pop(); // Remove the last row which is also empty
          rowArray.forEach((element) => {
            let trimmedRow = element.trim();
            let columnArray = trimmedRow.split(' ');
            trimmedTableArrayTime.push(columnArray);
          });
          // console.log('Time table data is', trimmedTableArrayTime);
          resultArray.push(trimmedTableArrayTime);
        })

        // When all time and place information has been processed start processing weather data
        .then(() => {
          transform(response.data, this.weatheDataTemplate).then((result) => {
            let trimmedTableArrayValues = []; // An empty array for the actual weather data
            let rowString = result.toString(); // Convert array to a string for splitting
            let rowArray = rowString.split('\n'); // Split by newline to an array -> row
            rowArray.shift(); // Remove the 1 st row which is empty
            rowArray.pop(); // Remove the last row which is also empty
            rowArray.forEach((element) => {
              let trimmedRow = element.trim();
              let columnArray = trimmedRow.split(' ');
              trimmedTableArrayValues.push(columnArray);
            });
            // console.log('Value table data is', trimmedTableArrayValues);
            resultArray.push(trimmedTableArrayValues);
            console.log('Place and time data:', resultArray[0]); // 1st table: time and place
            console.log('Value data:', resultArray[1]); // 2nd table: weather values
            console.log('Place and time data contains', resultArray[0].length, 'rows'); // Row count for 1st
            console.log('Value data contains', resultArray[1].length, 'rows'); // Row count for 2nd table
            console.log('Time value on 1st row is', resultArray[0][0][3]);
            let exampleRow1 = resultArray[0][0];
            let exampleRow2 = resultArray[1][0];
            console.log('1st table has', exampleRow1.length, 'columns');
            console.log('2nd table has', exampleRow2.length, 'columns');
            return resultArray;
e
            // TODO: Make a loop which combines resultArray[0] and [1] into a single 2D table
            // Routine must check that there is same amount of rows in both tables before merging data
          });
        });
    });
  }
}
/**
 * Reads a multi value weather odbservation data from FMI's WFS server and
 * Stores data to an existing table on a PostgreSQL Database
 * Inherits WeatherMultiValueData class properties and methods
 * @extends WeatherMultiValueData
 */

class WeatherObservationTable extends WeatherMultiValueData {
  /**
   * Constructor for the class
   * @param {string} baseUrl - FMI's WFS url without place or parameter list.
   * @param {string} place - A Short name of the weather station.
   * @param {[string]} parameters - List of parameters, defaults to an empty list.
   * @param {string} tableName - Name of the observation table, defaults to observation.
   */
  constructor(baseUrl, place, parameters = [], tableName = 'observation') {
    super(baseUrl, place, parameters);
    this.tableName = tableName;
  }
}

// Some preliminary tests to see that everything is functioning as expected
// ------------------------------------------------------------------------

// Create a new base object for testing
const baseUrl1 =
  'https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::observations::weather::hourly::multipointcoverage';
const place1 = 'Ajos';
const weatherMultiValueData = new WeatherMultiValueData(baseUrl1, place1);

// Check URL and Axios configuration
console.log('Base URL', weatherMultiValueData.baseUrl);
console.log('Axios configuration', weatherMultiValueData.axiosConfig);

// Get data and log it to a console using a method
weatherMultiValueData.testRetrieveData();

// Test Camaro templates to extract data from XML
const timePlacePath1 =
  'wfs:FeatureCollection/wfs:member/omso:GridSeriesObservation/om:result/gmlcov:MultiPointCoverage/gml:domainSet/gmlcov:SimpleMultiPoint';
const timePlaceTag1 = 'gmlcov:positions';
weatherMultiValueData.setTimeAndPlaceTemplate(timePlacePath1, timePlaceTag1);

console.log(
  'Time and place template is ',
  weatherMultiValueData.timeAndPlaceTemplate
);

const weatherDataPahth1 =
  'wfs:FeatureCollection/wfs:member/omso:GridSeriesObservation/om:result/gmlcov:MultiPointCoverage/gml:rangeSet/gml:DataBlock';
const valuesTag1 = 'gml:doubleOrNilReasonTupleList';

weatherMultiValueData.setWeatherDataTemplate(weatherDataPahth1, valuesTag1);

weatherMultiValueData.getDataAsArray();
