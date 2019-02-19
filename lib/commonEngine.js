'use strict'

const store = require('../assets/scripts/store.js')
const assignments = require('../assets/scripts/assignments.js')
const gameUi = require('../assets/scripts/game/commonUi.js')

const player = (gameBoard) => {
  // count the number of pieces on the board to calculate player turn
  const turnPieces = gameBoard.filter(piece => piece !== '')
  if (turnPieces.length % 2 === 0) {
    return 'x'
  } else {
    return 'o'
  }
}

const updateBoard = function (boxID) {
  // translate boxID (in strings) to numbers
  const gameBoardIndex = assignments.boxIdAssignment[boxID]
  const gameBoard = store.user.game.cells
  // see if the boxID is already occupied
  if (!gameBoard[gameBoardIndex]) {
    // if boxID is not already occupied, append a piece to the corresponding index
    gameBoard[gameBoardIndex] = player(gameBoard)
  } else {
    gameUi.invalidMove()
  }
}

module.exports = {
  updateBoard
}
