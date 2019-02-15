'use strict'

const store = require('../store.js')

const addXPiece = (boxData) => {
  // add an x (for now, will need to add game logic to add o's on even moves)
  $(`#${boxData.id}`).text('x')
  $('#failure-message').text('Player O is up!')
}

const addOPiece = (boxData) => {
  // placeholder function to add o on even moves
  $(`#${boxData.id}`).text('o')
  $('#failure-message').text('Player X is up!')
}

const signUpSuccess = () => {
  $('#sign-up-form').html('successful sign up')
}

const signInSuccess = (responseData) => {
  store.user = responseData.user
  $('#sign-up-form').html(`Welcome ${responseData.user.email}`)
  $('#sign-in-form').hide()
  console.log(store)
}

const newGameSuccess = () => {
  $('#sign-up-form').html('new game!')
  $('#game-board').show()
  $('.box').empty()
}

const failure = () => {
  $('#failure-message').text('Something went wrong. Please try again')
}

const gameFailure = () => {
  $('#failure-message').text('Please initialize game first by pressing start game')
}

const announceWinner = (winner) => {
  const announcement = `
    <h2>${winner} wins!</h2>
  `
  $('#game-board').hide()
  $('#failure-message').html(announcement)
  $('#sign-up-form').hide()
}

module.exports = {
  addXPiece,
  addOPiece,
  signUpSuccess,
  signInSuccess,
  newGameSuccess,
  failure,
  gameFailure,
  announceWinner
}
