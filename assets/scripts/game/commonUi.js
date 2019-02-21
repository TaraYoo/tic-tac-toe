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
const showGameBoard = (gameBoard) => {
  for (let i = 0; i < gameBoard.length; i++) {
    $(`.game-board :nth-child(${i + 1})`).text(gameBoard[i])
  }
}

// function to show and trigger

const callGameSuccess = (responseData) => {
  store.user.game = responseData.game
  const gameBoard = store.user.game.cells
  $('.on-load').hide()
  $('.post-sign-in').show()
  $('form').trigger('reset')
  $('form').hide()
  $('#invalid-move').empty()
  $('.unfinished-games').empty()
  $('.profile').hide()
  showGameBoard(gameBoard)
  $('#game-id').text(`Playing Game #${store.user.game.id}`)
  $('.user-communication').show()
  $('.gamearea').show()
  $('.game-board').show()
}

const invalidMove = function () {
  $('#invalid-move').html('Invalid Move')

  setTimeout(() => {
    $('#invalid-move').html('')
  }, 2000)
}

const announceTie = () => {
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().removeClass('hot-seat-box')
  $('#user-alert').html('Game Ties! Play a new game or finish an old one. This board will stop responding')
}

const gameFailure = () => {
  $('#user-alert').show()
  $('#user-alert').text('Your game lost connection with the server. Please try again.')

  setTimeout(() => {
    $('#user-alert').html('')
  }, 5000)
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
