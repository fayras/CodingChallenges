class Ray {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dir = {
      x: 0,
      y: 0
    }
  }

  next() {
    this.x += this.dir.x;
    this.y += this.dir.y;
  }
}

module.exports = Ray;
