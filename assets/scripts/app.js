
'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const userEvents = require('./user/events')
const gameEvents = require('./game/events')
const store = require('./store.js')
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

  $('#create-game').on('click', gameEvents.onCreateGame)
  $('.box').on('click', gameEvents.onUpdateGame)
  //  $('#game-board').on('click', gameEvents.onTurnChange)

  // show old Games
  $('.games').on('click', '.old-game', gameEvents.onShowOldGame)

  $('#hide-game').hide()
  $('#show-game').on('click', gameEvents.onShowGames)

  $('#hide-game').on('click', gameEvents.onHideGames)
  $('.show-old-game').on('click', '.box', () => {
    if (store.game.over) {
      $('#success-message').html('Game already finished! Click New Game to play a new one or select a game thats not finished').addClass('game-message')
    } else {
      gameEvents.onUpdateGame(event)
    }
  })
})
