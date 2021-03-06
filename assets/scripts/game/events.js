const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const x = '<img id="vezzini" src="public/images/Vezzini.jpg">'
const o = '<img id="wesley" src="public/images/wesley.jpeg">'

store.turnNumber = 1
store.turnValue = ''
store.notClicked = true
store.winner = ''
store.gameData = {
  game: {
    cell: {},
    over: false
  }
}
store.gameOver = false

const onCreateGame = (event) => {
  store.notClicked = true
  store.turnNumber = 1
  api.createGame({})
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

const onCheckForWin = (game, box) => {
  if (
    ((game.cells[0] !== '') && (game.cells[0] === game.cells[1]) && (game.cells[1] === game.cells[2])) ||
    ((game.cells[0] !== '') && (game.cells[0] === game.cells[4]) && (game.cells[4] === game.cells[8])) ||
    ((game.cells[0] !== '') && (game.cells[0] === game.cells[3]) && (game.cells[3] === game.cells[6])) ||
    ((game.cells[1] !== '') && (game.cells[1] === game.cells[4]) && (game.cells[4] === game.cells[7])) ||
    ((game.cells[2] !== '') && (game.cells[2] === game.cells[5]) && (game.cells[5] === game.cells[8])) ||
    ((game.cells[3] !== '') && (game.cells[3] === game.cells[4]) && (game.cells[4] === game.cells[5])) ||
    ((game.cells[6] !== '') && (game.cells[6] === game.cells[7]) && (game.cells[7] === game.cells[8])) ||
    ((game.cells[2] !== '') && (game.cells[2] === game.cells[4]) && (game.cells[4] === game.cells[6]))
  ) {
    ui.showWinSuccess(game.cells, box)
    store.gameOver = true
    api.updateGame({
      game: {
        cell: {
          index: $(box).data('cell-index'),
          value: store.turnValue
        },
        over: true
      }
    })
  } else {
    if (!game.cells.includes('')) {
      api.updateGame({
        game: {
          cell: {
            index: $(box).data('cell-index'),
            value: store.turnValue
          },
          over: true
        }
      })
      store.gameOver = true
      ui.showTieSuccess(game)
    }
  }
  return game
}

const onUpdateGame = (event) => {
  if (!store.user) {
    store.turnNumber++
    if (store.turnNumber % 2) {
      store.turnValue = o
    } else {
      store.turnValue = x
    }
    ui.guestUpdateGameSuccess(event.target)
  } else {
    if (store.gameOver) {
      onCheckForWin(store.game, event.target)
    } else {
      const box = event.target
      const boxIndex = $(box).data('cell-index')
      store.turnNumber++
      if (store.turnNumber % 2) {
        store.turnValue = o
      } else {
        store.turnValue = x
      }

      store.gameData.game.cell.index = boxIndex
      store.gameData.game.cell.value = store.turnValue
      if ($(event.target).text() !== x && $(event.target).text() !== o) {
        // if not filled - mark the box and patch to api

        api.updateGame(store.gameData)
          .then(response => {
            if (response.game.over) {
              // if the response shows the game is now over - then check for a win - show the win message
              onCheckForWin(response.game, event.target)
            } else {
              onCheckForWin(response.game, event.target)
              ui.updateGameSuccess(event.target)
            }
          })
          .catch(ui.updateGameFailure)
      } else {
        ui.updateGameFailure()
      }
    }
  }
}

const onShowGames = (event) => {
  api.getGames()
    .then(ui.showGamesSuccess)
    .catch(ui.showGamesFailure)
}

const onHideGames = (event) => {
  ui.hideGames()
}

const onShowOldGame = (event) => {
  store.notClicked = true
  store.turnNumber = 1
  api.getGame($(event.target).data('game-id'))
    .then(ui.showOldGame)
    .catch(ui.showGamesFailure)
}

module.exports = {
  onUpdateGame,
  onShowGames,
  onCreateGame,
  onCheckForWin,
  onHideGames,
  onShowOldGame
}
