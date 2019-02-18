'use strict'

const store = require('../store.js')

const newGameSuccess = (responseData) => {
  store.user.game = responseData.game
  store.user.game.turn = 0
  $('#user-alert').empty()
  $('.gamearea').show()
  $('.game-box').empty()
  $('#game-board').show()
  $('form').trigger('reset')
  $('form').hide()
  $('.unfinished-games').hide()
  $('.unfinished-games').empty()
  $('.profile').hide()
}

const boxIdAssignment = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8
}

const addPiece = (boxData) => {
  const gameBoard = store.user.game.cells
  // translate the box id which is in string (i.e. 'zer', 'one'...) to numbers
  const targetBox = boxIdAssignment[`${boxData.id}`]
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
  setTimeout(() => {
    $('#user-alert').empty()
  }, 3000)
}

const connectionLost = () => {
  $('#user-alert').text('We lost connection. Your game may not be recorded')
  setTimeout(() => {
    $('#user-alert').empty()
  }, 3000)
}

const announceWinner = (winner) => {
  const announcement = `
    <h2>Player ${winner} wins!</h2>
  `
  $('#game-board').hide()
  $('#user-alert').html(announcement)
}

const announceTie = () => {
  $('#game-board').hide()
  $('#user-alert').html('<h2>Game ties!</h2>')
}

const showGameBoard = (gameBoard) => {
  for (let i = 0; i < gameBoard.length; i++) {
    $(`.game-board :nth-child(${i + 1})`).text(gameBoard[i])
  }
}

const invalidMove = function () {
  $('#invalid-move').html('Invalid Move')

  setTimeout(() => {
    $('#invalid-move').html('')
  }, 2000)
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

  showGameBoard(gameBoard)
  $('.gamearea').show()
  $('#game-board').show()
  $('.unfinished-games').hide()
  $('.unfinished-games').empty()
  $('.profile').hide()
}

module.exports = {
  addPiece,
  newGameSuccess,
  gameFailure,
  announceWinner,
  announceTie,
  connectionLost,
  revisitOneGameSuccess,
  boxIdAssignment,
  invalidMove
}
