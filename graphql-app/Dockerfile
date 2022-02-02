FROM node:16.13.1-alpine AS development
ARG NPM_TOKEN
ARG SENTRY_AUTH_TOKEN
ARG CI
WORKDIR /usr/src/app
COPY .npmrc .npmrc
COPY package.json ./
COPY package-lock.json ./

RUN npm install glob rimraf
RUN npm install --only=development
RUN rm -f .npmrc

COPY . .

RUN npm run build main

FROM node:16.13.1-alpine as production
ARG NPM_TOKEN
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY .npmrc .npmrc
COPY package.json ./
COPY package-lock.json ./

RUN npm install --only=production
RUN rm -f .npmrc

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/main/main"]