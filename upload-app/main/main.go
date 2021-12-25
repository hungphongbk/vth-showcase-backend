package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/hungphongbk/vth-showcase-backend/main/db"
	"github.com/hungphongbk/vth-showcase-backend/main/env"
	"github.com/hungphongbk/vth-showcase-backend/main/repository"
	"log"
	"net/http"

	healthcheck "github.com/RaMin0/gin-health-check"
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
	r := setupRouter()
	err := r.Run(":25478")
	if err != nil {
		panic(err)
	} else {
		log.Println("MediaUpload server has been started successfully. Version 1.0.0")
	}
}
