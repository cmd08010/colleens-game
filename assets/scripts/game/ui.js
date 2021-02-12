const store = require('../store')

const createGameSuccess = (response) => {
  $('#game-board').show()
  store.game = response.game
}

const createGameFailure = (response) => {
  $('#error-message').text('The board did not create')
}

const updateGameSuccess = (response, box) => {
  console.log(response, "this is my response")
  $(box).html(`<h2>${store.turnValue}</h2>`)
  store.currentGame = response.game.id
}

const updateGameFailure = (response) => {
  $('#error-message').text('Try again')
  store.turnValue = ''
  store.turnNumber--
}

module.exports = {
  createGameSuccess,
  createGameFailure,
  updateGameSuccess,
  updateGameFailure
}
