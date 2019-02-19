'use strict'

const api = require('./gameApi.js')
const commonUi = require('./commonUi.js')
const ui = require('./easyUi.js')
const store = require('../store.js')
const assignments = require('../assignments.js')
const easyEngine = require('../../../lib/easyEngine.js')
const commonEngine = require('../../../lib/commonEngine.js')
const hotSeatEvents = require('./hotSeatEvents.js')

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
  hotSeatEvents.onUserMove(event)

  // after the user's move, have the computer make a random move after two seconds
  if (store.user) {
    const gameBoard = store.user.game.cells
    const gameId = store.user.game.id
    const targetIndex = assignments.boxIdAssignment[event.target.id]

    // computer makes a move
    easyEngine.computerMove(gameBoard)
    // update the UI after a two second delay to make it look like the computer is thinking
    ui.playerTurn()
    ui.computerMove(gameBoard)
    // update the backend with the computer's move
    ui.computerTurn()
    api.updateGamePiece(gameId, targetIndex, gameBoard[targetIndex])
      .then()
      .catch(commonUi.gameFailure)
    // check the new board to see if there is a winner
    if (commonEngine.declareWinner(gameBoard)) {
      api.updateGameStatus(gameId, true)
        .then()
        .catch(commonUi.gameFailure)
      // announce winner after a 2.5 second delay if the computer wins
      ui.announceWinner(commonEngine.declareWinner(gameBoard))
    } else if (commonEngine.declareTie(gameBoard)) {
      api.updateGameStatus(gameId, true)
        .then()
        .catch(commonUi.gameFailure)
      commonUi.announceTie() // tie will always come from X, the user
    }
  }
}

module.exports = {
  onEasy,
  onUserMove
}
