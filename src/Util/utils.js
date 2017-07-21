

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

export function initPlayer() {
  return {
    color: "purple",
    health: 10,
    weapon: "Dagger",
    power: 5,
    level: 1
  }
}

export function initGameMaps() {
  return {
    "1" : {
      grid: [["#","#","","","#","#","#","#","#","#"],["#","","","@","","","","","","#"],["#","","","","","","","","","#"],["#","","","","","","","","","#"],["#","","","#","#","#","#","","","#"],["#","","","#","","","#","","","#"],["#","","","#","+","","#","","","#"],["#","","","","","","","","","#"],["#","","","","","","","","","#"],["#","#","#","#","#","#","#","#","#","#"]],
      x: 10,
      y: 10,
      actorLoc: {"@": [new Vector(3, 1)] //object with locaitons in an array
      },
      playerLoc: new Vector(4, 6)// vector
    }
  }
}

export function initGamePieces() {
  return {
    "#": {
      name: "Wall",
      type: "environment",
      color: "grey",
      max: -1, // -1 indicates unlimited.
    },
    "+": {
      name: "Player",
      type: "player",
      color: "green",
      max: 1
    },
    "@": {
      name: "Monster",
      type: "actor",
      color: "red",
      max: 4
    }
  }
}
