function Grid(height, width) {
  this.height = height;
  this.width = width;
  this.grid = [];

  // Initialize the grid with cells
  for (let row = 0; row < height; row++) {
    this.grid[row] = [];
    for (let col = 0; col < width; col++) {
      this.grid[row][col] = {
        data: {
          walls: {
            top: true,
            right: true,
            bottom: true,
            left: true
          }
        }
      };
    }
  }
}
