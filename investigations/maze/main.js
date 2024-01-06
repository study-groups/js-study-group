document.addEventListener('DOMContentLoaded', () => {
    const grid = new Grid(32, 32);
    const maze = new Maze(grid);
    maze.render('maze-container');
});

