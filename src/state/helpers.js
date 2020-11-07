/*
 * Generate Grid
 */
const lados = [0, 1, 2, 3, 4, 5]

function randomInRange(ar) {
  return Math.floor(Math.random() * ar.length)
}

function pairArray(ar) {
  return `${ar.splice(randomInRange(ar), 1)}-${ar.splice(randomInRange(ar), 1)}`
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

/*
 * Get Path according to rotation
 */
function newLado(val, deg) {
  if (deg === 0) return val
  let delta = (deg / 60 + val) % 6
  return delta
}

export const getActualPath = (el, deg) => {
  const [p1, p2] = el.split("-")
  return `${newLado(+p1, deg)}-${newLado(+p2, deg)}`
}
