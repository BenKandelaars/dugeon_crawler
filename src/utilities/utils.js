

export function Vector(x, y) {
  this.x = x;
  this.y = y;
}

export function vectorPlus(vector1, vector2) {
  return {
    x: vector1.x + vector2.x,
    y: vector1.y + vector2.y
  }
}

export function initGrid(x, y) {
  let grid_row = new Array(x);
  grid_row.fill("");
  let grid = new Array(y);
  grid.fill(grid_row);

  return grid
}
