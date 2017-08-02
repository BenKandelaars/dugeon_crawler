import React from "react";
import "./home.css"
import "../../common_styles/globalStyles.css"

// construct index to link between screens
// start on game

function Home (props) {
  return (
      <div className="home">
        <button className="btn_main" onClick={()=> props.changeLocation("game")}>New Game</button>
        <button className="btn_main" onClick={()=> props.changeLocation("mapBuilder")}>Map Builder</button>
      </div>
    )
}

export default Home
