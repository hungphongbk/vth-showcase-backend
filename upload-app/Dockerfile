ARG GO_VERSION=1.17.5
ARG LIBVIPS_VERSION=8.12.1
FROM golang:${GO_VERSION}-alpine AS builder

# install libvips
RUN apk update && apk add g++ make vips-dev alpine-sdk git && rm -rf /var/cache/apk/*

RUN mkdir -p /api
WORKDIR /api

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .
RUN go build -o ./app ./main

FROM alpine:latest
ENV PORT=25478
ENV GIN_MODE=release

RUN apk update && apk add vips ca-certificates && rm -rf /var/cache/apk/*

RUN mkdir -p /api
WORKDIR /api
COPY --from=builder /api/app .

EXPOSE 25478

ENTRYPOINT ["./app"]