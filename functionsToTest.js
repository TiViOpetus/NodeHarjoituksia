// ESIMERKKI TESTATTAVASTA FUNKTIOSTA
// ==================================

const bodyMassIndex = (height, weight) => {
    let bmi = weight / (height * height);
    return bmi;
}

// Export all modules, in this case only one
module.exports = {
    bodyMassIndex
};