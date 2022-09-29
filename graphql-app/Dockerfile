FROM node:18.10.0-alpine AS development
ARG NPM_TOKEN
ARG SENTRY_AUTH_TOKEN
ARG CI
ARG APP_NAME=main
WORKDIR /usr/src/app
COPY .npmrc .npmrc
COPY package.json ./
COPY package-lock.json ./

RUN npm install glob rimraf
RUN npm install --only=development
RUN rm -f .npmrc

COPY . .

RUN npm run prebuild
RUN npm run build:${APP_NAME}

FROM node:18.10.0-alpine as production
ARG NPM_TOKEN
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG APP_NAME=main
ARG APP_ENTRY=dist/apps/${APP_NAME}/main
ENV APP_ENTRY=${APP_ENTRY}

WORKDIR /usr/src/app
COPY .npmrc .npmrc
COPY package.json ./
COPY package-lock.json ./

RUN npm install --only=production
RUN rm -f .npmrc

COPY . .

COPY --from=development /usr/src/app/dist/apps/${APP_NAME} ./dist/apps/${APP_NAME}

RUN echo $APP_ENTRY
CMD node $APP_ENTRY