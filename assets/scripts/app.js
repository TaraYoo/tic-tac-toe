'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// testing/development account is
// email: scrap@baji.com
// password: pupper

const gameEvents = require('./game/gameEvents')
const userEvents = require('./user/userEvents')

$(() => {
  $('#sign-up').on('click', userEvents.onSignUpRequest)
  $('#sign-up-form').on('submit', userEvents.onSignUp)
  $('#sign-in').on('click', userEvents.onSignInRequest)
  $('#sign-in-form').on('submit', userEvents.onSignIn)
  $('.game-box').on('click', gameEvents.onUserMove)
  $('#new-game').on('click', gameEvents.onNewGame)
  $('#revisit-games').on('click', userEvents.onRevisitGame)
  $('#sign-out').on('click', userEvents.onSignOut)
  $('#change-password').on('click', userEvents.onChangePasswordRequest)
  $('#change-password-form').on('submit', userEvents.onChangePassword)
})
