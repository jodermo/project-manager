FROM node:lts-alpine

RUN npm i -g @angular/cli

WORKDIR /app
COPY ./ /app/

RUN npm install

EXPOSE 4200
