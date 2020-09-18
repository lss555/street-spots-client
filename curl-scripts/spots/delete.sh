#!/bin/bash

curl "http://localhost:8000/spots/${ID}/" \
  --include \
  --request DELETE \
  --header "Authorization: Token ${TOKEN}"

echo
