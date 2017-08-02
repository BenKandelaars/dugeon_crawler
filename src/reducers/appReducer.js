import { getPlayerBaseStats, getWeapons } from '../services/index'

function getInitialState() {
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
        }   
    }
}

function appReducer(state = getInitialState, action) {
    return state
}