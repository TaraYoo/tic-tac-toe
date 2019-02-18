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

const player = (gameBoard) => {
  const turnPieces = gameBoard.filter(piece => piece !== '')
  if (turnPieces.length % 2 === 0) {
    return 'x'
  } else {
    return 'o'
  }
}

const showGameBoard = (gameBoard) => {
  for (let i = 0; i < gameBoard.length; i++) {
    $(`.game-board :nth-child(${i + 1})`).text(gameBoard[i])
  }
  const currPlayer = player(gameBoard)
  console.log(currPlayer)
  $('#user-alert').show()
  $('#user-alert').text(`Player ${currPlayer} is up!`)
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
  newGameSuccess,
  gameFailure,
  announceWinner,
  announceTie,
  connectionLost,
  revisitOneGameSuccess,
  boxIdAssignment,
  invalidMove,
  showGameBoard
}
