import React from "react";
import "./Game.css";
import "../Reusable/globalStyles.css";
import { Vector, vectorPlus, initPlayer, gameData } from "../Util/utils.js";
import { Title } from "../Reusable/components.js";
import { Nav, Stats, Grid } from "./sub-components.js";
import BattleModal from "./BattleModal.js";

// 2. Feature/ Exit blocks to complete gameMap
// 3. Feature/ Enemy's move around
// 4. Feature/ Combat mechanics

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
      revealMap: false,
      gameMap: this.props.gameMap,
      player: initPlayer(),
      showBattleModal: false
    }
  }

  gameloop() {
    const playerMove = this.moveInput
    let playerLoc = {... this.state.gameMap.playerLoc}
    let nextPlayerLoc

    let grid = JSON.stringify(this.state.gameMap.grid);
    grid = JSON.parse(grid)

    if(playerMove){
      nextPlayerLoc = vectorPlus(playerLoc, new Vector(...playerMove[1]))
      const  nextGridTile = grid[nextPlayerLoc.y][nextPlayerLoc.x]

      if (nextGridTile === "#") {
      }

      if (nextGridTile === "#") {
        console.log("boof!!")
      }

      if (nextGridTile === "") {
        const gridIcon = grid[playerLoc.y][playerLoc.x];
        grid[playerLoc.y][playerLoc.x] = "";
        grid[nextPlayerLoc.y][nextPlayerLoc.x] = gridIcon;
      } else {
        nextPlayerLoc = playerLoc

        const objectCollision = this.props.pieces[nextGridTile];

        switch (objectCollision.type) {
          case "environment":
            console.log("boof!!")
            break;

          case "actor":
            this.setState({
              showBattleModal: true
            })
        }
      }
    }
    this.moveInput = null
    this.setState({
      gameMap: {
        ...this.state.gameMap,
        grid: grid,
        playerLoc: nextPlayerLoc || playerLoc
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

    // Minium timing before any move is possible.
    const MINIMUM_GAMELOOP_TIME = 400
    if (timeElapsed > MINIMUM_GAMELOOP_TIME) {
      this.gameloop()
      this.setTimeStamp()
    } else {
      setTimeout(() => this.gameloop(), MINIMUM_GAMELOOP_TIME - timeElapsed)
    }
  }

  toggleRevealMap() {
    this.setState({
      revealMap: !this.state.revealMap
    })
  }

  toggleBattleModal() {
    this.setState({
      showBattleModal: !this.state.showBattleModal
    })
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
          toggleRevealMap={this.toggleRevealMap.bind(this)}
          />
        <Stats
          level={this.state.player.level}
          health={this.state.player.health}
          weapon={this.state.player.weapon} />
        <div>
          <Grid
            gameMap={this.state.gameMap}
            revealMap={this.state.revealMap}
            pieces={this.props.pieces} />
        </div>
        <BattleModal
          isOpen={this.state.showBattleModal}
          toggleModal={this.toggleBattleModal.bind(this)}
          />
      </div>
    )
  }
}

export default Game
