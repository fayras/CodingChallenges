const fs = require('fs');

// Liest die Datei "inputs.txt", in der die
// Eingaben für das Programm definiert sind.
const inputs = fs.readFileSync('inputs.txt').toString();


// Splitte die Eingaben in einzelne Tokens. Ein
// Token ist genau eine Zahl mit ggf. Einheit.
const tokens = inputs.split(/[\s\n]/);

// In der Aufgabenstellung war festgelegt, dass
// die erste Zahl das maximal Gewich, und die
// zweite die maximale Temperatur ist. Danach
// werden diese nicht mehr gebraucht: ent-
// ferne diese folglich aus dem Array.
const maxWeight = tokens.shift();
const maxTemp = tokens.shift();

let chairs = [];

// Wir brauchen die Schleife nur bis length/2
// laufen zu lassen, da eine Zeile immer
// genau zwei Zahlen als Eingabe hat.
for (var i = 0; i < tokens.length / 2; i++) {
  // Berechne den Index des 1D-Arrays der Tokens. Dabei
  // ist i * 2 die Nummer der Zeile der Eingaben.
	const weightIndex = i * 2;
	const tempIndex = i * 2 + 1;

	if(isLess(maxWeight, tokens[weightIndex])
    && isLess(tokens[tempIndex], maxTemp)) {
    // i + 1, um den Output für Menschen lesbarer
    // zu machen. Den "0ten Stuhl" gibt es nicht.
    chairs.push(i + 1);
	}
}

console.log(chairs.join(' '));

/**
 * Vergleich zwei Werte und gibt true zurück,
 * falls erster Wert kleiner als der zweite.
 *
 * @param  {Integer|String}  valueA Der erste Wert
 * @param  {Integer|String}  valueB Der zweite Wert
 * @return {Boolean}         Ist der erste Wert kleiner?
 */
function isLess(valueA, valueB) {
  // Wurde ein String übergeben, so wandle diesen in eine
  // Zahl um. Da immer nur kg mit kg und °C mit °C ver-
  // glichen wird, wird immer beides abgeschnitten.
	let a = +valueA.replace('kg', '').replace('°C', '');
	let b = +valueB.replace('kg', '').replace('°C', '');

	return a < b;
}
