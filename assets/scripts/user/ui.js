
const store = require('../store')

const signUpSuccess = function (response) {
  $('#success-message').text('Thank you for signing up')
  $('#sign-up').trigger('reset')
}
const signUpFailure = function (response) {
  $('#error-message').text('Sign up failed, try again')
}

const signInSuccess = function (response) {
  store.user = response.user
  $('#success-message').text('Thank you for signing in')
  $('#change-password').show()
  $('#sign-in').hide()
  $('#sign-up').hide()
  $('#books-section').show()
}
const signInFailure = function (response) {
  $('#error-message').text('Sign in failed, try again')
}
const changePasswordSuccess = () => {
  $('#success-message').text('Password was successfully changed!').addClass('success')
  $('#change-password').trigger('reset')
}

const changePasswordFailure = () => {
  $('#error-message').text('Password WAS NOT changed. Try again')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInFailure,
  signInSuccess,
  changePasswordSuccess,
  changePasswordFailure
}