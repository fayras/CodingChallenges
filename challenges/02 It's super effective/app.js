const readline = require('readline')
const axios = require('axios')
let lineInput = ''

//create readline interface that can use input and output from console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//create pokemon types object, each type has own strengths and weaknesses against other types
const pokemonTypes = {
    normal: getPokemonTypeObject([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1]),
    fire: getPokemonTypeObject([1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1]),
    water: getPokemonTypeObject([1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1]),
    electric: getPokemonTypeObject([1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1]),
    grass: getPokemonTypeObject([1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1]),
    ice: getPokemonTypeObject([1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1]),
    fighting: getPokemonTypeObject([2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5]),
    poison: getPokemonTypeObject([1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2]),
    ground: getPokemonTypeObject([1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1]),
    flying: getPokemonTypeObject([1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1]),
    psychic: getPokemonTypeObject([1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1]),
    bug: getPokemonTypeObject([1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5]),
    rock: getPokemonTypeObject([1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1]),
    ghost: getPokemonTypeObject([0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1]),
    dragon: getPokemonTypeObject([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0]),
    dark: getPokemonTypeObject([1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5]),
    steel: getPokemonTypeObject([1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2]),
    fairy: getPokemonTypeObject([1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1])
}

/**
 * Initialise object with type strengths and weaknesses with values from given parameter and return it back
 * @param  int[] types Types strength and weaknesses modifiers
 * @return {}      Object with initialized strength and weaknesses values
 */
function getPokemonTypeObject(types) {
    let i = 0 //use i as index in types and postincrement it each time we use it, so that next time index will be used, it will be +1 and we don't need to write values as index
    return {
        normal: types[i++],
        fire: types[i++],
        water: types[i++],
        electric: types[i++],
        grass: types[i++],
        ice: types[i++],
        fighting: types[i++],
        poison: types[i++],
        ground: types[i++],
        flying: types[i++],
        psychic: types[i++],
        bug: types[i++],
        rock: types[i++],
        ghost: types[i++],
        dragon: types[i++],
        dark: types[i++],
        steel: types[i++],
        fairy: types[i++]
    }
}

/**
 * Writes error to stderr in console and then exits
 * @param  string message Error description
 */
function exitWithError(message) {
    console.error("\x1b[31m", message) //writes error in red
    process.exit(0) //exit with code 0, because we don't need stacktrace
}

//Reads attack and defend types, calculates effectiveness of an attack and writes it to console
rl.question('Please put in attack and defend types like this: typeAttack -> typeDefendA typeDefendB ...\n', (answer) => {
    const reg = /^\s*(\w+\s+)+\-\>(\s*\w+)+\s*$/i //regular expression to check for right syntax typeA [attackType] -> typeB [typeC] [...]
    const input = answer.toLowerCase().trim() //trimming our answer, to get rid of spaces before and after first and last letter of answer. 
        ///Just to ensure everything will be in lower case, we do it extra.
    rl.close() // disconnect readline from console stdin, because we already have our input data
    if (input.match(reg) === null) {
        exitWithError('Your input had wrong syntax')
    } else {
        const splittedAttackAndDefend = input.split(/\-\>/)
        const attackTypesString = splittedAttackAndDefend[0].trim()
        const defendTypesString = splittedAttackAndDefend[1].trim()
        let attackType = attackTypesString
        if (pokemonTypes[attackTypesString] === undefined) {
            const attackMove = attackTypesString.replace(/\s+/ig, '-') //use replace with regex, to replace all spaces between words with - 
                ///and use global scope, because otherwise it exits on first word
            axios.get(`http://pokeapi.co/api/v2/move/${attackMove}`) //get json response from pokemon api by attackMove name
                .then((response) => {
                    attackType = response.data.type.name //read effect type from response
                    checkForPokemonNameAndGetEffectiveness(attackType, defendTypesString)
                })
                .catch((error) => {
                    exitWithError('Could not find attack move or type effect. Error: ' + error.message)
                })
        } else {
            checkForPokemonNameAndGetEffectiveness(attackType, defendTypesString)
        }

    }

})

/**
 * Check if we have pokemon name or effect types string and then evaluate effectiveness. If neither of them
found, then error will be reported
 * @param  string attackType Attack type
 * @param  string defendTypesString string of all defend types or pokemon name
 */
function checkForPokemonNameAndGetEffectiveness(attackType, defendTypesString) {
    let defendTypes = defendTypesString.split(/\s+/)
    if (pokemonTypes[defendTypes[0]] === undefined) { //if first type effect not found, maybe it's pokemon name?, then try to get if from pokemon API
        const pokemonName = defendTypesString.replace(/\s+/ig, '-') //use replace with regex, to replace all spaces between words with - 
            ///and use global scope, because otherwise it exits on first word
        axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((response) => {
                defendTypes = []
                response.data.types.forEach(function(type) {
                    defendTypes.push(type.type.name)
                })
                effectivenessOutput(getEffectiveness(pokemonTypes[attackType], defendTypes))
            })
            .catch((error) => {
                exitWithError('Could not find pokemon or type effect. Error: ' + error.message)
            })

    } else {
        effectivenessOutput(getEffectiveness(pokemonTypes[attackType], defendTypes))
    }
}

/**
 * Mulpiplies attack effects strengths and weaknesses against defender effect types
 * @param  {type:value, ...} attackTypeObject Sub object from pokemonTypes object with key of attack effect type
 * @param  string[] defendTypesString    Array with defender effects type names
 * @return int   Effectiveness value
 */
function getEffectiveness(attackTypeObject, defendTypes) {
    let effectiveness = 1
    defendTypes.forEach((defenderTypeEffect) => {
        if (attackTypeObject[defenderTypeEffect] === undefined) {
            exitWithError('One of defending pokemon type effects, which you typed in, is unknown')
        } else {
            effectiveness *= attackTypeObject[defenderTypeEffect]
        }
    })

    return effectiveness
}

/**
 * Writes evaluated effectivenees to console with description of how much it is effective and its percentage
 * @param  int effectiveness Effectiveness value
 */
function effectivenessOutput(effectiveness) {
    if (effectiveness > 0 && effectiveness < 0.75) {
        console.log('Not very effective (' + effectiveness * 100 + '%)')
    } else if (effectiveness >= 0.75 && effectiveness < 1.5) {
        console.log('Normal (' + effectiveness * 100 + '%)')
    } else if (effectiveness >= 1.5) {
        console.log('Super-effective (' + effectiveness * 100 + '%)')
    } else {
        console.log('No effect (0%)')
    }
}
