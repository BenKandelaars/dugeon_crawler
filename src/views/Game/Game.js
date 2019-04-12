import React from "react";
import "./game.css";
import "../../common_styles/globalStyles.css";
import { Vector, vectorPlus } from "../../utilities/utils";
import { initPlayer, gameData } from '../../state/state';
import { Title } from "../../common_components/Components";
import { Nav, Stats, Grid } from "./sub-components";
import BattleModal from "./BattleModal";

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
    let playerLoc = {...this.state.gameMap.playerLoc}
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
