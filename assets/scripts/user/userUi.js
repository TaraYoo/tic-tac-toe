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
  $('#user-alert').hide()
}

const signInSuccess = (responseData) => {
  store.user = responseData.user
  $('#user-alert').show()
  $('#user-alert').html(`Welcome ${responseData.user.email}`)
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#sign-in-form').hide()
  $('#new-game').show()
}

const failure = () => {
  $('#user-alert').text('Something went wrong. Please try again')
}

module.exports = {
  signUpRequest,
  signUpSuccess,
  signInRequest,
  signInSuccess,
  failure
}
