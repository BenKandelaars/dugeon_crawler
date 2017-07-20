import React from "react";
import "./mapbuilder.css";
import "../Reusable/globalStyles.css"
import { Vector, initGrid} from "../Util/utils.js"
import { Title } from "../Reusable/components.js"

const Nav = props => {
  return (
    <nav>
      <div className="nav_box">
        <button className="btn_main" onClick={() => props.changeLocation("home")}>Home</button>
        <button className="btn_main" onClick={props.clearMap}>Clear</button>
        <button className="btn_main" onClick={props.exportMap}>Export</button>
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
    let baseStyle={
      display: "inline-block",
      height: "0.65rem",
      width: "0.65rem",
      marginRight: "4px"
    }

    let list = [];

    for (let piece in props.pieces){
      let style = Object.assign({}, baseStyle, {
        backgroundColor: props.pieces[piece].color
      }, )

      let selectedStyle = {};

      if (props.selectedPiece == piece) {
        selectedStyle = {backgroundColor: "#455d91"}
      };

      list.push(
        <button
          key={piece}
          className="btn_piecesList"
          style={selectedStyle}
          data-piece={piece}
          >
          <span style={style}>
          </span>
          {props.pieces[piece].name}
        </button>
      )
    }

    return (
    <section className="optionsSideBar">
      <h3>Options</h3>
      <p>Height: {props.height}</p>
      <p>Width: {props.width}</p>
      <p>Pieces</p>
      <ul onClick={(e) => props.changeSelectedPiece(e)}>
        {list}
      </ul>
    </section>
  )
}

const Table = props => {
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
      className="builder_table"
      onMouseDown={(e) => props.onMouseDown(e)}
      onMouseUp={() => props.onMouseUp()}
      >
      <tbody>
        {grid}
      </tbody>
    </table>
  )
}

function updateGrid(newGrid, vector, piece) {
  let tile = newGrid[vector.y][vector.x];
  tile = tile === piece ? "" : piece;

  newGrid[vector.y][vector.x] = tile;

  return newGrid;
}

class MapBuilder extends React.Component {
  constructor (props){
    super(props);

    this.state = {
      gameMap: this.props.gameMap,
      pieces: this.props.pieces,
      selectingActive: false,
      selectedPiece: "#",
      exiting: false
    }
  }

  componentWillMount() {
    /* Code to initialise a fresh grid. Using mapBuilder to edit current game map so it initialise the current map instead.
    this.setState({
      grid: initGrid(this.state.x, this.state.y),
    })
    */
  }

  exitHome() {
    this.setState(
      {
      exiting: true,
      }, () => {
      setTimeout(() => this.props.changeLocation("home"), 600)
      }
    )
  }

  toggleTile(e) {
    //Uses selectedPiece & gameMap in component state.
    const x = e.target.getAttribute("data-x");
    const y = e.target.getAttribute("data-y");

    if (x === null) { return }

    const vector = new Vector(x, y)
    let piece = this.state.selectedPiece


    // using this method to create a deep copy
    let grid = JSON.stringify(this.state.gameMap.grid);
    grid = JSON.parse(grid)

    // Update only if isPlayer & player has a location
    if (this.state.pieces[piece].type == "player"){

      if (this.state.gameMap.playerLoc){
  //      gameMap.grid = updateGrid(gameMap.grid, gameMap.playerLoc, piece);
      }
    }
    //let maxNum = this.state.pieces[piece].number
    //let numOnMap = this.state.gameMap.actorLoc

    grid = updateGrid(grid, vector, piece)

    this.setState({
      ...this.state.GameMap,
      grid: grid
    })
  }

  startSelecting(e) {
    this.toggleTile(e);
    this.setState({
      selectingActive: true
    })
  }

  endSelecting() {
    this.setState({
      selectingActive: false
    })
  }

  clearMap() {
    this.setState({
      gameMap: {
        ...this.state.gameMap,
        grid: initGrid(this.state.gameMap.x, this.state.gameMap.y)
      }
    })
  }

  exportMap() {
    console.log(JSON.stringify(this.state.gameMap.grid))
  }

  changeSelectedPiece(e) {
    const piece = e.target.getAttribute("data-piece");
    this.setState({
      selectedPiece: piece
    })
  }

  render () {
    const aniClass = this.state.exiting ? "aniLocationChange" : null

    return (
      <div className={aniClass}>
        <Title title="Map Builder" />
        <Nav
          changeLocation={this.exitHome.bind(this)}
          clearMap={this.clearMap.bind(this)}
          exportMap={this.exportMap.bind(this)}
        />
        <Main>
          <OptionsSideBar
            height={this.state.gameMap.y}
            width={this.state.gameMap.x}
            pieces={this.props.pieces}
            selectedPiece={this.state.selectedPiece}

            changeSelectedPiece={this.changeSelectedPiece.bind(this)}
          />
          <Table
            gameMap={this.state.gameMap}
            pieces={this.props.pieces}
            selecting={this.state.selectingActive}
            selectedPiece={this.state.selectedPiece}
            toggleTile={this.toggleTile.bind(this)}

            onMouseDown={this.startSelecting.bind(this)}
            onMouseUp={this.endSelecting.bind(this)}
          />
        </Main>
      </div>
    )
  }
}

export default MapBuilder
