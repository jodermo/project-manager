FROM node:lts-alpine

RUN npm i -g ionic cordova

WORKDIR /app
COPY ./ /app/

RUN npm install

EXPOSE 4400
