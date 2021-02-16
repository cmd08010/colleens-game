const store = require('../store')
const gameEvents = require('../game/events')

const createGameSuccess = (response) => {
  $('#game-board').show()
  $('.row').children().text('')
  $('#success-message').text('')
  $('#error-message').text('')
  store.game = response.game
}

const createGameFailure = (response) => {
  $('#error-message').text('The board did not create')
}

const updateGameSuccess = (response, box) => {
  $(box).html(`${store.turnValue}`)
  $('#error-message').text('')
}

const updateGameFailure = () => {
  $('#error-message').text('That square is taken! Try again.')
  store.turnValue = ''
  store.turnNumber--
}

const showGamesSuccess = (response) => {
  $('#hide-game').show()
  $('.games').show()
  $('.games').append(`<h2>You've played ${response.games.length} games. </h2>`)
  response.games.map(game => {
    $('.games').append(`
    <h2>Game number: ${response.games.indexOf(game) + 1} </h2>
    <p>Game created on: ${game.createdAt}</p>
    <p>Game over: ${game.over ? 'Yes!' : 'Not Yet!'}</p>`)
  })
}

const showGamesFailure = (response) => {}

const hideGames = () => {
  $('.games').hide()
}

const showWinSuccess = (response, box) => {
  $('#success-message').text(`${store.turnValue} is the Winner! Hit New Game to Play again!`).addClass('success')
  $('.box').off('click', gameEvents.onUpdateGame)
}

const showTieSuccess = (response) => {
  $('#success-message').text('Game tied! Play again!')
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  updateGameSuccess,
  updateGameFailure,
  showGamesSuccess,
  showGamesFailure,
  showWinSuccess,
  showTieSuccess,
  hideGames
}
