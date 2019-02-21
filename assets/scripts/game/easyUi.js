'use strict'

const easySuccess = () => {
  // call game success initializes a game board, fill in the game ID, and shows the user communication after hiding non-gamearea content, and emptying dynamically generated content

  // Fill target elements - add class to trigger onUserMove, and fill in game mode
  $('.game-board').children().removeClass('hot-seat-box')
  $('.game-board').children().addClass('easy-box')
  $('#game-mode').text('Easy mode - Play against a computer.')
  $('#user-alert').text('You go first as player x')
}

const playerWin = () => {
  // empty class names to disable the board
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().removeClass('hot-seat-box')

  // generate target element content
  $('#user-alert').html('You win as player x! Play a new game or finish an old one. This board will stop responding.')
}

const computerWin = () => {
  // empty class names to disable the board
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().removeClass('hot-seat-box')

  // generate target element content
  $('#user-alert').html('Computer wins! Play a new game or finish an old one. This board will stop responding.')
}

const computerThinks = () => {
  // empty class names to disable the board
  $('.game-board').children().removeClass('easy-box')
  $('.game-board').children().removeClass('hot-seat-box')

  // generate target element content
  $('#user-alert').text("Computer is thinking. You won't be able to add pieces")
}

const computerMove = () => {
  // generate target element content
  $('#user-alert').show()
  $('#user-alert').text("You're up!")
  // re-enable the board
  $('.game-board').children().addClass('easy-box')
}

module.exports = {
  easySuccess,
  playerWin,
  computerWin,
  computerMove,
  computerThinks
}
