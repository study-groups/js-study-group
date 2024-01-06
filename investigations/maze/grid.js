class Cell {
    constructor() {
        // Initialize properties of the cell
        this.walls = { top: true, right: true, bottom: true, left: true };
        this.visited = false;
        // Add more properties as needed
    }
}

class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = this.initializeCells();
    }

    initializeCells() {
        let cells = [];
        for (let y = 0; y < this.height; y++) {
            let row = [];
            for (let x = 0; x < this.width; x++) {
                row.push(new Cell());
            }
            cells.push(row);
        }
        return cells;
    }

    // Additional methods to manipulate the grid can be added here
    // For example, methods to remove walls, mark cells as visited, etc.
}

// Optionally, if you want to make Grid and Cell available globally
// window.Grid = Grid;
// window.Cell = Cell;
