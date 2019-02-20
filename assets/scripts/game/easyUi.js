'use strict'

const commonUi = require('./commonUi.js')

const easySuccess = responseData => {
  $('.game-board').children().removeClass('hot-seat-box')
  $('.game-board').children().addClass('easy-box')
  $('#game-mode').text('Easy mode - Play against a computer.')
  $('#game-mode').show()
  $('#user-alert').text('Player x goes first')
  $('#user-alert').show()
  $('.intro').hide()
}

const playerWin = () => {
  $('#user-alert').html('You win as player x! Play a new game or finish an old one. This board will stop responding.')
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().removeClass('hot-seat-box')
}

const computerWin = () => {
  $('#user-alert').html('Computer wins! Play a new game or finish an old one. This board will stop responding.')
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().removeClass('hot-seat-box')
}

const computerThinks = () => {
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().removeClass('hot-seat-box')
  $('#user-alert').show()
  $('#user-alert').text('Computer is up!')
}

const computerMove = gameBoard => {
  commonUi.showGameBoard(gameBoard)
  $('#user-alert').show()
  $('#user-alert').text("You're up!")
  $('.game-board').children().addClass('easy-box')
}

module.exports = {
  easySuccess,
  playerWin,
  computerWin,
  computerMove,
  computerThinks
}
