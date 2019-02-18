'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./userApi.js')
const ui = require('./userUi.js')

const onSignUpRequest = function (event) {
  event.preventDefault()
  ui.signUpRequest()
}

const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signUp(formData)
    .then(ui.signUpSuccess)
    .catch(ui.failure)
}

const onSignInRequest = (event) => {
  event.preventDefault()
  ui.signInRequest()
}

const onProfile = () => {
  api.getGameRecords()
    .then(ui.getProfile)
    .catch(ui.failure)
}

const onSignIn = (event) => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signIn(formData)
    .then(ui.signInSuccess)
    .then(onProfile)
    .catch(ui.failure)
}

const onRevisitGame = (event) => {
  event.preventDefault()

  api.getGameRecords()
    .then(ui.listUnfinishedGames)
    .catch(ui.failure)
}

const onSignOut = (event) => {
  event.preventDefault()

  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.failure)
}

const onChangePasswordRequest = function (event) {
  event.preventDefault()
  ui.changePasswordRequest()
}

const onChangePassword = (event) => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.changePassword(formData)
    .then(ui.changePasswordSuccess)
    .catch(ui.failure)
}

module.exports = {
  onSignUpRequest,
  onSignUp,
  onSignInRequest,
  onSignIn,
  onSignOut,
  onChangePasswordRequest,
  onChangePassword,
  onRevisitGame,
  onProfile
}
