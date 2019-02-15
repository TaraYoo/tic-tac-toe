'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const gameEngine = require('../../../lib/game-engine.js')
const store = require('../store.js')

const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signUp(formData)
    .then(ui.signUpSuccess)
    .catch(ui.failure)
}

const onSignIn = (event) => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signIn(formData)
    .then(ui.signInSuccess)
    .catch(ui.failure)
}

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
    if (store.user.turn % 2 === 1) {
      ui.addXPiece(boxData)
    } else {
      ui.addOPiece(boxData)
    }
    if (gameEngine.declareWinner(store.user.gameBoard)) {
      ui.announceWinner(gameEngine.declareWinner(store.user.gameBoard))
    }
  } else { ui.gameFailure() }
}

module.exports = {
  onSignUp,
  onSignIn,
  onNewGame,
  onUserMove
}
