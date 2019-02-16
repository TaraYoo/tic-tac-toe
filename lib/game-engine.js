'use strict'

// add game state, including turns to store.js
const store = require('../assets/scripts/store.js')

// switcher function to translate box ID to the javascript game board index
const boxIdAssignment = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8
}

const whichPiece = function () { // see whose turn it is - x or o
  // increment user's turn
  store.user.game.turn++
  // see whether it's x's turn or o's turn
  let gamePiece
  if (store.user.game.turn % 2 === 1) {
    gamePiece = 'x'
  } else {
    gamePiece = 'o'
  }
  return gamePiece
}

const invalidMove = function () {
  $('#invalid-move').html('Invalid Move')

  setTimeout(() => {
    $('#invalid-move').html('')
  }, 300)
}

const updateBoard = function (boxID) {
  // translate boxID (in strings) to numbers
  const gameBoardIndex = boxIdAssignment[boxID]
  const gameBoard = store.user.game.cells
  // see if the boxID is already occupied
  if (!gameBoard[gameBoardIndex]) {
    // if boxID is not already occupied, append a piece to the corresponding index
    gameBoard[gameBoardIndex] = whichPiece()
  } else {
    invalidMove()
  }
}

const winConditions = [
  [0, 1, 2], [2, 5, 8], [2, 4, 6], [3, 4, 5],
  [1, 4, 7], [0, 4, 8], [6, 7, 8], [0, 3, 6]
]

const declareWinner = function (gameBoard) {
  // loop through the above win conditions array
  for (let i = 0; i < winConditions.length; i++) {
    // if the game board grids in the corresponding array have pieces in them
    if (gameBoard[winConditions[i][0]] &&
      gameBoard[winConditions[i][1]] &&
       gameBoard[winConditions[i][2]]) {
      // then loop to see if the game pieces are identical
      if (gameBoard[winConditions[i][0]] === gameBoard[winConditions[i][1]] &&
       gameBoard[winConditions[i][0]] === gameBoard[winConditions[i][2]]) {
        // if the game pieces are identical, identify who wins
        return gameBoard[winConditions[i][0]]
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
  boxIdAssignment,
  declareWinner,
  declareTie
}
