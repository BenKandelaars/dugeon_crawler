import React from "react";
import "./Game.css"
const Test = props => <p>Lets get the game on</p>;

class Game extends React.Component {
  render () {
    return (
      <div className="title">
        <Test />
      </div>
    )
  }
}

export default Game
