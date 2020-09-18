#!/bin/bash

curl "http://localhost:8000/spots/" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token ${TOKEN}" \
  --data '{
    "spot": {
      "country": "'"${COUNTRY}"'",
      "state": "'"${STATE}"'",
      "city": "'"${CITY}"'",
      "address": "'"${ADDRESS}"'",
      "description": "'"${DESCRIPTION}"'",
      "season": "'"${SEASON}"'"
    }
  }'

echo
