'use strict'

const store = require('../store.js')

// function to empty all dynamically generated content
// this function also goes to user UI
const emptyDynamic = () => {
  $('form').trigger('reset')
  $('.user-communication').children().empty()
  $('.user-stats').children().empty()
  $('.unfinished-games').empty()
  $('.game-board').children().empty()
}

// function to render the gameboard according to the called game at the time
// also gets called to hotSeatEvents
const showGameBoard = (gameBoard) => {
  for (let i = 0; i < gameBoard.length; i++) {
    $(`.game-board :nth-child(${i + 1})`).text(gameBoard[i])
  }
}

// function to show and newly generate game board
const callGameSuccess = (responseData) => {
  // empty all dynamically generated content
  emptyDynamic()

  // hide all unrelated content
  $('.on-load').hide()
  $('.profile').hide()

  // Retrieve necessary constants
  store.user.game = responseData.game
  const gameBoard = store.user.game.cells

  // Fill target element
  showGameBoard(gameBoard)
  $('#game-id').text(`Playing Game #${store.user.game.id}`)

  // show gamearea, and user communication
  $('.gamearea').show()
  $('.user-communication').show()

  // Show post-sign-in menus. Hide change password
  $('.post-sign-in').show()
  $('#change-password-form').hide()
}

const invalidMove = function () {
  // no unrelated content to hide - this ui only gets called in game

  // fill target element
  $('#invalid-move').html('Invalid Move')

  setTimeout(() => {
    $('#invalid-move').html('')
  }, 2000)
}

const announceTie = () => {
  // no unrelated content to hide - this ui only gets called in game
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().removeClass('hot-seat-box')
  $('#user-alert').html('Tied game. Play a new game or finish an old one. This board will stop responding')
}

const gameFailure = () => {
  // no unrelated content to hide - fit into current state

  // fill target element
  $('#user-alert').text('Your game lost connection with the server. Please try again.')
  setTimeout(() => {
    $('#user-alert').html('')
  }, 5000)

  // show parent element
  $('.user-communication').show()
}

module.exports = {
  emptyDynamic,
  callGameSuccess,
  gameFailure,
  showGameBoard,
  announceTie,
  invalidMove
}
