'use strict'

const store = require('../store.js')
const commonUi = require('./commonUi.js')

const hotSeatSuccess = (responseData) => {
  $('#game-board').children().addClass('hot-seat-box')
  $('.game-mode').text('Hot seat mode - pass the screen to your opponent')
}

const announceWinner = (winner) => {
  const announcement = `
    <h2>Player ${winner} wins!</h2>
  `
  $('#game-board').hide()
  $('#user-alert').html(announcement)
}

const player = (gameBoard) => {
  const turnPieces = gameBoard.filter(piece => piece !== '')
  if (turnPieces.length % 2 === 0) {
    return 'x'
  } else {
    return 'o'
  }
}

const announcePlayer = (gameBoard) => {
  const currPlayer = player(gameBoard)
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
