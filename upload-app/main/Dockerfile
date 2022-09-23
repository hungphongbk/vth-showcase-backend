ARG GO_VERSION=1.19.1
ARG LIBVIPS_VERSION=8.12.1

FROM node:18.9.0-alpine as client
ENV NODE_ENV production
ARG NPM_TOKEN
WORKDIR /app
COPY ../admin-page/.npmrc .npmrc
COPY ../admin-page/package.json ./
COPY ../admin-page/package-lock.json ./
RUN npm install
COPY ../admin-page ./
RUN npm run build

FROM golang:${GO_VERSION}-alpine AS builder

# install libvips
RUN apk update && apk add g++ make vips-dev alpine-sdk git && rm -rf /var/cache/apk/*

RUN mkdir -p /api
RUN mkdir -p /admin
WORKDIR /api

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .
RUN go build -o ./app .

FROM alpine:latest
ENV PORT=25478
ENV GIN_MODE=release

RUN apk update && apk add vips ca-certificates && rm -rf /var/cache/apk/*

RUN mkdir -p /api
WORKDIR /api
COPY --from=builder /api/app .
COPY --from=client /app/build ./admin

EXPOSE 25478

ENTRYPOINT ["./app"]