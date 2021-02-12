
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
  console.log(data, "this is the data im sending to the api")
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
  console.log('got games')
}

const getGame = () => {

}

module.exports = {
  createGame,
  updateGame,
  getGames,
  getGame
}
