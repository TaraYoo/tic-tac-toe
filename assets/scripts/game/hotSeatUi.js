'use strict'

const store = require('../store.js')
const assignments = require('../assignments.js')
const commonUi = require('./commonUi.js')

const hotSeatSuccess = () => {
  $('#game-board').children().removeClass('easy-box')
  $('#game-board').children().addClass('hot-seat-box')
  $('.game-mode').text('Hot seat mode - pass the screen to your opponent')
  console.log('hot seat fired')
}

const announceWinner = (winner) => {
  const announcement = `
    <h2>Player ${winner} wins!</h2>
  `
  $('#game-board').hide()
  $('#user-alert').html(announcement)
}

const announcePlayer = (gameBoard) => {
  const currPlayer = assignments.player(gameBoard)
  $('#user-alert').show()
  $('#user-alert').text(`Player ${currPlayer} is up!`)
}

const revisitOneGameSuccess = (responseData) => {
  $('#user-alert').empty()
  $('#user-alert').hide()
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
  $('#game-board').show()
  $('.unfinished-games').hide()
  $('.unfinished-games').empty()
  $('.profile').hide()
}

module.exports = {
  hotSeatSuccess,
  announceWinner,
  revisitOneGameSuccess,
  announcePlayer
}
