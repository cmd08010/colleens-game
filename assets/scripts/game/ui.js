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
  console.log(response, "my games")
  $('#hide-game').show()
  response.games.map(game => {
    $('.games').append(`<h2>${game.createdAt}<h2>`)
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
