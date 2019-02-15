'use strict'

const store = require('../store.js')
const gameEngine = require('../../../lib/game-engine.js')

const newGameSuccess = (responseData) => {
  store.user.game = responseData.game
  $('#user-alert').empty()
  $('.gamearea').show()
  $('.game-box').empty()
  $('#game-board').show()
}

const addPiece = (boxData) => {
  const gameBoard = store.user.gameBoard
  const targetBox = gameEngine.boxIdAssignment[`${boxData.id}`]
  $(`#${boxData.id}`).text(`${gameBoard[targetBox]}`)
  $('#user-alert').show()
  if (store.user.turn % 2 === 0) {
    $('#user-alert').text('Player X is up!')
  } else {
    $('#user-alert').text('Player O is up!')
  }
}

const gameFailure = () => {
  $('#user-alert').text('Something went wrong. Please try again')
}

const announceWinner = (winner) => {
  const announcement = `
    <h2>Player ${winner} wins!</h2>
  `
  $('#game-board').hide()
  $('#user-alert').html(announcement)
}

const announceTie = () => {
  $('#user-alert').html('<h2>Game ties!</h2>')
}

module.exports = {
  addPiece,
  newGameSuccess,
  gameFailure,
  announceWinner,
  announceTie
}
