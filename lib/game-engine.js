'use strict'

// add game state, including turns to store.js
const store = require('../assets/scripts/store.js')

// API game structure
// {
//   "games": [
//     {
//       "id": 1,
//       "cells": ["o","x","o","x","o","x","o","x","o"],
//       "over": true,
//       "player_x": {
//         "id": 1,
//         "email": "and@and.com"
//       },
//       "player_o": null
//     },
//   ]
// }

const newGame = function () {
  store.user = {}
  store.user.turn = 0
  store.user.gameBoard =
  ['', '', '',
    '', '', '',
    '', '', '']

  return store.user
}

// switcher function to translate box ID to the javascript game board index
const boxIdAssignment = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8
}

const whichPiece = function () { // see whose turn it is - x or o
  // increment user's turn
  store.user.turn++
  // see whether it's x's turn or o's turn
  let gamePiece
  if (store.user.turn % 2 === 1) {
    gamePiece = 'x'
  } else {
    gamePiece = 'o'
  }
  return gamePiece
}

const updateBoard = function (boxID) {
  // translate boxID (in strings) to numbers
  const gameBoardIndex = boxIdAssignment[boxID]
  store.user.gameBoard[gameBoardIndex] = whichPiece()
}

module.exports = {
  newGame,
  updateBoard
}
