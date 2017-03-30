const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/** Enthält alle Typen und deren Effekte, welche von 1 abweichen,
 *  gegenüber anderen Typen.
 */
const typeCharactaristics = {
    normal: {rock: 0.5, ghost: 0, steel: 0.5},
    fire: {fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2},
    water: {fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5},
    electric: {water: 2, electric: 0.5, ground: 0, fly: 2, dragon: 0.5},
    grass: {fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, fly: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5},
    ice: {fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, fly: 2, dragon: 2, steel: 0.5},
    fighting: {normal: 2, ice: 2, poison: 0.5, fly: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dragon: 2, steel: 2, fairy: 0.5},
    poison: {grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2},
    ground: {fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2},
    flying: {electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5},
    psychic: {fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5},
    bug: {fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, fly: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5},
    rock: {fire: 2, ice: 2, fighting: 0.5, ground: 0.5, fly: 2, bug: 2, steel: 0.5},
    ghost: {normal: 0, psychic: 2, ghost: 2, dark: 0.5},
    dragon: {dragon: 2, steel: 0.5, fairy: 0},
    dark: {fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5},
    steel: {fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2},
    fairy: {fire: 0.5, fighting: 0.5, poison: 0.5, ground: 2, dragon: 2, steel: 0.5}
}

/**
 * Stellt eine Frage im Terminal und erwartet eine Antwort.
 * Auf Basis der Antwort wird der Vergleich der Typen vorgenommen und
 * wenn nötig, ein Api-Aufruf um Attacken-und Pokemon-Objekte abzurufen.
 */
rl.question('Lass den Vergleich beginnen: ', (answer) => {
    let actors = splitAnswer(answer);
    let requestsToDo = checkComposition(actors);
    axios.all(requestsToDo)
        .then((results) => {
            if(results[0] != undefined) {   //results[0] ist genau dann nicht undefined, wenn ein Api-Aufruf für eine Attacke stattgefunden hat.
                actors[0] = results[0].data.type.name;
            }
            if(results[1] != undefined) {   //results[1] ist genau dann nicht undefined, wenn ein Api-Aufruf für ein Pokemon stattgefunden hat.
                actors[1] = results[1].data.types.map((pokemonType) => {
                    return pokemonType.type.name
                })
            }
            
            let effectivityValue = effectivityCalculation(actors);
            console.log('Der Effekt ist: ' + giveAnswerFromEffectivityValue(effectivityValue));
            rl.close();
        })
})

/**
 * Unterteilt den eingegebenen String in Angreifer und Verteidiger.
 *
 * @param answer {string} - Benutzereingabe mit Angreifer und Verteidiger.
 * @returns {Array|*} - Enthält auf: Index 0 -> Angreifer.
 *                                   Index 1 -> Array aus Verteidigern.
 */
function splitAnswer(answer) {
    let attackerAndDefender = answer.split(' -> ');
    attackerAndDefender[1] = attackerAndDefender[1].split(' ');
    return attackerAndDefender
}

/**
 * Überprüft, welche Zusammensetzung aus Typen, Attacke und Pokemon übergeben wurde
 * und fügt für eine Attacke oder ein Pokemon einen Api-Request in das requestsToDo-Array
 * hinzu.
 * 
 * @param actors {Array} - Beinhaltet Typen, Attacke und Pokemon.
 */
function checkComposition(actors) {
    let requests= [undefined, undefined]
    if(!typeCharactaristics[actors[0]]){
        requests[0] = getTypeFromAttack(actors[0])
    }
    if(!typeCharactaristics[actors[1][0]]) {
        requests[1] = getTypeFromPokemon(actors[1])
    }
    return requests
}
/**
 * Berechnet die Effektivität zwischen Angreifer-Typ und Verteidiger-Typ.
 * 
 * @param targets - Array, in dem der erste Eintrag der Angreifer-Typ ist
 *                  und der zweite Eintrag der oder die Verteidiger-Typen.
 *                  
 * @returns {number} - numerischer Wert der Effektivität.
 */
function effectivityCalculation(targets) {
    let attacker = targets[0];
    let defender = targets[1]
    
    console.log('Der Typ: "' + targets[0] + '" wird mit: "' + targets[1] + '" verglichen.')
    
    let typeValues = []
    defender.forEach(type => {
        if(typeCharactaristics[attacker][type] != undefined){
            typeValues.push(typeCharactaristics[attacker][type])
        }
        else {
            typeValues.push(1);
        }
    })
    return typeValues.reduce((a, b) => a * b);
}

/**
 * Gibt zu einem Effektivitätswert einen Antwortsatz zurück.
 *
 * @param effectValue {number}- Der Effektivitätswert des Vergleichs.
 * @returns {string} - Der Antwortsatz, der angezeigt werden soll.
 */
function giveAnswerFromEffectivityValue(effectValue){
    let answer = '';
    if(effectValue === 0) {
        answer = 'No effect';
    }
    else if(effectValue > 0 && effectValue < 0.75) {
        answer = 'Not very effective'
    }
    else if(effectValue >= 0.75 && effectValue < 1.5) {
        answer = 'Normal'
    }
    else {
        answer = 'Super-effective'
    }
    return answer
}

/**
 * Liefert durch Eingabe des Attackennames das entsprechende Attacken-Objekt zurück.
 * 
 * @param attack {string} - Name der Attacke.
 * 
 * @returns {Object} - Objekt zur Attacke.
 */
function getTypeFromAttack(attack) {
    return axios.get('https://pokeapi.co/api/v2/move/' + attack)
}

/**
 * Liefert durch Eingabe des Pokemonnames das entsprechende Pokemon-Objekt zurück.
 * 
 * @param pokemon {string} - Name des Pokemon.
 * @returns {Array} - Objekt des Pokemons
 */
function getTypeFromPokemon(pokemon) {
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon)
}