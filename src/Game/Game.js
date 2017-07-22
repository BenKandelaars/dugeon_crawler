import React from "react";
import "./Game.css"
import "../Reusable/globalStyles.css"
import { Vector, vectorPlus, initPlayer, gameData } from "../Util/utils.js"
import { Title } from "../Reusable/components.js"
import { Nav, Stats, Grid } from "./sub-components.js"

const keyCodeLookup = {
  37: ["left", [-1, 0]],
  38: ["up", [0, -1]],
  39: ["right", [1, 0]],
  40: ["down", [0, 1]]
}

class Game extends React.Component {
  constructor (props) {
    super(props);

    this.timer
    this.moveInput
    this.state = {
      gameRunning: false,
      gameMap: this.props.gameMap,
      player: initPlayer(),
    }
  }

  gameloop() {
    /*
    {
      ...this.state,
      ...this.props.gameMap,
      ...this.props.pieces
    }
    */
    const playerMove = this.moveInput
    let playerLoc = {... this.state.gameMap.playerLoc}
    let newPlayerLoc

    let grid = JSON.stringify(this.state.gameMap.grid);
    grid = JSON.parse(grid)

    if(playerMove){
      newPlayerLoc = vectorPlus(playerLoc, new Vector(...playerMove[1]))

      if (grid[newPlayerLoc.y][newPlayerLoc.x] === "#") {
        console.log("boof!!")
      }

      if (grid[newPlayerLoc.y][newPlayerLoc.x] === "") {
        const gridIcon = grid[playerLoc.y][playerLoc.x];
        grid[playerLoc.y][playerLoc.x] = "";
        grid[newPlayerLoc.y][newPlayerLoc.x] = gridIcon;
      } else {
        newPlayerLoc = playerLoc
      }
    }
    this.moveInput = null
    this.setState({
      gameMap: {
        ...this.state.gameMap,
        grid: grid,
        playerLoc: newPlayerLoc || playerLoc
      }
    })
  }

// Replacement code for a interval timer
/*
  componentWillUnmount(){
    clearInterval(this.timer);
  }

  start() {
     this.setTimer()
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    } else {
      this.setTimer()
    }
  }

  setTimer() {
    this.timer = setInterval(() => this.gameloop(), 400)
  }
*/

// Code for rogue like turn taking
  startPause() {
    if(this.state.gameRunning) {
      this.setState({
        gameRunning: !this.state.gameRunning
      })
    } else {
      this.setTimeStamp()
      this.setState({
        gameRunning: !this.state.gameRunning
      })
    }
  }

  setTimeStamp() {
    const date = new Date();
    this.timeStamp = date.getTime();
  }
//

  keypress(e) {
    if(keyCodeLookup.hasOwnProperty(e.keyCode)){
      this.moveInput = keyCodeLookup[e.keyCode]
    }

    const date = new Date();
    const timeElapsed = date.getTime()-this.timeStamp

    if (timeElapsed > 400) {
      this.gameloop()
      this.setTimeStamp()
    } else {
      setTimeout(() => this.gameloop(), 500 - timeElapsed)
    }
  }

  render () {

    return (
      <div onKeyDown={ (e) => this.keypress(e) }>
        <Title title="Game Level 1" />
        <Nav
          changeLocation={this.props.changeLocation}
        //  start={this.start.bind(this)}
        //  pause={this.pause.bind(this)}
          startPause={this.startPause.bind(this)}
          gameRunning={this.state.gameRunning}
          />
        <Stats
          level={this.state.player.level}
          health={this.state.player.health}
          weapon={this.state.player.weapon} />
        <div>
          <Grid
            gameMap={this.state.gameMap}
            pieces={this.props.pieces} />
        </div>
      </div>
    )
  }
}

export default Game
