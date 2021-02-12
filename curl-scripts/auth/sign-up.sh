

curl 'https://tic-tac-toe-api-production.herokuapp.com/sign-up' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
        "credentials": {
          "email": "'"${EMAIL}"'",
          "password": "'"${PASSWORD}"'",
          "password_confirmation": "'"${PASSWORD}"'"
        }
  }'

echo

# // $ EMAIL="colleentest@example.email" PASSWORD="colleenpassword" sh curl-scripts/auth/sign-up.sh
