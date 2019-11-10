#!/usr/bin/env bash
set -e

# Check for cluster name as 1st cli arg
if [ -z ${1+x} ]; then
  echo "Missing service name arg"
  exit 1
fi

docker attach $(docker-compose ps -q $1)