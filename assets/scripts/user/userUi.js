'use strict'

const store = require('../store.js')
const gameEngine = require('../../../lib/commonEngine.js')
const commonUi = require('../game/commonUi.js')

const signUpButtonPressed = () => {
  // empty all dynamic content
  commonUi.emptyDynamic()

  // hide all unrelated content
  $('.post-sign-in').hide()
  $('#change-password-form').hide()
  $('.profile').hide()
  $('.gamearea').hide()
  $('#sign-in-form').hide()

  // show the sign-up-form
  $('#sign-up-form').show()
}

const signUpSuccess = () => {
  commonUi.emptyDynamic()
  // hide all unrelated content
  $('.post-sign-in').hide()
  $('.gamearea').hide()
  // Generate user message for user communication
  $('#user-alert').text("You're signed up. Please sign in.")
  // Show the user feedback
  $('.user-communication').show()
}

const signInButtonPressed = () => {
  // empty all dynamic content
  commonUi.emptyDynamic()

  // hide all unrelated content
  $('.post-sign-in').hide()
  $('#change-password-form').hide()
  $('.profile').hide()
  $('.gamearea').hide()
  $('#sign-up-form').hide()

  // show the sign-up-form
  $('#sign-in-form').show()
}

const signInSuccess = responseData => {
  // empty all dynamic content
  commonUi.emptyDynamic()
  // hide all unrelated content
  $('.on-load').hide()
  $('form').hide()
  $('.user-communication').hide()
  // Find user-name
  store.user = responseData.user
  const userName = store.user.email.split('@')[0]
  // Add user name to message
  $('.user-name').html(`Welcome ${userName}`)
  // Show the user profile
  $('.profile').show()
  // Show post-sign-in menus. Hide change password and gamearea
  $('.post-sign-in').show()
  $('#change-password-form').hide()
  $('.gamearea').hide()
}

const getProfile = responseData => {
  // empty all dynamic content
  commonUi.emptyDynamic()

  // hide all unrelated content
  $('.on-load').hide()
  $('form').hide()
  $('.user-communication').hide()
  $('.gamearea').hide()

  // get the necessary constants
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
  const userName = store.user.email.split('@')[0]

  // Populate intended targets
  $('.user-name').text(`Welcome ${userName}`)
  $('.total-games').text(`You played ${numberOfGames} games.`)
  $('.finished-games').text(`You finished ${finishedGames.length} games.`)
  $('.won-games').text(`Player x won ${xVictory.length}, and player o won ${oVictory.length}.`)

  // Show the user profile
  $('.profile').show()

  // Show post-sign-in menus. Hide change password
  $('.post-sign-in').show()
  $('#change-password-form').hide()
}

const listUnfinishedGames = responseData => {
  // empty all dynamic content
  commonUi.emptyDynamic()

  // hide all unrelated content
  $('.on-load').hide()
  $('form').hide()
  $('.user-communication').hide()
  $('.profile').hide()
  $('.gamearea').hide()

  // get the necessary constants
  const unfinishedGames = []

  responseData.games.forEach(game => {
    if (!game.over) {
      unfinishedGames.push(game)
    }
  })

  // Populate target elements
  unfinishedGames.forEach(game => {
    const gameIDHtml = (`
      <button type=button id=game_${game.id} class=one-unfinished-game>${game.id}</button>
      `)
    $('.unfinished-games').append(gameIDHtml)
    $('.one-unfinished-game').addClass('btn btn-link')
  })

  // show the list of unfinished games
  $('.unfinished-games').show()

  // Show post-sign-in menus. Hide change password
  $('.post-sign-in').show()
  $('#change-password-form').hide()
}

const signOutSuccess = () => {
  // empty all dynamic content
  commonUi.emptyDynamic()

  // hide all unrelated content
  $('.post-sign-in').hide()
  $('#change-password-form').hide()
  $('.profile').hide()
  $('.gamearea').hide()

  // Fill target element
  $('#user-alert').text('You are signed out!')
  setTimeout(() => {
    $('#user-alert').empty()
  }, 4000)

  // Show the sign out message
  $('.user-communication').show()

  // Show landing page
  $('.on-load').show()

  // Delete user info in store
  store.user = null
}

const changePasswordRequest = () => {
  // empty all dynamic content
  commonUi.emptyDynamic()

  // hide all unrelated content
  $('.on-load').hide()
  $('.profile').hide()
  $('.gamearea').hide()

  // Show the change password form
  $('#change-password-form').show()

  // Show post-sign-in menus
  $('.post-sign-in').show()
}

const changePasswordSuccess = () => {
  // empty all dynamic content
  commonUi.emptyDynamic()

  // hide all unrelated content
  $('.on-load').hide()
  $('.profile').hide()
  $('.gamearea').hide()

  // fill the target element
  $('#user-alert').text('Password changed successfully.')
  setTimeout(() => {
    $('#user-alert').empty()
  }, 4000)

  // Show user communication
  $('.user-communication').show()

  // Show post-sign-in menus
  $('.post-sign-in').show()
}

const failure = () => {
  // no unrelated content to hide - fit into current state

  // fill target element
  $('#user-alert').text('Something went wrong. Please try again')
  setTimeout(() => {
    $('#user-alert').empty()
  }, 4000)

  // show user communication
  $('.user-communication').show()
}

module.exports = {
  signUpButtonPressed,
  signUpSuccess,
  signInButtonPressed,
  signInSuccess,
  signOutSuccess,
  changePasswordRequest,
  changePasswordSuccess,
  failure,
  getProfile,
  listUnfinishedGames
}
