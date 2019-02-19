'use strict'

const store = require('../store.js')

// function to render the gameboard according to the called game at the time
const showGameBoard = (gameBoard) => {
  for (let i = 0; i < gameBoard.length; i++) {
    $(`.game-board :nth-child(${i + 1})`).text(gameBoard[i])
  }
}

// function to show and trigger

const callGameSuccess = (responseData) => {
  store.user.game = responseData.game
  const gameBoard = store.user.game.cells
  $('.pre-sign-in').hide()
  $('.post-sign-in').show()
  $('form').trigger('reset')
  $('form').hide()
  $('#user-alert').empty()
  $('#invalid-move').empty()
  $('.unfinished-games').empty()
  showGameBoard(gameBoard)
  $('.gamearea').show()
}

const invalidMove = function () {
  $('#invalid-move').html('Invalid Move')

  setTimeout(() => {
    $('#invalid-move').html('')
  }, 2000)
}

const gameFailure = () => {
  $('#user-alert').show()
  $('#user-alert').text('Your game lost connection with the server. Please try again.')
}

module.exports = {
  callGameSuccess,
  gameFailure,
  showGameBoard,
  invalidMove
}
