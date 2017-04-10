/**
 * Eine abstrakte Klasse, welche eine Linie repräsentiert.
 *
 * @class
 * @abstract
 */
class Line {
  /**
   * Erzeugt eine neue Instanz der Klasse Linie.
   *
   * @constructor
   * @param {Number} fromX Position auf der X-Achse, an
   *                       welcher die Linie anfängt.
   * @param {Number} fromY Position auf der Y-Achse, an
   *                       welcher die Linie anfängt.
   * @param {Number} toX   Position auf der X-Achse, an
   *                       welcher die Linie aufhört.
   * @param {Number} toY   Position auf der Y-Achse, an
   *                       welcher die Linie aufhört.
   */
  constructor(fromX, fromY, toX, toY) {
    this.from = { x: fromX, y: fromY };
    this.to = { x: toX, y: toY };
    this.pixels = [];
    this.calculate();
  }

  /**
   * Gibt die Länger der gezechnet Linie an. Das Ergebnis sollte
   * nach Möglichkeit zwischengespeichert werden, da die Bere-
   * chnung rechenintensiv mittels Quadratwurzel erfolgt.
   *
   * @readonly
   * @type {Float}
   */
  get length() {
    return Math.sqrt(Math.pow(this.to.x - this.from.x, 2) + Math.pow(this.to.y - this.from.y, 2));
  }

  /**
   * Setzt den Anfang der Linie auf den Punkt (x, y).
   *
   * @param {Number} x Position auf der X-Achse.
   * @param {Number} y Position auf der Y-Achse.
   */
  setStart(x, y) {
    this.from.x = x;
    this.from.y = y;
    this.calculate();
  }

  /**
  * Setzt das Ende der Linie auf den Punkt (x, y).
  *
  * @param {Number} x Position auf der X-Achse.
  * @param {Number} y Position auf der Y-Achse.
   */
  setEnd(x, y) {
    this.to.x = x;
    this.to.y = y;
    this.calculate();
  }

  /**
   * Dreht die Linie um den angegeben Winkel.
   *
   * @param {Float} angle Der Winkel, um den die Linie gedreht werden soll.
   */
  rotate(angle) {
    let len = this.length;
    let x = len * Math.cos(angle) + this.from.x;
    let y = len * Math.sin(angle) + this.from.y;
    this.setEnd(x, y);
  }

  /**
   * Zeichnet die Linie auf den entsprechenden Untergrund.
   *
   * @abstract
   * @param {*} target Untergrund auf den die Linie gezeichnet werden soll.
   * @throws {Error} draw ist eine abstrakte Methode, welche in der Klasse
   *                 Linie nicht implementiert wird und daher einen
   *                 Fehler wirft, falls diese aufgerufen wird.
   */
  draw(target) {
    throw new Error('Function "draw" not implemented.');
  }

  /**
   * Setzt einen einzigen, bestimmten Pixel der Linie. Dabei
   * sind x und y globale Koordinaten auf dem Canvas/Grid.
   *
   * @private
   * @param {Number} x              X-Koordinate des Pixels
   * @param {Number} y              Y-Koordinate des Pixels
   * @param {Integer} [Opacity = 1] Die Stärke, mit welcher der Pixel
   *                                gezeichnet wird. Dabei muss ein
   *                                Wert 0 - 1 übergeben werden.
   */
  setPixel(x, y, o = 1) {
      this.pixels.push({ x: x, y: y, brightness: o});
  }

  /**
   * Berechnet die einzelnen Pixel der Linie.
   *
   * @abstract
   * @throws {Error} calculate ist eine abstrakte Methode, welche in der Klasse
   *                 Linie nicht implementiert wird und daher einen
   *                 Fehler wirft, falls diese aufgerufen wird.
   */
  calculate() {
    throw new Error('Function "calculate" not implemented.');
  }
}

module.exports = Line;
