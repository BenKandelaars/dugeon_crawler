import React from "react";
import "./mapbuilder.css";
import "../Reusable/globalStyles.css"
import { Vector, initGrid} from "../Util/utils.js"
import { Title } from "../Reusable/components.js"

// Bug - when you overwrite player with wall, player doesn't update


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
  if (vector === null) { return newGrid }

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
      selectingActive: false,
      selectedPiece: "#",
      exiting: false //MAKE THIS CLEARER
    }
  }

   componentWillMount() {
    /* Code to initialise a fresh grid. Using mapBuilder to edit current game map so it initialise the current map instead.
    this.setState({
      grid: initGrid(this.state.x, this.state.y),
    })*/

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
    //Uses component state
    const x = e.target.getAttribute("data-x");
    if (x === null) { return }

    const y = e.target.getAttribute("data-y");
    let vector = new Vector(x, y)

    const selectedPiece = this.state.selectedPiece
    const selectedPieceType = this.props.pieces[selectedPiece].type
    let playerLoc = {... this.state.gameMap.playerLoc}
    let actorLoc = {...this.state.gameMap.actorLoc}

    // Create a deep copy of grid array
    let grid = JSON.stringify(this.state.gameMap.grid);
    grid = JSON.parse(grid)

    // Default behaviour is grid square is toggled.

    if (selectedPieceType !== "environment"){
      const maxAllowed = this.props.pieces[selectedPiece].max

      if (selectedPieceType == "player"){
        const isPlayerOnMap = playerLoc.hasOwnProperty("x")
        console.log("playerLoc ", playerLoc)
        console.log("vector ", vector)

        if (isPlayerOnMap){
          console.log("player on map triggered")
          // Click has been on current location
          if (playerLoc.x == vector.x && playerLoc.y == vector.y){
            playerLoc = {}; // Reset location
          } else { // new location, remove current & update location
            grid = updateGrid(grid, playerLoc, selectedPiece);
            playerLoc = vector
          }
        } else { // Player hasn't been placed yet.
        console.log("player on map NOT triggered")

          playerLoc = vector
        }
      }

      if (selectedPieceType == "actor"){
        // take / make array of that actor's Locations
        let locations = actorLoc[selectedPiece] || [];
      //  console.log("Locations at start = ", locations)
      //  console.log("Vector = ", vector)

        let unique = true;
      //   console.log("updatedLocations = ", updatedLocations)

        let updatedLocations = locations.filter((nextV) => {
          if (nextV.x == vector.x && nextV.y == vector.y){
            unique = false;
            return Boolean(false)
          } else {
            return Boolean(true)
          }
        });

        //console.log("Updated locations", updatedLocations)

        let numOnMap = updatedLocations.length;
        const maxAllowed = this.props.pieces[selectedPiece].max;

        if (unique && numOnMap < maxAllowed) {
          updatedLocations.push(vector)
        }

        if (numOnMap === maxAllowed) {
          vector = null // do nothing
        }

        // update object to return
        actorLoc[selectedPiece] = updatedLocations;
      //  console.log("actorLoc = ", actorLoc)
      }
    }

    grid = updateGrid(grid, vector, selectedPiece)


    this.setState({
      gameMap: {
        ...this.state.gameMap,
        grid: grid,
        playerLoc: playerLoc,
        actorLoc: actorLoc
      }
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
    console.log("Grid: ", JSON.stringify(this.state.gameMap.grid))
    console.log("PlayerLoc: ", JSON.stringify(this.state.gameMap.playerLoc))
    console.log("ActorLoc: ", JSON.stringify(this.state.gameMap.actorLoc))

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
            onMouseDown={this.startSelecting.bind(this)}
            onMouseUp={this.endSelecting.bind(this)}

            toggleTile={this.toggleTile.bind(this)}
          />
        </Main>
      </div>
    )
  }
}

export default MapBuilder
