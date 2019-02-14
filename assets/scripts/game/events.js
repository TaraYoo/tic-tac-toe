'use strict'

const gameUI = require('./ui.js')

const onMadeMove = function (event) {
  event.preventDefault()

  // identify which box the user clicked to add a game piece
  const boxData = event.target
  // add an x to corresponding box(need game logic to add o's on evan moves (mod2 = 0))
  gameUI.addXPiece(boxData)
}

module.exports = {
  onMadeMove
}
