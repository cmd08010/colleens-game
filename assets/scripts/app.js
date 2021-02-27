'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const userEvents = require('./user/events')
const gameEvents = require('./game/events')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here
  // user event handlers
  $('#user-signed-in').hide()
  $('#user-options').hide()
  $('#signin-btn').on('click', userEvents.onShowSigninButton)
  $('#signup-btn').on('click', userEvents.onShowSignupButton)
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#sign-up').on('submit', userEvents.onSignUp)
  $('#sign-in').on('submit', userEvents.onSignIn)
  $('#change-password-button').on('click', userEvents.onShowChangePassword)
  $('#change-password').on('submit', userEvents.onChangePassword)
  $('#sign-out').on('click', userEvents.onSignOut)

  // game event handlers
  $('#game-board').hide()
  $('#create-game').on('click', gameEvents.onCreateGame)

  $('.box').on('click', gameEvents.onUpdateGame)
  //  $('#game-board').on('click', gameEvents.onTurnChange)

  $('#hide-game').hide()
  $('#show-game').on('click', gameEvents.onShowGames)

  $('#hide-game').on('click', gameEvents.onHideGames)

  // remove once completed - this shows my stored stuff
//  $('#storage').on('click', () => console.log(store))
})
