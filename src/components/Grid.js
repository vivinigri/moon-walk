import React, { useContext } from "react"
import { GameMachine } from "state/gameMachine"
import { GridRow, Tile, HexTile, HexImg } from "styled/Grid.styled"
import tile from "assets/images/tile.png"
import Paths from "./Paths"

const Grid = () => {
  const { current, send } = useContext(GameMachine)
  const { grid } = current.context
  return grid.map((rows, row) => (
    <GridRow key={`row${row}`} cols={5}>
      {rows.map((cols, col) => (
        <Tile
          key={`ìmg${col}`}
          x={col}
          y={row}
          onClick={() => send({ type: "rotateTile", payload: { row, col } })}
        >
          <HexTile rotate={grid[row][col].rotate}>
            <Paths paths={grid[row][col].pairs} />
            <HexImg alt="tile" src={tile} />
          </HexTile>
        </Tile>
      ))}
    </GridRow>
  ))
}

export default Grid
