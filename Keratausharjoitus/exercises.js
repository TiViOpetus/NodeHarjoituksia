// HARJOITUKSIA
// ============

/* HARJOITUS 1 - YKSINKERTAISET TIETOTYYPIT
Tallennamme tietoja henkilöstä. Mieti, mitkä tiedot ovat muuttuvia ja mitkä pysyviä ja 
päätä sen perusteella, millä komennolla määrittelet muuttujan.
- Pituus
- Paino
- Syntymäaika
*/

// Mallivastatus 1
let height = 1.7 // Let, koska muuttuva tieto
let weight = 70 // Let, koska muuttuva tieto
const dateOfBirth = '1962-06-26' // Henkilön syntymäpäivä ei muutu


/* HARJOITUS 2
Haluamme tallentaa ohjelmoijasta tietoja avain-arvo-pareina:
- Nimi
- Pääasiallinen ohjelmointikieli
- Suuntautuminen: front end, back end tai full stack
- Mielitietokanta
Luo rakenne ja määrittele arvot.
*/

// Mallivastaus 2
const coder = new Map();
coder.set('fullName', 'Jonne Janttari');
coder.set('language', 'JavaScript');
coder.set('preferedJob', 'Backend');
coder.set('favouriteDb', 'PostgreSQL');


/* HARJOITUS 3
Haluamme tallentaa useamman ohjelmoijan tiedot muuttujaan.
Mitä vaihtoehtoja on käytettävissä?
Luo mielestäsi paras rakenne.
Vektori - yksinkertainen ja helposti läpikäytävissä toistorakenteissa
Joukko - estää kaksoisarvot läpikäynti forEach-metodilla (vaatii CB-funktion)
*/

/* HARJOITUS 4
Määrittele luokka ohjelmoijaa varten ja tee siitä olioita vektoriin
*/
class Programmer {
    constructor(name, language, preferredJob, favouriteDb) {
        this.fullName = name // Ominaisuudella ja argumentilla voi olla eri nimi
        this.language = language // tai ne voivat olla saman nimisiä
        this.preferedJob = preferredJob
        this.favouriteDb = favouriteDb
    }
}

const arrayOfCoders = [] // Tyhjä vektori

// Create a new programmer object
const coder1 = new Programmer('Jonne Janttari', 'Python', 'Frontend', 'MySQL');
arrayOfCoders.push(coder1); // Add it to the array

const coder2 = new Programmer('Jakke Jäynä', 'JavaScript', 'Backend', 'PostgreSQL')
arrayOfCoders.push(coder2);

const coder3 = new Programmer('Calle Keckelberg', 'C++', 'Full stack', 'SQLite')
arrayOfCoders.push(coder3);

console.log('Ja koodarit ovat', arrayOfCoders )

/* HARJOITUS 5
Muokkaa luokkaa siten, että oliolle voidaan antaa lista ammatillisten tutkinnonosien
arvosanoista numeromuodossa. Tee metodi, joka laskee näiden keskiarvon ja palauttaa sen.
*/

class ProgrammerWithMethod {
    constructor(name, language, preferedJob, favouriteDb) {
        this.fullName = name; // Ominaisuudella ja argumentilla voi olla eri nimi
        this.language = language; // tai ne voiva olla sanaman nimisiä
        this.preferedJob = preferedJob;
        this.favouriteDb = favouriteDb;
    }

    // Metodi keskiarvon laskemiseksi argumenttina annetusta arvosanalistasta
    calculateAverage(array) {
        let avg = 0; // Alustetaan keskiarvo 0:ksi
        let sum = 0; // Alustetaan summa 0:ksi

        // Käydään alkiot läpi silmukassa
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            sum = sum + element
            
        }

        // Keskiarvo on lukujen summa jaettuna lukumäärällä
        avg = sum / array.length;
        return avg; // Palautetaan laskettu keskiarvo
        } 
}

const coder4 = new ProgrammerWithMethod('Assi Kalma', 'C#', 'Backend', 'MS SQL')
console.log('Assin keskiarvo on', coder4.calculateAverage([2,5,4,5]))

/* Harjoitus 6 luo funktio, joka laskee vektorin alkioiden keskihajonnan perinteisellä tavalla
 Funktiolle annetaan argumenteiksi vektori ja haluttu desimaalien määrä*/

/* Harjoitus 7 Muuta edellisen harjoituksen funktio ES6-muotoon
*/

/* Harjoitus 8 Määrittele luokka, jossa on metodit keskiarvon,
keskihajonnan ja varianssin, suurimman ja pienimmän arvon laskemiseksi
argumenttina annetusta vektorista. */

/* HARJOITUS 9
Tee edellisen tehtävän luokasta CJS kirjasto ja anna se muiden ohjelmien käyttöön export-komennolla
Luo node.js-ohjelma, jossa luokasta luodaan 5 oliota ja tallennetaan ne vektoriin.

*/


