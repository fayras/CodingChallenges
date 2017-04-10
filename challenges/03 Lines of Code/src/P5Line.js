const Line = require('./Line.js');

/**
 * Klasse P5Line, welche von der Klasse {@link #Line|Line} ableitet.
 *
 * @class
 * @extends Line
 */
class P5Line extends Line {
  /**
   * Zeichnet die Linie auf das Canvas mittels der Funktion 'line'.
   *
   * @param {p5} target Instanz von p5, welche die Linie zeichnen soll.
   */
  draw(target) {
    target.line(this.from.x, this.from.y, this.to.x, this.to.y);
  }

  /**
   * Berechnen der Pixel der Linie. Tu in diesem Fall nichts.
   */
  calculate() {
    // Es muss nichts berechnet werden.
  }
}

module.exports = P5Line;
