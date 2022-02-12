package main

import (
	"fmt"
	"github.com/getsentry/sentry-go"
	"github.com/gin-contrib/cors"
	"github.com/hungphongbk/vth-showcase-backend/main/db"
	"github.com/hungphongbk/vth-showcase-backend/main/env"
	"github.com/hungphongbk/vth-showcase-backend/main/repository"
	"log"
	"net/http"
	"time"

	healthcheck "github.com/RaMin0/gin-health-check"
	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	environment := new(env.Environment)
	err := environment.Init()
	if err != nil {
		return nil
	}
	server := NewServer(environment)
	db.InitDb(environment)
	repository.Image.Init(environment)

	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(healthcheck.Default())
	r.Use(cors.Default())
	r.Use(sentrygin.New(sentrygin.Options{}))

	// Recovery middleware recovers from any panics and writes a 500 if there was one.
	r.Use(gin.CustomRecovery(func(c *gin.Context, recovered interface{}) {
		if err, ok := recovered.(string); ok {
			c.String(http.StatusInternalServerError, fmt.Sprintf("error: %s", err))
		}
		c.AbortWithStatus(http.StatusInternalServerError)
	}))
	r.Static("/admin", "./admin")
	r.Static("/assets", environment.DocumentRoot)
	r.GET("/upload", server.getAll)
	r.GET("/upload/stat", server.stat)
	r.POST("/upload", server.post)
	r.DELETE("/upload/:id", server.del)

	return r
}

func main() {
	err := sentry.Init(sentry.ClientOptions{
		Dsn:              "https://ff04c36e74dd4854afa0e8db643771c7@o164087.ingest.sentry.io/6200993",
		TracesSampleRate: 0.5,
	})
	if err != nil {
		log.Fatalf("sentry.Init: %s", err)
	}
	// Flush buffered events before the program terminates.
	defer sentry.Flush(2 * time.Second)

	sentry.CaptureMessage("It works!")

	r := setupRouter()
	err = r.Run(":25478")
	if err != nil {
		panic(err)
	} else {
		log.Println("MediaUpload server has been started successfully. Version 1.0.0")
	}
}
