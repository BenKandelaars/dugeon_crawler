import React from "react";
import "./home.css"

class Home extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div className="head">
            <h1>Rogue-like Dungeon Crawler</h1>
          </div>
        </header>
        {this.props.children}
      </div>
    )
  }
}

export default Home
