
const config = require('../config')
const store = require('../store')

const signUp = (data) => {
  return $.ajax({
    method: 'POST',
    url: `${config.apiUrl}/sign-up`,
    data: data
  })
}

const signIn = (data) => {
  return $.ajax({
    method: 'POST',
    url: `${config.apiUrl}/sign-in`,
    data: data
  })
}

const changePassword = function (data) {
  console.log(data, "data")
  return $.ajax({
    url: `${config.apiUrl}/change-password`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${store.user.token}`
    },
    data: data
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword
}
