const store = require('../store')
const moment = require('moment')

const createGameSuccess = (response) => {
  store.turnValue = 'X'
  $('#success-message').text('')
  $('#error-message').text('')
  $('#game-board').show()
  $('.row').children().text('')
  $('#game-animation').hide()
  $('.games').hide()
  $('#hide-games').hide()
  $('#change-password').hide()
  $('.show-old-game').hide()
  store.game = response.game
  store.gameOver = false
}

const createGameFailure = (response) => {
  $('#error-message').text('The board did not create')
  $('#game-animation').hide()
  $('#success-message').text('')
}

const updateGameSuccess = (box) => {

  $(box).html(`<h2>${store.turnValue}</h2>`)
  $('#game-animation').hide()
  $('.games').hide()
  $('#change-password').hide()
  // $('#error-message').text('')
  // $('#success-message').text('')
}

const guestUpdateGameSuccess = (box) => {
  $('.show-old-game').hide()
  $(box).html(`<h2>${store.turnValue}</h2>`)
  $('#game-animation').hide()
  $('.games').hide()
  $('#change-password').hide()
  $('#success-message').text('Sign in to play a real game!').addClass('success')

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
  $('#error-message').text('')
  $('#success-message').text('')
  $('#game-board').hide()
  $('#change-password').hide()
  $('.show-old-game').hide()
  $('.games').html(` <h2>You've played ${response.games.length} games</h2>`)
  response.games.map(game => {
    const date = moment(game.createdAt).format("MM DD YYYY")
    $('.games').append(`
    <h2><button class="old-game" data-game-id=${game._id}>Game number: ${response.games.indexOf(game) + 1} </button> </h2>
    <p>Game created on: ${date}</p>
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
  $('#error-message').text('')
  $('#success-message').text(`${store.turnValue} is the Winner! Click New Game to play again`).addClass('success')
}

const showTieSuccess = (response) => {
  $('#error-message').text('')
  $('#success-message').html('<h2>Game tied! Play again!</h2>')
}

const showOldGame = (response) => {
  store.game = response.game
  store.gameOver = response.game.over
  $('.show-old-game').show()
  const oldGameHtml = `
      <div class="row">
        <div class="col-2 box alt-color" id="1" data-cell-index='0'><h2>${response.game.cells[0]}</h2></div>
        <div class="col-2 box alt-color" id="2" data-cell-index='1'><h2>${response.game.cells[1]}</h2></div>
        <div class="col-2 box alt-color" id="3" data-cell-index='2'><h2>${response.game.cells[2]}</h2></div>
      </div>
      <div class="row">
        <div class="col-2 box alt-color" id="4" data-cell-index='3'><h2>${response.game.cells[3]}</h2></div>
        <div class="col-2 box alt-color" id="5" data-cell-index='4'><h2>${response.game.cells[4]}</h2></div>
        <div class="col-2 box alt-color" id="6" data-cell-index='5'><h2>${response.game.cells[5]}</h2></div>
      </div>
      <div class="row">
        <div class="col-2 box alt-color" id="7" data-cell-index='6'><h2>${response.game.cells[6]}</h2></div>
        <div class="col-2 box alt-color" id="8" data-cell-index='7'><h2>${response.game.cells[7]}</h2></div>
        <div class="col-2 box alt-color" id="9" data-cell-index='8'><h2>${response.game.cells[8]}</h2></div>
      </div>`
  $('.show-old-game').html(oldGameHtml)
  $('.games').hide()
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
  guestUpdateGameSuccess,
  showOldGame
}
