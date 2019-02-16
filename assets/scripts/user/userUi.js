'use strict'

const store = require('../store.js')

const signUpRequest = () => {
  $('#sign-up-form').show()
}

const signUpSuccess = () => {
  $('#sign-up-form').hide()
  $('#sign-up').hide()
  const signInGuide = `
  You're signed up. Please sign in.
  `
  $('#user-alert').html(signInGuide)
  $('#sign-up-form').html('successful sign up')
}

const signInRequest = () => {
  $('#sign-in-form').show()
  $('#sign-up-form').empty()
  $('#sign-up-form').hide()
  $('#user-alert').empty()
}

const signInSuccess = (responseData) => {
  store.user = responseData.user
  $('#user-alert').show()
  $('#user-alert').html(`Welcome ${responseData.user.email}`)
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#sign-in-form').hide()
  $('#sign-out').show()
  $('#new-game').show()
  $('#change-password-form').show()
}

const signOutSuccess = () => {
  $('#user-alert').show()
  $('#user-alert').text('You are signed out!')
  $('#sign-up').show()
  $('#sign-in').show()
  $('#sign-out').hide()
  $('#new-game').hide()
  store.user = null
}

const changePasswordSuccess = () => {
  $('#user-alert').show()
  $('#user-alert').text('password changed successfully')
}

const failure = () => {
  $('#user-alert').text('Something went wrong. Please try again')
}

module.exports = {
  signUpRequest,
  signUpSuccess,
  signInRequest,
  signInSuccess,
  signOutSuccess,
  changePasswordSuccess,
  failure
}
