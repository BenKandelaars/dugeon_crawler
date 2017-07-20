import React from "react";
import "./Game.css"
import "../Reusable/globalStyles.css"
import { Vector, initPlayer, gameData } from "../Util/utils.js"
import { Title } from "../Reusable/components.js"

const Grid = props => {
  let grid = props.gameMap.grid.map((row, Yindex) => {
    return (
    <tr key={Yindex}>
      {
        row.map((tile, Xindex) => {
          return (
            <td
              key={ Yindex * props.gameMap.x + Xindex }
              style={(tile) ? {backgroundColor: props.pieces[tile].color} : null}
              data-x={ Xindex }
              data-y={ Yindex }
            />
          )
        })
      }
    </tr>
    )
  })

  return (
    <table className="game_table">
      <tbody>
        {grid}
      </tbody>
    </table>
  )
}

const Nav = props => {
  return (
    <nav>
      <div className="nav_box">
        <button className="btn_main" onClick={() => props.changeLocation("home")}>Home</button>
        <button className="btn_main" onClick={() => {}}>Pause</button>
        <button className="btn_main" onClick={() => {}}>Reveal</button>
      </div>
    </nav>
  )
}

const Stats = props => {
  return (
  <ul className="stats">
    <li>Level: {props.level} </li>
    <li>Health: {props.health}</li>
    <li>Weapon: {props.weapon}</li>
  </ul>
  )
}

class Game extends React.Component {
  constructor (props) {
    super(props);

    this.actors = this.props.actors;
    this.state = {
      player: initPlayer()
    }
  }
  render () {
    return (
      <div>
        <Title title="Game Level 1" />
        <Nav
          changeLocation={this.props.changeLocation}/>
        <Stats
          level={this.state.player.level}
          health={this.state.player.health}
          weapon={this.state.player.weapon} />
        <div>
          <Grid
            gameMap={this.props.gameMap}
            pieces={this.props.pieces} />
        </div>
      </div>
    )
  }
}

export default Game
