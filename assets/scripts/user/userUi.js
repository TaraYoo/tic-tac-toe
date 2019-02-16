'use strict'

const store = require('../store.js')

const signUpRequest = () => {
  $('form').trigger('reset')
  $('#sign-up-form').show()
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

const signInRequest = () => {
  $('form').trigger('reset')
  $('#sign-in-form').show()
  $('#sign-up-form').hide()
  $('#user-alert').empty()
}

const signInSuccess = (responseData) => {
  store.user = responseData.user
  $('#user-alert').show()
  $('#user-alert').html(`Welcome ${responseData.user.email}`)
  $('#user-record').html('You have played these games')
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('form').trigger('reset')
  $('form').hide()
  $('#sign-out').show()
  $('#new-game').show()
  $('#change-password').show()
}

const gameRecordSuccess = (responseData) => {
  const numberOfGames = responseData.games.length
  $('#user-record').text(`You have played ${numberOfGames} games.`)
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
  store.user = null
}

const changePasswordRequest = () => {
  console.log('ui is running')
  $('form').trigger('reset')
  $('#change-password-form').show()
  $('#user-alert').empty()
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
  gameRecordSuccess
}
