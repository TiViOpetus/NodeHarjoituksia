/* A MICROSERVICE FOR SCHEDULING DATA IMPORTS FROM PORSSISAHKO.NET API 
New data is available daily at 12.00 UTC 14.00 localt time or 15.00 when
daylight saving time or summer time is on. */

// LIBRARIES AND MODULES

const cron = require('node-cron') // The scheduling library

// Run a function every day at 15:30 
cron.schedule('30 15 * * *', () => {
    console.log('This will be executed daily at 15:30')
});

// A test to check sceduler: run it every minute
cron.schedule('* * * * *', () => {
    console.log('This will be executed every minute')
});

// A test to check sceduler: run it every hour
cron.schedule('0 * * * *', () => {
    console.log('This will be executed every hour')
});

// A test to check sceduler: run it every 5 minutes
cron.schedule('*/5 * * * *', () => {
    console.log('This will be executed 5 minutes interval')
});

// Running the task every full hour according to a list
cron.schedule('0 15,19,22 * * *', () => {
    console.log("This will be executed at 3, 7 and 10 o'clock PM")
});

// Runnig the task hourly between 15 and 20
cron.schedule('0 15-20 * * *', () => {
    console.log("This will be executed every hour from 3 to 8 o'clock PM")
});

// Use error handling when running a task
cron.schedule('30 15 * * *', () => {
    try {
        console.log('This will be executed daily at 15:30')}
    catch (error) {
        console.log('An error occurred') }
    });
// FIXME: Check and correct the logic of error counter
// Use a counter variable to keep record of successfull operation
let counter = 0 // Set the initial value

// Try to run an operation in 5 minute intervals from 3 to 4 PM
cron.schedule('*/5 15 * * *', () => {
    try {
        // Check if the counter is  to run the operation
        if (counter == 0) {
            console.log('This will be executed every 5 mins at 15:00 until 15:55')};
            counter =+ 1; // If successfull operation set the counter to the initial value
        }
    catch (error) {
        console.log('An error occurred');
        
        counter =+ 1 }; 
        if (counter >= 12) {
            counter = 0;    
        }
    });