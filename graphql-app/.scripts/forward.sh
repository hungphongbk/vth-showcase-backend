#!/bin/zsh
kubectl port-forward service/postgres -n staging 5432:5432 &
P1=$!
kubectl port-forward service/upload-service -n staging 25478:25478 &
P2=$!
wait $P1 $P2