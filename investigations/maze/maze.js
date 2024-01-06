class Maze {
    constructor(mazeGrid) {
        this.mazeGrid = mazeGrid;
    }

    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container not found');
            return;
        }

        container.innerHTML = ''; // Clear existing content

        const gridElement = document.createElement('div');
        gridElement.classList.add('maze-grid');

        // Use this.mazeGrid.cells instead of this.mazeGrid.grid
        this.mazeGrid.cells.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('maze-row');

            row.forEach(cell => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('maze-cell');
                // Assuming 'activation' or similar property needs to be defined in Cell class
                cellElement.style.opacity = cell.activation || 1; // Default to 1 if undefined
                rowElement.appendChild(cellElement);
            });

            gridElement.appendChild(rowElement);
        });

        container.appendChild(gridElement);
    }
}
