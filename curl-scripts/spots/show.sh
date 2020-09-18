#!/bin/bash

curl "http://localhost:8000/spots/${ID}/" \
  --include \
  --request GET \
  --header "Authorization: Token ${TOKEN}"

echo
