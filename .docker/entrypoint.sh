#!/bin/bash

yarn
yarn typeorm migration:run
if [ "$PRODUCTION" = "true" ];
then
  echo "Starting PROD"
  yarn build
  yarn start
else
  echo "Starting DEV"
  yarn dev:server
fi
