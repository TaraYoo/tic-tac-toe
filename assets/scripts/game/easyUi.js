'use strict'

const commonUi = require('./commonUi.js')

const easySuccess = responseData => {
  $('#game-board').children().removeClass('hot-seat-box')
  $('#game-board').children().addClass('easy-box')
  $('.game-mode').text('Easy mode - Please give the computer some time to think')
}

const announceWinner = winner => {
  let announcement
  if (winner === 'x') {
    announcement = '<h2>You win as player x!</h2>'
    $('#user-alert').html(announcement)
  } else {
    announcement = '<h2>Computer wins!</h2>'
    setTimeout(() => {
      $('#user-alert').html(announcement)
    }, 2500)
  }
  $('#game-board').hide()
}

const playerTurn = () => {
  $('#user-alert').show()
  $('#user-alert').text("You're up!")
}

const computerTurn = () => {
  $('#user-alert').show()
  $('#user-alert').text('Computer is up!')
  setTimeout(() => {
    $('#user-alert').text("You're up!")
  }, 2100)
}

const computerMove = gameBoard => {
  setTimeout(() => {
    commonUi.showGameBoard(gameBoard)
  }, 2000)
}

module.exports = {
  easySuccess,
  announceWinner,
  playerTurn,
  computerMove,
  computerTurn
}
