import React, { Component } from "react";
import "./App.css";

import Home from "./views/Home/Home";
import Game from "./views/Game/Game";
import MapBuilder from "./views/Builder/MapBuilder";

import { initGameMaps, initGamePieces } from "./state/state"
import { createStore } from 'redux';
import { appReducer } from './reducers/appReducer'
// 1. make feature/app responsive

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

  render() {
    const style={
      margin: "0px 200px"
    }

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

function rootReducer ( state = 0, action ) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state -1
    default:
      return state
  }
}

let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe( () => console.log(store.getState()));

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });

export default App;
