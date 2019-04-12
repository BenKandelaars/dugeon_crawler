import { getPlayerBaseStats, getWeapons } from '../services/index'

export function getInitialState() {
    const playerBaseStats = getPlayerBaseStats()
    const weapons = getWeapons()

    const attack = playerBaseStats.attack + weapons.dagger.attack;
    const defend = playerBaseStats.defend + weapons.dagger.defend;

    return {         
        player: {
            name: "Ryan",
            color: "purple",
            health: 10,
            level: 1,
            weapon: "Dagger",
            attack: attack,
            defend: defend
        },
        isBattle: false  
    }
}

function rootReducer ( state = 0, action ) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state -1
    default:
      return state
  }
}

export function appReducer(state = getInitialState(), action) {
    switch(action.type){
        case 'BATTLE':
            return {
               ...state,
               battle: !state.battle
            };
        default:
            return state;
    }
}