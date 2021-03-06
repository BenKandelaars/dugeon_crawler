import React from "react";
import "./Game.css"
import "../Reusable/globalStyles.css"
import { Vector, vectorPlus } from "../Util/utils.js"

export function Grid (props) {
  const playerLoc = props.gameMap.playerLoc

  // Game variable setting level of visability
  const HALF_WIDTH_BOUNDING_SQUARE = 2;

  const w = HALF_WIDTH_BOUNDING_SQUARE;
  const boundingVectors = [
    vectorPlus(new Vector(-w, w), playerLoc),
    vectorPlus(new Vector(w, -w), playerLoc)
  ]

  function cellColor(tile, Yindex, Xindex) {
    if (!tile) { return null};
    const concealedStyle = { backgroundColor: "black" };
    const revealedStyle = { backgroundColor: props.pieces[tile].color };

    let finalStyle = concealedStyle;

    if (props.revealMap) {
      finalStyle = revealedStyle;
    }

    if ( Yindex <= boundingVectors[0].y && Yindex >= boundingVectors[1].y ) {
      if ( Xindex >= boundingVectors[0].x && Xindex <= boundingVectors[1].x ) {
        finalStyle = revealedStyle
      }
    }

    return finalStyle;
  }

  let grid = props.gameMap.grid.map((row, Yindex) => {
    return (
    <tr key={Yindex}>
      {
        row.map((tile, Xindex) => {
          return (
            <td
              key={ Yindex * props.gameMap.x + Xindex }
              style={cellColor(tile, Yindex, Xindex)}
              className={(props.revealMap) ? "" : "concealCell"}
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
  /* Code for game play on an automatic loop. Roguelike doesn't require start / pause
  <button className="btn_main" onClick={() => {props.start()}}>Start</button>
  <button className="btn_main" onClick={() => {props.pause()}}>Pause</button>
  */

  return (
    <nav>
      <div className="nav_box">
        <button className="btn_main" onClick={() => props.changeLocation("home")}>Home</button>
        <button className="btn_main" onClick={() => props.startPause()}>
          {props.gameRunning ? "Pause" : "Start"}
        </button>
        <button className="btn_main" onClick={() => props.toggleRevealMap()}>Reveal</button>
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
