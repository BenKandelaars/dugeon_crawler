import React, { Component } from "react";
import "./App.css";
import Home from "./Home/Home.js";
import Game from "./Game/Game.js";
import MapBuilder from "./Builder/MapBuilder.js";

class App extends Component {
  render() {
    return (
      <div className="Body">
        <Home>
          <MapBuilder />
        </Home>
      </div>
    );
  }
}

export default App;
