// A TOOL FOR ADDING MESSAGES TO A LOG FILE
// ========================================

// LIBRARIES
// ----------
const fs = require('fs');

// FUNCTION DEFINITONS
// -------------------

const add2log = (entry, fileName) => {
    const isoTimeStamp = new Date().toISOString();
    const logRow = entry + '@' + isoTimeStamp
    fs.appendFile(fileName, logRow, (err) => {
        if (err) {
            console.log(err);
        }
    })
};

// Testing add2log function
add2log( 'This is an informational message', 'dataOperations.log')

// EXPORT
// ------

module.exports = {
    add2log
}

 