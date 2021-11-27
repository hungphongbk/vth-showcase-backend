#!/bin/bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

docker_command="docker-compose -f ../docker-compose.prod.yml"

echo "### Populate demo data..."
${docker_command} run --rm --entrypoint "\
  npm run init:prod" staging
echo
