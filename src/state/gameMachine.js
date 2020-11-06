import { Machine, assign } from "xstate"
import React from "react"
import { generateGrid } from "./helpers"

export const GameMachine = React.createContext()

export const gameMachine = Machine(
  {
    initial: "idle",
    context: {
      grid: generateGrid(5, 5),
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
