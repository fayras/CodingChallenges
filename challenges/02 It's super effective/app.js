const readline = require('readline')
let lineInput = ''

//create readline interface that can use input and output from console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//create pokemon types object, each type has own strengths and weaknesses against other types
let pokemonTypes = {
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

//Listen to line input in console, that is returned with \r (Enter) and save this to lineInput variable
rl.on('line', (input) => {
    rl.close()
    lineInput = input
})
