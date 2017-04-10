/**
 * Ein Grid stellt eine Art Canvas dar, auf dem Linien
 * gezeichnet werden können, welche mehrere echte
 * Pixel auf einem HTML-Canvas einnehmen.
 *
 * @class
 */
class Grid {
  /**
   * Erstellt eine Instanz eines Grids.
   *
   * @param  {Integer} w         Breite des echten Canvas in Pixel.
   * @param  {Integer} h         Höhe des echten Canvas in Pixel.
   * @param  {Integer} pixelSize Anzahl, wie viele echte Pixel auf dem Grid
   *                             zu einem Pixel zusammengefasst werden.
   */
  constructor(w, h, pixelSize) {
    this.shapes = [];
    this.grid = [];
    this.orgWidth = w;
    this.orgHeight = h;
    this.width = 0;
    this.height = 0;
    this.pixelSize = 0;
    this.setPixelSize(pixelSize);
  }

  /**
   * Befüllt ein 2D-Array mit leeren Einträgen auf dem Grid,
   * welche später einzelne Pixel darstellen sollen.
   *
   * @private
   */
  initializeGrid() {
    this.grid = [];
    for(let x = 0; x < this.width; x++) {
      this.grid.push([]);
      for(let y = 0; y < this.height; y++) {
        this.grid[x].push(0);
      }
    }
  }

  /**
   * Setzt die Pixel-Größe des Grids.
   *
   * @private
   * @param {Integer} size Die Größe des Grids.
   */
  setPixelSize(size) {
    this.width = Math.floor(this.orgWidth / size);
    this.height = Math.floor(this.orgHeight / size);
    this.pixelSize = size;
  }

  /**
   * Setzt eine Figur auf das Grid.
   */
  add(shape) {
    this.shapes.push(shape);
  }

  /**
   * Erhöht die Helligkeit des Pixels an der Stelle
   * (x, y) um die angegebene Helligkeit.
   *
   * @param {Integer} x       X-Koordinate des Pixels.
   * @param {Integer} y       Y-Koordinate des Pixels.
   * @param {Number}  opacity Wie stark das Pixel gezeichnet werden soll.
   *                          Dabei sind Werte 0 - 255 möglich, mit 0
   *                          Weiß und 255 Schwarz.
   */
  set(x, y, opacity) {
    this.grid[x][y] += opacity;
  }

  /**
   * Zeichnet alle zuvor mittels der Funktion {@link #add | add()}
   * hinzugefügte Figuren auf das echte Canvas.
   *
   * @param  {Canvas} target Das echte Canvas, auf das gezeichnet werden soll.
   */
  draw(target) {
    // Leere das Grid zunächst, damit keine zuvor gezeichneten Pixel sichtbar sind.
    this.initializeGrid();

    // Rufe die draw-Funktion der einzelnen Figuren auf, damit
    // diese die zu zeichnenden Pixel setzten können.
    for(let shape of this.shapes) {
      shape.draw(this);
    }
    target.push();
    target.noStroke();
    for(let x = 0; x < this.width; x++) {
      for(let y = 0; y < this.height; y++) {
        // Ist das Pixel an der Stelle (x, y) sichtbar, dann zeichne ein
        // Rechteck, welches die Größe pixelSize hat.
        if(this.grid[x][y]) {
          // Da die Linien eine Stärke angeben, so dass 255 Schwarz ent-
          // sprechen soll, muss dies umgewandelt werden, so dass
          // auch in  Schwarz auf das Canvas gezeichten wird.
          target.fill(255 - this.grid[x][y]);
          target.rect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
        }
      }
    }
    target.pop();
  }
}

module.exports = Grid;
