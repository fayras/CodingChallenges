const axios = require('axios');
const typesMap = require('./typesMap.js');
const typesTable = require('./typesTable.js');

class Types {
  /**
   * Eine abstrakte Klasse, welche den Multiplikator von
   * Pokemon-Angriffen gegen bestimmte Typen berechnet.
   *
   * @constructor
   * @abstract
   * @throws {Error} Wirf einen Fehler, wenn eine Instanz der Klasse
   *                 erzeugt wird, da diese nicht zum Instanzieren
   *                 gedacht ist.
   */
  constructor() {
    throw new Error('This is a class with only static functions.');
  }

  /**
   * Ein Array mit den Grenzen für den Multiplikator in Form von
   * Objekten. Dabei gibt 'mult' die obere Grenze an, 'message'
   * die dazugehrige Nachricht mit einem 'mult' Platzhalter.
   *
   * @static
   * @member {Object[]}
   */
  static get effects() {
    return [
      { mult: 0, message: 'No effect ({{mult}}%)' },
      { mult: 0.75, message: 'Not very effective ({{mult}}%)' },
      { mult: 1.5, message: 'Normal ({{mult}}%)' },
      { mult: 4, message: 'Super-effective ({{mult}}%)' }
    ];
  }

  /**
   * Liefert einen Multiplikator basierend darauf, welche
   * Typen für 'left' und 'right' angegeben wurden. Dabei
   * kann 'left' der Name eines Typs oder eine Attacke
   * eines Pokemons sein. 'right' kann ein String mit
   * durch Leerzeichen getrennte Typen oder der Name
   * eines Pokemons sein.
   *
   * @static
   * @param  {String} left          Der Typ des angreifenden Pokemons,
   *                                oder der Name einer Attacke.
   * @param  {String} right         Die Typen des verteidigenden Pokemons,
   *                                oder der Name des Pokemons.
   * @return {Promise<Float|null>}  Der Multiplikator des Angriffs.
   */
  static async getDamageMultiplier(left, right) {
    left = Types.normalize(left);
    right = Types.normalize(right);

    // Überprüft, ob es sich bei 'left' um einen Typen
    // handelt, wenn nicht, wird davon ausgegangen,
    // dass der Name einer Attacke übergeben wurde.
    if(!Types.isValid(left)) {
      left = Types.getMoveType(left);
    }

    // Überprüft, ob es sich bei 'right' um einen oder
    // mehrere Typen handelt, wenn nicht, wird davon
    // ausgegangen, dass der Name eines Pokemons
    // übergeben wurde.
    if(!Types.isValid(right)) {
      right = Types.getPokemonType(right);
    }

    // Wurden Namen übergeben, so müssen diese erst mittels
    // PokeAPI abgefragt werden. Deshalb müssen wir warten
    // bis beide Promises erfüllt bzw. abgewiesen wurden.
    [left, right] = await Promise.all([left, right]);

    // Konnte die API kein brauchbares Ergebnis liefern,
    // dann gib 'null' als den Multiplikator zurück.
    if(!left || !right) {
      return null;
    }

    // Wandelt 'left' und 'right' von Strings in die
    // entsprechenden Indizes zum Nachschlagen in
    // typesTable um.
    left = Types.mapTypes(left);
    right = Types.mapTypes(right.split(/\s+/g));

    // Wenn mehrere Typen als Verteidigung (right) übergeben wurden,
    // so ergibt das Produkt dieser den gesamten Multiplikator.
    return right.reduce((multiplier, type) => multiplier * typesTable[left][type], 1);
  }

  /**
   * Wandelt einen String oder ein String-Array in die
   * entsprechenden Typen-Indizes aus dem {@link #typesMap}-
   * Wörterbuch um. Wird ein String übergeben, so
   * wird der Index zurückgegeben. Wird ein Array
   * übergeben, so wird ein Array mit Indizes
   * zurückgegeben.
   *
   * @static
   * @param  {String|String[]} type  Typen, für welche Indizes gesucht werden sollen.
   * @return {Integer|Integer[]}     Der Index oder die Indizes.
   */
  static mapTypes(type) {
    if(typeof type === 'string') {
      return typesMap[type];
    }

    return type.map(item => typesMap[item]);
  }

  /**
   * Stellt sicher, dass keine Leerzeichen um den String
   * sind und dieser nur Kleinbuchstaben enthält.
   *
   * @static
   * @param  {String} type  Die Typen, welche normalisiert werden sollen.
   * @return {String}       Ein normalisierter String.
   */
  static normalize(type) {
    return type.trim().toLowerCase();
  }

