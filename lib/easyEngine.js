'use strict'

// add game state, including turns to store.js
const store = require('../assets/scripts/store.js')
const assignments = require('../assets/scripts/assignments.js')

// easy mode Engine to have the computer make a random move

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}
// randomInt function from MDN. Use to randomly select a computer's move
// use above getRandomInt function to return an empty array that the computer
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

const computerMove = function (gameBoard) {
  if (assignments.player(gameBoard) === 'o') {
    gameBoard[randomMove()] = assignments.player(gameBoard)
  }
  return gameBoard
}

module.exports = {
  randomMove,
  computerMove
}
