const Line = require('./Line.js');

/**
 * Zeichnet eine Linie mit dem Bresenham-Verfahren.
 *
 * @class
 * @extends Line
 */
class BresenhamLine extends Line {
  /**
   * Setzt die zuvor berechneten Pixel der Linie auf das Canvas/Grid
   * "target". Dabei wird davon ausgegangen, dass target eine Funk-
   * tion `target.set(x, y, brightness)` zum Zeichnen bereitstellt.
   *
   * @param {p5} target Instanz von p5, welche die Linie zeichnen soll.
   */
  draw(target) {
    for(let pixel of this.pixels) {
      target.set(Math.floor(pixel.x), Math.floor(pixel.y), Math.floor(pixel.brightness * 255));
    }
  }

  /**
   * Berechnet alle Pixel der Linie mit Hilfe des Bresenham-Verfahrens,
   * und speichert diese in der Variable `this.pixels` ab.
   *
   * @see {@link https://de.wikipedia.org/wiki/Bresenham-Algorithmus | Bresenham-Verfahren}
   */
  calculate() {
    this.pixels = [];

    let x0 = Math.floor(this.from.x);
    let y0 = Math.floor(this.from.y);
    let x1 = Math.floor(this.to.x);
    let y1 = Math.floor(this.to.y);

    let dx = Math.abs(x1 - x0);
    let dy = -Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    let e2;

    while(x0 != x1 || y0 != y1) {
      this.setPixel(x0, y0);
      e2 = 2 * err;
      if(e2 > dy) {
        err += dy;
        x0 += sx;
      }
      if(e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  }
}

module.exports = BresenhamLine;
