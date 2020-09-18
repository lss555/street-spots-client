#!/bin/bash

curl "http://localhost:8000/spots/" \
  --include \
  --request GET \
  --header "Authorization: Token ${TOKEN}"

echo
