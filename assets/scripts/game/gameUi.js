'use strict'

const store = require('../store.js')
const gameEngine = require('../../../lib/game-engine.js')

const newGameSuccess = (responseData) => {
  store.user.game = responseData.game
  store.user.game.turn = 0
  $('#user-alert').empty()
  $('.gamearea').show()
  $('.game-box').empty()
  $('#game-board').show()
  $('form').trigger('reset')
  $('form').hide()
}

const addPiece = (boxData) => {
  const gameBoard = store.user.game.cells
  // translate the box id which is in string (i.e. 'zer', 'one'...) to numbers
  const targetBox = gameEngine.boxIdAssignment[`${boxData.id}`]
  // Move the corresponding gameBoard array piece to targetBox. game board gets updated through game engine logic
  $(`#${boxData.id}`).text(`${gameBoard[targetBox]}`)
  $('#user-alert').show()
  // Each valid move increases a turn -- even numbered turns means that player O is going (since turns - player X start at 1)
  if (store.user.game.turn % 2 === 0) {
    $('#user-alert').text('Player X is up!')
  } else {
    $('#user-alert').text('Player O is up!')
  }
}

const gameFailure = () => {
  $('#user-alert').text('Something went wrong. Please try again')
}

const connectionLost = () => {
  $('#user-alert').text('We lost connection. Your game may not be recorded')
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
  announceTie,
  connectionLost
}
