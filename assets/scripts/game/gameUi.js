'use strict'

const store = require('../store.js')
const gameEngine = require('../../../lib/game-engine.js')

const addPiece = (boxData) => {
  const gameBoard = store.user.gameBoard
  const targetBox = gameEngine.boxIdAssignment[`${boxData.id}`]
  $(`#${boxData.id}`).text(`${gameBoard[targetBox]}`)
}

const newGameSuccess = () => {
  $('#user-alert').empty()
  $('.gamearea').show()
  $('.game-box').empty()
}

const gameFailure = () => {
  $('#failure-message').text('Please initialize game first by pressing start game')
}

const announceWinner = (winner) => {
  const announcement = `
    <h2>${winner} wins!</h2>
  `
  $('#game-board').hide()
  $('#failure-message').html(announcement)
  $('#sign-up-form').hide()
}

module.exports = {
  addPiece,
  newGameSuccess,
  gameFailure,
  announceWinner
}
