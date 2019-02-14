'use strict'

const gameUI = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onMadeMove = function (event) {
  event.preventDefault()

  // identify which box the user clicked to add a game piece
  const boxData = event.target
  // add an x to corresponding box(need game logic to add o's on even moves (mod2 = 0))
  gameUI.addXPiece(boxData)
}

const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)
  console.log(formData)

  api.signUp(formData)
    .then(ui.signUpSuccess)
    .catch(ui.failure)
}

module.exports = {
  onMadeMove,
  onSignUp
}
