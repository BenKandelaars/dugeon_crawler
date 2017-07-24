import React, { Component } from "react";
import "./App.css";
import Home from "./Home/Home.js";
import Game from "./Game/Game.js";
import MapBuilder from "./Builder/MapBuilder.js";
import { initGameMaps, initGamePieces } from "./Util/utils.js"

// 1. feature/app is responsive

class App extends Component {
  constructor (props){
    super(props),

    this.state = {
      route: "home",
    }
  }

  changeLocation(location) {
    this.setState({
      route: location,
    })
  }

// Model Feature. Redirecting Game component to create modal
/* Prev
*   "game": (props) => <Game {...props} />
*  replaced with
*   "game": (props) => <ModelPage {...props} />
*/


  render() {
    const components = {
      "home": (props) => <Home {...props} />,
      "mapBuilder": (props) => <MapBuilder {...props} />,
      "game": (props) => <Game {...props} />
    }

    const gameMaps = initGameMaps();
    const pieces = initGamePieces();

    let componentProps = {
      changeLocation: this.changeLocation.bind(this),
      pieces: pieces
    }

    if (this.state.route === "game" || this.state.route === "mapBuilder"){
      componentProps = Object.assign(componentProps, {
        gameMap: gameMaps["1"]
      })
    }

    const style={
      margin: "0px 200px"
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
