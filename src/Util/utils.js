

export function Vector(x, y) {
  this.x = x;
  this.y = y;
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

export function getGameData() {
  return {
    "1" : {
      grid: [["#","#","","","#","#","#","#","#","#"],["#","","","","","","","","","#"],["#","","","","","","","","","#"],["#","","","","","","","","","#"],["#","","","#","#","#","#","","","#"],["#","","","#","","","#","","","#"],["#","","","#","","","#","","","#"],["#","","","","","","","","","#"],["#","","","","","","","","","#"],["#","#","#","#","#","#","#","#","#","#"]],
      x: 10,
      y: 10,
      actorLoc: {
      },
      playerLoc: {
      }
    },
    pieces: {
      "#": {
        name: "Wall",
        type: "environment",
        color: "grey",
        number: -1,
      },
      "+": {
        name: "Player",
        type: "player",
        color: "green",
        number: 1
      }
    }
  }
}
