<script>
document.addEventListener('DOMContentLoaded', () => {
    class MazeCell {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.isPath = false;
            this.entrySide = null;
            this.exitSide = null;
            this.visited = false;
        }

        markAsPath(entrySide, exitSide) {
            this.isPath = true;
            this.entrySide = entrySide;
            this.exitSide = exitSide;
        }
    }

    function generateMaze(elementId) {
        const maze = [];
        const size = 2; // For testing purposes, use a smaller size
        const stack = [];

        // Initialize the maze grid
        for (let y = 0; y < size; y++) {
            const row = [];
            for (let x = 0; x < size; x++) {
                row.push(new MazeCell(x, y));
            }
            maze.push(row);
        }

        // Start from a random cell on the left
        const startY = Math.floor(Math.random() * size);
        stack.push([0, startY, null]); // x, y, entrySide

        while (stack.length > 0) {
            const [x, y, entrySide] = stack.pop();
            if (x < 0 || x >= size || y < 0 || y >= size || maze[y][x].visited) {
                continue;
            }

            maze[y][x].visited = true;
            maze[y][x].markAsPath(entrySide, null);

            // Randomize directions: up, down, left, right
            const directions = [['bottom', 0, 1], ['right', 1, 0], ['top', 0, -1], ['left', -1, 0]];
            for (let i = directions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [directions[i], directions[j]] = [directions[j], directions[i]];
            }

            for (const [exitSide, dx, dy] of directions) {
                const nextX = x + dx, nextY = y + dy;
                stack.push([nextX, nextY, exitSide]);
            }
        }

        // Render the maze
        const container = document.getElementById(elementId);
        container.innerHTML = '';
        maze.forEach(row => {
            row.forEach(cell => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                if (cell.isPath) {
                    cellDiv.classList.add(`entry-${cell.entrySide}`);
                    cellDiv.classList.add(`exit-${cell.exitSide}`);
                }
                container.appendChild(cellDiv);
            });
        });
    }

    generateMaze('maze-container');
});
</script>
