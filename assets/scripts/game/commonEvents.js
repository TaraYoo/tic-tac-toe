'use strict'

const api = require('./gameApi.js')
const ui = require('./commonUi.js')
const hotSeatUi = require('./hotSeatUi.js')
const assignments = require('../assignments.js')
const store = require('../store.js')
const gameEngine = require('../../../lib/commonEngine.js')

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
    // after updating the both the local remote board above,
    // check the gameboard to see if there is a winner in indvidual game mode event handlers
  }
}

const onRevisitOneGame = (event) => {
  event.preventDefault()

  const gameId = event.target.id.split('_')[1]
  api.getOneGame(gameId)
    .then(ui.revisitOneGameSuccess)
    .then(hotSeatUi.hotSeatSuccess)
    .catch(ui.gameFailure)
}

module.exports = {
  onUserMove,
  onRevisitOneGame
}
