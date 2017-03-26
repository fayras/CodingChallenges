const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/** Enthält alle Typen und deren Effekte gegenüber anderen Typen. */
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
/**Speichert alle Requests ab, damit später alle gleichzeitig geladen werden können */
var promises = [undefined, undefined];


rl.question('Lass den Kampf beginnen', (answer) => {
    let actors = splitAnswer(answer);
    
    if(!typeCharactaristics[actors[0]]){
        promises[0] = getTypeFromAttack(actors[0])
    }
    if(!typeCharactaristics[actors[1][0]]) {
        promises[1] = getTypeFromPokemon(actors[1])
    }
   
        console.log(promises)
        axios.all(promises)
            .then((results) => {
                if(results[0] != undefined) {
                    actors[0] = results[0].data.type.name;
                }
                if(results[1] != undefined) {
                    let pokemonTypes = [];
                    results[1].data.types.forEach(type => {
                        pokemonTypes.push(type.type.name)
                    })
                    actors[1] = pokemonTypes
                }
                console.log(actors)
                
                let effectivityValue = effectivityCalculation(actors);
                console.log(giveAnswerFromEffectivityValue(effectivityValue));
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
 * Überprüft, welche Art von Vergleich vorgenommen wird. Sollte anstatt eines Angreifer-Typs
 * eine Attacke eingegeben worden sein, wird der Typ der Attacke ermittelt und übergeben.
 * Sollte anstatt Verteidiger-Typ/Typen ein Pokemonname übergeben worden sein, wird dessen Typ-
 * komposition ermittelt und dann übergeben.
 * 
 * @summary Ermittlung von Angreifer- und Verteidiger-Typ. 
 * 
 * @param targets - Array, in dem der erste Eintrag der Angreifer ist
 *                  und der zweite Eintrag der oder die Verteidiger.
 *                  
 * @returns {Array|*} - Typen von Angreifer und Verteidiger
 */
function battleComposition (targets) {
    let composition = [];
    if(typeCharactaristics[targets[0]]){
        composition[0] = targets[0]
    }
    else {
        console.log('Kein Typ sondern Attacke');
        composition[0] = getTypeFromAttack(targets[0])
    }
    if(typeCharactaristics[targets[1][0]]) {
        composition[1] = targets[1];
    }
    else {
        console.log('Keine Typen sondern Pokemon')
        composition[1] = getTypeFromPokemon(targets[1])
    }
    console.log(composition)
    return composition
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
    let targetTypes = targets[1]
    
    let typeValues = []
    targetTypes.forEach(type => {
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
 * Ermitteln des Types durch eingegebene Attacke.
 * 
 * @param attack {string} - Name der Attacke.
 * @returns {string} - Typ der Attacke.
 */
function getTypeFromAttack(attack) {
    return axios.get('https://pokeapi.co/api/v2/move/' + attack)
}

/**
 * Ermitteln des Types durch eingegebenes Pokemon.
 * 
 * @param pokemon {string} - Name des Pokemon.
 * @returns {Array} - Array der Typen des Pokemons
 */
function getTypeFromPokemon(pokemon) {
    return axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemon)
}