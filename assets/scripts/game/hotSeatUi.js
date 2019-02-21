'use strict'

const store = require('../store.js')
const assignments = require('../assignments.js')

const hotSeatSuccess = () => {
  // call game success initializes a game board, fill in the game ID, and shows the user communication after hiding non-gamearea content, and emptying dynamically generated content

  // Fill target elements - add class to trigger onUserMove, and fill in game mode
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().addClass('hot-seat-box')
  $('#game-mode').text('Hot seat mode - pass the screen to your opponent.')
  $('#user-alert').text('Player x goes first')
}

const announceWinner = (winner) => {
  // empty class names to disable the board
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().removeClass('hot-seat-box')

  // generate target element content
  const announcement = `
    <h2>Player ${winner} wins! Play a new game or finish an old one. This board will stop responding.</h2>
  `
  $('#user-alert').html(announcement)
}

const announcePlayer = (gameBoard) => {
  // no unrelated content at this stage - announce player only gets called during game

  // Generate necessary constant
  const currPlayer = assignments.player(gameBoard)

  // fill target element
  $('#user-alert').text(`Player ${currPlayer} is up!`)
}

const revisitOneGameSuccess = () => {
  // call game success initializes a game board, fill in the game ID, and shows the user communication after hiding non-gamearea content, and emptying dynamically generated content

  // revisit game doesn't actually see the reponse data, and will only set up the board as a hotseat game. Revisit game will not say whose
  // turn it is initially
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().addClass('hot-seat-box')
  $('#game-mode').text('Hot seat mode - pass the screen to your opponent.')
}

module.exports = {
  hotSeatSuccess,
  announceWinner,
  revisitOneGameSuccess,
  announcePlayer
}
