'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const userEvents = require('./user/events')
const gameEvents = require('./game/events')
const store = require('./store')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here

  // user event handlers
  $('#user-signed-in').hide()
  $('#sign-up').on('submit', userEvents.onSignUp)
  $('#sign-in').on('submit', userEvents.onSignIn)
  $('#change-password').on('submit', userEvents.onChangePassword)
  $('#sign-out').on('click', userEvents.onSignOut)

  // game event handlers
  $('#create-game').on('click', gameEvents.onCreateGame)
  $('#game-board').on('click', gameEvents.onUpdateGame)
//  $('#game-board').on('click', gameEvents.onTurnChange)
// remove once completed - this shows my stored stuff

$('#show-game').on('click', gameEvents.onShowGames)
  $('#storage').on('click', () => console.log(store))
})
