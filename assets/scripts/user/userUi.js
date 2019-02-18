'use strict'

const store = require('../store.js')
const gameEngine = require('../../../lib/game-engine.js')

const signUpRequest = () => { // change name to displaySignUp
  $('form').trigger('reset')
  $('#sign-up-form').show()
  $('#sign-in-form').hide()
}

const signUpSuccess = () => {
  $('#sign-up-form').hide()
  $('#sign-up').hide()
  const signInGuide = `
  You're signed up. Please sign in.
  `
  $('#user-alert').html(signInGuide)
  $('form').trigger('reset')
}

const signInRequest = () => { // change name to displaySignIn
  // Have either sign up or sign in form visible at the start
  $('form').trigger('reset')
  $('#sign-in-form').show()
  $('#sign-up-form').hide()
  $('#user-alert').empty()
}

const signInSuccess = responseData => {
  store.user = responseData.user
  const userName = store.user.email.split('@')[0]
  $('.user-welcome').show()
  $('.user-name').html(`Welcome ${userName}`)
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('form').trigger('reset')
  $('form').hide()
  $('#sign-out').show()
  $('#new-game').show()
  $('#change-password').show()
}

const gameRecordSuccess = responseData => {
  const numberOfGames = responseData.games.length

  const finishedGames = responseData.games.filter(game => game.over)

  const xVictory = []
  const oVictory = []

  finishedGames.forEach(game => {
    gameEngine.declareWinner(game.cells) === 'x' ? xVictory.push(game) : oVictory.push(game)
  })

  $('.user-record').text(`You have played ${numberOfGames} games.
    You finished ${finishedGames.length}.
    You won ${xVictory.length} games.`)
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

  $('.unfinished-games').show()
}

const signOutSuccess = () => {
  $('#user-alert').show()
  $('#user-alert').text('You are signed out!')
  $('#sign-up').show()
  $('#sign-in').show()
  $('#sign-out').hide()
  $('#change-password').hide()
  $('#new-game').hide()
  $('form').trigger('reset')
  $('form').hide()
  $('#user-record').empty()
  store.user = null
  $('.jumbotron').hide()
  $('.unfinished-games').empty()
  $('.unfinished-games').hide()
}

const changePasswordRequest = () => {
  console.log('ui is running')
  $('form').trigger('reset')
  $('#change-password-form').show()
  $('#user-alert').empty()
  $('#user-record').empty()
  $('.gamearea').hide()
}

const changePasswordSuccess = () => {
  $('#user-alert').show()
  $('#user-alert').text('password changed successfully')
  $('form').trigger('reset')
  $('#change-password-form').hide()
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
  gameRecordSuccess,
  listUnfinishedGames
}
