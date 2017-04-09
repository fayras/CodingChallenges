class Grid {
    constructor(pixelSize) {
        this.cellSize = pixelSize;
        this.columns = parseInt(window.innerWidth / this.cellSize);
        this.rows = parseInt(window.innerHeight / this.cellSize);
        this.createGrid();
        console.log(sketch);
    }

    /**
     * Creates grid from this.columns and this.rows properties
     */
    createGrid {

    }

    /**
     * Draw line on this grid with Bresenham's line algorithm
     * @param  {Number} x1 x-coordinate from first point
     * @param  {Number} y1 y-coordinate from first point
     * @param  {Number} x2 x-coordinate from second point
     * @param  {Number} y2 y-coordinate from second point
     */
    bresenhamLine(x1, y1, x2, y2) {

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
     * Draw simple line on the grid
     * @param  {Object} p1   First point object with x and y coordinates
     * @param  {Object} p2   Second point object with x and y coordinates
     * @param  {int} type Draw line algorithm (0 -- normal, 1 -- bresenham, 2 -- Xiaolin Wu)
     */
    normalLine(x1, y1, x2, y2) {

    }

    /**
     * Draw line on the grid
     * @param  {Object} p1   First point object with x and y coordinates
     * @param  {Object} p2   Second point object with x and y coordinates
     * @param  {int} type Draw line algorithm (0 -- normal, 1 -- bresenham, 2 -- Xiaolin Wu)
     */
    line(p1, p2, type) {
        switch (type) {
            default: break;
            case 0:
                    this.normalLine(p1.x, p1.y, p2.x, p2.y);
                break;
            case 1:
                    this.bresenhamLine(p1.x, p1.y, p2.x, p2.y);
                break;
            case 2:
                    this.xiaolinWuLine(p1.x, p1.y, p2.x, p2.y);
                break;
        }



    }
}

module.exports = Grid;
