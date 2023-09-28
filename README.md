# NodeHarjoituksia
Web-palvelinten toimintaan liittyviä esimerkkejä toteutettuna Node.js kirjaston avulla

## Tietokanta ja näkymät

Luodaan näkymä, joka laskee edellisen kuukauden hinnan keskiarvon, normaalihinnan ala- ja ylärajat keskihajonnan perusteella. Jaetaan vaatimukset tehtäviksi tyyliin:

1. Selvitä kuluva vuosi ja kuukausi
2. Laske, mikä on edellisen kuukauden numero
3. Tee kysely, joka laskee tarvittavat keskirarvot ja keskihajonnat
4. Määrittele rajoittava ehto kuukaudelle ja vuodelle (tämän vuoden edell. kuukausi)
5. Muokkaa kyselyä siten, että se laskee ala- ja ylärajat (keskihinta +/- keskihajonta)
6. Muuta näkymäksi, joka hyödyntää month_lookup-taulua.

Luodaan näkymä, joka näyttää tiedot edelliseltä vuodelta, mutta kuluvalta kuukaudelta

## Mikropalvelu datan hakemiseen ja tallentamiseen

![Microservice2 drawio](https://github.com/TiViOpetus/NodeHarjoituksia/assets/24242044/c7bbe3d8-f0c4-4e7c-b564-26a422b1ab0d)

Node.js palvelin voi tehdä ajastettuja toimintoja. Selvitä, mitä kirjastoja voisi käyttää tähän tarkoitukseen. Luodaan palvelu, joka lukee päivittäin klo 15.30 hinnat ja tallentaa ne tietokantaan. Jos ei onnistu, yritetään uudelleen tunnin kuluttua. 

### Node.js ajastin (scheduler)

Jakakaa projektiryhmässä työt: kuka katsoo mitäkin työkalua tai kirjastoa. Lisätkää ne kortteina Githubin projektinhallintaan. Laittakaa tutkimiinne kirjastoihin kommentteina mielipide: "jatkoon, ei jatkoon" ja lyhyt perustelu miksi.

### PostgreSQL-kirjasto
Selvittäkää, mitä työkaluja / kirjastoja voisi käyttää tiedon hakemiseen ja tallentamiseen Node-sovelluksesta PostgreSQL-tietokantaan. Jakakaa tehtävät ja kirjatkaa projektinhallintaan. Mielipiteet kuten edellisessä tehtävässä.

Tehtävä:
Rakenna palvelu valmiiksi niin, että se pystyy hakemaan päivittäin hintatiedot porssisahko.net-palvelusta ja tallentamaan ne tietokantaan. Esimerkkikoodissa haku- ja tallennustapahtumat kaiutetaan konsoliin. Todellisessa palvelimessa ne halutaan kirjoittaa lokitiedostoon. Lisää koodiin kirjoitus tiedostoon (append) `fs`-kirjaston avulla.
