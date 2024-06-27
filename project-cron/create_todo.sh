#!/bin/bash

get_random_wikipedia_url() {
  curl -s -o /dev/null -w "%{redirect_url}" https://en.wikipedia.org/wiki/Special:Random
}

create_todo() {
  local url=$(get_random_wikipedia_url)
  local title="Read $url"
  local json="{\"title\": \"$title\"}"

  curl -s -X POST http://dwkproject-backend-svc:2345/todos \
       -H "Content-Type: application/json" \
       -d "$json"
}

create_todo
