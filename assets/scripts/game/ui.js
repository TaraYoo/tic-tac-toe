'use strict'

const addXPiece = (boxData) => {
  // add an x (for now, will need to add game logic to add o's on even moves)
  $(`#${boxData.id}`).text('x')
}

const addOPiece = (boxData) => {
  // placeholder function to add o on even moves
  $(`#${boxData.id}`).text('o')
}

module.exports = {
  addXPiece,
  addOPiece
}
