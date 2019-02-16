'use strict'

const config = require('../config.js')
const store = require('../store.js')

const createGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {}
  })
}

const updateGamePiece = (gameId, index, gamePiece) => {
  return $.ajax({
    url: config.apiUrl + `/games/${gameId}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      game: {
        cell: {
          index: index,
          value: gamePiece
        }
      }
    }
  })
}

const updateGameStatus = (gameId, gameStatus) => {
  return $.ajax({
    url: config.apiUrl + `/games/${gameId}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      game: {
        over: gameStatus
      }
    }
  })
}

module.exports = {
  createGame,
  updateGamePiece,
  updateGameStatus
}
