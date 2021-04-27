#!/bin/bash

yarn
yarn typeorm migration:run
if [ $PRODUCTION == "false" ];
then
  yarn dev:server
else
  yarn build
  yarn start
fi
