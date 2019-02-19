'use strict'

const store = require('../assets/scripts/store.js')
const assignments = require('../assets/scripts/assignments.js')
const gameUi = require('../assets/scripts/game/commonUi.js')

const player = gameBoard => {
  // count the number of pieces on the board to calculate player turn
  const turnPieces = gameBoard.filter(piece => piece !== '')
  if (turnPieces.length % 2 === 0) {
    return 'x'
  } else {
    return 'o'
  }
}

const updateBoard = boxID => {
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

const declareWinner = gameBoard => {
  // loop through the above win conditions array
  for (let i = 0; i < assignments.winConditions.length; i++) {
    // if the game board grids in the corresponding array have pieces in them
    if (gameBoard[assignments.winConditions[i][0]] &&
      gameBoard[assignments.winConditions[i][1]] &&
       gameBoard[assignments.winConditions[i][2]]) {
      // then loop to see if the game pieces are identical
      if (gameBoard[assignments.winConditions[i][0]] === gameBoard[assignments.winConditions[i][1]] &&
       gameBoard[assignments.winConditions[i][0]] === gameBoard[assignments.winConditions[i][2]]) {
        // if the game pieces are identical, identify who wins
        return gameBoard[assignments.winConditions[i][0]]
      }
    }
  }
}

const declareTie = function (gameBoard) {
// If there is no empty spot on the board, declare a tie
  if (!(gameBoard.includes(''))) {
    return 'Game ties!'
  }
}

module.exports = {
  updateBoard,
  declareWinner,
  declareTie
}
