// KAIKENKARVAISIA ESIMERKKEJÄ

/*let firstName = 'Jakke'
console.log( firstName.toUpperCase())
*/

// Joukko
// Joukko voidaan luoda vakioksi, koska itse joukkoa ei muuteta, ainoastaan sen alkioita
/*const nerds = new Set(); // Luodaan joukko Set-luokan avulla
nerds.add('Jonne'); // Lisätään alkio joukkoon
nerds.add('Jakke');
nerds.add('Calle');
nerds.add('Jonne'); // Jonnea ei lisätä, koska hän on jo joukossa
console.log(nerds); // Set(3) { 'Jonne', 'Jakke', 'Calle' }
nerds.delete('Calle'); // Poistetaan Calle

// Luodaan funktio, jolla käsitellään joukon jäsentä
// Funktio tarvitsee kaksi argumenttia, indeksin ja joukon
function callNames(index) {
  console.log('You bloody nerd', index); // Haukutaan yksittäistä alkiota
}

// Käytetään joukon forEach-metodia, jolle annetaan argumentiksi callback-funtio
nerds.forEach(callNames); // Nimitellään kaikkia joukon jäseniä vuorotellen
nerds.clear(); // Tyhjennetään joukko
console.log(nerds); // Set(0) {}
*/
// Avain-arvo-parit eli sanakirjat luodaan Map-luokasta
/*const contactInfo = new Map();
contactInfo.set('givenname', 'Jonne'); // Asetetaan avain ja arvo
contactInfo.set('surname', 'Janttari');
contactInfo.set('age', 17);

console.log(contactInfo); //Map(3) { 'givenname' => 'Jonne', 'surname' => 'Janttari', 'age' => 17 }

// Haetaan tietoja avainten perusteella
console.log(
  contactInfo.get('surname'),
  'is',
  contactInfo.get('age'),
  'years old'
);*/

// Muuttuja luodaan let-komennolla
/* let fullName = 'Jussi Jurkka';
console.log('Muuttujan fullName tietotyyppi on', typeof fullName);

// Muuttuja sisältää merkkijonoon liittyvät metodit
console.log(fullName.split(' '));

const fname = new String('Joel Rinne');
console.log('Muuttujan fname tietotyyppi on', typeof fname);

// Muuttuja sisältää merkkijonon metodit
console.log(fname.split(' '));

// String-luokan objektin voi luoda myös numeerisesta tiedosta
const age = new String(55);
console.log('age-muuttujassa on', age.length, 'kirjainta');

// Muuttuja on numeerinen
const meaningOfLife = 42;
console.log('meaningOfLife-muuttuja on ', typeof meaningOfLife)
console.log('Siinä on', meaningOfLife.length, 'kirjainta')
console.log('meaningOfLife-muuttuja.toString() on ', typeof meaningOfLife.toString());
*/

// Vektori / lista
/*const teachers = ['Tuomas', 'Jussi', 'Mikko', 'Mika'];
console.log('On mondays', teachers[0], 'will be teaching'); // Ensimmäinen alkio -> Tuomas

// Vektoriin lisääminen ja poistaminen
teachers.push('Mari') // Lisätään Mari
console.log('There is now', teachers.length, 'teachers in the array') // 5
console.log('And now we remove last element who was', teachers.pop()) // Mari
console.log('There is now', teachers.length, 'teachers in the array') // 4
console.log('Remove the first element who was', teachers.shift()) // Tuomas
teachers.unshift('Sirkku') // Lisätään Sirkku vektorin ensimmäiseksi alkioksi
console.log('Lista on nyt:', teachers)


console.log('Kohottakaamme kolminkertainen eläköön-huuto isänmaalle:')
let counter = 0
while (counter < 3) {
    console.log('Eläköön!')
    counter++    
}

const allowed = 'no'
do {
    console.log('Kerta vielä kiellon päälle')
} while (allowed == 'yes');



const teachers = ['Tuomas', 'Jussi', 'Mikko', 'Mika']

// Silmukoista voi hypätä kierroksen yli continue-komennolla
for (i in teachers) {
  if (teachers[i] == 'Mikko') {continue;} // Hypätään Mikon yli
  console.log( teachers[i], 'opettaa ohjelmointia');
  
}

// If-rakenne
let beacon = "keltainen";

if (beacon == 'punainen') {
    console.log(beacon, 'viitta osoittaa väylän vasemman reunan.');
}
    else if (beacon == 'vihreä') {
        console.log(beacon, 'viitta osoittaa väylän oikean reunan.');
    }
    else {
        console.log(beacon, 'viitalla ei osoiteta väylän reunaa')
    }
*/

// Switch-Case-rakenne

let colorPattern = 'punainen-musta'
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
