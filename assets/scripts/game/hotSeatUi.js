'use strict'

const store = require('../store.js')
const assignments = require('../assignments.js')
const commonUi = require('./commonUi.js')

const hotSeatSuccess = () => {
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().addClass('hot-seat-box')
  $('#game-mode').text('Hot seat mode - pass the screen to your opponent.')
  $('#user-alert').text('Player x goes first')
  $('#user-alert').show()
  $('.profile').hide()
  $('.unfinished-games').hide()
}

const announceWinner = (winner) => {
  const announcement = `
    <h2>Player ${winner} wins! Play a new game or finish an old one. This board will stop responding.</h2>
  `
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().removeClass('hot-seat-box')
  $('#user-alert').html(announcement)
}

const announcePlayer = (gameBoard) => {
  const currPlayer = assignments.player(gameBoard)
  $('#user-alert').show()
  $('#user-alert').text(`Player ${currPlayer} is up!`)
}

const revisitOneGameSuccess = (responseData) => {
  $('#user-alert').empty()
  $('.user-communication').show()
  store.user.game = responseData.game
  const gameBoard = store.user.game.cells
  store.user.game.turn = 0
  gameBoard.forEach(piece => {
    if (piece) {
      store.user.game.turn++
    }
  })

  commonUi.showGameBoard(gameBoard)
  hotSeatSuccess()
  $('.game-board').children().removeClass('easy-box')
  $('.gamearea').show()
  $('.game-board').show()
  $('.game-board').children().css('display: block')
  $('.unfinished-games').hide()
  $('.unfinished-games').empty()
  $('.profile').hide()
  $('.game-mode').show()
}

module.exports = {
  hotSeatSuccess,
  announceWinner,
  revisitOneGameSuccess,
  announcePlayer
}
