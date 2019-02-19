'use strict'

const store = require('../store.js')
const gameEngine = require('../../../lib/commonEngine.js')

const signUpRequest = () => { // change name to displaySignUp
  $('form').trigger('reset')
  $('.hidden-elements').hide()
  $('#sign-up-form').show()
}

const signUpSuccess = () => {
  $('.hidden-elements').hide()
  $('form').trigger('reset')
  const signInGuide = "You're signed up. Please sign in."
  $('#user-alert').html(signInGuide)
  $('#user-alert').show()
}

const signInRequest = () => { // change name to displaySignIn
  // Have either sign up or sign in form visible at the start
  $('form').trigger('reset')
  $('#user-alert').empty()
  $('.hidden-elements').hide()
  $('#sign-in-form').show()
}

const signInSuccess = responseData => {
  store.user = responseData.user
  const userName = store.user.email.split('@')[0]
  $('.hidden-elements').hide()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('form').trigger('reset')
  $('.user-name').html(`Welcome ${userName}`)
  $('.user-welcome').show()
  $('.post-sign-in').show()
  $('.profile').show()
  $('.intro').show()
}

const getProfile = responseData => {
  const numberOfGames = responseData.games.length

  const finishedGames = responseData.games.filter(game => game.over)

  const xVictory = []
  const oVictory = []

  finishedGames.forEach(game => {
    gameEngine.declareWinner(game.cells) === 'x' ? xVictory.push(game) : oVictory.push(game)
  })

  $('.total-games').text(`You played ${numberOfGames} games.`)
  $('.finished-games').text(`You finished ${finishedGames.length} games.`)
  $('.won-games').text(`Player x won ${xVictory.length}, and player o won ${oVictory.length}.`)

  $('.hidden-elements').hide()
  $('#user-alert').hide()
  $('.post-sign-in').show()
  $('.profile').show()
  $('.intro').hide()
}

const listUnfinishedGames = responseData => {
  const unfinishedGames = []
  $('#user-alert').empty()
  $('#user-alert').hide()
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
  $('.post-sign-in').show()
}

const signOutSuccess = () => {
  $('#user-alert').show()
  $('#user-alert').text('You are signed out!')
  setTimeout(() => {
    $('#user-alert').empty()
  }, 5000)
  $('.hidden-elements').hide()
  $('form').trigger('reset')
  $('#sign-up').show()
  $('#sign-in').show()
  $('#user-record').empty()
  store.user = null
  $('.unfinished-games').empty()
}

const changePasswordRequest = () => {
  $('.hidden-elements').hide()
  $('.post-sign-in').show()
  $('form').trigger('reset')
  $('#change-password-form').show()
  $('#user-alert').empty()
  $('#user-record').empty()
}

const changePasswordSuccess = () => {
  $('#user-alert').show()
  $('#user-alert').text('Password changed successfully.')
  setTimeout(() => {
    $('#user-alert').empty()
  }, 4000)
  $('form').trigger('reset')
  $('.hidden-elements').hide()
  $('.post-sign-in').show()
}

const failure = () => {
  $('#user-alert').text('Something went wrong. Please try again')
  setTimeout(() => {
    $('#user-alert').empty()
  }, 4000)
  $('form').trigger('reset')
}

module.exports = {
  signUpRequest,
  signUpSuccess,
  signInRequest,
  signInSuccess,
  signOutSuccess,
  changePasswordRequest,
  changePasswordSuccess,
  failure,
  getProfile,
  listUnfinishedGames
}
