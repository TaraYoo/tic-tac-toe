'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// testing/development account is
// email: scrap@baji.com
// password: pupper

const gameEvents = require('./game/events')

$(() => {
  $('.box').on('click', gameEvents.onMadeMove)
  $('#sign-up-form').on('submit', gameEvents.onSignUp)
})
