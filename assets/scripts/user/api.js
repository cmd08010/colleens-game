
const config = ('../config.js')
const store = ('../store')

const signUp = (data) => {
  console.log(config.apiUrl, 'my url to the api')
  return $.ajax({
    method: 'POST',
    url: `${config.apiURL}/sign-up`,
    data: data
  })
}

const signIn = (data) => {
  console.log(config.apiUrl, 'my url to the api')
  return $.ajax({
    method: 'POST',
    url: `${config.apiURL}/sign-in`,
    data: data
  })
}

const changePassword = function (data) {
  return $.ajax({
    url: `${config.apiURL}/change-password`,
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
