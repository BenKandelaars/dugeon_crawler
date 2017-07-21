import React from "react";
import "./Game.css"
import "../Reusable/globalStyles.css"

export function Grid (props) {
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

export function Nav(props) {
  return (
    <nav>
      <div className="nav_box">
        <button className="btn_main" onClick={() => props.changeLocation("home")}>Home</button>
        <button className="btn_main" onClick={() => {props.start()}}>Start</button>
        <button className="btn_main" onClick={() => {props.pause()}}>Pause</button>
        <button className="btn_main" onClick={() => {}}>Reveal</button>
      </div>
    </nav>
  )
}

export function Stats(props) {
  return (
  <ul className="stats">
    <li>Level: {props.level} </li>
    <li>Health: {props.health}</li>
    <li>Weapon: {props.weapon}</li>
  </ul>
  )
}
