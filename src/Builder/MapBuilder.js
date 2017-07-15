import React from "react";
import "./mapbuilder.css";
import { Vector } from "../Util/Vector.js"

const Title = props => {
  return (
    <article className="mb_title">
      <h2>Map Builder</h2>
    </article>
  )
}

const Nav = props => {
  return (
    <nav>
      <div className="nav_box">
        <button onClick={props.homeClick}>Home</button>
        <button onClick={props.clearClick}>Clear</button>
        <button onClick={props.exportClick}>Export</button>
      </div>
    </nav>
  )
}

const Main = props => {
  return (
    <section className="builder_main">
      {props.children}
    </section>
  )
}

const OptionsSideBar = props => {
  const style={
    display: "inline-block",
    height: "0.8rem",
    width: "0.8rem",
    backgroundColor: props.selected.color
  }

  return (
    <section className="optionsSideBar">
      <h3>Options</h3>
      <p>Height: {props.height}</p>
      <p>Width: {props.width}</p>
      <p>Selected Actor</p>
      <p><span style={style}></span> {props.selected.name}</p>
    </section>
  )
}

const Table = props => {
  let grid = props.grid.map((row, Yindex) => {
    return (
    <tr key={Yindex}>
      {
        row.map((tile, Xindex) => {
          return (
            <td
              key={ Yindex * props.maxX + Xindex }
              style={(tile) ? {backgroundColor: props.actors[tile].color} : null}
              data-x={ Xindex }
              data-y={ Yindex }
              onMouseEnter={ (props.selecting) ? (e) => props.toggleTile(e) : null}
            />
          )
        })
      }
    </tr>
    )
  })

  return (
    <table
      onMouseDown={(e) => props.onMouseDown(e)}
      onMouseUp={(e) => props.onMouseUp()}
      >
      <tbody>
        {grid}
      </tbody>
    </table>
  )
}

function initGrid(x, y) {
  let grid_row = new Array(x);
  grid_row.fill("");
  let grid = new Array(y);
  grid.fill(grid_row);

  return grid
}

function initActors(){
  return {
    "#": {
      name: "Wall",
      color: "green",
    }
  }
}

function updateGrid(newGrid, vector, actor) {
  let tile = newGrid[vector.y][vector.x];
  tile = tile === actor ? "" : actor;

  newGrid[vector.y][vector.x] = tile;

  return newGrid;
}

class MapBuilder extends React.Component {
  constructor (props){
    super(props);

    this.state = {
      x: 10,
      y: 10,
      grid: [],
      selecting: false,
      actors: initActors()
    }
  }

  componentWillMount() {
    this.setState({
      grid: initGrid(this.state.x, this.state.y),
      selected: this.state.actors["#"]
    })
  }

  toggleTile(e) {
    const x = e.target.getAttribute("data-x");
    const y = e.target.getAttribute("data-y");

    if (x === null) { return }

    const vector = new Vector(x, y)

    let actor = "#"
    let newGrid = JSON.stringify(this.state.grid);
    newGrid = JSON.parse(newGrid)

    this.setState({
      grid: updateGrid(newGrid, vector, actor)
    })
  }

  onMouseDown(e) {
    this.toggleTile(e);
    this.setState({
      selecting: true
    })
  }

  onMouseUp() {
    this.setState({
      selecting: false
    })
  }

  clearClick() {
    this.setState({
      grid: initGrid(this.state.x, this.state.y)
    })
  }

  exportClick() {
    console.log(JSON.stringify(this.state.grid))
  }

  homeClick() {
    console.log("Time to go to the Home screen")
  }

  render () {
    return (
      <div>
        <Title />
        <Nav
          homeClick={this.homeClick.bind(this)}
          clearClick={this.clearClick.bind(this)}
          exportClick={this.exportClick.bind(this)}
        />
        <Main>
          <OptionsSideBar
            height={this.state.y}
            width={this.state.x}
            selected={this.state.selected}
          />
          <Table
            grid={this.state.grid}
            maxX={this.state.x}
            toggleTile={this.toggleTile.bind(this)}
            onMouseDown={this.onMouseDown.bind(this)}
            onMouseUp={this.onMouseUp.bind(this)}
            selecting={this.state.selecting}
            actors={this.state.actors}
          />
        </Main>
      </div>
    )
  }
}

export default MapBuilder
