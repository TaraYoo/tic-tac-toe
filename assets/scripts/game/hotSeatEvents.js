'use strict'

const api = require('./gameApi.js')
const ui = require('./hotSeatUi.js')
const commonUi = require('./commonUi.js')
const gameEngine = require('../../../lib/commonEngine.js')
const store = require('../store.js')
const commonEvents = require('./commonEvents.js')

const onHotSeat = (event) => {
  event.preventDefault()

  // initiate a new game
  api.createGame()
    .then(commonUi.callGameSuccess)
    .then(ui.hotSeatSuccess)
    .catch(ui.gameFailure)
}

const onUserMove = (event) => {
  // show the user's move on screen and update both local and remote game boards
  commonEvents.onUserMove(event)
  // after each move, check if game is tied or has a winner
  if (store.user) {
    const gameBoard = store.user.game.cells
    const gameId = store.user.game.id

    // update which player is up
    ui.announcePlayer(gameBoard)

    if (gameEngine.declareWinner(gameBoard)) {
      api.updateGameStatus(gameId, true)
        .then()
        .catch(commonUi.gameFailure)
      ui.announceWinner(gameEngine.declareWinner(gameBoard))
    } else if (gameEngine.declareTie(gameBoard)) {
      api.updateGameStatus(gameId, true)
        .then()
        .catch(commonUi.gameFailure)
      commonUi.announceTie()
    }
  }
}

const onRevisitOneGame = (event) => {
  event.preventDefault()

  const gameId = event.target.id.split('_')[1]
  api.getOneGame(gameId)
    .then(ui.revisitOneGameSuccess)
    .catch(ui.gameFailure)
}

module.exports = {
  onHotSeat,
  onUserMove,
  onRevisitOneGame
}
