FROM node:14-alpine

RUN apk add --no-cache bash

COPY ./.docker  /home/node/app/.docker

COPY ./.env  /home/node/app

USER node

WORKDIR /home/node/app
