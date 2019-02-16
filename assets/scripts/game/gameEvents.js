'use strict'

const api = require('./gameApi.js')
const ui = require('./gameUi.js')
const gameEngine = require('../../../lib/game-engine.js')
const store = require('../store.js')

const onNewGame = (event) => {
  event.preventDefault()

  // initiate a new game
  api.createGame()
    .then(ui.newGameSuccess)
    .catch(ui.gameFailure)
  console.log(store.user)
}

const onUserMove = (event) => {
  event.preventDefault()
  const boxData = event.target
  const gameId = store.user.game.id

  if (store.user) {
    const gameBoard = store.user.game.cells
    // retrieve the current state of the game, which gets updated via the gameEngine
    const targetIndex = gameEngine.boxIdAssignment[boxData.id]
    // translate the box a user clicks to a corresponding index number
    gameEngine.updateBoard(boxData.id)

    ui.addPiece(boxData)

    api.updateGamePiece(gameId, targetIndex, gameBoard[targetIndex])
      .then()
      .catch(ui.connectionLost)
    // Update the API game state if game declares a winner or a tie
    if (gameEngine.declareWinner(gameBoard)) {
      ui.announceWinner(gameEngine.declareWinner(gameBoard))
      api.updateGameStatus(gameId, true)
        .then()
        .catch(ui.connectionLost)
    } else if (gameEngine.declareTie(gameBoard)) {
      ui.announceTie()
      api.updateGameStatus(gameId, true)
        .then()
        .catch(ui.connectionLost)
    }
  }
}

module.exports = {
  onNewGame,
  onUserMove
}
