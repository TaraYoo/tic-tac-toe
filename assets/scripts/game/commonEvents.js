'use strict'

const api = require('./gameApi.js')
const ui = require('./commonUi.js')
const assignments = require('../assignments.js')
const store = require('../store.js')
const gameEngine = require('../../../lib/commonEngine.js')

const onNewGame = (event) => {
  event.preventDefault()

  api.createGame()
    .then(ui.callGameSuccess)
    .catch(ui.gameFailure)
}

// log any move made by a user and show the results on screen
const onUserMove = (event) => {
  event.preventDefault()
  const boxData = event.target
  const gameId = store.user.game.id

  if (store.user) {
    // retrieve the current game state as gameBoard
    const gameBoard = store.user.game.cells
    // translate the bo a user clicks to the corresponding array index
    const targetIndex = assignments.boxIdAssignment[boxData.id]
    // update the local gameboard
    gameEngine.updateBoard(boxData.id)
    // update the ui to show the local gameboard state
    ui.showGameBoard(gameBoard)
    // update the backend API
    api.updateGamePiece(gameId, targetIndex, gameBoard[targetIndex])
      .then()
      .catch(ui.gameFailure)
  }
}

module.exports = {
  onNewGame,
  onUserMove
}
