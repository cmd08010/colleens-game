const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')

store.turnNumber = 1
store.turnValue = ''

const onCreateGame = (event) => {
  api.createGame({})
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

const onUpdateGame = (event) => {
  const box = event.target
  const boxIndex = $(box).data('cell-index')
  console.log(event.target, 'turn change handler')
  store.turnNumber++
  if (store.turnNumber % 2) {
    store.turnValue = 'X'
  } else {
    store.turnValue = 'O'
  }

  const gameData = {
    game: {
      cell: {
        index: boxIndex,
        value: store.turnValue
      },
      over: false
    }
  }

  api.updateGame(gameData)
    .then(response => ui.updateGameSuccess(response, event.target))
    .catch(ui.updateGameFailure)
}

const onShowGames = (event) => {
  console.log('clicked')
  api.getGames()
    .then(ui.showGamesSucces)
    .catch(ui.showGamesFailure)
}

module.exports = {
  onUpdateGame,
  onShowGames,
  onCreateGame
}
