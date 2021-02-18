
const store = require('../store')


const showSignupForm = () => {
  $('#sign-up').show()
  $('#sign-in').hide()
  $('#game-animation').hide()
}
const showSigninForm = () => {
  $('#sign-in').show()
  $('#sign-up').hide()
  $('#game-animation').hide()
}

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
  $('#user-options').show()
  $('#no-user').hide()
  $('#change-password').hide()

  $('#game-animation').show()
}
const signInFailure = function (response) {
  console.log(response, " this is my response from the api after signing in")
  $('#error-message').text('Sign in failed, try again')
}
const changePasswordSuccess = () => {
  $('#success-message').text('Password was successfully changed!').addClass('success')
  $('#change-password').trigger('reset')
  $('#change-password').hide()
}

const changePasswordFailure = () => {
  $('#success-message').text('')
  $('#error-message').text('Password WAS NOT changed. Try again')
}

const showChangePasswordForm = () => {
  $('#change-password').show()
  $('#game-board').hide()
  $('#game-animation').hide()
  $('.games').hide()
  if ($('#success-message').text() !== '') {
    $('#success-message').text('')
  }
  if ($('#error-message').text() !== '') {
    $('#error-message').text('')
  }
}

const signOutSuccess = (target) => {
  delete store.user
  $('#no-user').show()
  $('#user-signed-in').hide()
  $('.games').hide()
  $('#game-board').hide()
  $('#user-options').hide()
  $('#error-message').text('')
  $('#success-message').text('')
}

const signOutFailure = () => {}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInFailure,
  signInSuccess,
  changePasswordSuccess,
  changePasswordFailure,
  showChangePasswordForm,
  signOutSuccess,
  signOutFailure,
  showSigninForm,
  showSignupForm
}
