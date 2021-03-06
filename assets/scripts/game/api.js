const config = require('../config')
const store = require('../store')

const createGame = (data) => {
  return $.ajax({
    url: `${config.apiUrl}/games`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${store.user.token}`
    },
    data: data
  })
}

const updateGame = (data) => {
  return $.ajax({
    url: `${config.apiUrl}/games/${store.game._id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${store.user.token}`
    },
    data: data
  })
}

const getGames = () => {
  return $.ajax({
    url: `${config.apiUrl}/games/`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

const getGame = (id) => {
  return $.ajax({
    url: `${config.apiUrl}/games/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}

module.exports = {
  createGame,
  updateGame,
  getGames,
  getGame
}
