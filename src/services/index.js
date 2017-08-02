export function getGamePieces() {
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

export function getPlayerBaseStats() {
 return {
    attack: 1,
    defend: 1
  }
}

export function getWeapons() {
 return {
  Dagger: {
    type: "Dagger",
    attack: 4,
    defend: 1
    }
  } 
}
