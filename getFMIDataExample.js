// A MODULE FOR FETCHING FMI OBSERVATIONS AND FORECASTS
// AND SAVING RETRIEVED DATA TO A DATABASE
// ====================================================

// LIBRARIES AND MODULES
// ---------------------

// Axios for using http or https requests to get data
const axios = require('axios');

// Camaro to parse and beautify XML data
const { transform, prettyPrint } = require('camaro');

// The pg-pool library for PostgreSQL Server
const Pool = require('pg').Pool;

// Math for making calculations
const math = require('mathjs')

// Module to access DB settings
const AppSettings = require('./handleSettings')

// DATABASE SETTINGS
// -----------------
const appSettings = new AppSettings('settings.json')
const settings = appSettings.readSettings()

// Create a new pool for Postgres connections using settings file parameters
const pool = new Pool({
    user: settings.user,
    password: settings.password,
    host: settings.server,
    database: settings.db,
    port: settings.port
});


// A class for creating various weather observation objects containing URL and template
class WeatherObservationTimeValuePair {
    constructor(place, parameterCode, parameterName) {
        this.place = place;
        this.parameterCode = parameterCode;
        this.parameterName = parameterName

        // Creates an URL combining predefined query and place and parametercode like t2m (temperature)
        this.url =
            'https://opendata.fmi.fi/wfs/fin?service=WFS&version=2.0.0&request=GetFeature&storedquery_id=fmi::observations::weather::timevaluepair&place=' +
            place +
            '&parameters=' +
            parameterCode;

        // Constant XML path to the begining of time-value-pairs
        this.WFSPath =
            'wfs:FeatureCollection/wfs:member/omso:PointTimeSeriesObservation/om:result/wml2:MeasurementTimeseries/wml2:point/wml2:MeasurementTVP';

        // Names for the columns of the resultset
        let names = { timeStamp: 'wml2:time', value: 'number(wml2:value)' };

        // Change the name of the value key to the given parameter name
        names[this.parameterName] = names['value']
        delete names['value'] // Must be removed

        // Create a template for Camaro transformations
        this.xmlTemplate = [
            this.WFSPath,
            names,
        ];

        this.axiosConfig = {
            method: 'get',
            maxBodyLength: 'infinity',
            url: this.url,
            headers: {},
        };
    }

    // A method to test that weather data is available in a correct form
    getFMIDataAsXML() {
        axios.request(this.axiosConfig).then((response) => {
            console.log(response.data)
        })
    }

    // A method to to convert XML data to an array of objects
    async convertXml2array(xmlData, template) {
        const result = await transform(xmlData, template);
        return result;
    };

    // A method to fethc and convert weather data and save it into a databse
    putTimeValuPairsToDb() {

        // Define the name of table to insert values it will be parameterName and _observation

        // Build correct table name
        const tableName = this.parameterName + '_observation'

        // Build a SQL clause to insert data
        const sqlClause = 'INSERT INTO public.' + tableName + ' VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING *';

        // Use Axios to fethc data from FMI
        axios
            .request(this.axiosConfig) // Make the request
            .then((response) => {

                // If promise has been fulfilled convert data to an array
                // XML is in the data portion (ie. body) of the response -> response.data
                transform(response.data, this.xmlTemplate)
                    .then((result) => {

                        // Loop elements of the array
                        result.forEach((element) => {

                            // Create a vector for values 
                            let values = [element.timeStamp, element[this.parameterName], this.place]

                            // Define a function to run SQL clause
                            const runQuery = async () => {
                                let resultset = await pool.query(sqlClause, values);
                                return resultset;
                            }

                            // Call query function and log status of operation
                            runQuery().then((resultset) => {

                                // Define a messaget to be logged to console or log file
                                let message = ''

                                // If there is alredy an observation for this time and place -> row is empty ie. undefined
                                if (resultset.rows[0] != undefined) {
                                    message = 'Added a row' // The message when not undefined
                                }
                                else {
                                    message = 'Skipped an existing row' // The message when undefined
                                }

                                // Log the result of insert operation
                                console.log(message);

                            })

                        })
                    })
                    .catch((error) => {
                        // if rejected handle the error
                        console.log(error);
                    });
            });
    };

}

// A class for creating various weather forecast objects containing URL and template
class WeatherForecastTimeValuePair {
    constructor(place, parameterCode, parameterName) {
        this.place = place;
        this.parameterCode = parameterCode;
        this.parameterName = parameterName

        // Creates an URL combining predefined query and place and parametercode like temperature
        this.url =
            'https://opendata.fmi.fi/wfs/fin?service=WFS&version=2.0.0&request=GetFeature&storedquery_id=ecmwf::forecast::surface::point::timevaluepair&place='
            + place +
            '&parameters=' +
            parameterCode;

        // Constant XML path to the begining of time-value-pairs
        this.WFSPath =
            'wfs:FeatureCollection/wfs:member/omso:PointTimeSeriesObservation/om:result/wml2:MeasurementTimeseries/wml2:point/wml2:MeasurementTVP';

        // Names for the columns of the resultset
        let names = { timeStamp: 'wml2:time', value: 'number(wml2:value)' };

        // Change the name of the value key to the given parameter name
        names[this.parameterName] = names['value']
        delete names['value'] // Must be removed

        // Create a template for Camaro transformations
        this.xmlTemplate = [
            this.WFSPath,
            names,
        ];

        this.axiosConfig = {
            method: 'get',
            maxBodyLength: 'infinity',
            url: this.url,
            headers: {},
        };
    }

