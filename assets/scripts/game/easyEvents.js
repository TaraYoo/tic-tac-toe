'use strict'

const api = require('./gameApi.js')
const commonUi = require('./commonUi.js')
const ui = require('./easyUi.js')
const store = require('../store.js')
const assignments = require('../assignments.js')
const easyEngine = require('../../../lib/easyEngine.js')
const commonEngine = require('../../../lib/commonEngine.js')
const commonEvents = require('./commonEvents.js')

const onEasy = (event) => {
  event.preventDefault()

  // initiate a new game
  api.createGame()
    .then(commonUi.callGameSuccess)
    .then(ui.easySuccess)
    .catch(ui.gameFailure)
}

const onUserMove = (event) => {
  // on each user move, complete user move from common events - which logs the user's move to the local board, the API, and the screen
  commonEvents.onUserMove(event)

  // after the user's move, have the computer make a random move after two seconds
  if (store.user) {
    const gameBoard = store.user.game.cells
    const gameId = store.user.game.id
    const targetIndex = assignments.boxIdAssignment[event.target.id]

    // check if the user finished the game
    if (commonEngine.declareWinner(gameBoard)) {
      api.updateGameStatus(gameId, true)
        .then()
        .catch(commonUi.gameFailure)
      // Announce that the player won
      ui.playerWin()
    } else if (commonEngine.declareTie(gameBoard)) {
      // Announce the tie - only the player can trigger a tie since X goes last
      api.updateGameStatus(gameId, true)
        .then()
        .catch(commonUi.gameFailure)
      commonUi.announceTie() // tie will always come from X, the user
    } else if (assignments.player(gameBoard) === 'o') { // computer makes a move only if the game isn't over yet, and if it's the computer's turn
      // Computer freezes the board so the user can't interact with the board
      // Computer alerts the user that it's the computer's turn
      // Stretch goal - computer makes a move after two seconds
      // updates the local board
      ui.computerThinks()
      setTimeout(() => {
        // computer only moves if it's player o's turn
        easyEngine.computerMove(gameBoard)
        // updates the UI from the local board
        ui.computerMove(gameBoard)
        // updates the API from the local board
        api.updateGamePiece(gameId, targetIndex, gameBoard[targetIndex])
          .then()
          .catch(commonUi.gameFailure)
        // Checks if the board has a winner
        if (commonEngine.declareWinner(gameBoard)) {
          api.updateGameStatus(gameId, true)
            .then()
            .catch(commonUi.gameFailure)
          // Announce that the computer won
          ui.computerWin()
        } else if (commonEngine.declareTie(gameBoard)) {
          // Announce the tie - only the player can trigger a tie since X goes last
          api.updateGameStatus(gameId, true)
            .then()
            .catch(commonUi.gameFailure)
          commonUi.announceTie() // tie will always come from X, the user
        }
      }, 1000)
    }
  }
}

module.exports = {
  onEasy,
  onUserMove
}
