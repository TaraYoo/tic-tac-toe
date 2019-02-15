'use strict'

const ui = require('./gameUi.js')
const gameEngine = require('../../../lib/game-engine.js')
const store = require('../store.js')

const onNewGame = (event) => {
  event.preventDefault()

  // initiate a new game
  gameEngine.newGame()
  ui.newGameSuccess()
}

const onUserMove = (event) => {
  event.preventDefault()

  // identify which box the user clicked to add a game piece
  const boxData = event.target
  // add an x to corresponding box(need game logic to add o's on even moves (mod2 = 0))
  if (store.user) {
    gameEngine.updateBoard(boxData.id)
    console.log(store.user.gameBoard)
    ui.addPiece(boxData)
    if (gameEngine.declareWinner(store.user.gameBoard)) {
      ui.announceWinner(gameEngine.declareWinner(store.user.gameBoard))
    }
  } else { ui.gameFailure() }
}

module.exports = {
  onNewGame,
  onUserMove
}