    // A method to test that weather data is available in a correct form
    getFMIDataAsXML() {
        axios.request(this.axiosConfig).then((response) => {
            console.log(response.data)
        })
    }

    // A method to to convert XML data to an array of objects
    async convertXml2array(xmlData, template) {
        const result = await transform(xmlData, template);
        return result;
    };

    // A method to fethc and convert weather data and save it into a databse
    putTimeValuPairsToDb() {

        // Define the name of table to insert values it will be parameterName and _observation

        // Build correct table name
        const tableName = this.parameterName + '_forecast'

        // Build a SQL clause to insert data
        const sqlClause = 'INSERT INTO public.' + tableName + ' VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING *';

        // Use Axios to fethc data from FMI
        axios
            .request(this.axiosConfig) // Make the request
            .then((response) => {

                // If promise has been fulfilled convert data to an array
                // XML is in the data portion (ie. body) of the response -> response.data
                transform(response.data, this.xmlTemplate)
                    .then((result) => {

                        // Loop elements of the array
                        result.forEach((element) => {

                            // Create a vector for values 
                            let values = [element.timeStamp, element[this.parameterName], this.place]

                            // Define a function to run SQL clause
                            const runQuery = async () => {
                                let resultset = await pool.query(sqlClause, values);
                                return resultset;
                            }

                            // Call query function and log status of operation
                            runQuery().then((resultset) => {

                                // Define a messaget to be logged to console or log file
                                let message = ''

                                // If there is alredy an observation for this time and place -> row is empty ie. undefined
                                if (resultset.rows[0] != undefined) {
                                    message = 'Added a row' // The message when not undefined
                                }
                                else {
                                    message = 'Skipped an existing row' // The message when undefined
                                }

                                // Log the result of insert operation
                                console.log(message);

                            })

                        })
                    })
                    .catch((error) => {
                        // if rejected handle the error
                        console.log(error);
                    });
            });
    };

}

// A class for calcultaing windspeed from wind vectors V and U
class WindVector {
    constructor(windV, windU) {
        this.windV = windV;
        this.windU = windU;
        this.windSpeed = math.sqrt(math.square(this.windV) + math.square(this.windV))
    }

    windParameters() {
            // Reset all values
    let windAngle = 0; // Wind blows from opposite direction to vector
    let windSpeed = 0; // Wind speed in vector units (m/s)
    let geographicAngle = 0; // Angle of vector in a map

    // atan2 returns angle in radians. Arguments are in (y,x) order!
    let xyAngleRad = math.atan2(this.windV, this.windU); 
    let xyAngleDeg = xyAngleRad * 360 /(2 * math.pi); // convert radians to degrees
    
    // Convert x-y plane directions to geographic directions
    // There is 90 degrees shift between x-y and map directions
    if (xyAngleDeg > 90) {
    geographicAngle = 360 - (xyAngleDeg -90);
    }

    else {
        geographicAngle = 90 - xyAngleDeg ;
    }
    
    // Wind blow from opposite direction
    if (geographicAngle < 180) {
        windAngle = geographicAngle + 180;
    }

    else {
        windAngle = geographicAngle -180
    }

    // calcultate wind speed according to the Pythagoras theorem
    windSpeed = Math.sqrt(uVector**2 + vVector**2);
    
    // Return all calculated parameters
    return {
            xyAngleRad: xyAngleRad,
            xyAngleDeg: xyAngleDeg,
            geographicAngle: geographicAngle,
            windAngle: windAngle,
            windSpeed: windSpeed
        };
    }
}
// Test reading observation data and storig results to database: Turku temperatures
const observationtimeValuePair = new WeatherObservationTimeValuePair('Turku', 't2m', 'temperature');

// Show url to fetch from
console.log(observationtimeValuePair.url);

// Show parsing template to see resultset column names
console.log(observationtimeValuePair.xmlTemplate);
// Show fetched data as XML output
// observationTimeValuePair.getFMIDataAsXML();

// Insert observation data into the database
//observationtimeValuePair.putTimeValuPairsToDb()

// Test reading forecast data and storig results to database: Turku temperatustes
const forecastTimeValuePair = new WeatherForecastTimeValuePair('Turku', 'Temperature', 'temperature')
console.log(forecastTimeValuePair.url);
console.log(forecastTimeValuePair.xmlTemplate)

// Show fetched data as XML output
// forecastTimeValuePair.getFMIDataAsXML()
//forecastTimeValuePair.putTimeValuPairsToDb()

let windVector = new WindVector(3, -4)
windVector.windParameters()


