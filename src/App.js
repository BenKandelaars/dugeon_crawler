import React, { Component } from "react";
import "./App.css";
import Home from "./Home/Home.js";
import Game from "./Game/Game.js";
import MapBuilder from "./Builder/MapBuilder.js";
import { getGameData } from "./Util/utils.js"

class App extends Component {
  constructor (props){
    super(props),

    this.state = {
      route: "home"
    }
  }

  changeLocation(location) {
    this.setState({
      route: location,
    })
  }

  render() {
    const components = {
      "home": (props) => <Home {...props} />,
      "mapBuilder": (props) => <MapBuilder {...props} />,
      "game": (props) => <Game {...props} />
    }

    const gameData = getGameData()

    let componentProps = {
      changeLocation: this.changeLocation.bind(this),
      pieces: gameData.pieces
    }

    if (this.state.route === "game" || this.state.route === "mapBuilder"){
      componentProps = Object.assign(componentProps, {
        gameMap: gameData["1"]
      })
    }

    return (
      <div className="Body">
        <header>
          <div className="head">
            <h1>Rogue-like Dungeon Crawler</h1>
          </div>
        </header>
          {components[this.state.route](componentProps)}
      </div>
    );
  }
}

export default App;
