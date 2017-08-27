const THREE = require('three');
const MAX_POINTS = 500;

class LorenzAttractor extends THREE.Object3D {
  constructor(a, b, c) {
    super();
    this.x = 1;
    this.y = 0;
    this.z = 0;
    this.a = a;
    this.b = b;
    this.c = c;
    this.index = 0;
    this.deltaTime = 0.01;

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(MAX_POINTS * 3); // 3 vertices per point
	  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.drawCount = 0; // draw the first x points, only
    geometry.setDrawRange(0, this.drawCount);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 });
    this.line = new THREE.Line(geometry,  material);
    this.add(this.line);
  }

  update() {
    const positions = this.line.geometry.attributes.position.array;
    positions[this.index] = this.x;
    positions[this.index + 1] = this.y;
    positions[this.index + 2] = this.z;

    this.x += (this.a * (this.y - this.x)) * this.deltaTime;
    this.y += (this.x * (this.b - this.z) - this.y) * this.deltaTime;
    this.z += (this.x * this.y - this.c * this.z) * this.deltaTime;

    if(this.drawCount >= MAX_POINTS - 1) {
      positions.copyWithin(0, 3);
    } else {
      this.drawCount += 1;
      this.index += 3;
      this.line.geometry.setDrawRange(0, this.drawCount);
    }

    this.line.geometry.attributes.position.needsUpdate = true;
  }
}

module.exports = LorenzAttractor;
