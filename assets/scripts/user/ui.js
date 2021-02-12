
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
  $('#error-message').text('')
  $('#change-password').show()
  $('#user-signed-in').show()
  $('#no-user').hide()

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

const signOutSuccess = (target) => {
  delete store.user
  $('#no-user').show()
  $('#user-signed-in').hide()
}

const signOutFailure = () => {}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInFailure,
  signInSuccess,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
