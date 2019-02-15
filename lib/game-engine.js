'use strict'

// add game state, including turns to store.js
const store = require('../assets/scripts/store.js')

// {id: 30, email: "scrap@baji.com", token: "BAhJIiU1M2UzMmFlMTM0ZTVjNGU1OTdlZjg3OGFjNjkwZjM5NgY6BkVG--8671803bb5d78c5d383b0a506f16a97dca958447"}
// store.user
// {id: 30, email: "scrap@baji.com", token: "BAhJIiU1M2UzMmFlMTM0ZTVjNGU1OTdlZjg3OGFjNjkwZjM5NgY6BkVG--8671803bb5d78c5d383b0a506f16a97dca958447", game: {…}}email: "scrap@baji.com"game: {id: 379, cells: Array(9), over: false, player_x: {…}, player_o: null}id: 30token: "BAhJIiU1M2UzMmFlMTM0ZTVjNGU1OTdlZjg3OGFjNjkwZjM5NgY6BkVG--8671803bb5d78c5d383b0a506f16a97dca958447"__proto__: Object
// store.user.game
// {id: 379, cells: Array(9), over: false, player_x: {…}, player_o: null}cells: (9) ["", "", "", "", "", "", "", "", ""]id: 379over: falseplayer_o: nullplayer_x: {id: 30, email: "scrap@baji.com"}__proto__: Object
// store.user.game.cells
// (9) ["", "", "", "", "", "", "", "", ""]0: ""1: ""2: ""3: ""4: ""5: ""6: ""7: ""8: ""length: 9__proto__: Array(0)
// store.user.game.id
// 379
// store.user.id
// 30
// store.user.email
// "scrap@baji.com"

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

const updateBoard = function (boxID) {
  // translate boxID (in strings) to numbers
  const gameBoardIndex = boxIdAssignment[boxID]
  const gameBoard = store.user.game.cells
  // see if the boxID is already occupied - issueQ#1 should I put this in the events.js instead?
  if (!gameBoard[gameBoardIndex]) {
    gameBoard[gameBoardIndex] = whichPiece()
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
