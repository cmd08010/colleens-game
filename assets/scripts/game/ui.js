const store = require('../store')

const createGameSuccess = (response) => {
  console.log("in create game")
  $('#game-board').show()
  $('.row').children().text('')
  $('#game-animation').hide()
  if ($('#success-message').text() !== '') {
    $('#success-message').text('')
  }
  if ($('#error-message').text() !== '') {
    $('#error-message').text('')
  }
  $('#error-message').text('')
  $('.games').hide()
  $('#hide-games').hide()
  $('#change-password').hide()
  store.game = response.game
}

const createGameFailure = (response) => {
  $('#error-message').text('The board did not create')
  $('#game-animation').hide()
}

const updateGameSuccess = (response, box) => {
  $(box).html(`<h2>${store.turnValue}</h2>`)
  $('#game-animation').hide()
  $('.games').hide()
  $('#change-password').hide()
  // $('#error-message').text('')
  // $('#success-message').text('')
}

const updateGameFailure = () => {
  $('#error-message').text('That square is taken! Try again.')
  $('#success-message').text('')
  store.turnValue = ''
  store.turnNumber--
}

const showGamesSuccess = (response) => {
  $('#hide-game').show()
  $('.games').show()
  $('#game-board').hide()
  $('#game-animation').hide()
  $('#change-password').hide()
  $('.games').html(` <h2>You've played ${response.games.length} games</h2>`)
  console.log(response.games, "this is my response")
  response.games.map(game => {
    $('.games').append(`
    <h2>Game number: ${response.games.indexOf(game) + 1} </h2>
    <p>Game created on: ${game.createdAt}</p>
    <p>Game over: ${game.over ? 'Yes!' : 'Not Yet!'}</p>`)
  })
}

const showGamesFailure = (response) => {
  $('#game-animation').hide()
  $('#error-message').text('Try again!')
  $('#success-message').text('')
}

const hideGames = () => {
  $('.games').hide()
  $('#game-animation').show()
  $('#error-message').text('')
  $('#success-message').text('')
  $('#hide-games').hide()
  $('#change-password').hide()
}

const showWinSuccess = (response, box) => {
  console.log(store.winner, "winnner")
  $('#success-message').text(`${store.winner} is the Winner! Click New Game to play again`).addClass('success')
}

const showTieSuccess = (response) => {
  $('#success-message').html('<h2>Game tied! Play again!</h2>')
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
  hideGames,
}
