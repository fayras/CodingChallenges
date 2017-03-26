const readline = require('readline');
const Types = require('./Types.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Gibt die Elemente ein, die verglichen werden sollen in Form von "fire -> grass". (STRG + C zum Beenden)');

// 'rl' ist hier das Eingabe-Interface, welches ein Event feuert, sobald
// der Benutzer eine Eingabe mit 'Enter' tätigt. Die gesamte Zeile
// wird als Parameter 'line' an die Callback-Funktion übergeben.
rl.on('line', line => {
  // Überprüft, ob das Format der Eingabe richtig ist. Dabei darf die Eingabe
  // beliebig viele Leerzeichen enthalten, da diese später entfernt werden.
  if(!/[\s\w]+->[\s\w]+/.test(line)) {
    return console.log('Falsches Format eingegeben. Valides Format: typA -> typB');
  }

  const tokens = line.split(/->/g);
  Types.getMultiplierMessage(tokens[0], tokens[1])
    .then(message => console.log(message));
});
