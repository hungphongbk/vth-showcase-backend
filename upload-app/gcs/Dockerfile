ARG GO_VERSION=1.19.1
ARG LIBVIPS_VERSION=8.12.1

FROM golang:${GO_VERSION}-alpine AS builderGcs

# install libvips
RUN apk update && apk add g++ make vips-dev alpine-sdk git && rm -rf /var/cache/apk/*

WORKDIR /api

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .
RUN go build -o ./gcs .

FROM alpine:latest
#ENV PORT=25478
ENV GIN_MODE=release

RUN apk update && apk add vips ca-certificates && rm -rf /var/cache/apk/*

WORKDIR /api
COPY --from=builderGcs /api/gcs .

#EXPOSE 25478

ENTRYPOINT ["./gcs"]