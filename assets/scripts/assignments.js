'use strict'

const boxIdAssignment = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8
}

const winConditions = [
  [0, 1, 2], [2, 5, 8], [2, 4, 6], [3, 4, 5],
  [1, 4, 7], [0, 4, 8], [6, 7, 8], [0, 3, 6]
]

const player = gameBoard => {
  // count the number of pieces on the board to calculate player turn
  const turnPieces = gameBoard.filter(piece => piece !== '')
  if (turnPieces.length % 2 === 0) {
    return 'x'
  } else {
    return 'o'
  }
}

module.exports = {
  boxIdAssignment,
  winConditions,
  player
}
