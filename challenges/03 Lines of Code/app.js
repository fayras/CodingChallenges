const p5 = require('p5');
const Grid = require('./Grid.js');

// Kreiere eine neue p5 Instanz. Diese
// wird alsParameter (hier "sketch")
// an die Funktion übergeben.
new p5(sketch => {
  /**
   * PIXEL_SIZE bezeichnet die Größe, wie viele "echte" Pixel
   * zu einem Pixel auf dem Grid zusammengefasst werden.
   *
   * @type {Integer}
   * @default 5
   * @constant
   */
  const PIXEL_SIZE = 5;

  let grid;

  /**
   * Setup-Funktion, in der alles initialisiert
   * wird, was in der Skizze verwerdet wird.
   */
  sketch.setup = function() {
    sketch.createCanvas(window.innerWidth, window.innerHeight);

    // Kreiere eine neue Grid-Instanz mit der Pixelgröße PIXEL_SIZE. Die
    // restlichen Parameter müssen ergänzt werden, falls benötigt.
    grid = new Grid(..., PIXEL_SIZE);
  };

  /**
   * Funktion zum Zeichnen auf den Canvas.
   * Diese wird automatisch von p5 mit
   * 60 FPS aufgerufen.
   */
  sketch.draw = function() {
    sketch.background(255);

    // Zeiche die Linien, welche sich auf dem Grid
    // anstatt auf dem "echten" Canvas befinden.
    ...

    // Zeiche zusätzlich zu den Linien auf dem Grid eine Linie
    // auf dem "echten" Canvas, um diese zu vergleichen. Der
    // Vergleich wird nochmals interessant, wenn PIXEL_SIZE
    // auf 1 gesetzt wird, so dass 1 "echter" Pixel gleich
    // einem Pixel auf dem Grid ist.
    sketch.line(X1, Y1, X2, Y2);

    // Stoppt die Draw-Schleife, so dass sketch.draw
    // nur ein einziges mal aufgerufen wird. Muss
    // für Bonus 1 entfernt werden.
    sketch.noLoop();
  };
});
