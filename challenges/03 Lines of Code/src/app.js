const p5 = require('p5');
const BresenhamLine = require('./BresenhamLine.js');
const XiaolinWuLine = require('./XiaolinWuLine.js');
const P5Line = require('./P5Line.js');
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
  const PIXEL_SIZE = 10;

  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;

  let grid;
  let bresenhamLine;
  let xiaolinWuLine;
  let p5Line;
  let angle = 0;

  /**
   * Setup-Funktion, in der alles initialisiert
   * wird, was in der Skizze verwerdet wird.
   */
  sketch.setup = function() {
    console.log(sketch);
    sketch.createCanvas(WIDTH, HEIGHT);

    grid = new Grid(WIDTH, HEIGHT, PIXEL_SIZE);

    // Erzeugt eine Bresenham Linie in der Mitte
    // des ersten Drittel des Canvas, welche
    // dann die Hälte des Drittels einnimmt.
    bresenhamLine = new BresenhamLine(
      grid.width / 6,
      grid.height / 2,
      grid.width / 6 + grid.width / 6,
      grid.height / 2
    );

    // Erzeugt eine XiaolinWu Linie in der Mitte
    // des gesamten Canvas, nimmt dann auch den
    // Platz einer Hälfte eines Drittels ein.
    xiaolinWuLine = new XiaolinWuLine(
      grid.width / 2,
      grid.height / 2,
      grid.width / 2 + grid.width / 6,
      grid.height / 2
    );

    // Eine Linie, welche von p5 gezeichnet wird,
    // beginnt im letzten Drittel des Canvas und
    // nimmt auch die Hälte eines Drittels ein.
    p5Line = new P5Line(
      grid.width / 6 * 5 * PIXEL_SIZE,
      grid.height / 2 * PIXEL_SIZE,
      grid.width / 6 * 5 * PIXEL_SIZE + grid.width / 6 * PIXEL_SIZE,
      grid.height / 2  * PIXEL_SIZE
    );

    grid.add(bresenhamLine);
    grid.add(xiaolinWuLine);
  };

  /**
   * Funktion zum Zeichnen auf den Canvas.
   * Diese wird automatisch von p5 mit
   * 60 FPS aufgerufen.
   */
  sketch.draw = function() {
    // Mit jedem Frame wird der Winkel erhöht und die
    // Linien entsprechend gedreht, so dass alle
    // Linien sich im Uhrzeigersinn drehen.
    angle += 0.05;
    bresenhamLine.rotate(angle);
    xiaolinWuLine.rotate(angle);
    p5Line.rotate(angle);

    // Löscht alle Pixel, welche im letzten Frame
    // auf dem Canvas gezeichnet wurden und setzt
    // den Hintergrund auf die Farbe Weiß.
    sketch.background(255);

    // Zeichnet das gesamte Grid, welches ein
    // "Zwischen-Canvas" darstellt. Daher
    // müssen die Linien nicht einzeln
    // gezeichnet werden.
    grid.draw(sketch);
    // Zeichne die p5 Linie auf das normale Canvas.
    p5Line.draw(sketch);
  };
});