  /**
   * Zusätzlich zum einfachen {@link #Types.normalize|Normalisieren}, werden
   * hierbei Leerzeichen durch Dashes ersetzt, da
   * die PokeAPI dieser Konvention folgt.
   *
   * @static
   * @param  {String} type  Die Typen, welche normalisiert werden sollen.
   * @return {String}       Ein normalisierter String für API Aufrufe.
   */
  static normalizeAPI(type) {
    return Types.normalize(type).replace(/\s+/g, '-');
  }

  /**
   * Überprüft, ob der angegebene Typ valide ist,
   * d.h. ob dieser in {@link #typesMap} existiert.
   *
   * @static
   * @param  {String} type  Der oder die Typen, welche überprüft werden sollen.
   *                        Sollen mehrere überprüft werden, so müssen diese
   *                        mit Leerzeichen getrennt werden.
   * @return {Boolean}      Ist der Typ valide?
   */
  static isValid(type) {
    // Filtert das Array aus Typen darauf, ob sich
    // in dem Array ein Typ befindet, welcher
    // nicht in typesMap existiert. Wird ein
    // solcher gefunden, so ist der gesamte
    // String kein valider Typ.
    let types = type.split(/\s+/g).filter(t => typesMap[t] === undefined);
    return types.length === 0;
  }

  /**
   * Macht einen API Request an {@link https://pokeapi.co/docsv2/#moves|PokeAPI}, um
   * den Typ einer Attacke herauszufinden.
   *
   * @static
   * @param  {String} move                Der Name der Attacke.
   * @return {Promise<String|undefined>}  Der Name des Typs, welchen die Attacke hat.
   */
  static async getMoveType(move) {
    // Geht bei dem API-Aufruf etwas schief, dann fange den Fehler ohne abzustürzen
    // und teile dem Benutzer mit, dass die Eingabe nicht verarbeitet werden konnte.
    try {
      let response = await axios.get(`https://pokeapi.co/api/v2/move/${Types.normalizeAPI(move)}`);
      return Types.normalize(response.data.type.name);
    } catch(e) {
      console.log(`Den Typ oder die Attacke '${move}' gibt es nicht.`);
      return undefined;
    }
  }

  /**
   * Macht einen API Request an {@link https://pokeapi.co/docsv2/#pokemon|PokeAPI}, um die
   * Typen eines Pokemons herauszufinden.
   *
   * @static
   * @param  {String} pokemon             Der Name eines Pokemons.
   * @return {Promise<String|undefined>}  Die Namen der Typen, welche das Pokemon besitzt.
   */
  static async getPokemonType(pokemon) {
    // Geht bei dem API-Aufruf etwas schief, dann fange den Fehler ohne abzustürzen
    // und teile dem Benutzer mit, dass die Eingabe nicht verarbeitet werden konnte.
    try {
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Types.normalizeAPI(pokemon)}`);
      let typesString = response.data.types.reduce((acc, item) => acc + item.type.name + ' ', '');
      return Types.normalize(typesString);
    } catch(e) {
      console.log(`Den Typ oder das Pokemon '${pokemon}' gibt es nicht.`);
      return undefined;
    }
  }

  /**
   * Gibt eine Nachricht zur Effektivität anhand von mult
   * zurück, diese sind in {@link #Types.effects} definiert.
   *
   * @static
   * @param  {Float} multiplier  Multiplikator, für den die Nachricht berechnet werden soll.
   * @return {String}            Nachricht basierend auf multiplier.
   */
  static getEffect(multiplier) {
    // Es wird angenommen, dass das Array mit den Effekten,
    // nach mult sortiert ist. Dann wird der erste Wert,
    // der größer als multiplier ist als Grenze gesetzt
    // und die dazu entsprechende Nachricht erzeugt.
    for(let effect of Types.effects) {
      if(multiplier <= effect.mult) {
        return effect.message.replace('{{mult}}', multiplier * 100);
      }
    }
    return  '';
  }

  /**
   * Liefert die Effektivität des Typs des Angriffs (left) gegen
   * den Typ des verteidigenden Pokemons (right).
   *
   * @static
   * @param  {String} left      Der Typ oder der Name des Angriffs.
   * @param  {String} right     Die Typen oder der Name des Pokemons.
   *                            Sollte das Pokemon mehrere Typen besitzen,
   *                            so können diese mit Leerzeichen getrennt
   *                            als ein String übergeben werden.
   * @return {Promise<String>}  Eine Nachricht, welche aussagt, ob der
   *                            Angriff effektiv oder nicht ist.
   */
  static async getMultiplierMessage(left, right) {
    let multiplier = await Types.getDamageMultiplier(left, right);
    if(multiplier === null) {
      return 'Ungültige Typen eingegeben.';
    }

    return Types.getEffect(multiplier);
  }
}

module.exports = Types;
