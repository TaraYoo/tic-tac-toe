curl --include --request POST "https://tic-tac-toe-wdi.herokuapp.com/games" \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-type: application/json" \
  --data '{}'

echo
