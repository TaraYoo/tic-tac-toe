'use strict'

const store = require('../store.js')
const gameEngine = require('../../../lib/game-engine.js')

const addPiece = (boxData) => {
  const gameBoard = store.user.gameBoard
  const targetBox = gameEngine.boxIdAssignment[`${boxData.id}`]
  $(`#${boxData.id}`).text(`${gameBoard[targetBox]}`)
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
  addPiece,
  signUpSuccess,
  signInSuccess,
  newGameSuccess,
  failure,
  gameFailure,
  announceWinner
}
