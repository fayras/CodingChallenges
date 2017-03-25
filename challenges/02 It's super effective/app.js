const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Lass den Kampf beginnen', (answer) => {
    let actors = splitAnswer(answer);
    let effectivityValue = effectivityCalculation(actors);
    let answerSentence = giveAnswerFromEffectivityValue(effectivityValue);
    
    console.log(answerSentence);
    rl.close();
})


/**
 * Unterteilt den eingegebenen String in Angreifer-Typ und Verteidiger-Typ.
 *
 * @param answer {string} - Benutzereingabe der Typen.
 * @returns {Array|*} - Enthält auf: Index 0 -> Angreifer-Typ
 *                                   Index 1 -> Verteidiger-Typ
 */
function splitAnswer(answer) {
    let attackerAndTarget = answer.split(' -> ');
    return attackerAndTarget;
}

/**
 * Berechnet die Effektivität zwischen Angreifer und Verteidiger.
 * 
 * @param targets - Array, in dem der erste Eintrag der Angreifer-Typ ist
 *                  und der zweite Typ der oder die Verteidiger-Typen
 *                  
 * @returns {number} - numerischer Wert der Effektivität
 */
function effectivityCalculation(targets) {
    let attacker = targets[0];
    let targetTypes = targets[1].split(' ');
    console.log(attacker + ', ' + targetTypes)
    return 1.5;
}

/**
 * Gibt zu einem Effektivitätswert einen Antwortsatz zurück.
 *
 * @param effectValue - Der Effektivitätswert als Integer.
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