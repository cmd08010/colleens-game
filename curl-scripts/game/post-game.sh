

API='https://tic-tac-toe-api-development.herokuapp.com'
URL_PATH='/games'

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "game": {
       "cell": {
         "index": 0,
         "value": "x"
       },
       "over": false
     }
  }'

echo
