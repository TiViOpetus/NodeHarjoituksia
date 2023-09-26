// ASYNC-AWAIT ESIMERKKI

// Käytetään fsPromises modulin funktiota tiedoston lukemiseen
const fsPromises = require('fs').promises;

// Määritellään asynkroninen funktio

async function readText() {
  // Odotetaan tiedoston lukemisen päättymistä ja tallennetaan tulos tekstinä
  const data = await fsPromises.readFile('asyncEsim.txt', 'utf8');

  // Tulostetaan teksti konsolille
  console.log(data);
};

// Kutsutaan asynkronista funktiota
readText();

/** 
* Brief description of the function here.
* @summary Very important function to produce results
* @param {string} testi Name of the music genre.
* @return {string} Opinion about the genre.
*/
function testifunktio(testi) {
  tulos = testi + 'on täyttä huuhaata';
  return tulos
};

testifunktio('hiphop')