'use strict'

const store = require('../store.js')
const gameEngine = require('../../../lib/commonEngine.js')

const signUpSuccess = () => {
  $('form').trigger('reset')
  const signInGuide = "You're signed up. Please sign in."
  $('.user-communication').children().empty()
  $('#user-alert').text(signInGuide)
  $('.user-communication').show()
  $('#sign-up-button').hide()
  $('#sign-up-form').hide()
  $('.unfinished-games').empty()
  $('#change-password-form').hide()
}

const signInSuccess = responseData => {
  store.user = responseData.user
  const userName = store.user.email.split('@')[0]
  $('.on-load').hide()
  $('form').trigger('reset')
  $('.user-name').html(`Welcome ${userName}`)
  $('.profile').show()
  $('.post-sign-in').show()
  $('.col-4').hide()
  $('.user-communication').children().empty()
  $('.unfinished-games').empty()
  $('#change-password-form').hide()
}

const getProfile = responseData => {
  const numberOfGames = responseData.games.length

  const finishedGames = responseData.games.filter(game => game.over)

  const xVictory = []
  const oVictory = []

  finishedGames.forEach(game => {
    if (gameEngine.declareWinner(game.cells) === 'x') {
      xVictory.push(game)
    } else if (gameEngine.declareWinner(game.cells) === 'o') {
      oVictory.push(game)
    }
  })

  $('.total-games').text(`You played ${numberOfGames} games.`)
  $('.finished-games').text(`You finished ${finishedGames.length} games.`)
  $('.won-games').text(`Player x won ${xVictory.length}, and player o won ${oVictory.length}.`)

  $('.user-communication').children().empty()
  $('.post-sign-in').show()
  $('.profile').show()
  $('.intro').hide()
  $('.col-4').hide()
  $('.unfinished-games').empty()
  $('#change-password-form').hide()
}

const listUnfinishedGames = responseData => {
  const unfinishedGames = []
  $('.user-communication').children().empty()
  $('.unfinished-games').empty()
  $('.gamearea').hide()
  responseData.games.forEach(game => {
    if (!game.over) {
      unfinishedGames.push(game)
    }
  })

  unfinishedGames.forEach(game => {
    const gameIDHtml = (`
      <button type=button id=game_${game.id} class=one-unfinished-game>${game.id}</button>
      `)
    $('.unfinished-games').append(gameIDHtml)
    $('.one-unfinished-game').addClass('btn btn-link')
  })

  $('.hidden-elements').hide()
  $('.unfinished-games').show()
  $('.profile').hide()
  $('.post-sign-in').show()
  $('.col-4').hide()
  $('#change-password-form').hide()
}

const signOutSuccess = () => {
  $('.user-communication :nth-child(n+1)').empty()
  $('.user-communication').show()
  $('#user-alert').text('You are signed out!')
  setTimeout(() => {
    $('#user-alert').empty()
  }, 5000)
  $('form').trigger('reset')
  $('.on-load').show()
  $('.post-sign-in').hide()
  $('#user-record').empty()
  store.user = null
  $('.unfinished-games').empty()
  $('.user-states').empty()
  $('.profile').hide()
  $('#change-password-form').hide()
}

const changePasswordRequest = () => {
  $('.on-load').hide()
  $('.post-sign-in').show()
  $('form').trigger('reset')
  $('#change-password-form').show()
  $('#user-communication').hide()
  $('.profile').hide()
  $('.unfinished-games').empty()
  $('.unfinished-games').hide()
  $('.col-4').empty()
}

const changePasswordSuccess = () => {
  $('.user-communication :nth-child(n+1)').empty()
  $('.user-communication').show()
  $('#user-alert').show()
  $('#user-alert').text('Password changed successfully.')
  setTimeout(() => {
    $('#user-alert').empty()
  }, 4000)
  $('form').trigger('reset')
  $('.on-load').hide()
  $('.post-sign-in').show()
  $('.profile').hide()
  $('.unfinished-games').empty()
  $('.unfinished-games').hide()
  $('.col-4').empty()
}

const failure = () => {
  $('.user-communication :nth-child(n+1)').empty()
  $('.user-communication').show()
  $('#user-alert').text('Something went wrong. Please try again')
  setTimeout(() => {
    $('#user-alert').empty()
  }, 4000)
  $('form').trigger('reset')
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  signOutSuccess,
  changePasswordRequest,
  changePasswordSuccess,
  failure,
  getProfile,
  listUnfinishedGames
}
