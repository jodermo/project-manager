FROM node:18 AS development

WORKDIR /usr/src/app

COPY server/package*.json ./
COPY environments/.env ./

RUN npm install -g rimraf

RUN npm install --force

COPY server/ ../app/
COPY environments/environment.server.ts ../app/src

RUN npm run build

FROM node:18 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY server/package*.json ../app
COPY environments/.env ../app

RUN npm install --only=production  --force

COPY server/ ../app/
COPY environments/environment.server.ts ../app/src

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 80
EXPOSE 465

CMD ["node", "dist/src/main"]
