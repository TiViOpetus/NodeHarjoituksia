let windAngle = 0;
let uVector = 3;
let vVector = -4;
let xyAngleRad = Math.atan2(uVector, vVector); // atan2 returns angle in radians
let xyAngleDeg = xyAngleRad * 360 /(2 * Math.PI); // convert radians to degrees
let geographicAngle = 270 - xyAngleDeg; // convert x-y plane directions to geographic directions
if (geographicAngle < 180) {
   windAngle = geographicAngle + 180;
}
else {
    windAngle = 360 - geographicAngle
}
 
let windSpeed = Math.sqrt(uVector**2 + vVector**2); // calcultate wind speed accordint to the Pythagoras theorem

console.log('Tuulen suunta on', Math.round(windAngle), 'astetta');
console.log('ja nopeus on', windSpeed, 'm/s')

