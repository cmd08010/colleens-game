const store = require('../store')
const gameEvents = require('../game/events')

const createGameSuccess = (response) => {
  $('#game-board').show()
  $('.row').children().text('')
  $('#game-board').on('click', gameEvents.onUpdateGame)
  $('#success-message').text('')
  store.game = response.game
}

const createGameFailure = (response) => {
  $('#error-message').text('The board did not create')
}

const updateGameSuccess = (response, box) => {
  $(box).html(`<h2>${store.turnValue}</h2>`)
}

const updateGameFailure = (response) => {
  $('#error-message').text('That square is taken! Try again.')
  store.turnValue = ''
  store.turnNumber--
}

const showGamesSuccess = (response) => {
  $('#hide-game').show()
  $('.games').show()
  console.dir(response)
  $('.games').append(`<h2>You've played ${response.games.length} games. </h2>`)
  response.games.map(game => {
  //  console.log(game, "what is each game")
    $('.games').append(`
    <h2>Game number: ${response.games.indexOf(game) + 1} </h2>
    <p>Game created on: ${game.createdAt}</p>
    <p>Game over: ${game.over ? "Yes!" : "Not Yet!"}</p>`)
  })
}

const showGamesFailure = (response) => {}

const hideGames = () => {
  $('.games').hide()
}

const showWinSuccess = (response) => {
  $('#game-board').addClass("")
  $('#success-message').text('Winner Winner!')
}

const showTieSuccess = (response) => {

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
