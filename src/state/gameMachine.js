import { Machine, assign } from "xstate"
import React from "react"
import { generateGrid, getAbsPath, getPairWithValue, getNextPos } from "./helpers"

export const GameMachine = React.createContext()

const grid = generateGrid(5, 5)

export const gameMachine = Machine(
  {
    type: "parallel",
    context: {
      grid,
      player: {
        pos: {row: 1, col: 3},
        end: 3,
        path: ""
      }
    },
    states: {
      player: {
        id: "player",
        initial: "walk",
        states: {
          idle: {
            after: {
              3000: [{ target: "walk" }],
            }
          },
          walk: {
            entry: ["getNewPath"],
            after: {
              3000: [{target: "gameover", cond: "posInvalid"}, { target: "walk" }],
            },
          },
          gameover: {
            type: "final"
          }
        }
      },
      tiles: {
        id: "tiles",
        initial: "idle",
        states: {
          idle: {
            on: {
              rotateTile: { target: "idle", actions: ["changeGrid"], cond: "canRotateHex" },
            },
          }
        }
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
      getNewPath: assign({
        player: (context, event) => {
          const { player, grid } = context
          const { row, col } = getNextPos(player.pos.row, player.pos.col, +player.end)
          if (!grid[row] || !grid[row][col]) {
            return {...player, pos:{row, col}}
          }
          const rot = grid[row][col].rotate
          const newStart = (+player.end + 3)%6
          const [start, end] = getPairWithValue(grid[row][col].pairs, newStart, rot)
          const newPath = getAbsPath(start, end, rot, row, col)

          return {
            pos: {row, col},
            end,
            path: newPath,
          }
        }
      })
    },

    guards: {
      canRotateHex: (context, event) => {
        const { player } = context
        const { row, col } = event.payload
        if (player.pos.row === row && player.pos.col === col) {
          return false
        }
        return true
      },
      posInvalid: (context, event) => {
        const { player } = context
        const { row, col } = player.pos
        return row < 0 || col < 0 || row > 4 || col > 4
      }
    }
  }
)
