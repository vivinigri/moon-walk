import React, { useContext } from "react"
import styled from "styled-components"
import { GameMachine } from "./../state/gameMachine"
import tile from "./../assets/images/tile.png"
import Path from "./Path"

const HexTile = styled.div`
  width: 120px;
  height: 140px;
  cursor: pointer;
  margin: 0;
  position: absolute;
  left: ${(props) => props.x * 120 - (props.y % 2 === 1 ? 60 : 0)}px;
  top: ${(props) => props.y * 140 - props.y * 35}px;
  transform: rotate(${(props) => props.rotate}deg);
  transition: rotate ${(props) => 0.5}s ease-in-out;
`

const HexImg = styled.img`
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
`

const Grid = () => {
  const { current, send } = useContext(GameMachine)
  const { grid } = current.context
  return grid.map((rows, row) => (
    <div
      key={`row${row}`}
      style={{
        display: "flex",
        flexDirection: "row",
        height: 140,
        width: 600,
      }}
    >
      {rows.map((cols, col) => (
        <div style={{ margin: 0 }} key={`ìmg${col}`}>
          <HexTile
            className="hexTile"
            x={col}
            y={row}
            rotate={grid[row][col].rotate}
            onClick={() => send({ type: "rotateTile", payload: { row, col } })}
          >
            {grid[row][col].pairs.map((pair) => {
              const [p1, p2] = pair.split("-")
              return <Path key={`pair${row}${col}${p1}${p2}`} p1={p1} p2={p2} />
            })}

            <HexImg alt="tile" src={tile} />
          </HexTile>
        </div>
      ))}
    </div>
  ))
}

export default Grid
