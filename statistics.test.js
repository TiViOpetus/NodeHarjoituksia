// UNIT TESTS FOR MODULE statistics.js
// ===================================

// LOAD LIBRARIES AND MODULES
// ---------------------------

const stats = require('./statistics');

// Define array and number of decimals for test # 1
const testArray = [1, 2, 3, 6];
const numberOfDecimals = 1;

// Create an object for statistical calculations
const statToTest = new stats.ArrayStats(testArray, numberOfDecimals);

// Test average calculation ie mean
test('Average should be 3.0', () => {
    expect(statToTest.mean()).toBeCloseTo(3.0);
});

// Test mode ie most common value, there is only one value test # 2
const testArray2 = [1, 2, 2, 2, 3, 4];
const statToTest2 = new stats.ArrayStats(testArray2, numberOfDecimals);

test('Mode should be array element 2', () => {
    expect(statToTest2.mode()).toEqual([2]);
});

// Test mode ie most common value, there are several values, test # 3
const testArray5 = [1, 2, 2, 3, 3, 4];
const statToTest5 = new stats.ArrayStats(testArray5, numberOfDecimals);

test('2 most common numbers should be 2 and 3 ', () => {
    expect(statToTest5.mode()).toEqual([2, 3]);
});

// Test median ie middlemost element in sorted array, odd elements, test # 4
const testArray3 = [1, 2, 2, 3, 4];
const statToTest3 = new stats.ArrayStats(testArray3, numberOfDecimals);

test('Median should be 2', () => {
    expect(statToTest3.median()).toBe(2);
});

// Test median ie average of 2 middlemost element in sorted array, even elements test # 5
const testArray4 = [1, 2, 2, 3, 3, 4];
const statToTest4 = new stats.ArrayStats(testArray4, numberOfDecimals);

test('Median should be 2.5', () => {
    expect(statToTest4.median()).toBe(2.5);
});

// Test variation of population 
const testArray6 = [1, 2, 2, 3, 3, 4]
const statToTest6 = new stats.ArrayStats(testArray6, numberOfDecimals)

test('Variation of population should be 0.9 ', () => {
    expect(statToTest6.populationVariance()).toBeCloseTo(0.9, 1);
});

// Test standard deviation of population 
test('Standard deviation should be 0.9', () => {
    expect(statToTest6.populationStdDev()).toBeCloseTo(1, 1);
    
});

// Test minimum value of an array
test('Minimum should be 1', () => {
    expect(statToTest6.min()).toBe(1);
});

// Test maximum value of an array
test('Maximum should be 4 ', () => {
    expect(statToTest6.max()).toBe(4);
    
});