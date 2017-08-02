import { Vector } from '../utilities/utils'
// Redux - in reducers initial state & services

export function initPlayer() {
 const baseStats = {
    attack: 1,
    defend: 1
  }
 
  const weapon = {
      type: "Dagger",
      attack: 4,
      defend: 1
    }

  return {
    color: "purple",
    health: 10,
    level: 1,
    weapon: "Dagger",
    attack: 5,
    defend: 2,
  }
}

// REdux - yet to be split up.

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

// Redux - in services folder

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
