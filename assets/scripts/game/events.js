const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')


const onCreateGame = (event) => {
  api.createGame({})
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

const onUpdateGame = (event) => {
  const box = event.target
  const boxIndex = $(box).data('cell-index')
  const boxValue = $(box).val()
  const gameData = {
    game: {
      cell: {
        index: boxIndex,
        value: 'x'
      },
      over: false
    }
  }
  api.updateGame(gameData)
    .then(response => console.log(response))
    .catch(ui.updateGameFailure)
}

const onShowGames = (event) => {
  console.log('clicked')
  api.getGames()
}

module.exports = {
  onUpdateGame,
  onShowGames,
  onCreateGame
}
