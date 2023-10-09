// RAKENTEET
// =========

// TOISTORAKENTEET
// ---------------

// For-silmukka
for (i = 0; i < 4 ; i++) {
    console.log('tämä on kierros', i);   
}

// For-In-silmukka
const teachers = ['Tuomas', 'Jussi', 'Mikko', 'Mika']
for (i in teachers) {
    console.log(teachers[i], 'on Rasekon opettaja');    
    }

// For-Each-silmukkaa vastaa vektoreiden forEach-metodi
teachers.forEach(teacher => {
    console.log(teacher, 'opettaa tietotekniikkaa')
});

// Alkuehtoinen silmukka, tarkistetaan ehto ennen suoritusta
console.log('Kohottakaamme kolminekertainen eläköön-huuto isänmaalle:')
let counter = 0
while (counter < 3) {
    console.log('Eläköön!')
    counter++    
}

// Loppuehtoinen silmukka, tehdään jotain ja sen jälkeen vasta tarkistetaan ehto
const allowed = 'no'
do {
    console.log('Kerta vielä kiellon päälle')
} while (allowed == 'yes');

// Silmukoista voi erikseen poistua break-komennon avulla
for (i in teachers) {
    console.log( teachers[i], 'opettaa ohjelmointia'); // Tuomas, Jussi
    if (teachers[i] == 'Jussi') {break;} // Lopetaan Jussin jälkeen
    
}

// EHTORAKENTEET
// -------------

// If-rakenne
let beacon = "punainen";
if (beacon == 'punainen') {
    console.log(beacon, 'viitta osoittaa väylän vasemman reunan.');
}
    else if (beacon == 'vihreä') {
        console.log(beacon, 'viitta osoittaa väylän oikean reunan.');
    }
    else {
        console.log(beacon, 'viitalla ei osoiteta väylän reunaa')
    }

// Switch-Case-rakenne

let colorPattern = 'keltainen-musta'
switch (colorPattern) {
    case 'musta-keltainen':
        console.log(colorPattern, 'on pohjoisviitta');
        break;
    case 'musta-keltainen-musta':
        console.log(colorPattern, 'on itäviitta');
        break;
    case 'keltainen-musta':
        console.log(colorPattern, 'on eteläviitta');
        break;
    case 'keltainen-musta-keltainen':
        console.log(colorPattern, 'on länsiviitta');
        break
    default:
        console.log(colorPattern, 'ei ilmoita väylän sijaintia ilmansuuntana')
            break;
}

// VIRHEENKÄSITTELY Try-Catch-Finally
// ----------------------------------

// Funktio, jolla muutetaan numero arvosanksi
const number2Credit = (number) => {
    let credit = ''
    const credits = ['Tyydyttävä 1', 'Tyydyttävä 2', 'Hyvä 3', 'Hyvä 4', 'Kiitettävä']

    // Haetaan numeerinen vastine tai generoidaan virhe
    try {
        if (isNaN(number)) throw 'Not a number'; // Jos syötetty muu kuin numero
        if (number > 5) throw 'over high limit (5)'; // Jos yli 5
        if (number < 1) throw 'under low limit (1)' // Jos alle 1
        credit = credits[number-1] // Haetaan teksti vektorista
    } 
    
    // Näytetään virheilmoitus konsolilla ja asetetaan arvosaksi virheellinen
    catch (error) {
        console.log('An error occured:', error)
        credit = 'Virheellinen arvosana' 
    }

    // Molemmissa tapauksissa palautetaan arvosana
    finally {
        return credit
    }
}

// Testataan vaihtoehtoja
let answer = number2Credit('Kiitettävä'); // NaN
console.log(answer);
answer = number2Credit(10); // >5
console.log(answer);
answer = number2Credit(0); // <1
console.log(answer);
answer = number2Credit(5);
console.log(answer);