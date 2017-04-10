// ***
// Hilfs-Funktionen für den Algorithmus von Xiaolin Wu.
// ***

/**
 * Wandelt eine Zahl in eine ganze Zahl (Integer) um.
 *
 * @ignore
 * @param  {Number} x Zahle, welche in ein Integer umgewandelt werden soll.
 * @return {Integer}  Die Zahl x als ganze Zahl.
 */
function ipart(x) {
  return Math.floor(x);
}

/**
 * Liefert die Nachkommastellen einer Zahl.
 *
 * @param  {Number} x Die Zahl, von der der Bruchteil ermittelt werden soll.
 * @return {Number}   Der Bruchteil der Zahl x, immer zwischen 0 und 0.9.
 */
function fpart(x) {
  if(x < 0) {
    return 1 - (x - Math.floor(x));
  }
  return x - Math.floor(x);
}

/**
 * Liefert das Inverse des Bruchteils einer Zahl x.
 *
 * @param  {Number} x Die Zahl, von der der inverse Bruchteil ermittelt werden soll.
 * @return {Number}   Der inverse Bruchteil einer Zahl x, zwischen 0.1 und 1.
 */
function rfpart(x) {
  return 1 - fpart(x);
}

const Line = require('./Line.js');

/**
 * Zeichnet eine Linie mit dem Xiaolin-Wu-Verfahren.
 *
 * @class
 * @extends Line
 */
class XiaolinWuLine extends Line {
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
   * Berechnet alle Pixel der Linie mit Hilfe des Xiaolin-Wu-Verfahrens,
   * und speichert diese in der Variable `this.pixels` ab.
   *
   * @see {@link https://de.wikipedia.org/wiki/Xiaolin_Wus_Linien-Algorithmus | Xiaolin-Wu-Verfahren}
   */
  calculate() {
    this.pixels = [];

    let x0 = this.from.x;
    let y0 = this.from.y;
    let x1 = this.to.x;
    let y1 = this.to.y;

    let steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);

    if(steep) {
      [x0, y0] = [y0, x0];
      [x1, y1] = [y1, x1];
    }
    if(x0 > x1) {
      [x0, x1] = [x1, x0];
      [y0, y1] = [y1, y0];
    }

    let dx = x1 - x0;
    let dy = y1 - y0;
    let gradient = dy / dx;
    if(dx === 0) {
      gradient = 1;
    }

    let xend = Math.round(x0);
    let yend = y0 + gradient * (xend - x0);
    let xgap = rfpart(x0 + 0.5);
    let xpxl1 = xend;
    let ypxl1 = ipart(yend);
    if(steep) {
      this.setPixel(ypxl1, xpxl1, rfpart(yend) * xgap);
      this.setPixel(ypxl1 + 1, xpxl1, fpart(yend) * xgap);
    } else {
      this.setPixel(xpxl1, ypxl1, rfpart(yend) * xgap);
      this.setPixel(xpxl1, ypxl1 + 1, fpart(yend) * xgap);
    }
    let intery = yend + gradient;

    xend = Math.round(x1);
    yend = y1 + gradient * (xend - x1);
    xgap = fpart(x1 + 0.5);
    let xpxl2 = xend;
    let ypxl2 = ipart(yend);
    if(steep) {
      this.setPixel(ypxl2, xpxl2, rfpart(yend) * xgap);
      this.setPixel(ypxl2 + 1, xpxl2, fpart(yend) * xgap);
    } else {
      this.setPixel(xpxl2, ypxl2, rfpart(yend) * xgap);
      this.setPixel(xpxl2, ypxl2 + 1, fpart(yend) * xgap);
    }

    for(let x = xpxl1 + 1; x < xpxl2; x++) {
      if(steep) {
        this.setPixel(ipart(intery), x, rfpart(intery));
        this.setPixel(ipart(intery) + 1, x, fpart(intery));
      } else {
        this.setPixel(x, ipart(intery), rfpart(intery));
        this.setPixel(x, ipart(intery) + 1, fpart(intery));
      }
      intery = intery + gradient;
    }
  }
}

module.exports = XiaolinWuLine;
