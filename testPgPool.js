// LIBRARIES
// ---------
const Pool = require('pg-pool') // ATTENTION Common JS library load

// May be more simple when using ES modules as in dBOperations.js

// Create a new pool for Postgres connections
const pool = new Pool({
    user: 'postgres', // In production allways create a new user for the app
    password: 'Q2werty',
    host: 'localhost', // Or localhost or 127.0.0.1 if in the same computer
    database: 'smarthome',
    port: 5432,
  });

// Create a query using traditional way

// Define embedded SQL
let sqlClause = 'SELECT * FROM public.hourly_price'

// Define the query returning an error message or resultset
const query1 = pool.query(sqlClause, (error, results) => {
if (error) {
    throw error;
}
console.log(results.rows);
});

// Modern way using a funtion with async-await
const query2 = async () => {
let resultset = await pool.query(sqlClause);
return resultset
}

// Results will be ready when promise fulfilled. 
query2()
.then((resultset) => console.log(resultset.rows[0]))
  