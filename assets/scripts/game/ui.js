'use strict'

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

const failure = () => {
  $('#failure-message').text('Something went wrong. Please try again')
}

module.exports = {
  addXPiece,
  addOPiece,
  signUpSuccess,
  failure
}
