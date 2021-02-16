const api = require('./api')
const ui = require('./ui')
const store = require('../store')

store.turnNumber = 1
store.turnValue = ''
store.gameBoard = {
  alreadyClicked: false
}

const onCreateGame = (event) => {
  api.createGame({})
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

const onCheckForWin = (game) => {
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
    ui.showWinSuccess(game.cells)
    game.over = true
    console.log(game, 'should show over true')
    return game
  } else {
    console.log('game still on', game.cells)
  }
  // cells.map(cell =>
  //  console.log(cell)
  // })
}

const onUpdateGame = (event) => {
  console.log(event, "my event")
  const box = event.target
  const boxIndex = $(box).data('cell-index')
  store.turnNumber++
  if (store.turnNumber % 2) {
    store.turnValue = 'O'
  } else {
    store.turnValue = 'X'
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
  if (store.game.over) {
    console.log(store.game, 'test')
    ui.showWinSuccess(store.game)
  } else {
    api.updateGame(gameData)
      .then(response => {
        console.log(response.game.cells[boxIndex], "should be my cell I just clickeds value")
        if (response.game.over) {
          ui.showWinSuccess(response, event.target)
        } else {
          if (response.game.cells[boxIndex] !== "") {

            ui.updateGameFailure(response)
          } else {
            onCheckForWin(response.game)
            ui.updateGameSuccess(response, event.target)
          }
        }
      })
      .catch(ui.updateGameFailure)
  }
}

const onShowGames = (event) => {
  console.log('clicked')
  api.getGames()
    .then(ui.showGamesSuccess)
    .catch(ui.showGamesFailure)
}

const onHideGames = (event) => {
  ui.hideGames()
}

module.exports = {
  onUpdateGame,
  onShowGames,
  onCreateGame,
  onCheckForWin,
  onHideGames
}
