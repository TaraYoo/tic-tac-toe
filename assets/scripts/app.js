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
const easy = require('./game/easyEvents')
const hotSeat = require('./game/hotSeatEvents')

$(() => {
  $('#sign-up').on('click', userEvents.onSignUpRequest)
  $('#sign-up-form').on('submit', userEvents.onSignUp)
  $('#sign-in').on('click', userEvents.onSignInRequest)
  $('#sign-in-form').on('submit', userEvents.onSignIn)
  $('#profile').on('click', userEvents.onProfile)

  $('#new-game').on('click', gameEvents.onNewGame)

  $('#hot-seat').on('click', hotSeat.onHotSeat)
  $('#game-board').on('click', '.hot-seat-box', hotSeat.onUserMove)

  $('#easy').on('click', easy.onEasy)
  $('#game-board').on('click', '.easy-box', easy.onUserMove)

  $('#revisit-games').on('click', userEvents.onRevisitGame)
  $('#sign-out').on('click', userEvents.onSignOut)
  $('#change-password').on('click', userEvents.onChangePasswordRequest)
  $('#change-password-form').on('submit', userEvents.onChangePassword)
  $('.unfinished-games').on('click', gameEvents.onRevisitOneGame)
})
