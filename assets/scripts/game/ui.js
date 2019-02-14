'use strict'

const store = require('../store.js')

const addXPiece = (boxData) => {
  // add an x (for now, will need to add game logic to add o's on even moves)
  $(`#${boxData.id}`).text('x')
}

const addOPiece = (boxData) => {
  // placeholder function to add o on even moves
  $(`#${boxData.id}`).text('o')
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
}

const failure = () => {
  $('#failure-message').text('Something went wrong. Please try again')
}

const gameFailure = () => {
  $('#failure-message').text('Please initialize game first by pressing start game')
}

module.exports = {
  addXPiece,
  addOPiece,
  signUpSuccess,
  signInSuccess,
  newGameSuccess,
  failure,
  gameFailure
}
