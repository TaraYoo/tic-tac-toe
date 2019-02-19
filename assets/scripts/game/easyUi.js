'use strict'

const commonUi = require('./commonUi.js')

const easySuccess = responseData => {
  $('#game-board').children().removeClass('hot-seat-box')
  $('#game-board').children().addClass('easy-box')
  $('.game-mode').text('Easy mode - Please give the computer some time to think')
}

const playerWin = () => {
  $('#user-alert').html('You win as player x! Play a new game or finish an old one. This board will stop responding.')
  $('#game-board').children().removeClass('easy-box')
  $('#game-board').children().removeClass('hot-seat-box')
}

const computerWin = () => {
  $('#user-alert').html('Computer wins! Play a new game or finish an old one. This board will stop responding.')
  $('#game-board').children().removeClass('easy-box')
  $('#game-board').children().removeClass('hot-seat-box')
}

const makePlayerWait = () => {
  $('#game-board').children().removeClass('easy-box')
  $('#game-board').children().removeClass('hot-seat-box')
  setTimeout(() => {
    $('#game-board').children().addClass('easy-box')
  }, 1999)
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
  playerWin,
  computerWin,
  playerTurn,
  computerMove,
  computerTurn,
  makePlayerWait
}
