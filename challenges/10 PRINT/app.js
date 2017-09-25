const p5 = require('p5');

// Kreiere eine neue p5 Instanz. Diese
// wird alsParameter (hier "sketch")
// an die Funktion übergeben.
new p5(sketch => {
  /**
   * Setup-Funktion, in der alles initialisiert
   * wird, was in der Skizze verwerdet wird.
   */
  sketch.setup = function() {
    sketch.createCanvas(window.innerWidth, window.innerHeight);
    // Setup awesome stuff...
  };

  /**
   * Funktion zum Zeichnen auf den Canvas.
   * Diese wird automatisch von p5 mit
   * 60 FPS aufgerufen.
   */
  sketch.draw = function() {
    // Draw awesome stuff...
  };
});