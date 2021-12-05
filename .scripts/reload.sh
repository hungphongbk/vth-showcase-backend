#!/bin/bash

original_dir=`pwd`
cd "$(dirname "$0")"

service_name=$(echo $1|tr -d '\n')
nginx_container_name=${2:-nginx}
is_squashed=${3:-false}
docker_compose_cmd='docker-compose -f ../docker-compose.prod.yml'

reload_nginx() {
  ${docker_compose_cmd} exec $nginx_container_name /usr/sbin/nginx -s reload &>/dev/null
}

squash_db() {
  ${docker_compose_cmd} run --rm --entrypoint "/usr/local/bin/npm run schema:drop:prod" $service_name
}

server_status() {
  local port=$1
  status=$(curl -is --connect-timeout 5 --show-error http://localhost:$port 2>/dev/null | head -n 1 | cut -d " " -f2)

  # if status is not a status code (123), means we got an error not an http header
  # this could be a timeout message, connection refused error msg, and so on...
  if [[ $(echo ${#status}) != 3 ]]; then
    status="503"
  fi
  status="$status"
}

wait_for_available() {
  local port=$1
  retry=0
  server_status $port

  while [[ $status -gt "404" ]]; do
    if [[ $retry -gt 20 ]];then
      break;
      return 1
    fi
    ((retry++))
    echo "New instance of $service_name:$port is getting ready..."
    sleep 3
    server_status $port
  done
  return 0
}

#
# SPINNING UP SERVER
#

if [[ $is_squashed == "true" ]]; then
  echo "Squash Postgres migrations..."
  squash_db
  echo "Squash completed!"
fi

old_container_id=$(docker ps -f name=$service_name -q | head -n1)
${docker_compose_cmd} up -d --no-build --no-deps --scale $service_name=2 --no-recreate $service_name
container_id=$(docker ps -f name=$service_name -q | head -n1)

echo "Old container ID: $old_container_id"
echo "New container ID: $container_id"

if [[ -z $container_id ]]; then
  >&2 echo "$service_name container not found, please double-check!"
  exit 1
fi

container_port=$(docker port "$container_id" | cut -d " " -f3 | cut -d ":" -f2)
if [[ -z $container_port ]]; then
  >&2 echo "Cannot found any port binds on $service_name, please double-check!"
  exit 1
fi

wait_for_available $container_port
if [ $? -gt 0 ]; then
  >&2 echo "New container has not been successfully deployed. Roll back..."
  docker rm $container_id -f
  exit 1
fi
echo "$service_name:$container_port is ready. Spinning up right now..."

reload_nginx
echo "Remove old $service_name container..."
docker rm $old_container_id -f &>/dev/null
reload_nginx
sleep 3

echo "DONE !"

cd $original_dir