const THREE = require('three');
const Controls = require('./Controls.js');

const width = window.innerWidth;
const height = window.innerHeight;

// Erzeugt eine neue Szene. Zu dieser werden Objekte
// hinzugefügt, welche dann gerendert werden sollen.
var scene = new THREE.Scene();
// Eine neue Kamera, mit FOV = 75, und einer Reichweite bis 1000.
var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

// Erzeugt eine neue Instanz zum Kontrollieren der Kamera,
// so dass die Szene mit der Maus bewegt werden kann.
controls = new Controls( camera );
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

// Erzeugt einen neuen WebGL Renderer, setzt die Größe auf
// die des Fensters und fügt ein Canvas in die Seite ein.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);


// Objekte zur Scene hinzufügen.


// Funktion, welche die Szene rendert. Wird immer
// wieder aufgerufen, idealerweise mit 60 FPS.
(function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
})();
