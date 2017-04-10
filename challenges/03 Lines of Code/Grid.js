class Grid {
    /**
     * Constructor of grid

     * @param  {P5} sketch    [description]
     * @param  {Integer} pixelSize [description]
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
     * Get integer part of value by using floor function
     * @param  {Number} value Value to floor
     * @return {Integer}   result of Math.floor
     */
    ipart(value) {
        return Math.floor(value);
    }

    /**
     * Get fraction part of value
     * @param  {Number} value Value to split
     * @return {Integer}      fraction part
     */
    fpart(value) {
        if (value < 0) {
            return 1 - (value - Math.floor(value));
        } else {
            return value - Math.floor(value);
        }
    }

    /**
     * Get reverse of fraction part
     * @param  {Number} value Value to split
     * @return {Integer}       reverse fraction part
     */
    rfpart(value) {
        return 1 - this.fpart(value);
    }

    /**
     * Set pixel on grid with transparency
     * @param  {Integer} x column
     * @param  {Integer} y row
     * @param  {Integer} c alpha value
     */
    plot(x, y, c) {
        this.setPixel(x, y, Math.round(c * 255));
    }

    /**
     * Rounds a value by adding 0.5 part to it and using ipart function to get integer
     * @param  {Number} value Value that will be rounded
     * @return {Integer}       result
     */
    round(value) {
        return this.ipart(value + 0.5);
    }

    /**
     * Draw line on this grid with Xiaolin Wu's line algorithm
     * @param  {Number} x0 x-coordinate from first point
     * @param  {Number} y0 y-coordinate from first point
     * @param  {Number} x1 x-coordinate from second point
     * @param  {Number} y1 y-coordinate from second point
     */
    xiaolinWuLine(x0, y0, x1, y1) {
        x0 = Math.round(x0 / this.cellSize);
        y0 = Math.round(y0 / this.cellSize);
        x1 = Math.round(x1 / this.cellSize);
        y1 = Math.round(y1 / this.cellSize);
        let steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
        if (steep) {
            [x0, y0] = [y0, x0]; //swap values between x0 and y0
            [x1, y1] = [y1, x1]; //swap values between x1 and y1
        }
        if (x0 > x1) {
            [x0, x1] = [x1, x0];
            [y0, y1] = [y1, y0];
        }

        let dx = x1 - x0;
        let dy = y1 - y0;

        let gradient = dy / dx;

        if (dx == 0.0) {
            gradient = 1.0;
        }

        // handle first endpoint
        let xend = this.round(x0);
        let yend = y0 + gradient * (xend - x0);
        let xgap = this.rfpart(x0 + 0.5);
        let xpxl1 = xend; // this will be used in the main loop
        let ypxl1 = this.ipart(yend);

        if (steep) {
            this.plot(ypxl1, xpxl1, this.rfpart(yend) * xgap);
            this.plot(ypxl1 + 1, xpxl1, this.fpart(yend) * xgap);
        } else {
            this.plot(xpxl1, ypxl1, this.rfpart(yend) * xgap);
            this.plot(xpxl1, ypxl1 + 1, this.fpart(yend) * xgap);
        }
        let intery = yend + gradient; // first y-intersection for the main loop

        // handle second endpoint
        xend = this.round(x1);
        yend = y1 + gradient * (xend - x1);
        xgap = this.fpart(x1 + 0.5);
        let xpxl2 = xend; //this will be used in the main loop
        let ypxl2 = this.ipart(yend);
        if (steep) {
            this.plot(ypxl2, xpxl2, this.rfpart(yend) * xgap);
            this.plot(ypxl2 + 1, xpxl2, this.fpart(yend) * xgap);
        } else {
            this.plot(xpxl2, ypxl2, this.rfpart(yend) * xgap);
            this.plot(xpxl2, ypxl2 + 1, this.fpart(yend) * xgap);
        }

        // main loop
        if (steep) {
            for (let x = parseInt(xpxl1 + 1); x <= xpxl2 - 1; x++) {
                this.plot(this.ipart(intery), x, this.rfpart(intery));
                this.plot(this.ipart(intery) + 1, x, this.fpart(intery));
                intery += gradient;
            }

        } else {
            for (let x = parseInt(xpxl1 + 1); x <= xpxl2 - 1; x++) {
                this.plot(x, this.ipart(intery), this.rfpart(intery));
                this.plot(x, this.ipart(intery) + 1, this.fpart(intery));
                intery += gradient;
            }

        }
    }

    /**
     * Draw line on this grid with Bresenham's line algorithm
     * @param  {Number} x0 x-coordinate from first point
     * @param  {Number} y0 y-coordinate from first point
     * @param  {Number} x1 x-coordinate from second point
     * @param  {Number} y1 y-coordinate from second point
     */
    bresenhamLine(x0, y0, x1, y1) {
        x0 = Math.round(x0 / this.cellSize);
        y0 = Math.round(y0 / this.cellSize);
        x1 = Math.round(x1 / this.cellSize);
        y1 = Math.round(y1 / this.cellSize);
        const dx = Math.abs(x1 - x0);
        const dy = -Math.abs(y1 - y0);
        const sx = (x0 < x1) ? 1 : -1;
        const sy = (y0 < y1) ? 1 : -1;
        let err = dx + dy; /* error value e_xy */
        let e2;
        while (true) {
            this.setPixel(x0, y0, 255);
            if ((x0 == x1) && (y0 == y1)) break;
            e2 = 2 * err;
            if (e2 > dy) { /* e_xy+e_x > 0 */
                err += dy;
                x0 += sx;
            }
            if (e2 < dx) { /* e_xy+e_y < 0 */
                err += dx;
                y0 += sy;
            }
        }
    }

    /**
     * Sets pixel on grid, that should be drawn with specific alpha value from 0-255
     * @param {Integer} col column in the grid
     * @param {Integer} row row in the grid
     * @param {Integer} alpha alpha value from 0-255
     */
    setPixel(col, row, alpha) {
        this.grid[col][row] = alpha;
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
        this.grid.forEach((rows, column) => {
            rows.forEach((alpha, row) => {
                if (alpha && alpha > 0) { // don't need to draw full transparent pixels
                    this.sketch.fill(this.sketch.color(0,
                        alpha));
                    this.sketch.noStroke(); // don't need rectangle outbound
                    this.sketch.rect(column * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                }

            });
        });
    }
}

module.exports = Grid;
