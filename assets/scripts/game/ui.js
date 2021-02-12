const store = require('../store')

const createGameSuccess = (response) => {
  $('#game-board').show()
  store.game = response.game
  console.log(store.game, "my stored game")
}

const createGameFailure = (response) => {
  console.log(response, "ui create game failed")
  $('#error-message').text('The board did not create')
}

const updateGameSuccess = (response) => {
  console.log(response, "my ui response from api")
  $(response).html('X')
  store.currentGame = response.game.id
}

const updateGameFailure = (response) => {
  console.log(response, "")
  $('#error-message').text('The board did create')
}

const showGamesSucces = (response) => {
console.log(games)
}

const showGamesFailure = (response) => {}

module.exports = {
  createGameSuccess,
  createGameFailure,
  updateGameSuccess,
  updateGameFailure,
  showGamesSucces,
  showGamesFailure
}
