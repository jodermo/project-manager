FROM node:lts-alpine

RUN apk update && apk add bash

RUN npm install -g json-server@${JSON_SERVER_VERSION}
COPY package.json package-lock.json ./
RUN npm ci --only="prod"

COPY ./data.json ./server.sh ./

EXPOSE 8080
CMD [ "./server.sh" ]
