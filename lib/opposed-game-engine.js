'use strict'

// add game state, including turns to store.js
const store = require('../assets/scripts/store.js')
const gameUi = require('../assets/scripts/game/gameUi.js')

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}
// randomInt function from MDN. Use to randomly select a computer's move

const player = (gameBoard) => {
  const turnPieces = gameBoard.filter(piece => piece !== '')
  if (turnPieces.length % 2 === 0) {
    return 'x'
  } else {
    return 'o'
  }
}

// use above getRaondomInt functin to return an empty array that the computer
// will add a piece to.
const randomMove = function () {
  const gameBoard = store.user.game.cells
  const availableIndex = []
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === '') {
      availableIndex.push(i)
    }
  }

  const computerIndex = getRandomInt(availableIndex.length)

  return availableIndex[computerIndex]
}

const addPiece = function (gameBoard) {
  gameBoard[randomMove()] = player(gameBoard)
  return gameBoard
}

module.exports = {
  randomMove,
  addPiece
}
