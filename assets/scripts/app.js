'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// testing/development account is
// email: scrap@baji.com
// password: pupper

const userEvents = require('./user/userEvents')
const easy = require('./game/easyEvents')
const hotSeat = require('./game/hotSeatEvents')

$(() => {
  // user auth related events
  $('#sign-up-form').on('submit', userEvents.onSignUp)
  $('#sign-in-form').on('submit', userEvents.onSignIn)
  $('#profile').on('click', userEvents.onProfile)
  $('#sign-out').on('click', userEvents.onSignOut)
  $('#change-password').on('click', userEvents.onChangePasswordRequest)
  $('#change-password-form').on('submit', userEvents.onChangePassword)

  // hot seat mode related game activities
  $('#hot-seat').on('click', hotSeat.onHotSeat)
  $('#game-board').on('click', '.hot-seat-box', hotSeat.onUserMove)

  // easy mode related game activities - remaining bug: user message
  $('#easy').on('click', easy.onEasy)
  $('#game-board').on('click', '.easy-box', easy.onUserMove)

  // revisiting related game activities
  $('#revisit-games').on('click', userEvents.onRevisitGame)
  $('.unfinished-games').on('click', hotSeat.onRevisitOneGame)
})
