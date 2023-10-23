// TESTS FOR functionToTest MODULE
// ===============================

// Import the module or library to be tested
const functionsToTest = require('./functionsToTest');

// Test function uses a callback, don't forget to put () 
test('bmi with height 1.7 and weight 70 eq 24', () => {
    expect(functionsToTest.bodyMassIndex(1.7, 70)).toBe(24.221453287197235);
});

// Loosely typed 0 is also false
test('0 is 0 and false', () => {
    expect(0).toBe(0);
    expect(0).toBeFalsy();
})

// Null is also false
test('null is null and false', () => {
    expect(null).toBe(null);
    expect(null).toBeFalsy()
})

// Floating point calculations aren't accurate
test('0.1 + 0.2 shoud be 0.3', () => {
    expect(0.1 + 0.2).toBe(0.3);
    expect(0.1 + 0.2).toBeCloseTo(0.3);
});

// String tests
const name = 'Assi Kalma'
test('Assi Kalma should contain alma, but not Kassi', () => {
    expect(name).toMatch(/alma/); // Contains alma
    expect(name).not.toMatch(/Kassi/); // But not Kassi
    
});

// List test
const listOfTeachers = ['Tuomas', 'Jussi', 'Mika']
test('ListOfTeachers should contain Jussi', () => {
    expect(listOfTeachers).toContain('Jussi');
});

// Object test
const studentObject = {
    firstName: 'Jonne',
    lastName: 'Janttari',
    age: 17
}

const expectedObject = {
    firstName: 'Jonne',
    lastName: 'Janttari',
    age: 17
}

test('Student object should be expected object', () => {
    expect(studentObject).toEqual(expectedObject); // Whole object comparison
    expect(studentObject.age).toBe(expectedObject.age); // Property comparison
});

// Test error messages

const bmwOwner = (shoeSize) => {
    
    // Generate an error from Error class if foot size less than 48
    if (shoeSize < 48) throw new Error('Bemarit on vain isokenkäisille');

    // If big enough return BMW drivers motto
    else {
        return 'Vilkku on valinnainen lisävaruste';
    }
}

test('Should return motto or an error if foot too small', () => {

    // Normal behavior
    expect(bmwOwner(52)).toBe('Vilkku on valinnainen lisävaruste');

    // Error tests have callback in their definition
    expect(() => {
        bmwOwner(52)
    }).not.toThrowError();

    // Throw an error if foot is too small
    expect(() => {
        bmwOwner(42)
    }).toThrowError(); // There is some error thrown

    // Check if a specific error message is thrown when foot is too small
    expect(() => {
        bmwOwner(42)
    }).toThrow('Bemarit on vain isokenkäisille');

});