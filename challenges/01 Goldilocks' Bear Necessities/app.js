const fs = require('fs');

//  Einlesen der Daten aus dem 'inputs.txt'-File.
//  Wenn keine Daten im File gefunden werden,
//  wird eine Fehlernachricht ausgegeben
//  und der Prozess beendet.
const rawFileInput = fs.readFileSync('inputs.txt');
if(!rawFileInput){
    console.log('Keine Daten gefunden');
    process.exit(1);
}

//  Umwandeln des Inputs in ein Array aus Wertepaaren.
const stringFileInput = rawFileInput.toString();
const valuePairs = stringFileInput.split(/\n/);


//  Abspeichern von Goldilocks Werten und Entfernen des ersten Wertepaares,
//  da es nur für Goldilocks Werte wichtig ist.
const goldisValues = valuePairs.shift()
const goldilocksWeight = parseInt(goldisValues.split(' ')[0]);
const goldilocksTemp = parseInt(goldisValues.split(' ')[1]);

//  Leeres Array für passende Wertepaare initialisieren.
const suitablePairs = [];

//  Wertepaare-Array durchlaufen und suitable-Funktion anwenden.
// Wenn diese 'true' zurückgibt, wird das aktuelle Wertepaar gespeichert.
for (var i = 0; i < valuePairs.length; i++) {
    if(suitableForGoldilocks(i)){
        suitablePairs.push(i + 1);
    }
}

//  Ausgabe der passenden Werte.
console.log(suitablePairs.join(' '));


/**
 *
 * Wandelt die aktuellen Werte aus dem Werpaar-Array in Integer um und
 * vergleicht sie mit Goldilocks Werten.
 *
 * @param value Index im Wertepaar-Array
 * @returns {boolean} 'true' gibt an, dass ein zulässiges Wertepaar gefunden wurde
 */
function suitableForGoldilocks(value) {
    var actualPair = valuePairs[value].replace('kg', '').replace('°C', '');
    var actualWeight = parseInt(actualPair.split(' ')[0]);
    var actualTemp = parseInt(actualPair.split(' ')[1]);
    
    if(actualWeight >= goldilocksWeight && actualTemp <= goldilocksTemp){
        return true
    }
    else {
        return false
    }
}