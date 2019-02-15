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

  // identify which box the user clicked to add a game piece
  const boxData = event.target
  // add an x to corresponding box(need game logic to add o's on even moves (mod2 = 0))
  if (store.user) {
    gameEngine.updateBoard(boxData.id)
    ui.addPiece(boxData)
    const gameBoard = store.user.game.cells
    if (gameEngine.declareWinner(gameBoard)) {
      ui.announceWinner(gameEngine.declareWinner(gameBoard))
    } else if (gameEngine.declareTie(gameBoard)) {
      ui.announceTie()
    }
  } else { ui.gameFailure() }
}

module.exports = {
  onNewGame,
  onUserMove
}
