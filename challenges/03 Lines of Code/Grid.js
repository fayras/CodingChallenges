class Grid {
    /**
     * [constructor description]

     * @param  {[type]} sketch    [description]
     * @param  {[type]} pixelSize [description]
     * @return {[type]}           [description]
     */
    constructor(sketch, pixelSize) {
        this.cellSize = pixelSize;
        this.columns = Math.round(window.innerWidth / this.cellSize);
        this.rows = Math.round(window.innerHeight / this.cellSize);
        this.sketch = sketch;
        this.grid = []
        this.createGrid();
    }

    /**
     * initialise grid with columns and rows in array
     */
    createGrid() {
        for (let x = 0; x < this.columns; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.rows; y++) {
                this.grid[x][y] = 0;
            }
        }
    }

    /**
     * Draw line on this grid with Bresenham's line algorithm
     * @param  {Number} x1 x-coordinate from first point
     * @param  {Number} y1 y-coordinate from first point
     * @param  {Number} x2 x-coordinate from second point
     * @param  {Number} y2 y-coordinate from second point
     */
    bresenhamLine(x0, y0, x1, y1) {
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = (x0 < x1) ? 1 : -1;
        const sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            this.setPixel(Math.round(x0 / this.cellSize), Math.round(y0 / this.cellSize), 255);

            if ((x0 == x1) && (y0 == y1)) break;
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
        this.grid.forEach((rows, column) => {
            rows.forEach((value, row) => {
                if (value && value > 0) {

                    this.sketch.fill(this.sketch.color('black'));
                    this.sketch.rect(column * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                }
            });
        });
        this.sketch.fill(255);
    }

    /**
     * [setPixel description]
     * @param {Integer} col column in the grid
     * @param {Integer} row row in the grid
     * @param {Integer} value alpha value from 0-255
     */
    setPixel(col, row, value) {
        this.grid[col][row] = value;
    }

    /**
     * Draw line on this grid with Xiaolin Wu's line algorithm
     * @param  {Number} x1 x-coordinate from first point
     * @param  {Number} y1 y-coordinate from first point
     * @param  {Number} x2 x-coordinate from second point
     * @param  {Number} y2 y-coordinate from second point
     */
    xiaolinWuLine(x1, y1, x2, y2) {

    }

    /**
     * Draw line on the grid
     * @param  {Object} p1   First point object with x and y coordinates
     * @param  {Object} p2   Second point object with x and y coordinates
     * @param  {bool} Draw line with antialiasing
     */
    line(p1, p2, antialiasing) {
        if (antialiasing) {
            this.xiaolinWuLine(p1.x, p1.y, p2.x, p2.y);
        } else {
            this.bresenhamLine(p1.x, p1.y, p2.x, p2.y);
        }
    }
}

module.exports = Grid;
