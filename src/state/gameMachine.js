import { Machine, assign } from "xstate"
import React from "react"
import { generateGrid, getPairPath } from "./helpers"

export const GameMachine = React.createContext()

const grid = generateGrid(5, 5)

export const gameMachine = Machine(
  {
    initial: "idle",
    context: {
      grid,
      player: {
        pos: {row: 3, col: 3},
        path: getPairPath(grid[2][2].pairs[0], 0)
      }
    },
    states: {
      idle: {
        on: {
          rotateTile: { target: "idle", actions: ["changeGrid"] },
        },
      },
    },
  },
  {
    actions: {
      changeGrid: assign({
        grid: (context, event) => {
          const { grid } = context
          const { row, col } = event.payload
          const curRotation = grid[row][col].rotate
          grid[row][col].rotate = curRotation + 60
          return grid
        },
      }),
    },
  }
)
