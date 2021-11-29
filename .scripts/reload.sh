#!/bin/bash

trap "exit 1" TERM
export TOP_PID=$$

originalDir=`pwd`
cd "$(dirname "$0")"

serviceName=$1
nginxContainerName=${2:-nginx}
docker_compose_cmd='docker-compose -f ../docker-compose.prod.yml'

exit_with_error(){
  cd $originalDir
  kill -s TERM $TOP_PID
}

reload_nginx() {
  docker exec $nginxContainerName /usr/sbin/nginx -s reload
}

server_status() {
  local port=$1
  local status=$(curl -is --connect-timeout 5 --show-error http://localhost:$port | head -n 1 | cut -d " " -f2)

  # if status is not a status code (123), means we got an error not an http header
  # this could be a timeout message, connection refused error msg, and so on...
  if [[ $(echo ${#status}) != 3 ]]; then
    echo "503"
  fi

  echo $status
}

wait_for_available() {
  local port=$1
  while [[ $(server_status $port) -gt "404" ]]; do
    echo "New instance of $serviceName is getting ready..."
    sleep 2
  done
}

update_server(){
  old_container_id=$(docker ps -f name=$serviceName -q | tail -n1)
  ${docker_compose_cmd} up --build -d --no-deps --scale $serviceName=2 --no-recreate $serviceName
  container_id=$(docker ps -f name="$serviceName" -q | tail -n1)

  if [[ -z $container_id ]]; then
    >&2 echo "$serviceName container not found, please double-check!"
    exit_with_error
  fi

  container_port=$(docker port "$container_id" | cut -d " " -f3 | cut -d ":" -f2)
  if [[ -z $container_port ]]; then
    >&2 echo "Cannot found any port binds on $serviceName, please double-check!"
    exit_with_error
  fi


  export -f wait_for_available
  timeout 30 bash -c wait_for_available
  if [ $? -ne 0 ]; then
    >&2 echo "New container has not been successfully deployed. Roll back..."
    docker rm $container_id -f
    exit_with_error
  fi

  reload_nginx

  docker rm $old_container_id -f

  reload_nginx

  echo "DONE !"
}

update_server
cd $originalDir