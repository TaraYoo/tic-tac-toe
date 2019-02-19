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
  // on each user move, complete user move from hotseat - which includes checking the board to see if there is a winner / tie
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
    } else { // computer makes a move only if the game isn't over yet
      // computer makes a move
      easyEngine.computerMove(gameBoard)
      // update the UI after a two second delay to make it look like the computer is thinking
      ui.computerMove(gameBoard)
      // Computer takes exactly 2 seconds to make a move, during that time say that computer is up. At 2100 miliseconds, switch to player turn
      ui.computerTurn()
      // update the backend with the computer's move
      api.updateGamePiece(gameId, targetIndex, gameBoard[targetIndex])
        .then()
        .catch(commonUi.gameFailure)
      // check the new board to see if the computer won
      if (commonEngine.declareWinner(gameBoard)) {
        api.updateGameStatus(gameId, true)
          .then()
          .catch(commonUi.gameFailure)
        // Announce that the computer won
        setTimeout(() => {
          ui.computerWin()
        }, 2101)
      }
    }
  }
}

module.exports = {
  onEasy,
  onUserMove
}
