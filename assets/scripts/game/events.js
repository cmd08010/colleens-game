const api = require('./api')
const ui = require('./ui')
const store = require('../store')

store.turnNumber = 1
store.turnValue = ''
store.notClicked = true
store.winner = ''

const onCreateGame = (event) => {
  store.notClicked = true
  store.turnNumber = 1
  api.createGame({})
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

const onCheckForWin = (game, box) => {
  console.log("in check for win event")
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
    console.log(game, box)
    store.winner = $(box).html()
    game.over = true
  } else {
    if (!game.cells.includes('')) {
      ui.showTieSuccess(game)
      game.over = true
    }
  }
  store.game = game
  return game
}

const onUpdateGame = (event) => {
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
    onCheckForWin(store.game, event.target)
    api.updateGame(store.game)
  } else {
    if ($(event.target).text() !== 'X' && $(event.target).text() !== 'O') {
    // if not filled - mark the box and patch to api
      api.updateGame(gameData)
        .then(response => {
          store.game = response.game
          if (response.game.over) {
            // if the response shows the game is now over - then check for a win - show the win message
            onCheckForWin(response.game, event.target)
          } else {
            // if game is not over
            onCheckForWin(response.game, event.target)
            ui.updateGameSuccess(response, event.target)
          }
        })
        .catch(ui.updateGameFailure)
    } else {
      ui.updateGameFailure()
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



// demontes code


module.exports = {
  onUpdateGame,
  onShowGames,
  onCreateGame,
  onCheckForWin,
  onHideGames,
}
