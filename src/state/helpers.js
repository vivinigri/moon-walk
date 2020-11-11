/*
 * Generate Grid
 */
const lados = [0, 1, 2, 3, 4, 5]

function randomInRange(ar) {
  return Math.floor(Math.random() * ar.length)
}

function pairArray(ar) {
  return [ar.splice(0, 1)[0], ar.splice(randomInRange(ar), 1)[0]]
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
 * Constants hexagon
 */
export const points = [
  "90,17.5",
  "120,70",
  "90,122.5",
  "30,122.5",
  "0,70",
  "30,17.5",
]
export const center = "C60,70 60,70"
const cX = 60
const cY = 70

/*
 * Get Position on grid according to row and col
 */
function leftPos(col, row) {
  return col * 120 - (row % 2 === 1 ? 60 : 0)
}

function topPos(row) {
  return row * 140 - row * 35
}

/*
 * Get Path according to rotation
 */
function newLado(val, deg) {
  if (deg === 0) return val
  let delta = (deg / 60 + val) % 6
  return delta
}

function getActualPair(el, deg) {
  const [p1, p2] = el
  return [newLado(+p1, deg), newLado(+p2, deg)]
}

export const getPairPath = (pair, rot) => {
  const actual = getActualPair(pair, rot)
  const [p1, p2] = actual
  return `M${points[p1]} ${center} ${points[p2]}`
}

export const getAbsPath = (p1, p2, rot, row, col) => {
  const r1 = points[p1].split(",")
  const r2 = points[p2].split(",")
  const left = leftPos(col, row)
  const top = topPos(row)
  const init = `M${left + +r1[0]},${top + +r1[1]}`
  const end = `${left + +r2[0]},${top + +r2[1]}`
  const center = `C${left + cX},${top + cY} ${left + cX},${top + cY}`
  return `${init} ${center} ${end}`
}

/*
 * Machine player functions
 */

export const getPairWithValue = (ar, value, deg) => {
  const pair = ar.filter((el) => {
    const [i, j] = el
    const ij = [newLado(i, deg), newLado(+j, deg)]
    return ij.includes(value)
  })[0]
  const [p1, p2] = pair
  return newLado(+p1, deg) === +value
    ? [newLado(+p1, deg), newLado(+p2, deg)]
    : [newLado(+p2, deg), newLado(+p1, deg)]
}

export const getNextPos = (row, col, value) => {
  switch (value) {
    case 0:
      return { row: row - 1, col: row % 2 === 0 ? col + 1 : col }
    case 1:
      return { row: row, col: col + 1 }
    case 2:
      return { row: row + 1, col: row % 2 === 0 ? col + 1 : col }
    case 3:
      return { row: row + 1, col: row % 2 === 0 ? col : col - 1 }
    case 4:
      return { row: row, col: col - 1 }
    case 5:
      return { row: row - 1, col: row % 2 === 0 ? col : col - 1 }
    default:
      return { row, col }
  }
}
