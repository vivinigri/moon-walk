const lados = [0, 1, 2, 3, 4, 5]

function pairArray(ar) {
  const r1 = Math.floor(Math.random() * ar.length)
  const el1 = ar.splice(r1, 1)
  const r2 = Math.floor(Math.random() * ar.length)
  const el2 = ar.splice(r2, 1)
  return `${el1}-${el2}`
}

export const generateGrid = (ROWS, COLS) => {
  const grid = []
  for (let row = 0; row < ROWS; row++) {
    grid[row] = []
    for (let col = 0; col < COLS; col++) {
      const ar = [...lados]
      const pairs = [pairArray(ar), pairArray(ar), pairArray(ar)]
      grid[row][col] = { tile: 0, rotate: 0, pairs }
    }
  }
  return grid
}
